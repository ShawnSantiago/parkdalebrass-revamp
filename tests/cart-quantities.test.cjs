const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const asset = (name) => fs.readFileSync(path.join(__dirname, '../assets', name), 'utf8');

// B and C share a variant but have different line properties.
const [a, b, c] = ['101:plain', '102:engraving-b', '102:engraving-c'];

function storefront(t, { rekey } = {}) {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const store = new Map([[a, 1], [b, 1], [c, 1]]);
  const calls = [];
  const elements = new Map();
  const views = new Map();
  const requests = [];
  const classList = { toggle() {} };

  class Element {
    constructor() {
      this.listeners = {};
      this.classList = classList;
      this.isConnected = true;
    }

    addEventListener(name, callback) {
      this.listeners[name] = callback;
    }
  }

  function mount(viewName, lines) {
    const old = views.get(viewName);
    if (old) {
      old.inputs.forEach((input) => { input.isConnected = false; });
      old.isConnected = false;
    }
    const view = new (elements.get(viewName))();
    view.localName = viewName;
    view.inputs = lines.map(([key, quantity], index) => ({
      isConnected: true,
      value: String(quantity),
      defaultValue: String(quantity),
      dataset: { index: String(index + 1), quantityLineKey: key, quantityVariantId: key.split(':')[0], min: '1' },
      step: '1',
      matches: (selector) => selector === '.quantity__input',
      reportValidity() {},
      setCustomValidity() {},
    }));
    view.querySelector = (selector) => {
      if (selector.startsWith('#Quantity-')) return view.inputs[Number(selector.match(/Quantity-(\d+)/)[1]) - 1];
      return view.inputs.find((input) => selector === `[data-quantity-line-key="${input.dataset.quantityLineKey}"]`);
    };
    view.enableLoading = view.disableLoading = view.updateLiveRegions = () => {};
    view.getSectionsToRender = () => [{ id: viewName, section: viewName, selector: '.rows' }];
    view.getSectionInnerHTML = (html) => html;
    views.set(viewName, view);
  }

  const document = {
    activeElement: { getAttribute: () => null },
    querySelector: (selector) => views.get(selector),
    querySelectorAll(selector) {
      if (selector === 'cart-items, cart-drawer-items') return [...views.values()];
      if (selector === '[data-quantity-line-key]') return [...views.values()].flatMap((view) => view.inputs);
      return [];
    },
    getElementById(id) {
      if (!views.has(id)) return null;
      // Only the Shopify section HTML/DOM boundary is mocked. A response replaces the rows.
      return { querySelector: () => ({ set innerHTML(html) { mount(id, JSON.parse(html)); } }) };
    },
  };
  const context = vm.createContext({
    HTMLElement: Element, document, CSS: { escape: (value) => value },
    customElements: { define: elements.set.bind(elements), get: elements.get.bind(elements) },
    window: { StandardEvents: { createViewEventElement: (base) => base }, location: { pathname: '/cart' } },
    setTimeout, clearTimeout, console, ON_CHANGE_DEBOUNCE_TIMER: 300,
    CartPerformance: { createStartingMarker() {}, measureFromMarker() {}, measure: (_, fn) => fn() },
    routes: { cart_change_url: '/cart/change.js' }, fetchConfig: () => ({}),
    PUB_SUB_EVENTS: { cartUpdate: 'cart-update' }, publish() {},
    fetch: async (url, { body }) => {
      const { id, quantity, sections } = JSON.parse(body);
      assert.equal(url, '/cart/change.js');
      calls.push({ id, quantity });
      const errors = await new Promise((resolve) => requests.push(resolve));
      if (errors) return { text: async () => JSON.stringify({ errors }) };
      assert.ok(store.has(id), 'each change identifies a current line by its full key');
      if (quantity === 0) store.delete(id);
      else store.set(id, quantity);
      // Shopify can return a new line key when a quantity change alters the line's discount.
      const newKey = quantity !== 0 && rekey?.(id, quantity);
      if (newKey) {
        const entries = [...store].map(([key, value]) => [key === id ? newKey : key, value]);
        store.clear();
        entries.forEach(([key, value]) => store.set(key, value));
      }
      const items = [...store].map(([key, quantity]) => ({ key, quantity }));
      const rendered = Object.fromEntries(sections.map((section) => [section, JSON.stringify([...store])]));
      return { text: async () => JSON.stringify({ items, item_count: items.length, sections: rendered }) };
    },
  });
  vm.runInContext(asset('cart.js'), context);
  vm.runInContext(asset('cart-drawer.js'), context);
  mount('cart-items', [...store]);
  mount('cart-drawer-items', [...store]);

  return {
    calls, store,
    edit(viewName, key, quantity) {
      const cart = views.get(viewName);
      const input = cart.inputs.find((input) => input.dataset.quantityLineKey === key);
      input.value = String(quantity);
      cart.listeners.change({ target: input, currentTarget: cart });
    },
    remove(viewName, key) {
      const cart = views.get(viewName);
      const button = new (elements.get('cart-remove-button'))();
      button.closest = () => cart;
      button.dataset = { index: cart.inputs.find((input) => input.dataset.quantityLineKey === key).dataset.index };
      button.listeners.click({ currentTarget: button, preventDefault() {} });
    },
    async tick(ms) {
      t.mock.timers.tick(ms);
      await new Promise(setImmediate);
    },
    async respond(errors) {
      assert.equal(requests.length, 1, 'cart mutations must run one at a time');
      requests.shift()(errors);
      await new Promise(setImmediate);
    },
    assertRendered() {
      for (const view of views.values()) {
        assert.deepEqual(view.inputs.map((input) => [input.dataset.quantityLineKey, Number(input.value)]), [...store]);
      }
    },
  };
}

for (const view of ['cart-items', 'cart-drawer-items']) {
  test(`${view}: rapid edits to separate rows both persist`, async (t) => {
    const cart = storefront(t);
    cart.edit(view, a, 2);
    await cart.tick(100);
    cart.edit(view, b, 4);
    await cart.tick(300);
    assert.deepEqual(cart.calls, [{ id: a, quantity: 2 }]);
    await cart.respond();
    assert.deepEqual(cart.calls, [{ id: a, quantity: 2 }, { id: b, quantity: 4 }]);
    await cart.respond();
    assert.deepEqual([...cart.store], [[a, 2], [b, 4], [c, 1]]);
    cart.assertRendered();
  });

  test(`${view}: removing an earlier row keeps the pending edit on the intended line`, async (t) => {
    const cart = storefront(t);
    cart.edit(view, b, 4);
    await cart.tick(100);
    cart.remove(view, a);
    await cart.tick(0);
    await cart.respond();
    await cart.tick(300);
    await cart.respond();
    assert.deepEqual(cart.calls, [{ id: a, quantity: 0 }, { id: b, quantity: 4 }]);
    assert.deepEqual([...cart.store], [[b, 4], [c, 1]]);
    cart.assertRendered();
  });
}

test('the last edit to the same line wins across both views', async (t) => {
  const cart = storefront(t);
  cart.edit('cart-items', a, 5);
  await cart.tick(100);
  cart.edit('cart-drawer-items', a, 6);
  await cart.tick(300);
  await cart.respond();
  assert.deepEqual(cart.calls, [{ id: a, quantity: 6 }]);
  cart.assertRendered();
});

test('a rejected quantity does not block the next line or a retry', async (t) => {
  const cart = storefront(t);
  cart.edit('cart-items', a, 5);
  cart.edit('cart-items', b, 2);
  await cart.tick(300);
  await cart.respond('Only 3 available');
  await cart.respond();
  assert.deepEqual([...cart.store], [[a, 1], [b, 2], [c, 1]]);
  cart.edit('cart-items', a, 3);
  await cart.tick(300);
  await cart.respond();
  assert.deepEqual([...cart.store], [[a, 3], [b, 2], [c, 1]]);
  cart.assertRendered();
});

// Review feedback on PR #4: a change queued for a line must follow it when Shopify re-keys that line.
const rekeyA = { rekey: (id, quantity) => (id === a && quantity === 2 ? '101:discounted' : undefined) };

test('a queued edit follows the line when the previous response re-keys it', async (t) => {
  const cart = storefront(t, rekeyA);
  cart.edit('cart-items', a, 2);
  await cart.tick(300);
  cart.edit('cart-drawer-items', a, 3);
  await cart.tick(300);
  await cart.respond();
  await cart.tick(0);
  await cart.respond();
  assert.deepEqual(cart.calls, [{ id: a, quantity: 2 }, { id: '101:discounted', quantity: 3 }]);
  assert.deepEqual([...cart.store], [['101:discounted', 3], [b, 1], [c, 1]]);
  cart.assertRendered();
});

test('a queued removal follows the line when the previous response re-keys it', async (t) => {
  const cart = storefront(t, rekeyA);
  cart.edit('cart-items', a, 2);
  await cart.tick(300);
  cart.remove('cart-drawer-items', a);
  await cart.tick(0);
  await cart.respond();
  await cart.tick(0);
  await cart.respond();
  assert.deepEqual(cart.calls, [{ id: a, quantity: 2 }, { id: '101:discounted', quantity: 0 }]);
  assert.deepEqual([...cart.store], [[b, 1], [c, 1]]);
  cart.assertRendered();
});

test('an edit still inside its debounce window follows the line when it is re-keyed', async (t) => {
  const cart = storefront(t, rekeyA);
  cart.edit('cart-items', a, 2);
  await cart.tick(300);
  cart.edit('cart-drawer-items', a, 3);
  await cart.tick(100);
  await cart.respond();
  await cart.tick(300);
  await cart.respond();
  assert.deepEqual(cart.calls, [{ id: a, quantity: 2 }, { id: '101:discounted', quantity: 3 }]);
  assert.deepEqual([...cart.store], [['101:discounted', 3], [b, 1], [c, 1]]);
  cart.assertRendered();
});

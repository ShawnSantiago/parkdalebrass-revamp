class CartRemoveButton extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('click', (event) => {
      event.preventDefault();
      const cartItems = this.closest('cart-items') || this.closest('cart-drawer-items');
      cartItems.updateQuantity(this.dataset.index, 0, event);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends window.StandardEvents.createViewEventElement(HTMLElement) {
  constructor() {
    super();
    /* PB: capture quantity changes before another line's section render (D-25). */
    this.addEventListener('change', (event) => {
      if (event.target.matches('.quantity__input')) this.validateQuantity(event);
    });
    /* /PB */
  }

  cartUpdateUnsubscriber = undefined;

  static pendingCartDataPromise = null;

  connectedCallback() {
    // The factory base class auto-dispatches cart:view from the
    // `view-event-payload` attribute (Liquid filter output). The drawer
    // sets `view-event-trigger="manual"` to skip auto-dispatch.
    super.connectedCallback();

    this.cartUpdateUnsubscriber = subscribe(PUB_SUB_EVENTS.cartUpdate, (event) => {
      if (event.source === 'cart-items') return;
      return this.onCartUpdate();
    });
  }

  // Fetches the full cart shape (used to resolve the cart:lines-update event
  // promise after /cart/add.js, which only returns the added line — not the
  // post-mutation cart aggregates). De-duplicated across concurrent callers.
  static fetchCartData() {
    if (!CartItems.pendingCartDataPromise) {
      const pendingCartDataPromise = fetch(`${routes.cart_url}.json`)
        .then((response) => response.json())
        .catch(() => null)
        .finally(() => {
          if (CartItems.pendingCartDataPromise === pendingCartDataPromise) CartItems.pendingCartDataPromise = null;
        });

      CartItems.pendingCartDataPromise = pendingCartDataPromise;
    }
    return CartItems.pendingCartDataPromise;
  }

  disconnectedCallback() {
    if (this.cartUpdateUnsubscriber) {
      this.cartUpdateUnsubscriber();
    }
  }

  /* PB: use the originating input for both the page and drawer (D-25). */
  setValidity(event, message) {
    event.target.setCustomValidity(message);
    event.target.reportValidity();
    const pending = CartItems.pendingQuantities.get(event.target.dataset.quantityLineKey);
    event.target.value = pending?.quantity ?? event.target.defaultValue;
    event.target.select();
  }

  /* /PB */

  validateQuantity(event) {
    const inputValue = parseInt(event.target.value);
    const index = event.target.dataset.index;
    let message = '';

    if (inputValue < event.target.dataset.min) {
      message = window.quickOrderListStrings.min_error.replace('[min]', event.target.dataset.min);
    } else if (inputValue > parseInt(event.target.max)) {
      message = window.quickOrderListStrings.max_error.replace('[max]', event.target.max);
    } else if (inputValue % parseInt(event.target.step) !== 0) {
      message = window.quickOrderListStrings.step_error.replace('[step]', event.target.step);
    }

    if (message) {
      this.setValidity(event, message);
    } else {
      event.target.setCustomValidity('');
      event.target.reportValidity();
      this.updateQuantity(
        index,
        inputValue,
        event,
        document.activeElement.getAttribute('name'),
        event.target.dataset.quantityVariantId
      );
    }
  }

  onCartUpdate() {
    if (this.tagName === 'CART-DRAWER-ITEMS') {
      return fetch(`${routes.cart_url}?section_id=cart-drawer`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const selectors = ['cart-drawer-items', '.cart-drawer__footer'];
          for (const selector of selectors) {
            const targetElement = document.querySelector(selector);
            const sourceElement = html.querySelector(selector);
            if (targetElement && sourceElement) {
              targetElement.replaceWith(sourceElement);
            }
          }
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      return fetch(`${routes.cart_url}?section_id=main-cart-items`)
        .then((response) => response.text())
        .then((responseText) => {
          const html = new DOMParser().parseFromString(responseText, 'text/html');
          const sourceQty = html.querySelector('cart-items');
          this.innerHTML = sourceQty.innerHTML;
        })
        .catch((e) => {
          console.error(e);
        });
    }
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section',
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section',
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer')?.dataset.id,
        selector: '.js-contents',
      },
    ];
  }

  /* PB: coalesce edits to each line, then serialize cart mutations across the page and drawer (D-25). */
  static pendingQuantities = new Map();
  static quantityRequest = Promise.resolve();

  updateQuantity(line, quantity, event, name, variantId) {
    const input = this.querySelector(`#Quantity-${line}, #Drawer-quantity-${line}`);
    if (!input) return;
    const lineKey = input.dataset.quantityLineKey;
    const key = lineKey || input; // Older cached markup may lack a key.
    const action = event.currentTarget instanceof CartRemoveButton ? 'clear' : 'change';
    const change = { quantity };
    clearTimeout(CartItems.pendingQuantities.get(key)?.timer);
    CartItems.pendingQuantities.set(key, change);

    const enqueue = () => {
      CartItems.quantityRequest = CartItems.quantityRequest.then(async () => {
        if (CartItems.pendingQuantities.get(key) !== change) return;
        try {
          // Drawer section replacement installs a new CartDrawerItems instance.
          const cart = this.isConnected ? this : document.querySelector(this.localName);
          if (!cart) return;
          const current = lineKey
            ? cart.querySelector(`[data-quantity-line-key="${CSS.escape(lineKey)}"]`)
            : input.isConnected && input;
          if (current) {
            await cart.changeQuantity(current, quantity, action, name, variantId);
          } else if (quantity !== 0 || !lineKey) {
            cart.showQuantityError();
          }
        } finally {
          if (CartItems.pendingQuantities.get(key) === change) CartItems.pendingQuantities.delete(key);
        }
      }).catch(console.error);
    };

    if (action === 'clear') enqueue();
    else change.timer = setTimeout(enqueue, ON_CHANGE_DEBOUNCE_TIMER);
  }

  showQuantityError() {
    const errors = document.getElementById(this.localName === 'cart-items' ? 'cart-errors' : 'CartDrawer-CartErrors');
    if (errors) errors.textContent = window.cartStrings.error;
  }

  changeQuantity(quantityInput, quantity, eventTarget, name, variantId) {
    const line = quantityInput.dataset.index;
    const lineKey = quantityInput.dataset.quantityLineKey;
    const cartPerformanceUpdateMarker = CartPerformance.createStartingMarker(`${eventTarget}:user-action`);
    this.enableLoading(line);

    const action = quantity === 0 ? 'remove' : 'update';
    const lineVariantId = variantId || quantityInput.dataset.quantityVariantId;
    const linesUpdateDeferred = this.createCartLinesUpdateEvent(action, lineVariantId, quantity, lineKey);

    // Both views may be mounted on /cart. Their combined, deduplicated list is at most five Shopify sections.
    const cartViews = document.querySelectorAll('cart-items, cart-drawer-items');
    const sections = new Map();
    for (const cart of cartViews) {
      for (const section of cart.getSectionsToRender()) {
        if (section.section) sections.set(section.id, section);
      }
    }
    const sectionsToRender = [...sections.values()];
    const body = JSON.stringify({
      ...(lineKey ? { id: lineKey } : { line }),
      quantity,
      sections: sectionsToRender.map((section) => section.section),
      sections_url: window.location.pathname,
    });

    return fetch(`${routes.cart_change_url}`, { ...fetchConfig(), ...{ body } })
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);

        if (parsedState.errors) {
          this.dispatchCartErrorEvent(parsedState.errors, 'INVALID');
          linesUpdateDeferred?.reject(new Error(parsedState.errors));
        } else {
          this.resolveCartLinesUpdate(linesUpdateDeferred, parsedState);
        }

        CartPerformance.measure(`${eventTarget}:paint-updated-sections`, () => {
          if (parsedState.errors) {
            const pending = CartItems.pendingQuantities.get(lineKey || quantityInput);
            if (pending?.quantity === quantity) quantityInput.value = quantityInput.defaultValue;
            this.updateLiveRegions(line, parsedState.errors);
            return;
          }

          for (const cart of cartViews) cart.classList.toggle('is-empty', parsedState.item_count === 0);
          const cartDrawerWrapper = document.querySelector('cart-drawer');
          const cartFooter = document.getElementById('main-cart-footer');

          if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);
          if (cartDrawerWrapper) cartDrawerWrapper.classList.toggle('is-empty', parsedState.item_count === 0);

          sectionsToRender.forEach((section) => {
            const elementToReplace =
              document.getElementById(section.id).querySelector(section.selector) ||
              document.getElementById(section.id);
            elementToReplace.innerHTML = this.getSectionInnerHTML(
              parsedState.sections[section.section],
              section.selector
            );
          });
          // Keep unsent input visible when an earlier response has just replaced its row.
          for (const input of document.querySelectorAll('[data-quantity-line-key]')) {
            const pending = CartItems.pendingQuantities.get(input.dataset.quantityLineKey);
            if (pending && (input.dataset.quantityLineKey !== lineKey || pending.quantity !== quantity)) {
              input.value = pending.quantity;
            }
          }

          // Shopify can re-key a line when a quantity change alters its discount.
          const updatedItem = parsedState.items.find((item) => item.key === lineKey) ?? parsedState.items[line - 1];
          const updatedValue = updatedItem?.quantity;
          let message = '';
          if (quantity !== 0 && updatedValue !== quantity) {
            message = updatedValue === undefined
              ? window.cartStrings.error
              : window.cartStrings.quantityError.replace('[quantity]', updatedValue);
          }
          this.updateLiveRegions(line, message);

          const isDrawer = this.localName === 'cart-drawer-items';
          const lineItem = document.getElementById(`${isDrawer ? 'CartDrawer-Item' : 'CartItem'}-${line}`);
          const focusTarget = name && lineItem?.querySelector(`[name="${CSS.escape(name)}"]`);
          if (focusTarget) {
            if (isDrawer) trapFocus(cartDrawerWrapper, focusTarget);
            else focusTarget.focus();
          } else if (isDrawer && parsedState.item_count === 0 && cartDrawerWrapper?.querySelector('.drawer__inner-empty')) {
            trapFocus(cartDrawerWrapper.querySelector('.drawer__inner-empty'), cartDrawerWrapper.querySelector('a'));
          } else if (isDrawer && cartDrawerWrapper?.querySelector('.cart-item__name')) {
            trapFocus(cartDrawerWrapper, cartDrawerWrapper.querySelector('.cart-item__name'));
          }
        });

        if (!parsedState.errors) {
          publish(PUB_SUB_EVENTS.cartUpdate, { source: 'cart-items', cartData: parsedState, variantId });
        }
      })
      .catch((e) => {
        this.querySelectorAll('.loading__spinner').forEach((overlay) => overlay.classList.add('hidden'));
        this.showQuantityError();
        this.dispatchCartErrorEvent(window.cartStrings.error, 'SERVICE_UNAVAILABLE');
        linesUpdateDeferred?.reject(e);
      })
      .finally(() => {
        this.disableLoading(line);
        CartPerformance.measureFromMarker(`${eventTarget}:user-action`, cartPerformanceUpdateMarker);
      });
  }

  /* /PB */

  createCartLinesUpdateEvent(action, variantId, quantity, lineKey) {
    const { CartLinesUpdateEvent } = window.StandardEvents || {};
    if (!CartLinesUpdateEvent || !variantId) return null;
    // No AJAX line key on the row — likely cached HTML rendered before this
    // attribute landed. Skip dispatch rather than emit an event with id: ''.
    if (!lineKey) return null;

    const deferred = CartLinesUpdateEvent.createPromise();
    this.dispatchEvent(
      new CartLinesUpdateEvent({
        action,
        context: 'cart',
        lines: [{ id: lineKey, quantity }],
        promise: deferred.promise,
      })
    );
    return deferred;
  }

  resolveCartLinesUpdate(deferred, parsedState) {
    if (!deferred) return;
    const { CartLinesUpdateEvent } = window.StandardEvents || {};
    if (!CartLinesUpdateEvent) return;

    deferred.resolve({ cart: CartLinesUpdateEvent.createCartFromAjaxResponse(parsedState) });
  }

  dispatchCartErrorEvent(message, code) {
    const { CartErrorEvent } = window.StandardEvents || {};
    if (!CartErrorEvent) return;
    this.dispatchEvent(new CartErrorEvent({ error: message, code }));
  }

  updateLiveRegions(line, message) {
    /* PB: use the active cart view's live regions after section replacement (D-25). */
    const isDrawer = this.localName === 'cart-drawer-items';
    const lineItemError = document.getElementById(`${isDrawer ? 'CartDrawer-LineItemError' : 'Line-item-error'}-${line}`);
    if (lineItemError) lineItemError.querySelector('.cart-item__error-text').textContent = message;

    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById(isDrawer ? 'CartDrawer-LiveRegionText' : 'cart-live-region-text');
    /* /PB */
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser().parseFromString(html, 'text/html').querySelector(selector).innerHTML;
  }

  /* PB: loading state belongs to the initiating cart view (D-25). */
  get lineItemStatusElement() {
    return document.getElementById(this.localName === 'cart-items' ? 'shopping-cart-line-item-status' : 'CartDrawer-LineItemStatus');
  }

  get itemsContainer() {
    return document.getElementById(this.localName === 'cart-items' ? 'main-cart-items' : 'CartDrawer-CartItems');
  }

  enableLoading(line) {
    this.itemsContainer.classList.add('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    [...cartItemElements, ...cartDrawerItemElements].forEach((overlay) => overlay.classList.remove('hidden'));

    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading(line) {
    this.itemsContainer.classList.remove('cart__items--disabled');

    const cartItemElements = this.querySelectorAll(`#CartItem-${line} .loading__spinner`);
    const cartDrawerItemElements = this.querySelectorAll(`#CartDrawer-Item-${line} .loading__spinner`);

    cartItemElements.forEach((overlay) => overlay.classList.add('hidden'));
    cartDrawerItemElements.forEach((overlay) => overlay.classList.add('hidden'));
  }
  /* /PB */
}

customElements.define('cart-items', CartItems);

if (!customElements.get('cart-note')) {
  customElements.define(
    'cart-note',
    class CartNote extends HTMLElement {
      constructor() {
        super();

        this.addEventListener(
          'input',
          debounce((event) => {
            const newNote = event.target.value;
            const noteDeferred = this.dispatchNoteUpdateEvent(newNote);

            const body = JSON.stringify({ note: newNote });
            fetch(`${routes.cart_update_url}`, { ...fetchConfig(), ...{ body } })
              .then((r) => r.json())
              .then((cart) => {
                if (!cart || cart.errors) {
                  throw Object.assign(new Error(cart?.errors), { code: 'INVALID' });
                }

                if (noteDeferred) {
                  const { CartNoteUpdateEvent } = window.StandardEvents || {};
                  if (CartNoteUpdateEvent) {
                    noteDeferred.resolve({ cart: CartNoteUpdateEvent.createCartFromAjaxResponse(cart) });
                  }
                }
                CartPerformance.measureFromEvent('note-update:user-action', event);
              })
              .catch((e) => {
                noteDeferred?.reject(e);
                const { CartErrorEvent } = window.StandardEvents || {};
                if (CartErrorEvent) {
                  this.dispatchEvent(
                    new CartErrorEvent({
                      error: e.message || 'Note update failed',
                      code: e.code || 'SERVICE_UNAVAILABLE',
                    })
                  );
                }
              });
          }, ON_CHANGE_DEBOUNCE_TIMER)
        );
      }

      dispatchNoteUpdateEvent(newNote) {
        const { CartNoteUpdateEvent } = window.StandardEvents || {};
        if (!CartNoteUpdateEvent) return null;

        const context = this.closest('dialog') || this.closest('cart-drawer') ? 'dialog' : 'cart';
        const deferred = CartNoteUpdateEvent.createPromise();

        this.dispatchEvent(
          new CartNoteUpdateEvent({
            context,
            note: newNote,
            promise: deferred.promise,
          })
        );

        return deferred;
      }
    }
  );
}

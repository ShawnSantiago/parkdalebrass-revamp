/*
 * Parkdale Brass: product page state for the Archive layout (D-23, 02 §6.2, 03 §5.5).
 *
 * 1. "Select a size" start state. main-product renders the Size radios unchecked, the Add to bag button as
 *    "Select a size" with aria-disabled, and an empty variant input. Dawn's form ignores submits while the
 *    button is aria-disabled. This element keeps that state until the shopper picks a size:
 *    - changing another option first sends Dawn a provisional size, so Dawn's request always names a full
 *      variant, then restores the start state once Dawn has redrawn the picker. If that combination has no
 *      variant, it asks again with the next size, so the price shown belongs to a real variant;
 *    - after a size is picked, Dawn's variant flow takes over unchanged. If a redrawn picker comes back with
 *      no size checked, the chosen size is checked again.
 *    A shared ?variant= link never reaches this state: main-product only renders it without one.
 *    Pickup availability stays hidden while the button is in this state (CSS on [data-pb-select-size]).
 * 2. The role="status" line under the button, written when Dawn's product form adds this product.
 *
 * Works on the product page and in Dawn's quick add, which copies product-info and rewrites its IDs, so every
 * lookup is scoped to this product-info.
 *
 * Hooks: Dawn's PUB_SUB_EVENTS.optionValueSelectionChange, variantChange and cartUpdate (assets/constants.js),
 * and the DOM that product-info.js and product-form.js already manage. It doesn't replace any of Dawn's
 * product JavaScript.
 */
if (!customElements.get('pb-product-state')) {
  customElements.define(
    'pb-product-state',
    class PbProductState extends HTMLElement {
      connectedCallback() {
        this.productInfo = this.closest('product-info');
        if (!this.productInfo) return;

        this.sizeChosen = this.dataset.sizeStart !== 'true';
        this.chosenSizeValueId = null;
        this.optionTargetId = null;
        this.triedSizes = new Set();
        this.expectVariantChange = false;

        this.onChangeCapture = this.onChangeCapture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.productInfo.addEventListener('change', this.onChangeCapture, true);
        this.productInfo.addEventListener('submit', this.onSubmit);

        this.unsubscribers = [
          subscribe(PUB_SUB_EVENTS.variantChange, this.onVariantChange.bind(this)),
          subscribe(PUB_SUB_EVENTS.cartUpdate, this.onCartUpdate.bind(this)),
        ];

        // Browsers can restore form state on reload, so apply the start state rather than trust the markup.
        if (!this.sizeChosen) this.applyStartState();
      }

      disconnectedCallback() {
        this.productInfo?.removeEventListener('change', this.onChangeCapture, true);
        this.productInfo?.removeEventListener('submit', this.onSubmit);
        this.unsubscribers?.forEach((unsubscribe) => unsubscribe());
      }

      // Quick add rewrites the section ID in product-info and in every ID inside it, so read it from there.
      byId(prefix) {
        return this.productInfo.querySelector(`[id="${prefix}-${this.productInfo.dataset.section}"]`);
      }

      get variantSelects() {
        // While Dawn swaps the picker, the new one is inserted before the old one.
        return this.productInfo.querySelector('variant-selects');
      }

      get sizeInputs() {
        return Array.from(this.variantSelects?.querySelectorAll('.pb-option--size input[type="radio"]') || []);
      }

      get submitButton() {
        return this.byId('ProductSubmitButton');
      }

      get variantInput() {
        return this.byId('product-form')?.querySelector('input[name="id"]');
      }

      get status() {
        return this.byId('PbProductStatus');
      }

      isSizeInput(element) {
        return element instanceof HTMLInputElement && element.type === 'radio' && !!element.closest('.pb-option--size');
      }

      setSizeLegend(text) {
        const value = this.variantSelects?.querySelector('.pb-option--size [data-selected-value]');
        if (value) value.textContent = text;
      }

      // Runs before Dawn's change listener on variant-selects.
      onChangeCapture(event) {
        const target = event.target;
        if (target && target === this.variantInput) {
          this.onVariantInput(target.value);
          return;
        }
        if (!target?.closest?.('variant-selects')) return;

        if (this.isSizeInput(target)) {
          this.chosenSizeValueId = target.dataset.optionValueId;
          if (!this.sizeChosen) {
            this.sizeChosen = true;
            this.clearStartState();
          }
          return;
        }

        if (this.sizeChosen) return;
        this.optionTargetId = target.id;
        this.triedSizes.clear();
        const inputs = this.sizeInputs;
        if (inputs.length && !inputs.some((input) => input.checked)) {
          this.checkProvisional(inputs.find((input) => !input.classList.contains('disabled')) || inputs[0]);
        }
      }

      // Without a size, Dawn would ask Shopify for a partial set of option values. Give it one to resolve.
      checkProvisional(input) {
        input.checked = true;
        input.classList.add('pb-option__input--provisional');
        this.triedSizes.add(input.dataset.optionValueId);
      }

      // Dawn's product-info writes the variant ID here just before it publishes variantChange, or instead of it
      // when the chosen values have no variant (its "Unavailable" path). This tells the two apart.
      onVariantInput(value) {
        this.expectVariantChange = value !== '';
        if (value !== '') return;
        // Let Dawn finish its unavailable path first.
        queueMicrotask(() => (this.sizeChosen ? this.restoreChosenSize() : this.tryNextSize()));
      }

      // The provisional size has no variant with the new values. Ask again with the next size, available first.
      tryNextSize() {
        const inputs = this.sizeInputs;
        const untried = inputs.filter((input) => !this.triedSizes.has(input.dataset.optionValueId));
        const next = untried.find((input) => !input.classList.contains('disabled')) || untried[0];
        if (!next) {
          this.applyStartState();
          return;
        }

        inputs.forEach((input) => (input.checked = false));
        this.checkProvisional(next);
        this.showSelectSize();
        const target = this.productInfo.querySelector(`[id="${this.optionTargetId}"]`) || next;
        publish(PUB_SUB_EVENTS.optionValueSelectionChange, {
          data: { event: { target }, target, selectedOptionValues: this.variantSelects.selectedOptionValues },
        });
      }

      showSelectSize() {
        const button = this.submitButton;
        if (!button) return;
        button.removeAttribute('disabled');
        button.setAttribute('aria-disabled', 'true');
        button.setAttribute('data-pb-select-size', '');
        const label = button.querySelector('span');
        if (label) label.textContent = this.dataset.selectSize;
      }

      applyStartState() {
        this.sizeInputs.forEach((input) => {
          input.checked = false;
          input.classList.remove('pb-option__input--provisional');
        });
        this.setSizeLegend(this.dataset.selectSize);
        this.showSelectSize();
        if (this.variantInput) this.variantInput.value = '';

        // Quick add never changes the page URL.
        if (this.productInfo.dataset.updateUrl === 'false') return;
        const url = new URL(window.location.href);
        if (url.searchParams.has('variant')) {
          url.searchParams.delete('variant');
          window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
        }
      }

      // Dawn's own response handling sets the label and disabled state from here on.
      clearStartState() {
        const button = this.submitButton;
        if (!button?.hasAttribute('data-pb-select-size')) return;
        button.removeAttribute('data-pb-select-size');
        button.removeAttribute('aria-disabled');
      }

      restoreChosenSize() {
        const inputs = this.sizeInputs;
        if (!inputs.length || inputs.some((input) => input.checked)) return;
        const chosen = inputs.find((input) => input.dataset.optionValueId === this.chosenSizeValueId);
        if (!chosen) return;
        chosen.checked = true;
        this.setSizeLegend(chosen.value);
      }

      onVariantChange() {
        // Only the product-info whose variant input just changed (the page and quick add share a section ID).
        if (!this.expectVariantChange) return;
        this.expectVariantChange = false;
        if (this.status) this.status.textContent = '';

        if (this.sizeChosen) {
          this.restoreChosenSize();
        } else {
          this.applyStartState();
        }
      }

      onSubmit(event) {
        const form = this.byId('product-form');
        if (!form || event.target !== form) return;
        if (this.status) this.status.textContent = '';
        if (this.sizeChosen) return;

        event.preventDefault();
        if (this.status) this.status.textContent = this.dataset.selectSize;
        const inputs = this.sizeInputs;
        (inputs.find((input) => !input.classList.contains('disabled')) || inputs[0])?.focus();
      }

      onCartUpdate({ source, cartData } = {}) {
        if (source !== 'product-form' || !cartData || !this.status) return;
        if (String(cartData.product_id) !== String(this.productInfo.dataset.productId)) return;

        const parts = [cartData.product_title];
        if (!cartData.product_has_only_default_variant) {
          (cartData.options_with_values || []).forEach((option) => parts.push(option.value));
        }
        this.status.textContent = this.dataset.added.replace('[item]', parts.filter(Boolean).join(', '));
      }
    }
  );
}

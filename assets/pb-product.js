/*
 * Parkdale Brass: product page state for the Archive layout (D-23, 02 §6.2, 03 §5.5).
 *
 * 1. "Select a size" start state. main-product renders the Size radios unchecked, the Add to bag button as
 *    "Select a size" with aria-disabled, and an empty variant input. Dawn's form ignores submits while the
 *    button is aria-disabled. This element keeps that state until the shopper picks a size:
 *    - changing another option first sends Dawn a provisional size, so Dawn's request always names a full
 *      variant, then restores the start state once Dawn has redrawn the picker;
 *    - after a size is picked, Dawn's variant flow takes over unchanged. If a redrawn picker comes back with
 *      no size checked, the chosen size is checked again.
 *    A shared ?variant= link never reaches this state: main-product only renders it without one.
 * 2. The role="status" line under the button, written when Dawn's product form adds this product.
 *
 * Hooks: Dawn's PUB_SUB_EVENTS.variantChange and cartUpdate (assets/constants.js) and the DOM that
 * product-info.js and product-form.js already manage. It doesn't replace any of Dawn's product JavaScript.
 */
if (!customElements.get('pb-product-state')) {
  customElements.define(
    'pb-product-state',
    class PbProductState extends HTMLElement {
      connectedCallback() {
        this.productInfo = this.closest('product-info');
        if (!this.productInfo || this.closest('quick-add-modal')) return;

        this.sectionId = this.dataset.section;
        this.sizeChosen = this.dataset.sizeStart !== 'true';
        this.chosenSizeValueId = null;

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

      get variantSelects() {
        // While Dawn swaps the picker, the new one is inserted before the old one.
        return this.productInfo.querySelector('variant-selects');
      }

      get sizeInputs() {
        return Array.from(this.variantSelects?.querySelectorAll('.pb-option--size input[type="radio"]') || []);
      }

      get submitButton() {
        return document.getElementById(`ProductSubmitButton-${this.sectionId}`);
      }

      get variantInput() {
        return document.getElementById(`product-form-${this.sectionId}`)?.querySelector('input[name="id"]');
      }

      get status() {
        return document.getElementById(`PbProductStatus-${this.sectionId}`);
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
        if (!target?.closest?.('variant-selects')) return;

        if (this.isSizeInput(target)) {
          if (this.sizeChosen) {
            this.chosenSizeValueId = target.dataset.optionValueId;
            return;
          }
          this.sizeChosen = true;
          this.chosenSizeValueId = target.dataset.optionValueId;
          this.clearStartState();
          return;
        }

        if (!this.sizeChosen) this.checkProvisionalSize();
      }

      // Without a size, Dawn would ask Shopify for a partial set of option values. Give it one to resolve.
      checkProvisionalSize() {
        const inputs = this.sizeInputs;
        if (!inputs.length || inputs.some((input) => input.checked)) return;
        const provisional = inputs.find((input) => !input.classList.contains('disabled')) || inputs[0];
        provisional.checked = true;
        provisional.classList.add('pb-option__input--provisional');
      }

      applyStartState() {
        this.sizeInputs.forEach((input) => {
          input.checked = false;
          input.classList.remove('pb-option__input--provisional');
        });
        this.setSizeLegend(this.dataset.selectSize);

        const button = this.submitButton;
        if (button) {
          button.removeAttribute('disabled');
          button.setAttribute('aria-disabled', 'true');
          button.setAttribute('data-pb-select-size', '');
          const label = button.querySelector('span');
          if (label) label.textContent = this.dataset.selectSize;
        }

        if (this.variantInput) this.variantInput.value = '';

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

      onVariantChange({ data }) {
        if (data?.sectionId !== this.sectionId) return;
        if (this.status) this.status.textContent = '';

        if (this.sizeChosen) {
          this.restoreChosenSize();
        } else {
          this.applyStartState();
        }
      }

      onSubmit(event) {
        // The form has an input named "id", so read the attribute rather than form.id.
        if (event.target?.getAttribute?.('id') !== `product-form-${this.sectionId}`) return;
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

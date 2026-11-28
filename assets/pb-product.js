/*
 * Parkdale Brass: product page state for the Archive layout (D-23, 02 §6.2, 03 §5.5).
 *
 * 1. "Select a size" start state. main-product renders the Size radios unchecked, the button as "Select a size"
 *    (aria-disabled, so Dawn's form ignores submits) and an empty variant input. Until a size is picked,
 *    changing another option sends Dawn a provisional size, so its request names a full variant, then restores
 *    the start state. A size with no variant, or a sold-out one while the redrawn picker shows another size as
 *    available, is retried with the next size, so the price belongs to an available variant when one exists.
 *    Pickup availability stays hidden in this state (CSS on [data-pb-select-size]).
 * 2. Once a size is picked, Dawn's flow takes over. If a new colour doesn't come in that size, the nearest size
 *    it has is selected and the status line says so. A ?variant= link starts here.
 * 3. The role="status" line under the button also confirms an add to bag.
 *
 * Quick add copies product-info and rewrites its IDs, so every lookup is scoped to this product-info.
 * Hooks: Dawn's PUB_SUB_EVENTS optionValueSelectionChange, variantChange and cartUpdate (assets/constants.js).
 * It replaces none of Dawn's product JavaScript.
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
        this.note = '';

        this.onChangeCapture = this.onChangeCapture.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.productInfo.addEventListener('change', this.onChangeCapture, true);
        this.productInfo.addEventListener('submit', this.onSubmit);

        this.unsubscribers = [
          subscribe(PUB_SUB_EVENTS.variantChange, this.onVariantChange.bind(this)),
          subscribe(PUB_SUB_EVENTS.cartUpdate, this.onCartUpdate.bind(this)),
        ];

        // Browsers can restore form state on reload.
        if (!this.sizeChosen) this.applyStartState();
      }

      disconnectedCallback() {
        this.productInfo?.removeEventListener('change', this.onChangeCapture, true);
        this.productInfo?.removeEventListener('submit', this.onSubmit);
        this.unsubscribers?.forEach((unsubscribe) => unsubscribe());
      }

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
        this.showPrice();

        if (this.isSizeInput(target)) {
          this.chosenSizeValueId = target.dataset.optionValueId;
          if (!this.sizeChosen) {
            this.sizeChosen = true;
            this.clearStartState();
          }
          return;
        }

        this.optionTargetId = target.id;
        this.triedSizes.clear();
        const inputs = this.sizeInputs;
        const checked = inputs.find((input) => input.checked);
        if (this.sizeChosen) {
          this.wantedSize = checked?.value;
          if (!checked) return;
          this.chosenSizeValueId = checked.dataset.optionValueId;
          this.triedSizes.add(this.chosenSizeValueId);
        } else if (inputs.length && !checked) {
          this.checkProvisional(this.nextSize());
        }
      }

      // The untried size nearest to index `from`, available (in the current picker) first.
      nextSize(from = 0, availableOnly = false) {
        const inputs = this.sizeInputs;
        const distance = (input) => Math.abs(inputs.indexOf(input) - from);
        const untried = inputs
          .filter((input) => !this.triedSizes.has(input.dataset.optionValueId))
          .sort((a, b) => distance(a) - distance(b));
        return untried.find((input) => !input.classList.contains('disabled')) || (availableOnly ? null : untried[0]);
      }

      checkProvisional(input) {
        input.checked = true;
        input.classList.add('pb-option__input--provisional');
        this.triedSizes.add(input.dataset.optionValueId);
      }

      // Dawn writes the variant ID here before it publishes variantChange, or '' when the values have no variant.
      onVariantInput(value) {
        this.expectVariantChange = value !== '';
        if (value !== '') return;
        queueMicrotask(() => (this.sizeChosen ? this.switchSize() : this.tryNextSize()));
      }

      tryNextSize(next = this.nextSize()) {
        if (!next) {
          this.applyStartState();
          return;
        }
        this.sizeInputs.forEach((input) => (input.checked = false));
        this.checkProvisional(next);
        this.showSelectSize();
        this.requestVariant(next);
      }

      // The chosen size doesn't exist in the new colour: select the nearest size it has and say so.
      switchSize() {
        const inputs = this.sizeInputs;
        const next = this.nextSize(inputs.findIndex((input) => input.dataset.optionValueId === this.chosenSizeValueId));
        if (!next || !this.wantedSize) {
          this.restoreChosenSize();
          return;
        }
        inputs.forEach((input) => (input.checked = false));
        next.checked = true;
        this.triedSizes.add((this.chosenSizeValueId = next.dataset.optionValueId));
        this.setSizeLegend(next.value);
        const option = this.productInfo.querySelector(`[id="${this.optionTargetId}"]`);
        this.note = this.dataset.switched
          .replace('[size]', this.wantedSize)
          .replace('[option]', option?.value || '')
          .replace('[new]', next.value);
        this.requestVariant(next);
      }

      requestVariant(fallback) {
        const target = this.productInfo.querySelector(`[id="${this.optionTargetId}"]`) || fallback;
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
        this.showPrice();
        this.sizeInputs.forEach((input) => {
          input.checked = false;
          input.classList.remove('pb-option__input--provisional');
        });
        this.setSizeLegend(this.dataset.selectSize);
        this.showSelectSize();
        if (this.variantInput) this.variantInput.value = '';

        if (this.productInfo.dataset.updateUrl === 'false') return;
        const url = new URL(window.location.href);
        if (url.searchParams.has('variant')) {
          url.searchParams.delete('variant');
          window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
        }
      }

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

      onVariantChange({ data } = {}) {
        // Only the product-info whose variant input changed (the page and quick add share a section ID).
        if (!this.expectVariantChange) return;
        this.expectVariantChange = false;
        if (this.status) this.status.textContent = this.note;
        this.note = '';
        this.showPrice();

        if (this.sizeChosen) {
          this.restoreChosenSize();
          return;
        }
        // A sold-out provisional size: try one the redrawn picker shows as available, with the sold-out price
        // hidden meanwhile. If none is available, sold out stands.
        const next = data?.variant?.available === false && this.nextSize(0, true);
        if (next) {
          this.byId('price')?.classList.add('visibility-hidden');
          this.tryNextSize(next);
        } else {
          this.applyStartState();
        }
      }

      showPrice() {
        this.byId('price')?.classList.remove('visibility-hidden');
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

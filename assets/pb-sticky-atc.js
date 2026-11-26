/*
 * Parkdale Brass: mobile sticky add-to-bag bar (02 §6.4, 03 §4.10, D-22). Markup: snippets/pb-sticky-atc.liquid.
 *
 * Shows under 750px only, when all of these hold:
 * - the main Add to bag button has scrolled up out of view (not while it's still below the fold);
 * - the main button can add a variant: not disabled, and not in the "Select a size" state (assets/pb-product.js);
 * - no product form error is showing, so the bar never covers one;
 * - the cart drawer is closed.
 * The bar's button submits the main product form, so Dawn's cart logic, errors and drawer stay in charge.
 * It updates its options and price from Dawn's PUB_SUB_EVENTS.variantChange event.
 *
 * While hidden the bar stays in the DOM (transparent, aria-hidden, out of the tab order) so the cart drawer can
 * return focus to its button when it closes. It never traps focus.
 */
if (!customElements.get('pb-sticky-atc')) {
  customElements.define(
    'pb-sticky-atc',
    class PbStickyAtc extends HTMLElement {
      connectedCallback() {
        this.sectionId = this.dataset.section;
        this.button = this.querySelector('.pb-sticky-atc__button');
        this.optionsText = this.querySelector('[data-pb-sticky-options]');
        this.priceText = this.querySelector('[data-pb-sticky-price]');
        this.mql = window.matchMedia('(max-width: 749px)');
        this.mainOutOfView = false;
        this.submittedFromBar = false;

        this.update = this.update.bind(this);
        this.onClick = this.onClick.bind(this);
        this.button?.addEventListener('click', this.onClick);
        this.mql.addEventListener?.('change', this.update);

        if (document.querySelector('cart-drawer')) this.button?.setAttribute('aria-haspopup', 'dialog');

        this.observe();
        this.unsubscribers = [
          subscribe(PUB_SUB_EVENTS.variantChange, this.onVariantChange.bind(this)),
          subscribe(PUB_SUB_EVENTS.cartError, this.onCartError.bind(this)),
          subscribe(PUB_SUB_EVENTS.cartUpdate, () => {
            this.submittedFromBar = false;
          }),
        ];
        this.update();
      }

      disconnectedCallback() {
        this.button?.removeEventListener('click', this.onClick);
        this.mql?.removeEventListener?.('change', this.update);
        this.intersection?.disconnect();
        this.reachIntersection?.disconnect();
        this.mutations?.disconnect();
        this.unsubscribers?.forEach((unsubscribe) => unsubscribe());
        document.body.classList.remove('pb-sticky-atc-visible');
      }

      get mainButton() {
        return document.getElementById(`ProductSubmitButton-${this.sectionId}`);
      }

      get form() {
        return document.getElementById(`product-form-${this.sectionId}`);
      }

      get errorWrapper() {
        return this.mainButton?.closest('product-form')?.querySelector('.product-form__error-message-wrapper');
      }

      get drawer() {
        return document.querySelector('cart-drawer');
      }

      observe() {
        const main = this.mainButton;
        if (!main) return;

        // "Scrolled past" = not in view, but inside a root stretched far above the viewport. Two observers keep
        // this right even when a jump (anchor, restored scroll position) skips over the button.
        this.inView = false;
        this.reached = false;
        this.intersection = new IntersectionObserver(([entry]) => {
          this.inView = entry.isIntersecting;
          this.mainOutOfView = this.reached && !this.inView;
          this.update();
        });
        this.reachIntersection = new IntersectionObserver(
          ([entry]) => {
            this.reached = entry.isIntersecting;
            this.mainOutOfView = this.reached && !this.inView;
            this.update();
          },
          { rootMargin: '100000px 0px 0px 0px' }
        );
        this.intersection.observe(main);
        this.reachIntersection.observe(main);

        this.mutations = new MutationObserver(this.update);
        this.mutations.observe(main, { attributes: true, attributeFilter: ['disabled', 'aria-disabled', 'class', 'data-pb-select-size'] });
        if (this.errorWrapper) this.mutations.observe(this.errorWrapper, { attributes: true, attributeFilter: ['hidden'] });
        if (this.drawer) this.mutations.observe(this.drawer, { attributes: true, attributeFilter: ['class'] });
      }

      canAdd() {
        const main = this.mainButton;
        if (!main || main.disabled || main.hasAttribute('data-pb-select-size')) return false;
        // Dawn sets aria-disabled while it adds to the bag; keep the bar steady during that request.
        return main.getAttribute('aria-disabled') !== 'true' || main.classList.contains('loading');
      }

      update() {
        const errorShown = this.errorWrapper ? !this.errorWrapper.hidden : false;
        const drawerOpen = this.drawer?.classList.contains('active') || false;
        const show = this.mql.matches && this.mainOutOfView && this.canAdd() && !errorShown && !drawerOpen;

        this.classList.toggle('is-visible', show);
        this.setAttribute('aria-hidden', String(!show));
        if (this.button) {
          this.button.tabIndex = show ? 0 : -1;
          if (this.mainButton?.classList.contains('loading')) {
            this.button.setAttribute('aria-busy', 'true');
          } else {
            this.button.removeAttribute('aria-busy');
          }
        }
        document.body.classList.toggle('pb-sticky-atc-visible', show);
      }

      onClick() {
        if (!this.classList.contains('is-visible') || !this.canAdd()) return;
        const form = this.form;
        const main = this.mainButton;
        if (!form || !main) return;
        this.submittedFromBar = true;
        if (typeof form.requestSubmit === 'function') {
          form.requestSubmit(main);
        } else {
          main.click();
        }
      }

      onCartError({ source } = {}) {
        if (source !== 'product-form' || !this.submittedFromBar) return;
        this.submittedFromBar = false;
        // The error sits by the main button. Bring it into view; the bar hides while it shows.
        window.setTimeout(() => {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          this.errorWrapper?.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        });
      }

      onVariantChange({ data } = {}) {
        if (data?.sectionId !== this.sectionId) return;
        const variant = data.variant;
        if (variant && this.optionsText && this.optionsText.dataset.defaultOnly !== 'true') {
          this.optionsText.textContent = (variant.options || []).join(' · ');
        }
        const price = document.getElementById(`price-${this.sectionId}`)?.querySelector('.price-item--last');
        if (price && this.priceText) this.priceText.textContent = price.textContent.trim();
        this.update();
      }
    }
  );
}

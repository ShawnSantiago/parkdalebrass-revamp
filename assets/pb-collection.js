/* PB · Archive collection toolbar behaviour (02 §5.3; snippets/pb-collection-toolbar.liquid).
   Loaded by main-collection-product-grid when its Archive layout (pb_layout) is on. It hooks into Dawn's
   menu-drawer, trapFocus (global.js) and the markup facets.js re-renders, without changing any of them. */
(() => {
  if (window.pbCollectionToolbar) return;
  window.pbCollectionToolbar = true;

  /* 1. The filter drawer panel is a modal dialog. Dawn's MenuDrawer leaves focus on the Filter summary, which
     sits outside the dialog and behind the overlay. Once the drawer opens, move focus to the close button and
     keep Tab inside the panel. Closing (Escape, the close button, "Show n pieces") is still Dawn's, and returns
     focus to Filter. */
  document.addEventListener(
    'toggle',
    (event) => {
      const details = event.target;
      if (!(details instanceof HTMLDetailsElement) || !details.open) return;
      if (!details.matches('.pb-filter .mobile-facets__disclosure')) return;

      const panel = details.querySelector('.pb-filter__panel');
      const close = panel && panel.querySelector('.pb-filter__close');
      if (!close) return;

      // Focus now without scrolling: the panel is still sliding in.
      close.focus({ preventScroll: true });

      // Then trap Tab inside the panel once it's in place (trapFocus focuses its target again).
      let trapped = false;
      const trap = () => {
        if (trapped) return;
        trapped = true;
        panel.removeEventListener('transitionend', trap);
        if (details.open && typeof trapFocus === 'function') trapFocus(panel, close);
      };
      panel.addEventListener('transitionend', trap);
      setTimeout(trap, 400);
    },
    true
  );

  /* 2. facets.js replaces the .sorting markup after every update, so a keyboard user who changes Sort loses focus
     to the page. Put focus back on the new Sort select when that happens. */
  let restoreSortFocus = false;

  document.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement && event.target.closest('.pb-toolbar__sort')) {
      restoreSortFocus = true;
    }
  });

  document.addEventListener('focusin', (event) => {
    if (!(event.target instanceof Element) || !event.target.closest('.pb-toolbar__sort')) restoreSortFocus = false;
  });

  const observer = new MutationObserver(() => {
    if (!restoreSortFocus) return;
    const active = document.activeElement;
    if (active && active !== document.body && active.isConnected) return;
    const select = document.querySelector('.pb-toolbar__sort select');
    if (!select) return;
    restoreSortFocus = false;
    select.focus({ preventScroll: true });
  });

  const observe = () => {
    document.querySelectorAll('.pb-toolbar__sort').forEach((sort) => observer.observe(sort, { childList: true }));
  };

  observe();
  document.addEventListener('shopify:section:load', observe);
})();

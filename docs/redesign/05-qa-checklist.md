# 05 · QA checklist and acceptance criteria

Record each result as **Pass / Fail / Not tested**, with evidence (screenshot path, tool output, or the steps followed). Save the results to `docs/redesign/qa-results.md`.

## Environments

- An unpublished theme on the store (`shopify theme push --unpublished`), or `shopify theme dev`.
- Browsers: latest Chrome, Safari (macOS and iOS), Firefox, plus Samsung Internet if possible.
- Widths: **320, 375, 390, 768, 1280, 1440** (the Playwright set). Also check 200% browser zoom at 1280.

## 1 · Visual fidelity (vs `02-design-spec.md`)

- [ ] Ivory ground, charcoal text, bronze eyebrows. Brass is never used as text.
- [ ] Cormorant Garamond headings at 500/600 and Inter body. Only these weights load (check the Network tab).
- [ ] 2px radii; no shadows, gradients or entrance animations.
- [ ] Homepage section order matches 02 §4 in both prelaunch and live configurations.
- [ ] Cards are 4:5, the name/price row is aligned, the descriptor is shown, and the Concept badge appears in prelaunch only.
- [ ] Hero: copy before image on mobile, primary CTA visible without scrolling at 375×667.
- [ ] No horizontal overflow at any width (`document.documentElement.scrollWidth <= innerWidth`).

## 2 · Content honesty

- [ ] No pipe or smoking imagery, copy, reviews, recommendations or metadata on any jewelry page, search result or predictive search for jewelry terms.
- [ ] No invented claims (see the banned list in 04 §1). Every claim is backed by data in a metafield or an approved policy.
- [ ] No fake prices, ratings, review counts, scarcity, discounts, shipping promises or preorders.
- [ ] Concept cards have no price, no product link and no Product JSON-LD.
- [ ] Empty metafields hide their accordion row or line, with no blank "Care" panel.

## 3 · Functionality

- [ ] Header dropdown, mobile drawer (open, close, Esc, focus return) and search (predictive results show only jewelry once legacy items are unpublished).
- [ ] Category tiles hide collections with 0 products; the section disappears if all are empty.
- [ ] Collection: category buttons, availability filter, price filter, sort, pagination, empty state and reset all work.
- [ ] PDP: gallery thumbnails, swipe, zoom/lightbox, finish and size selection update price, availability, URL `?variant=` and images. The sold-out variant shows its state. The Size guide popup opens, traps focus and closes.
- [ ] Add to bag → the cart drawer opens with the correct variant. Quantity +/−, remove and empty cart all work. Errors (e.g. exceeding inventory) are announced.
- [ ] Checkout button hands off to native Shopify checkout. Don't complete an order without a test-order plan.
- [ ] Country/region selector changes currency, and prices localise on cards, PDP and cart.
- [ ] Newsletter: a valid email shows the success message; an invalid one shows the error. The customer is created with the `newsletter` tag and the correct consent state (Admin check).
- [ ] Contact form submits.
- [ ] Mobile sticky add-to-bag (if built) appears only after a variant is selected and the main button is out of view, and never covers errors or the drawer.

## 4 · Accessibility (target WCAG 2.2 AA)

- [ ] Skip link works; one H1 per page; landmarks present (header, nav, main, footer).
- [ ] Keyboard-only run through every flow in §3. Focus is always visible (2px bronze ring) and the order is logical.
- [ ] Drawers and modals: focus trap, Esc to close, focus returns to the trigger.
- [ ] Option groups use `fieldset`/`legend`; selected state is exposed (`checked`/`aria-pressed`); unavailable is announced.
- [ ] Status messages (add to bag, newsletter) use `role="status"` or `aria-live`.
- [ ] Contrast: text ≥ 4.5:1, large text and UI ≥ 3:1. Pay attention to stone on ivory-deep and muted text on charcoal.
- [ ] Touch targets ≥ 44×44 (WCAG 2.5.8 minimum 24×24; the design targets 44).
- [ ] Alt text is meaningful on product images and empty on decorative ones.
- [ ] Usable at 200% zoom and 320px width (reflow).
- [ ] `prefers-reduced-motion` turns off transitions.
- [ ] axe-core finds 0 serious or critical issues on home, collection, PDP, cart drawer open, and the Our Story page.

## 5 · Performance

- [ ] The hero image is the LCP, loaded eagerly with `fetchpriority="high"`, a responsive `srcset` and explicit dimensions.
- [ ] Below-the-fold images are lazy-loaded; no layout shift from images or fonts (`font-display: swap`, preloaded heading font).
- [ ] No new JS beyond the optional `pb-sticky-atc.js` (under 3 KB).
- [ ] Lighthouse mobile on home, collection and PDP is compared to the Phase 0 baseline; regressions are documented. Lab ≠ field: check CrUX / Shopify Web Performance after launch. Targets: LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1.

## 6 · SEO

- [ ] Titles and descriptions per 04 §5; canonical tags correct; no `noindex` on live pages.
- [ ] Structured data validates (Rich Results Test). There's no Product schema for concepts and no review markup.
- [ ] Preserved article URLs return 200; redirects return 301 to relevant destinations; retired URLs return 404/410 as decided.
- [ ] `/sitemap.xml` includes the jewelry pages and excludes unpublished legacy products.
- [ ] OG preview shows the jewelry image (check with a social debugger).

## 7 · Analytics and consent

- [ ] Existing pixels and integrations still fire (Customer Events / app pixels). No new vendors added.
- [ ] Standard events fire once each: `page_viewed`, `collection_viewed`, `product_viewed`, `product_added_to_cart`, `checkout_started`. Check with Shopify's pixel helper or the Customer Events test.
- [ ] The cookie or consent banner (if the store has one) still works and blocks tracking before consent where required.
- [ ] No PII in custom event payloads.

## 8 · Code quality

- [ ] `shopify theme check` reports no new errors. Pre-existing Dawn warnings are listed.
- [ ] `settings_data.json` diff contains only the keys listed in 03 §1.
- [ ] All new UI strings come from locales; merchant text is escaped.
- [ ] No secrets, API keys or store tokens in commits.

## Acceptance (from the brief §13)

The theme is launch-ready only when all of §1–§8 pass, or failures are documented and accepted by the owner, **and** every row in 04 §4 is resolved for the products being launched, **and** the owner has signed off the launch runbook in 01.

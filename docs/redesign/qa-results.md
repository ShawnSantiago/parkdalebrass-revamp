# QA results

Newest record first. Each record says what was tested, on what, and what wasn't tested and why (`05-qa-checklist.md`).

## Phase 2 preview QA (2026-11-27)

Theme source `7a09819` on `pb2/qa-fixes`: Phase 2 plus the 2.x QA fixes for home, collection, product, pages and global. Unpublished preview `196453663042`, renamed **"Parkdale Brass · Archive · Phase 2 7a09819"**. The live Craft theme `168071168322` wasn't touched, and nothing was published.

**How it was tested.** First, a pull of the preview was compared with the branch. Both had the same 404 theme files and the preview had no extra files. Four templates (`404`, `article`, `password`, `product`) differed only by empty `"settings": {}` keys, which Shopify drops. Then a full `shopify theme push --json` to the preview reported `"issues": []`. Playwright Chromium opened each URL on `parkdalebrass.com` with the preview cookie at 1440, 390 and 320 px wide (deviceScaleFactor 1, with mobile emulation under 750). Viewports were 900 px tall, or 844 px for the 390 product, cart and filter flows. Store-level third-party requests (Google Tag Manager, Ordersify, UpPromote, shop.app, `*.shopifysvc.com`, hCaptcha) were blocked to keep the runs fast. Those are store apps, not theme code. Each page was scrolled to the end so lazy sections loaded, then checked. axe-core 4.14.1 ran with the WCAG 2.0, 2.1 and 2.2 A/AA tags plus best-practice. No form was submitted, nothing went to checkout, nobody signed in, and the test cart was cleared afterwards.

**URLs:** home in its prelaunch state (`/`), `/collections/apparel`, `/products/short-sleeve-unisex-t-shirt-4`, Our Story through `/pages/contact-us?view=our-story` (the real `/pages/our-story` is still hidden and returns 404, so this view's H1 reads "Contact Us"), `/blogs/news`, `/search?q=brass` and a missing page for the 404. Also checked: `/blogs/news/tagged/journal`, `/blogs/news/what-is-brass-jewelry-metal`, `/cart` and `/collections/all`. That's 12 URLs at three widths.

### Regression results

| Check | Result | Evidence |
| --- | --- | --- |
| Push and rename | Pass | Full push, `"issues": []`. `theme list` shows `196453663042` as unpublished under the new name. The live theme is still `168071168322`. |
| Console errors from theme code | Pass | None on the 12 URLs at any of the three widths. No theme asset failed to load. The only console errors are expected: the 404 status of the two missing-page documents. Every page also logs three uncaught "Failed to fetch" errors from Shopify's platform scripts (shop-js on `cdn.shopify.com`, the Web Pixels Manager under `/cdn/wpm/`, `shop_events_listener`). They come from requests this run blocks. |
| Liquid errors | Pass | No "Liquid error" and no "translation missing" in any served page. |
| One H1 (D-31) | Pass | Each page renders exactly one H1 at every width: the hero heading, "Apparel", the product title, the page title, "News" ("Journal" on the tag view), "Search results", "Page not found" and the article title. On the empty `/cart`, Dawn also keeps its "Your bag" H1 in the markup, but it's `display: none`, so only one is exposed. |
| axe | Pass | 0 violations of any impact on the 12 URLs at 1440 and 390. Also 0 serious or critical with the cart drawer open and with the filter drawer open, at both widths. Items axe marks "needs review" (not violations): muted SOLD OUT badges over white legacy photos on `/collections/all` and `/search` (COL-08; legacy photos leave with E-08); size-table cells scrolled out of view inside their scroll region on the product page at 390; and the search page input's `aria-owns`/`aria-controls`, which name `predictive-search-results` before Dawn adds it on typing (stock Dawn). |
| No horizontal overflow | Pass | `scrollWidth` equals `innerWidth` on all 12 URLs at 1440, 390 and 320. At 390 it also holds with the sticky bar showing, the cart drawer open and the filter drawer open. The 471 px product size table scrolls inside its own region. |
| Product start state | Pass | On a fresh load at 1440 and 390: none of the 9 size radios is checked, the button reads "Select a size" with `aria-disabled="true"`, there's no SOLD OUT badge, the price is $17.50 and the URL has no `?variant=`. Choosing XS sets `?variant=39432424783934` and the button reads "Add to bag". |
| Sticky add-to-bag at 390 | Pass | Before a size is chosen, the bar stays hidden (`aria-hidden`, opacity 0) even with the main button scrolled away. It also stays hidden while the main button is in view. With XS chosen and the main button out of view, the 73 px bar shows at the bottom: "Short-Sleeve Unisex T-Shirt, Black · XS, $17.50, ADD TO BAG". It hides while the cart drawer is open and returns after. It never shows at 1440. |
| Cart drawer | Pass | Add to bag (1440) and the sticky button (390) open the drawer with one line, Black · XS at $17.50. Focus moves into the drawer and the bubble reads 1. At 1440, + makes the quantity 2 and Remove leaves "Your bag is empty". Escape closes the drawer and returns focus to the button that opened it (Add to bag, or the sticky button at 390). |
| Collection filter drawer (D-34) | Pass | Filter opens the drawer at 390 (x 40, 350 wide) and at 1440 (x 1065, 375 wide). Focus lands on Close, page scrolling is locked, 8 of 8 Tabs stay inside, and Escape closes it and returns focus to Filter. |
| Predictive search (D-25) | Pass | In the header search at 1440, typing "C++" and then " brass" logs no console error. The suggestions read "Search for “C++”", then "Search for “C++ brass”" with 6 results. Escape returns focus to the search button. |
| Skip link and mobile menu | Pass | At 390 the first Tab shows "Skip to content" at 8,8, and Enter moves focus to `main#MainContent`. The menu drawer opens from the keyboard with Shop, Our Story and Journal, and Escape closes it and returns focus to Menu. |
| Scripts per template (D-32) | Pass | gzip -9 sizes are 3,184 bytes for `pb-product.js`, 2,234 for `pb-sticky-atc.js` and 1,219 for `pb-collection.js`, against limits of 3,584, 2,560 and 1,536. The first two load only on the product page, and `pb-collection.js` only on collection pages. None of them loads on home, content pages, the blog, search, the 404 or the cart. |
| Structured data spot check | Pass | Home has only Organization and WebSite data, with no Product schema. The concept cards have no link and no price. The product page has ProductGroup and BreadcrumbList. No page has review or rating markup. Canonicals point to the page itself and there's no robots `noindex`. |
| Theme Check, tests, docs | Pass | `shopify theme check --fail-level error`: 0 errors and 8 warnings, all on the Dawn baseline: OrphanedSnippet (`quick-order-product-row`), VariableName (`main-list-collections`, `main-article`), LiquidComplexity (`facets`), UnusedAssign and UndefinedObject (`main-product`), and UndefinedObject (`password` and `theme` layouts). `node --test tests/*.test.cjs`: 11 pass. `check_docs.py`: pass. |

### Results by 05 area

| 05 area | Result | Notes |
| --- | --- | --- |
| §1 Visual fidelity | Pass, with store-data gaps | The screenshots show the onyx ground, ivory headings, gold accents and green panels only. The prelaunch homepage follows the 02 §4 order, and nothing overflows. The canvas side-by-sides (home, collection and product at 1440 and 390, rendered with the theme's Cormorant and the preview's Inter) were done per surface in the 2.x QA and fix rounds. This pass checked the new screenshots against those results by eye only. The global round verified one Cormorant 500/600 download per page (home-02, G-03). |
| §2 Content honesty | Theme passes; store data fails | Concept cards have no price, link or Product JSON-LD, and there's no review markup. Store-data failures: `/search?q=brass` lists legacy pipe products (The Bellwoods One-Hitter, Brass Pipe Screens, The Brockton Mk2, pipe cleaners) until E-08. The homepage meta description still describes smoking pipes (E-11). `/blogs/news` still pages through the legacy articles (D-36 links only the tagged Journal view). |
| §3 Functionality | Pass for the flows run | Product start state, size choice and `?variant=`, add to bag, drawer quantity and remove, the sticky bar, the filter drawer, predictive search and the mobile menu all passed. See "Not tested" for checkout, currency, forms, accounts, pagination and swipe. |
| §4 Accessibility | Pass | axe, one H1, the skip link, and focus trap, Escape and focus return in the drawers. The global round verified reduced motion (G-14). 200% zoom, forced colours and real screen readers weren't tested. |
| §5 Performance | Partly tested | The JS budget passes. The hero LCP can't be tested without a hero image. Lighthouse wasn't run. Earlier rounds measured scroll CLS 0 on the product page (G-02) and load CLS of 0.0011 or less (home-02). |
| §6 SEO | Partly tested; one store-data failure | Canonicals, no `noindex` and the structured-data spot check pass. The homepage meta description is the legacy text (E-11). The Rich Results Test, sitemap, redirects and social preview weren't run. |
| §7 Analytics and consent | Not tested | This run blocks the store's pixels and apps. |
| §8 Code quality | Pass | Theme Check has no errors. `config/settings_data.json` is unchanged since Phase 1 (`bf58a73`). New UI strings are under `pb.*`. The CLI used only the proxy placeholder password, and there are no tokens in the repo. |
| §9 Design fidelity | Pass, with open observations | The 2.x fix rounds closed every logged deviation (D-35 to D-38, D-41). The remaining observations are listed under "Open items". Known platform limits are in 05 §9. |

### Calls accepted under D-37

The product eyebrow shows the product type as entered, without "No. 01" numbering. Prices use the store's money format. A collection's category line comes from its menu children or a `custom.category_line` metafield. The empty-collection, empty-page (COL-04) and help-strip text use the Phase 2 UI copy. The owner can override any of these.

### Open items

**Owner decisions and store data (not theme defects):**

- **Rings (D-12, E-04, G-04):** the live menus still link `/collections/rings`. The homepage has 4 such links: the header Shop dropdown, the mobile drawer and the footer Shop column. The store job needs to remove them.
- **Money format (E-14, C-07):** prices read "$17.50" without "CAD" until the store's "HTML with currency" format includes the code.
- **Legacy products (E-08):** pipe products appear in search, and white legacy photos make the muted SOLD OUT badge a needs-review contrast item (COL-08).
- **Homepage SEO (E-11):** the meta description is still the legacy smoking-pipes text. The title reads "Parkdale Brass".
- **Hidden pages and empty collections (E-02, E-03, E-05):** `/pages/our-story` returned 404 in this pass. The 2.x rounds found the same for `why-brass`, `jewelry-care`, `size-guide` and `/collections/jewelry`. Until they're live, those templates can only be tested through `?view=`.
- **Legacy article H1 (A-03):** `/blogs/news/how-to-smoke-shatter` still has 2 H1s, because its own body contains an `<h1>`.
- **Journal excerpts repeat the title (new, not fixed):** on `/blogs/news`, each card's excerpt starts with the article title again, because the article bodies open with it. The homepage journal picks strip it (home-08), but `article-card` doesn't. The fix is either in the content (E-07) or extending the home-08 strip to `article-card`, which would be a Dawn edit with `PB:` markers.
- **Content and sign-off:** all photography is still placeholder art. Service lines wait on D-01 and D-02. The admin and SEO exports are pending (A-02, A-03). The owner hasn't yet reviewed this record (F-01).

**Theme observations, not fixed:**

- Under 750 px the footer's Tab order reaches the policy links before the country select. The DOM follows the desktop order.
- From 750 to 1100 px the footer wordmark wraps inside its column. Archive-Home switches the footer to two columns at 960 px or less, and the theme doesn't.
- Under 360 px the mobile wordmark is centred between the header controls, which puts it 22 px left of the viewport centre at 320.
- Stock Dawn: while a page scroll is still running, the sticky-header handler drops the size-guide dialog's focus trap. The trap holds once scrolling stops.
- A partial last row of 5 to 7 featured cards isn't centred. No configured template reaches that case.

### Not tested, and why

- **Checkout handoff, sign-in, real newsletter and contact submissions:** this run's rules forbid them on the live domain. Shopify's hCaptcha script is also blocked on this network, so the server error and success states were never rendered. Only native validation was checked (the newsletter email field is `required`).
- **Country and currency switching:** the store has a single currency.
- **Category tiles, live featured products, "Shop jewelry" and the jewelry branch of the continue-shopping links:** the jewelry collections are empty or hidden.
- **Size guide with the real page, Jewelry Care accordions and size tables:** the pages are hidden, and their content is bracketed placeholders that the storefront hides.
- **Finish swatches, metafield tabs and service lines:** the products don't have that data yet.
- **Collection pagination:** no collection has more than 24 products.
- **Hero image as the LCP:** there's no hero image yet.
- **Lighthouse, Rich Results Test, sitemap, social preview, analytics events and consent:** not run in this pass, and the store's pixels were blocked.
- **Safari, Firefox, iOS, Samsung Internet, screen readers, forced colours, 200% zoom and touch swipe:** only Chromium was available.
- **Widths 375, 768 and 1280:** outside this pass. The 2.x rounds measured 360, 375 and 750 to 1280 for specific fixes.
- **Canvas side-by-side:** not repeated in this pass (see §1).

### Screenshots

Taken from the preview at deviceScaleFactor 1, full page unless noted: [home 1440](qa/phase-2/home-1440.png), [home 390](qa/phase-2/home-390.png), [collection 1440](qa/phase-2/collection-1440.png), [collection 390](qa/phase-2/collection-390.png), [collection 390 filter drawer](qa/phase-2/collection-390-filters.png) (viewport), [product 1440](qa/phase-2/product-1440.png) (start state), [product 390](qa/phase-2/product-390.png) (start state), [product 390 sticky bar](qa/phase-2/product-390-sticky.png) (viewport), [cart drawer 390](qa/phase-2/cart-drawer-390.png) (viewport), [Our Story 1440](qa/phase-2/our-story-1440.png) (`?view=our-story` on Contact Us) and [journal 1440](qa/phase-2/journal-1440.png).

## Phase 1: Archive foundation QA (2026-11-25)

November 25, 2026. Theme source at `774bd47` on `codex/archive-foundation`. This record covers Phase 1 and the D-25 shopper regressions.

| Check | Result | Evidence |
| --- | --- | --- |
| Shopify unpublished preview | Pass | Verified theme ID `196453663042` and its unpublished role. Shopify served the [homepage](https://parkdale-brass.myshopify.com/?preview_theme_id=196453663042&_fd=0&pb=0) with HTTP 200 and a missing page with HTTP 404. Both included the Archive styles and announcement. All 348 theme file paths were verified. |
| Shopify Theme Check | Pass | 155 files, zero errors and nine warnings already present on the Dawn baseline. |
| Rendered theme at 390 and 1440 px | Pass | [Mobile](qa/phase-1/archive-foundation-shopify-390.png) and [desktop](qa/phase-1/archive-foundation-shopify-1440.png) show the Shopify-rendered 404 template with its original theme assets. Chromium loaded Cormorant 500/600 and Inter 400/500/600. The wordmark fit on one line at both widths without horizontal overflow. Third-party app and analytics scripts were excluded during capture. |
| Colour contrast | Pass | WCAG ratios are 15.80 for ivory on onyx, 8.56 for muted text on the footer, 7.68 for pale gold on green and 7.72 for onyx on a gold button. |
| Archive header and footer, offline | Pass | Local Chromium rendered the theme Liquid and CSS with fixture shop data at [390 px](qa/phase-1/archive-foundation-offline-390.png) and [1440 px](qa/phase-1/archive-foundation-offline-1440.png). Both fit the viewport. |
| Footer navigation | Pass in Chromium fixtures | With a populated test menu, Space and Enter operated the mobile disclosure. Desktop links remained keyboard-accessible with JavaScript disabled. |
| Rapid cart edits and removals | Pass with a simulated Shopify cart | Nine Node regressions exercise quantity changes, removal and row renumbering, updates in both views, same-line edits, queued edits and removals that follow a line Shopify re-keys (review feedback on PR #4), and a rejected request. The edit-and-remove flow also passed in Chromium with mocked section responses. |
| Predictive search | Pass in local regression tests | Two Node tests cover punctuation, replacement characters, missing text and ambiguous matches. |
| Comparison with the owner's private canvas | Not tested | The implementation uses the written Archive design spec. |
| Cart and checkout with real jewelry inventory | Not tested | This requires purchasable fixture inventory on an isolated development store. |

Run `node --test tests/*.test.cjs`, `python3 .github/scripts/check_docs.py` and `shopify theme check` from the repo root.

The header and footer are configured for the planned jewelry menus. The announcement becomes a signup link when Phase 2 adds the homepage newsletter. The homepage, collection and product redesigns are the next theme work.

# Archive foundation QA

November 25, 2026. Theme source at `774bd47` on `codex/archive-foundation`. This record covers Phase 1 and the D-25 shopper regressions.

| Check | Result | Evidence |
| --- | --- | --- |
| Shopify unpublished preview | Pass | Verified theme ID `196453663042` and its unpublished role. Shopify served the [homepage](https://parkdale-brass.myshopify.com/?preview_theme_id=196453663042&_fd=0&pb=0) with HTTP 200 and a missing page with HTTP 404. Both included the Archive styles and announcement. All 348 theme file paths were verified. |
| Shopify Theme Check | Pass | 155 files, zero errors and nine warnings already present on the Dawn baseline. |
| Rendered theme at 390 and 1440 px | Pass | [Mobile](qa/phase-1/archive-foundation-shopify-390.png) and [desktop](qa/phase-1/archive-foundation-shopify-1440.png) show the Shopify-rendered 404 template with its original theme assets. Chromium loaded Cormorant 500/600 and Inter 400/500/600. The wordmark fit on one line at both widths without horizontal overflow. Third-party app and analytics scripts were excluded during capture. |
| Colour contrast | Pass | WCAG ratios are 15.80 for ivory on onyx, 8.56 for muted text on the footer, 7.68 for pale gold on green and 7.72 for onyx on a gold button. |
| Archive header and footer, offline | Pass | Local Chromium rendered the theme Liquid and CSS with fixture shop data at [390 px](qa/phase-1/archive-foundation-offline-390.png) and [1440 px](qa/phase-1/archive-foundation-offline-1440.png). Both fit the viewport. |
| Footer navigation | Pass in Chromium fixtures | With a populated test menu, Space and Enter operated the mobile disclosure. Desktop links remained keyboard-accessible with JavaScript disabled. |
| Rapid cart edits and removals | Pass with a simulated Shopify cart | Six Node regressions exercise quantity changes, removal and row renumbering, updates in both views, same-line edits and a rejected request. The edit-and-remove flow also passed in Chromium with mocked section responses. |
| Predictive search | Pass in local regression tests | Two Node tests cover punctuation, replacement characters, missing text and ambiguous matches. |
| Comparison with the owner's private canvas | Not tested | The implementation uses the written Archive design spec. |
| Cart and checkout with real jewelry inventory | Not tested | This requires purchasable fixture inventory on an isolated development store. |

Run `node --test tests/*.test.cjs`, `python3 .github/scripts/check_docs.py` and `shopify theme check` from the repo root.

The header and footer are configured for the planned jewelry menus. The announcement becomes a signup link when Phase 2 adds the homepage newsletter. The homepage, collection and product redesigns are the next theme work.

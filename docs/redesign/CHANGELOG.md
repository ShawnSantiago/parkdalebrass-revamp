# Theme changelog

Records every change to this theme, and especially every edit to a **stock Dawn file**, so a future Dawn upgrade can be merged without losing Parkdale Brass work.

**Base:** Dawn 16.0.0 (upstream commit `258f00f`).

## How to log a change

- Add entries under **Unreleased**, newest first. When a version is pushed to a theme for review, move the entries under a dated heading with the theme name and ID.
- Group entries by type: **Added** (new `pb-*` files), **Changed: Dawn files** (stock files edited), **Changed: settings/templates** (JSON), **Removed**, **Fixed**.
- For every **Dawn file edit**, record: file and approximate line or section, what changed, why (link the decision ID), and how to re-apply it after a Dawn upgrade. Keep Dawn edits small and wrap them in markers in the code:

  ```liquid
  {%- comment -%} PB: hide empty accordion tabs (D-10) {%- endcomment -%}
  …change…
  {%- comment -%} /PB {%- endcomment -%}
  ```

  In CSS and JS, use `/* PB: … */ … /* /PB */`. Search for `PB:` to find every customisation.
- Store-level changes (products, menus, redirects…) are **not** logged here. They go in `owner-inputs.md` section E, with approval.

## Dawn upgrade procedure

1. Branch from the current theme branch.
2. Pull the new Dawn release into a clean folder and copy it over, **except** `config/settings_data.json`, `templates/*.json`, `sections/*-group.json`, `sections/pb-*`, `snippets/pb-*` and `assets/pb-*`.
3. Re-apply every entry under "Changed: Dawn files" below, using the `PB:` markers in the old version.
4. Run `shopify theme check` and the full `05-qa-checklist.md` on an unpublished theme.

---

## 2026-11-25 · Archive Phase 1 unpublished preview

Theme ID `196453663042`. [Preview](https://parkdale-brass.myshopify.com/?preview_theme_id=196453663042&_fd=0&pb=0) · [QA results](qa-results.md)

### Added
- `assets/pb-theme.css` implements the Archive palette, layout, type, controls and responsive header (D-19, D-21).
- The two Latin Cormorant Garamond assets contain weights 500 and 600 (D-15). The source is [Google Fonts at 6ebe737](https://github.com/google/fonts/tree/6ebe737e44fd64ee736bbc6feed6136a6dbfd222/ofl/cormorantgaramond). The SIL Open Font License is in [licences/cormorant-OFL.txt](licences/cormorant-OFL.txt).
- Documentation only: `AGENTS.md`, `CLAUDE.md`, `docs/redesign/*` (plan, design spec, Dawn mapping, content and data, QA, decisions, owner inputs, product data template, photography brief, audit, this changelog).

### Changed: Dawn files
| File | What to reapply when upgrading Dawn | Decision |
| --- | --- | --- |
| `layout/theme.liquid` | Load the two additional Inter weights in the font declarations, preload Cormorant 600, and load the Archive stylesheet after Dawn’s base styles. | D-15, D-19 |
| `sections/announcement-bar.liquid` | Resolve the signup fragment against the localized homepage for single and rotating announcements. Enable the link when the homepage signup section exists. | D-19, D-21 |
| `snippets/header-drawer.liquid` | Keep the customer-account link in the mobile navigation when accounts are enabled. | D-21 |
| `sections/footer.liquid` | Reapply the wordmark, responsive grid and bottom bar. Render native mobile disclosures for populated menus and static links on desktop. | D-19, D-22 |
| `assets/cart.js` | Capture edits by line-item key, coalesce same-line input and serialize cart updates and removals across both cart views. When a response re-keys a line (discount change), move its queued change to the new key (`rekeyPending`). Restore the nine cart regression cases on upgrade. | D-25 |
| `assets/predictive-search.js` | Replace a single literal occurrence of the previous query in the results label. Keep the punctuation and stale-label tests. | D-25 |

Remaining Phase 2 edits from `03-theme-mapping.md`:

  | File | Planned change | Decision |
  | --- | --- | --- |
  | `sections/header.liquid` | Organization JSON-LD: only non-empty `sameAs`, `url` at the shop root (no second copy in `layout/theme.liquid`) | D-29 |
  | `sections/main-product.liquid` | Hide empty `collapsible_tab` blocks; `open` checkbox on that block; render `pb-sticky-atc` | D-23 |
  | `snippets/product-variant-picker.liquid` | Size guide link inline in the Size legend | D-23 |
  | `snippets/product-variant-options.liquid` | No pre-selected size ("Select a size" start state) | D-23 |
  | `snippets/product-media-gallery.liquid` | Left thumbnail column; main image in the double frame | D-23 |
  | `sections/main-collection-product-grid.liquid` | In-grid "New to brass?" promo tile on the last page | D-22 |

### Changed: settings/templates
- Merge the five Archive schemes, layout, typography, shopping controls and brand copy into the active preset in `config/settings_data.json` (D-19).
- Restore the Archive settings and jewelry menu handles in `sections/header-group.json` and `sections/footer-group.json` (D-07, D-19). The assigned handles can remain empty while the owner prepares the menus.
- Merge the English `pb.*` keys into `locales/en.default.json` and `locales/en.default.schema.json`. Preserve “Add to bag” and “Your bag” in the storefront locale (D-23). The changelog identifies JSON edits so the locale files stay valid JSON.

### Changed: repository tooling
- The storefront regression job runs `node --test tests/*.test.cjs` for the cart and predictive search. It uses the built-in Node test runner.
- `.github/workflows/ci.yml`: now runs on pull requests and pushes to `main`. Keeps Theme Check, adds the docs check (`.github/scripts/check_docs.py`: relative links and CSV shape). Removed the inherited Lighthouse job, which needed Shopify's private store secrets; Lighthouse is run during Phase 4 QA instead (`phase-4-brief.md` §3.6).
- `.github/workflows/ci.yml`: Theme Check now runs `npx @shopify/cli@5.1.0 theme check --fail-level error` directly. `shopify/theme-check-action@v2` crashed on the current CLI's output (`TypeError: e.filter is not a function`) on the repo's first CI run (PR #4). Results show in the job log rather than as annotations. Bump the pinned CLI deliberately.
- Removed `.github/workflows/cla.yml`: Shopify's contributor-agreement bot only works on Shopify's own repos.

### Removed
- _None._

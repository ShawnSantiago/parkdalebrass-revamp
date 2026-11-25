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

## Unreleased

### Added
- Documentation only: `AGENTS.md`, `CLAUDE.md`, `docs/redesign/*` (plan, design spec, Dawn mapping, content and data, QA, decisions, owner inputs, product data template, photography brief, audit, this changelog).

### Changed: Dawn files
- _None yet._ Planned, per `03-theme-mapping.md`:

  | File | Planned change | Decision |
  | --- | --- | --- |
  | `layout/theme.liquid` | Load `pb-theme.css` after `base.css`; preload the heading font; Organization JSON-LD on the homepage | D-02, D-15 |
  | `sections/main-product.liquid` | Hide empty `collapsible_tab` blocks; `open` checkbox on that block; render `pb-sticky-atc` | D-23 |
  | `locales/en.default.json` | Add `pb.*` strings; "Add to bag", "Your bag", "Select a size" | D-23 |
  | `snippets/product-variant-picker.liquid` | Size guide link inline in the Size legend | D-23 |
  | `snippets/product-variant-options.liquid` | No pre-selected size ("Select a size" start state) | D-23 |
  | `snippets/product-media-gallery.liquid` | Left thumbnail column; main image in the double frame | D-23 |
  | `sections/footer.liquid` | Mobile accordion link groups | D-22 |
  | `sections/main-collection-product-grid.liquid` | In-grid "New to brass?" promo tile on the last page | D-22 |
  | `assets/cart.js` | Per-line debounce, with updates sent one at a time, so no quantity change is dropped | D-25 |
  | `assets/predictive-search.js` | Compare the previous search term as literal text, not a RegExp | D-25 |

### Changed: settings/templates
- _None yet._

### Changed: repository tooling
- `.github/workflows/ci.yml`: now runs on pull requests and pushes to `main`. Keeps Theme Check, adds the docs check (`.github/scripts/check_docs.py`: relative links and CSV shape). Removed the inherited Lighthouse job, which needed Shopify's private store secrets; Lighthouse is run during Phase 4 QA instead (`phase-4-brief.md` §3.6).
- Removed `.github/workflows/cla.yml`: Shopify's contributor-agreement bot only works on Shopify's own repos.

### Removed
- _None._

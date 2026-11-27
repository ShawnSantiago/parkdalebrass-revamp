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

Phase 2 (`phase-2-brief.md` steps 2.1–2.7): the foundation commit plus the home, collection, product and pages tracks, merged on `claude/loving-mccarthy-7dq7ak`. Not yet pushed to a theme. Open deviations and owner inputs are listed in each track's report and still need decision and owner-input entries.

### Added
- Foundation (2.1, 2.2, 2.7): `sections/pb-split.liquid` + `assets/section-pb-split.css` (03 §4.8, D-22; material and story presets, optional mobile padding), `snippets/pb-breadcrumbs.liquid` (visible trail plus BreadcrumbList JSON-LD, 03 §10), `snippets/pb-roman.liquid` (numerals I–X).
- Homepage (2.3): `sections/pb-hero.liquid`, `pb-category-tiles.liquid`, `pb-featured.liquid` (concepts and collection modes), `pb-editorial-banner.liquid`, `pb-journal-picks.liquid`, `pb-newsletter.liquid`, each with its `assets/section-pb-*.css`; `assets/section-pb-head.css` (shared centred head); `snippets/pb-picture.liquid`, `pb-section-padding.liquid`, `pb-announcement-message.liquid`. `docs/redesign/index.live.json` documents the launch homepage (copy it over `templates/index.json` at launch).
- Collection (2.4): `sections/pb-collection-header.liquid` + `assets/section-pb-collection-header.css`; `assets/section-pb-collection.css`, `assets/pb-collection.js`; `snippets/pb-collection-toolbar.liquid`, `pb-collection-grid.liquid`, `pb-collection-promo.liquid`, and `pb-product-card.liquid` (the shared 02 §2.2 card, also used by "Wear it with").
- Product and cart (2.5): `assets/section-pb-product.css`, `assets/pb-product.js` (the "Select a size" start state), `assets/pb-sticky-atc.js` + `snippets/pb-sticky-atc.liquid`; `snippets/pb-product-detail.liquid`, `pb-product-tab.liquid`, `pb-product-flags.liquid`, `pb-product-breadcrumbs.liquid`.
- Pages and journal (2.6): `sections/pb-page.liquid` + `assets/section-pb-page.css`; `snippets/pb-table-wrap.liquid`; `assets/component-pb-prose.css`, `component-pb-accordion.css`, `component-pb-field.css`, `section-pb-contact.css`, `section-pb-journal.css`.
- `assets/pb-theme.css`: global blocks appended in order `PB2:foundation` (breadcrumbs, secondary-button hover on green), `PB2:home` (announcement inline link), `PB2:collection` (product card, help strip), `PB2:product` (cart drawer), `PB2:pages` (size tables).

### Changed: Dawn files
| File | What to reapply when upgrading Dawn | Decision |
| --- | --- | --- |
| `sections/header.liquid` (Organization JSON-LD, near the end) | Two `PB:` blocks. Before the script, loop over the nine `social_*_link` settings, keep only `http(s)://` values, `| json` each and join into `pb_same_as`. In the script, `"sameAs": [{{ pb_same_as }}]` (an empty array when none) and `"url": {{ request.origin | append: routes.root_url | json }}`. No second Organization block in `layout/theme.liquid`. | D-29 |
| `sections/header.liquid` (wordmark, both logo-position branches) | Remove Dawn's `{% if request.page_type == 'index' %}<h1 class="header__heading">` … `</h1>{% endif %}` wrapper around the wordmark link; each opening and closing is now an empty `PB:` / `/PB` pair. The homepage H1 is pb-hero's heading. | 05 §4 (one H1), 02 §4.1, D-21 |
| `sections/announcement-bar.liquid` (second edit) | In the single and rotating branches, inside `if block.settings.text != blank`: when `pb_link_label` is set, render `pb-announcement-message`; otherwise keep Dawn's whole-message link plus the Phase 1 `#signup` edit. Add `pb_link_label`, `pb_text_mobile`, `pb_link_label_mobile` text settings to the `announcement` block schema after `link` (labels `t:pb.home.announcement.*`). | 02 §2.7, D-19, D-21 |
| `sections/main-collection-product-grid.liquid` | Five `PB:` blocks behind a new `pb_layout` checkbox (default on; off renders stock Dawn): load `section-pb-collection.css` and `pb-collection.js`; force `pb_filter_type` to horizontal and use it in place of `filter_type`; render `pb-collection-toolbar` as the toolbar branch; render `pb-collection-grid` (grid, promo tile, empty states) as the grid branch. Schema settings after `padding_bottom`: `pb_layout`, `pb_category_menu`, `pb_promo_enable`, `pb_promo_color_scheme`, `pb_promo_eyebrow`, `pb_promo_text`, `pb_promo_text_mobile`, `pb_promo_link_label`, `pb_promo_link` (listed in a comment above `{% schema %}`). About 112 lines, over the 03 §0 guideline: needs a decision entry. | D-22, 03 §8 |
| `sections/multicolumn.liquid` | One `PB:` block in the column loop before the `.rte` text: hide text containing `[` outside the theme editor (`pb_show_text`); build `pb_link_name` = title + ": " + link label and add it as `aria-label` on the column link (WCAG 2.5.3). 21 lines. New relative to 03 §0 ("multicolumn + CSS"). | AGENTS.md placeholder rule, D-21 |
| `sections/main-product.liquid` | `PB:` blocks (a)–(l): compute `pb_archive`, `pb_has_size`, `pb_size_start` (from `pb-product-flags`) and the size-guide page; `pb-product` class; load `section-pb-product.css`; mobile top padding `pb_padding_top_mobile`; `pb-product-breadcrumbs` above the grid and in the info column; keep `grid--2-col-tablet` with no media; collapsible tabs via `pb-product-tab` (hide empty, `pb_open`); popup size-guide resolution and placeholder; pass `pb_*` flags to `variant_picker` and `buy_buttons`; modal from the resolved page; `<pb-product-state>` + `pb-product.js`; render `pb-sticky-atc` after `</product-info>`. Schema: section `pb_archive`, `pb_show_breadcrumbs`, `pb_breadcrumb_menu`, `pb_padding_top_mobile`; block settings `collapsible_tab.pb_source`, `pb_open`, `popup.pb_size_legend`, `variant_picker.pb_size_start`. | D-23 |
| `snippets/product-variant-picker.liquid` | With `pb_archive` and buttons: a `pb-option` fieldset whose legend reads "NAME: value" or "Select a size", with the size-guide opener right-aligned in the Size legend; swatched options stay buttons. Dawn's `if picker_type == 'swatch'` becomes an `elsif`. | D-23 |
| `snippets/product-variant-options.liquid` | A `button and pb_archive` branch above Dawn's button branch: no checked Size with `pb_size_start`; unavailable values get `disabled` + `aria-disabled` and stay focusable; the label holds an optional swatch, the name and a size note (In stock / Sold out / Unavailable). | D-23 |
| `snippets/buy-buttons.liquid` | With `pb_size_start`: empty hidden id input; `aria-disabled="true"` + `data-pb-select-size` on submit; label `pb.product.select_size`. With `pb_archive`: `<p class="pb-product-status" role="status">` after `</product-form>`. | D-23 |
| `snippets/product-media-gallery.liquid` | `pb_gallery` (Archive layout, no limit): keep the mobile counter with thumbnails; `pb-gallery` classes; wrap the viewer `<ul>` and slider buttons in `.pb-frame.pb-gallery__frame`; no-media placeholder with the 02 §3 caption chip. Keep the viewer before the thumbnails (`product-info.js` reads the first `ul`). | D-23 |
| `snippets/cart-drawer.liquid` | `pb.cart.*` strings: empty state, title with count, visible "Remove" label (aria-label unchanged), "Subtotal", taxes and shipping line; option rows get `pb-cart-option`. `assets/cart.js` is untouched by this edit. New relative to 03 §0 ("cart-drawer + CSS"). | 02 §6.5, D-21 |
| `sections/related-products.liquid` | Integration edit. Render `pb-product-card` (with `show_secondary_image`, a 4-up `sizes` string when `columns_desktop` is 4, `heading_tag: 'h3'`, `product_view_context: 'recommendation'`) instead of `card-product`, and drop Dawn's two `skip_card_product_styles` assigns. The card ignores `image_ratio`, `image_shape`, `show_vendor`, `show_rating`. New relative to 03 §0 ("related-products + CSS"). | 02 §2.2, §6.3, D-21 |
| `sections/collapsible-content.liquid` | Six `PB:` blocks: load `component-pb-accordion.css`; opt-in `pb_hide_placeholders` checkbox (after `open_first_collapsible_row`) hides rows containing `[` outside the theme editor and the whole section when none remain; open the first rendered row instead of `forloop.first`; `data-pb-preview-only` flag. Off by default (stock behaviour, restyled). | 02 §2.6, D-21, D-22 |
| `sections/main-blog.liquid` | Load `section-pb-journal.css`; a visually hidden `<h2>` (`pb.blog.articles`) after the `</h1>` so card titles don't skip a level. | 03 §0, 02 §7 |
| `sections/main-article.liquid` | Load `component-pb-prose.css`, `component-pb-field.css`, `section-pb-journal.css` after `section-blog-post.css`. | 03 §0, 02 §7, §2.4 |
| `sections/contact-form.liquid` | Load `component-pb-field.css` and `section-pb-contact.css` after `section-contact-form.css`. | 02 §2.4, §7 |

### Changed: settings/templates
- `templates/index.json`: the prelaunch homepage (03 §9): `pb_hero` → `pb_categories` (bracelets, necklaces; D-12) → `pb_featured` (concepts; the two ring concepts disabled) → material → editorial → story → journal (`blog` news, `tag` journal: "All articles" goes to `/blogs/news/tagged/journal` and hides until an article has the tag, D-36) → signup (`anchor` signup, consent empty, D-03). Replaces the stock image banner and featured collection.
- `sections/header-group.json`, `announcement-bar-0` only: link `#signup`, `pb_link_label`, `pb_text_mobile`, `pb_link_label_mobile`. Header settings unchanged.
- `sections/footer-group.json`: footer `enable_language_selector` false (`enable_country_selector` stays true).
- `templates/collection.json`: `pb-collection-header` replaces `main-collection-banner`; grid settings for the Archive layout (24 per page, 3/2 columns, portrait, `pb_layout`, `pb_category_menu` shop-categories, promo tile on); a `pb_help` multicolumn help strip.
- `templates/product.json`: Archive blocks and settings per 03 §5 (`pb_archive`, breadcrumbs, size start state, size-guide popup on page `size-guide`, five tabs, empty service lines); removed vendor, quantity, description and share blocks; related products "Wear it with", 4/2 columns.
- New `templates/page.our-story.json`, `page.why-brass.json`, `page.jewelry-care.json`, `page.size-guide.json`. Integration: `page.why-brass.json` gains `journal` (`pb-journal-picks`, the two existing brass articles, `blog` news and `tag` journal as on the homepage, D-36) and `featured` (`pb-featured`, collection mode, hidden until `jewelry` has products) after `care`, whose bottom padding is now 0.
- `templates/page.contact.json` (pb-page with the previous-orders note), `templates/blog.json` (grid, no images, dates), `templates/article.json` (title, image, content, share).
- 2.x QA home: `pb-journal-picks` gains a `tag` setting (D-36; `sections.pb_journal_picks.settings.tag` in `en.default.schema.json`, `blog.info` and the block excerpt info reworded); `docs/redesign/index.live.json` matches the homepage journal settings.
- `locales/en.default.json` and `locales/en.default.schema.json`: new keys only, merged as a union (`pb.breadcrumbs`, `pb.home`, `pb.collection`, `pb.product`, `pb.cart`, `pb.page`, `pb.blog` and the matching `sections.*` schema labels).
- `config/settings_data.json`: unchanged.

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

Remaining Phase 2 edits from `03-theme-mapping.md`: none. All six planned edits (Organization JSON-LD, main-product, variant picker, variant options, media gallery, collection promo tile) are logged under **Unreleased**.

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

# Phase 2 brief: templates and sections

**For:** the AI agent (or developer) continuing after Phase 1.
**Goal:** build every page of the Direction B "Archive" storefront on Dawn 16: the custom `pb-*` sections, the required Dawn edits and the JSON templates. The unpublished theme should then match canvas page B **side by side** on every template, in both prelaunch and live homepage states.
**Not in scope:** real product data, photography, policies, menus, redirects or any other store data (Phase 3), and publishing (Phase 5).

Read this whole brief first. Phase 2 is the largest phase, and the order below avoids rework.

---

## 1 · Before you start

| Check | Required state |
| --- | --- |
| Phase 1 | Done and reported (`phase-1-brief.md` §5 exit criteria). `pb-theme.css` is loaded, the schemes, fonts, header and footer are in place. If not, finish Phase 1 first. |
| Rules | `/AGENTS.md` hard rules. **D-21: the design leads, the theme follows.** Build each part exactly as specified; never simplify it to fit Dawn. A visible deviation needs owner approval and a decision entry. |
| Theme access (A-01) | Needed to preview. Without it you can build and run `theme check`, but everything visual is reported **not tested**. |
| Dev store (A-04) | Needed for product and collection fixtures (§2C). Ask the owner if one exists. |

### Read first
1. `02-design-spec.md`: all of it, especially §1.5 (ornaments), §2 (components), §4–8 (pages and states).
2. `03-theme-mapping.md` §0 (the build map), §4 (custom sections), §5 (product page and Dawn edits), §8 (collection), §9 (homepage), §10 (SEO).
3. `05-qa-checklist.md`: you run most of it at the end of this phase.
4. Canvas page **"B · Archive"** (https://claude.ai/artifact/935Z6v9LJkWXDWSmdgNbQc, private; ask the owner for access): `Archive-Home`, `Archive-Collection`, `Archive-Product`, plus the three `-Mobile` artboards. The mobile ones include the filter drawer, empty state, sticky bar and cart drawer states.

### Branch and workflow
- Continue on the Phase 1 branch, or the branch the owner assigns. Never `main`. No PR unless the owner asks.
- One commit per step below (e.g. `feat(theme): 2.3 pb-featured`).
- Preview with `shopify theme dev` or `shopify theme push --unpublished` against `parkdale-brass.myshopify.com`. **Never publish, and never push to the live theme ID.**

---

## 2 · Conventions for every `pb-*` section

- `{% schema %}` with `name` "PB · …", presets, `t:` labels (add them to `locales/en.default.schema.json`), `color_scheme` (default per 03) and `padding_top`/`padding_bottom` settings rendered with Dawn's `.section-{{ section.id }}-padding` pattern.
- Merchant text: `| escape` for `text` settings; `richtext` and `inline_richtext` are output as-is.
- Images: `image_url` + `image_tag` with `widths` and `sizes`, explicit aspect ratio, `loading: 'lazy'` (the hero image is the only `eager` + `fetchpriority: 'high'`). A missing image falls back to `.pb-placeholder` + `placeholder_svg_tag`.
- Ornaments use only the Phase 1 classes (`.pb-frame`, `.pb-diamond`, `.pb-divider`, `.pb-eyebrow--ruled`, `.pb-dateline`), always `aria-hidden="true"` on the decorative parts.
- Section-specific CSS goes in a `{%- style -%}` block scoped to the section ID, or in `assets/section-pb-*.css` loaded by that section. Don't grow `pb-theme.css` with section-only rules.
- Every Dawn file you edit: `PB:` markers in the code, plus a row in `CHANGELOG.md`.
- No hard-coded product IDs, prices, sizes, currencies or URLs; use settings, link lists and Shopify objects.

---

## 3 · Steps, in order

### 2.1 · Shared snippets
- `snippets/pb-breadcrumbs.liquid`: the visible `<nav aria-label="Breadcrumb"><ol>` plus `BreadcrumbList` JSON-LD (03 §10). Used by the collection header and product page.
- Roman numerals for the journal: a `case` for 1–3 inside `pb-journal-picks`, or `snippets/pb-roman.liquid`.
- **Done when:** the snippets render and the JSON-LD validates in Google's Rich Results Test, once previewable.

### 2.2 · `pb-split` (03 §4.8)
Build it first, because the homepage, Our Story and Why Brass all use it.
- **Done when:** both configurations match the canvas. Material: green, 1:1, full bleed, diamond, gold-line borders. Story: 6fr/5fr, 88px gap, double-framed image. Check at 1440 and 390.

### 2.3 · Homepage sections, in page order
1. `pb-hero` (03 §4.1; full code is there, but check it renders and adjust).
2. `pb-category-tiles` (03 §4.2): tiles on desktop, rows on mobile, empty collections hidden.
3. `pb-featured` (03 §4.3): **both modes**. In concepts mode: no price element, no product link, no Product JSON-LD.
4. `pb-editorial-banner` (03 §4.4), with the ornament divider after it.
5. `pb-journal-picks` (03 §4.5): pick `what-is-brass-jewelry-metal` and `gold-plated-brass-jewelry`. The care article doesn't exist yet, so leave the third block empty; the section must skip it cleanly. **Don't feature `is-brass-good-for-jewelry` or `does-brass-jewelry-tarnish`.** They contain hypoallergenic claims awaiting correction (audit §1.7).
6. `pb-newsletter` (03 §4.6): Dawn's customer form, `id="signup"`, green double frame. **Leave the consent setting empty**; the owner must supply the wording (owner-inputs D-03). Note that in your report.

Then compose **`templates/index.json`** (03 §9, prelaunch). Also save `templates/index.live.json.txt` with the live configuration: `pb-featured` in collection mode for `jewelry`, the hero CTA "Shop jewelry", the live editorial CTA, and no announcement.
- **Done when:** the homepage matches `Archive-Home` and `Archive-Home-Mobile` section by section in prelaunch. Switching to the live configuration in the theme editor produces the live state (02 §8). An empty `jewelry` collection makes `pb-featured` render nothing, not an empty grid.

### 2.4 · Collection page
1. `pb-collection-header` (03 §4.7). It replaces `main-collection-banner`.
2. **Dawn edit:** the in-grid promo tile in `sections/main-collection-product-grid.liquid` (03 §8). Last page only, not counted, hidden on zero results.
3. Restyle the grid, filters, sort, pagination and drawer via CSS to match §5 of the spec (pills, toolbar borders, gold accents).
4. Empty state copy from `pb.collection.*` locales.
5. Compose **`templates/collection.json`** (03 §8), with the help-strip `multicolumn` styled per 03 §8.
- **Done when:** the collection page matches `Archive-Collection` and `Archive-Collection-Mobile`, including the filter drawer and no-results states. Test against an existing collection (e.g. `apparel`) for layout. Legacy products showing in a dev preview are expected; never screenshot them as marketing.

### 2.5 · Product page
The product page carries the most risk. Do the edits one at a time and retest after each.
1. Compose **`templates/product.json`** with the block order in 03 §5 (eyebrow, title, price, short description, divider, picker, size guide popup, fit note, buy buttons, service text, five accordions). Remove the vendor, quantity, share and description blocks, and set dynamic checkout off.
2. Dawn edits in 03 §5, all **required** (D-23):
   1. hide empty tabs;
   2. open-by-default tab;
   3. Size guide inline in the Size legend;
   4. "Add to bag" label;
   5. "Select a size" start state;
   6. left thumbnail column + framed main image;
   7. sticky bar hook.
3. `snippets/pb-sticky-atc.liquid` + `assets/pb-sticky-atc.js` (03 §4.10). It submits the main form, listens for `variant:change`, and hides while the cart drawer is open.
4. `related-products` ("Wear it with", centred head with a diamond) and the cart drawer restyle (02 §6.3, §6.5) via CSS.
5. **Judge.me:** don't add any Judge.me block or widget to the product template (D-13). If an app embed injects one, hide it on jewelry templates and report it.
- **Done when:** the product page matches `Archive-Product` and `Archive-Product-Mobile`, including the sticky bar and cart drawer states. The full functionality list in 05 §3 passes:
  - variant change updates the price, availability, URL and images;
  - the sold-out size is announced;
  - the size guide modal traps focus;
  - "Select a size" blocks submit until a size is chosen;
  - a shared `?variant=` link pre-selects that size.

### 2.6 · Content pages
- `pb-page` (03 §4.9). Then templates `page.our-story.json`, `page.why-brass.json`, `page.jewelry-care.json`, `page.size-guide.json`, composed per `01-implementation-plan.md` §2B.
- **These pages don't exist in the store yet** (creating them is store change E-03). Build the templates only. Test by temporarily assigning a template to an existing page **in the dev theme preview only**, or wait for approval. Never create pages yourself.
- Contact (`page.contact.json`): restyle, and add the previous-orders note. The `[date]` stays bracketed until the owner gives it.
- Blog and article: restyle via CSS; check one legacy and one jewelry article.
- **Done when:** each template renders with the centred diamond head, caps H1 and correct widths, and the size-guide tables are styled.

### 2.7 · SEO plumbing (03 §10)
- `Organization` JSON-LD on the homepage. `sameAs` stays empty until the owner verifies the social URLs.
- Confirm Product JSON-LD comes only from real products, never from `pb-featured` concepts mode.
- Don't change store-level titles or descriptions (E-11).

### 2.8 · Craft carry-over (needs A-01)
- With theme access, pull the live **Craft 14.0.0** theme into a **separate folder outside this repo**. Work through the carry-over checklist in `audit.md` §5:
  - re-enable the needed app embeds (Klaviyo; Judge.me without jewelry widgets) in the **new** theme's settings;
  - list any Craft custom code, each item recreated or dropped with a reason.
- Don't copy Craft files into this repo.
- Without A-01, skip this step and report it as blocked.

### 2.9 · Prelaunch fixtures (only if a dev store exists, A-04)
- Create `[FIXTURE]` draft products with Finish and Size variants (including one sold-out size) **on the development store only**, to test the product page and collection fully (01 §2C).
- **Never create fixtures, collections, menus or pages on the live store.** Even drafts are shared store data.

---

## 4 · Phase 2 exit criteria (all required)

- [ ] Every part in 03 §0 exists. Nothing is labelled "optional" or "acceptable".
- [ ] `shopify theme check`: no new errors.
- [ ] **05 §9 design fidelity:** side-by-side screenshots at 1440 and 390 for home (prelaunch and live), collection and product, plus the mobile states (filter drawer, no results, sticky bar, cart drawer). Every difference is listed in a deviation log, and **zero are unapproved**.
- [ ] 05 §1 (visual), §2 (honesty), §3 (functionality), §4 (accessibility, including axe with 0 serious or critical issues, keyboard-only and 200% zoom) and §8 (code quality) pass. §5–7 are partly checked and reported.
- [ ] There's no fake purchasable inventory, no price or schema on concepts, and no pipe reviews or legacy content on the new templates.
- [ ] `CHANGELOG.md` lists every Dawn edit, and the code has the `PB:` markers.
- [ ] **No store data changed** (no menus, pages, products on the live store, metafields, redirects or apps installed), and nothing published.

## 5 · Stop and ask the owner (don't guess) if

- you'd need any store change: menus (E-04), pages (E-03), metafield definitions (E-01), live-store products or collections;
- something can't be built exactly as specified. Log it as a deviation and ask; don't simplify (D-21);
- a Dawn edit would need to rewrite Dawn's product or cart JavaScript instead of hooking into it;
- Judge.me, Klaviyo or another app injects content you can't control from the theme;
- copy needs facts nobody has supplied (consent wording, the contact-note date, shipping and returns summaries). Leave them blank or bracketed.

## 6 · Known gaps you'll hit (expected, not your fault)

| Gap | Effect in preview | Resolved by |
| --- | --- | --- |
| `jewelry-main-menu` and footer menus don't exist (E-04) | Empty nav and footer links | Owner approval in Phase 3 |
| No jewelry products or collections | `pb-featured` collection mode and category tiles render nothing; the product page is tested on fixtures or legacy products | Phase 3 (C-01 to C-11, E-02, E-05) |
| No photography | Placeholders everywhere | C-09, C-10 |
| No logo files | Typeset wordmark | B-04 |
| Consent wording, shipping and returns copy | Blank or bracketed | D-01 to D-03 |

## 7 · Report back with

1. Commits per step and the branch name.
2. The deviation log, with each item fixed or awaiting approval.
3. QA results: what was tested, how, pass or fail, and what's untested (with the reason).
4. Screenshot sets (desktop and mobile) for each template and state.
5. Updated `CHANGELOG.md`, any new `owner-inputs.md` items, and the Craft carry-over results (or "blocked: no A-01").
6. Next step: Phase 3 (catalog and content). Follow [`phase-3-brief.md`](phase-3-brief.md). The owner leads it, and every store change is approved one at a time.

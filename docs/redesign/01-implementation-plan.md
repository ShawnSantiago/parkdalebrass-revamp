# 01 · Implementation plan

Goal: ship the Parkdale Brass jewelry storefront as an **unpublished Dawn-based theme** that supports a *prelaunch* state now and a *live* state once real products are approved, without touching live store data until the owner signs off.

Strategy in one line: **the design leads and the theme follows (D-21).** Use Dawn's settings and one token stylesheet wherever they match the spec exactly, build `pb-*` sections or marked Dawn edits wherever they don't, and compose new JSON templates. No new frameworks, apps or build step. No quiet simplifications.

---

## Phase overview

| Phase | Outcome | Depends on | Store-level mutation? |
| --- | --- | --- | --- |
| 0 · Audit | Live theme pulled into Git, audit report written | Theme access (Shopify CLI) | No |
| 1 · Foundation | Tokens, colour schemes, type, buttons, header, footer | Phase 0 | No |
| 2 · Templates | Homepage (prelaunch + live), collection, PDP, content pages | Phase 1 | No (uses fixtures / unpublished theme) |
| 3 · Catalog & content | Real product data, metafields, photos, policies | Owner inputs | **Yes, approval required** |
| 4 · QA | Accessibility, performance, SEO, analytics, cross-device | Phases 2–3 | No |
| 5 · Launch | Publish theme, apply approved store changes | Owner sign-off | **Yes, approval required** |
| 6 · Monitor | Weekly SEO / funnel / error review for 4 weeks | Launch | No |

Build Phases 0–2 now. Don't wait on SKUs or photography for them. Phase 5 waits on Phase 3.

---

## Phase 0 · Audit (read-only)

**Tasks**

1. `shopify theme list --store <store>.myshopify.com` and note the live theme name, ID and role.
2. `shopify theme pull --theme <live-id>` into a fresh directory. Diff it against this repo (stock Dawn 16.0.0):
   - **Resolved 2026-11-25:** the live theme is Craft 14.0.0, and the build stays on Dawn 16 (D-24). Pull Craft into a separate reference folder (don't commit it over this repo) and use it to complete the carry-over checklist in `audit.md` §5. The original rules follow.
   - If the live theme **is Dawn (any version)**: commit it to the branch as `chore: import live theme`, then upgrade to 16.0.0 only if the gap is small. Otherwise apply these docs to the live version.
   - If it is **another theme**: stop and report. The owner decides between re-mapping these docs to that theme and moving to Dawn.
3. Record in `docs/redesign/audit.md`:
   - theme name and version, customised files (`git diff --stat` vs stock), app blocks (`"type": "@app"` and `shopify://apps/` in JSON), `settings_data.json` presets;
   - hard-coded legacy references: `grep -riE "pipe|smok|cannabis|420|one.hitter|age.?(gate|verif)|bellwoods|brockton" .`;
   - menus referenced by handle (`main-menu`, `footer`, `customer-account-main-menu`), collections referenced in templates;
   - Admin data (read-only, owner provides exports): products and handles, collections, metafield definitions, URL redirects, markets/currencies, shipping zones, apps, pixels, Search Console 16-month export, sitemap, analytics landing pages.
4. Capture baseline screenshots (home, `/collections/all`, one product, blog, contact) at 390 and 1440 wide, and run a Lighthouse lab baseline. Store them under `docs/redesign/baseline/`.

**Exit:** audit committed, risks listed, owner has reviewed. No store mutation.

---

## Phase 1 · Design foundation

Step-by-step handover: **[`phase-1-brief.md`](phase-1-brief.md)**.

| # | Task | Files | Detail |
| --- | --- | --- | --- |
| 1.1 | Colour schemes | `config/settings_data.json` | Replace schemes 1–5 with the five Archive schemes (03 §1): onyx, onyx deep, royal green, onyx raised, gold. Merge; don't replace the file. |
| 1.2 | Typography | `config/settings_data.json`, `assets/pb-theme.css` | Heading font **Cormorant Garamond 500 + 600** (CSS picks the weight per element), body **Inter 400**. Self-host the WOFF2 files by default; switch to font-library handles if the owner confirms they exist (03 §2). |
| 1.3 | Global settings | `config/settings_data.json` | Page width 1440, radii 2, no shadows, reveal-on-scroll off, card portrait styling (03 §1). |
| 1.4 | Token stylesheet | `assets/pb-theme.css` (new), `layout/theme.liquid` (1 line) | Tokens, eyebrow, link, focus, placeholder and header-wordmark styles. Loaded after `base.css` (03 §3). |
| 1.5 | Header | `sections/header-group.json` | Logo left, dropdown menu → `jewelry-main-menu`, sticky on scroll-up, announcement bar shown only when a message is set. |
| 1.6 | Footer | `sections/footer-group.json`, `sections/footer.liquid` | Brand block + 3 link-list blocks (Shop / Learn / Help), country selector on, newsletter off (the homepage has its own), policies on. Dawn edit: mobile accordions (03 §7). |
| 1.7 | Locale strings | `locales/en.default.json` | Add `pb.*` strings used by the custom sections (03 §6). |

**Exit:** a blank page on the dev theme shows the onyx ground, ivory and gold type, the spaced wordmark with its diamond, the green announcement bar and the Parkdale footer, and passes contrast.

---

## Phase 2 · Templates and sections

Step-by-step handover: **[`phase-2-brief.md`](phase-2-brief.md)**. The footer accordion edit listed below is done in Phase 1.

### 2A · Custom sections and Dawn edits (wherever Dawn can't match the spec exactly; full map in 03 §0)

| Section | Why Dawn isn't enough | Spec |
| --- | --- | --- |
| `pb-hero.liquid` | Dawn `image-with-text` allows one button. The design needs an eyebrow, H1, text, primary button, secondary link, separate mobile image and mobile copy-first order. | 02 §4.1, 03 §4.1 |
| `pb-category-tiles.liquid` | Must hide collections with zero published products; 4:5 tiles on desktop become full-width rows on mobile. | 02 §4.2, 03 §4.2 |
| `pb-featured.liquid` | One section for both states: concept cards (no price, link or schema) before launch, real products after; centred ruled head and a button below. | 02 §4.3, 03 §4.3 |
| `pb-editorial-banner.liquid` | Wide image (21:9 desktop / 4:5 mobile) with heading and link **below** the image, never over it. | 02 §4.5, 03 §4.4 |
| `pb-journal-picks.liquid` | Dawn `featured-blog` shows the latest posts, which may be legacy smoking posts. This section picks specific articles. | 02 §4.7, 03 §4.5 |
| `pb-newsletter.liquid` | Split dark panel with consent copy, using Dawn's customer form behaviour. | 02 §4.8, 03 §4.6 |
| `pb-collection-header.liquid` | Centred diamond head, caps H1, live-category line and category pills. Replaces `main-collection-banner`. | 02 §5, 03 §4.7 |
| `pb-split.liquid` | Exact 1:1 full-bleed green split and 6fr/5fr split with a double-framed image. Replaces `image-with-text`. | 02 §4.4, §4.6, 03 §4.8 |
| `pb-page.liquid` | Centred diamond head with caps H1 and dateline for content pages. Replaces `main-page` there. | 02 §7, 03 §4.9 |
| `pb-sticky-atc` (snippet + JS) | Mobile sticky add-to-bag | 02 §6.4, 03 §4.10 |
| Dawn edits | Product: hide empty tabs, open-by-default tab, inline size guide, "Select a size" start state, left thumbnail column + framed image, sticky bar hook. Collection grid: promo tile. Footer: mobile accordions. | 03 §5, §7, §8 |

Every section must have: a `{% schema %}` with presets, translated labels, `color_scheme` and padding settings, `t:` strings, escaped merchant text (`| escape` for plain text, richtext rendered as-is), images via `image_url` + `image_tag` with `widths`/`sizes`, `loading: 'lazy'` except the hero.

### 2B · Templates

| Template | File | Composition |
| --- | --- | --- |
| Home, prelaunch | `templates/index.json` | announcement (launch-list message) → `pb-hero` (CTA "Get launch updates" → `#signup`) → `pb-category-tiles` → `pb-featured` (concepts mode) → `pb-split` (material) → `pb-editorial-banner` → `pb-split` (story) → `pb-journal-picks` → `pb-newsletter` (`id="signup"`) |
| Home, live | same file, edited in the theme editor at launch | Set `pb-featured` mode to `collection` (`jewelry`), set the hero CTA to "Shop jewelry" → `/collections/jewelry`, switch the editorial CTA, clear the announcement. Keep a copy as `templates/index.live.json.txt` for reference (Shopify ignores `.txt`). |
| Collection | `templates/collection.json` | `pb-collection-header` → `main-collection-product-grid` (portrait, 3/2 cols, horizontal filters, sort on) → `multicolumn` (Size guide / Care / Shipping) |
| Product | `templates/product.json` | `main-product` with the block order in 03 §5 → `related-products` ("Wear it with", portrait, 4/2). Remove the vendor block, share block and dynamic checkout. |
| Page: Our Story | `templates/page.our-story.json` | `pb-page` (dateline on) → `pb-split` (framed image) |
| Page: Why Brass? | `templates/page.why-brass.json` | `pb-page` → `pb-split` ×2 (one green) → `pb-journal-picks` → `pb-featured` (collection mode, live only) |
| Page: Jewelry Care | `templates/page.jewelry-care.json` | `pb-page` → `collapsible-content` (one row per finish, styled per 02 §2.6) |
| Page: Size Guide | `templates/page.size-guide.json` | `pb-page`. Tables are written in the page body and styled by `pb-theme.css` (`.rte table`). |
| Blog / article | existing `blog.json`, `article.json` | Restyle only, via schemes and type. |
| Contact | existing `page.contact.json` | Add a `rich-text` block: "Questions about an order placed before [date]? Include your order number." |

### 2C · Prelaunch fixtures (dev only)

- On a **development store or the unpublished theme only**, create draft products that are never published to any channel, so the PDP and collection grid can be tested. Title them `[FIXTURE] The Junction` and so on, set **status: Draft**, and give them no sales channels.
- If a dev store isn't available, test the PDP with Shopify's theme-editor preview of an existing product. **Never** publish fixtures to the live store.

**Exit:** the unpublished theme preview matches `02-design-spec.md` and canvas page B **side by side** (05 §9) at 320, 375, 390, 768, 1280 and 1440 wide, with zero unapproved deviations, in both prelaunch and live homepage configurations, with no fake purchasable inventory.

---

## Phase 3 · Catalog and content (owner approval needed for each item)

Step-by-step handover: **[`phase-3-brief.md`](phase-3-brief.md)**. Additive changes are made **hidden** in Phase 3 (draft products, collections off the Online Store, hidden pages, menus unused by the live theme). Visibility changes, unpublishing, redirects and policy replacement wait for the Phase 5 runbook.

| Change | Type | Reversible by |
| --- | --- | --- |
| Create metafield definitions `custom.*` (04 §2) | Additive | Delete the definitions (values are lost) |
| Create collections `jewelry`, `bracelets`, `necklaces`, `rings` (smart: product type / tag) | Additive | Delete the collections |
| Create menus `jewelry-main-menu`, `footer-shop`, `footer-learn`, `footer-help`, `shop-categories` | Additive | Delete the menus. The old `main-menu` is left untouched. |
| Create pages `our-story`, `why-brass`, `jewelry-care`, `size-guide` (check for handle collisions first) | Additive | Delete or hide the pages |
| Add real jewelry products (approved data and photos only) | Additive | Draft them |
| Unpublish legacy products from Online Store / Shop / Google channels | **Destructive to visibility** | Re-publish per channel. Export product CSV first. |
| URL redirects for retired legacy URLs (04 §5) | Behaviour change | Delete the redirects (export first) |
| Policy text updates (shipping, refunds) | Legal | Restore from the exported copy |
| Update `/blogs/news/*` jewelry articles for accuracy and internal links | Content | Shopify keeps no revision history, so copy the HTML to `docs/redesign/backup/` first |

---

## Phase 4 · QA

Run `05-qa-checklist.md` in full. Minimum tooling:

- `shopify theme check` with zero new errors (existing Dawn warnings documented);
- Lighthouse (mobile) on home, collection and PDP vs the Phase 0 baseline;
- axe DevTools or `@axe-core/playwright` on the same pages, plus a keyboard-only pass;
- a Playwright screenshot set at the six widths.

---

## Phase 5 · Launch runbook (owner present)

1. **Back up:** duplicate the live theme in Admin (name it `Backup pre-jewelry YYYY-MM-DD`), and export products CSV, redirects CSV, menus (screenshots), policies (copy text) and customer/newsletter consent export.
2. Apply the approved Phase 3 store changes in this order: metafield definitions → products → collections → pages → menus → redirects → policies.
3. In the dev theme editor, switch the homepage to the live composition (2B) and confirm the header menu points to `jewelry-main-menu`.
4. Publish the theme.
5. Smoke test within 15 minutes:
   - home, collection, PDP and article load;
   - add to cart, edit cart, reach checkout (don't complete it unless a test-order plan exists);
   - signup succeeds;
   - one legacy URL redirects correctly;
   - `/sitemap.xml` loads.
6. Search Console: submit the sitemap and inspect `/`, `/collections/jewelry` and one PDP.
7. Merchant Center / ads: only after the owner confirms account status. Remove retired products from feeds through channel settings.

### Rollback

| What | How |
| --- | --- |
| Theme | Publish `Backup pre-jewelry …` (instant) |
| Menus | The old `main-menu` was never edited. Point the backup theme's header back at it (already the case in the backup). |
| Product visibility | Re-publish legacy products per channel from the CSV export list |
| Redirects | Delete the new redirects, or re-import the exported CSV |
| Policies | Paste the backed-up text |
| New collections, pages, metafields | Leave in place (harmless) or delete them |

A theme rollback alone **doesn't** undo store data. Run every row above.

---

## Phase 6 · Monitor (4 weeks)

Each week, report:

- Search Console impressions and clicks for jewelry queries, 404s, indexing and redirect coverage;
- the funnel: sessions → PDP views → add to cart → checkout → purchase;
- signup conversion;
- theme JS errors;
- support emails about old orders.

Propose changes; don't apply them without approval.

---

## Deliverables checklist (from brief §14)

- [ ] `audit.md` (Phase 0)
- [ ] Changed files with commit history on the dev branch
- [ ] Unpublished preview theme URL
- [ ] Missing-assets and unresolved-claims table (04 §4), kept current
- [ ] Redirect / URL inventory (04 §5)
- [ ] QA evidence (05)
- [ ] Launch and rollback runbook (above), signed off by the owner
- [ ] Final summary: files changed, decisions, assumptions, owner actions

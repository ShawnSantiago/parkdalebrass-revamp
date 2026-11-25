# Phase 0 audit

**Status: partial.** Only the repository could be audited. The live theme, Shopify Admin and analytics need owner access (`owner-inputs.md` A-01 to A-03). An automated read of the public storefront was blocked in this session, so the public observations below come from the brief and have **not been re-verified**.

| Area | Status | Source |
| --- | --- | --- |
| Repository | **Audited** (2026-11-25) | This repo, commit `258f00f` |
| Public storefront | Reported in the brief, not re-verified | Brief §2, §10, §15 (inspected Nov 25, 2026) |
| Live theme (files, settings, apps) | **Not audited**. Needs A-01. | n/a |
| Shopify Admin data | **Not audited**. Needs A-02. | n/a |
| Search Console / analytics | **Not audited**. Needs A-03. | n/a |
| Performance baseline | **Not captured**. Needs a reachable storefront. | n/a |

---

## 1 · Repository (verified)

| Check | Finding |
| --- | --- |
| Theme | **Dawn 16.0.0**: `config/settings_schema.json` → `theme_name: Dawn`, `theme_version: 16.0.0`. Git HEAD before docs: `258f00f Dawn 16.0.0 (#3946)`, the upstream Shopify history. |
| Customisations | **None.** No theme files differ from upstream Dawn 16.0.0; the only additions are docs (`AGENTS.md`, `CLAUDE.md`, `docs/`). |
| Settings | `config/settings_data.json` is Dawn's default preset (`"current": "Dawn"`, default colour schemes, Assistant font). It is **not** the store's configuration. |
| Size | 190 assets, 90 sections + snippets, 51 locale files, 13 templates (all Dawn defaults). |
| Legacy references | A search for `pipe\|smok\|cannabis\|420\|one.hitter\|age gate/verify\|bellwoods\|brockton` found no legacy content. The only hit is the number `420` in an SVG path in `assets/mask-blobs.css` (false positive). |
| Age gate / popups | None in code. |
| App blocks | Only Dawn's standard `@app` block slots (header, newsletter, featured-product, cart footer, apps section). No installed-app markup or `shopify://apps/` references in JSON. |
| Menus referenced | `main-menu` (header), `customer-account-main-menu` (theme settings). The footer has no menu blocks yet. |
| Tooling | No `shopify` CLI or `theme-check` installed in this environment. |

### What this means

- **This repo isn't a copy of the live store's theme.** It's a clean Dawn 16.0.0 starting point. The live theme may be Dawn (any version), another theme, or Dawn with heavy edits. That isn't known yet.
- Building on this repo as-is would **discard** whatever the live theme has: app blocks, section settings, custom code, the logo, menus wired in the header. Hence rule 1 in `AGENTS.md`: pull the live theme before Phase 2.
- Phase 1 work (tokens, `pb-theme.css`, the custom sections) can be prototyped here safely. Merging into the live theme's settings has to wait for the pull.

---

## 2 · Public storefront (from the brief, not re-verified)

| Observation | Implication |
| --- | --- |
| The homepage markets cannabis accessories and features the Bellwoods and Brockton MK2 | Replace all homepage content (planned) |
| Main menu: Home, Shop (pipes / apparel / all), Blog, Contact | New `jewelry-main-menu`; keep the old menu for rollback (D-07) |
| `/collections/all` mixes smoking products, accessories and branded apparel | Jewelry gets its own collection (D-08); legacy items to be unpublished with approval (E-08) |
| Homepage reviews refer to pipes and smoking | Remove from jewelry pages; keep the records (D-13) |
| Existing jewelry articles: `/blogs/news/what-is-brass-jewelry-metal`, `/blogs/news/gold-plated-brass-jewelry` | Keep the URLs, update the content (E-07) |
| Legacy products: `/products/brockton-mk2`, `/products/the-bellwoods-one-hitter` | Retirement decision after the traffic audit (04 §5) |
| The footer has email signup and policy links; Shopify localization is present | Keep; audit consent and policies (section D) |

---

## 3 · Still to audit (checklist)

### Live theme (needs A-01)
- [ ] `shopify theme list`: live theme name, ID, role; other themes and their dates
- [ ] `shopify theme pull --theme <live-id>` into a separate folder, then diff against Dawn 16.0.0
- [ ] Theme name and version (`settings_schema.json` → `theme_info`)
- [ ] Customised files, and what each customisation does
- [ ] App blocks and app embeds (`settings_data.json` → `blocks` with `shopify://apps/`)
- [ ] Hard-coded legacy content, age gate, popups (repeat the search from §1 on the pulled theme)
- [ ] Logo, favicon, fonts and colours in use
- [ ] Menus and collections wired into the templates

### Admin (needs A-02)
- [ ] Products: count, handles, types, tags, status and channels (CSV export)
- [ ] Collections and their rules
- [ ] Menus: `main-menu`, `footer`, others
- [ ] Metafield definitions (products, collections, pages)
- [ ] URL redirects (CSV export)
- [ ] Pages and their handles (check for collisions with `our-story`, `why-brass`, `jewelry-care`, `size-guide`)
- [ ] Blog articles: list them, tag jewelry vs legacy
- [ ] Markets, currencies, shipping zones and rates
- [ ] Installed apps (reviews, email, age verification, subscriptions, feeds)
- [ ] Customer accounts setting; newsletter / consent configuration
- [ ] Pixels and Customer Events; cookie or consent banner
- [ ] Sales channels (Online Store, Shop, Google & YouTube, Meta) and which products are on each
- [ ] Policies: shipping, refund, privacy, terms (copy the current text)

### SEO and analytics (needs A-03)
- [ ] Search Console: 16-month query and page export, indexed pages, current 404s
- [ ] `sitemap.xml` and `robots.txt`
- [ ] Analytics landing pages and top-traffic URLs
- [ ] Backlinks to legacy product URLs, if a tool is available
- [ ] Merchant Center / ads account status

### Baseline
- [ ] Screenshots at 390 and 1440: home, `/collections/all`, one product, the blog, contact
- [ ] Lighthouse mobile: home, collection, product
- [ ] CrUX / Shopify Web Performance field data, if available

---

## 4 · Risks found so far

| Risk | Severity | Mitigation |
| --- | --- | --- |
| The repo isn't the live theme, so changes built here could overwrite live customisations and app wiring | **High** | Pull the live theme first (AGENTS.md rule 1); merge settings key by key |
| The live theme version is unknown, so `03-theme-mapping.md` may not apply line for line | Medium | Re-map after the pull; revisit D-02 if it isn't Dawn |
| Store data (menus, collections, metafields) is shared between the live and dev themes | High | Additive changes only, each approved (`owner-inputs.md` E) |
| Legacy products remain in search, feeds and recommendations until unpublished | Medium | Dedicated `jewelry` collection; E-08 with approval |
| Consent basis for emailing legacy subscribers about jewelry is unknown | Medium | D-04 before any campaign |

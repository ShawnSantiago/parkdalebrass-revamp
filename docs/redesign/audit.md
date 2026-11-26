# Phase 0 audit

**Status (2026-11-26): repository, public storefront and live theme files audited. Shopify Admin and analytics not yet audited** (they need owner access: `owner-inputs.md` A-02 and A-03).

| Area | Status | Source |
| --- | --- | --- |
| Repository | **Audited** | This repo, commit `258f00f` |
| Public storefront | **Audited** (read-only, 2026-11-25) | parkdalebrass.com: homepage, `/products.json`, `/collections.json`, sitemaps, robots.txt, blog, contact, legacy product pages, all 30 jewelry articles |
| Live theme files and settings | **Audited** (read-only, 2026-11-26) | Craft 14.0.0 `168071168322`, pulled with the CLI into `../craft-reference` (outside the repo) and compared with stock Dawn 14. Full report: [`craft-audit.md`](craft-audit.md) |
| Shopify Admin data | **Not audited**. Needs A-02. | n/a |
| Search Console / analytics | **Not audited**. Needs A-03. | n/a |
| Performance baseline | **Not captured**. Lighthouse isn't available here. | n/a |

Full URL list with a proposed first action for each: [`url-inventory.csv`](url-inventory.csv) (167 URLs).

---

## 1 · Headline findings

1. **The live theme is not Dawn. It's Shopify's Craft 14.0.0** (`Shopify.theme`: name "Craft 14.0.0 | 24 - 05 - 13", `schema_name: Craft`, `schema_version: 14.0.0`, theme store ID 1368, role main). Craft is a free Shopify theme built on the same codebase as Dawn, with the same section and snippet names, a different default style, and a version two majors behind this repo's Dawn 16.0.0. **This triggers the re-check written into D-02.** See §5.
2. **The store's admin domain is `parkdale-brass.myshopify.com`.** Currency CAD, locale `en`, country CA.
3. **Third-party apps and scripts on the live site** (confirmed from the theme files on 2026-11-26, [`craft-audit.md`](craft-audit.md)):
   - **Judge.me** product reviews, on the homepage and every page; 26 reviews shown on the homepage, 24 on the Brockton MK2;
   - **Klaviyo** email;
   - **Microsoft Clarity** session analytics, hard-coded in the live `layout/theme.liquid` (not an app embed);
   - `config-security.com` scripts, loaded by the **Triple Whale** pixel embed (D-27);
   - **EZ Preorder** (D-26), **Sezzle** instalments, **Yoast SEO** metatags and a **Concierge** shopping-guide chat, all as app embeds;
   - a **Spline** 3D viewer in a homepage custom-liquid section, loaded from unpkg.

   These need carrying over, configuring or retiring deliberately (§4).
4. **All the homepage copy is cannabis-focused**: "The Brass Standard in Cannabis Luxury.", the Bellwoods and Brockton MK2 feature sections, pipe reviews, and an origin story about "premium smokeware". The meta description is about smoking pipes.
5. **There's a large legacy blog: 133 articles.** 101 are about cannabis or smoking, 30 about brass jewelry and 2 about the brand or brass history. Several legacy articles make **health claims** (e.g. `cannabis-helps-prevent-covid-19-infections`, `when-to-stop-smoking-weed-while-pregnant`, strains for anxiety and pain, `cannabis-and-your-pet`). They should be reviewed or retired whatever happens with the pivot.
6. **The jewelry articles (all published 18–25 Apr 2025, 1,500–2,400 words each) heavily overlap.** Several clusters target the same question: 5 on tarnish, 4 on brass turning skin green, 6 on cleaning, 6 on "is brass good / men's brass". Two articles share the exact title "Why Cleaning Your Brass Jewelry is Essential". Their `<title>` tags are the first section heading rather than a search title (e.g. `is-brass-good-for-jewelry` → "What Exactly is Brass? Understanding the Metal"). None link to a product. This is a cannibalisation and quality risk. Consolidate them **after** the Search Console data is in.
7. **Health-claim inconsistency in the jewelry articles.** Most correctly say brass is *not* hypoallergenic and advise nickel-free options. But `is-brass-good-for-jewelry` says brass "is generally hypoallergenic for most people", and `does-brass-jewelry-tarnish` says "It's also generally hypoallergenic". **These two need correcting before the jewelry launch** (store change E-07).
8. No age gate or age-verification code was found. The Shopify customer-privacy (consent) API is present; whether a consent banner is configured has to be checked in Admin.

---

## 2 · Repository (verified)

| Check | Finding |
| --- | --- |
| Theme | **Dawn 16.0.0** (`settings_schema.json` → `theme_info`). Git HEAD before docs: `258f00f Dawn 16.0.0 (#3946)`, upstream Shopify history. |
| Customisations | None; stock upstream. |
| Settings | Dawn default preset, **not** the store's configuration. |
| Size | 190 assets, 90 sections + snippets, 51 locales, 13 templates. |
| Legacy references | None. The only keyword hit is `420` inside an SVG path in `assets/mask-blobs.css` (false positive). |
| App blocks | Only Dawn's standard `@app` slots. |
| Tooling | No Shopify CLI or Theme Check installed in this environment. |

**Conclusion:** this repo is a clean Dawn 16 starting point. It contains none of the live Craft theme's settings, app embeds or edits.

---

## 3 · Public storefront (verified 2026-11-25)

### Navigation and chrome
- **Main menu:** Home (`/`), Shop → All (`/collections/all`), Pipes (`/collections/metal-smoking-pipes`), Apparel (`/collections/apparel`), Blog (`/blogs/news`), Contact (`/pages/contact-us`).
- **Announcement bar:** none.
- **Footer:** payment icons and policy links (privacy, refund, shipping, terms, "Do not sell my personal information" `/pages/ccpa-opt-out`, "Sitemap" `/pages/sitemap`). There's also a "Created By Parkdale Digital" credit link and "Powered by Shopify". *Corrected 2026-11-26:* the email signup seen on the homepage ("Subscribe to our emails") is an `index.json` newsletter section, not the footer, and the live footer has its newsletter and country selector off ([`craft-audit.md`](craft-audit.md), Settings).
- **SEO:** the title is just "Parkdale Brass". The meta description is pipe-focused. The canonical is correct (`https://parkdalebrass.com/`). JSON-LD: Organization, WebSite, SearchAction. **There's no `og:image` on the homepage.**
- **robots.txt:** Shopify default; nothing custom.
- The sitemap index has products, pages, collections, blogs, articles, plus Shopify's `sitemap_agentic_discovery.xml`.

### Catalog: 12 published products

| Handle | Type / tags | Price (CAD) | Available | Category |
| --- | --- | --- | --- | --- |
| `brockton-mk2` | pipe | 120 | No | Legacy smoking |
| `brockton-mk2-special-edition` | pipe | 140 | No | Legacy smoking |
| `the-bellwoods-one-hitter` | Metal Smoking Pipes | 30–50 (2 styles) | Yes | Legacy smoking |
| `brass-pipe-screens` | Screens | 10 | No | Legacy smoking |
| `6-5-long-bristle-scrubbing-pipe-cleaners-3-cleaners` | n/a | 5 | No | Legacy smoking |
| `short-sleeve-unisex-t-shirt-4`, `-5` | apparel | 17.50–30.50 | Yes | Brand merch |
| `dad-hat-1` | apparel | 30 | Yes | Brand merch |
| `men-s-slides`, `men-s-slides-gold` | Slides | 40 | Yes | Brand merch |
| `toddler-short-sleeve-tee` | T Shirt | 28.50 | Yes | Brand merch |
| `parkdale-brass-mug` | n/a | 14.50 | Yes | Brand merch |

No jewelry products are published. Product types are inconsistent (often blank), so they can't drive the planned smart collections until they're cleaned up.

### Collections: 14
- **With products:** `shop` (9), `apparel` (6), `metal-smoking-pipes` (4), `coming-soon` (2), `featured-products` (2), `pipe-accessories` (2), `accessories` (1), `etsy` (1).
- **Empty (0 products) but published and in the sitemap:** `cleaning`, `containers`, `grinders`, `lighters-and-matches`, `trays`, `vaporizers`.
- **No `jewelry`, `bracelets`, `necklaces` or `rings` handles exist**, so there are no collisions with the planned handles (04 §3).

### Pages: 5 in the sitemap
- `contact-us`: a working form, plus the email address in the copy.
- `ccpa-opt-out`.
- `reviews`: empty, title only.
- `fathers-day-24` and `page-2`: **duplicate** Father's Day Bellwoods promos.
- `/pages/sitemap` is linked from the footer but isn't in the sitemap. Check it in Admin.
- **No `our-story`, `why-brass`, `jewelry-care` or `size-guide` pages exist**, so the planned handles are free.

### Blog: `/blogs/news`, 133 articles
- 101 legacy cannabis or smoking articles, 30 jewelry articles, 2 brand/brass (`the-bright-history-of-brass`, `the-parkdale-brass-story`).
- Jewelry topic clusters and proposed first actions are in `url-inventory.csv`. Nothing is redirected until the Search Console data shows which URL in each cluster earns the traffic.

---

## 4 · Apps and integrations to carry over or retire

Updated 2026-11-26 from the theme files. Evidence and the full table: [`craft-audit.md`](craft-audit.md). Open questions: `owner-inputs.md` section G.

| App / script | How it loads | Handling in the new theme |
| --- | --- | --- |
| Judge.me reviews | Core app embed (on); review blocks on the homepage and Brockton MK2 templates | Keep the app and the records. Add **no** Judge.me block to any template (D-13). Core embed stays off until G-07 is decided. Never show the pipe review aggregate. |
| Klaviyo | App embed (on) | Carry over (D-24). Check its popups for pipe copy and discounts first. Consent wording is D-03. |
| Microsoft Clarity | Hard-coded in the live `layout/theme.liquid`, no consent gate | Don't copy. Owner decision G-03. |
| Triple Whale (`config-security.com`) | App embed (on) | Don't carry (D-27). |
| EZ Preorder | App embed (on) | Don't carry (D-26). |
| Sezzle | Two app embeds plus a product-page block | Off until G-04 is decided. |
| Yoast SEO | Metatags app embed (on) | Off until G-05 is decided. |
| Concierge Shopping Guide | Chat app embed (on) | Off until G-06 is decided. |
| Shopify Inbox | App embed (off) | Stays off. |
| Instant page builder | Generated `instant-*` sections and templates | Don't carry. Its two pages are G-10 and G-12. |
| Spline 3D viewer (via unpkg) | Homepage custom-liquid | Legacy only. Not carried into the jewelry theme. |

---

## 5 · Base theme decision (D-02 re-check): **decided, option A, Dawn 16 (D-24)**

D-02 ("build on Dawn 16") was approved on the condition that it's re-checked if the live theme isn't Dawn. It isn't, so D-02 was reopened. **On 2026-11-25 the owner chose option A (D-24).** The options considered:

| Option | What it means | For | Against |
| --- | --- | --- | --- |
| **A. Build the redesign on Dawn 16 (this repo)** *(recommended)* | A new unpublished theme from Dawn 16. Carry over only what's still needed from Craft (app embeds, a few settings, policy/contact wiring) after the theme pull. | The current, supported codebase. The docs are written against it. The redesign replaces nearly all of Craft's visible content anyway. Craft's sections share Dawn's names, so little is lost. | App embeds and any Craft edits must be re-enabled by hand. The pull and diff are still needed to know what those are. |
| **B. Pull Craft 14 and redesign on top of it** | Use the live theme as the base and apply these docs to Craft 14. | Keeps every existing setting and app embed in place. | Two majors behind Dawn 16. Line references in `03-theme-mapping.md` won't match. Restyling Craft's defaults adds work. Upgrading later is harder. |

The **theme pull (A-01) is still required**, to list what to carry over from Craft.

### Themes on the store (CLI `theme list`, 2026-11-26)

17 themes: **live** Craft 14.0.0 | 24 - 05 - 13 (`168071168322`), the Archive Phase 1 preview (`196453663042`), and 15 older unpublished themes (Prestige 5.2, Origin, several Craft 12 / "STG" copies, a `parkdalebrasstheme/master - Backup`).

**One is named "NEVER DELETE - Theme for Bloggle app" (`141930692930`).** That suggests the Bloggle blog app depends on it. Don't delete or alter it. Before launch, confirm in Admin → Apps whether Bloggle is still installed and what it needs from the new theme (add this to the carry-over list below). Cleaning up the old themes is the owner's call, and it isn't part of this project.

### Carry-over checklist (Craft 14 → new Dawn 16 theme)

The checklist is in [`craft-audit.md`](craft-audit.md) ("Carry-over checklist"), built from the theme pull on 2026-11-26. Each item is re-created in the Dawn theme, never copied as Craft code. It covers app embeds, tracking and consent, templates and legacy URLs, settings and branding, footer and localization, structured data, and preview pushes. The Bloggle theme (`141930692930`, "NEVER DELETE") stays as it is: Bloggle has no code in Craft, so only an Admin check is left (A-02).

---

## 6 · Still to audit (needs access)

### Live theme (A-01): done 2026-11-26
- [x] Pulled the live theme (`168071168322`) into `../craft-reference` and compared it with stock Dawn 14 (the Craft base)
- [x] Custom code, app embeds (`settings_data.json` blocks with `shopify://apps/`), app blocks in templates
- [x] Logo, favicon, fonts and colours in use; the Spline and Judge.me integrations

Results: [`craft-audit.md`](craft-audit.md).

### Admin (A-02)
- [ ] Products CSV (including drafts and unlisted), metafield definitions, menus, URL redirects, the `/pages/sitemap` page
- [ ] Markets, shipping zones, apps list (Instant, Bloggle, Sezzle, EZ Preorder, Concierge still installed?), pixels and Customer Events, consent banner. `config-security.com` is Triple Whale (D-27).
- [ ] Sales channels per product (Online Store, Shop, Google, Meta, Etsy?)
- [ ] Policies: current text copied for backup
- [x] **Customer account mode:** **new** customer accounts (owner confirmed 2026-11-25), so no upgrade is needed. Originally checked because Dawn 16 removed the legacy account templates (E-13).

### SEO and analytics (A-03)
- [ ] Search Console 16-month query and page export, then fill in `clicks_16m` and `impressions_16m` in `url-inventory.csv` and choose a consolidation target per jewelry cluster
- [ ] Analytics landing pages; backlinks to legacy product and blog URLs
- [ ] Merchant Center / ads account status

### Baseline
- [ ] Screenshots at 390 and 1440 of home, `/collections/all`, `brockton-mk2`, the blog and contact; Lighthouse mobile

---

## 7 · Risks

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Live theme is Craft 14, the build is Dawn 16 (D-24). Custom code and app embeds would be lost if the Dawn build is published without carrying them over. | **High** | Theme pull done (A-01); the carry-over checklist in [`craft-audit.md`](craft-audit.md) is completed before launch |
| The live store today promises "Shipping in summer 2024" on a purchasable product, and t-shirts can't be ordered by size (variant picker disabled) | **High** (live now) | Owner fixes both in the live theme editor (G-08, G-09) |
| `/pages/page-2` serves unsourced "Verified 5-star reviews" and hidden AG1 endorsements; `/pages/reviews` shows pipe reviews | **High** (live now) | Unpublish both with a backup (G-10, G-11) |
| Pages, products or articles assigned a Craft-only template suffix fall back to the new default templates at launch | Medium | List the assignments (A-02); unpublish or accept per URL before launch (E-08) |
| Judge.me pipe reviews could appear on jewelry pages through app embeds or blocks | **High** | Remove the Judge.me blocks and embeds from jewelry templates; QA §2 |
| Health claims in legacy cannabis articles, and two contradictory hypoallergenic claims in jewelry articles | **High** | Fix the two jewelry articles (E-07); review or retire the flagged legacy articles (url-inventory) |
| 30 overlapping jewelry articles cannibalise each other and have weak title tags | Medium | Consolidate by cluster after the Search Console data; 301 within each cluster only |
| 101 legacy articles and 5 legacy products stay indexed and in site search | Medium | Owner decision per URL (keep as unlinked archive or retire); never redirect to jewelry |
| Empty published collections (6) and duplicate promo pages (2) | Low | Unpublish candidates (E-08 scope) |
| No homepage `og:image`; pipe-focused meta description | Low | Set at launch (E-11) |
| Store data (menus, collections, metafields) is shared between the live and dev themes | High | Additive changes only, each approved (`owner-inputs.md` E) |
| Consent basis for emailing legacy subscribers about jewelry is unknown | Medium | Owner input D-04 before any campaign |

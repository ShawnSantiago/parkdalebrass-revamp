# Phase 0 audit

**Status (2026-11-25): repository and public storefront audited. Live theme files, Shopify Admin and analytics not yet audited** (they need owner access: `owner-inputs.md` A-01 to A-03).

| Area | Status | Source |
| --- | --- | --- |
| Repository | **Audited** | This repo, commit `258f00f` |
| Public storefront | **Audited** (read-only, 2026-11-25) | parkdalebrass.com: homepage, `/products.json`, `/collections.json`, sitemaps, robots.txt, blog, contact, legacy product pages, all 30 jewelry articles |
| Live theme files and settings | **Not audited**. Needs A-01 (`shopify theme pull`). | n/a |
| Shopify Admin data | **Not audited**. Needs A-02. | n/a |
| Search Console / analytics | **Not audited**. Needs A-03. | n/a |
| Performance baseline | **Not captured**. Lighthouse isn't available here. | n/a |

Full URL list with a proposed first action for each: [`url-inventory.csv`](url-inventory.csv) (167 URLs).

---

## 1 · Headline findings

1. **The live theme is not Dawn. It's Shopify's Craft 14.0.0** (`Shopify.theme`: name "Craft 14.0.0 | 24 - 05 - 13", `schema_name: Craft`, `schema_version: 14.0.0`, theme store ID 1368, role main). Craft is a free Shopify theme built on the same codebase as Dawn, with the same section and snippet names, a different default style, and a version two majors behind this repo's Dawn 16.0.0. **This triggers the re-check written into D-02.** See §5.
2. **The store's admin domain is `parkdale-brass.myshopify.com`.** Currency CAD, locale `en`, country CA.
3. **Third-party apps and scripts on the live site:**
   - **Judge.me** product reviews, on the homepage and every page; 26 reviews shown on the homepage, 24 on the Brockton MK2;
   - **Klaviyo** email;
   - **Microsoft Clarity** session analytics;
   - `config-security.com` scripts, which look like an analytics or attribution pixel;
   - a **Spline** 3D viewer on the Bellwoods product, loaded from unpkg.

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
- **Footer:** email signup ("Subscribe to our emails"), country/region selector, payment icons, and policy links (privacy, refund, shipping, terms, "Do not sell my personal information" `/pages/ccpa-opt-out`, "Sitemap" `/pages/sitemap`). There's also a "Created By Parkdale Digital" credit link and "Powered by Shopify".
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

| App / script | Seen on | Proposed handling (owner decision) |
| --- | --- | --- |
| Judge.me reviews | Homepage carousel, product pages | Keep the app and the records. **Remove its widgets from jewelry pages** until genuine jewelry reviews exist (D-13). Never show the pipe review aggregate. |
| Klaviyo | Site-wide | Keep. The newsletter form should feed Klaviyo or Shopify customers as the owner prefers. Check consent (D-03/D-04 in `owner-inputs.md`). |
| Microsoft Clarity | Site-wide | Keep only if the owner still wants it and the consent banner covers it. It's a tracking vendor. |
| `config-security.com` | Site-wide | **Identify it first** (Admin → Apps / Customer events). Keep or remove deliberately. |
| Spline 3D viewer (via unpkg) | Bellwoods product | Legacy only. Not carried into the jewelry theme. |

---

## 5 · Base theme decision (D-02 re-check): **decided, option A, Dawn 16 (D-24)**

D-02 ("build on Dawn 16") was approved on the condition that it's re-checked if the live theme isn't Dawn. It isn't, so D-02 was reopened. **On 2026-11-25 the owner chose option A (D-24).** The options considered:

| Option | What it means | For | Against |
| --- | --- | --- | --- |
| **A. Build the redesign on Dawn 16 (this repo)** *(recommended)* | A new unpublished theme from Dawn 16. Carry over only what's still needed from Craft (app embeds, a few settings, policy/contact wiring) after the theme pull. | The current, supported codebase. The docs are written against it. The redesign replaces nearly all of Craft's visible content anyway. Craft's sections share Dawn's names, so little is lost. | App embeds and any Craft edits must be re-enabled by hand. The pull and diff are still needed to know what those are. |
| **B. Pull Craft 14 and redesign on top of it** | Use the live theme as the base and apply these docs to Craft 14. | Keeps every existing setting and app embed in place. | Two majors behind Dawn 16. Line references in `03-theme-mapping.md` won't match. Restyling Craft's defaults adds work. Upgrading later is harder. |

The **theme pull (A-01) is still required**, to list what to carry over from Craft.

### Carry-over checklist (Craft 14 → new Dawn 16 theme)

Complete it after the pull. Each item is re-created in the Dawn theme, never copied as Craft code.

- [ ] App embeds: Klaviyo (on), Judge.me (on, but no widgets on jewelry templates), Microsoft Clarity and `config-security.com` (only if the owner keeps them, behind consent)
- [ ] Consent / cookie banner and privacy settings
- [ ] Logo, favicon and social image (if kept; see B-04)
- [ ] Contact form wiring and the contact page (`/pages/contact-us`)
- [ ] Footer policy links, plus the CCPA opt-out page (`/pages/ccpa-opt-out`)
- [ ] Localization (country selector, CAD)
- [ ] Any custom Liquid, scripts or tracking found in Craft's `layout/theme.liquid`, `snippets/` or `settings_data.json`, each either recreated or dropped with a reason
- [ ] Legacy-only items not carried over: the Spline viewer, homepage pipe sections, Judge.me homepage carousel

---

## 6 · Still to audit (needs access)

### Live theme (A-01)
- [ ] `shopify theme pull --store parkdale-brass.myshopify.com --theme <live-id>` into a separate folder; diff against stock Craft 14.0.0
- [ ] Custom code, app embeds (`settings_data.json` blocks with `shopify://apps/`), app blocks in templates
- [ ] Logo, favicon, fonts and colours in use; the Spline and Judge.me integrations

### Admin (A-02)
- [ ] Products CSV (including drafts and unlisted), metafield definitions, menus, URL redirects, the `/pages/sitemap` page
- [ ] Markets, shipping zones, apps list (identify `config-security.com`), pixels and Customer Events, consent banner
- [ ] Sales channels per product (Online Store, Shop, Google, Meta, Etsy?)
- [ ] Policies: current text copied for backup
- [ ] **Customer account mode** (legacy or new). Dawn 16 removed the legacy account templates, so legacy stores must upgrade before launch (E-13).

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
| Live theme is Craft 14, the build is Dawn 16 (D-24). Custom code and app embeds would be lost if the Dawn build is published without carrying them over. | **High** | Theme pull (A-01); carry-over checklist in §5 completed before launch |
| Judge.me pipe reviews could appear on jewelry pages through app embeds or blocks | **High** | Remove the Judge.me blocks and embeds from jewelry templates; QA §2 |
| Health claims in legacy cannabis articles, and two contradictory hypoallergenic claims in jewelry articles | **High** | Fix the two jewelry articles (E-07); review or retire the flagged legacy articles (url-inventory) |
| 30 overlapping jewelry articles cannibalise each other and have weak title tags | Medium | Consolidate by cluster after the Search Console data; 301 within each cluster only |
| 101 legacy articles and 5 legacy products stay indexed and in site search | Medium | Owner decision per URL (keep as unlinked archive or retire); never redirect to jewelry |
| Empty published collections (6) and duplicate promo pages (2) | Low | Unpublish candidates (E-08 scope) |
| No homepage `og:image`; pipe-focused meta description | Low | Set at launch (E-11) |
| Store data (menus, collections, metafields) is shared between the live and dev themes | High | Additive changes only, each approved (`owner-inputs.md` E) |
| Consent basis for emailing legacy subscribers about jewelry is unknown | Medium | Owner input D-04 before any campaign |

# Phase 0 audit

**Status (2026-11-27): repository, public storefront, live theme files and Shopify Admin data audited.** The Admin audit is partial: the full apps list, the consent banner and the Customer events pixel code need the owner's Admin screens (`owner-inputs.md` A-02). **Analytics isn't audited yet** (A-03).

| Area | Status | Source |
| --- | --- | --- |
| Repository | **Audited** | This repo, commit `258f00f` |
| Public storefront | **Audited** (read-only, 2026-11-25) | parkdalebrass.com: homepage, `/products.json`, `/collections.json`, sitemaps, robots.txt, blog, contact, legacy product pages, all 30 jewelry articles |
| Live theme files and settings | **Audited** (read-only, 2026-11-26) | Craft 14.0.0 `168071168322`, pulled with the CLI into `../craft-reference` (outside the repo) and compared with stock Dawn 14. Full report: [`craft-audit.md`](craft-audit.md) |
| Shopify Admin data | **Audited, partly** (read-only, 2026-11-27) | Admin GraphQL API through the Shopify connector, no mutations. Exports: [`backup/2026-11-27/`](backup/2026-11-27/). Summary and gaps: §6 "Admin export 2026-11-27" |
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
7. **Health-claim inconsistency in the jewelry articles.** Most correctly say brass is *not* hypoallergenic and advise nickel-free options. But `is-brass-good-for-jewelry` said brass "is generally hypoallergenic for most people". **Corrected 2026-11-27** (E-07). *Correction to this audit:* the "It's also generally hypoallergenic" sentence in `does-brass-jewelry-tarnish` is about stainless steel, not brass, so it needed no change.
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
- `/pages/sitemap` is linked from the footer but isn't in the sitemap. Check it in Admin. *Answered 2026-11-27 (§6): the page is unpublished, and a legacy redirect sends `/pages/sitemap` to `/`.*
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
Exported 2026-11-27 through the Shopify connector's Admin GraphQL API. The export was read-only (no mutations) and queried no customer, order, staff or author data. It is partial: the open items below need the owner's Admin screens.

- [x] Products CSV (including drafts and unlisted), metafield definitions, menus, URL redirects, the `/pages/sitemap` page
- [x] Markets, shipping zones and published languages
- [x] Template-suffix assignments for products, collections, pages and articles
- [ ] **Apps list, partly done.** The API lists 12 apps and 5 channels. It omits Sezzle, Concierge, EZ Preorder, Ordersify and UpPromote, all of which load on the storefront, and it can't confirm Instant or Bloggle either way. The owner's Admin → Settings → Apps screen is the source of truth.
- [ ] **Pixels and Customer Events, partly done.** The app and custom pixels come from the storefront's pixel config, captured on 2026-11-26 (live) and 2026-11-27 (preview). The API can't read the code of the "GTM" custom pixel (so its container isn't confirmed), and it denies access to script tags. The consent banner settings weren't exported (Settings → Customer privacy). `config-security.com` is Triple Whale (D-27).
- [x] Sales channels per product: Online Store, Facebook & Instagram, Inbox, Concierge Shopping Guide and Whatnot. There's no Shop, Google or Etsy channel (`etsy` is only a tag-based collection).
- [x] Policies: the current text is copied for backup, with personal data redacted
- [x] **Customer account mode:** **new** customer accounts (owner confirmed 2026-11-25), so no upgrade is needed. Originally checked because Dawn 16 removed the legacy account templates (E-13).

#### Admin export 2026-11-27

All files are in [`backup/2026-11-27/`](backup/2026-11-27/): [`catalog/`](backup/2026-11-27/catalog/), [`content/`](backup/2026-11-27/content/) and [`config/`](backup/2026-11-27/config/).

**Snapshot timing.** The content reads ran from 01:05 to 01:14 UTC. Right after them, another session on this project applied G-10, G-11 and G-12, the E-07 fix and the G-20 redirect deletion. This backup holds the state **before** those changes, and each content file lists them under `snapshot.changedAfterRead`. That session recorded the changes, with two new owner questions, G-20 (the `/pages/reviews` redirect) and G-21 (the still-published `/pages/fathers-day-24`), in `owner-inputs.md` and `docs/redesign/changes/G-10-G-12-E-07.md` on the `claude/loving-mccarthy-7dq7ak` branch. The G-rows added from this export therefore start at G-22, so the IDs stay apart when the branches merge.

**Backups now on file for section E:** E-01 (metafield definitions), E-04 (menus, as JSON rather than screenshots), E-07 (four article bodies), E-08 (products CSV), E-09 (redirects CSV), E-10 (policy text) and E-11 (current homepage title and description).

**Catalog** ([`products.csv`](backup/2026-11-27/catalog/products.csv), [`products.json`](backup/2026-11-27/catalog/products.json), [`collections.json`](backup/2026-11-27/catalog/collections.json))

| Topic | Finding |
| --- | --- |
| Products | 14 in total: 12 active, 1 draft (`organic-hemp-wicks`), 1 archived (`the-brockton`) and 0 unlisted, with 116 variants. The vendor is "Parkdale Brass" on all of them. Product types: blank 6, `pipe` 3, `Slides` 2, and `Screens`, `T Shirt` and `Wicks` 1 each (C-11). |
| Jewelry | No jewelry product exists in any status. No product or collection uses the handles `jewelry`, `bracelets`, `necklaces` or `rings`, so the E-02 handles are free. |
| Inventory policy | All 116 variants are `DENY` and inventory-tracked, so **none is `CONTINUE`** (G-01, D-26). One variant is negative: the pipe cleaners at −28, so they were oversold at some point. The Printful merch shows placeholder stock of 9,999, so its `totalInventory` isn't meaningful. |
| Craft-only suffixes | Two products: `brockton-mk2` uses `brocktonmk2` (active, sold out) and `the-bellwoods-one-hitter` uses `bellwoods` (active, in stock: 100 + 25). Both would render on the jewelry product template after launch (G-22). No collection has a suffix. |
| Channels | Products published per channel: Online Store 12, Concierge Shopping Guide 12 (since 2026-03-24), Whatnot 12 (since 2026-09-23), Inbox 6, Facebook & Instagram 4. The Canada, US and International market catalogs hold 12 each, and there are no B2B catalogs. The draft and archived products are published nowhere (G-23). |
| Collections | 14 in total: 12 smart and 2 custom (`coming-soon` and `featured-products`, each holding Bellwoods and a Brockton). All 14 are published on the Online Store and the four other channels. Six are empty: `cleaning`, `grinders`, `vaporizers`, `lighters-and-matches`, `trays` and `containers`. `accessories` holds only the draft wicks, so it's empty on the storefront. `shop` is the rule "inventory > 0", not a tag. |
| Redirect | `/products/the-brockton` (the archived product) has a 301 to `/products/brockton-mk2`. |

**Content** ([`pages.json`](backup/2026-11-27/content/pages.json) with [`pages/`](backup/2026-11-27/content/pages/), [`articles.json`](backup/2026-11-27/content/articles.json) with [`articles/`](backup/2026-11-27/content/articles/), [`menus.json`](backup/2026-11-27/content/menus.json), [`redirects.csv`](backup/2026-11-27/content/redirects.csv))

| Topic | Finding |
| --- | --- |
| Pages | 16 in total. Five were published at the snapshot: `contact-us`, `ccpa-opt-out`, `reviews`, `fathers-day-24` and `page-2`. `page-2` and `reviews` were unpublished right after it (G-10, G-11). `our-story`, `why-brass`, `jewelry-care` and `size-guide` don't exist, so the E-03 handles are free. |
| Page suffixes | `fathers-day-24` **and** `page-2` both use `instant-LeMnKzmAHEXo1htp`. Their bodies are empty because the content lives in the Instant-generated template in the Craft theme. `reviews` uses `judgeme_all_reviews`, which has no template in Craft or in this repo, and its body is empty. `contact-us` uses `contact`, which this repo has. Four unpublished legacy pages use `large`, `sitemap`, `storify` and `sca-affiliate-empty`, none of which has a template. No page uses `reviews`. |
| `/pages/sitemap` | The page exists, unpublished, with suffix `sitemap` and an empty body. The legacy redirect `/pages/sitemap` → `/` is active, so the live footer's "Sitemap" link lands on the homepage (G-14). |
| Blog | One blog, `news`, with 133 articles, all published at the snapshot: 30 jewelry articles (published 18–25 Apr 2025, all untagged) and 103 legacy. No existing tag separates the two groups. The two articles `url-inventory.csv` calls "brand" are legacy smokeware copy (G-18). `the-parkdale-brass-story` is the pipe origin story, with unverified "Medical-Grade Brass" and "non-toxic" claims. `the-bright-history-of-brass` ends with a line about cannabis holiday gifts. |
| Article suffixes | `fathers-day-24` uses `instant-1DKpbqr14n7lJI3A` and has an empty body (it was hidden right after the snapshot, G-12). `brass-jewelry`, `does-brass-tarnish` and `does-brass-turn-green` use `article`, which has no template anywhere, so they already render on the default template. This is harmless. |
| Jewelry → legacy links | The export run reported two: `brass-jewelry` links `/blogs/news/is-brass-safe-to-smoke-out-of` as a raw Markdown link, and `what-is-brass-jewelry-metal` links `the-bright-history-of-brass` (E-07). Those two bodies aren't in the backup. |
| Menus | Five menus. `main-menu` has 9 items over 3 levels: Home; Shop (links to `brockton-mk2`) → Pipes (Brockton MK2, Bellwoods), Apparel, All; Blog; Contact. `footer` has Sitemap, the CCPA opt-out and "Created By Parkdale Digital". There's also a legacy `sitemap` menu (26 items), an empty `minimal` menu and `customer-account-main-menu`. None of the E-04 menus exists yet. |
| Redirects | 22 at the snapshot, 21 after G-20. Four send old Brockton URLs to `brockton-mk2` or its special edition. `/blogs/news/blog-post` goes to `/blogs/news/fathers-day-24`, which is now hidden, so that redirect ends on a 404. The other 17 went to `/` (16 after G-20): five paths of three retired products (cigar spills and two grinders), two stocklist paths and ten page handles. Shopify only applies a redirect while the old path itself returns 404. |

**Configuration** (files in [`config/`](backup/2026-11-27/config/))

| Topic | Finding |
| --- | --- |
| Metafield definitions ([`metafield-definitions.json`](backup/2026-11-27/config/metafield-definitions.json)) | 16 definitions: 14 product and 2 variant, none for collections, pages, articles, blogs or the shop. They are three Search & Discovery recommendation fields (2 values each), the Search & Discovery search boost (0 values), `reviews.rating` and `reviews.rating_count` (legacy pipe-review aggregates on `brockton-mk2` and the pipe cleaners; the theme must never read them, D-13) and 10 `whatnot.*` (0 values). **No `custom.*` definition or value exists**, so all nine `04` §2 keys and `custom.category_line` are free (E-01). Legacy metafields without a definition remain: `judgeme.*` on 12 products, `mc-facebook.*`, `pdp_sections.*`, `stamped.*`, `yoast_seo.indexable`, `seo.hidden` and `global.description_tag`. |
| Markets ([`markets.json`](backup/2026-11-27/config/markets.json)) | Three active region markets: Canada, US and International (177 countries), so 179 countries in all. Every market sells in CAD with local currencies off, and none has its own domain or subfolder. Prices exclude tax, and shipping is taxed. The shop's ships-to list has 237 country codes, and 58 of them (mostly in Africa) are in no market (D-01). |
| Languages ([`locales.json`](backup/2026-11-27/config/locales.json)) | English only, primary and published. A language selector would have nothing to list (`enable_language_selector: false`). |
| Shipping ([`shipping.json`](backup/2026-11-27/config/shipping.json)) | Six delivery profiles. The **General profile** (the default for new products) ships only to Canada and to the 48 contiguous US states plus DC, at a 15.00 CAD flat rate, free from 129.00 CAD. "Ships Outside North America" adds AU & NZ at 50.00 CAD and the rest of the US, and its Rest of World zone has no rates. Four Printful profiles price the merch in USD. Locations: Homebase (Toronto) and Printful (D-01). |
| Money format | Both formats are `<span class=money>${{amount}}</span>`. Neither contains "CAD", so the theme's `money_with_currency` shows "$69.00", not D-37's "$69.00 CAD" (G-24). |
| Homepage SEO ([`homepage-seo.json`](backup/2026-11-27/config/homepage-seo.json)) | The meta description (`shop.description`) is the legacy pipe copy. The API has no separate homepage-title field. The live `<title>` is "Parkdale Brass" and there's no `og:image` (E-11). |
| Policies ([`policies/`](backup/2026-11-27/config/policies/)) | Privacy, refund, shipping and terms, last edited in 2019 and written for the legacy store (Canada Post or FedEx, 1–3 business days, 30-day returns). None of it is a verified fact for jewelry (E-10, D-05). A name, a personal mailbox and a street address are redacted in the backup. |
| Publications ([`publications.json`](backup/2026-11-27/config/publications.json)) | `publications` returns four: Online Store, Facebook & Instagram, Inbox and Whatnot. The Concierge publication (`Publication/298917691714`) is missing from that list but appears on every product (`products.json`). The Agentic channel is installed but has no publication. |
| Themes ([`themes.json`](backup/2026-11-27/config/themes.json)) | 18 of Shopify's 20-theme limit: the live Craft 14.0.0 (`168071168322`), a Luxe trial (DEMO) and 16 unpublished, including Archive (`196453663042`) and "NEVER DELETE - Theme for Bloggle app" (`141930692930`). With only two slots free, previews keep updating `196453663042` rather than creating new themes. |
| Apps ([`apps-and-pixels.json`](backup/2026-11-27/config/apps-and-pixels.json)) | Listed as installed: Judge.me, ShipStation, Printful, Shopify Messaging, Yoast SEO, Search & Discovery, Theme Access, Klaviyo, Flow, Triple Whale, Shopify ChatGPT MCP App and the Shopify Claude Connector. Channels: Online Store, Facebook & Instagram, Inbox, Agentic and Whatnot. Sezzle, Concierge, EZ Preorder, Ordersify and UpPromote are missing from the list but load on the storefront. Instant and Bloggle return no installation and showed nothing active, but the list is incomplete, so that doesn't prove they're gone (G-13). Microsoft Clarity is theme code, not an app (G-03). |
| Pixels and scripts | App pixels that run on every theme, including the preview: UpPromote, Judge.me (analytics) and **Triple Whale** (analytics and marketing, although D-27 dropped Triple Whale; G-02). There's also a Customer events custom pixel named "GTM" (LAX sandbox; analytics, marketing and sale-of-data purposes). Script tags on live and preview: Ordersify, Printful's product customizer and UpPromote. `greenaffiliates.com` was on live (2026-11-26) but not on the preview (G-17). |

**Corrections to [`craft-audit.md`](craft-audit.md):** `page.reviews.json` serves no page. The `/pages/reviews` body is empty: the `jdgm-all-reviews-page` string it cited comes from the site-wide Judge.me loader, which is also on `/pages/contact-us`. The Instant page template serves both `fathers-day-24` and `page-2`, not only `page-2`.

**Not exported:** a complete apps list, script tags (access denied), the GTM pixel code, the consent banner settings, product descriptions, media, SEO fields and metafield values, per-location inventory, the bodies of the other 128 articles, and article author names (staff names, left out on purpose). The founder's name is redacted in `the-parkdale-brass-story.html`. During the configuration export, `curl` requests to parkdalebrass.com started getting a bot-verification page (HTTP 403), so later read-only storefront checks may need another route.

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
| Pages, products or articles assigned a Craft-only template suffix fall back to the new default templates at launch | Medium | Assignments listed 2026-11-27 (§6): the products `brockton-mk2` and `the-bellwoods-one-hitter` (G-22); the pages and article are G-10 to G-12 and G-21. Unpublish or accept each URL before launch (E-08) |
| Judge.me pipe reviews could appear on jewelry pages through app embeds or blocks | **High** | Remove the Judge.me blocks and embeds from jewelry templates; QA §2 |
| Health claims in legacy cannabis articles, and two contradictory hypoallergenic claims in jewelry articles | **High** | Fix the two jewelry articles (E-07); review or retire the flagged legacy articles (url-inventory) |
| 30 overlapping jewelry articles cannibalise each other and have weak title tags | Medium | Consolidate by cluster after the Search Console data; 301 within each cluster only |
| 101 legacy articles and 5 legacy products stay indexed and in site search | Medium | Owner decision per URL (keep as unlinked archive or retire); never redirect to jewelry |
| Empty published collections (6) and duplicate promo pages (2) | Low | Unpublish candidates (E-08 scope) |
| No homepage `og:image`; pipe-focused meta description | Low | Set at launch (E-11) |
| Store data (menus, collections, metafields) is shared between the live and dev themes | High | Additive changes only, each approved (`owner-inputs.md` E) |
| Consent basis for emailing legacy subscribers about jewelry is unknown | Medium | Owner input D-04 before any campaign |
| Store-level pixels and scripts run on every theme, including the new one: Triple Whale (dropped by D-27), UpPromote, Judge.me, the "GTM" custom pixel, Ordersify | Medium | The theme can't switch them off. The owner removes or keeps each one in Admin (G-17, G-02) |
| Markets list 179 countries in CAD, but merchant shipping reaches only Canada, the US, Australia and New Zealand | Medium | Owner chooses the jewelry markets (D-01); the agent then aligns markets and delivery zones before launch |
| Legacy products are also published on Whatnot, Concierge, Inbox and Facebook & Instagram | Medium | Retiring a product (E-08) covers every channel it's on (G-23) |
| The store money format has no "CAD" and carries a legacy `<span class=money>` wrapper | Low | Change the formats at launch (G-24); Phase 4 QA checks prices against D-37 |

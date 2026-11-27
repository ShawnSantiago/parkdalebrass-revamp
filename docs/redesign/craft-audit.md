# Craft live-theme audit (2026-11-26)

The carry-over audit for D-24: what the live **Craft 14.0.0** theme (`168071168322`) does, and what the new Dawn 16 theme should and shouldn't re-create. It closes the "Live theme (A-01)" items in [`audit.md`](audit.md) §6. Owner questions it raises are in [`owner-inputs.md`](owner-inputs.md) section G.

**Method:** every changed, added and removed file was read by one analyst per area (app embeds, code, layout, templates, settings, locales). A second reviewer tried to refute each finding against the files, and the risky items were then checked on the public storefront. Findings marked **Confirmed live** were seen on parkdalebrass.com on 2026-11-26. Everything else is from theme files only.

We compared the live theme (Craft 14.0.0, pulled read-only with `theme pull` into `../craft-reference`, outside this repo) against stock Dawn 14 at `27d2d84`, and against Dawn's release commit `3f4284a` ("Release/14.0.0 duplicate"). Craft's code is Dawn release-branch code at about `3f4284a` with Craft preset defaults. Nine of the 12 changed JS, CSS and Liquid files are byte-identical to `3f4284a`. The remaining diffs come from upstream, from release-build artifacts or from a Shopify platform rewrite.

There is exactly one merchant code edit: a hard-coded Microsoft Clarity tag in `layout/theme.liquid:286-292`, with no consent gate. All other customization is configuration:
- 9 app embeds (8 enabled) and app blocks in templates
- merchant custom-liquid: the Spline viewer and a "Get Notified" button
- legacy pipe templates
- two Instant page-builder pages

Headline risks:
- **Pipe reviews are live publicly:** the Judge.me homepage carousel and the review widget on the Brockton MK2 page.
- **Three apps the plan doesn't know about:** Sezzle, Yoast, and the Concierge chat, which was installed no earlier than 2026-03-24.
- **An Instant page serves unsourced "Verified 5-star reviews":** it also carries hidden AG1 celebrity endorsements and prices.
- **Expired promise, confirmed live:** "Pre-order / Shipping in summer 2024" on the Bellwoods product, which is still purchasable.
- **Broken variant choice, confirmed live:** the variant picker is disabled on the default product template, so t-shirt buyers can't choose a colour or size.

The three confirmed-live items are on the **live Craft theme**, which agents never push to, so the owner fixes them in the live theme editor (`owner-inputs.md` G-08 and G-09).

Paths below are relative to the Craft theme root unless prefixed `repo:`.

## App embeds and app blocks

| App | Enabled? | Where it appears | What it does | Carry-over decision | Notes |
| --- | --- | --- | --- | --- | --- |
| Judge.me Reviews | Core embed: yes (`config/settings_data.json:157-161`). Blocks: mixed | Featured carousel ON on the homepage (`templates/index.json:410-425`, in order at :702). review_widget ON in `product.brocktonmk2.json:234-248`. Block OFF in `product.bellwoods.json:346`. Section OFF in `product.json:177` | Core loads the widget runtime site-wide. Blocks render the pipe reviews | **Carry over** the core embed only (D-24). **Don't carry** any block (D-13) | Enable the core embed only after a Judge.me admin check: floating tab, auto badges and stars, and the all-reviews widget all off. `/pages/reviews` holds an all-reviews widget (see templates), so unpublish it first. Keeping the core embed off until genuine reviews exist would supersede D-24 and needs a decision entry. QA: no `judge-me-reviews` block in `repo: templates/*.json`, and no `jdgm` markup on a product page or the homepage. |
| Klaviyo | Yes (`config/settings_data.json:167-171`) | Site-wide. Also the form `klaviyo-form-ThCgGF` in `sections/instant-LeMnKzmAHEXo1htp.liquid:268-269` | Onsite forms, popups and tracking | **Carry over** (D-24) | Enable it in the new theme's editor, then merge the key into settings_data. Check Klaviyo popups for pipe copy and discounts. Consent wording is still owner-inputs D-03. Pick one source of record (pb-newsletter or a Klaviyo form). |
| EZ Preorder | Yes (`config/settings_data.json:162-166`) | Site-wide | Pre-order buttons; rules are set in the app | **Don't carry** (D-26) | Check the products CSV (A-02) for variants set to `continue`. Don't change them without logging. |
| Triple Whale | Yes (`config/settings_data.json:201-205`) | Site-wide | Attribution pixel. D-27 records that it loads the `config-security.com` scripts | **Don't carry** (D-27) | That link to `config-security.com` comes from vendor knowledge; no theme file names the host.  |
| Sezzle | Yes: widget-embed (`config/settings_data.json:172-180`), checkout-embed (:181-195, `"Checkout with %%logo%%"` :186), PDP widget-block (`templates/product.json:23-30`, 3rd in block_order after price) | Site-wide, plus the default product page | Instalment messaging and a "Checkout with Sezzle" button | **Owner decision** | It isn't in any redesign doc. The default product page may show the instalment line twice. The 03 §5 product block order (lines 461-480) has no instalment row and sets `show_dynamic_checkout: false`. Leave everything off until a D-entry, a spec placement and real prices exist. |
| Yoast SEO (metatags) | Yes (`config/settings_data.json:196-200`) | `<head>`, site-wide | App-served meta and schema. The exact output can't be read from the theme | **Owner decision** | It may duplicate the theme's OG and Twitter tags (`snippets/meta-tags.liquid` is identical in Craft, Dawn and the repo) and its JSON-LD: `repo: sections/header.liquid:461` (Organization) and :486 (WebSite), `main-product.liquid:749`, `main-article.liquid:291`, `featured-product.liquid:501`. Check view-source on the live site, including any aggregateRating. |
| Concierge Shopping Guide | Yes (`config/settings_data.json:206-218`) | Bottom-right launcher on every page | Chat or AI shopping assistant ("Parkdale Concierge") | **Owner decision** | Its extension ID is a UUIDv7 dated 2026-03-24, so it was installed no earlier than that. It may answer with unverified facts, it processes visitor chat text, and its colour `#2563eb` is off-palette. The copy "Lets Talk!" has a typo. The spec has no chat launcher (D-21). |
| Shopify Inbox | No (`config/settings_data.json:145-147`) | n/a | Chat button (gold `#d8c173`) | **Don't carry** | Already off live. If chat is ever wanted, use one widget (Inbox or Concierge), not both. |
| Instant (instant.so) | No embed; generated files | `sections/instant-*.liquid`, `assets/instant-*.css`, `templates/page.instant-LeMnKzmAHEXo1htp.json`, `templates/article.instant-1DKpbqr14n7lJI3A.json` | Static page builds (v2.3.2 page, v2.3.5 blog post) | **Don't carry** | The header comment says the files "can be overwritten at any moment". Ask whether the app is still installed (A-02). |
| Bloggle | No code anywhere (`grep -rqai bloggle` exits 1) | n/a | n/a | **Don't carry** (nothing in the theme) | Admin check only (A-02). Leave theme `141930692930` untouched. |
| Microsoft Clarity | Not an app embed | Hard-coded in `layout/theme.liquid:286-292` | Session replay and heatmaps | **Owner decision** (see Custom code) | The earlier public-site audit listed it as an app; it is not one. Turning off an embed won't remove it. |

## Custom code

| File | Customization (or 'upstream only') | Carry over? | Notes |
| --- | --- | --- | --- |
| `layout/theme.liquid:286-292` | **Merchant customization (high).** Clarity snippet `t.src="https://www.clarity.ms/tag/"+i;` … `"clarity", "script", "lhbpbzpyom"` placed before `</head>`, with `</script>` at column 0 | Owner decision; never copy the snippet | It is in no Dawn commit, and no file in the theme uses a consent API (`customerPrivacy`, `analytics.subscribe`). If the owner keeps it, use a `PB:`-marked snippet that loads only after `Shopify.customerPrivacy` analytics consent, or Clarity's app (a new app, needs approval). Don't use a Customer Events pixel: its sandbox breaks replay and heatmaps. |
| `layout/theme.liquid:31` (baseline loads `bulk-add.js`; Craft doesn't) | Upstream only (high) | No | `bulk-add.js` was added by Dawn `85b75b0` (#3395) after the `3f4284a` release cut. |
| `assets/global.js:1105-1107`, `assets/localization-form.js:142,154`, `assets/quick-order-list.js:4,72,445`, `sections/featured-collection.liquid:22`, `sections/main-collection-product-grid.liquid:20`, `sections/quick-order-list.liquid:5`, `sections/main-product.liquid:563,565`, `snippets/quick-order-list-row.liquid:287,300`, `snippets/quick-order-list.liquid:126` | Upstream only (high). Byte-identical to `3f4284a`; each hunk reverses #3451, #3443, #3449 or #3395 | No | Dawn 16 already has every fix: `repo: assets/localization-form.js:141` normalizeString, `repo: assets/global.js:1245` BulkAdd, `repo: assets/product-info.js:441` originalSection. The quick-order code is inert live (no template uses bulk quick add). |
| `assets/quick-order-list.css:478-484` (duplicated `.desktop-row-error td` rule) | Upstream or release artifact (medium-high) | No | Shopify added the identical duplicate to Dawn main in `c661a79`. It has no effect. |
| `snippets/product-variant-options.liquid:82,122-145` | Shopify platform rewrite ("This file has been rewritten to preserve the original behavior.") | No | Keep Dawn 16's `escaped_value` (`repo: …:62,74,88,105`) in both the swatch and the button branch for any `PB:` Finish-picker edit. |
| `sections/header.liquid:574-575,585-586` (country and language selector defaults `false`) | Upstream or Craft release default (medium; an agency edit can't be ruled out) | No | No runtime effect; the group JSON sets the values. |
| `config/settings_schema.json` (theme_name Craft plus 18 changed defaults, e.g. :114 `americana_n4`, :135 `quattrocento_sans_n4`, radius :271, :929; card style :505) | Upstream: Craft preset defaults | No | No settings added or removed. |
| `templates/index.json:47-58,311-321` (Spline custom-liquid); custom_css at :35, :51, :278, :293, :636 | Merchant content stored in template JSON | No | :51 `display: -175px` is invalid. `<spline-viewer-block>` (:318) is undefined and probably renders nothing. |
| `templates/product.json:49-53`, `product.brocktonmk2.json:41-45`, `product.bellwoods.json:60-64` (disabled) | Merchant customization: a "Get Notified" custom_liquid that only scrolls to the newsletter | No | It promises a back-in-stock alert that doesn't exist. |
| `sections/instant-*.liquid`, `assets/instant-*.css` | App artifact (Instant) | No | These are the only Craft-only files in sections/ and assets/. |
| `snippets/meta-tags.liquid`, `layout/password.liquid`, `templates/gift_card.liquid`, `sections/footer.liquid`, the snippets/ file list | Identical to the baseline | n/a | No app-injected snippets. |

## Scripts and external hosts

| Host | Loaded by | Where | Consent-gated? | Carry over? |
| --- | --- | --- | --- | --- |
| `www.clarity.ms` | Hard-coded tag | `layout/theme.liquid:289`, every page | No | Owner decision |
| `config-security.com` | Triple Whale embed (per D-27; not in any theme file) | Site-wide | Unknown (inside the app) | No (D-27) |
| `unpkg.com` (`@splinetool/viewer@1.0.17`, no SRI) | Custom-liquid | `templates/index.json:54` (homepage) | No | No |
| `prod.spline.design` | Spline scenes | `templates/index.json:54,318` | No | No |
| `fonts.googleapis.com` / `fonts.gstatic.com` | Instant sections | `sections/instant-*.liquid:4` | No | No (D-15) |
| `cdn.jsdelivr.net` (`swiper@11.0.3`, no SRI) | Instant sections | `instant-LeMnKzmAHEXo1htp.liquid:845`, `instant-1DKpbqr14n7lJI3A.liquid:254` | No | No |
| `static-api.instant.so` | Badge fetch that may append HTML to `<body>` | `instant-LeMnKzmAHEXo1htp.liquid:843`, `instant-1DKpbqr14n7lJI3A.liquid:252` | No | No |
| `cdn.instant.so` | 202 image refs (count with `grep -a`) | Instant sections | No | No |
| App-extension hosts (Judge.me, Klaviyo, Sezzle, Yoast, Concierge, EZ Preorder) | `content_for_header` app embeds | Site-wide | Unknown (inside each app) | Per the app table |
| `fonts.shopifycdn.com`, `cdn.shopify.com`, `youtube.com` / `player.vimeo.com` (click-to-load) | Stock Dawn | `layout/theme.liquid:15`, `sections/main-product.liquid:55`, `sections/video.liquid:90` | n/a (stock) | Dawn 16 provides its own |

The legacy video sections (`product.bellwoods.json:280`, `product.brocktonmk2.json:226`) keep Dawn's demo URL `_9VUPq3SxOc`, but they play the Shopify-hosted file first. The other host strings in the theme (schema.org, w3.org, comment links, theme_info help links) load nothing.

## Templates and legacy content

- **`templates/index.json`:** all 20 sections (order at :689-710) are pipe or cannabis content. Hero "The Brass Standard in Cannabis Luxury." (:18), Bellwoods and Brockton sections, two Spline sections, the Judge.me carousel (:414). The enabled "Story" section (:617) holds the only origin facts in the theme: 2019, Parkdale Toronto and the founder's name. It doesn't verify `04` §1. Don't carry any of it. The photo Files `2019-23-53-20.jpg` and `DSC01485.jpg` (:575-576) may be generic, so the owner can review them for reuse.
- **`templates/product.json` (default):**
  - `variant_picker` is `"disabled": true` (:32-33). Published merch with sizes probably uses this template (t-shirts at 17.50-30.50, [`audit.md` §3](audit.md)), so shoppers can't pick a size on the live theme today. **Confirmed live on 2026-11-26:** `/products/short-sleeve-unisex-t-shirt-4` has 48 variants (Color × Size) and its page renders no variant picker.
  - Also: the Sezzle block, Get Notified, dynamic checkout on (:45), "Pairs well with" (:62), a disabled Brockton multirow (:149), a newsletter promising "product restocks" with no consent wording (:199), and the Judge.me section (disabled, :177).
  - Don't carry; build from `03` §5.
- **`templates/product.bellwoods.json`:** "Pre-order" (:18) and "Shipping in summer 2024" (:57). `the-bellwoods-one-hitter` is published and available ([`audit.md` §3](audit.md)), so an expired ship-date promise is live. **Confirmed live on 2026-11-26:** the product page shows "Pre-order" and "Shipping in summer 2024". The no-preorders rule is D-26; the no-shipping-claims rule is AGENTS.md "Never invent facts". The rest is pipe content (90mm, cigarette box, matches). Retire it.
- **`templates/product.brocktonmk2.json`:** the Judge.me review_widget is enabled (:238), plus Get Notified (:44) and dynamic checkout (:37). brockton-mk2 and its special edition are **published and sold out** ([`audit.md` §3](audit.md)), so all of this is publicly live. Retire it.
- **Suffix fallback:** any product, page or article assigned a Craft-only suffix (`bellwoods`, `brocktonmk2`, `reviews`, `instant-*`) will render the new **default** template after launch. Pipe products would then appear on the jewelry product template unless unpublished first (E-08, CSV export).
- **`templates/page.reviews.json`:** byte-identical to `page.json`. It probably serves `/pages/reviews` ("Empty page; unpublish candidate", `url-inventory.csv:33`). **Confirmed live on 2026-11-26:** the page body holds a Judge.me all-reviews widget (`jdgm-all-reviews-page`), so it would show pipe reviews in the new theme as soon as `judgeme_core` is on.
- **`templates/page.instant-LeMnKzmAHEXo1htp.json`:** this is probably `/pages/page-2`, which is published ([`audit.md` §3](audit.md)); medium confidence. It is a Father's Day Bellwoods promo whose content lives in theme code, and it would render near-blank under the new theme.
  - **Visible:** "Verified 5-star reviews*" (:134, :651); named pipe testimonials (:148-156, :671, :683, :695); unverified claims (:542 "safe and exceptional", :552 "Design Iterations", :558 "Product test conducted").
  - **Hidden with `display:none` but still in the served HTML:** AG1 filler with prices (:334 `$107`, :437 `You save $47`) and celebrity "AG1 PARTNER" endorsements (:591, :600, :609).
  - Never reuse any of it. Unpublishing now is recommended. **Confirmed live on 2026-11-26:** `/pages/page-2` serves "Verified 5-star reviews" (2×) and "AG1 PARTNER" (3×) in its HTML.
- **`templates/article.instant-1DKpbqr14n7lJI3A.json`:** "Stylish Gift Ideas for Father's Day" (section :10). It links `/blogs/news/indulge-in-cannabis-vodka-this-summer` (:163) and contains filler such as "Shop Beard oil" (:116). It is probably `/blogs/news/fathers-day-24` (`url-inventory.csv:137`, medium confidence). Treat it as a 404 candidate and never redirect it to jewelry (D-16).
- **`templates/customers/*.json` (7 files):** unused under new customer accounts and not needed in Dawn 16. `login.json:17` `"enable_shop_login_button": false` is a deliberate change (the schema default is true), so it belongs in E-13.
- **Lineage:** live colour-scheme IDs are `background-1`…`accent-2` (`config/settings_data.json:220-275`), against `scheme-1..5` in the repo. This is configuration carried forward by theme upgrades. Never paste Craft template JSON into the repo.
- **Metafields:** no Craft JSON template references a metafield. Pipe dimensions are hard-coded in multicolumn blocks, so don't migrate them to `custom.dimensions`. Export the existing definitions before E-01.
- **Standard templates** (404, article, blog, cart, collection, list-collections, page, contact, password, search) differ only in settings values. The Craft cart already has no `featured-collection('all')`.

## Settings worth carrying over

- **Social URLs:** none exist. All nine `social_*_link` are `""` (`config/settings_data.json:112-120`), `show_social: false` (`sections/footer-group.json:67`), and no profile URL appears anywhere in the theme. Nothing to copy; `04` §4 "Verified social URLs" stays open. Ask whether Admin → Settings → Brand holds them.
- **Favicon:** none set (no `favicon` key in `current`, guard at `layout/theme.liquid:10`). Nothing to copy; a new one comes from the final logo files.
- **Logo:** `"logo": "shopify://shop_images/g3727_140x_2x_1.png"`, `"logo_width": 130` (`config/settings_data.json:12-13`). Copy it only if the owner keeps it (B-04), after a review for pipe motifs. The same `shopify://shop_images/` reference works in the new theme because the file is a store File. The live Organization JSON-LD uses it (`sections/header.liquid:429`).
- **Already matching in the repo:** `predictive_search_enabled: true`, `predictive_search_show_price: true` and `currency_code_enabled: true` (`config/settings_data.json:121-124`; `repo: config/settings_data.json:171-174`); footer `payment_enable: true` and `show_policy: true` (`sections/footer-group.json:66-71`; `repo: sections/footer-group.json:50-51`).
- **Localization:** both selectors are off in the live header and footer (`sections/header-group.json:24-25`, `sections/footer-group.json:68-69`). The public-site audit's "footer country selector" was wrong: on `/pages/contact-us` the footer has no localization form or signup, and the country markup sits in the header. The homepage signup is an `index.json` newsletter section. Don't carry the off state. The spec puts a Country/region select in the footer (`02-design-spec.md:154`, `03` §7). Set `repo: sections/footer-group.json:49` `enable_language_selector` to `false`, because the spec names only the country select. What renders depends on Markets (A-02, owner-inputs D-01).
- **Footer menu:** the live footer link list uses the `footer` menu (`sections/footer-group.json:54-55`). The CCPA opt-out (`/pages/ccpa-opt-out`), Sitemap and "Created By Parkdale Digital" links are probably items in that menu; none of them is in a theme file. Carry the CCPA link into `footer-help` by amending E-04 and `04` §3.
- **Shop sign-in:** off live (`templates/customers/login.json:17`). Under new customer accounts this is set in Admin, not the theme.
- **Not carried, on purpose:**
  - colour schemes: black/white with six `shop.brand.colors.primary[0].background` refs at :226, :228, :236, :250, :258, :267
  - Americana and Quattrocento Sans: Craft defaults
  - animations
  - the `notification` cart
  - the mega-menu, top-centre header
  - brand headline and description: blank in Craft (:109-111), so nothing to carry. The new "Est. 2019, Toronto." still needs B-05 approval.
- **Check:** `repo: config/settings_data.json` `type_header_font: "serif"`. Confirm in the editor that it resolves. An invalid handle falls back to `assistant_n4`.

## Locale overrides

- `locales/en.default.json` and `en.default.schema.json` have 0 keys added, removed or changed against the baseline. The only diff is Shopify's 9-line auto-generated header. So the pulled theme has no "Edit default theme content" overrides; earlier edits could have been reverted.
- 8 schema files (cs, da, de, fr, it, nb, nl, pt-BR) differ by 42 admin-only labels. These are exactly the reverse of translation-bot commit `eefc111` (2024-05-01): upstream. All 30 other storefront locales are identical to the baseline.
- File-name differences are upstream: `bg-BG`/`hr-HR`/`lt-LT`/`ro-RO`/`sk-SK`/`sl-SI.json` were renamed to `bg`/`hr`/… in `a4e898d`, and `vi.schema.json` was removed in `a55d1f7`. That is why Craft has 52 locale files and the repo has 51.
- All 343 storefront `| t` keys and every `t:` schema ref resolve, so no custom keys exist. The custom copy bypasses locales: Instant sections hard-code English, e.g. `instant-1DKpbqr14n7lJI3A.liquid:134` "…stylish smoking experience".
- **Not checkable from theme files:** store-level translations (Translate & Adapt) for any other published language. Add languages to the A-02 export.
- **Push risk:** if anyone uses "Edit default theme content" on the preview, those edits land in its `locales/*.json`. Pull and merge locales key by key before pushing. Header-only diffs are noise.

## Carry-over checklist (Craft 14 → new Dawn 16 theme)

Each item is re-created in Dawn 16, never copied as Craft code.

**App embeds (new theme)**
- [ ] Klaviyo onsite: enable it in the preview editor, then merge the `blocks` key into `repo: config/settings_data.json` key by key. Before enabling, check Klaviyo popups for pipe copy and discounts.
- [ ] Judge.me core: enable it (D-24) only after the Judge.me admin shows floating tab, badges, auto stars and the all-reviews widget all off, and `/pages/reviews` has been checked. Add no Judge.me blocks to any template (D-13).
- [ ] EZ Preorder: leave it off (D-26). Check the products CSV for `continue` inventory policy.
- [ ] Triple Whale: leave it off (D-27).
- [ ] Sezzle (×3 placements), Yoast, Concierge: leave them off until the owner decides and a D-entry exists.
- [ ] Shopify Inbox: leave it off.
- [ ] Bloggle: confirm in Admin → Apps whether it's installed and what it needs. Leave theme `141930692930` untouched.

**Tracking and consent**
- [ ] Clarity: don't copy `layout/theme.liquid:286-292`. If the owner keeps it, add a consent-gated `PB:` snippet and log it in the CHANGELOG.
- [ ] Consent banner: Craft has no consent embed, so the banner lives in Admin → Customer privacy (A-02). Confirm that it covers Klaviyo and any kept vendor.

**Templates and legacy URLs**
- [ ] Recreate none of: `index.json` pipe sections, Spline, the Judge.me carousel or widgets, Get Notified, the Sezzle block, `product.bellwoods.json`, `product.brocktonmk2.json`, `page.reviews.json`, `page.instant-*`, `article.instant-*`, `customers/*.json`.
- [ ] Find which products, pages and articles use each Craft-only suffix (A-02), and decide each URL's fate before launch (E-08 unpublish with a CSV export, or accept the default-template fallback).
- [ ] Keep `show_rating: false` and no `rating` block (`repo: templates/product.json:91`, `index.json:63`, `collection.json:21`, `search.json:11`).

**Settings and branding**
- [ ] Logo: if B-04 keeps it, set `logo: shopify://shop_images/g3727_140x_2x_1.png` and re-tune `logo_width`. Otherwise keep the D-14 wordmark.
- [ ] Favicon: none to carry. Add one from the final logo files.
- [ ] Social links: none to carry. Fill them once the owner supplies verified URLs.
- [ ] Confirm the `type_header_font: "serif"` handle resolves in the editor.

**Footer, navigation, localization**
- [ ] Footer policy links: `show_policy: true` is already set. Add the CCPA opt-out link to `footer-help` through an approved amendment to E-04 and `04` §3. Screenshot the `footer` menu first.
- [ ] Contact form and `/pages/contact-us` wiring (D-24; not covered by this audit).
- [ ] Country selector: keep footer `enable_country_selector: true` per spec and set `enable_language_selector: false` (`repo: sections/footer-group.json:49`). Confirm Markets (D-01).
- [ ] Shop sign-in preference: set in Admin under new customer accounts (E-13).

**SEO and structured data**
- [ ] `PB:` edit to `repo: sections/header.liquid:461-482`: drop empty `sameAs` entries (nine `""` are live on the preview now), and add the logo once B-04 is decided.
- [ ] Don't add a second Organization JSON-LD in `layout/theme.liquid` as `03` §10 (line 565) plans; it would duplicate `header.liquid:461`.
- [ ] Before any Yoast decision, compare live and preview `<head>`: count `og:` and `twitter:` tags, `ld+json` blocks and any `aggregateRating`.

**Preview refresh**
- [ ] `repo: templates/index.json:42-50` is still stock `featured-collection` with `"collection": "all"`. A preview push before the Phase 2 homepage shows legacy pipe products. Point it at `jewelry` or remove it first (D-08).
- [ ] App-embed state is per theme. Pull the preview's `settings_data.json` and merge before pushing, so embeds toggled in the editor aren't reset.
- [ ] Pull and merge `locales/*.json` before pushing if anyone used "Edit default theme content".

## Owner decisions from the Craft audit

These are tracked in [`owner-inputs.md`](owner-inputs.md) section G, with a recommendation for each:

| Question | Tracked as |
| --- | --- |
| EZ Preorder, Triple Whale | G-01, G-02 (decided: D-26, D-27) |
| Microsoft Clarity, Sezzle, Yoast, Concierge, Judge.me core embed | G-03 to G-07 |
| Live-theme fixes: Bellwoods pre-order text, disabled variant picker | G-08, G-09 |
| `/pages/page-2`, `/pages/reviews`, `/blogs/news/fathers-day-24` | G-10 to G-12 |
| Instant app, footer menu links, back-in-stock alerts, Shop sign-in | G-13 to G-16 |
| Logo, origin facts | B-04, B-05 |
| Legacy pipe products at launch | E-08 |
| Markets and languages | D-01, A-02 |

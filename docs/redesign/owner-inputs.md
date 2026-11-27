# Owner inputs and sign-off tracker

The single list of everything waiting on the Parkdale Brass owner. Agents: **don't build past a `Blocking` item by guessing.** Add new questions at the bottom of the relevant section.

**Status values:** `Open` · `In progress` · `Provided` / `Approved` (with date) · `Declined` · `N/A`.
**Blocks** says the earliest phase that can't finish without the item.

---

## A · Access (needed to start)

| ID | Input | Why | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- | --- |
| A-01 | Shopify CLI / theme access (staff or collaborator account with theme permissions) | Pull the live theme, create an unpublished dev theme | Phase 0 | Provided | 2026-11-25: Theme Access verified for the Parkdale Brass store. An unpublished Archive preview was created and served. 2026-11-26: the Theme Access password is saved as a network secret on the Parkdale Brass cloud environment, and `theme list` was verified (17 themes; live = Craft 14.0.0, ID 168071168322). Usage: `AGENTS.md` → Shopify CLI. 2026-11-26: the Craft carry-over audit is done ([`craft-audit.md`](craft-audit.md)); its owner questions are section G. |
| A-02 | Read-only Admin exports: products CSV, collections, menus (screenshots), metafield definitions, redirects CSV, markets and shipping zones, installed apps list | Audit | Phase 0 | Open | 2026-11-26, from the Craft audit, also needed: whether Instant, Bloggle, Sezzle, EZ Preorder and Concierge are still installed; which products, pages and articles use the Craft-only template suffixes (`bellwoods`, `brocktonmk2`, `reviews`, `instant-*`); published languages; the consent banner settings; and the footer `footer` menu items. The theme code and locale diffs are upstream or release-cut, not customizations, so don't re-audit them ([`craft-audit.md`](craft-audit.md)). |
| A-03 | Search Console access or a 16-month export (queries, pages), plus the analytics landing-page report | URL inventory and redirect plan | Phase 0 | Open | n/a |
| A-04 | Is a development store available for fixtures? (Yes/No) | Testing the PDP and collection without touching live data | Phase 2 | Open | n/a |
| A-05 | **Admin access for store changes.** The owner has no legacy custom app, so a static Admin API token isn't possible (Shopify stopped new admin-created custom apps on 2026-01-01), and the request was declined on 2026-11-27. Options: (a) connect the **Shopify connector** at claude.ai → Customize → Connectors, signed in to Parkdale Brass, and start a new session; or (b) the owner applies each approved E-item from the agent's step list. | Menus, pages, collections, metafields, unpublishing (D-28 changes) | Phase 3 | Provided | 2026-11-27: the owner signed the **Shopify connector** in to Parkdale Brass (`get-shop-info` verified). The agent uses its Admin GraphQL tools for D-28 store changes, never its theme-publish tool. Store plan: **Pause and Build** (checkout off), see F-05. |

## B · Design and brand approvals

| ID | Decision / input | Reference | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- | --- |
| B-01 | Approve the overall visual direction (palette, type, layout) | Canvas page B, `02-design-spec.md` §1–2, D-19 | Phase 1 | Approved | 2026-11-25: Direction B "Archive" (black, gold, royal green) chosen in design review |
| B-02 | Approve the homepage section order and copy | `02` §4, `04` §1 | Phase 2 | Open | n/a |
| B-03 | Approve the collection and product page layouts | `02` §5–6 | Phase 2 | Open | n/a |
| B-04 | Logo: supply the existing logo files and decide whether to keep, refresh, or use the typeset wordmark | D-14 | Phase 1 (temporary wordmark allowed), launch | Open | 2026-11-26: the live logo is `shopify://shop_images/g3727_140x_2x_1.png` (130 px). No favicon is set. Recommend supplying the original SVG; the wordmark stays until then. |
| B-05 | Approve the brand story copy ("Rooted in Parkdale", Our Story page) | `04` §1 | Launch | Open | 2026-11-26: the only origin facts in the live theme are 2019, Parkdale, Toronto and the founder's name (homepage "Story" section). Confirm them in writing, and whether the founder is named on Our Story. |
| B-06 | Approve the tagline "Made to wear. Made to age." (only valid if the finishes really age) | `04` §1 | Launch | Open | n/a |
| B-08 | **Base theme:** build the redesign on Dawn 16 (this repo; recommended) or on the live Craft 14.0.0 theme | `audit.md` §5, D-24 | Phase 1 | Approved | 2026-11-25: option A, Dawn 16 (D-24) |
| B-07 | Approve, or adjust, the proposed decisions in `decisions.md` | `decisions.md` | Phase 1 | Approved | 2026-11-25: all current decisions approved. D-02 is re-checked after the Phase 0 audit; D-07 covers the decision only, not store change E-04. |

## C · Product truth (blocks a transactional launch)

| ID | Input | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- |
| C-01 | Final launch products: names, designs, categories (start with cuffs and pendants?). Fill in one fact sheet per product (`product-data/README.md`). | Phase 3 | Open | n/a |
| C-02 | Material composition per SKU + safety documentation/testing (alloy components, coatings, market requirements) | Phase 3 | Open | n/a |
| C-03 | Actual finishes and coatings per SKU; whether each finish patinas | Phase 3 | Open | n/a |
| C-04 | Dimensions, size ranges and tested adjustability (rings, cuffs, chains) | Phase 3 | Open | n/a |
| C-05 | Care instructions confirmed on samples, per finish | Phase 3 | Open | n/a |
| C-06 | Country of origin per SKU (if it will be disclosed) | Phase 3 | Open | n/a |
| C-07 | Prices (CAD) and any other market currencies | Phase 3 | Open | n/a |
| C-08 | Stock levels and fulfilment capacity | Phase 3 | Open | n/a |
| C-09 | Product photography: P1–P4 per product and finish, per `photography-brief.md` | Phase 3 | Open | n/a |
| C-11 | Clean up product types (most are blank) before smart collections rely on them; decide brand-merch products (tees, hat, slides, mug): keep outside the jewelry nav, or unpublish | Phase 3 | Open | Found in audit §3 |
| C-10 | Editorial imagery E1–E6, per `photography-brief.md` | Launch | Open | n/a |

## D · Policies and legal

| ID | Input | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- |
| D-01 | Shipping markets, delivery times, duties/taxes messaging | Launch | Open | n/a |
| D-02 | Returns and exchanges for jewelry, including ring resizing | Launch | Open | n/a |
| D-03 | Newsletter consent wording (CASL-compliant express consent) | Prelaunch signup going public | Open | n/a |
| D-04 | Lawful basis for emailing existing (legacy) subscribers about jewelry | Any launch email | Open | n/a |
| D-05 | Privacy policy and terms review for the new category | Launch | Open | n/a |
| D-06 | Support path and commitments for legacy orders, returns and warranties | Launch | Open | n/a |

## E · Store-level changes (each needs explicit approval before an agent does it)

| ID | Change | Reference | Backup first | Status | Approved by / date |
| --- | --- | --- | --- | --- | --- |
| E-01 | Create `custom.*` product metafield definitions | `04` §2 | Export the existing definitions list | Open | 2026-11-27: the theme reads all nine `04` §2 keys and hides empty ones. Optional extra: a collection metafield `custom.category_line` (single-line text) for collection category lines (D-37). |
| E-02 | Create collections `jewelry`, `bracelets`, `necklaces` (`rings` later) | `04` §3 | n/a (additive) | Open | n/a |
| E-03 | Create pages `our-story`, `why-brass`, `jewelry-care`, `size-guide` (after a handle-collision check) | `04` §3 | n/a (additive) | Open | n/a |
| E-04 | Create new menus (old menus untouched) | `04` §3, D-07 | Screenshot the existing menus | **Approved**, not yet applied | Project lead, 2026-11-26. Create `jewelry-main-menu`, `shop-categories`, `footer-shop`, `footer-learn` and `footer-help` exactly as in `04` §3. Leave `main-menu` and `footer` untouched. Rings links are added only once that collection has products. Needs Admin access (the Theme Access password can't create menus), so the owner creates them in Admin → Content → Menus, or provides an Admin token with navigation scope. Screenshot the existing menus first. 2026-11-27, 2.x QA (G-04): the preview showed **Rings → `/collections/rings` (a 404)** in the header Shop dropdown, the mobile menu drawer and the footer Shop column once the menus appeared. Take the Rings link out of `jewelry-main-menu`, `footer-shop` and `shop-categories` until the `rings` collection has products (D-12, D-35); add it back then. |
| E-05 | Add real jewelry products | `04` §2 | n/a (additive) | Open | n/a |
| E-06 | Set Search & Discovery filters to Availability + Price | `03` §8 | Screenshot the current filters | Open | n/a |
| E-07 | Update the jewelry blog articles (accuracy, internal links) | `04` §5 | Copy the HTML to `docs/redesign/backup/` | Open | n/a |
| E-08 | Unpublish legacy products from Online Store / Shop / Google channels | `04` §5–6 | Products CSV export | Open | n/a |
| E-09 | Create URL redirects for retired URLs (per the approved inventory) | `04` §5, D-16 | Redirects CSV export | Open | n/a |
| E-10 | Update policies (shipping, refunds, privacy, terms) | Section D | Copy the current policy text | Open | n/a |
| E-11 | Update homepage title, meta description and social image | `04` §5 | Note the current values | Open | n/a |
| E-12 | Merchant Center / ads feed changes | `01` Phase 5 | Note the account status | Open | n/a |
| E-13 | **Customer accounts:** confirm the store's account mode (Settings → Customer accounts). If it's on **legacy** accounts, upgrade to new customer accounts before launch. Dawn 16 removed the legacy account templates. | `phase-5-brief.md` §1, Dawn `release-notes.md` | Note the current mode and settings; check existing customers can still sign in | N/A, no upgrade needed | 2026-11-25: owner confirmed the store already uses **new** customer accounts. Sign-in and order history are still checked in Phase 4 QA and the launch smoke test. |
| E-14 | **Money format with currency** (Settings → General → Store currency → Change formatting): set "HTML with currency" (and "Email with currency") to show the code, for example `<span class=money>${{amount}} CAD</span>`. The theme already prints `money_with_currency` wherever the design shows "CAD" (`currency_code_enabled` is on; `snippets/price.liquid`, `pb-sticky-atc`), but the preview renders "$40.00" with no code (2.x QA COL-09, PDP-05), so the store's format lacks it. The cart drawer and `/cart` line prices use Dawn's plain `money` by design. Cross-reference C-07 (prices) and D-37 (prices use the store's money format, "$69.00 CAD"). | C-07, D-37 | Note the four current format strings (HTML and email, with and without currency) in `backup/` | Approved under D-28 (store change), not yet applied | 2026-11-27: found in 2.x QA. A theme can't fix it. Log the change and its verification per the `phase-3-brief.md` §2 protocol. |

## G · Apps, tracking and legacy content (from the Craft audit, 2026-11-26)

Details and evidence: [`craft-audit.md`](craft-audit.md). Until an item here is decided, the new theme leaves the app or code **off**. That is the default for an unpublished theme, so none of these blocks Phase 2. Items marked *D-28* are store changes the agent may make under the standing approval (backup and log first, per `phase-3-brief.md` §2). Items on the **live Craft theme** are for the owner, because agents never push to the live theme.

| ID | Question | Recommendation | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- | --- |
| G-01 | EZ Preorder app embed | Don't carry it | n/a | Decided | 2026-11-26: D-26 |
| G-02 | Triple Whale pixel (`config-security.com`) | Don't carry it | n/a | Decided | 2026-11-26: D-27 |
| G-03 | **Microsoft Clarity:** keep or drop? It's hard-coded in the live `layout/theme.liquid` with no consent gate, not an app embed. | Drop it. If kept, load it only after analytics consent through a `PB:` snippet (not a Customer Events pixel, which breaks replay), with a decision entry. | Launch | Open | n/a |
| G-04 | **Sezzle** (instalment messaging + "Checkout with Sezzle"): still a payment option for jewelry? | Leave all three placements off until there's a spec placement, a decision entry and real prices. | Launch | Open | n/a |
| G-05 | **Yoast SEO** metatags embed: keep? It may duplicate the theme's OG, Twitter and JSON-LD tags. | Compare the live and preview `<head>` first, then choose one source per tag type and turn off any review-rating schema. | Launch | Open | n/a |
| G-06 | **Concierge Shopping Guide** chat (installed no earlier than 2026-03-24): who installed it, and keep it? | Off. If kept: confirm its knowledge source and privacy terms, add a spec placement (D-21), restyle it to gold `#C2A266`, and fix its "Lets Talk!" copy. | Launch | Open | n/a |
| G-07 | **Judge.me core embed:** enable now (D-24), or keep it off until genuine jewelry reviews exist? | Off until the Judge.me admin shows the floating tab, auto badges and stars and the all-reviews widget off, and G-11 is done. Keeping it off at launch would supersede D-24 and needs a decision entry. | Launch | Open | n/a |
| G-08 | **Live theme, now:** the Bellwoods one-hitter page shows "Pre-order" and "Shipping in summer 2024" on a purchasable product (confirmed live). | Owner removes both lines in the live theme editor (Products → `bellwoods` template). | Now (live store) | Open | Agents never push to the live theme. |
| G-09 | **Live theme, now:** the default product template has its variant picker disabled, so the t-shirts (48 Color × Size variants) can't be ordered in a chosen size (confirmed live). | Owner re-enables the "Variant picker" block in the live theme editor (Products → Default product). | Now (live store) | Open | Agents never push to the live theme. |
| G-10 | Unpublish `/pages/page-2` (Instant Father's Day promo with unsourced "Verified 5-star reviews", named pipe testimonials and hidden AG1 endorsements, confirmed live) | Unpublish it. Never reuse its content. | Phase 3 | Approved (D-28), not yet applied | Needs Admin access. Copy the page HTML to `docs/redesign/backup/` first, then log it in E. |
| G-11 | Unpublish `/pages/reviews` (Judge.me all-reviews widget, confirmed live; already an unpublish candidate in `url-inventory.csv`) | Unpublish it before any Judge.me embed is on in the new theme. | Phase 3 | Approved (D-28), not yet applied | Needs Admin access. Back up the body first. |
| G-12 | Retire `/blogs/news/fathers-day-24` (Instant article that links a cannabis article) | Hide it (404) with no redirect to jewelry (D-16). | Phase 3 | Approved (D-28), not yet applied | Needs Admin access. Back up first. Hiding isn't deleting. |
| G-13 | **Instant app:** still installed? It can overwrite theme files. | Uninstall it once G-10 and G-12 are done. | Launch | Open | Uninstalling is the owner's call (D-28: tell the owner before deleting anything). |
| G-14 | Footer links from the live `footer` menu: CCPA opt-out, Sitemap, "Created By Parkdale Digital" | Add the CCPA opt-out to `footer-help` (an E-04 amendment; agent, D-28). Sitemap link and agency credit: owner's choice; recommend dropping the credit. | Launch | Open | The CCPA part is approved under D-28. |
| G-15 | Back-in-stock alerts: the live "Get Notified" button only scrolls to the newsletter. | None at launch. A real flow (e.g. Klaviyo) needs a design entry (D-21). | n/a | Open | n/a |
| G-16 | Shop sign-in button: off on live. Keep it off or turn it on? | Owner's preference. Set it in Admin under new customer accounts (E-13). | Launch | Open | n/a |
| G-17 | **Store-level scripts that load on every theme** (seen on the unpublished preview, 2026-11-27): Google Tag Manager `GTM-KX2JQ95R`, Ordersify (`cdn.ordersify.com`) and UpPromote (`uppromote.js`). They come from apps or Customer events, not theme code, so the new theme can't switch them off. | Ordersify: remove it if it provides pre-orders or back-in-stock promises (D-26, G-15). GTM: keep only if it's used and behind consent. UpPromote (affiliates): owner's call. | Launch | Open | Admin → Apps, and Settings → Customer events. Removal is the owner's call, or D-28 with notice first (uninstalling deletes app data). |
| G-18 | **Journal articles:** tag the jewelry, material and brand articles `journal` so the Journal link can show only them (D-36). Candidates: the 30 jewelry and 2 brand articles in `url-inventory.csv`. | Tag them, then set the Journal menu item (E-04) and the homepage "All articles" link to `/blogs/news/tagged/journal`. | Launch | Approved (D-28), not yet applied | Needs Admin access (A-05). Additive and reversible. |
| G-19 | **Owner overrides for the agent's Phase 2 calls** (D-30 to D-38): mobile reading rule, desktop Filter button, centred concepts, Journal tag links, product eyebrow and price format, category line rule. | Review them on the preview and say which to change. | Launch | Open | Each one stands until the owner overrides it. |

## F · Launch sign-off

| ID | Gate | Status | Signed off by / date |
| --- | --- | --- | --- |
| F-01 | QA results reviewed, known failures accepted (`05-qa-checklist.md`) | Open | n/a |
| F-02 | Launch and rollback runbook reviewed (`phase-5-brief.md`) | Open | n/a |
| F-03 | Backups taken (theme duplicate + every export in E) | Open | n/a |
| F-04 | **Authorize publishing the theme** | Open | n/a |
| F-05 | **Resume a selling plan.** The store is on Shopify's *Pause and Build* plan (2026-11-27), so checkout is off. Choosing a paid plan is a billing change, which only the owner makes (D-28 excludes billing). | Open | n/a |

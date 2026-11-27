# 04 · Content, data and SEO

Everything here is **proposed** until the owner approves it. Anything in `[brackets]` needs a verified fact before it's published.

---

## 1 · Copy deck

Voice: direct, restrained Canadian English, short sentences, material-specific. Spell it "jewelry" (and "neighbourhood", "colour"). **Banned phrases:** "elevate your style", "affordable luxury", "meticulously crafted", "timeless elegance". **Banned claims unless proven for that product:** handmade, Canadian-made, solid brass, hypoallergenic, nickel-free, lead-free, sustainable, lifetime, tarnish-proof, waterproof, skin-safe.

| Location | Copy |
| --- | --- |
| Announcement (prelaunch) | The first Parkdale Brass jewelry collection is in development. Join the launch list |
| Hero lockup line | PARKDALE BRASS |
| Hero H1 | Made to wear. Made to age. (set in caps by CSS) |
| Hero dateline | EST. 2019 · TORONTO |
| Hero text | Brass jewelry with character, inspired by industrial design and rooted in Parkdale. |
| Hero CTA | Get launch updates (prelaunch) / Shop jewelry (live) |
| Hero secondary button | Our story |
| Categories eyebrow / H2 | THE COLLECTION / Shop by category |
| Featured eyebrow | COMING SOON (prelaunch) / EVERYDAY ESSENTIALS (live) |
| Featured H2 | The first collection |
| Featured note (prelaunch) | Concepts in development. Designs, finishes and prices may change before release. |
| Material eyebrow / H2 | THE MATERIAL / A material with character. |
| Material text | Brass is an alloy of copper and zinc, prized for its warm tone and the way it takes a finish. Uncoated brass darkens and softens with wear. Coated and plated finishes behave differently. ¶ Every piece lists its actual finish and how to care for it, so you know how it will change. |
| Material CTA | Why brass? |
| Editorial H2 | Considered forms. Everyday character. |
| Editorial CTA | Be first to know (prelaunch) / Shop bracelets (live) |
| Story eyebrow / H2 | OUR STORY / Rooted in Parkdale. |
| Story text | Parkdale Brass began in 2019 in Toronto's Parkdale neighbourhood, with an appreciation for brass and the industrial design of everyday objects. ¶ Our next chapter takes that same interest in form, function and character into jewelry: warm tones, considered shapes and a style that doesn't need to shout. |
| Journal eyebrow / H2 | THE JOURNAL / Notes on brass |
| Newsletter eyebrow / H2 / text | LAUNCH LIST / The next chapter. / Get collection news and new release updates. |
| Newsletter button | Notify me (prelaunch) / Subscribe (live) |
| Newsletter consent | **[Owner/legal to supply. CASL-compliant express consent wording.]** |
| Footer brand line | Brass jewelry with character. Est. 2019, Toronto. |
| Collection eyebrow (All Jewelry) | Live categories only, e.g. CUFFS · CHAINS · PENDANTS (add RINGS when live) |
| Collection description (All Jewelry) | Each piece lists its actual finish, measurements and care. |
| Collection promo tile | NEW TO BRASS? / How brass wears, and how to care for it. / Why brass? |
| Collection empty state | Nothing matches those filters. / Try removing a filter, or browse all jewelry. / Reset filters |
| PDP related heading | Wear it with |
| Contact note | Questions about an order placed before [launch date]? Include your order number and we'll help. |

Long-form brand story (Our Story page, **draft for approval**):

> Parkdale Brass began in 2019 in Toronto's Parkdale neighbourhood with an appreciation for brass and the industrial design of everyday objects. Today, we're taking that same interest in form, function and character into jewelry. Our next chapter is about pieces that feel personal, with warm tones, considered shapes and a style that doesn't need to shout.

"Est. 2019" refers to the brand, not the jewelry line.

---

## 2 · Product data model

### Options and variants (native)
- `Finish`: only if a product really comes in more than one finish (e.g. Brushed, Polished). Each value is its own SKU.
- `Size`: rings (CA/US sizes), cuffs (e.g. S/M, M/L), chains (length in cm / in).
- Never encode finish or size in metafields when they change the SKU.

### Metafield definitions (namespace `custom`, product owner type)

| Key | Type | Shown in | Hidden when empty |
| --- | --- | --- | --- |
| `short_description` | Multi-line text | PDP under the price; card descriptor fallback | Yes |
| `material` | Single-line text | Materials & finish | Yes |
| `finish` | Single-line text | Materials & finish; card descriptor | Yes |
| `patina_notes` | Multi-line text | Materials & finish | Yes, and don't fill it for coated or plated finishes that don't patina |
| `dimensions` | Multi-line text | Dimensions & fit | Yes |
| `fit_notes` | Multi-line text | Under the size picker; Dimensions & fit | Yes |
| `care_instructions` | Multi-line text | Care | Yes |
| `origin` | Single-line text | Materials & finish ("Made in …") | Yes. **Never inferred from the Toronto brand location.** |
| `size_guide` | Page reference | Overrides the Size guide popup target | Falls back to the global size-guide page |

Before creating these, check Phase 0's export for existing definitions and reuse any that are compatible. Keep supplier composition and test reports in private records, not in metafields.

### Product type and tags
- Product type: `Bracelet`, `Necklace`, `Ring` (drives smart collections).
- Tag `jewelry` on every jewelry product (drives `/collections/jewelry`, so legacy items never appear in it).

---

## 3 · Store structure (Phase 3, approval required)

| Object | Handle | Definition |
| --- | --- | --- |
| Collection | `jewelry` | Smart: tag = `jewelry` |
| Collection | `bracelets` | Smart: type = Bracelet |
| Collection | `necklaces` | Smart: type = Necklace |
| Collection | `rings` | Smart: type = Ring (created hidden in Phase 3; rings launch with The Brockton signet, D-40) |
| Page | `our-story`, `why-brass`, `jewelry-care`, `size-guide` | Check for existing handles first; reuse an existing "about" page by redirecting it if one exists |
| Menu | `jewelry-main-menu` | Shop (→ `/collections/jewelry`; children: All Jewelry, Bracelets, Necklaces, Rings*) · Our Story · Journal (`/blogs/news`) |
| Menu | `shop-categories` | All (`/collections/jewelry`), Bracelets, Necklaces, Rings* |
| Menu | `footer-shop` | All Jewelry, Bracelets, Necklaces, Rings* |
| Menu | `footer-learn` | Our Story, Why Brass?, Jewelry Care, Size Guide, Journal |
| Menu | `footer-help` | Shipping & Returns (policy URL), Contact, Support for previous orders (contact page anchor) |

\* Rings launch with The Brockton signet (D-40). The Rings items are in the menus from Phase 3. The live theme doesn't use these menus, so the items only show once the new theme is published.

The existing `main-menu` and `footer` menus are **not edited**. They stay as the rollback path.

---

## 4 · Missing assets and unresolved claims (keep this table current)

| Item | Needed for | Owner | Status |
| --- | --- | --- | --- |
| Final logo / wordmark files (SVG, light + dark) | Header, footer, favicon, OG | Owner | Missing (typeset fallback in use) |
| Approved product list, names, designs | All merchandising | Owner | Missing (concepts only) |
| Material composition and safety documentation per SKU | Materials & finish, claims | Owner / supplier | Missing |
| Actual finishes and coatings | Finish option, care | Owner / supplier | Missing |
| Dimensions, size ranges, tested adjustability | Size picker, size guide | Owner | Missing |
| Prices (CAD) and markets | PDP, cards, Markets | Owner | Missing (the brief's figures are illustrative) |
| Shipping markets, timelines, duties | PDP service lines, policy | Owner | Missing |
| Returns and exchanges (incl. ring resizing) | PDP, policy | Owner | Missing |
| Care instructions tested on samples | Care page, PDP | Owner | Missing |
| Product photography (4 per SKU) | PDP, cards | Owner / photographer | Missing |
| Hero, category, editorial, material, story imagery | Homepage | Owner / photographer | Missing |
| Newsletter consent wording | Newsletter | Owner / legal | Missing |
| Verified social URLs | Footer, Organization schema | Owner | Missing |
| Lawful basis to email existing subscribers about jewelry | Launch email | Owner / legal | Unverified |

---

## 5 · SEO and URL plan

### Metadata (set at launch, adjusted to actual inventory)

| Page | Title | Description |
| --- | --- | --- |
| Home (prelaunch) | Parkdale Brass · Brass Jewelry, Coming Soon | Parkdale Brass is a Toronto-rooted brand inspired by brass and industrial design. Our first jewelry collection is in development. Join the launch list. |
| Home (live) | Brass Jewelry & Accessories · Parkdale Brass | Explore Parkdale Brass, a Toronto-rooted jewelry brand inspired by brass, industrial design and everyday character. |
| All Jewelry | Brass Jewelry · Parkdale Brass | Brass cuffs, chains, pendants and rings with listed finishes, measurements and care. |
| Why Brass? | Why Brass? Brass Jewelry Explained · Parkdale Brass | What brass is, how raw, coated and plated finishes differ, and how brass jewelry changes with wear. |

- OG image: a 1200×630 crop of the approved hero photo. Never a legacy pipe image.
- One H1 per page. Headings follow the order in 02.

### URL inventory

The full public inventory (167 URLs, each classified with a proposed first action) is in [`url-inventory.csv`](url-inventory.csv). Fill in its Search Console columns, then the final action, destination and approver per row. The table below covers the key rows.

| URL | Action | Destination / note | Approval |
| --- | --- | --- | --- |
| `/` | Replace content at launch | n/a | Required |
| `/collections/all` | Keep (Shopify default) | Legacy items leave it once unpublished. Menus link to `/collections/jewelry`. | Required |
| `/blogs/news` | Keep | Journal | n/a |
| `/blogs/news/what-is-brass-jewelry-metal` | Keep and update | Accuracy review; link to Why Brass and the collection | Required |
| `/blogs/news/gold-plated-brass-jewelry` | Keep and update | Clearly separate plating from actual product finishes | Required |
| `/products/brockton-mk2` | Decide after traffic, backlink and support audit | Options: keep unpublished (404), or 301 only to a genuinely relevant page (e.g. a legacy support page). **Not to the homepage.** | Required |
| `/products/the-bellwoods-one-hitter` | Same as above | Same as above | Required |
| Legacy smoking blog posts | Inventory, then decide | Keep for history, or retire with a 404. Never feature them. | Required |
| Legacy collections (pipes, apparel) | Unpublish or retire | 301 only to a relevant destination | Required |

Record each URL as: URL · clicks/impressions (16 months) · backlinks · action · destination · reason · approver · date.

### Structured data

`Organization` on home; `Product`/`Offer` only on real live products (Dawn native); `BreadcrumbList` on collection and PDP. No ratings or review counts until genuine reviews exist. Validate with Google's Rich Results Test before launch.

---

## 6 · Legacy data safeguards

Don't delete products, reviews, customers, orders, contacts, redirects, analytics or policies. Unpublish only after approval and a CSV export. Never attach pipe reviews to jewelry products or show old review aggregates. Preserve consent records.

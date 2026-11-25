# 02 · Design specification: Direction B "Archive"

**Chosen direction (2026-11-25): B, "Archive".** Black ground, gold accents, royal green feature panels. It's drawn from the Bellwoods "Archive Edition" lockup. Direction A (ivory and charcoal) stays on the canvas for reference only. Don't build it.

This file describes the approved concept precisely enough to rebuild without seeing the canvas. Values are desktop at a 1440 viewport, with mobile at 390 in brackets **[m: …]**. Between 750 and 1440, scale fluidly.

Canvas page **"B · Archive: black, gold & green"**:
- `Archive-Home`, `Archive-Collection`, `Archive-Product`, `Archive-Home-Mobile`, `Archive-Foundations`.
- The collection and product mobile layouts follow Direction A's mobile artboards (`Collection-Mobile`, `Product-Mobile`) restyled with these tokens.

Concept: **a heritage label's archive.** Dark and quiet, with gold used the way an engraved plate or a hallmark would use it. Richness comes from colour, the frame and the type, **never from gradients, shadows, foil textures or animation.**

---

## 1 · Tokens

### 1.1 Colour

| Token | Hex | Contrast on onyx | Use | Never |
| --- | --- | --- | --- | --- |
| `--pb-onyx` | `#121211` | ground | Page background | n/a |
| `--pb-onyx-raised` | `#1B1A18` | surface | Image grounds, cards, inputs, selects | n/a |
| `--pb-onyx-deep` | `#0D0D0C` | surface | Footer | n/a |
| `--pb-rule` | `#2E2A24` | n/a | Hairlines between UI rows; card borders | Text |
| `--pb-rule-strong` | `#4A4234` | n/a | Input and pill borders, thumbnail borders | Text |
| `--pb-ivory` | `#F2EBDD` | 15.8 : 1 | Headings, primary text, nav | n/a |
| `--pb-body` | `#D8D0C0` | ≈ 12 : 1 | Long-form body text on onyx (less glare than pure ivory) | n/a |
| `--pb-muted` | `#B5AB98` | 8.3 : 1 | Secondary text, meta, breadcrumbs | n/a |
| `--pb-gold` | `#C2A266` | 7.7 : 1 | Eyebrows, prices, links, primary buttons, outer frame, diamonds, selected states | Large text blocks |
| `--pb-gold-hover` | `#D4B67C` | n/a | Primary button hover | n/a |
| `--pb-gold-pale` | `#E6CF9C` | ≈ 12 : 1 | **Focus ring**; text on the green announcement bar | n/a |
| `--pb-gold-line` | `#7D6840` | 3.5 : 1 | Inner frame, section borders, dividers | **Any text** |
| `--pb-green` | `#173F31` | panel | Royal green feature panels: announcement, material story, signup, promo tile | Text, thin lines |
| `--pb-green-deep` | `#12342A` | panel | Image grounds and inputs **inside** green panels | n/a |
| `--pb-on-green` | `#E3DCCB` | 8.6 : 1 on green | Body text on green | n/a |

On green: ivory is 9.9 : 1 and gold 4.8 : 1, which passes AA for normal text. Keep gold text on green at ≥ 12px with weight ≥ 500.

### 1.2 Typography

| Role | Family | Weight | Size desktop [m] | Line-height | Tracking | Case |
| --- | --- | --- | --- | --- | --- | --- |
| Hero H1 | Cormorant Garamond | 600 | 64 [40] | 1.02 | 0.03em | **UPPER** |
| Page H1 (collection, product) | Cormorant Garamond | 600 | 54–60 [40] | 1.0 | 0.04–0.06em | **UPPER** |
| H2 (section) | Cormorant Garamond | 500 | 46–54 [32–38] | 1.05–1.1 | 0 | Sentence |
| Wordmark (text fallback) | Cormorant Garamond | 600 | 23 [17] | 1 | **0.32em** [0.28em] | UPPER |
| Lockup line ("PARKDALE BRASS" in hero) | Cormorant Garamond | 600 | 20 [15] | 1 | 0.32em | UPPER, gold |
| Category label | Cormorant Garamond | 600 | 22 | 1.2 | 0.22em | UPPER |
| Product name (card) | Cormorant Garamond | 600 | 24–26 [20] | 1.2 | 0 | Title |
| Article title | Cormorant Garamond | 600 | 28 [22] | 1.2 | 0 | Sentence |
| Roman numeral (journal) | Cormorant Garamond | 500 | 34 [28] | 1 | 0 | I, II, III, gold |
| Eyebrow | Inter | 500 | 12 [11] | 1.4 | 0.32em | UPPER, gold |
| Dateline ("EST. 2019 · TORONTO") | Inter | 500 | 13 [11] | 1.4 | 0.42em | UPPER, gold |
| Nav | Inter | 500 | 12 | 1 | 0.24em | UPPER |
| Button label | Inter | 600 | 13 | 1 | 0.18em | UPPER |
| Accordion header, legends | Inter | 600 | 12–13 | 1.3 | 0.16–0.2em | UPPER |
| Body large / body | Inter | 400 | 17 / 15–16 [16] | 1.6 | 0 | n/a |
| Meta / caption | Inter | 400 | 13 [12] | 1.5 | 0 | n/a |

Use two families only. Load Cormorant 500 and 600, and Inter 400, 500 and 600. Preload Cormorant 600 (the hero) and Inter 400.

### 1.3 Layout and spacing

- Max content width **1440**. Outer gutter **56** desktop, **20** mobile (16 for framed mobile panels). Editorial text max-width 620–660.
- Base unit 4/8. Section spacing **112–128** desktop, **64–72** mobile. Section head to content: **40–48** [24].
- **Section heads are centred** (eyebrow with rules, then the H2) for Category, Featured, Collection header, Recommendations and Signup. **Left-aligned heads** are used inside split sections (Material, Story) and on Journal.
- Grids: featured 4-up (gap 28), collection 3-up (column 28 / row 56), category 3-up (gap 28), journal 3-up (gap 40). Mobile: products 2-up (gap 12 / row 28); categories become **full-width rows** (§2.3).
- Splits: hero **1fr / 1fr**, material **1fr / 1fr** (full-bleed green), story **6fr / 5fr** (gap 88). All stack below 960.

### 1.4 Shape, lines, motion

- Radius: **2px** on buttons, inputs, pills; **4px** on the outer frame; 0 on images. Badges are square.
- Lines: 1px. Use `--pb-rule` between UI rows, `--pb-gold-line` for section edges and inner frames, and `--pb-gold` for the outer frame and top rules on journal cards and accordions.
- Selected states: a gold border (2px on a finish) or a gold fill with onyx text (size, current category pill).
- **No shadows, gradients or entrance animation.** Hover is a gold colour change, a gold border on a card image, or an underline in gold. Primary button hover is `--pb-gold-hover`.
- Focus: **2px solid `--pb-gold-pale`, offset 3px**, on every interactive element.

### 1.5 Ornament kit (new in B)

| Ornament | Spec | Where | Limit |
| --- | --- | --- | --- |
| **Double frame** | Outer: 1px `--pb-gold`, radius 4, padding 10 [8]. Inner: 1px `--pb-gold-line`, content padding as needed. | Hero lockup, editorial image, story image, signup panel, main product image, collection promo tile | **At most one fully in view at a time.** Never on product cards. |
| **Diamond** | Square rotated 45°, 1.5px `--pb-gold` outline, no fill. Sizes: 10 (wordmark, footer), 14 (dividers, recs head), 18 (section marks), 26 (hero top/bottom). | Wordmark prefix, hero top and bottom, section starts, dividers | Never as list bullets. Always `aria-hidden="true"`. |
| **Rule-flanked eyebrow** | Eyebrow text between two 40px [28px] × 1px gold rules, gap 16. | Centred section heads, hero lockup line | Only when centred. Left-aligned eyebrows have no rules. |
| **Ornament divider** | 120px gold-line rule · 14px diamond · 120px rule, centred. [m: 80px rules, 12px diamond] | Between the Editorial and Story sections on the homepage | One per page. |
| **Roman numerals** | Cormorant 500 34, gold, above the article title | Journal cards | Journal only. |

---

## 2 · Components

### 2.1 Buttons

| Variant | Height | Padding | Background / text | Border | Label |
| --- | --- | --- | --- | --- | --- |
| Primary | 52 (56 on PDP) | 0 30 | gold / onyx | none | Inter 600, 13, 0.18em, UPPER |
| Secondary | 50–52 | 0 26 | transparent / gold | 1px gold | same. Hover: gold fill, onyx text |
| Text CTA | ≥ 44 hit area | 12 0 | n/a / gold | n/a | Inter 600, 12–13, 0.18em, UPPER, underline offset 6 |
| Disabled | same | same | `--pb-rule` / `--pb-muted` | none | `aria-disabled="true"`. The label says why ("Select a size"). |

Mobile primary and secondary buttons are full width.

### 2.2 Product card

- Image **4:5** on `--pb-onyx-raised` with a 1px `--pb-rule` border. On hover the border turns gold and the second image shows if one exists.
- Below the image (gap 14): a row with the name (Cormorant 600 24–26, ivory) and the price (Inter 500 15, **gold**). Then the descriptor (Inter 14, muted, −8 top margin).
- **Concept badge** (prelaunch only): top-left 12/12, transparent background, 1px gold border, gold text, Inter 600 10, 0.24em, padding 4×8, text "CONCEPT".
- Live sold-out badge: same shape, using muted text and border.
- The whole card is one link. Hover underlines the name in gold.

### 2.3 Category tile

- **Desktop:** a 4:5 image (onyx-raised, 1px rule border, gold border on hover), then a centred label below it (Cormorant 600 22, 0.22em, UPPER, ivory, gold on hover).
- **Mobile:** a full-width row, 92px tall, onyx-raised with a 1px rule border, the label on the left (same type) and a small product image or line mark on the right.
- Render a tile only if its collection has ≥ 1 published product.

### 2.4 Inputs and forms

- Height 48–52, padding 0 14–16, radius 2, Inter 16.
- On onyx: `--pb-onyx-raised` background, 1px gold border, ivory text. On green: `--pb-green-deep` background, 1px gold border.
- Visible labels always: Inter 500 11–12, 0.16em, UPPER.
- Errors: ivory text with an icon, linked by `aria-describedby`, announced through `role="alert"`.

### 2.5 Variant options (PDP)

- **Finish:** 48px buttons on onyx with a 1px rule-strong border; selected gets a 2px gold border. An 18px swatch (1px gold-line border) sits next to the label. Legend: "FINISH: Brushed", with the value in gold.
- **Size:** a 3-column grid, min-height 56, the name (15/500) over a note (12). Selected: gold fill, onyx text. Unavailable: 1px dashed `#5C5446`, struck-through name, `#8E8576` text, `aria-disabled="true"`, still focusable.
- **Size guide** link in gold, right-aligned in the Size legend row. It opens a modal with the Size Guide page.
- Fit note below the sizes (13, muted).

### 2.6 Accordion (PDP details)

The group has a 1px **gold** top border and each row a 1px `--pb-rule` bottom border. Each header is a 56px `<button aria-expanded>` in Inter 600 13, 0.16em UPPER ivory, with "+" or "−" in gold. The body is 15/1.6 `--pb-body`. Description is open by default.

### 2.7 Header

- **Announcement bar** (only with a real message): green background, gold-pale text, Inter 500 12, 0.18em UPPER, centred, with the link in ivory.
- **Desktop:** height 84, onyx, 1px `--pb-rule` bottom border.
  - Left: a 10px diamond and the wordmark (§1.2). An approved logo image replaces both.
  - Right: the nav in Inter 500 12, 0.24em UPPER, gap 44: **Shop ▾** (gold caret), **Our Story**, **Journal**. The current item is gold with a 1px gold underline.
  - Far right: 44×44 Search, Account and Bag icons (1.4 stroke, ivory). The bag count is a gold dot with onyx text.
- **Mobile:** height 64, with the hamburger, the centred wordmark (17, 0.28em) and Search and Bag.
- Sticky: on scroll up.

### 2.8 Footer

- `--pb-onyx-deep` background with a 1px `--pb-gold-line` top border.
- **Desktop:** a `1.4fr 1fr 1fr 1fr` grid.
  - The brand column has a diamond, the wordmark (21, 0.32em) and the line "Brass jewelry with character. Est. 2019, Toronto." in muted.
  - Column heads are Inter 600 11, 0.28em, in gold. Links are ivory 14 and turn gold on hover.
  - Bottom bar after a `--pb-rule` hairline: © year, the policy links (muted), and the Country/region select (onyx-raised, rule-strong border).
- **Mobile:** the link groups become accordions (52px rows, gold heads, `aria-expanded`). Social icons appear only for verified accounts.

---

## 3 · Imagery

Photography must sit on a dark page. **Shoot on dark grounds: charcoal linen, slate, walnut or black card, with a single warm directional light.** Colour accuracy still beats mood. Full brief: `photography-brief.md`.

| Slot | Ratio | Brief |
| --- | --- | --- |
| Hero | 1:1 desktop half (≈ 720×760), separate 4:5 mobile crop | Launch pieces on dark linen or slate, single warm light |
| Category tile | 4:5 desktop; small square for the mobile row | One piece per category on a matched dark ground |
| Product P1–P4 | 4:5 | Front/¾, reverse/opening, macro finish, on body. Consistent dark ground. |
| Material story | ≈ 1:1 | Macro of real brass texture, raking warm light |
| Editorial | 21:9 desktop (inside the frame), 4:5 mobile | On-body with dark wool, denim, workwear |
| Story | 4:5 (inside the frame) | Approved Parkdale image or founder portrait |

Image placeholders in previews: onyx-raised (green-deep inside green panels) with a gold line drawing and a caption chip (onyx background, muted text).

---

## 4 · Homepage (`/`)

### 4.1 Hero (`pb-hero`)
- Desktop: two equal columns, min-height 760.
- **Left** (padding 64/48/64/56): a **double-framed lockup** (max-width 600) centred in the column. Inside the inner frame (padding 56 40), centred, gap 22:
  1. 26px diamond;
  2. lockup line "PARKDALE BRASS" between rules;
  3. H1 "MADE TO WEAR.<br>MADE TO AGE." (caps, §1.2);
  4. dateline "EST. 2019 · TORONTO";
  5. text (17, muted, max 400) "Brass jewelry with character, inspired by industrial design and rooted in Parkdale.";
  6. a centred button row (gap 16): primary + secondary "Our story" → `/pages/our-story`;
  7. 26px diamond.
- **Right:** the image on onyx-raised with a 1px `--pb-rule` left border.
- Primary CTA: **prelaunch** "Get launch updates" → `#signup`; **live** "Shop jewelry" → `/collections/jewelry`.
- Mobile: the framed lockup first (frame padding 8, inner 36 20, full-width primary, text-link secondary), then the image at full width, 400 tall, with rule borders top and bottom.
- The image is the LCP: eager, `fetchpriority="high"`.

### 4.2 Shop by category (`pb-category-tiles`)
A centred head with the eyebrow "THE COLLECTION" between rules and the H2 "Shop by category". Tiles per §2.3, 3-up desktop, rows on mobile. Collections without products are hidden, and so is the section if none remain.

### 4.3 Featured: prelaunch `pb-concept-grid` / live `featured-collection`
- Centred head: the eyebrow ("COMING SOON" prelaunch, "EVERYDAY ESSENTIALS" live) between rules, and the H2 "The first collection".
- Prelaunch: under the H2, a centred note (15, muted): "Concepts in development. Designs, finishes and prices may change before release."
- Cards per §2.2, 4-up [2-up].
- **Prelaunch:** Concept badge, no price, no product link.
- **Live:** real products, gold prices, and a centred secondary button "View all jewelry" (margin-top 48).

### 4.4 Material story (`image-with-text`, green)
- A full-bleed **green** section with 1px gold-line top and bottom borders.
- Image left (green-deep background, macro finish). Text right (padding 104/88, max 660):
  - 18px diamond;
  - eyebrow "THE MATERIAL";
  - H2 "A material with character.";
  - two paragraphs in `--pb-on-green`;
  - secondary button "Why brass?".

### 4.5 Editorial banner (`pb-editorial-banner`)
- A **double-framed** 21:9 image at content width [m: 8px frame, 440px tall portrait crop].
- Below (margin-top 36), a row: the H2 "Considered forms. Everyday character." (46, max 640) on the left, and a gold text CTA on the right. The CTA reads "Be first to know" → `#signup` in prelaunch, and "Shop bracelets" when live.

### 4.6 Ornament divider + Our story (`image-with-text`, image right)
- The §1.5 ornament divider (padding-top 112 [64]), then the split at 6fr/5fr with an 88px gap.
- Text: eyebrow "OUR STORY", H2 "Rooted in Parkdale.", two paragraphs (`--pb-body`), secondary button "Our story". The image is **double-framed**, 4:5.
- **Never imply jewelry has been sold since 2019.**

### 4.7 Journal (`pb-journal-picks`)
- A left-aligned head (eyebrow "THE JOURNAL", H2 "Notes on brass"), with a right-aligned gold text CTA "All articles".
- Three hand-picked articles, 3-up [stacked]. Each card has:
  - a 1px **gold** top rule, padding-top 22;
  - a roman numeral;
  - the tag (Inter 600 11, 0.28em, muted);
  - the title (Cormorant 600 28, link);
  - the excerpt (15, muted).
- Mobile: the numeral sits in a 40px left column beside the title.
- Jewelry, material and care articles only.

### 4.8 Newsletter (`pb-newsletter`, `id="signup"`)
- A **green, double-framed** panel at content width [m: 16px side margin]. The inner frame has padding 72 40 [40 18] and is centred:
  - 22px diamond;
  - eyebrow "LAUNCH LIST" between rules;
  - H2 "The next chapter." (54 [38]);
  - text "Get collection news and new release updates." (`--pb-on-green`);
  - a form (max 560, left-aligned inside) with a label, the email input (§2.4 on-green style) and the primary button "Notify me" / "Subscribe" in a wrapping row;
  - consent text (13, `#CFC6B4`), owner-approved.
- Success: `role="status"`. Error: `role="alert"`.

### 4.9 Footer
As §2.8.

---

## 5 · Collection page (`/collections/{handle}`)

1. Breadcrumb (13, muted).
2. **A centred collection head** (padding 56 0 48): 18px diamond, then the H1 collection title (60 caps, 0.06em), then an eyebrow line between rules listing the **live** categories (e.g. "CUFFS · CHAINS · PENDANTS", built from the `shop-categories` menu or a collection metafield; it never names a category that isn't live), then the description (16, muted, max 560).
3. Toolbar (padding 16 0, 1px gold-line top border, `--pb-rule` bottom border):
   - **left:** category pills (§1.4 selected state; inactive pills are transparent with a rule-strong border, Inter 600 12, 0.18em UPPER);
   - **right:** product count (muted), "In stock only" (gold checkbox accent), Sort select.
   - [m] Pills scroll horizontally; Filter and Sort sit in a 2-column bar below them.
4. Grid: 3-up [2-up], gap 56/28, cards per §2.2.
5. **"New to brass?" promo tile in the grid** (last slot): a **green double-framed** 4:5 tile, centred: diamond, eyebrow, Cormorant 34 line "How brass wears, and how to care for it.", gold text CTA "Why brass?".
6. Pagination: crawlable links, 24 per page.
7. A help strip (padding 104 0 112, 1px gold-line top border): Size guide · Jewelry care · Shipping & returns. Titles in Cormorant 600 28, one line of muted text, gold text CTA.
8. Empty state: "Nothing matches those filters." / "Try removing a filter, or browse all jewelry." with a [Reset filters] secondary button.

Filters at launch: availability and price only.

## 6 · Product page (`/products/{handle}`)

### 6.1 Layout
- Gallery 7fr with info 5fr, gap 72. The info column is sticky.
- Gallery: an 84px thumbnail column (4:5, onyx-raised, 1px rule-strong border, gold when selected) and the main image **inside a double frame**. A zoom button (44×44, onyx background, rule-strong border, gold icon) sits top-right inside the frame.
- Mobile: a swipe slider with a "1 / 4" counter and indicator buttons (44×32 hit area, gold for the active one).

### 6.2 Purchase column (in this order)
1. Eyebrow: the product type ("BRACELETS"). A collection number such as "No. 01" appears only if the owner adopts numbering.
2. H1 product title, caps (54 [40], 0.04em).
3. Price in gold (Inter 500 20 [18]).
4. Short description (16, `--pb-body`, max 480), from `custom.short_description`. Hidden if empty.
5. A small ornament divider (rules either side of a 10px diamond, flexible width).
6. The Finish picker (§2.5), only with more than one real finish.
7. The Size picker with the Size guide link, and the fit note from `custom.fit_notes`.
8. **Add to bag**, primary, 56 tall. "Select a size" while disabled, "Sold out" when unavailable.
9. A `role="status"` confirmation line.
10. Service lines (14, `--pb-body`, gold line icons) after a `--pb-rule` hairline. These are owner-approved shipping and returns summaries, hidden until approved.
11. Accordions (§2.6): Description, Materials & finish, Dimensions & fit, Care, Shipping & returns. Empty rows are hidden.

### 6.3 Below the fold
- "Wear it with": a centred head (14px diamond, H2 44), then 4-up [2-up] recommendations. Hidden when there are none.
- No reviews until genuine SKU-specific reviews exist.

### 6.4 Mobile sticky add-to-bag
- Shown only when a purchasable variant is selected **and** the main button is out of view.
- An onyx bar with a 1px gold-line top border and padding 12/20. Left: the name (14/500 ivory) over "Finish · Size · Price" (12 muted). Right: the gold primary button (48).
- It never covers errors, and it hides while the cart drawer is open.

### 6.5 Cart drawer
- Onyx with a 1px gold-line left border, the title "Your bag (n)" in Cormorant 600 24, and a 44px close button.
- Line items: an 80px 4:5 image (onyx-raised), the name (Cormorant 600 20), the price (gold), the options (13 muted), a quantity stepper (44px buttons, rule-strong border) and a "Remove" text button.
- Footer: Subtotal, "Taxes and shipping calculated at checkout.", a full-width gold Check out button. It always goes to native Shopify checkout.

---

## 7 · Content pages

| Page | Structure |
| --- | --- |
| **Our Story** | Centred head (diamond, H1 caps "OUR STORY", dateline "EST. 2019 · TORONTO"); long-form brand story (`--pb-body`, 17, max 680); a double-framed image; links to the collection and Why Brass |
| **Why Brass?** | Head as above; sections on what brass is, raw vs coated vs plated, and patina and skin discolouration (with a note to stop wearing if irritation develops); one green panel with the key takeaway; links to the 2 existing articles; live collections |
| **Jewelry Care** | Head; accordions per finish (§2.6 style); storage; what to avoid |
| **Size Guide** | Head; "How to measure"; tables with gold header text, `--pb-rule` row lines, onyx-raised header row; validated data only |
| **Contact** | Existing form restyled (§2.4); previous-order support note |

Content pages use an editorial width of 720, H1 caps Cormorant 600 54 [40], body 17 `--pb-body`.

---

## 8 · States summary

| Component | Prelaunch | Live |
| --- | --- | --- |
| Announcement (green) | Launch-list message | Hidden unless there's a verified message |
| Hero CTA | "Get launch updates" → `#signup` | "Shop jewelry" → `/collections/jewelry` |
| Category tiles | Collections with products only | Live collections |
| Featured | `pb-concept-grid` (Concept badge, no price or link) | `featured-collection` + "View all jewelry" |
| Editorial CTA | "Be first to know" | "Shop bracelets" |
| Newsletter button | "Notify me" | "Subscribe" |
| PDP | Not public (draft fixtures on a dev store only) | Real product |
| Reviews | Hidden | Genuine, SKU-specific only |
| SEO | Homepage indexable with accurate prelaunch metadata | All live pages indexable |

Switch states in the theme editor (section settings and swapping one section).

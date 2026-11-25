# 02 · Design specification

A complete description of the approved design concepts, precise enough to rebuild without seeing the canvas. Pixel values are desktop at a 1440 viewport, with mobile at a 390 viewport in brackets **[m: …]**. Between 750 and 1440, scale fluidly.

Concept name: **Modern industrial heritage.** An independent menswear shop crossed with a small jewelry studio. Editorial but functional. Photography, hairlines and type carry it: **no gradients, drop shadows, foil effects, pill shapes, heavy textures or entrance animations.**

---

## 1 · Tokens

### 1.1 Colour

| Token | Hex | Contrast on ivory | Use | Never |
| --- | --- | --- | --- | --- |
| `--pb-ivory` | `#F5F1E8` | n/a (ground) | Page background, light button label | n/a |
| `--pb-ivory-deep` | `#EFE9DD` | n/a | Footer background | n/a |
| `--pb-charcoal` | `#242420` | 13.8 : 1 | Primary text, primary buttons, dark panels | n/a |
| `--pb-ink-soft` | `#3F3B35` | ≈ 10 : 1 | Long-form body copy | n/a |
| `--pb-stone` | `#655F56` | 5.6 : 1 | Supporting text, meta, breadcrumbs | Text under 12px |
| `--pb-bronze` | `#75552C` | 6.0 : 1 | Eyebrows, link hover, **focus ring**, line art | n/a |
| `--pb-leather` | `#584032` | 8.5 : 1 | Occasional editorial panel | Large areas next to charcoal |
| `--pb-brass` | `#B39255` | 2.6 : 1 | Decorative swatches and rules **only** | **Any text or icon that carries meaning** |
| `--pb-line` | `#D9D0C1` | 1.4 : 1 | Hairline borders and dividers | Input borders (use `--pb-line-strong`) |
| `--pb-line-strong` | `#A39A8B` | ≈ 2.7 : 1 | Input borders, dashed unavailable state | n/a |
| `--pb-placeholder` | `#E4DACA` | n/a | Image placeholder ground (hero, tiles, story) | n/a |
| `--pb-placeholder-2` | `#EAE3D6` | n/a | Product image ground | n/a |
| `--pb-placeholder-3` | `#D9CDB8` | n/a | Material story image ground | n/a |
| `--pb-disabled` | `#CFC6B6` | n/a | Disabled button ground (text `--pb-ink-soft`) | n/a |
| `--pb-on-dark-muted` | `#D9D0C1` / `#BDB3A3` | ≥ 7 : 1 on charcoal | Secondary text on charcoal | n/a |
| `--pb-on-dark-accent` | `#D9C59A` | ≥ 9 : 1 on charcoal | Eyebrows on charcoal | n/a |

On a charcoal panel, ivory text is 13.8 : 1.

### 1.2 Typography

| Role | Family | Weight | Size desktop [m] | Line-height | Tracking | Case |
| --- | --- | --- | --- | --- | --- | --- |
| Display / H1 (hero) | Cormorant Garamond | 500 | 76 [44] | 0.98–1.0 | −0.01em | Sentence |
| H1 (collection / PDP) | Cormorant Garamond | 500 | 64 / 56 [40] | 1.0 | 0 | Sentence |
| H2 (section) | Cormorant Garamond | 500 | 44–48 [32–34] | 1.08–1.1 | 0 | Sentence |
| H2 (signup) | Cormorant Garamond | 500 | 52 [36] | 1.05 | 0 | Sentence |
| Product name (card) | Cormorant Garamond | 600 | 24–26 [20] | 1.2 | 0 | Title |
| Article title (card) | Cormorant Garamond | 600 | 28 [23] | 1.2 | 0 | Sentence |
| Eyebrow | Inter | 600 | 12 [11] | 1.4 | 0.22em | UPPER, `--pb-bronze` |
| Nav / button label | Inter | 500 | 13–14 | 1 | 0.08–0.14em | UPPER |
| Body large | Inter | 400 | 17–18 [16] | 1.6 | 0 | n/a |
| Body | Inter | 400 | 15–16 | 1.6 | 0 | n/a |
| Meta / caption | Inter | 400 | 13 [12] | 1.5 | 0 | n/a |
| Wordmark (text fallback) | Cormorant Garamond | 600 | 25 [19] | 1 | 0.2em [0.18em] | UPPER |

Use at most two families. Cormorant ships 500 and 600 only, Inter 400, 500 and 600. Preload one weight each (Cormorant 500, Inter 400).

### 1.3 Layout and spacing

- Max content width **1440**. Outer gutter **56** desktop, **20** mobile (`.page-width` override). Editorial text max-width **620–640**.
- Base unit 4/8. Section spacing **104–112** desktop, **56–64** mobile. Section heading to content: **36** [20].
- Grids: featured 4-up (gap 24), collection 3-up (column gap 28, row gap 56), category 3-up (gap 24), journal 3-up (gap 32). Mobile: 2-up (gap 12, row gap 28–32), editorial single column.
- Split sections: hero **5fr / 7fr** (text / image), story **6fr / 5fr** (gap 80), material **1fr / 1fr** (image left, no gap, text padding 96/80). All stack at < 960px (Dawn's 750 breakpoint is fine).
- Breakpoints to verify: 320, 375, 390, 768, 1280, 1440. No horizontal overflow at any of them.

### 1.4 Shape, lines, motion

- Corner radius **2px** for buttons, inputs, pills, badges, dark panels and the cart drawer. Images are square-cornered.
- Borders are 1px `--pb-line`. Selected option: 2px charcoal (finish) or a charcoal fill (size).
- Shadows: none, anywhere.
- Motion: none on entry. Hover is an underline (offset 4–6px) or a colour change to bronze. Button hover is `#3B3B35`. `prefers-reduced-motion` disables Dawn's transitions.
- Focus: **2px solid `--pb-bronze`, offset 3px**, on every interactive element (`:focus-visible`).

---

## 2 · Components

### 2.1 Buttons

| Variant | Height | Padding | Background / text | Border | Label |
| --- | --- | --- | --- | --- | --- |
| Primary | 52 (56 on PDP) | 0 32 | charcoal / ivory | none | Inter 500, 14, 0.08em, UPPER |
| Secondary | 46 | 0 24 | transparent / charcoal | 1px charcoal | Inter 500, 13, 0.08em, UPPER |
| On dark | 52 | 0 28 | ivory / charcoal | none | same |
| Text link CTA | ≥ 44 hit area | 12 0 | n/a | n/a | Inter 500, 14, 0.08em, UPPER, underline offset 6 |
| Disabled | same | same | `#CFC6B6` / `#3F3B35` | none | `aria-disabled="true"`; label says why ("Select a size") |

Mobile primary and secondary buttons are full width.

### 2.2 Product card

- Image **4:5**, ground `--pb-placeholder-2`, product centred, no text inside the image. On hover, show the second image if one exists. Touch users see the first image only.
- Below the image, with a 14 gap: a row with the **name** (Cormorant 600, 24–26) on the left and the **price** (Inter 500, 15) on the right; then a **descriptor** (Inter 14, stone, −8 top margin) from the finish or short-description metafield.
- Badge, prelaunch concept only: top-left 12/12, ivory ground, `#4F4A43` text, Inter 600 11, 0.14em, UPPER, padding 5×9, radius 2. Text: "Concept". In the live theme, use only Dawn's genuine "Sold out" badge, restyled to the same shape.
- The whole card is one link. On hover the name underlines. No quick add for sized products.

### 2.3 Category tile

A 4:5 image, then a label row: Inter 500 15, 0.12em, UPPER, with the name on the left and `→` on the right (`aria-hidden`). Hover underlines the label. Render only if the collection has at least one published product.

### 2.4 Inputs and forms

- Height 48–52, padding 0 14–16, 1px `--pb-line-strong`, radius 2, Inter 16 (avoids iOS zoom).
- Labels are always visible above the field. Never use a placeholder as the only label.
- On dark: transparent ground, ivory text, `#A39A8B` border.
- Errors: text in charcoal with an error icon, linked by `aria-describedby`, announced through `role="alert"`.

### 2.5 Variant options (PDP)

- **Finish:** buttons 48 tall, padding 0 20, 18px circular swatch plus label. Selected: 2px charcoal border. The legend reads "FINISH: Brushed".
- **Size:** a grid of three equal columns, min-height 56, with the name (15/500) over a note (12, e.g. "In stock" or "Sold out"). Selected: charcoal fill, ivory text. Unavailable: 1px dashed `--pb-line-strong`, struck-through name, stone text, `aria-disabled="true"`. It stays focusable and announces "sold out".
- **Size guide** link: right-aligned in the size legend row (Inter 14, underlined). It opens Dawn's popup modal with the Size Guide page.
- A fit note sits under the sizes (13, stone).

### 2.6 Accordion (PDP details)

The group has a 1px charcoal top border and each row a 1px `--pb-line` bottom border. Each header is a 56px-tall `<button aria-expanded>` (Inter 500 15) with "+" or "−" on the right. The panel body is 15/1.6 `--pb-ink-soft` with 20 bottom padding. Description is open by default.

### 2.7 Header

- **Desktop**: height 80, 1px bottom border.
  - Left: the wordmark (logo image if approved, otherwise the text fallback from §1.2).
  - Centre-right: the nav in Inter 500 13, 0.14em UPPER, gap 40. Items are **Shop ▾** (a dropdown: All Jewelry, plus Bracelets, Necklaces and Rings as they go live), **Our Story** and **Journal**.
  - Right: 44×44 icon buttons for Search, Account (only if customer accounts are on) and Bag, with a count bubble.
- **Mobile**: height 60. Hamburger on the left (opens Dawn's drawer), wordmark centred, Search and Bag on the right.
- Sticky: Dawn "on scroll up".
- Announcement bar (charcoal, ivory 13px, centred): shown only with a real message. Prelaunch: "The first Parkdale Brass jewelry collection is in development. **Join the launch list**", linking to `#signup`.

### 2.8 Footer

Ground `--pb-ivory-deep`, 1px top border. Padding 72/56/40.

- **Desktop**: a grid of `1.4fr 1fr 1fr 1fr`.
  - Brand column: the wordmark, then "Brass jewelry with character. Est. 2019, Toronto."
  - **Shop**: All Jewelry, Bracelets, Necklaces, Rings (only when live).
  - **Learn**: Our Story, Why Brass?, Jewelry Care, Size Guide, Journal.
  - **Help**: Shipping & Returns, Contact, Support for previous orders.
  - Bottom bar after a hairline: © year, then the policy links, then the Country/region selector.
- **Mobile**: the link groups collapse into accordions (Dawn's footer stacks them, which is acceptable). Social icons appear only for verified accounts.

---

## 3 · Imagery

Every placeholder in the concepts must be replaced by real photography before launch. **No AI-generated images presented as real products.**

| Slot | Ratio | Brief |
| --- | --- | --- |
| Hero | ~7:6 desktop, 1:1.08 mobile (separate crop) | Launch pieces together on linen, directional daylight |
| Category tile | 4:5 | One representative piece per category, matched ground |
| Product 1 | 4:5 | Front / ¾ view, neutral ground, true colour |
| Product 2 | 4:5 | Reverse, opening or closure |
| Product 3 | 4:5 | Macro of the finish, edge and any patina |
| Product 4 | 4:5 | On body (wrist, neck or hand), true scale |
| Material story | 1:1 to 4:3 | Macro of the real finish texture |
| Editorial banner | 21:9 desktop, 4:5 mobile | On-body styling with denim, wool, workwear; varied adult models |
| Story | 4:5 | Approved Parkdale / Toronto image or founder portrait |

Alt text describes the piece and finish ("The Junction open cuff in brushed brass, worn on wrist"). Decorative textures use `alt=""`.

---

## 4 · Homepage (`/`)

Section order is fixed. Each section below gives its content and its behaviour.

### 4.1 Hero (`pb-hero`)
- Desktop: two columns, 5fr text and 7fr image, min-height 720, bottom hairline. Text padding 96/64/96/56, vertically centred, gap 28.
- Content:
  - eyebrow "PARKDALE BRASS · EST. 2019";
  - H1 "Made to wear.<br>Made to age.";
  - text (18, stone, max 420) "Brass jewelry with character. Inspired by industrial design and rooted in Toronto.";
  - a row with gap 28: the primary button plus the text-link CTA "Discover our story" → `/pages/our-story`.
- Primary CTA by state: **prelaunch** "Get launch updates" → `#signup`; **live** "Shop jewelry" → `/collections/jewelry`.
- Mobile: copy first (padding 40/20/32), full-width primary button, centred secondary link, then the image at full bleed, ~420 tall, using the mobile crop.
- The image is the LCP element: `loading="eager"`, `fetchpriority="high"`, with `sizes` set.

### 4.2 Shop by category (`pb-category-tiles`)
- H2 "Shop by category". In the live state, an "All jewelry" link sits right-aligned on the heading row.
- Tiles for Bracelets, Necklaces and Rings, 3-up [m: 2-up]. The column count equals the number of visible tiles.
- A collection with zero published products is **not rendered**. If all are hidden, the section renders nothing.

### 4.3 Featured: prelaunch (`pb-concept-grid`) or live (`featured-collection`)
- Eyebrow "COMING SOON" (prelaunch) or "EVERYDAY ESSENTIALS" (live), with the H2 "The first collection".
- **Prelaunch:** a right-aligned note "Concepts in development. Designs, finishes and prices may change before release." Four concept cards with a "Concept" badge, name and descriptor; **no price, no link to a product**. An optional block-level link goes to `#signup`.
- **Live:** Dawn featured collection, collection `jewelry`, 4 products, portrait cards, a "View all" secondary button. Prices, availability and images come from Shopify.

### 4.4 Material story (Dawn `image-with-text`)
- Image left (macro finish), text right. 1px hairlines top and bottom, full width, no gap.
- Text:
  - caption "THE MATERIAL";
  - H2 "A material with character.";
  - text "Brass is an alloy of copper and zinc, prized for its warm tone and the way it takes a finish. Uncoated brass darkens and softens with wear. Coated and plated finishes behave differently." and "Every piece lists its actual finish and how to care for it, so you know how it will change.";
  - secondary button "Why brass?" → `/pages/why-brass`.

### 4.5 Editorial banner (`pb-editorial-banner`)
- A full-content-width image (21:9) [m: full-bleed 4:5]. Below it, with a 32 gap, a row: H2 "Considered forms. Everyday character." (max 620) on the left and a text-link CTA on the right.
- The CTA reads **prelaunch** "Be first to know" → `#signup`, or **live** "Shop bracelets" → the relevant collection.

### 4.6 Our story (Dawn `image-with-text`, image right)
- Caption "OUR STORY"; H2 "Rooted in Parkdale.";
- Text "Parkdale Brass began in 2019 in Toronto's Parkdale neighbourhood, with an appreciation for brass and the industrial design of everyday objects." and "Our next chapter takes that same interest in form, function and character into jewelry: warm tones, considered shapes and a style that doesn't need to shout.";
- Secondary button "Our story". Image 4:5.
- **Never imply jewelry has been sold since 2019.**

### 4.7 Journal (`pb-journal-picks`)
- H2 "From the journal" with a right-aligned "All articles" link → `/blogs/news`.
- Three hand-picked articles, 3-up [m: stacked]. Each card: 1px charcoal top rule, padding-top 20, then the tag (eyebrow style, from the first article tag or a block setting), the title (Cormorant 600 28, link), and the excerpt (15, stone). There's no image by default; an image setting is optional.
- **Only jewelry, material or care articles.** No legacy smoking posts.

### 4.8 Newsletter (`pb-newsletter`, anchor `id="signup"`)
- A charcoal panel inside the content width: padding 72, radius 2, two columns.
  - Left: H2 "The next chapter." and "Get collection news and new release updates." (17, `#D9D0C1`).
  - Right: the label "Email address", then the email input and an on-dark button in a row that wraps. The button reads "Notify me" (prelaunch) or "Subscribe" (live). Consent text (13, `#BDB3A3`) is set in the theme editor and must be approved by the owner.
- Mobile: full bleed, single column, full-width button.
- Success: "Thanks. You're on the list." in `role="status"`. Error: Dawn's form errors, in `role="alert"`.

### 4.9 Footer
As §2.8.

---

## 5 · Collection page (`/collections/{handle}`)

1. A breadcrumb (13, stone): Home / {Collection}.
2. H1, the collection title (64 [40]), and its description (17 stone, max 640). No banner image by default.
3. A toolbar row between two hairlines, padding 16 0:
   - **left**, the category buttons (`pb-collection-nav`, from the link list `shop-categories`): height 40, padding 0 18, radius 2, Inter 500 13. The current collection is charcoal-filled with `aria-current="page"`; the others have a 1px line border.
   - **right**, the product count (stone), an "In stock only" availability filter (Dawn facet) and a Sort select.
   - [m] The buttons scroll horizontally. A 2-column bar below them holds the "Filter" button (opens Dawn's drawer) and Sort.
4. The grid: 3-up [m: 2-up], gap 56/28 [m: 32/12], portrait cards (§2.2).
5. Optional promo tile, deferred: Dawn has no in-grid promo, so put the "New to brass?" tile in Dawn `multicolumn` below the grid.
6. Pagination: Dawn's paginated links (crawlable), 24 per page.
7. A help strip (Dawn `multicolumn`, 3 columns, hairline top): Size guide · Jewelry care · Shipping & returns, each with a title, one line and a link.
8. Empty state, when no products match: "Nothing matches those filters." / "Try removing a filter, or browse all jewelry." with a [Reset filters] secondary button. Dawn's string is overridden in `locales`.

Filters: show only availability and price at launch. Add finish or size filters only once real variants exist.

---

## 6 · Product page (`/products/{handle}`)

### 6.1 Layout
- Desktop: gallery **7fr** with info **5fr**, gap 72. The info column is sticky (Dawn `enable_sticky_info`).
- Gallery: an 84px thumbnail column (4:5 thumbs, 1px border, 2px charcoal when selected) and the main 4:5 image. A zoom button top-right (44×44, ivory, 1px line) opens Dawn's lightbox. Mobile: a swipe slider with a counter ("1 / 4") and 4 indicator buttons (44×32 hit area).
- A breadcrumb above: Home / {Collection} / {Product}.

### 6.2 Purchase column (in this order)
1. Title, H1 Cormorant 500 56 [40].
2. Price (Inter 500 20 [18]) from Shopify, with Dawn's unit price and tax note if enabled.
3. Short description, from the `custom.short_description` metafield (16, `--pb-ink-soft`, max 480). Hidden if empty.
4. The Finish picker (§2.5), from the real product option "Finish". Hidden if the product has one finish.
5. The Size picker with a **Size guide** link (§2.5), from the real option "Size". Under it, the fit note from `custom.fit_notes`.
6. The **Add to bag** primary button (56). It reads "Select a size" while disabled and "Sold out" for an unavailable variant. No quantity selector for jewelry by default. Dynamic checkout buttons **off**.
7. A `role="status"` line that confirms the add ("The Junction, Brushed, M / L added to your bag").
8. Service lines (14, `--pb-ink-soft`, bronze line icons) after a hairline: shipping summary and returns summary. They're text blocks the owner sets in the theme editor once policies are confirmed, and hidden until then.
9. Accordions (§2.6): **Description** (product description, open), **Materials & finish** (`custom.material`, `custom.finish`, `custom.patina_notes`), **Dimensions & fit** (`custom.dimensions`, `custom.fit_notes`), **Care** (`custom.care_instructions`), **Shipping & returns** (page reference or a short policy summary). A row with no data is hidden.

### 6.3 Below the fold
- "Wear it with": Dawn `related-products` (Shopify recommendations), 4-up [m: 2-up], portrait. Hidden when empty.
- Reviews: **none** until genuine SKU-specific reviews exist. Then they come from an approved app block.

### 6.4 Mobile sticky add-to-bag (Phase 2B)
- Appears only when (a) a purchasable variant is selected **and** (b) the main button is out of view (IntersectionObserver).
- An ivory bar with a top hairline and padding 12/20. Left: the product name (14/500) over "Finish · Size · Price" (12 stone). Right: the primary button (48).
- It never covers error messages, and it hides while the cart drawer is open.

### 6.5 Cart drawer (Dawn `cart_type: drawer`)
- The title "Your bag (n)", a 44px close button and a focus trap (Dawn native).
- Line items: an 80px 4:5 image, the name (Cormorant 600 20), the price, the options (13 stone), a quantity stepper (44px buttons) and a "Remove" text button.
- Footer: Subtotal, "Taxes and shipping calculated at checkout.", a full-width Check out button. It always goes to native Shopify checkout.

---

## 7 · Content pages

| Page | Structure |
| --- | --- |
| **Our Story** `/pages/our-story` | H1 "Our story"; intro (the brand story, §4.6, long form); `image-with-text`; a closing line with links to the collection and Why Brass. No invented manufacturing history. |
| **Why Brass?** `/pages/why-brass` | H1 "Why brass?"; sections on what brass is (copper-zinc alloy); raw vs coated vs plated; patina and skin discolouration (with a note to stop wearing if irritation develops, which doesn't prove the piece is safe); links to the 2 existing articles; then live collections. |
| **Jewelry Care** `/pages/jewelry-care` | H1; Dawn `collapsible-content`, one row per finish offered (only those confirmed on samples); storage; what to avoid. |
| **Size Guide** `/pages/size-guide` | H1; "How to measure" steps; ring size table (CA/US, mm diameter, mm circumference); cuff guide (inner circumference, opening, wrist range); chain lengths (cm/in, where it sits). **Tables filled only with validated data.** |
| **Contact** | The existing form, plus a note for previous-order support. |

Content pages use `main-page` at an editorial width of 720 (`.page-width--narrow`), H1 Cormorant 56 [40], body 17.

---

## 8 · States summary

| Component | Prelaunch | Live |
| --- | --- | --- |
| Announcement | Launch-list message | Hidden, unless there's a verified message |
| Hero CTA | "Get launch updates" → `#signup` | "Shop jewelry" → `/collections/jewelry` |
| Category tiles | Shown for collections with products, otherwise hidden. Fixtures don't count on the live store. | Shown for live collections |
| Featured | `pb-concept-grid` (Concept badge, no price/link) | `featured-collection` |
| Editorial CTA | "Be first to know" | "Shop bracelets" |
| Newsletter button | "Notify me" | "Subscribe" |
| PDP | Not public (draft fixtures on the dev store only) | Real product |
| Reviews | Hidden | Genuine, SKU-specific only |
| SEO | Homepage indexable with accurate prelaunch metadata. No concept product pages exist. | All live pages indexable |

Switch states in the **theme editor**, by editing section settings and swapping one section. No global flag is needed.

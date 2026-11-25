# 03 · Dawn 16 theme mapping and code

How each part of `02-design-spec.md` is built in this repo. File paths are relative to the repo root. The code below is a **starting skeleton**: run `shopify theme check` and test it before you commit.

> If Phase 0 finds the live theme isn't Dawn 16, keep the same intent (settings first, minimal custom sections) and re-map file names.

---

## 1 · `config/settings_data.json`: global settings (merge into `current`)

Edit through the theme editor where possible, then pull. If editing the JSON by hand, change **only** these keys.

### Colour schemes

| Scheme | Name (rename in editor) | background | text | button | button_label | secondary_button_label | Used by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `scheme-1` | Ivory | `#F5F1E8` | `#242420` | `#242420` | `#F5F1E8` | `#242420` | Default for every section, header, drawers |
| `scheme-2` | Ivory deep | `#EFE9DD` | `#242420` | `#242420` | `#EFE9DD` | `#242420` | Footer |
| `scheme-3` | Charcoal | `#242420` | `#F5F1E8` | `#F5F1E8` | `#242420` | `#F5F1E8` | Announcement, newsletter panel, promo tile, sold-out badge |
| `scheme-4` | Leather | `#584032` | `#F5F1E8` | `#F5F1E8` | `#584032` | `#F5F1E8` | Optional editorial panel |
| `scheme-5` | Stone | `#E4DACA` | `#242420` | `#242420` | `#E4DACA` | `#242420` | Image grounds, sale badge (unused) |

Set `background_gradient` to `""` and `shadow` to `#242420` for every scheme.

### Other settings

```json
"logo_width": 180,
"type_header_font": "<cormorant-garamond handle, weight 500>",
"heading_scale": 100,
"type_body_font": "inter_n4",
"body_scale": 100,
"page_width": 1440,
"spacing_sections": 0,
"spacing_grid_horizontal": 24,
"spacing_grid_vertical": 40,
"animations_reveal_on_scroll": false,
"animations_hover_elements": "none",
"buttons_border_thickness": 1, "buttons_radius": 2, "buttons_shadow_opacity": 0,
"variant_pills_radius": 2, "variant_pills_border_opacity": 100,
"inputs_radius": 2, "inputs_border_opacity": 100,
"card_style": "standard", "card_color_scheme": "scheme-1", "card_shadow_opacity": 0, "card_corner_radius": 0, "card_text_alignment": "left",
"collection_card_style": "standard", "collection_card_color_scheme": "scheme-1", "collection_card_shadow_opacity": 0,
"blog_card_style": "standard", "blog_card_color_scheme": "scheme-1", "blog_card_shadow_opacity": 0,
"media_border_opacity": 0, "media_radius": 0,
"popup_corner_radius": 2, "drawer_shadow_opacity": 0,
"badge_corner_radius": 2, "badge_position": "top left", "sold_out_badge_color_scheme": "scheme-3",
"predictive_search_enabled": true, "predictive_search_show_price": true,
"currency_code_enabled": true,
"cart_type": "drawer", "show_vendor": false, "cart_color_scheme": "scheme-1"
```

Social links: fill only with accounts the owner verifies. Leave the rest blank.

## 2 · Fonts

- **Inter**: in the Shopify font library as `inter_n4` (body). Weights 500 and 600 are produced by `font_modify` in Dawn.
- **Cormorant Garamond**: look in the font picker. If it's listed, use its 500 handle in `type_header_font`. If it isn't, self-host it:
  1. Download the OFL WOFF2 files for **500** and **600** (Latin subset) from the official Google Fonts / Christian Thalmann repo, and add them as `assets/cormorant-garamond-500.woff2` and `assets/cormorant-garamond-600.woff2`. Commit the OFL licence text to `docs/redesign/licences/`.
  2. Declare `@font-face` in `pb-theme.css` (§3) and override `--font-heading-family`.
  3. Preload the 500 weight in `layout/theme.liquid`: `<link rel="preload" href="{{ 'cormorant-garamond-500.woff2' | asset_url }}" as="font" type="font/woff2" crossorigin>`.
- Don't load the Google Fonts CDN in the theme (privacy and performance).

## 3 · `assets/pb-theme.css` (new) and `layout/theme.liquid` (one line)

In `layout/theme.liquid`, directly after `{{ 'base.css' | asset_url | stylesheet_tag }}` (line ~281), add:

```liquid
{{ 'pb-theme.css' | asset_url | stylesheet_tag }}
```

Starting contents:

```css
/* Parkdale Brass design tokens and global overrides on top of Dawn 16 */
/* Remove the @font-face blocks if Cormorant comes from the Shopify font library */
@font-face { font-family: 'Cormorant Garamond'; font-weight: 500; font-style: normal; font-display: swap;
  src: url('cormorant-garamond-500.woff2') format('woff2'); }
@font-face { font-family: 'Cormorant Garamond'; font-weight: 600; font-style: normal; font-display: swap;
  src: url('cormorant-garamond-600.woff2') format('woff2'); }

:root {
  --pb-ivory: #F5F1E8; --pb-ivory-deep: #EFE9DD; --pb-charcoal: #242420; --pb-ink-soft: #3F3B35;
  --pb-stone: #655F56; --pb-bronze: #75552C; --pb-leather: #584032; --pb-brass: #B39255;
  --pb-line: #D9D0C1; --pb-line-strong: #A39A8B; --pb-placeholder: #E4DACA; --pb-placeholder-2: #EAE3D6;
  --pb-disabled: #CFC6B6;
  --pb-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-heading-family: var(--pb-serif);
  --font-heading-weight: 500;
  --pb-section-y: clamp(56px, 7.5vw, 112px);
}

/* Page width: 56px gutters desktop, 20px mobile */
.page-width { padding-left: 2rem; padding-right: 2rem; }
@media screen and (min-width: 990px) { .page-width { padding-left: 5.6rem; padding-right: 5.6rem; } }

/* Headings */
h1, h2, .h0, .h1, .h2 { font-family: var(--pb-serif); font-weight: 500; letter-spacing: 0; }
.h0, .pb-display { font-size: clamp(4.4rem, 5.3vw, 7.6rem); line-height: 0.98; letter-spacing: -0.01em; }
h2, .h1 { line-height: 1.1; }
.card__heading, .pb-product-name { font-family: var(--pb-serif); font-weight: 600; font-size: clamp(2rem, 1.8vw, 2.6rem); line-height: 1.2; }

/* Eyebrow (Dawn "caption" blocks + pb sections) */
.caption-with-letter-spacing, .pb-eyebrow {
  font-family: var(--font-body-family); font-size: 1.2rem; font-weight: 600;
  letter-spacing: 0.22em; text-transform: uppercase; color: var(--pb-bronze);
}
.color-scheme-3 .pb-eyebrow, .color-scheme-3 .caption-with-letter-spacing { color: #D9C59A; }

/* Buttons */
.button, .shopify-payment-button__button--unbranded { font-size: 1.4rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; min-height: 5.2rem; }
.pb-text-cta { display: inline-block; padding: 1.2rem 0; font-size: 1.4rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; text-underline-offset: 0.6rem; color: inherit; }
.pb-text-cta:hover { color: var(--pb-bronze); }

/* Links and focus */
a:hover { color: var(--pb-bronze); }
*:focus-visible { outline: 2px solid var(--pb-bronze) !important; outline-offset: 3px !important; box-shadow: none !important; }

/* Header: uppercase nav and text wordmark */
.header__menu-item { font-size: 1.3rem; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; }
.header__heading-link .h2 { font-family: var(--pb-serif); font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; font-size: clamp(1.9rem, 1.8vw, 2.5rem); }
.header-wrapper { border-bottom: 1px solid var(--pb-line); }

/* Hairlines */
.pb-rule-top { border-top: 1px solid var(--pb-line); }
.pb-rule-y { border-top: 1px solid var(--pb-line); border-bottom: 1px solid var(--pb-line); }

/* Cards: portrait ground, name + price row */
.card__media, .card .media { background: var(--pb-placeholder-2); }
.card-information > .price { font-weight: 500; }

/* Variant pills: square, charcoal selected, dashed unavailable */
.product-form__input input[type='radio'] + label { border-radius: 2px; min-height: 4.8rem; }
.product-form__input input[type='radio']:checked + label { background: var(--pb-charcoal); color: var(--pb-ivory); }
.product-form__input input[type='radio'].disabled + label { border-style: dashed; border-color: var(--pb-line-strong); color: var(--pb-stone); }

/* Accordions */
.product__accordion { border-color: var(--pb-line); }
.product__accordion:first-of-type { border-top-color: var(--pb-charcoal); }
.accordion__title { font-family: var(--font-body-family); font-size: 1.5rem; font-weight: 500; }

/* Rich text tables (size guide) */
.rte table { width: 100%; border-collapse: collapse; font-size: 1.5rem; }
.rte th, .rte td { border-bottom: 1px solid var(--pb-line); padding: 1rem 1.2rem; text-align: left; }
.rte th { font-weight: 600; }

/* Image placeholders (preview only) */
.pb-placeholder { background: var(--pb-placeholder); display: flex; align-items: center; justify-content: center; position: relative; }
.pb-placeholder__note { position: absolute; left: 2rem; bottom: 1.8rem; background: var(--pb-ivory); color: #4F4A43; font-size: 1.2rem; padding: 0.6rem 1rem; }

@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }
```

Dawn sets `html { font-size: 62.5% }`, so `1rem = 10px`. Check the generated `--font-heading-family` order: Dawn writes it inline in `theme.liquid`, so `pb-theme.css` must load **after** that `<style>` block. If it doesn't, scope the overrides to `:root:root` instead.

## 4 · Custom sections

Shared conventions: every `pb-*` section uses `color_scheme` (default `scheme-1`), `padding_top` and `padding_bottom` (0–160 step 8, defaults 104/0) rendered with Dawn's `.section-{{ section.id }}-padding` pattern (×0.6 under 750px), `t:` labels, and presets. Merchant text uses `| escape`. Richtext and inline_richtext are output raw (Shopify sanitises them).

### 4.1 `sections/pb-hero.liquid`

```liquid
{{ 'section-image-banner.css' | asset_url | stylesheet_tag }}
{%- style -%}
  .pb-hero { display: grid; grid-template-columns: minmax(0,1fr); border-bottom: 1px solid var(--pb-line); }
  .pb-hero__text { padding: 4rem 2rem 3.2rem; display: flex; flex-direction: column; gap: 1.8rem; }
  .pb-hero__body { font-size: 1.6rem; color: var(--pb-stone); max-width: 42rem; margin: 0; }
  .pb-hero__actions { display: flex; flex-direction: column; gap: 0.8rem; margin-top: 0.6rem; }
  .pb-hero__actions .button { width: 100%; }
  .pb-hero__media { position: relative; min-height: 42rem; background: var(--pb-placeholder); }
  .pb-hero__media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .pb-hero__media .pb-hero__img--desktop { display: none; }
  @media screen and (min-width: 750px) {
    .pb-hero { grid-template-columns: minmax(0,5fr) minmax(0,7fr); min-height: 72rem; max-width: 144rem; margin: 0 auto; }
    .pb-hero__text { padding: 9.6rem 6.4rem 9.6rem 5.6rem; justify-content: center; gap: 2.8rem; }
    .pb-hero__body { font-size: 1.8rem; }
    .pb-hero__actions { flex-direction: row; align-items: center; gap: 2.8rem; }
    .pb-hero__actions .button { width: auto; }
    .pb-hero__media .pb-hero__img--desktop { display: block; }
    .pb-hero__media .pb-hero__img--mobile { display: none; }
  }
{%- endstyle -%}
<section class="color-{{ section.settings.color_scheme }} gradient" aria-labelledby="PbHero-{{ section.id }}">
  <div class="pb-hero">
    <div class="pb-hero__text">
      {%- if section.settings.eyebrow != blank -%}<p class="pb-eyebrow">{{ section.settings.eyebrow | escape }}</p>{%- endif -%}
      <h1 id="PbHero-{{ section.id }}" class="pb-display">{{ section.settings.heading }}</h1>
      {%- if section.settings.text != blank -%}<p class="pb-hero__body">{{ section.settings.text | escape }}</p>{%- endif -%}
      <div class="pb-hero__actions">
        {%- if section.settings.button_label != blank -%}
          <a class="button button--primary" href="{{ section.settings.button_link | default: '#' }}">{{ section.settings.button_label | escape }}</a>
        {%- endif -%}
        {%- if section.settings.link_label != blank -%}
          <a class="pb-text-cta" href="{{ section.settings.link_url }}">{{ section.settings.link_label | escape }}</a>
        {%- endif -%}
      </div>
    </div>
    <div class="pb-hero__media">
      {%- assign desktop_img = section.settings.image -%}
      {%- assign mobile_img = section.settings.image_mobile | default: section.settings.image -%}
      {%- if desktop_img != blank -%}
        {{ desktop_img | image_url: width: 2400 | image_tag: class: 'pb-hero__img--desktop', widths: '750, 1100, 1500, 1800, 2400', sizes: '(min-width: 750px) 58vw, 100vw', loading: 'eager', fetchpriority: 'high', alt: desktop_img.alt }}
        {{ mobile_img | image_url: width: 1200 | image_tag: class: 'pb-hero__img--mobile', widths: '400, 600, 800, 1200', sizes: '100vw', loading: 'eager', alt: mobile_img.alt }}
      {%- else -%}
        <div class="pb-placeholder" style="position:absolute;inset:0">{{ 'lifestyle-1' | placeholder_svg_tag: 'placeholder-svg' }}</div>
      {%- endif -%}
    </div>
  </div>
</section>
{% schema %}
{
  "name": "PB · Hero",
  "tag": "div",
  "class": "section",
  "settings": [
    { "type": "text", "id": "eyebrow", "label": "Eyebrow", "default": "PARKDALE BRASS · EST. 2019" },
    { "type": "inline_richtext", "id": "heading", "label": "Heading", "default": "Made to wear.<br>Made to age." },
    { "type": "text", "id": "text", "label": "Text", "default": "Brass jewelry with character. Inspired by industrial design and rooted in Toronto." },
    { "type": "text", "id": "button_label", "label": "Button label", "default": "Get launch updates", "info": "Prelaunch: Get launch updates → #signup. Live: Shop jewelry → All Jewelry." },
    { "type": "url", "id": "button_link", "label": "Button link" },
    { "type": "text", "id": "link_label", "label": "Secondary link label", "default": "Discover our story" },
    { "type": "url", "id": "link_url", "label": "Secondary link" },
    { "type": "image_picker", "id": "image", "label": "Image (desktop)" },
    { "type": "image_picker", "id": "image_mobile", "label": "Image (mobile crop)" },
    { "type": "color_scheme", "id": "color_scheme", "label": "t:sections.all.colors.label", "default": "scheme-1" }
  ],
  "presets": [{ "name": "PB · Hero" }]
}
{% endschema %}
```

The `heading` setting allows `<br>` through inline_richtext. Use the image's focal point (set in Admin) with `object-position` if a crop needs it.

### 4.2 `sections/pb-category-tiles.liquid`

- Settings: `heading` (text, "Shop by category"), `show_view_all` (checkbox) + `view_all_link` (url), color_scheme, padding.
- Blocks `collection` (max 4): `collection` (collection picker), `label` (text, optional override), `image` (image_picker, optional override, otherwise `collection.featured_image`).
- Logic:

```liquid
{%- liquid
  assign visible = 0
  for block in section.blocks
    if block.settings.collection != blank and block.settings.collection.products_count > 0
      assign visible = visible | plus: 1
    endif
  endfor
-%}
{%- if visible > 0 -%}
  <ul class="pb-tiles" style="--pb-cols: {{ visible }}" role="list">
    {%- for block in section.blocks -%}
      {%- assign c = block.settings.collection -%}
      {%- if c != blank and c.products_count > 0 -%}
        <li {{ block.shopify_attributes }}>
          <a href="{{ c.url }}" class="pb-tile">
            <div class="pb-tile__media">{{ block.settings.image | default: c.featured_image | image_url: width: 900 | image_tag: widths: '300, 450, 600, 900', sizes: '(min-width: 750px) 30vw, 50vw', loading: 'lazy' }}</div>
            <span class="pb-tile__label">{{ block.settings.label | default: c.title | escape }} <span aria-hidden="true">→</span></span>
          </a>
        </li>
      {%- endif -%}
    {%- endfor -%}
  </ul>
{%- endif -%}
```

CSS: `.pb-tiles{display:grid;gap:1.2rem;grid-template-columns:repeat(2,minmax(0,1fr))}`, and at ≥750px `repeat(var(--pb-cols),minmax(0,1fr))` with gap 2.4rem. Media `aspect-ratio:4/5; overflow:hidden; background:var(--pb-placeholder)`, img `object-fit:cover`. Label: Inter 500 1.5rem, 0.12em, uppercase, flex space-between, margin-top 1.6rem. `.pb-tile:hover .pb-tile__label{text-decoration:underline}`.

`products_count` counts products published to the Online Store. Confirm on the store that draft fixtures don't count.

### 4.3 `sections/pb-concept-grid.liquid` (prelaunch only)

- Settings: `eyebrow` ("COMING SOON"), `heading` ("The first collection"), `note` (text: "Concepts in development. Designs, finishes and prices may change before release."), `badge_label` ("Concept"), color_scheme, padding.
- Blocks `concept` (max 6): `image` (image_picker), `name` (text), `descriptor` (text), `link` (url, optional; defaults to none. Use `#signup`, **never** a product URL).
- Markup: a `<ul>` 4-up [2-up] of `<li><article>`. Inside: the image in a 4:5 box with a `<span class="pb-badge">` badge, then an `<h3 class="pb-product-name">` and a `<p>` descriptor. **No price element, no `product` JSON-LD, no add-to-cart.** With no image, render `.pb-placeholder` plus `placeholder_svg_tag`.

### 4.4 `sections/pb-editorial-banner.liquid`

- Settings: `image`, `image_mobile`, `heading` ("Considered forms. Everyday character."), `link_label`, `link_url`, color_scheme, padding.
- Desktop: `<figure>` with a 21:9 `aspect-ratio` and `object-fit:cover`. Below it a flex row (wrap, gap 3.2rem, space-between, align-end): `<h2 class="h1">` max 62rem and `<a class="pb-text-cta">`.
- Mobile: full bleed (negative margins or outside `.page-width`), 4:5, using the mobile image. Lazy-loaded.

### 4.5 `sections/pb-journal-picks.liquid`

- Settings: `heading` ("From the journal"), `view_all_label` ("All articles"), `blog` (blog picker, for the view-all URL), color_scheme, padding.
- Blocks `article` (max 3): `article` (article picker), `tag_label` (text, optional; otherwise the article's first tag), `show_image` (checkbox, default off).
- Card: `<li class="pb-rule-top" style="padding-top:2rem">`, then the eyebrow, `<h3><a href="{{ a.url }}">{{ a.title | escape }}</a></h3>` (Cormorant 600 2.8rem) and `<p>{{ a.excerpt_or_content | strip_html | truncatewords: 22 }}</p>` (1.5rem stone).
- If an article block is empty or the article was deleted, skip it. If no valid articles remain, render nothing.

### 4.6 `sections/pb-newsletter.liquid`

Reuse Dawn's form exactly: `{% form 'customer', id: 'PbNewsletter-{{ section.id }}' %}` with `<input type="hidden" name="contact[tags]" value="newsletter">`, `name="contact[email]"`, plus the error and success handling copied from `sections/newsletter.liquid` (lines 48–120).

- Settings: `anchor_id` (text, default `signup`, rendered as the wrapper `id`), `heading` ("The next chapter."), `text` ("Get collection news and new release updates."), `button_label` ("Notify me"), `consent` (richtext, **no default legal text**; the owner must enter it), `color_scheme` (default `scheme-3`), padding.
- Layout: a charcoal panel inside `.page-width`, padding 7.2rem, radius 2px, grid 1fr 1fr at ≥990px, single column below. Visible `<label>`, input height 5.2rem with a transparent ground and a 1px `#A39A8B` border, on-dark button.
- Success: `<p role="status">{{ 'newsletter.success' | t }}</p>`. Error: `<p role="alert" id="…-error">`, with `aria-describedby` on the input.

### 4.7 `sections/pb-collection-nav.liquid`

- Settings: `menu` (link_list, default `shop-categories`), show_count (checkbox).
- For each `link` in the menu, render `<a class="pb-pill" href="{{ link.url }}" {% if link.current %}aria-current="page"{% endif %}>{{ link.title | escape }}</a>`, then hide any link whose `link.object.products_count == 0`.
- Wrap the links in `<nav aria-label="{{ 'pb.collection.categories' | t }}">`. On mobile it scrolls horizontally (`overflow-x:auto; scroll-snap-type:x proximity`).
- Pill CSS: height 4rem, padding 0 1.8rem, 1px `--pb-line`, radius 2px, 1.3rem/500. `[aria-current]` gets a charcoal fill and ivory text.

## 5 · `templates/product.json` composition

`main-product` blocks in order. Settings: `media_position: left`, `media_size: large` (≈ 7/5), `gallery_layout: thumbnail`, `mobile_thumbnails: hide` (slider + counter), `image_zoom: lightbox`, `enable_sticky_info: true`, `hide_variants: true`, `media_fit: cover`.

| # | Block type | Settings / source |
| --- | --- | --- |
| 1 | `title` | n/a |
| 2 | `price` | n/a |
| 3 | `text` | `text`: dynamic source `product.metafields.custom.short_description` |
| 4 | `variant_picker` | `picker_type: button`, `swatch_shape: circle` (Finish swatches come from Shopify's category-metafield colour swatches, or plain buttons) |
| 5 | `popup` | `text: "Size guide"`, `page: size-guide` |
| 6 | `text` | Fit note: `product.metafields.custom.fit_notes` |
| 7 | `buy_buttons` | `show_dynamic_checkout: false`, `show_gift_card_recipient: false` |
| 8 | `text` | Shipping summary (owner-approved text; leave blank until then) |
| 9 | `collapsible_tab` | heading "Description", content `{{ product.description }}`. Dawn has no open-by-default option for this block, so add one (below). |
| 10 | `collapsible_tab` | "Materials & finish": material, finish and patina metafields |
| 11 | `collapsible_tab` | "Dimensions & fit": dimensions and fit metafields |
| 12 | `collapsible_tab` | "Care": `custom.care_instructions` |
| 13 | `collapsible_tab` | "Shipping & returns": `page` = shipping-returns page, or the summary text |

Remove the `vendor`, `quantity_selector` and `share` blocks and the `description` block (it's in the accordion now). Then `related-products`: heading "Wear it with", `image_ratio: portrait`, 4 desktop / 2 mobile, `show_secondary_image: true`, `show_rating: false`. Keep `disclosures` (renders only if Shopify disclosure metafields exist).

Connect the metafields through the theme editor's **dynamic source** picker; don't hand-write them in JSON.

**Required Dawn edits in `sections/main-product.liquid`** (small; record each in the changelog):

1. **Hide empty accordions.** Wrap the `when 'collapsible_tab'` markup (line ~213) in `{%- if block.settings.content != blank or block.settings.page != blank -%} … {%- endif -%}`.
2. **Open by default.** Add a checkbox `open` to the `collapsible_tab` schema and render `<details … {% if block.settings.open %}open{% endif %}>`.
3. **Size guide placement:** the popup block renders as its own line under the picker. That's acceptable. For it to sit inline in the "Size" legend, add a snippet override in `snippets/product-variant-options.liquid` that renders a size-guide link when `option.name` is "Size" (optional, Phase 2B).
4. **Add to bag label.** Override the string in `locales/en.default.json`: `products.product.add_to_cart` → "Add to bag". Keep `products.product.unavailable` ("Unavailable") and `sold_out` as they are; they describe real states.
5. **"Select a size" start state (optional, Phase 2B).** Dawn pre-selects the first available variant, so the design's disabled "Select a size" button doesn't happen natively. Ship Dawn's behaviour first. Build the no-preselection state only if the owner wants it, by rendering the Size radios unchecked when there's no `?variant=` in the URL and disabling the submit button until `variant:change`. Test it hard against Dawn's `product-info.js`.

## 6 · Locales (`locales/en.default.json` + `en.default.schema.json`)

Add:

```json
"pb": {
  "badge": { "concept": "Concept" },
  "collection": { "categories": "Categories", "empty_heading": "Nothing matches those filters.", "empty_text": "Try removing a filter, or browse all jewelry.", "reset": "Reset filters" },
  "journal": { "view_all": "All articles" },
  "newsletter": { "success": "Thanks. You're on the list." },
  "sticky_atc": { "label": "Add to bag" }
}
```

Override: `products.product.add_to_cart` = "Add to bag", `general.cart.title` = "Your bag", `sections.cart.title` = "Your bag". Keep other locales untouched (fallback to English, or ask the owner about the French market).

## 7 · Header and footer groups

`sections/header-group.json`:
- `announcement-bar`: one block, `color_scheme: scheme-3`, text "The first Parkdale Brass jewelry collection is in development.", link `#signup` (Dawn shows the whole bar as a link). Remove the block entirely at launch if there's no verified message.
- `header`: `menu: jewelry-main-menu`, `menu_type_desktop: dropdown`, `logo_position: middle-left`, `mobile_logo_position: center`, `sticky_header_type: on-scroll-up`, `show_line_separator: true`, `enable_country_selector: false` (the footer has it), `enable_language_selector: false`, padding 16/16.

`sections/footer-group.json` (`footer`):
- `color_scheme: scheme-2`, `newsletter_enable: false`, `enable_follow_on_shop: false` unless the owner wants it, `show_social: true` (renders only filled links), `enable_country_selector: true`, `payment_enable` per owner, `show_policy: true`.
- Blocks:
  1. `brand_information` (uses the theme settings `brand_headline` "Brass jewelry with character.", `brand_description` "Est. 2019, Toronto.");
  2. `link_list` "Shop" → `footer-shop`;
  3. `link_list` "Learn" → `footer-learn`;
  4. `link_list` "Help" → `footer-help`.

## 8 · Collection template

`templates/collection.json`:

1. `main-collection-banner`: `show_collection_description: true`, `show_collection_image: false`.
2. `pb-collection-nav`: menu `shop-categories`.
3. `main-collection-product-grid`: `products_per_page: 24`, `columns_desktop: 3`, `columns_mobile: "2"`, `image_ratio: portrait`, `show_secondary_image: true`, `show_vendor: false`, `show_rating: false`, `enable_filtering: true`, `filter_type: horizontal`, `enable_sorting: true`, `quick_add: none`.
4. `multicolumn`: 3 columns, no images, title + text + link (Size guide / Jewelry care / Shipping & returns), `color_scheme: scheme-1`. Add the class `pb-rule-top` with a `custom-liquid` wrapper if needed.

In Admin → Search & Discovery, filters should be **Availability** and **Price** only (owner approval; it's store-level).

## 9 · `templates/index.json` (prelaunch)

```text
order: pb_hero, pb_categories, pb_concepts, material, editorial, story, journal, signup
pb_hero          → PB · Hero (button "Get launch updates" → #signup, link "Discover our story" → /pages/our-story)
pb_categories    → PB · Category tiles (blocks: bracelets, necklaces, rings)
pb_concepts      → PB · Concept grid (4 concept blocks; replaced by featured-collection at launch)
material         → image-with-text (image left, caption "THE MATERIAL", heading, 2 text blocks, secondary button "Why brass?"), section class pb-rule-y via color/padding settings
editorial        → PB · Editorial banner (link "Be first to know" → #signup)
story            → image-with-text (image right, caption "OUR STORY", heading "Rooted in Parkdale.", text, secondary button "Our story")
journal          → PB · Journal picks (what-is-brass-jewelry-metal, gold-plated-brass-jewelry, care article once published)
signup           → PB · Newsletter (anchor "signup", scheme-3)
```

`image-with-text` settings for both editorial splits: `height: adapt`, `desktop_image_width: medium`, `layout: image_first` (material) or `text_first` (story), `desktop_content_position: middle`, `content_layout: no-overlap`, `color_scheme: scheme-1`. Set the headings to size `h1` (≈ 48px with the scale), and make the button blocks `button_style_secondary: true`.

## 10 · SEO plumbing (theme side)

- `snippets/meta-tags.liquid` already outputs OG and Twitter tags. Set the homepage title and description in Admin → Preferences (store-level; owner approval). Suggested copy is in 04 §5.
- Product JSON-LD: Dawn outputs `{{ product | structured_data }}` in `main-product`. That's correct for real products only. `pb-concept-grid` must not emit any.
- Add an `Organization` JSON-LD in `layout/theme.liquid` on the homepage only, with the name, URL, logo and verified `sameAs` social URLs.
- Breadcrumbs: add `BreadcrumbList` JSON-LD in a `snippets/pb-breadcrumbs.liquid` rendered on collection and product pages, along with the visible breadcrumb (`<nav aria-label="Breadcrumb"><ol>`).

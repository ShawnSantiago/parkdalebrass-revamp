# 03 · Dawn 16 theme mapping and code

How each part of `02-design-spec.md` is built in this repo. File paths are relative to the repo root. The code below is a **starting skeleton**: run `shopify theme check` and test it before you commit.

> If Phase 0 finds the live theme isn't Dawn 16, keep the same intent (settings first, minimal custom sections) and re-map file names.

---

## 0 · The rule: the design leads, the theme follows (D-21)

`02-design-spec.md` and the canvas page B are the target. Dawn is a set of parts, not a constraint.

1. **Use a Dawn section or setting only if it reproduces the spec exactly**: layout, proportions, type, colour, ornament, states and responsive behaviour, with settings and `pb-theme.css` alone.
2. If it gets close but not exact, either **make a small, marked Dawn edit** (`PB:` markers, logged in the CHANGELOG) or **build a `pb-*` section**. Prefer the custom section when the Dawn edit would touch more than about 20 lines, or would fight Dawn's JavaScript.
3. **Never quietly simplify the design** to fit Dawn. Any visible deviation needs owner approval and a decision entry first. Until then, the item is unfinished, not "acceptable".
4. Platform limits that genuinely can't be met (checkout, Shopify-rendered emails, app widgets) are listed as known deviations in `05-qa-checklist.md` §9.

### How each part of the design is built

| Design element (02) | Built with | Why |
| --- | --- | --- |
| Header, nav, wordmark + diamond, announcement | Dawn `header`, `announcement-bar` + `pb-theme.css` | Matches with CSS |
| Footer desktop | Dawn `footer` + CSS | Matches with CSS |
| Footer mobile accordions | **Dawn edit** `sections/footer.liquid` (§7) | Dawn stacks the groups instead of collapsing them |
| Hero | **`pb-hero`** | Framed lockup, two buttons, mobile order |
| Category tiles / mobile rows | **`pb-category-tiles`** | Hides empty collections; tiles become rows on mobile |
| Featured (prelaunch concepts and live products) | **`pb-featured`** | Centred ruled head, gold-outline badge, button below, concept mode without prices |
| Material story, Our story | **`pb-split`** | Exact 1:1 full-bleed green and 6fr/5fr with an 88px gap; double-framed image |
| Editorial banner + divider | **`pb-editorial-banner`** | Framed image, copy below |
| Journal | **`pb-journal-picks`** | Hand-picked articles, numerals |
| Signup | **`pb-newsletter`** | Green double frame, centred |
| Collection head + category pills | **`pb-collection-header`** | Centred diamond head, live-category line, pills |
| Collection grid, filters, sort, pagination | Dawn `main-collection-product-grid` + CSS + **Dawn edit** (promo tile) | Filtering logic stays native |
| Collection help strip | Dawn `multicolumn` + CSS | Matches with CSS (hide the arrow icon, gold caps links) |
| Product gallery (left thumbnail column, framed main image, mobile counter) | Dawn `main-product` + **Dawn edit** (§5.6) + CSS | Dawn puts thumbnails below the main image |
| Product info, options, accordions | Dawn `main-product` blocks + **Dawn edits** (§5) | Keeps Dawn's variant and cart JavaScript |
| "Select a size" start state, inline size-guide link | **Dawn edits** (§5.3, §5.5) | Required by the design |
| Mobile sticky add-to-bag | **`snippets/pb-sticky-atc.liquid` + `assets/pb-sticky-atc.js`** (§4.10) | Not in Dawn |
| Recommendations | Dawn `related-products` + CSS (centred head, diamond) | Matches with CSS |
| Cart drawer | Dawn `cart-drawer` + CSS | Matches with CSS |
| Content pages (Our Story, Why Brass, Care, Size Guide) | **`pb-page`** (+ `pb-split`, Dawn `collapsible-content`) | Centred diamond head with caps H1 and dateline |
| Blog / article | Dawn + CSS | Matches with CSS. Verify in QA. |
| Cart quantity edits; predictive search | **Dawn edits** to `assets/cart.js` and `assets/predictive-search.js` | Fix two Dawn 16 bugs customers would hit (D-25; `phase-2-brief.md` §2.10) |

## 1 · `config/settings_data.json`: global settings (merge into the active preset)

In this checkout `current` is the preset name `Dawn`. Merge these keys into `presets.Dawn`. If a later theme-editor export stores the settings directly in a `current` object, merge there.

### Colour schemes

| Scheme | Name (rename in editor) | background | text | button | button_label | secondary_button_label | Used by |
| --- | --- | --- | --- | --- | --- | --- | --- |
Direction B "Archive" (decision D-19). Dawn derives button hover, borders and secondary text from these values, and `pb-theme.css` (§3) fine-tunes them.

| Scheme | Name (rename in editor) | background | text | button | button_label | secondary_button_label | Used by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `scheme-1` | Onyx | `#121211` | `#F2EBDD` | `#C2A266` | `#121211` | `#C2A266` | Default for every section, header, drawers, cards |
| `scheme-2` | Onyx deep | `#0D0D0C` | `#F2EBDD` | `#C2A266` | `#121211` | `#C2A266` | Footer |
| `scheme-3` | Royal green | `#173F31` | `#F2EBDD` | `#C2A266` | `#121211` | `#C2A266` | Announcement, material story, newsletter, promo tile |
| `scheme-4` | Onyx raised | `#1B1A18` | `#F2EBDD` | `#C2A266` | `#121211` | `#C2A266` | Image grounds, help strip (optional) |
| `scheme-5` | Gold | `#C2A266` | `#121211` | `#121211` | `#C2A266` | `#121211` | Sold-out / sale badge only |

Set `background_gradient` to `""` and `shadow` to `#000000` for every scheme (shadows are disabled anyway).

### Other settings

```json
"logo_width": 180,
"type_header_font": "<cormorant-garamond handle, weight 600>",
"heading_scale": 100,
"type_body_font": "inter_n4",
"body_scale": 100,
"page_width": 1400,
"spacing_sections": 0,
"spacing_grid_horizontal": 24,
"spacing_grid_vertical": 40,
"animations_reveal_on_scroll": false,
"animations_hover_elements": "default",
"buttons_border_thickness": 1, "buttons_radius": 2, "buttons_shadow_opacity": 0,
"variant_pills_radius": 2, "variant_pills_border_opacity": 100,
"inputs_radius": 2, "inputs_border_opacity": 100,
"card_style": "standard", "card_color_scheme": "scheme-1", "card_shadow_opacity": 0, "card_corner_radius": 0, "card_text_alignment": "left",
"collection_card_style": "standard", "collection_card_color_scheme": "scheme-1", "collection_card_shadow_opacity": 0,
"blog_card_style": "standard", "blog_card_color_scheme": "scheme-1", "blog_card_shadow_opacity": 0,
"media_border_opacity": 0, "media_radius": 0,
"popup_corner_radius": 2, "drawer_shadow_opacity": 0,
"badge_corner_radius": 0, "badge_position": "top left", "sold_out_badge_color_scheme": "scheme-1", "sale_badge_color_scheme": "scheme-5",
"predictive_search_enabled": true, "predictive_search_show_price": true,
"currency_code_enabled": true,
"cart_type": "drawer", "show_vendor": false, "cart_color_scheme": "scheme-1"
```

Two values here are constrained by Dawn's schema, so check them against `config/settings_schema.json` rather than guessing:
- **`page_width`** is a slider from 1000 to 1600 in steps of 100, so 1440 can't be set. Use **1400**. `pb-theme.css` overrides `--page-width` to exactly `144rem` (§3); the setting just has to be valid.
- **`animations_hover_elements`** accepts `default`, `vertical-lift` and `3d-lift`. **`default`** is the no-lift option. The gold-hover behaviour comes from `pb-theme.css`.


Social links: fill only with accounts the owner verifies. Leave the rest blank.

## 2 · Fonts

- **Inter**: in the Shopify font library as `inter_n4` (body). Weights 500 and 600 are produced by `font_modify` in Dawn.
- **Cormorant Garamond**: look in the font picker. If it's listed, use its 500 handle in `type_header_font`. If it isn't, self-host it:
  1. Download the OFL WOFF2 files for **500** and **600** (Latin subset) from the official Google Fonts / Christian Thalmann repo, and add them as `assets/cormorant-garamond-500.woff2` and `assets/cormorant-garamond-600.woff2`. Commit the OFL licence text to `docs/redesign/licences/`.
  2. Declare `@font-face` in `pb-theme.css` (§3) and override `--font-heading-family`.
  3. Preload the 600 weight used by the wordmark and hero, following the design spec (§1.2).
- Don't load the Google Fonts CDN in the theme (privacy and performance).

## 3 · `assets/pb-theme.css` (new) and `layout/theme.liquid` (one line)

In `layout/theme.liquid`, directly after `{{ 'base.css' | asset_url | stylesheet_tag }}` (line ~281), add:

```liquid
{{ 'pb-theme.css' | asset_url | stylesheet_tag }}
```

Starting contents:

```css
/* Parkdale Brass design tokens and global overrides on top of Dawn 16 (Direction B "Archive") */
/* Remove the @font-face blocks if Cormorant comes from the Shopify font library */
@font-face { font-family: 'Cormorant Garamond'; font-weight: 500; font-style: normal; font-display: swap;
  src: url('cormorant-garamond-500.woff2') format('woff2'); }
@font-face { font-family: 'Cormorant Garamond'; font-weight: 600; font-style: normal; font-display: swap;
  src: url('cormorant-garamond-600.woff2') format('woff2'); }

:root {
  --pb-onyx: #121211; --pb-onyx-raised: #1B1A18; --pb-onyx-deep: #0D0D0C;
  --pb-rule: #2E2A24; --pb-rule-strong: #4A4234;
  --pb-ivory: #F2EBDD; --pb-body: #D8D0C0; --pb-muted: #B5AB98;
  --pb-gold: #C2A266; --pb-gold-hover: #D4B67C; --pb-gold-pale: #E6CF9C; --pb-gold-line: #7D6840;
  --pb-green: #173F31; --pb-green-deep: #12342A; --pb-on-green: #E3DCCB;
  --pb-serif: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  --font-heading-family: var(--pb-serif);
  --font-heading-weight: 500;
  /* Exact 1440px max width (02 §1.3). Dawn's slider can't be set to 1440 (steps of 100), so the setting is 1400 and this overrides it. */
  --page-width: 144rem;
}

/* Page width: 56px gutters desktop, 20px mobile */
.page-width { padding-left: 2rem; padding-right: 2rem; }
@media screen and (min-width: 990px) { .page-width { padding-left: 5.6rem; padding-right: 5.6rem; } }

body { color: var(--pb-body); }
.rte, .rte p { color: var(--pb-body); }

/* Headings */
h1, h2, .h0, .h1, .h2 { font-family: var(--pb-serif); font-weight: 500; letter-spacing: 0; color: var(--pb-ivory); }
h1, .h0, .pb-display { font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; line-height: 1.02; }
.pb-display { font-size: clamp(4rem, 4.4vw, 6.4rem); letter-spacing: 0.03em; }
h2, .h1 { line-height: 1.08; }
.card__heading, .pb-product-name { font-family: var(--pb-serif); font-weight: 600; font-size: clamp(2rem, 1.8vw, 2.6rem); line-height: 1.2; color: var(--pb-ivory); }

/* Eyebrows, datelines (Dawn "caption" blocks + pb sections) */
.caption-with-letter-spacing, .pb-eyebrow {
  font-family: var(--font-body-family); font-size: 1.2rem; font-weight: 500;
  letter-spacing: 0.32em; text-transform: uppercase; color: var(--pb-gold);
}
.pb-eyebrow--ruled { display: inline-flex; align-items: center; gap: 1.6rem; }
.pb-eyebrow--ruled::before, .pb-eyebrow--ruled::after { content: ''; width: 4rem; height: 1px; background: var(--pb-gold); }
.pb-dateline { font-size: 1.3rem; font-weight: 500; letter-spacing: 0.42em; color: var(--pb-gold); text-transform: uppercase; }

/* Ornaments (02 §1.5) */
.pb-frame { border: 1px solid var(--pb-gold); border-radius: 4px; padding: 1rem; }
.pb-frame > .pb-frame__inner { border: 1px solid var(--pb-gold-line); }
@media screen and (max-width: 749px) { .pb-frame { padding: 0.8rem; } }
.pb-diamond { display: inline-block; width: 1.8rem; height: 1.8rem; border: 1.5px solid var(--pb-gold); transform: rotate(45deg); flex: none; }
.pb-diamond--sm { width: 1rem; height: 1rem; } .pb-diamond--md { width: 1.4rem; height: 1.4rem; } .pb-diamond--lg { width: 2.6rem; height: 2.6rem; }
.pb-divider { display: flex; align-items: center; justify-content: center; gap: 1.8rem; }
.pb-divider::before, .pb-divider::after { content: ''; width: 12rem; height: 1px; background: var(--pb-gold-line); }
@media screen and (max-width: 749px) { .pb-divider::before, .pb-divider::after { width: 8rem; } }

/* Buttons: gold primary, gold outline secondary */
.button, .shopify-payment-button__button--unbranded { font-size: 1.3rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; min-height: 5.2rem; border-radius: 2px; }
.button--primary:hover { background-color: var(--pb-gold-hover); }
.button--secondary:hover { background: var(--pb-gold); color: var(--pb-onyx); }
.pb-text-cta { display: inline-block; padding: 1.2rem 0; font-size: 1.3rem; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; text-underline-offset: 0.6rem; color: var(--pb-gold); }
.pb-text-cta:hover { color: var(--pb-gold-pale); }

/* Links and focus */
a:hover { color: var(--pb-gold); }
*:focus-visible { outline: 2px solid var(--pb-gold-pale) !important; outline-offset: 3px !important; box-shadow: none !important; }

/* Header: spaced wordmark, uppercase nav */
.header-wrapper { border-bottom: 1px solid var(--pb-rule); }
.header__menu-item { font-size: 1.2rem; font-weight: 500; letter-spacing: 0.24em; text-transform: uppercase; color: var(--pb-ivory); }
.header__menu-item:hover, .header__active-menu-item { color: var(--pb-gold); }
.header__heading-link .h2 { font-family: var(--pb-serif); font-weight: 600; letter-spacing: 0.32em; text-transform: uppercase; font-size: clamp(1.7rem, 1.6vw, 2.3rem); color: var(--pb-ivory); }
.header__heading-link .h2::before { content: ''; display: inline-block; width: 1rem; height: 1rem; border: 1.5px solid var(--pb-gold); transform: rotate(45deg); margin-right: 1.4rem; vertical-align: 0.15em; }
.announcement-bar__message { font-size: 1.2rem; font-weight: 500; letter-spacing: 0.18em; text-transform: uppercase; color: var(--pb-gold-pale); }

/* Footer */
.footer { border-top: 1px solid var(--pb-gold-line); }
.footer-block__heading { font-family: var(--font-body-family); font-size: 1.1rem; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: var(--pb-gold); }

/* Cards: dark ground, rule border, gold on hover, gold price */
.card__media, .card .media { background: var(--pb-onyx-raised); }
.card-wrapper .card__inner { border: 1px solid var(--pb-rule); }
.card-wrapper:hover .card__inner { border-color: var(--pb-gold); }
.card-information .price, .price-item--regular { color: var(--pb-gold); font-weight: 500; }
.badge { border: 1px solid var(--pb-gold); background: transparent; color: var(--pb-gold); font-size: 1rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; border-radius: 0; }

/* Inputs */
.field__input, .select__select, .customer .field input { background: var(--pb-onyx-raised); color: var(--pb-ivory); border-radius: 2px; }
.field:after, .select:after { box-shadow: 0 0 0 1px var(--pb-gold); }
.color-scheme-3 .field__input { background: var(--pb-green-deep); }

/* Variant pills: gold selected, dashed unavailable */
.product-form__input input[type='radio'] + label { border-radius: 2px; min-height: 4.8rem; background: var(--pb-onyx); color: var(--pb-ivory); border-color: var(--pb-rule-strong); }
.product-form__input input[type='radio']:checked + label { background: var(--pb-gold); color: var(--pb-onyx); border-color: var(--pb-gold); }
.product-form__input input[type='radio'].disabled + label { border-style: dashed; border-color: #5C5446; color: #8E8576; }
.product-form__input .form__label { font-size: 1.2rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; }

/* Accordions */
.product__accordion { border-color: var(--pb-rule); }
.product__accordion:first-of-type { border-top-color: var(--pb-gold); }
.accordion__title { font-family: var(--font-body-family); font-size: 1.3rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; }
.accordion summary .icon-caret { color: var(--pb-gold); }

/* Rich text tables (size guide) */
.rte table { width: 100%; border-collapse: collapse; font-size: 1.5rem; }
.rte th, .rte td { border-bottom: 1px solid var(--pb-rule); padding: 1rem 1.2rem; text-align: left; }
.rte th { font-weight: 600; color: var(--pb-gold); background: var(--pb-onyx-raised); }

/* Image placeholders (preview only) */
.pb-placeholder { background: var(--pb-onyx-raised); display: flex; align-items: center; justify-content: center; position: relative; }
.color-scheme-3 .pb-placeholder { background: var(--pb-green-deep); }
.pb-placeholder__note { position: absolute; left: 2rem; bottom: 1.8rem; background: var(--pb-onyx); color: var(--pb-muted); font-size: 1.2rem; padding: 0.6rem 1rem; }

@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition: none !important; animation: none !important; } }
```

Class names from Dawn (`.card__inner`, `.field:after`, `.header__heading-link`, etc.) must be checked against the pulled live theme's markup. Adjust the selectors rather than adding `!important`.

Dawn sets `html { font-size: 62.5% }`, so `1rem = 10px`. Check the generated `--font-heading-family` order: Dawn writes it inline in `theme.liquid`, so `pb-theme.css` must load **after** that `<style>` block. If it doesn't, scope the overrides to `:root:root` instead.

## 4 · Custom sections

Shared conventions: every `pb-*` section uses `color_scheme` (default `scheme-1`), `padding_top` and `padding_bottom` (0–160 step 8, defaults 104/0) rendered with Dawn's `.section-{{ section.id }}-padding` pattern (×0.6 under 750px), `t:` labels, and presets. Merchant text uses `| escape`. Richtext and inline_richtext are output raw (Shopify sanitises them).

### 4.1 `sections/pb-hero.liquid`

A framed lockup on the left and the image on the right (02 §4.1). On mobile the lockup comes first.

```liquid
{%- style -%}
  .pb-hero { display: grid; grid-template-columns: minmax(0,1fr); }
  .pb-hero__lockup-wrap { padding: 2.8rem 1.6rem 0; }
  .pb-hero__lockup { padding: 3.6rem 2rem; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 1.6rem; }
  .pb-hero__body { font-size: 1.5rem; color: var(--pb-muted); max-width: 40rem; margin: 0; }
  .pb-hero__actions { display: flex; flex-direction: column; align-items: center; gap: 0.6rem; width: 100%; margin-top: 0.6rem; }
  .pb-hero__actions .button { width: 100%; }
  .pb-hero__media { position: relative; min-height: 40rem; margin-top: 2.8rem; background: var(--pb-onyx-raised); border-top: 1px solid var(--pb-rule); border-bottom: 1px solid var(--pb-rule); }
  .pb-hero__media img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  .pb-hero__media .pb-hero__img--desktop { display: none; }
  @media screen and (min-width: 750px) {
    .pb-hero { grid-template-columns: repeat(2, minmax(0,1fr)); min-height: 76rem; max-width: 144rem; margin: 0 auto; }
    .pb-hero__lockup-wrap { padding: 6.4rem 4.8rem 6.4rem 5.6rem; display: flex; align-items: center; justify-content: center; }
    .pb-hero__lockup-wrap .pb-frame { width: 100%; max-width: 60rem; }
    .pb-hero__lockup { padding: 5.6rem 4rem; gap: 2.2rem; }
    .pb-hero__body { font-size: 1.7rem; }
    .pb-hero__actions { flex-direction: row; justify-content: center; gap: 1.6rem; width: auto; }
    .pb-hero__actions .button { width: auto; }
    .pb-hero__media { margin-top: 0; border-top: 0; border-bottom: 0; border-left: 1px solid var(--pb-rule); }
    .pb-hero__media .pb-hero__img--desktop { display: block; }
    .pb-hero__media .pb-hero__img--mobile { display: none; }
  }
{%- endstyle -%}
<section class="color-{{ section.settings.color_scheme }} gradient" aria-labelledby="PbHero-{{ section.id }}">
  <div class="pb-hero">
    <div class="pb-hero__lockup-wrap">
      <div class="pb-frame"><div class="pb-frame__inner pb-hero__lockup">
        <span class="pb-diamond pb-diamond--lg" aria-hidden="true"></span>
        {%- if section.settings.lockup != blank -%}
          <p class="pb-eyebrow pb-eyebrow--ruled" style="font-family: var(--pb-serif); font-size: 2rem; font-weight: 600;">{{ section.settings.lockup | escape }}</p>
        {%- endif -%}
        <h1 id="PbHero-{{ section.id }}" class="pb-display">{{ section.settings.heading }}</h1>
        {%- if section.settings.dateline != blank -%}<p class="pb-dateline">{{ section.settings.dateline | escape }}</p>{%- endif -%}
        {%- if section.settings.text != blank -%}<p class="pb-hero__body">{{ section.settings.text | escape }}</p>{%- endif -%}
        <div class="pb-hero__actions">
          {%- if section.settings.button_label != blank -%}
            <a class="button button--primary" href="{{ section.settings.button_link | default: '#' }}">{{ section.settings.button_label | escape }}</a>
          {%- endif -%}
          {%- if section.settings.link_label != blank -%}
            <a class="button button--secondary" href="{{ section.settings.link_url }}">{{ section.settings.link_label | escape }}</a>
          {%- endif -%}
        </div>
        <span class="pb-diamond pb-diamond--lg" aria-hidden="true"></span>
      </div></div>
    </div>
    <div class="pb-hero__media">
      {%- assign desktop_img = section.settings.image -%}
      {%- assign mobile_img = section.settings.image_mobile | default: section.settings.image -%}
      {%- if desktop_img != blank -%}
        {{ desktop_img | image_url: width: 1600 | image_tag: class: 'pb-hero__img--desktop', widths: '750, 1000, 1300, 1600', sizes: '(min-width: 750px) 50vw, 100vw', loading: 'eager', fetchpriority: 'high', alt: desktop_img.alt }}
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
    { "type": "text", "id": "lockup", "label": "Lockup line", "default": "PARKDALE BRASS" },
    { "type": "inline_richtext", "id": "heading", "label": "Heading", "default": "Made to wear.<br>Made to age." },
    { "type": "text", "id": "dateline", "label": "Dateline", "default": "EST. 2019 · TORONTO" },
    { "type": "text", "id": "text", "label": "Text", "default": "Brass jewelry with character, inspired by industrial design and rooted in Parkdale." },
    { "type": "text", "id": "button_label", "label": "Button label", "default": "Get launch updates", "info": "Prelaunch: Get launch updates → #signup. Live: Shop jewelry → All Jewelry." },
    { "type": "url", "id": "button_link", "label": "Button link" },
    { "type": "text", "id": "link_label", "label": "Secondary button label", "default": "Our story" },
    { "type": "url", "id": "link_url", "label": "Secondary button link" },
    { "type": "image_picker", "id": "image", "label": "Image (desktop)" },
    { "type": "image_picker", "id": "image_mobile", "label": "Image (mobile crop)" },
    { "type": "color_scheme", "id": "color_scheme", "label": "t:sections.all.colors.label", "default": "scheme-1" }
  ],
  "presets": [{ "name": "PB · Hero" }]
}
{% endschema %}
```

The heading is uppercased by CSS (`.pb-display`), so the merchant types it in sentence case and screen readers don't spell out capitals. `inline_richtext` allows the `<br>`.

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

CSS:
- **Mobile (< 750px):** `.pb-tiles{display:flex;flex-direction:column;gap:1.2rem}`. Each tile is a 9.2rem row: `display:flex; justify-content:space-between; align-items:center; padding:0 2rem; background:var(--pb-onyx-raised); border:1px solid var(--pb-rule)`. The label is on the left, and the image is a 7rem square on the right (`object-fit:contain`).
- **≥ 750px:** `display:grid; grid-template-columns:repeat(var(--pb-cols),minmax(0,1fr)); gap:2.8rem`. Each tile is a column with a centred label. The media box is `aspect-ratio:4/5; background:var(--pb-onyx-raised); border:1px solid var(--pb-rule)`, with `object-fit:cover`.
- Label: `font-family:var(--pb-serif); font-weight:600; font-size:2.2rem; letter-spacing:0.22em; text-transform:uppercase; color:var(--pb-ivory)`.
- Hover: the media border and the label turn `var(--pb-gold)`.
- Section head: centred `.pb-eyebrow--ruled` "THE COLLECTION", then the H2.

`products_count` counts products published to the Online Store. Confirm on the store that draft fixtures don't count.

### 4.3 `sections/pb-featured.liquid` (prelaunch concepts **and** live products)

One section serves both states, so switching at launch is a single setting.

- Settings:
  - `mode` (select: `concepts` | `collection`, default `concepts`);
  - `collection` (collection picker, used in `collection` mode);
  - `products_to_show` (2–8, default 4);
  - `eyebrow` ("COMING SOON" / "EVERYDAY ESSENTIALS");
  - `heading` ("The first collection");
  - `note` (text: "Concepts in development. Designs, finishes and prices may change before release."; shown only in `concepts` mode);
  - `badge_label` ("Concept");
  - `view_all_label` ("View all jewelry"; `collection` mode only);
  - color_scheme, padding.
- Blocks `concept` (max 6): `image` (image_picker), `name` (text), `descriptor` (text), `link` (url, optional; defaults to none. Use `#signup`, **never** a product URL).
- Markup, both modes: a centred head (`.pb-eyebrow--ruled`, H2, note), then a `<ul>` 4-up [2-up].
- **`concepts` mode:** `<li><article>` with the image in a 4:5 box (onyx-raised, 1px rule border) and a `<span class="badge">` "Concept" (gold outline, 02 §2.2), then an `<h3 class="pb-product-name">` and a `<p>` descriptor. **No price element, no `product` JSON-LD, no add-to-cart.** With no image, render `.pb-placeholder` plus `placeholder_svg_tag`.
- **`collection` mode:** loop `collection.products limit: products_to_show` and `render 'card-product'` (portrait ratio, `show_secondary_image: true`, no vendor, no rating, no quick add). Then a centred secondary button with `view_all_label` → `collection.url`. If the collection is empty, render nothing.

### 4.4 `sections/pb-editorial-banner.liquid`

- Settings: `image`, `image_mobile`, `heading` ("Considered forms. Everyday character."), `link_label`, `link_url`, color_scheme, padding.
- Desktop: the image inside a `.pb-frame` > `.pb-frame__inner` (21:9, `object-fit:cover`). Below it (margin-top 3.6rem) a flex row (wrap, gap 3.2rem, space-between, align-end): `<h2>` max 64rem and `<a class="pb-text-cta">`.
- Mobile: the frame with 8px padding and a 4:5 mobile image (~44rem tall). Lazy-loaded.
- Setting `show_divider_after` (checkbox, default on) renders the ornament divider `<div class="pb-divider" aria-hidden="true"><span class="pb-diamond pb-diamond--md"></span></div>` below the section (02 §4.6).

### 4.5 `sections/pb-journal-picks.liquid`

- Settings: `eyebrow` ("THE JOURNAL"), `heading` ("Notes on brass"), `view_all_label` ("All articles"), `blog` (blog picker, for the view-all URL), `show_numerals` (checkbox, default on), color_scheme, padding.
- Blocks `article` (max 3): `article` (article picker), `tag_label` (text, optional; otherwise the article's first tag), `show_image` (checkbox, default off).
- Card: `<li>` with `border-top:1px solid var(--pb-gold); padding-top:2.2rem`. Inside: the roman numeral (`{% render 'pb-roman', n: forloop.index %}`, or a simple `case` for 1–3; Cormorant 500 3.4rem gold, `aria-hidden`), the tag (Inter 600 1.1rem, 0.28em, muted), `<h3><a href="{{ a.url }}">{{ a.title | escape }}</a></h3>` (Cormorant 600 2.8rem) and `<p>{{ a.excerpt_or_content | strip_html | truncatewords: 22 }}</p>` (1.5rem muted). Mobile: a grid of a 4rem numeral column and the title.
- If an article block is empty or the article was deleted, skip it. If no valid articles remain, render nothing.

### 4.6 `sections/pb-newsletter.liquid`

Reuse Dawn's form exactly: `{% form 'customer', id: 'PbNewsletter-{{ section.id }}' %}` with `<input type="hidden" name="contact[tags]" value="newsletter">`, `name="contact[email]"`, plus the error and success handling copied from `sections/newsletter.liquid` (lines 48–120).

- Settings: `anchor_id` (text, default `signup`, rendered as the wrapper `id`), `eyebrow` ("LAUNCH LIST"), `heading` ("The next chapter."), `text` ("Get collection news and new release updates."), `button_label` ("Notify me"), `consent` (richtext, **no default legal text**; the owner must enter it), `color_scheme` (default `scheme-3`, royal green), padding.
- Layout: a green `.pb-frame` inside `.page-width` (the frame background is the scheme background). The inner frame has padding 7.2rem 4rem [4rem 1.8rem] and centred content: diamond, ruled eyebrow, H2, text. Then a form, max 56rem, left-aligned inside: a visible `<label>`, the input (5.2rem, green-deep background, 1px gold border) and the gold primary button in a wrapping row.
- Success: `<p role="status">{{ 'newsletter.success' | t }}</p>`. Error: `<p role="alert" id="…-error">`, with `aria-describedby` on the input.

### 4.7 `sections/pb-collection-header.liquid`

Replaces Dawn's `main-collection-banner` on collection templates.

- Settings:
  - `menu` (link_list, default `shop-categories`);
  - `show_description` (checkbox, on);
  - `category_line` (text, optional override; otherwise built from the menu's links that have products, joined with " · ", upper case);
  - color_scheme, padding.
- Markup:
  - the breadcrumb (`snippets/pb-breadcrumbs.liquid`);
  - a centred head: 18px `.pb-diamond`, `<h1>` `{{ collection.title | escape }}` (caps by CSS), `.pb-eyebrow--ruled` category line, and the description;
  - then `<nav aria-label="{{ 'pb.collection.categories' | t }}">` with one pill per menu link whose `link.object.products_count > 0`. A pill is `<a class="pb-pill" href="{{ link.url }}" {% if link.current %}aria-current="page"{% endif %}>{{ link.title | escape }}</a>`.
- Mobile: the pills scroll horizontally (`overflow-x:auto; scroll-snap-type:x proximity`).
- Pill CSS: height 4rem, padding 0 1.8rem, 1px `var(--pb-rule-strong)`, radius 2px, Inter 600 1.2rem, 0.18em, uppercase, ivory. Hover: gold border. `[aria-current]`: gold fill, onyx text.

### 4.8 `sections/pb-split.liquid`

For the material story, our story, and content-page splits.

- Settings:
  - `layout` (`image_first` | `text_first`);
  - `ratio` (`1-1` | `6-5`);
  - `full_bleed` (checkbox: the background spans the viewport, the content stays at max 1440);
  - `frame_image` (checkbox: wraps the image in `.pb-frame`);
  - `show_diamond` (checkbox);
  - `eyebrow`, `heading`, `text` (richtext), `button_label`, `button_link`;
  - `image`, `image_mobile`;
  - color_scheme, padding.
- Desktop grid: `1-1` = `repeat(2,minmax(0,1fr))` with no gap; the text side has padding 10.4rem 8.8rem and max-width 66rem. `6-5` = `minmax(0,6fr) minmax(0,5fr)` with gap 8.8rem.
- Mobile: image then text (or as set), single column.
- Material: `scheme-3`, `1-1`, `full_bleed`, gold-line top and bottom borders, `show_diamond`.
- Story: `scheme-1`, `6-5`, `text_first`, `frame_image`.

### 4.9 `sections/pb-page.liquid`

Replaces `main-page` on the four content-page templates.

- Settings: `show_diamond` (on), `dateline` (text, optional, e.g. "EST. 2019 · TORONTO" on Our Story), `width` (`narrow` 72rem | `normal`), color_scheme, padding.
- Markup: a centred head (diamond, `<h1>{{ page.title | escape }}</h1>` in caps by CSS, dateline), then `<div class="rte">{{ page.content }}</div>` at the chosen width.

### 4.10 `snippets/pb-sticky-atc.liquid` + `assets/pb-sticky-atc.js` (required)

Rendered by `main-product` (Dawn edit §5.7), below 750px only. Behaviour per 02 §6.4.

- **Show** when (a) the main product form has a valid, available variant selected, and (b) the main submit button is out of view (IntersectionObserver on `.product-form__submit`).
- **Hide** when the cart drawer is open (`cart-drawer` has `active`), or when a form error is visible.
- The button submits the main product form (`form.requestSubmit()`), so Dawn's cart logic, errors and the drawer stay the single source of truth.
- Listen for Dawn's `variant:change` pub/sub event (`PUB_SUB_EVENTS.variantChange` in `assets/constants.js`) to update the name, options and price. Use no other new JavaScript.
- The bar is `role="region"` with `aria-label`, keyboard reachable, and doesn't trap focus. `prefers-reduced-motion` means no slide animation.

## 5 · `templates/product.json` composition

`main-product` blocks in order. Settings: `media_position: left`, `media_size: large` (≈ 7/5), `gallery_layout: thumbnail` (re-laid out by Dawn edit 6 below), `mobile_thumbnails: hide` (slider + counter), `image_zoom: lightbox`, `enable_sticky_info: true`, `hide_variants: true`, `media_fit: cover`.

| # | Block type | Settings / source |
| --- | --- | --- |
| 0 | `text` | Eyebrow: `{{ product.type }}`, text style uppercase; styled `.pb-eyebrow` |
| 1 | `title` | n/a (caps by CSS) |
| 2 | `price` | n/a (gold by CSS) |
| 3 | `text` | `text`: dynamic source `product.metafields.custom.short_description` |
| 3b | `custom_liquid` | `<div class="pb-divider pb-divider--flex" aria-hidden="true"><span class="pb-diamond pb-diamond--sm"></span></div>` |
| 4 | `variant_picker` | `picker_type: button`, `swatch_shape: circle` (Finish swatches come from Shopify's category-metafield colour swatches, or plain buttons) |
| 5 | `popup` | `text: "Size guide"`, `page: size-guide`. Moved into the Size legend by Dawn edit 3. |
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

**Required Dawn edits** (record each in the CHANGELOG with `PB:` markers). All are required; none are optional:

1. **Hide empty accordions.** Wrap the `when 'collapsible_tab'` markup (line ~213) in `{%- if block.settings.content != blank or block.settings.page != blank -%} … {%- endif -%}`.
2. **Open by default.** Add a checkbox `open` to the `collapsible_tab` schema and render `<details … {% if block.settings.open %}open{% endif %}>`.
3. **Size guide inline in the Size legend.** In `snippets/product-variant-picker.liquid`, when `option.name` is "Size" (handle `size`), render the legend as a flex row: "SIZE: {selected}" on the left and a `<button>` that opens the existing popup modal (`#PopupModal-{{ popup_block.id }}`, using the same `modal-opener` markup as the popup block) on the right. Hide the standalone popup line with CSS when the inline link is present.
4. **Add to bag label.** Override the string in `locales/en.default.json`: `products.product.add_to_cart` → "Add to bag". Keep `products.product.unavailable` ("Unavailable") and `sold_out` as they are; they describe real states.
5. **"Select a size" start state.** Dawn pre-selects the first available variant; the design starts with **no size selected**.
   - When the URL has no `?variant=` and the product has a Size option with more than one value, render the Size radios unchecked (`snippets/product-variant-options.liquid`).
   - Set the submit button to "Select a size" with `aria-disabled="true"`, and make the hidden variant input empty so the form can't submit.
   - On the first size pick, Dawn's `variant:change` flow takes over unchanged.
   - Products with one size, or with no Size option, keep Dawn's behaviour.
   - Test with keyboard, back/forward navigation and shared `?variant=` links, against `assets/product-info.js`.
6. **Gallery: thumbnail column on the left, framed main image.** In `snippets/product-media-gallery.liquid`, at ≥ 990px with `gallery_layout: thumbnail`, lay out `.product__media-wrapper` as a grid `8.4rem minmax(0,1fr)` with gap 1.6rem. The thumbnail list goes in column 1 as a vertical list (4:5 thumbs, 1px rule-strong border, gold when `aria-current`). The main slider goes in column 2, wrapped in `.pb-frame > .pb-frame__inner`, with the zoom button inside the frame top-right. Mobile keeps Dawn's slider, with the "1 / 4" counter and gold indicator styling.
7. **Sticky add-to-bag.** Render `{% render 'pb-sticky-atc', product: product, section_id: section.id %}` at the end of `main-product`, and load `pb-sticky-atc.js` with `defer` (§4.10).

## 6 · Locales (`locales/en.default.json` + `en.default.schema.json`)

Add:

```json
"pb": {
  "badge": { "concept": "Concept" },
  "collection": { "categories": "Categories", "empty_heading": "Nothing matches those filters.", "empty_text": "Try removing a filter, or browse all jewelry.", "reset": "Reset filters" },
  "journal": { "view_all": "All articles" },
  "newsletter": { "success": "Thanks. You're on the list." },
  "product": { "select_size": "Select a size" },
  "sticky_atc": { "label": "Add to bag", "region": "Quick add to bag" }
}
```

Override: `products.product.add_to_cart` = "Add to bag", `general.cart.title` = "Your bag", `sections.cart.title` = "Your bag". Keep other locales untouched (fallback to English, or ask the owner about the French market).

## 7 · Header and footer groups

`sections/header-group.json`:
- `announcement-bar`: one block, `color_scheme: scheme-3` (royal green; text styled gold-pale by `pb-theme.css`), text "The first Parkdale Brass jewelry collection is in development.", with the link empty until the homepage signup section exists. In Phase 2 set the link to `#signup` to send shoppers to the localized homepage signup from any page. Remove the block entirely at launch if there's no verified message.
- `header`: `menu: jewelry-main-menu`, `menu_type_desktop: dropdown`, `logo_position: middle-left`, `mobile_logo_position: center`, `sticky_header_type: on-scroll-up`, `show_line_separator: true`, `enable_country_selector: false` (the footer has it), `enable_language_selector: false`, padding 16/16.

`sections/footer-group.json` (`footer`):
- `color_scheme: scheme-2`, `newsletter_enable: false`, `enable_follow_on_shop: false` unless the owner wants it, `show_social: true` (renders only filled links), `enable_country_selector: true`, `payment_enable` per owner, `show_policy: true`.
- Blocks:
  1. `brand_information` (uses the theme settings `brand_headline` "Brass jewelry with character.", `brand_description` "Est. 2019, Toronto.");
  2. `link_list` "Shop" → `footer-shop`;
  3. `link_list` "Learn" → `footer-learn`;
  4. `link_list` "Help" → `footer-help`.

**Dawn edit for mobile footer accordions (required, 02 §2.8):** in `sections/footer.liquid`, below 750px wrap each `link_list` block in `<details class="pb-footer-acc"><summary>{{ heading }}</summary>…</details>`. Summaries are 52px rows with a gold heading and "+"/"−". At ≥ 750px, render the same block open and non-collapsible: the CSS hides the summary marker, and a small inline script sets `open` on desktop on `matchMedia` change. Headings stay real `<h2>` text inside the summary so the outline is preserved.

## 8 · Collection template

`templates/collection.json`:

1. `pb-collection-header`: menu `shop-categories`, description on. (It replaces `main-collection-banner`; remove that section from the template.)
2. `main-collection-product-grid`: `products_per_page: 24`, `columns_desktop: 3`, `columns_mobile: "2"`, `image_ratio: portrait`, `show_secondary_image: true`, `show_vendor: false`, `show_rating: false`, `enable_filtering: true`, `filter_type: horizontal`, `enable_sorting: true`, `quick_add: none`.
3. `multicolumn`: 3 columns, no images, title + text + link (Size guide / Jewelry care / Shipping & returns), `color_scheme: scheme-1`. In `pb-theme.css`: a 1px gold-line top border, titles in Cormorant 600 2.8rem, links in gold Inter 600 1.2rem 0.18em caps, and the arrow icon hidden.

**Dawn edit for the in-grid promo tile (02 §5.5, required):** add settings `pb_promo_enable`, `pb_promo_eyebrow`, `pb_promo_text`, `pb_promo_link_label` and `pb_promo_link` to `sections/main-collection-product-grid.liquid`. On the **last page** of results only, render one extra `<li class="grid__item">` after the products: a green `.pb-frame` tile at 4:5. It must not be counted in the product count or the pagination, and it hides when filters return zero products. Log it in the CHANGELOG.

In Admin → Search & Discovery, filters should be **Availability** and **Price** only (owner approval; it's store-level).

## 9 · `templates/index.json` (prelaunch)

```text
order: pb_hero, pb_categories, pb_featured, material, editorial, story, journal, signup
pb_hero          → PB · Hero (button "Get launch updates" → #signup, link "Discover our story" → /pages/our-story)
pb_categories    → PB · Category tiles (blocks: bracelets, necklaces, rings)
pb_featured      → PB · Featured (mode: concepts, 4 concept blocks; at launch switch mode to collection → jewelry)
material         → PB · Split (scheme-3 royal green, ratio 1-1, full_bleed, image_first, show_diamond; eyebrow "THE MATERIAL", heading, text, button "Why brass?")
editorial        → PB · Editorial banner (double frame, link "Be first to know" → #signup, divider after)
story            → PB · Split (scheme-1, ratio 6-5, text_first, frame_image; eyebrow "OUR STORY", heading "Rooted in Parkdale.", text, button "Our story")
journal          → PB · Journal picks ("THE JOURNAL" / "Notes on brass", numerals; what-is-brass-jewelry-metal, gold-plated-brass-jewelry, care article once published)
signup           → PB · Newsletter (anchor "signup", scheme-3 royal green, double frame)
```

## 10 · SEO plumbing (theme side)

- `snippets/meta-tags.liquid` already outputs OG and Twitter tags. Set the homepage title and description in Admin → Preferences (store-level; owner approval). Suggested copy is in 04 §5.
- Product JSON-LD: Dawn outputs `{{ product | structured_data }}` in `main-product`. That's correct for real products only. `pb-featured` in `concepts` mode must not emit any.
- `Organization` JSON-LD: Dawn already outputs one on every page from `sections/header.liquid`. Don't add a second one in `layout/theme.liquid` (D-29). Make a `PB:` edit there instead: output only non-empty `sameAs` URLs, and set `url` to `request.origin | append: routes.root_url` so it is the shop's root on every page. The logo follows `settings.logo` (B-04).
- Breadcrumbs: add `BreadcrumbList` JSON-LD in a `snippets/pb-breadcrumbs.liquid` rendered on collection and product pages, along with the visible breadcrumb (`<nav aria-label="Breadcrumb"><ol>`).

# Phase 1 brief: design foundation

**For:** the AI agent (or developer) taking over Parkdale Brass after the design and audit phases.
**Goal:** turn this stock Dawn 16.0.0 repo into the **Direction B "Archive"** foundation: colour schemes, type, global settings, the token stylesheet, header, footer and locale strings. Then any page you open shows the new look, before any page-specific section exists.
**Not in scope:** the custom `pb-*` sections, templates, product page edits and store data. Those are Phase 2 and Phase 3.

Read this whole brief before you change a file. It takes about five minutes and saves rework.

---

## 1 · State of play

| Item | Status |
| --- | --- |
| Visual direction | **Approved: B "Archive"** (D-19): near-black, gold, royal green, ornament kit |
| Rule for every choice | **The design leads; the theme follows** (D-21). Match the spec exactly. Never simplify it to fit Dawn. |
| Base theme | **Dawn 16.0.0, this repo** (D-24). The live store runs Craft 14.0.0. Don't build on Craft, and don't copy its code in. |
| Decisions | All approved (`decisions.md`). Don't reopen them without new information. |
| Audit | Repo and public site done (`audit.md`). The live theme pull and Admin data still need owner access (A-01, A-02). |
| Phase 1 blockers | **None to start coding.** Previewing on Shopify needs A-01 (theme access). Without it, finish the code, run checks, and report previews as not tested. |

## 2 · Read first, in this order

1. `/AGENTS.md`: the hard rules. **Never publish, never change store data, never invent facts.**
2. `02-design-spec.md` §1 (tokens, type, layout, shape, ornaments), §2.7 (header), §2.8 (footer).
3. `03-theme-mapping.md` §0 (how each part is built), §1 (settings), §2 (fonts), §3 (`pb-theme.css`), §6 (locales), §7 (header and footer groups, including the footer accordion edit).
4. `CHANGELOG.md`: how to log Dawn edits and the `PB:` markers.
5. Visual reference: canvas page **"B · Archive"**, artboards `Archive-Foundations`, and the header and footer of `Archive-Home` and `Archive-Home-Mobile`: https://claude.ai/artifact/935Z6v9LJkWXDWSmdgNbQc. It's private; ask the owner for access. The spec wins if they differ.

## 3 · Branch and workflow

- Start from the docs branch `claude/loving-mccarthy-7dq7ak` (it has all the docs). Work on the branch your session or the owner assigns. Never commit to `main`.
- One commit per task below, using the IDs (e.g. `feat(theme): 1.1 Archive colour schemes`).
- Don't open a pull request unless the owner asks.
- Preview with `shopify theme dev --store parkdale-brass.myshopify.com`, or `shopify theme push --unpublished`, **only once the owner has granted theme access (A-01)**. Never `shopify theme publish`, and never push to the live theme ID.

## 4 · Tasks, in order

### 1.1 · Colour schemes (`config/settings_data.json`)
- In this checkout, `current` names the `Dawn` preset. Under `presets.Dawn.color_schemes`, replace the values of `scheme-1` to `scheme-5` with the five Archive schemes in `03-theme-mapping.md` §1: Onyx, Onyx deep, Royal green, Onyx raised, Gold. Use the exact hexes. Set `background_gradient: ""`.
- **Merge, don't replace the file.** Change only these keys.
- Done when: each scheme matches the table exactly.

### 1.2 · Typography (`config/settings_data.json`, `assets/`)
- **Body:** `type_body_font: "inter_n4"` (Shopify font library). Dawn derives 500 and 600 with `font_modify`.
- **Headings:** Cormorant Garamond **500 and 600** must both be available. The CSS (1.4) chooses the weight per element: section H2s at 500, hero, page H1s and wordmark at 600.
  - **Default: self-host**, because the font-library handle can't be checked without Admin. Add `assets/cormorant-garamond-500.woff2` and `assets/cormorant-garamond-600.woff2`, Latin subset, from the official open-source Cormorant repository or Google Fonts' GitHub (OFL licence).
  - Add the licence text at `docs/redesign/licences/cormorant-OFL.txt`.
  - Leave `type_header_font` at a sensible library serif fallback; `pb-theme.css` overrides `--font-heading-family`.
  - If the owner later confirms Cormorant is in the font picker, switch to the library handle and delete the self-hosted files.
- Done when: both weights load (Network tab, once previewing), and no Google Fonts CDN request is made.

### 1.3 · Global settings (`config/settings_data.json`)
- Apply the "Other settings" block in `03-theme-mapping.md` §1 key by key: `page_width: 1400` (the slider steps in 100s; `pb-theme.css` sets the exact 1440), `animations_hover_elements: "default"` (there's no `none` option), button/input/pill radius 2, card styling, badge settings, no shadows, `animations_reveal_on_scroll: false`, `cart_type: "drawer"`, predictive search on with prices, currency code on.
- Social links: leave blank. Only verified links are added, by the owner.
- Done when: the diff for `settings_data.json` touches only the keys listed in 03 §1 (a 05 §8 check).

### 1.4 · Token stylesheet (`assets/pb-theme.css`, `layout/theme.liquid`)
- Create `assets/pb-theme.css` from the full block in `03-theme-mapping.md` §3: tokens, type, eyebrows and dateline, ornaments (`.pb-frame`, `.pb-diamond`, `.pb-divider`), buttons, focus ring, header, footer, cards, inputs, variant pills, accordions, tables, placeholders, reduced motion.
- In `layout/theme.liquid`, add **one line** after the `base.css` stylesheet tag (≈ line 281): `{{ 'pb-theme.css' | asset_url | stylesheet_tag }}`. Add the heading-font preload from 03 §2 next to it. Wrap both in `PB:` comment markers and log them in the CHANGELOG.
- **Make sure `pb-theme.css` wins over Dawn's inline `:root` variables** (Dawn prints them in a `<style>` in `theme.liquid`). If it doesn't, scope the overrides to `:root:root`. Don't spray `!important` (the focus ring is the one allowed exception).
- **Check every Dawn selector the CSS uses** (`.header__heading-link`, `.card__inner`, `.field:after`, `.product__accordion` and others) against the real markup in this repo, and correct them. The 03 §3 block is a starting point, written without rendering.
- Done when: the CSS loads after Dawn's, and every selector matches an element in Dawn 16 markup.

### 1.5 · Header (`sections/header-group.json`)
- `announcement-bar`: one block, `color_scheme: scheme-3`, text "The first Parkdale Brass jewelry collection is in development.", with the link empty. Once Phase 2 adds the homepage signup section, set the link to `#signup`. The announcement resolves this anchor against the localized homepage. Use gold-pale caps via CSS.
- `header`: `menu: "jewelry-main-menu"`, `menu_type_desktop: "dropdown"`, `logo_position: "middle-left"`, `mobile_logo_position: "center"`, `sticky_header_type: "on-scroll-up"`, `show_line_separator: true`, `enable_country_selector: false`, `enable_language_selector: false`, padding 16/16, `color_scheme: scheme-1`.
- **The `jewelry-main-menu` menu doesn't exist yet.** Creating it is store change E-04, which needs owner approval. **Don't create it.** The desktop nav renders empty until it exists. Note that in your report. Don't point the header at the old `main-menu` either, because it shows pipe links.
- Wordmark: no logo is uploaded (B-04 is open), so Dawn prints the shop name. `pb-theme.css` styles it (Cormorant 600, 0.32em caps) and adds the 10px gold diamond before it. Check this on desktop (23px) and mobile (17px).
- Done when: the header matches `Archive-Home` (desktop) and `Archive-Home-Mobile` (mobile) apart from the missing menu items.

### 1.6 · Footer (`sections/footer-group.json`, `sections/footer.liquid`)
- Settings and blocks per `03-theme-mapping.md` §7:
  - `color_scheme: scheme-2`, newsletter off, social on (renders only filled links), country selector on, policies on, `payment_enable` left as Dawn's default until the owner decides;
  - blocks: `brand_information`, then `link_list` Shop → `footer-shop`, Learn → `footer-learn`, Help → `footer-help`.
  - These menus don't exist yet either (E-04). **Don't create them.**
- Theme settings `brand_headline` "Brass jewelry with character." and `brand_description` "Est. 2019, Toronto.".
- **Dawn edit, required (D-22):** mobile footer accordions, per the paragraph in 03 §7. Use `<details>`/`<summary>` below 750px, open and non-collapsible at ≥ 750px, with real heading text, keyboard-operable and announced. Wrap the edit in `PB:` markers and log it in the CHANGELOG.
- Done when: the footer matches `Archive-Home` (desktop grid, gold headings, bottom bar) and `Archive-Home-Mobile` (accordions).

### 1.7 · Locale strings (`locales/en.default.json`, `locales/en.default.schema.json`)
- Add the `pb.*` block from `03-theme-mapping.md` §6.
- Overrides: `products.product.add_to_cart` → "Add to bag", and the cart titles → "Your bag". Leave the other locales alone.
- Done when: the JSON is valid and no existing key is removed.

## 5 · Phase 1 exit criteria (all required)

- [ ] `shopify theme check` passes with no new errors, or the CLI is unavailable and you say so. List any pre-existing Dawn warnings rather than fixing them.
- [ ] `config/settings_data.json` diff contains only the keys from 03 §1, §7 and the brand settings.
- [ ] Every Dawn file you edited is in `CHANGELOG.md` with `PB:` markers in the code: `layout/theme.liquid`, `sections/footer.liquid`, `locales/en.default.json`.
- [ ] **If previewing is possible (A-01):** a blank page (e.g. `/pages/contact-us` or a 404) at 1440 and 390 shows:
  - the onyx ground, ivory and gold type;
  - the spaced wordmark with its diamond;
  - the green announcement bar;
  - the Archive footer, with accordions on mobile;
  - the gold-pale focus ring when tabbing.

  Compare screenshots side by side with the canvas header and footer (QA 05 §9) and log any difference.
- [ ] Contrast spot-checks pass: ivory on onyx, muted on the footer, gold-pale on green, onyx on gold buttons.
- [ ] Nothing in the store was changed. No menus, products, pages, metafields, apps or publishes.

## 6 · Stop and ask the owner (don't guess) if

- you'd need to create or change any store data (menus are the likely one), or install an app;
- something in the spec can't be built exactly in Phase 1's files: record it as a deviation and ask, don't simplify (D-21);
- the selectors in 03 §3 don't match Dawn 16 in a way that changes the look, not just the class name;
- you're asked to publish or push to the live theme.

## 7 · Report back with

1. Commits, one per task, and the branch name.
2. What you tested and how, what passed and failed, and what's untested (with the reason, e.g. "no theme access").
3. Screenshots if you previewed (desktop and mobile, header and footer).
4. Updated `CHANGELOG.md`, plus any new items for `owner-inputs.md` or `decisions.md`.
5. The next step: Phase 2. Follow [`phase-2-brief.md`](phase-2-brief.md).

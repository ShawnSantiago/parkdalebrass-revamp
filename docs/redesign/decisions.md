# Decision log

One entry per decision a later contributor needs to respect. Add new entries at the bottom. To change a decision, add a new entry that **supersedes** the old one; don't edit history.

**Status values:** `Proposed` (made by the design or implementation work, waiting for the owner) · `Approved` (owner confirmed, with a date) · `Superseded by D-xx`.

Owner approval is recorded in the **Approved by** column. Only the owner, or someone the owner names, can move an entry to `Approved`.

| ID | Date | Decision | Reason | Status | Approved by |
| --- | --- | --- | --- | --- | --- |
| D-01 | 2026-11-25 | Stay on Shopify Online Store 2.0 and the existing domain. No headless, no platform move. | The brief says to work within the existing store. A pivot isn't a domain migration. | Proposed | n/a |
| D-02 | 2026-11-25 | Base theme is Dawn 16.0.0: restyle with settings and one token stylesheet (`assets/pb-theme.css`) rather than rebuild. | The repo is stock Dawn 16.0.0, and Dawn has nearly every section the design needs. This keeps upgrades possible. | Proposed. **Re-check after the Phase 0 audit.** If the live theme isn't Dawn, this decision is reopened. | n/a |
| D-03 | 2026-11-25 | Visual system: ivory `#F5F1E8`, charcoal `#242420`, deep bronze `#75552C` for accents and focus, antique brass `#B39255` decorative only. Cormorant Garamond 500/600 + Inter 400–600. 2px radius, no shadows, no gradients, no entrance animation. | From the brief §4. Contrast checked: brass on ivory is 2.6:1, so it is never used for text. | Proposed | n/a |
| D-04 | 2026-11-25 | Seven custom sections only: `pb-hero`, `pb-category-tiles`, `pb-concept-grid`, `pb-editorial-banner`, `pb-journal-picks`, `pb-newsletter`, `pb-collection-nav`. Everything else uses native Dawn sections. | Each fills a specific Dawn gap; the reasons are in `01-implementation-plan.md` §2A. | Proposed | n/a |
| D-05 | 2026-11-25 | Prelaunch merchandising uses `pb-concept-grid`: editorial cards with a "Concept" badge, no price, no product link, no Product schema. Prelaunch creates no products on the live store. | Avoids fake SKUs and misleading structured data while still showing the direction. | Proposed | n/a |
| D-06 | 2026-11-25 | Prelaunch and live states are switched in the theme editor (section settings plus swapping one section), not by a global theme flag. | Simpler, nothing hidden, and the theme editor already covers it. Store visibility is handled separately in the launch runbook. | Proposed | n/a |
| D-07 | 2026-11-25 | Create new menus (`jewelry-main-menu`, `shop-categories`, `footer-shop/learn/help`). Leave `main-menu` and `footer` untouched. | Gives a clean rollback: the backup theme still points at the old menus. | Proposed. Creating the menus is a store change and needs approval. | n/a |
| D-08 | 2026-11-25 | Jewelry is its own smart collection `/collections/jewelry`, driven by the tag `jewelry`. Menus link there, not to `/collections/all`. | Legacy items can never leak into the jewelry catalogue, even before they are unpublished. | Proposed | n/a |
| D-09 | 2026-11-25 | Finish and Size are native product options (variants). Descriptive facts live in `custom.*` product metafields. An empty field hides its block. | Brief §7: options that change the SKU are variants; no placeholder text in the live theme. | Proposed | n/a |
| D-10 | 2026-11-25 | Product page: Dawn `main-product` with collapsible tabs for details. Required Dawn edits: hide empty tabs, add an open-by-default option, label the button "Add to bag". Ship Dawn's default variant pre-selection first; a "Select a size" start state is optional (Phase 2B). | Smallest change to Dawn that meets the spec. Pre-selection is Dawn's tested behaviour. | Proposed | n/a |
| D-11 | 2026-11-25 | The journal module uses hand-picked articles (`pb-journal-picks`), never the latest posts. | Stops legacy smoking posts from appearing on the jewelry homepage. | Proposed | n/a |
| D-12 | 2026-11-25 | Rings stay hidden (tiles, menus, footer) until ring sizing, stock and exchanges are ready. Category tiles render only for collections with published products. | Brief §5: no empty categories. Rings carry the most sizing and returns risk. | Proposed | n/a |
| D-13 | 2026-11-25 | No reviews or ratings anywhere until genuine SKU-specific jewelry reviews exist. Legacy reviews are kept but never shown or relabelled. | Brief §9–10. | Proposed | n/a |
| D-14 | 2026-11-25 | The logo is a typeset wordmark (Cormorant 600, uppercase, 0.2em tracking) as a placeholder until the existing logo is audited. | The current logo files haven't been reviewed for category-specific motifs. | Proposed (temporary) | n/a |
| D-15 | 2026-11-25 | Self-host Cormorant Garamond (OFL) if Shopify's font library doesn't have it. Never load the Google Fonts CDN in the theme. | Privacy, performance and licence clarity. | Proposed | n/a |
| D-16 | 2026-11-25 | Retired legacy URLs get a 301 only to a genuinely relevant page. Otherwise 404/410. Never a blanket redirect to the homepage. | Brief §10: SEO and user honesty. | Proposed | n/a |
| D-17 | 2026-11-25 | Design and implementation docs live in the repo under `docs/redesign/`, with `AGENTS.md` / `CLAUDE.md` at the root. | Agents and developers find them alongside the code. | Proposed | n/a |
| D-18 | 2026-11-25 | `custom.dimensions` and `custom.care_instructions` are **multi-line text**, not rich text. | All product facts can then be imported from one CSV (`product-data/`), and plain line breaks are enough for the content. | Proposed | n/a |

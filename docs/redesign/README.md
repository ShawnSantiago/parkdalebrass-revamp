# Parkdale Brass jewelry redesign: implementation docs

This folder lets any developer or AI agent rebuild the approved Parkdale Brass jewelry design in this Shopify theme. Read it in order before changing code.

| # | File | What it is for |
| --- | --- | --- |
| 1 | [01-implementation-plan.md](01-implementation-plan.md) | Phased plan, task list, file-by-file changes, approvals, launch and rollback |
| 2 | [02-design-spec.md](02-design-spec.md) | The visual system and every page, section, component and state, with exact values |
| 3 | [03-theme-mapping.md](03-theme-mapping.md) | How each part of the design maps onto Dawn 16: settings, sections, templates, plus code skeletons |
| 4 | [04-content-and-data.md](04-content-and-data.md) | Copy deck, metafields, menus, collections, placeholders, SEO and redirects |
| 5 | [05-qa-checklist.md](05-qa-checklist.md) | Test matrix and acceptance criteria |
| · | [decisions.md](decisions.md) | Decision log: what has been decided, why, and the approval status |
| · | [product-data/](product-data/README.md) | Shopify product import template and per-product fact sheet |
| · | [photography-brief.md](photography-brief.md) | Brief for the photographer: look, shot list, crops, specs, naming |
| · | [audit.md](audit.md) | Phase 0 audit: repo verified; live theme, Admin and SEO still to do |
| · | [CHANGELOG.md](CHANGELOG.md) | Theme changes, Dawn-file edits and the Dawn upgrade procedure |
| · | [owner-inputs.md](owner-inputs.md) | Everything waiting on the owner: access, approvals, product facts, policies, store changes, launch sign-off |

Agents also get these rules automatically from `AGENTS.md` / `CLAUDE.md` at the repo root.

**Visual reference:** the design canvas at https://claude.ai/artifact/935Z6v9LJkWXDWSmdgNbQc, page **"B · Archive: black, gold & green"**. That's the chosen direction (D-19). Page A is kept for reference only; don't build it. The canvas is private to the owner, so ask for access if you can't open it. `02-design-spec.md` is written so the design can be rebuilt without the canvas. If the two disagree, the spec wins, because it holds the decisions made after review.

**Source brief:** *Parkdale Brass — Jewelry Store Redesign & Shopify Implementation Brief* (Nov 25, 2026). That brief sets the strategy. These docs make it concrete for this codebase.

---

## Facts, proposals and open decisions

| Status | Item |
| --- | --- |
| **Confirmed (repo)** | The repo is stock **Dawn 16.0.0**: commit `258f00f`, default `config/settings_data.json`, no customisations, no cannabis, age-gate or app code. |
| **Confirmed (public site)** | The live store sells legacy smoking accessories. It has blog articles `/blogs/news/what-is-brass-jewelry-metal` and `/blogs/news/gold-plated-brass-jewelry`, and localization is enabled. |
| **Confirmed (public site audit)** | The live theme is **Craft 14.0.0** (not Dawn). The store is `parkdale-brass.myshopify.com`. Apps seen: Judge.me, Klaviyo, Microsoft Clarity, Spline, plus a `config-security.com` script. 12 products (no jewelry yet), 14 collections, 133 blog articles (30 jewelry). Details in `audit.md`. |
| **Unknown** | Live theme custom code and app embeds, Admin data (drafts, metafields, redirects, markets), analytics. Needs owner access (A-01 to A-03). |
| **Decided** | Base theme: **Dawn 16** (this repo), not the live Craft 14 (D-24). Carry over app embeds and settings from Craft per the `audit.md` §5 checklist. |
| **Proposal** | Everything in `02-design-spec.md`: palette, type, layout and copy. |
| **Owner decision** | Products, materials, prices, finishes, sizes, shipping, returns, logo, imagery, consent wording, legacy retirement. |

## Rules for any agent working from these docs

1. **Audit before building.** Pull the live theme into this branch with `shopify theme pull` before Phase 2. If it isn't stock Dawn, re-map with `03-theme-mapping.md` as a guide; don't overwrite it.
2. **Never publish a theme or change shared store data** (products, collections, menus, metafield definitions, redirects, policies, sales channels, apps) without written owner approval. An unpublished theme doesn't isolate store-level data.
3. **Never invent facts.** Missing material, size, price, shipping or care data stays as a visible `[bracketed placeholder]` in previews, and as a hidden block in the live theme.
4. **No fake commerce.** No purchasable concept SKUs, fake prices, ratings, reviews, scarcity, discounts or preorders.
5. **Don't blindly overwrite** `config/settings_data.json`, app blocks or checkout-related code. Merge settings key by key.
6. **The design leads; the theme follows.** Use Dawn parts only where they match the spec exactly; otherwise edit Dawn (marked) or build a `pb-*` section. Never simplify the design to fit the theme. Deviations need owner approval (D-21, `03-theme-mapping.md` §0).
7. **Work on the development branch.** For this session that's `claude/loving-mccarthy-7dq7ak`; the brief suggests `feature/jewelry-redesign`. Test on an unpublished theme (`shopify theme push --unpublished`) or `shopify theme dev`.
8. **Report honestly.** Say what you tested, how, what passed, what failed and what is untested.

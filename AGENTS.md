# Agent guide: Parkdale Brass theme

This repo is the Shopify theme for **Parkdale Brass** (parkdalebrass.com). The brand is moving from legacy smoking accessories to vintage-inspired brass jewelry. The theme is based on **Dawn 16.0.0**.

## Read before you change anything

1. `docs/redesign/README.md`: the index, plus what is confirmed, proposed or undecided
2. `docs/redesign/decisions.md`: decisions already made. **Don't reopen one without new information.**
3. `docs/redesign/owner-inputs.md`: what is waiting on the owner. Don't build past a blocker by guessing.
4. Then, as your task needs them: `01-implementation-plan.md` (phases and tasks), `02-design-spec.md` (the design), `03-theme-mapping.md` (Dawn mapping and code), `04-content-and-data.md` (copy, data, SEO), `05-qa-checklist.md` (tests).

Visual reference (private, ask the owner for access): https://claude.ai/artifact/935Z6v9LJkWXDWSmdgNbQc. Build **page B, "Archive"** (black, gold, royal green; decision D-19). Page A is superseded. If the canvas conflicts with `02-design-spec.md`, the spec wins.

## Hard rules

- **Never publish a theme**, and never run `shopify theme push` against the live theme. Use `--unpublished` or `shopify theme dev`.
- **Never change shared store data** without written owner approval logged in `owner-inputs.md`. That covers products, collections, menus, pages, metafield definitions, redirects, policies, markets, sales channels, apps and email. An unpublished theme does *not* isolate store data.
- **Never invent facts.** Materials, finishes, dimensions, prices, shipping, returns, origin and safety claims come only from owner-verified data. Until then, previews show a visible `[bracketed placeholder]` and the live theme hides the block.
- **No fake commerce.** No purchasable concept products, fake prices, ratings, reviews, scarcity, discounts or preorders. Never reuse legacy pipe reviews.
- **Never delete legacy records** (products, reviews, customers, orders, redirects, analytics). Unpublishing needs approval and a CSV export first.
- **Merge, don't overwrite.** Change `config/settings_data.json`, `*-group.json` and app blocks key by key. Don't overwrite whole files.
- **Prefer Dawn's native sections and settings.** Custom sections are prefixed `pb-`, and each needs a reason recorded in `decisions.md`.
- **No new apps, tracking vendors, frameworks, CDNs or build steps** without approval. No secrets in commits.

## Working conventions

- Branch: work on the branch the session assigns (currently `claude/loving-mccarthy-7dq7ak`). Never commit to `main`.
- When you edit a stock Dawn file, log it in `docs/redesign/CHANGELOG.md` and wrap the edit in `PB:` markers, so Dawn upgrades can be merged.
- UI strings live in `locales/en.default.json` under `pb.*`. Escape merchant text (`| escape`).
- Copy is Canadian English and uses "jewelry". The banned phrases and claims are in `04-content-and-data.md` §1.
- Before you say work is done, run `shopify theme check` and the relevant parts of `05-qa-checklist.md`. Report what passed, what failed and what you didn't test.
- When you make a decision that a later agent would need to know, add it to `decisions.md`. When you find something only the owner can answer, add it to `owner-inputs.md`.

## Current status

- Phase 0 (audit) is **partial**: the repo is audited (stock Dawn 16.0.0, no customisations). The live theme, Admin and SEO audits need owner access. See `docs/redesign/audit.md`.
- Visual direction approved: **B "Archive"** (2026-11-25). Docs updated to match.

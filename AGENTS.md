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
  - **Standing approval (D-28, 2026-11-26):** the owner approved any change to Parkdale Brass except **billing** and **admin or staff accounts**. This covers theme, repo, store content and configuration, and merging PRs. It replaces per-change approval, but the agent still:
    - backs up first and logs each store change in `owner-inputs.md` E, per the `phase-3-brief.md` §2 protocol;
    - keeps the integrity rules below;
    - **tells the owner before:** publishing the new theme (launch, only once the `phase-5-brief.md` §1 gates pass), emailing customers, deleting anything, and anything that costs money.
- **Never invent facts.** Materials, finishes, dimensions, prices, shipping, returns, origin and safety claims come only from owner-verified data. Until then, previews show a visible `[bracketed placeholder]` and the live theme hides the block.
- **No fake commerce.** No purchasable concept products, fake prices, ratings, reviews, scarcity, discounts or preorders. Never reuse legacy pipe reviews.
- **Never delete legacy records** (products, reviews, customers, orders, redirects, analytics). Unpublishing needs approval and a CSV export first.
- **Merge, don't overwrite.** Change `config/settings_data.json`, `*-group.json` and app blocks key by key. Don't overwrite whole files.
- **The design leads; the theme follows (D-21).** `docs/redesign/02-design-spec.md` and canvas page B are the target. Use a Dawn section or setting only if it reproduces the spec exactly. Otherwise make a small Dawn edit wrapped in `PB:` markers, or build a `pb-*` section (see `03-theme-mapping.md` §0). **Never simplify the design to fit Dawn.** Any visible deviation needs owner approval and a decision entry, and until then the work is unfinished.
- **No new apps, tracking vendors, frameworks, CDNs or build steps** without approval. No secrets in commits.

## Working conventions

- Branch: work on the branch the session assigns (currently `claude/loving-mccarthy-7dq7ak`). Never commit to `main`.
- When you edit a stock Dawn file, log it in `docs/redesign/CHANGELOG.md` and wrap the edit in `PB:` markers, so Dawn upgrades can be merged.
- UI strings live in `locales/en.default.json` under `pb.*`. Escape merchant text (`| escape`).
- Copy is Canadian English and uses "jewelry". The banned phrases and claims are in `04-content-and-data.md` §1.
- Before you say work is done, run `shopify theme check` and the relevant parts of `05-qa-checklist.md`. Report what passed, what failed and what you didn't test.
- When you make a decision that a later agent would need to know, add it to `decisions.md`. When you find something only the owner can answer, add it to `owner-inputs.md`.

## Shopify CLI in the Parkdale Brass cloud environment

The store's Theme Access password is saved as a **network secret** on the "Parkdale Brass" cloud environment, for `theme-kit-access.shopifyapps.com`. The proxy injects it into every request, so no session or file ever holds the real value. Run the CLI like this:

```bash
NODE_USE_ENV_PROXY=1 SHOPIFY_CLI_NO_ANALYTICS=1 npx --yes @shopify/cli@5.1.0 theme list --store parkdale-brass.myshopify.com --password shptka_proxyinjected
```

- `NODE_USE_ENV_PROXY=1` is required: without it, Node bypasses the session proxy and fails with `ENOTFOUND`.
- `--password shptka_proxyinjected` is a placeholder. The `shptka_` prefix routes the CLI through Theme Access, and the proxy swaps in the real password. Never put a real token in a command, file or commit.
- The CLI also tries `cdn.shopify.com` and `parkdale-brass.myshopify.com`, which this environment doesn't allow. `theme list` works without them. If `pull`, `push` or `dev` fails on one of those hosts, ask the owner to allow it rather than working around it.
- The Theme Access password covers **themes only**. Menus, pages, products and other store data need Admin access, and approval per `owner-inputs.md` E.
- Pull the live Craft theme only into a folder **outside** this repo: `--path ../craft-reference`. Never push to the live theme (`168071168322`), and never run `theme publish`.

## Current status

- Phase 0 (audit): the repo and the public storefront are audited (`docs/redesign/audit.md`, `docs/redesign/url-inventory.csv`). **The live theme is Craft 14.0.0, not Dawn.** The owner chose to build on **Dawn 16 (this repo)** (D-24), carrying over app embeds and settings from Craft per the checklist in `audit.md` §5. Theme Access is verified (A-01). The Craft file comparison and Admin/SEO exports are still pending (A-02, A-03).
- **Phase 1 is implemented on the Archive foundation branch.** The phase brief and changelog record the foundation and its acceptance checks. Both D-25 cart and search fixes from Phase 2 have regression tests. Continue with the page templates and sections in `docs/redesign/phase-2-brief.md`, then `phase-3-brief.md` (owner-led; every store change is approved one at a time), `phase-4-brief.md` (QA) and `phase-5-brief.md` (launch with the owner present, rollback, monitoring). The unpublished preview and the checks completed so far are recorded in `docs/redesign/qa-results.md`. Note Phase 0 step 2 there: since the build stays on Dawn 16, import the pulled Craft theme into a **separate folder for reference only**. Don't commit it over this repo.
- Visual direction approved: **B "Archive"** (2026-11-25). Docs updated to match.

# Owner inputs and sign-off tracker

The single list of everything waiting on the Parkdale Brass owner. Agents: **don't build past a `Blocking` item by guessing.** Add new questions at the bottom of the relevant section.

**Status values:** `Open` · `In progress` · `Provided` / `Approved` (with date) · `Declined` · `N/A`.
**Blocks** says the earliest phase that can't finish without the item.

---

## A · Access (needed to start)

| ID | Input | Why | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- | --- |
| A-01 | Shopify CLI / theme access (staff or collaborator account with theme permissions) | Pull the live theme, create an unpublished dev theme | Phase 0 | Open | n/a |
| A-02 | Read-only Admin exports: products CSV, collections, menus (screenshots), metafield definitions, redirects CSV, markets and shipping zones, installed apps list | Audit | Phase 0 | Open | n/a |
| A-03 | Search Console access or a 16-month export (queries, pages), plus the analytics landing-page report | URL inventory and redirect plan | Phase 0 | Open | n/a |
| A-04 | Is a development store available for fixtures? (Yes/No) | Testing the PDP and collection without touching live data | Phase 2 | Open | n/a |

## B · Design and brand approvals

| ID | Decision / input | Reference | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- | --- |
| B-01 | Approve the overall visual direction (palette, type, layout) | Canvas page B, `02-design-spec.md` §1–2, D-19 | Phase 1 | Approved | 2026-11-25: Direction B "Archive" (black, gold, royal green) chosen in design review |
| B-02 | Approve the homepage section order and copy | `02` §4, `04` §1 | Phase 2 | Open | n/a |
| B-03 | Approve the collection and product page layouts | `02` §5–6 | Phase 2 | Open | n/a |
| B-04 | Logo: supply the existing logo files and decide whether to keep, refresh, or use the typeset wordmark | D-14 | Phase 1 (temporary wordmark allowed), launch | Open | n/a |
| B-05 | Approve the brand story copy ("Rooted in Parkdale", Our Story page) | `04` §1 | Launch | Open | n/a |
| B-06 | Approve the tagline "Made to wear. Made to age." (only valid if the finishes really age) | `04` §1 | Launch | Open | n/a |
| B-08 | **Base theme:** build the redesign on Dawn 16 (this repo; recommended) or on the live Craft 14.0.0 theme | `audit.md` §5, D-02 | Phase 1 | Open | n/a |
| B-07 | Approve, or adjust, the proposed decisions in `decisions.md` | `decisions.md` | Phase 1 | Approved | 2026-11-25: all current decisions approved. D-02 is re-checked after the Phase 0 audit; D-07 covers the decision only, not store change E-04. |

## C · Product truth (blocks a transactional launch)

| ID | Input | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- |
| C-01 | Final launch products: names, designs, categories (start with cuffs and pendants?). Fill in one fact sheet per product (`product-data/README.md`). | Phase 3 | Open | n/a |
| C-02 | Material composition per SKU + safety documentation/testing (alloy components, coatings, market requirements) | Phase 3 | Open | n/a |
| C-03 | Actual finishes and coatings per SKU; whether each finish patinas | Phase 3 | Open | n/a |
| C-04 | Dimensions, size ranges and tested adjustability (rings, cuffs, chains) | Phase 3 | Open | n/a |
| C-05 | Care instructions confirmed on samples, per finish | Phase 3 | Open | n/a |
| C-06 | Country of origin per SKU (if it will be disclosed) | Phase 3 | Open | n/a |
| C-07 | Prices (CAD) and any other market currencies | Phase 3 | Open | n/a |
| C-08 | Stock levels and fulfilment capacity | Phase 3 | Open | n/a |
| C-09 | Product photography: P1–P4 per product and finish, per `photography-brief.md` | Phase 3 | Open | n/a |
| C-11 | Clean up product types (most are blank) before smart collections rely on them; decide brand-merch products (tees, hat, slides, mug): keep outside the jewelry nav, or unpublish | Phase 3 | Open | Found in audit §3 |
| C-10 | Editorial imagery E1–E6, per `photography-brief.md` | Launch | Open | n/a |

## D · Policies and legal

| ID | Input | Blocks | Status | Date / note |
| --- | --- | --- | --- | --- |
| D-01 | Shipping markets, delivery times, duties/taxes messaging | Launch | Open | n/a |
| D-02 | Returns and exchanges for jewelry, including ring resizing | Launch | Open | n/a |
| D-03 | Newsletter consent wording (CASL-compliant express consent) | Prelaunch signup going public | Open | n/a |
| D-04 | Lawful basis for emailing existing (legacy) subscribers about jewelry | Any launch email | Open | n/a |
| D-05 | Privacy policy and terms review for the new category | Launch | Open | n/a |
| D-06 | Support path and commitments for legacy orders, returns and warranties | Launch | Open | n/a |

## E · Store-level changes (each needs explicit approval before an agent does it)

| ID | Change | Reference | Backup first | Status | Approved by / date |
| --- | --- | --- | --- | --- | --- |
| E-01 | Create `custom.*` product metafield definitions | `04` §2 | Export the existing definitions list | Open | n/a |
| E-02 | Create collections `jewelry`, `bracelets`, `necklaces` (`rings` later) | `04` §3 | n/a (additive) | Open | n/a |
| E-03 | Create pages `our-story`, `why-brass`, `jewelry-care`, `size-guide` (after a handle-collision check) | `04` §3 | n/a (additive) | Open | n/a |
| E-04 | Create new menus (old menus untouched) | `04` §3, D-07 | Screenshot the existing menus | Open | n/a |
| E-05 | Add real jewelry products | `04` §2 | n/a (additive) | Open | n/a |
| E-06 | Set Search & Discovery filters to Availability + Price | `03` §8 | Screenshot the current filters | Open | n/a |
| E-07 | Update the jewelry blog articles (accuracy, internal links) | `04` §5 | Copy the HTML to `docs/redesign/backup/` | Open | n/a |
| E-08 | Unpublish legacy products from Online Store / Shop / Google channels | `04` §5–6 | Products CSV export | Open | n/a |
| E-09 | Create URL redirects for retired URLs (per the approved inventory) | `04` §5, D-16 | Redirects CSV export | Open | n/a |
| E-10 | Update policies (shipping, refunds, privacy, terms) | Section D | Copy the current policy text | Open | n/a |
| E-11 | Update homepage title, meta description and social image | `04` §5 | Note the current values | Open | n/a |
| E-12 | Merchant Center / ads feed changes | `01` Phase 5 | Note the account status | Open | n/a |

## F · Launch sign-off

| ID | Gate | Status | Signed off by / date |
| --- | --- | --- | --- |
| F-01 | QA results reviewed, known failures accepted (`05-qa-checklist.md`) | Open | n/a |
| F-02 | Launch and rollback runbook reviewed (`01` Phase 5) | Open | n/a |
| F-03 | Backups taken (theme duplicate + every export in E) | Open | n/a |
| F-04 | **Authorize publishing the theme** | Open | n/a |

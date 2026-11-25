# Phase 4 brief: QA

**For:** the AI agent (or developer) testing the finished build before launch.
**Goal:** prove, with evidence, that the new theme and the prepared store data meet `05-qa-checklist.md` and match the design (D-21). Hand the owner a results file they can sign off (F-01).
**Not in scope:** fixing large problems silently, changing store data, or publishing. Small theme fixes found in QA are allowed: log each one, then retest. Anything bigger, or anything involving store data, goes back to the owner.

---

## 1 · Before you start

| Check | Required state |
| --- | --- |
| Phase 2 | Done: all templates and sections built, deviation log clear or approved. |
| Phase 3 | Done: launch products exist as **Draft** with verified data and photos; collections, pages and menus exist **hidden**; prepared files for unpublishing and redirects are approved but not applied. |
| Access | Theme access (A-01), so you can preview the unpublished theme. Admin read access, to check settings and drafts. A development store (A-04) is strongly recommended (§2). |
| Tools | Shopify CLI (`theme check`). Playwright with Chromium (screenshots, axe). Lighthouse, run through Chromium. Shopify's pixel helper or Customer Events test, for analytics. |

**Rules still apply** (`/AGENTS.md`): no publishing, no store changes, no orders on the live store without an approved test-order plan. Never invent a pass. "Not tested" is a valid, required answer.

---

## 2 · Where to test (two environments)

Products are hidden on the live store until launch, so functional testing needs a place where jewelry products are live.

| Environment | What it's for | Setup |
| --- | --- | --- |
| **A · Development store** (preferred) | Full functional QA: real jewelry data from the Phase 3 CSV set to Active, collections and pages visible, menus, cart, the Bogus test gateway checkout, the newsletter form, analytics events | Push the theme there and import the approved product CSV (same data, not fixtures). Recreate the menus, pages and collections. Nothing here touches the live store. |
| **B · Live store, unpublished theme preview** | Real settings, apps, markets, currency, the consent banner, legacy redirects plan, Craft carry-over, and a visual check against hidden structures | `shopify theme dev` or the preview link of the unpublished theme. First check whether **Draft** products and **hidden** pages render in theme preview on this store. If they don't, record it and rely on environment A for those pages. |

If no development store exists, environment B alone is acceptable. Record every check that couldn't run as **Not tested: needs dev store**. Don't make products visible to work around it.

---

## 3 · Test plan

Work through `05-qa-checklist.md` section by section. For each item, write **Pass / Fail / Not tested**, the environment (A or B), and the evidence: a screenshot path, tool output, or the steps followed.

### 3.1 · Baseline (do first)
- The Phase 0 baseline was never captured. Capture it now from the **live Craft store** before anything changes:
  - Lighthouse mobile on `/`, `/collections/all` and `/products/brockton-mk2`;
  - screenshots of the same pages at 390 and 1440.

  The live site is public, so this is read-only. Save it under `docs/redesign/qa/baseline/`.

### 3.2 · Design fidelity (05 §9, D-21)
- Take Playwright screenshots of every template at **320, 375, 390, 768, 1280 and 1440**:
  - home, in prelaunch **and** live configuration;
  - collection;
  - product;
  - the four content pages, contact, the blog and one article;
  - the 404 page;
  - the cart drawer open, the filter drawer open, no results, and the sticky bar.

  Use `deviceScaleFactor: 2` for screenshots the owner will see.
- Compare each one side by side with its canvas page-B artboard. Update the **deviation log**: every difference is either fixed or has an owner-approved decision ID. **Any unapproved deviation is a launch blocker.**

### 3.3 · Content honesty (05 §2)
- Search the rendered theme and the prepared content for the banned claims and phrases (`04-content-and-data.md` §1). Each claim found must trace to evidence on file (Phase 3).
- Confirm:
  - no pipe or cannabis wording, images, reviews or recommendations on jewelry pages, in predictive search for jewelry terms, or in the meta tags;
  - no prices or Product schema on concept cards;
  - no `[VERIFY]` or bracketed placeholder text left anywhere.

### 3.4 · Functionality (05 §3), in environment A
Run each flow by hand **and** with a Playwright script where it's practical:
- **Navigation:** nav, mobile drawer and search.
- **Collections:** category pills, filters, sort, pagination, the empty state, the promo tile on the last page.
- **Product page:**
  - variant changes update the price, availability, URL and images;
  - "Select a size" blocks submit until a size is chosen;
  - a shared `?variant=` link pre-selects that size;
  - the sold-out size is announced;
  - the size guide modal;
  - the sticky bar rules.
- **Cart:** add, edit, remove, empty cart, error on exceeding inventory.
- **Checkout:** the handoff, using Shopify's **Bogus Gateway** on the dev store only.
- **Localization:** currency changes via the country selector.
- **Newsletter:** success and error paths. In Admin, the customer is created with the `newsletter` tag and the correct consent state.
- **Contact form.**

### 3.5 · Accessibility (05 §4)
- Run `@axe-core/playwright` on home, collection, product (with the cart drawer open) and Our Story. The target is 0 serious or critical issues.
- Then by hand:
  - a full keyboard-only run of every §3.4 flow, checking the focus ring, order and traps;
  - 200% zoom and 320px reflow;
  - a contrast spot check of gold on green, muted text on the footer, and gold-pale focus on gold;
  - `prefers-reduced-motion`.
- If possible, do one screen-reader pass (VoiceOver or NVDA) on the product page and cart.

### 3.6 · Performance (05 §5)
- Lighthouse mobile, three runs each (take the median), on home, collection and product, compared to the §3.1 baseline. Report LCP, CLS, TBT (as a lab stand-in for INP) and the total JS added.
- Check the hero image is the LCP and loads `eager` with `fetchpriority="high"`; nothing else above the fold is lazy-loaded; and only the two fonts and expected weights load.
- These are lab numbers. Say so. Field data (CrUX) comes after launch in Phase 6.

### 3.7 · SEO (05 §6)
- Check titles, descriptions, canonicals and that no page is `noindex`. Run Rich Results Test on home (Organization), collection (BreadcrumbList) and product (Product + BreadcrumbList).
- Check **the prepared redirect CSV** against the URL inventory: every target is a live, relevant URL and there are no chains. Note that redirects can't be tested until legacy items are unpublished at launch; mark that **Not tested: launch step**.
- Confirm the sitemap on the dev store includes the jewelry pages.

### 3.8 · Analytics and consent (05 §7)
- In environment A: `page_viewed`, `collection_viewed`, `product_viewed`, `product_added_to_cart` and `checkout_started` each fire **once**.
- No personal data in custom payloads. Carried-over pixels (Klaviyo, and Clarity if kept) respect the consent banner.

### 3.9 · Code quality (05 §8)
- `shopify theme check` with no new errors.
- The `settings_data.json` diff touches only the listed keys.
- Every Dawn edit is in `CHANGELOG.md` with `PB:` markers.
- All strings come from locales, there are no secrets in the repo, and there are no browser console errors on any template.

### 3.10 · Craft carry-over (audit.md §5)
- Every carry-over item is ticked or has a documented reason. App embeds work in environment B. No Judge.me widget appears on jewelry templates.

---

## 4 · Fixing what you find

- **Theme bugs** (CSS, Liquid, JS in this repo): fix, commit as `fix(qa): …`, log the fix in the results file, and **retest the item and its neighbours**.
- **Design deviations**: fix them to match the spec. If you can't, add them to the deviation log and ask the owner. Never mark a deviation acceptable yourself.
- **Data or content issues** (product facts, copy, policies, store settings): don't fix them. Report them to the owner with the exact location; they go through the Phase 3 change protocol.
- **Platform limits** (checkout pages, Shopify emails, app widgets): record them as known limits in 05 §9.

## 5 · Deliverable: `docs/redesign/qa-results.md`

- Environments used, dates, theme and commit tested.
- One row per checklist item: ID, result, environment, evidence, note.
- Screenshot sets under `docs/redesign/qa/` (baseline, design fidelity, states).
- The deviation log, with each item fixed or approved (decision ID).
- The Lighthouse table: baseline vs new, lab, three-run medians.
- The axe summary and keyboard findings.
- Open issues, each with severity (**blocker** / major / minor), owner, and fix or accept.
- **"Not tested" list** with reasons.

## 6 · Phase 4 exit criteria

- [ ] Every item in `05-qa-checklist.md` §1–9 has a result and evidence, or a "Not tested" reason.
- [ ] **Zero open blockers**: no unapproved design deviation, no honesty failure, no broken purchase flow, and no serious or critical accessibility issue.
- [ ] Every major issue is fixed or explicitly accepted by the owner.
- [ ] The owner has reviewed `qa-results.md` and signed **F-01** in `owner-inputs.md`.
- [ ] Nothing published, no store data changed, no live-store orders.

## 7 · Report back with

The `qa-results.md` link, a one-paragraph verdict (ready / not ready, and why), the blocker list if any, and the next step: **Phase 5 launch**, run with the owner present (`phase-5-brief.md`).

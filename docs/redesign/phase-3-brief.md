# Phase 3 brief: catalog and content

**For:** the AI agent (or developer) supporting the owner after Phase 2.
**Goal:** get the store ready for a transactional launch:
- **products:** real, verified jewelry with photos and every fact checked;
- **store structure:** the collections, pages, menus and metafield definitions the theme expects;
- **content and policies:** accurate page copy and policies;
- **retirement plan:** a URL-by-URL plan for the legacy content.

**Who leads:** **the owner.** This is the first phase that changes the live store. The agent prepares, drafts and checks. The owner supplies facts and approves each store change before it happens.
**Not in scope:** publishing the theme, making jewelry visible, and unpublishing or redirecting legacy content. Those visibility changes happen in the **Phase 5 launch runbook**, with the owner present.

Read the whole brief first. The rules in §2 matter more than anything else here.

---

## 1 · Before you start

| Check | Required state |
| --- | --- |
| Phase 2 | Done and reported (`phase-2-brief.md` §4). The theme expects the structures this phase creates. |
| Rules | `/AGENTS.md`: never invent facts, no fake commerce, never delete legacy records, nothing published. D-21 still applies to any theme fix. |
| Owner availability | Many steps wait on owner answers or approvals. Batch the questions, and don't guess while waiting. |
| Access | **Admin**: a staff account with the needed permissions, or an Admin API token. Credentials go through the session's secure credential form, **never pasted in chat or committed**. **Search Console** export (A-03) for the content work in §3.4. |
| Trackers | `owner-inputs.md` sections C, D and E are the checklist for this phase. Keep their Status columns current. |

---

## 2 · The change protocol (every store change)

Each item in `owner-inputs.md` section E goes through these six steps, in order. **No step skipped, no batching of approvals.**

1. **Propose:** write the exact change (handles, values, settings, which records) in `docs/redesign/changes/E-xx.md`, with why and the rollback steps.
2. **Back up:** take the export or copy named in the E table's "Backup first" column. Store it under `docs/redesign/backup/`. **Never commit customer data or anything with personal data**; product, redirect and page exports are fine, customer and order exports aren't.
3. **Approve:** the owner approves that specific change. Record it in the E table: Status `Approved` plus "Approved by / date". An approval for one item never covers another.
4. **Apply** exactly what was approved, as **hidden or additive** wherever possible (§2.1).
5. **Verify:** check the change in Admin and on the storefront. Confirm nothing customer-facing changed unless that was the approved intent.
6. **Record:** set Status to `Done` with the date, and note anything unexpected.

### 2.1 · Hidden now, visible at launch

| Change | Do in Phase 3 (hidden) | Leave for Phase 5 (visible) |
| --- | --- | --- |
| E-01 metafield definitions | Create them (invisible to customers) | n/a |
| E-02 collections | Create them **with the Online Store channel off**, so they don't appear at URLs or in the sitemap | Make them available on Online Store |
| E-03 pages | Create them with **visibility: hidden**, on the default template. Admin can't assign the new templates yet: its template list only shows templates from the published (Craft) theme. | Assign the four templates right after the new theme is published, then make the pages visible |
| E-04 menus | Create the new menus. The live Craft theme doesn't reference them, so they're invisible. **Never edit `main-menu` or `footer`.** | The new theme starts using them when it's published |
| E-05 products | Create them with **status: Draft** (no channels) | Set them Active and publish to channels |
| E-06 Search & Discovery filters | Prepare the list and screenshot the current filters | Apply. Filters are store-wide and would affect the live Craft theme. |
| E-07 jewelry article fixes | Fix the two incorrect hypoallergenic claims **now** (approved, corrective, small). Draft the rest. | Consolidation and internal-link changes |
| E-08 unpublish legacy | Prepare the per-URL list | Apply |
| E-09 redirects | Prepare the redirect CSV | Import |
| E-10 policies | Draft the new text for owner/legal review | Replace |
| E-11 homepage SEO | Draft the title, description and OG image | Apply |
| E-12 feeds / Merchant Center | Record the account status | Apply |

If an approved change must be visible before launch, the owner says so explicitly in the approval.

---

## 3 · Workstreams

Run these in parallel where owner time allows. §3.1 is the critical path.

### 3.1 · Product truth (owner-inputs C-01 to C-11, E-01, E-05)
1. Send the owner the **fact sheet** in `product-data/README.md`, one per launch product. Start with cuffs and pendants, and hold rings until sizing and exchanges are ready (D-12).
2. As answers arrive, fill in `product-data/product-import-template.csv`. **Every `[VERIFY…]` value must be replaced by an owner-supplied fact or cleared.** Never estimate.
3. **Claims check:** compare every description and metafield against the banned list in `04-content-and-data.md` §1. A claim like nickel-free, hypoallergenic, lead-free, waterproof, solid brass, handmade or a country of origin needs **documentary evidence** from C-02 or C-06. Without it, the claim is removed. Record the evidence reference in a private note, **not** in a storefront field.
4. **Photography:** check the delivered files against `photography-brief.md`: shots P1–P4 per finish, the dark ground, naming, and an alt-text sheet. Report any gaps by file name.
5. **Product types and merch (C-11):** propose type values (`Bracelet`, `Necklace`, `Ring`) and the `jewelry` tag. The owner decides what happens to the merch products. Don't change existing products without approval.
6. **E-01:** propose the `custom.*` definitions exactly as in 04 §2 (dimensions and care are multi-line text, D-18), after checking the Admin export for compatible existing ones. Then follow the protocol.
7. **E-05:** export a current products CSV as a backup, import the verified CSV as **Draft**, and spot-check each product in the dev theme preview: variants, metafields, images and alt text.
- **Done when:** every launch product is a Draft with no `[VERIFY]` values, every claim has evidence on file, there are 4+ photos per finish, and the owner has signed off each product in C-01.

### 3.2 · Store structure (E-02, E-03, E-04, E-06)
- **E-02 collections:** `jewelry` (smart: tag `jewelry`), `bracelets` and `necklaces` (smart: product type). Create `rings` only when D-12 allows. The audit confirmed none of these handles exist. Create them **hidden** (§2.1).
- **E-03 pages:** `our-story`, `why-brass`, `jewelry-care`, `size-guide`. The handles are free, per the audit. Create them **hidden** on the default template, and use the content from §3.3. **Don't try to assign `page.our-story` and the others yet.** Admin's template dropdown only lists the *published* theme's templates, so they won't appear while Craft is live. Preview each layout in the unpublished theme's editor instead. The assignment happens in Phase 5, right after publishing.
- **E-04 menus:** `jewelry-main-menu`, `shop-categories`, `footer-shop`, `footer-learn`, `footer-help`, exactly as in 04 §3. Add Rings only when its collection has products.
- **E-06:** prepare only. Applying it changes filters on the live store.
- **Done when:** previewing the new theme (unpublished) shows working nav, footer links and category pills, the four page layouts preview correctly in its theme editor, and the live Craft storefront is unchanged.

### 3.3 · Page content (draft in the repo first)
Draft in `docs/redesign/content/` as Markdown. The owner approves the text there, then it's pasted into the hidden pages.
- **Our Story:** the approved brand story (04 §1, B-05). Est. 2019 refers to the brand, not jewelry. No invented manufacturing history.
- **Why Brass?:**
  - what brass is;
  - raw vs coated vs plated;
  - patina and skin discolouration, with a note to stop wearing a piece if irritation develops (green skin isn't proof of safety, or of harm);
  - links to the two kept articles and the collections.
- **Jewelry Care:** only finishes actually offered, and only steps confirmed on samples (C-05). No abrasive polish, acid or soaking advice for coated pieces without supplier approval.
- **Size Guide:** only measured, validated data (C-04): ring conversions, cuff inner circumference and opening, and chain lengths in cm and inches. No "adjustable" claim without tested limits.
- **Contact note:** the previous-orders date comes from the owner (D-06).
- **Done when:** every page is approved by the owner and pasted into its hidden page, with no bracketed placeholders left.

### 3.4 · Articles and SEO (E-07, A-03, `url-inventory.csv`)
1. **Now (corrective, needs approval):** fix the two incorrect hypoallergenic statements found in the audit, in `is-brass-good-for-jewelry` and `does-brass-jewelry-tarnish`. Back up the article HTML to `backup/` first. Change only those sentences.
2. With the Search Console export, fill in `clicks_16m` and `impressions_16m` in `url-inventory.csv`.
3. For each jewelry cluster (tarnish, green skin, cleaning, is-brass-good, material, comparisons), **propose** one URL to keep (the one with the most clicks) and 301 the rest **within the cluster only**. Merge their useful, accurate content into the kept article. Fix the weak `<title>`/SEO titles. The owner approves per cluster. **Apply at launch** (§2.1).
4. Legacy cannabis articles: propose keep-as-unlinked-archive or retire (404) per URL, using the traffic and backlink data. **Flag the health-claim articles** listed in the inventory for review or retirement whatever else is decided. **Never redirect legacy content to jewelry pages** (D-16).
5. Draft the homepage SEO title and description from 04 §5 (prelaunch or live version), plus an OG image crop from the approved hero photo (E-11).
- **Done when:** every row of `url-inventory.csv` has a final action, destination (if any), approver and date. The two claim fixes are live. The redirect CSV is prepared but **not imported**.

### 3.5 · Legacy retirement prep (E-08, E-09)
- From `url-inventory.csv`, produce:
  - `changes/E-08-unpublish.csv`: product handles, plus the channels each is removed from;
  - `changes/E-09-redirects.csv`: Shopify's redirect import format (`Redirect from`, `Redirect to`).
- Check every redirect target is a live, relevant URL. **No blanket redirect to the homepage.**
- Note which legacy support paths must survive (order help, contact, policies) and confirm the plan keeps them reachable (D-06).
- **Done when:** both files are reviewed and approved by the owner, ready for the Phase 5 runbook. Nothing is applied yet.

### 3.6 · Policies and consent (D-01 to D-06, E-10)
- Draft updated shipping, refund and exchange text in `content/policies/` from the owner's answers. Ring resizing and exchanges go in the refund/exchange policy. Mark them **for owner and legal review**.
- Newsletter consent wording (D-03) goes into the `pb-newsletter` consent setting on the **unpublished** theme only, once supplied.
- Record the owner's position on emailing legacy subscribers (D-04). **Don't send or schedule any email.**
- **Done when:** policy drafts are approved and ready to paste at launch, and the consent wording is in the theme.

### 3.7 · Apps and carry-over follow-through
- Finish any Craft carry-over item from Phase 2 that needed Admin: Klaviyo list and consent settings, and the consent banner. The `config-security.com` script is Triple Whale and isn't carried over (D-27).
- The owner decides on Microsoft Clarity, Sezzle, Yoast, Concierge and the Judge.me core embed (`owner-inputs.md` G-03 to G-07). Unpublish `/pages/page-2`, `/pages/reviews` and `/blogs/news/fathers-day-24` with backups (G-10 to G-12). Removal or app changes are store changes: follow the protocol.
- Judge.me stays installed and its records stay. Confirm no widget shows on jewelry templates.

---

## 4 · Phase 3 exit criteria

- [ ] `owner-inputs.md` C-01 to C-11 and D-01 to D-06 are `Provided` or `Approved` for every launch product, or explicitly marked as not needed by the owner.
- [ ] All launch products exist as **Draft**, with verified data, evidence on file for every claim, and complete photos and alt text.
- [ ] Collections, pages and menus exist **hidden**. The new theme previews correctly with them, and the **live Craft storefront is visibly unchanged** apart from the approved article corrections.
- [ ] `url-inventory.csv` is complete. The unpublish and redirect files are prepared and approved, **not applied**.
- [ ] Policy and page copy is approved, with no bracketed placeholders left anywhere in the theme or content.
- [ ] Every applied E item shows `Done`, with its backup in `backup/` and its proposal in `changes/`.
- [ ] Nothing is published, no legacy item is unpublished, no redirect is live, and no email is sent.

## 5 · Never, in this phase

- Publish the new theme, or make jewelry products, collections or pages visible.
- Unpublish, delete or edit legacy products, reviews, customers or orders (beyond approved, documented changes).
- Import redirects or change policies on the live store.
- Re-use or relabel pipe reviews, or show any rating that isn't for that exact jewelry product.
- Enter, estimate or "improve" a fact the owner hasn't supplied, including adding "nickel-free" because an article says reputable brands use it.
- Commit customer or order data, or any credential.

## 6 · Report back with

1. The status of every C, D and E item.
2. The list of applied changes, each with its backup, approval and verification.
3. The product readiness table: product → data ✔ / evidence ✔ / photos ✔ / owner sign-off ✔.
4. The completed `url-inventory.csv` plus the prepared unpublish and redirect files.
5. Anything blocked, and on whom.
6. Next step: **Phase 4 QA** ([`phase-4-brief.md`](phase-4-brief.md)), then the **Phase 5 launch runbook** ([`phase-5-brief.md`](phase-5-brief.md)) with the owner present.

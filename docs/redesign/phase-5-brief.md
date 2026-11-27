# Phase 5 brief: launch (and Phase 6 monitoring)

**For:** the AI agent (or developer) running launch day **with the owner present**, then the four weeks after.
**Goal:** switch parkdalebrass.com from the Craft pipe store to the Archive jewelry store in one controlled session: everything backed up, every step approved, every step verified, and a tested way back.
**Hard rule:** **nothing in this brief runs without the owner present and the go/no-go passed.** Publishing the theme needs F-04 signed. If the owner leaves, stop at the next safe checkpoint (§4).

---

## 1 · Go / no-go (all must be true before step 1)

| Gate | Where | Required |
| --- | --- | --- |
| F-01 QA signed | `owner-inputs.md` F | `qa-results.md` reviewed, zero open blockers |
| F-02 Runbook reviewed | `owner-inputs.md` F | The owner has read this brief and the rollback table |
| Phase 3 complete | `phase-3-brief.md` §4 | Products Draft and verified; collections, pages and menus hidden; unpublish and redirect files approved |
| Policies ready | D-01 to D-06, E-10 | Approved text ready to paste |
| Consent wording | D-03 | In the theme's newsletter section |
| Selling plan | F-05 | The store is on a paid plan, not *Pause and Build*, so checkout works (owner, billing) |
| Photography | C-09, C-10 | Every `pb-*` image is set, so no placeholder art or "Placeholder · …" art-direction note shows on the storefront |
| Timing | Owner | A low-traffic window, at least 2 hours free, no promotions or emails scheduled |
| Change freeze | Owner | No other Admin or app changes during the window |
| Access | Owner + agent | Admin access for each step; the CLI only if publishing that way |
| **Customer accounts** | `owner-inputs.md` E-13 | Dawn 16 has **no legacy customer account templates** (see `release-notes.md`). The store must use **new customer accounts** before publishing. If it was on legacy accounts, the upgrade is done and approved (E-13), and sign-in plus order history were checked on the new theme in Phase 4. |

If any gate fails: **no-go**. Record why in `owner-inputs.md` and reschedule.

---

## 2 · Runbook

Record each step in `docs/redesign/launch-log.md` (time, who, result, evidence) as you go. The steps are ordered so legacy content is never redirected before it's gone, and the new theme only goes live once the jewelry is visible.

### Step 1 · Back up (F-03)
1. Duplicate the live Craft theme in Admin and name it `Backup pre-jewelry YYYY-MM-DD`. Note its theme ID in the log.
2. Export the products CSV (all products) and the redirects CSV. Store them under `docs/redesign/backup/launch-YYYY-MM-DD/`.
3. Screenshot the menus (`main-menu`, `footer`), the Search & Discovery filters, Preferences (title, description, social image) and every channel's product availability.
4. Copy all four policies' current text into the backup folder.
5. **Articles:** for every article that step 6 hides or step 7 changes, save its body HTML, title, SEO title, meta description, handle and visibility to `backup/launch-YYYY-MM-DD/articles/`.
6. **Product, collection and page state:** record the current status and channel availability of every jewelry product, collection and page you'll change in step 3. All should be Draft or hidden, so the record is short.
7. Customer or consent exports, if taken, stay **outside the repo**, kept by the owner. They contain personal data.
8. Owner signs **F-03**.

**Checkpoint A.** Nothing customer-facing has changed yet. Safe to stop.

### Step 2 · Prepare the new theme (still unpublished)
1. In the new theme's editor, switch the homepage to the live configuration (`docs/redesign/index.live.json`):
   - `pb-featured` set to collection mode (`jewelry`);
   - hero CTA "Shop jewelry";
   - live editorial CTA;
   - newsletter button "Subscribe";
   - remove the prelaunch announcement unless there's a verified message.
2. Confirm the header uses `jewelry-main-menu` and the footer uses the three new menus. Check that Rings appears only if it has products.
3. Preview it: it should look right but show empty product areas (the products are still Draft). That's expected.

**Checkpoint B.** Still invisible to customers. Safe to stop.

### Step 3 · Make the jewelry visible (E-05, E-02, E-03)
1. Set the launch products to **Active** and publish them to **Online Store** (other channels in step 8).
2. Make `jewelry`, `bracelets` and `necklaces` (and `rings` only if approved) available on Online Store.
3. Leave the four content pages **hidden** for now. Their templates can only be assigned once the new theme is published (step 5).
4. Check in the new theme's preview that home, collection and product pages now show real products.

From here the jewelry URLs are public. The old Craft theme is still live, so the window between here and step 5 should be minutes.

### Step 4 · Search filters (E-06)
Apply Availability + Price only, per the Phase 3 proposal.

### Step 5 · Publish the new theme (F-04)
1. The owner signs **F-04** in `owner-inputs.md`.
2. Publish the new theme in Admin (Online Store → Themes → Publish), or with `shopify theme publish --theme <id>` if the owner prefers the CLI.
3. **Check the page templates.** E-03 already set each page's template suffix through the API ([`changes/E-03.md`](changes/E-03.md) §1.1), so confirm in Admin (now listing the new theme's templates) that `our-story` → `page.our-story`, `why-brass` → `page.why-brass`, `jewelry-care` → `page.jewelry-care`, `size-guide` → `page.size-guide`, and set any that an Admin edit reset. Then make the four pages **visible** (only once their bodies hold approved copy with no `[bracketed placeholder]` left), and open each one to check its layout.
4. Hard-refresh the storefront on a phone and a desktop.

**Checkpoint C.** The new theme is live. Rollback from here is the full table in §3.

### Step 6 · Retire legacy visibility (E-08), then redirects (E-09)
1. Unpublish the legacy products listed in the approved `changes/E-08-unpublish.csv` from each listed channel. **Don't delete them.**
2. Apply the approved legacy article and collection actions from `url-inventory.csv` (hide or keep as unlinked archive).
3. **Then** import `changes/E-09-redirects.csv` (Admin → Navigation → URL redirects → Import). Record every redirect created in `launch-log.md` (from/to). Shopify redirects only take effect when nothing else exists at the old path, which is why unpublishing comes first.
4. Test five redirects from the file and two retired URLs that should 404.

### Step 7 · Policies, SEO, article consolidation (E-10, E-11, E-07)
1. Paste the approved policy text for shipping, refund/exchange, privacy and terms.
2. Set the homepage title, meta description and social image (live versions from 04 §5).
3. Apply the approved jewelry-article consolidations: merged content in the kept article, and in-cluster redirects (if not in step 6's file). **Record each article changed and each redirect created** in `launch-log.md`. The step 1 article backup is what rollback restores from.

### Step 8 · Channels and feeds (E-12)
Only if the owner confirmed the Merchant Center / ads account status beforehand:
- publish jewelry to the approved channels;
- remove retired products from feeds through channel settings.

**Never attempt to evade an existing restriction or policy.** If the account status is unknown, skip this step and schedule it for later.

### Step 9 · Smoke test (within 15 minutes of step 5)
On a phone and a desktop, logged out, in a private window:
- [ ] Home, `/collections/jewelry`, one product page, the four content pages (each on its own template) and one article load with no console errors.
- [ ] Customer sign-in works and shows order history (new customer accounts, E-13).
- [ ] Nav, footer links and search work. Search for "pipe" shows no jewelry-page pollution, and legacy items behave as decided.
- [ ] Add to bag, edit the cart, reach the checkout page. **Don't complete an order** unless the owner approved a test-order plan (e.g. a 100% discount code, then cancel and refund).
- [ ] Newsletter signup succeeds.
- [ ] Five redirects work, and retired URLs 404.
- [ ] `/sitemap.xml` loads and lists the jewelry URLs.
- [ ] The consent banner shows, and Klaviyo and other pixels behave as configured.
- [ ] No Judge.me pipe reviews or ratings on any jewelry page.

Any failure in the purchase path, wrong content on jewelry pages, or broken nav is a **rollback trigger** (§3) unless it's fixed within 15 minutes.

### Step 10 · Search Console
Submit `/sitemap.xml`. Use URL Inspection to request indexing for `/`, `/collections/jewelry` and one product page. Note the date for Phase 6.

### Step 11 · Close
- Owner and agent confirm the launch in `launch-log.md`.
- Mark the E items `Done` and F-04 `Done` in `owner-inputs.md`.
- **No marketing email to legacy subscribers** until D-04 (lawful basis) is resolved.

---

## 3 · Rollback

**Triggers:** the purchase path is broken, legacy or wrong content appears on jewelry pages, a site-wide error or blank page, or the owner calls it. Decide within 15 minutes of noticing.

Run **every row that applies**. A theme rollback alone doesn't undo store data.

| Order | What | How | Time |
| --- | --- | --- | --- |
| 1 | Theme | Publish `Backup pre-jewelry …` | ~1 min |
| 2 | Redirects | Delete **every** redirect created at launch, from both step 6 and step 7, using the list in `launch-log.md` | ~5 min |
| 3 | Legacy products | Re-publish per channel from `E-08-unpublish.csv` | ~10 min |
| 4 | Legacy articles and collections | Reverse the step 6.2 actions from the inventory | ~10 min |
| 4b | Jewelry articles changed in step 7 | Restore the body HTML, title, SEO fields and visibility from the step 1 article backup | ~10 min |
| 5 | Policies | Paste back the backed-up text | ~5 min |
| 6 | Preferences | Restore the title, description and image from the step 1 screenshots | ~2 min |
| 7 | Jewelry products, collections, pages | **Restore the step 1 state:** products back to **Draft** and off every channel; collections off Online Store; pages **hidden**. Then, logged out, check that a product URL, `/collections/all` and site search show no jewelry. Leaving them active would keep them purchasable through direct links, search and `/collections/all`, even under Craft. | ~5 min |
| 8 | Search filters, channels | Restore from the screenshots | ~5 min |
| 9 | Menus | Nothing to do. `main-menu` and `footer` were never edited, and the backup theme uses them. | n/a |

After a rollback: smoke-test the old store, record what happened in `launch-log.md`, and fix the cause in a new Phase 4 cycle before any retry.

---

## 4 · If the session must stop early

- Before checkpoint A or B: stop. Nothing is visible.
- Between steps 3 and 5: either finish step 5 or set the jewelry back to hidden (rollback row 7).
- After step 5: finish step 6 (unpublish, then redirects) **as a pair** or don't start it. Never leave redirects imported while legacy items are still published, or legacy items unpublished with no redirects for high-traffic URLs.

---

## 5 · Phase 6: monitoring (4 weeks after launch)

Every week, add a short report to `docs/redesign/monitoring/week-N.md` covering:

| Area | Check | Source |
| --- | --- | --- |
| Indexing | Jewelry pages indexed, coverage errors, sitemap status | Search Console |
| Search | Impressions and clicks for jewelry queries; legacy query decline; top landing pages | Search Console |
| Errors | 404s (especially old URLs without redirects), redirect chains, theme JS errors | Search Console, the browser console, Shopify reports |
| Funnel | Sessions → product views → add to bag → checkout → purchase | Shopify Analytics |
| Speed | Core Web Vitals field data once available; compare to the Phase 4 lab numbers | CrUX / Shopify Web Performance |
| Signup | Newsletter signups and consent states | Shopify customers / Klaviyo |
| Support | Emails about old orders, returns, confusion about the pivot | Owner |

**Propose, don't apply.** Every fix or new redirect goes back through the change protocol (`phase-3-brief.md` §2) or a Phase 4 retest. After week 4, the owner decides what's next: the rings launch, more products, the `/collections/all` clean-up, legacy blog retirement.

---

## 6 · Report back with

`launch-log.md` (every step, time, result, evidence), the smoke-test results, any rollback taken and why, the updated `owner-inputs.md` (E and F items), and the Phase 6 week-1 report date.

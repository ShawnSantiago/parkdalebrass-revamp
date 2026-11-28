# Search traffic and the redirect plan (2026-11-28)

For the owner. This report covers what the traffic data shows and what the plan does with every public URL, and records the decisions you made on 2026-11-28 (§6, D-69). The only store change from this plan so far is the 24 articles hidden on 2026-11-28 (OD-7, OD-8); everything else happens at launch. The files:

- [`url-inventory.csv`](url-inventory.csv): all 279 URLs (the 167 originals plus 112 added from the traffic data), each with its 16-month and 3-month Search Console numbers, Shopify sessions and orders, final action and destination. Every row now has an approver: the rows your 2026-11-28 answers decided read "Owner (in chat, D-69)".
- [`changes/E-08-unpublish.csv`](changes/E-08-unpublish.csv): 103 items to archive, unpublish or hide at launch steps 6.1 and 6.2 (12 products, 14 collections, 77 articles), then 17 legacy redirects to delete at step 6 (`type` = `redirect`, action `delete-redirect`). Nothing in it is deleted except those 17 redirects.
- [`changes/E-09-redirects.csv`](changes/E-09-redirects.csv): 45 redirects in Shopify's import format, imported at launch step 6.3, after E-08 ([`phase-5-brief.md`](phase-5-brief.md) step 6). Some rows wait on a condition first (§6, "When each E-09 row can go live").

## 1. What the data covers

| Source | Window | Totals |
| --- | --- | --- |
| Search Console, web, [16 months](backup/2026-11-27/search/search-console-16m/) | 2025-07-26 to 2026-11-25 (Chart.csv) | 5,697 clicks, 1,290,785 impressions over 160 page URLs |
| Search Console, web, [3 months](backup/2026-11-27/search/search-console-3m/) | 2026-08-26 to 2026-11-25 | 692 clicks, 117,308 impressions over 128 page URLs |
| Shopify "Sessions by landing page path" ([CSV](backup/2026-11-27/search/shopify/sessions-by-landing-page.csv)) | **Not stated in the file.** We asked for the last 12 months; please confirm. Deleted products still show sessions, so the range probably goes back further. | 346,889 sessions, 145 completed checkouts |

- Search Console has no page column for queries, so query numbers are site-wide.
- Backlinks are still unknown: the `backlinks` column is empty (part of A-03).
- The inventory's `*_16m` columns hold 16-month numbers only. The 3-month numbers are in `gsc_clicks_3m` and `gsc_impressions_3m`.

## 2. Headline numbers

- **Search demand for the old content is fading.** The 101 legacy articles had 3,255 clicks in 16 months but only 361 in the last 3. That's 11% of the clicks in 19% of the time.
- **The jewelry articles are the search asset.** The 32 jewelry articles had 1,943 clicks and 854,421 impressions in 16 months (240 and 81,238 in the last 3). Their click-through rate is low because they rank on page 1 but rarely win the click.
- **Most visitors aren't in the launch market.** Of 346,889 sessions, 252,459 were from the United States and 31,629 from Canada. 255,178 sessions came from search.
- **Brand searches barely exist.** No query in either top-1,000 list contains "brockton". "bellwoods" appears only in the 3-month list: 0 clicks, 7 impressions.

## 3. Where orders came from

There were 145 completed checkouts, all from the pipe-era store:

| Landing page group | Sessions | Completed checkouts |
| --- | ---: | ---: |
| Homepage `/` | 25,163 | 41 |
| Legacy articles (101) | 303,390 | 36 |
| D-39 pipe products (brockton-mk2 31, special edition 2, bellwoods one-hitter 2) | 3,449 | 35 |
| Collections (metal-smoking-pipes 14) | 3,968 | 16 |
| System, cart, checkout, pages and other paths | 3,643 | 13 |
| Other products (accessories, deleted items) | 609 | 3 |
| Brand merch | 1,296 | 1 |
| Jewelry articles (32) | 5,367 | 0 |

- By referrer: search 87, direct 49, other or unknown 9.
- By country: United States 108, Canada 23, Australia 5, other 9.
- The legacy article orders are concentrated: the-brockton-versus-the-proto-pipe 10, why-you-should-try-metal-weed-pipes 9, how-to-clean-a-metal-smoking-pipe 3, 3-benefits-of-a-smoking-pipe-with-a-lid 3.
- In short, the orders followed pipes, and no jewelry page has an order yet. Retiring legacy pages loses pipe-buying traffic, not jewelry buyers.

## 4. The plan by group

| Group | URLs | Final action | In which file |
| --- | ---: | --- | --- |
| Core, system, policy and account routes, brand pages, the Journal view | 23 | keep or keep-update | none |
| Jewelry and brand articles kept and updated | 16 | keep-update | none |
| D-39 same-name 301s: 3 pipe products and 4 repointed Brockton redirects | 7 | archive, then 301 to the signet or pendant, once both jewelry products are published (OD-1) | E-08 and E-09 |
| Dead or misspelt jewelry article handles, plus `/blogs` and the about paths | 20 | consolidate-301 to a kept page | E-09 |
| Jewelry article consolidations and the-parkdale-brass-story | 18 | consolidate-301 (OD-10 to OD-15); the story is hidden at launch and 301s to `/pages/our-story` (OD-13) | E-09 (the story also in E-08) |
| Legacy collections | 13 | unpublish, no redirect (`/collections/shop` 404s, OD-6; metal-smoking-pipes, OD-4) | E-08 |
| Legacy articles | 101 | retire-404, no redirect: fathers-day-24 done (G-12); 24 hidden 2026-11-28 (OD-7, OD-8); 76 hidden at launch (OD-8, OD-9) | E-08 (the 76) |
| Brand merch: 7 products, `/collections/apparel`, `/products/dad-hat` | 9 | retire-404: off every channel at launch after the CSV export, never deleted; dad-hat is already gone and gets no 301 (OD-2) | E-08 |
| Pipe accessories still on sale | 2 | retire-404: off every channel at launch (OD-5) | E-08 |
| Legacy redirects to the homepage, plus blog-post | 17 | delete the redirect at launch step 6 so the path returns 404 (OD-3) | E-08 (`delete-redirect` rows) |
| Deleted products, dead legacy handles, probes, pages already retired (G-10, G-11, G-21) | 42 | retire-404, nothing to do (already 404) | none |
| Legacy blog tag pages and CDN images | 11 | keep-unlinked-archive or keep; they follow the article decision | none |

Notes on the two files:

- **Repointed redirects.** Four E-09 rows already exist as redirects: `/products/the-brockton`, `/products/brockton`, `/collections/shop/products/the-brockton` and `/products/copy-of-the-brockton-mk2-special-edition`. Tick "overwrite existing redirects" on import, or edit those four by hand.
- **Chain check (2026-11-28, 45 rows).** The file was checked against itself and against the 21 active redirects, less the 17 deleted at step 6. No source appears twice, no target is a redirect source, no target is retired, and the result has no loops.
- **Launch order.** See §6, "When each E-09 row can go live".
- **Stock.** `the-bellwoods-one-hitter` has an inventory of 125 in `products.csv`. Archiving it takes that stock off sale.
- **No action needed.** `organic-hemp-wicks` is already Draft with no channels, so it isn't in E-08.

### What the 16-month check changed

Every final action was rechecked against the 16-month numbers:

- **Tarnish cluster: the ranking reverses on clicks.** `does-brass-jewelry-tarnish` had 166 clicks and 86,578 impressions, against 137 and 121,081 for the planned canonical `does-brass-tarnish`. The owner kept `does-brass-tarnish` as the canonical (OD-14), so the other tarnish pages, `/blogs/jewelry-stories/does-brass-jewelry-tarnish` and the dead handle `the-straight-answer-will-brass-jewelry-tarnish` all 301 to it.
- **"Is brass good" cluster: one page reverses.** `is-brass-good-metal-for-mens-jewelry` had 15 clicks and 8,162 impressions, against 10 and 18,378 for `is-brass-good-for-jewelry`. The owner kept `is-brass-good-for-jewelry` as the canonical (OD-15).
- **Confirmed by 16 months:** what-is-brass-made-of over what-is-brass-jewelry-metal (69 clicks against 32), brass-jewelry over brass-mens-jewelry (21 against 14), and does-brass-turn-your-skin-green over does-brass-jewelry-turn-skin-green (166 against 7). The green merge (OD-11) is still close: 217 clicks against 188, but the page to merge has more impressions (103,850 against 82,798).
- **Legacy pages with large 16-month numbers:** how-to-clean-a-metal-smoking-pipe (1,352 clicks, the top page on the site; 193 in the last 3 months), does-coughing-get-you-higher (346), does-smoking-more-get-you-higher (326) and how-to-clean-a-santa-cruz-shredder (293). D-16 gives them no jewelry destination, so the choice was keep or 404. The owner chose to retire them all at launch (OD-9).
- **`/collections/apparel`:** 109 clicks and 35,900 impressions in 16 months, but 0 and 24 in the last 3. The 16-month query list has an unrelated query, "ajo89", with 102 clicks and 30,833 impressions. It probably accounts for most of this, but the export can't tie a query to a page. The owner retires apparel at launch (OD-2).
- **Seven dead handles appear only in the 16-month export.** They are added to the inventory. Four get a 301 to the article on the same topic. `is-brass-jewelry-safe` (8 impressions) and `understanding-the-metal` (1) stay 404: one has no article with verified safety facts to point to, and the other matches two articles. `the-straight-answer-will-brass-jewelry-tarnish` waits on OD-14.

## 5. Content opportunities for jewelry

These jewelry pages rank on page 1 but win few clicks. Better titles and meta descriptions in the E-07 rewrite are the cheapest gain. Figures are 16-month site-wide query totals:

- **"does brass tarnish":** 68,334 impressions, 64 clicks, position 6.13. "does brass jewelry tarnish" adds 11,694 impressions and 13 clicks. This is the largest jewelry query, and `does-brass-tarnish` owns it (OD-14).
- **Turning green:** "does brass turn green" (19,141 impressions, 33 clicks) and "does brass turn your skin green" (15,601, 17), with many variants, all at position 5 to 8.
- **"gold plated brass":** 7,669 impressions, 30 clicks. The update must separate plating from the launch finishes, raw brass and chrome (D-44).
- **"is brass waterproof":** 6,528 impressions, 29 clicks, position 3.16. is-brass-jewelry-waterproof is the strongest jewelry article (405 clicks in 16 months).
- **Other queries:** "does brass rust" (7,954 impressions at position 18.72) and "what is brass" (4,738 at 16.35) need better pages. `/pages/why-brass` can take "what is brass".
- **Internal links:** link these articles to `/collections/jewelry`, `/pages/jewelry-care` and `/pages/why-brass`, and the necklace article to the pendant once it's live. Care and safety facts only come from your verified data (`04` §1).

## 6. Decided by the owner (2026-11-28)

The owner answered OD-1 to OD-15 in chat on 2026-11-28 and took the recommended option on each (D-69, which amends D-36). Each row's final action, approver and date is in `url-inventory.csv`.

| # | Decision | When |
| --- | --- | --- |
| OD-1 | The D-39 same-name 301s go ahead: brockton-mk2 and its special edition 301 to the signet, the-bellwoods-one-hitter to the pendant, and the 4 old Brockton redirects are repointed. **Only once both jewelry products are published.** | Launch, step 6.3 |
| OD-2 | Brand merch retired: the 7 products come off every channel after the products CSV export and are never deleted; `/collections/apparel` is unpublished; `/products/dad-hat` stays a 404 with no 301. | Launch, step 6.1 |
| OD-3 | The 16 legacy redirects to the homepage and `/blogs/news/blog-post` → `/blogs/news/fathers-day-24` are deleted, each logged in `owner-inputs.md` E. The owner was told and approved the deletion. | Launch, step 6 |
| OD-4 | `/collections/metal-smoking-pipes` is unpublished (404), the same day the pipes are archived. | Launch, step 6.1 |
| OD-5 | brass-pipe-screens and the 6.5" pipe cleaners come off every channel after the CSV export (404). | Launch, step 6.1 |
| OD-6 | `/collections/shop` is unpublished and returns 404, with no redirect. | Launch, step 6.1 |
| OD-7 | The 20 legacy articles with health, medical or safety claims are hidden now, after an HTML backup, with no redirect. Amends D-36 for them. | **Now (done 2026-11-28)** |
| OD-8 | The 4 Parkdale Brass pipe articles with brass safety claims are hidden now; the other 4 at launch. None is ever redirected to jewelry. | 4 **now (done 2026-11-28)**, 4 at launch step 6.2 |
| OD-9 | The other 72 cannabis and smoking articles are hidden (never deleted), with no redirect (D-16). | Launch, step 6.2 |
| OD-10 | The jewelry-article consolidations go ahead as recommended. The 5 cleaning merges wait until how-to-clean-brass-jewelry is rewritten as a cleaning guide. | E-07 rewrite, launch step 7 |
| OD-11 | does-brass-jewelry-turn-green merges into does-brass-turn-green. | Launch, step 7 |
| OD-12 | what-is-brass-jewelry-metal merges into what-is-brass-made-of (`04` §5 amended). | Launch, step 7 |
| OD-13 | the-parkdale-brass-story is hidden and 301s to `/pages/our-story`. | Launch, steps 6.2 and 6.3 |
| OD-14 | does-brass-tarnish is the tarnish canonical; does-brass-jewelry-tarnish, will-brass-jewelry-tarnish, brass-tarnish-jewelry-changes-color and brass-jewelry-tarnish merge into it. | Launch, step 7 |
| OD-15 | is-brass-good-for-jewelry is the canonical; is-brass-good-metal-for-mens-jewelry and is-brass-jewelry-good merge into it. | Launch, step 7 |

**OD-7 articles (20, hidden 2026-11-28):** can-you-donate-plasma-if-you-smoke-weed, marijuana-and-vitamin-c, 5-ways-to-get-higher-from-weed, when-to-stop-smoking-weed-while-pregnant, is-brass-safe-to-smoke-out-of, edibles-vs-smoking, cannabis-and-sex-does-weed-make-you-horny, what-are-the-differences-between-cbda-cbg, choosing-the-best-cannabis-strains-for-pain, cbd-vs-thc-is-one-better-for-you-than-the-other, let-s-talk-about-kief-and-how-awesome-it-is, is-marijuana-a-depressant-how-it-impacts-the-brain, jacqui-childs-cannabis-journey, how-to-dose-cannabis-properly-in-all-forms, the-best-cannabis-strains-for-anxiety, 3-benefits-of-cbd-skincare, cannabis-helps-prevent-covid-19-infections, 4-reasons-to-keep-cbd-legal, cannabis-and-your-pet, why-cannabis-gives-you-munchies.

**OD-8 articles (8):** hidden 2026-11-28, with brass safety claims: an-introduction-to-the-brockton, an-introduction-to-the-brockton-mk2, the-brockton-versus-the-journey-pipe and slow-smoking-with-brass-pipes. Hidden at launch: 3-benefits-of-a-smoking-pipe-with-a-lid, the-brockton-versus-the-proto-pipe, a-review-of-the-brockton-by-alyssa-yeoman and slow-smoking-on-the-go-with-the-bellwoods.

**OD-9 articles (72):** every other `legacy-smoking` article in `url-inventory.csv`; each is an `article` row with basis "OD-9" in `changes/E-08-unpublish.csv`.

The record of the 24 articles hidden now (backups, IDs, verification and rollback) is [`changes/OD-7-OD-8.md`](changes/OD-7-OD-8.md), logged in `owner-inputs.md` E-17.

### Launch counts

| What | Count | Where |
| --- | ---: | --- |
| Legacy articles hidden before launch | 25 | fathers-day-24 (G-12) and the 24 above |
| Articles hidden at launch step 6.2 | 77 | 72 (OD-9) + 4 (OD-8) + the-parkdale-brass-story (OD-13); E-08 |
| Legacy articles published after launch | 0 of 101 | |
| Jewelry articles merged and hidden at step 7 | 15 | 10 at the E-07 rewrite, 5 after the cleaning-guide rewrite |
| Articles kept after launch | 16 | 15 jewelry canonicals plus the-bright-history-of-brass (still untagged until its B-05 rewrite, G-18) |
| Pipe products archived | 3 | D-39; E-08 |
| Products taken off every channel | 9 | 7 merch (OD-2) + 2 pipe accessories (OD-5); E-08 |
| Collections unpublished | 14 | 13 legacy + apparel; E-08 |
| Legacy redirects deleted | 17 | OD-3; E-08 `delete-redirect` rows |
| Redirects in E-09 | 45 | 27 earlier rows + 17 jewelry consolidations + the-parkdale-brass-story; 4 of them overwrite existing redirects |
| Redirects active after step 7 | 45 | the 21 live today, minus 17 deleted, with the other 4 repointed by E-09 |

### When each E-09 row can go live

Shopify applies a redirect only when nothing is published at its old path, so a row imported early stays dormant until its source is archived, unpublished or hidden. Still, each group below has a condition, and a row whose condition isn't met at step 6.3 waits for step 7 (step 7.3 imports any in-cluster redirect not in step 6's file).

| Rows | Count | Waits for |
| --- | ---: | --- |
| `/products/brockton-mk2`, `/products/brockton-mk2-special-edition`, `/products/the-bellwoods-one-hitter`, and the 4 repointed `/products/the-brockton`, `/products/brockton`, `/collections/shop/products/the-brockton`, `/products/copy-of-the-brockton-mk2-special-edition` | 7 | **Both jewelry products published** (`the-brockton-signet`, `the-bellwoods-pendant`; both Draft today, OD-1). If they aren't, leave these 7 out of the import: the pipes stay archived (404) and the 4 old redirects keep pointing at them until the products are live. |
| `/about`, `/about-us`, `/our-story`, `/blogs/news/the-parkdale-brass-story` | 4 | `/pages/our-story` showing its approved copy (step 3, B-05). The story is hidden at step 6.2 first (E-08). |
| does-brass-jewelry-tarnish, will-brass-jewelry-tarnish, brass-tarnish-jewelry-changes-color, brass-jewelry-tarnish (→ does-brass-tarnish); does-brass-jewelry-turn-green (→ does-brass-turn-green); does-brass-jewelry-turn-skin-green (→ does-brass-turn-your-skin-green); brass-mens-jewelry (→ brass-jewelry); is-brass-jewelry-good, is-brass-good-metal-for-mens-jewelry (→ is-brass-good-for-jewelry); what-is-brass-jewelry-metal (→ what-is-brass-made-of) | 10 | **The E-07 rewrite** (launch step 7): back up the article's HTML, merge its content into the kept article, hide the old article (never delete it). Its 301 takes effect when it is hidden. |
| importance-cleaning-brass-jewelry, why-cleaning-brass-jewelry-matters, why-cleaning-your-brass-jewelry-is-essential, why-your-brass-jewelry-needs-polishing, importance-right-brass-cleaner (→ how-to-clean-brass-jewelry) | 5 | **The cleaning-guide rewrite** of how-to-clean-brass-jewelry (its title is about tarnish today). Until then the 5 articles stay published and their 301s stay dormant. |
| The 2 dead tarnish handles (`/blogs/news/the-straight-answer-will-brass-jewelry-tarnish`, `/blogs/jewelry-stories/does-brass-jewelry-tarnish`) and the 16 other dead or misspelt handles and `/blogs` | 19 | Nothing: these paths already 404, so the 301s work from step 6.3. |

Rollback (`phase-5-brief.md` §3 step 2) deletes every redirect created at launch, dormant or not, from the list in `launch-log.md`.

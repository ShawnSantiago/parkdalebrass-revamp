# Search traffic and the redirect plan (2026-11-28)

For the owner. This report covers what the traffic data shows and what the plan does with every public URL, then lists the decisions only you can make. Nothing here has changed the store yet. The files:

- [`url-inventory.csv`](url-inventory.csv): all 279 URLs (the 167 originals plus 112 added from the traffic data), each with its 16-month and 3-month Search Console numbers, Shopify sessions and orders, final action and destination. A blank `approved_by` means the row waits on one of your decisions below.
- [`changes/E-08-unpublish.csv`](changes/E-08-unpublish.csv): 16 items to archive or unpublish at launch step 6.1 (3 pipe products, 13 collections).
- [`changes/E-09-redirects.csv`](changes/E-09-redirects.csv): 27 redirects in Shopify's import format, imported at launch step 6.3, after E-08 ([`phase-5-brief.md`](phase-5-brief.md) step 6).

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
| D-39 same-name 301s: 3 pipe products and 4 repointed Brockton redirects | 7 | archive, then 301 to the signet or pendant | E-08 and E-09 |
| Dead or misspelt jewelry article handles, plus `/blogs` and the about paths | 20 | consolidate-301 to a kept page | E-09 |
| Jewelry article consolidations and the-parkdale-brass-story | 18 | consolidate-301 or owner-decision | pending (OD-10 to OD-15) |
| Legacy collections | 13 | unpublish, no redirect | E-08 |
| Legacy articles | 101 | retire-404 recommended; fathers-day-24 is already done (G-12) | pending (OD-7 to OD-9) |
| Brand merch: 7 products, `/collections/apparel`, `/products/dad-hat` | 9 | owner-decision | pending (OD-2) |
| Pipe accessories still on sale | 2 | retire-404 recommended | pending (OD-5) |
| Legacy redirects to the homepage, plus blog-post | 17 | delete the redirect so the path returns 404 | pending (OD-3) |
| Deleted products, dead legacy handles, probes, pages already retired (G-10, G-11, G-21) | 42 | retire-404, nothing to do (already 404) | none |
| Legacy blog tag pages and CDN images | 11 | keep-unlinked-archive or keep; they follow the article decision | none |

Notes on the two files:

- **Repointed redirects.** Four E-09 rows already exist as redirects: `/products/the-brockton`, `/products/brockton`, `/collections/shop/products/the-brockton` and `/products/copy-of-the-brockton-mk2-special-edition`. Tick "overwrite existing redirects" on import, or edit those four by hand.
- **Chain check.** The file was checked against the 21 active redirects and against itself. No target is a redirect source, no target is retired, and the result has no loops.
- **Launch order.** The D-39 301s only work once `the-brockton-signet` and `the-bellwoods-pendant` are published. Both are Draft today. The about paths need `/pages/our-story` to show its approved copy (step 3).
- **Stock.** `the-bellwoods-one-hitter` has an inventory of 125 in `products.csv`. Archiving it takes that stock off sale.
- **No action needed.** `organic-hemp-wicks` is already Draft with no channels, so it isn't in E-08.

### What the 16-month check changed

Every final action was rechecked against the 16-month numbers:

- **Tarnish cluster: the ranking reverses on clicks.** `does-brass-jewelry-tarnish` had 166 clicks and 86,578 impressions, against 137 and 121,081 for the planned canonical `does-brass-tarnish`. It is now an owner decision (OD-14). The other tarnish merges, `/blogs/jewelry-stories/does-brass-jewelry-tarnish` and the new dead handle `the-straight-answer-will-brass-jewelry-tarnish`, wait on it.
- **"Is brass good" cluster: one page reverses.** `is-brass-good-metal-for-mens-jewelry` had 15 clicks and 8,162 impressions, against 10 and 18,378 for `is-brass-good-for-jewelry`. It is now an owner decision (OD-15).
- **Confirmed by 16 months:** what-is-brass-made-of over what-is-brass-jewelry-metal (69 clicks against 32), brass-jewelry over brass-mens-jewelry (21 against 14), and does-brass-turn-your-skin-green over does-brass-jewelry-turn-skin-green (166 against 7). The green merge (OD-11) is still close: 217 clicks against 188, but the page to merge has more impressions (103,850 against 82,798).
- **Legacy pages with large 16-month numbers:** how-to-clean-a-metal-smoking-pipe (1,352 clicks, the top page on the site; 193 in the last 3 months), does-coughing-get-you-higher (346), does-smoking-more-get-you-higher (326) and how-to-clean-a-santa-cruz-shredder (293). D-16 gives them no jewelry destination, so the choice is keep or 404 (OD-9). None changes from retire to keep without your word.
- **`/collections/apparel`:** 109 clicks and 35,900 impressions in 16 months, but 0 and 24 in the last 3. The 16-month query list has an unrelated query, "ajo89", with 102 clicks and 30,833 impressions. It probably accounts for most of this, but the export can't tie a query to a page (OD-2).
- **Seven dead handles appear only in the 16-month export.** They are added to the inventory. Four get a 301 to the article on the same topic. `is-brass-jewelry-safe` (8 impressions) and `understanding-the-metal` (1) stay 404: one has no article with verified safety facts to point to, and the other matches two articles. `the-straight-answer-will-brass-jewelry-tarnish` waits on OD-14.

## 5. Content opportunities for jewelry

These jewelry pages rank on page 1 but win few clicks. Better titles and meta descriptions in the E-07 rewrite are the cheapest gain. Figures are 16-month site-wide query totals:

- **"does brass tarnish":** 68,334 impressions, 64 clicks, position 6.13. "does brass jewelry tarnish" adds 11,694 impressions and 13 clicks. This is the largest jewelry query, and OD-14 decides which page owns it.
- **Turning green:** "does brass turn green" (19,141 impressions, 33 clicks) and "does brass turn your skin green" (15,601, 17), with many variants, all at position 5 to 8.
- **"gold plated brass":** 7,669 impressions, 30 clicks. The update must separate plating from the launch finishes, raw brass and chrome (D-44).
- **"is brass waterproof":** 6,528 impressions, 29 clicks, position 3.16. is-brass-jewelry-waterproof is the strongest jewelry article (405 clicks in 16 months).
- **Other queries:** "does brass rust" (7,954 impressions at position 18.72) and "what is brass" (4,738 at 16.35) need better pages. `/pages/why-brass` can take "what is brass".
- **Internal links:** link these articles to `/collections/jewelry`, `/pages/jewelry-care` and `/pages/why-brass`, and the necklace article to the pendant once it's live. Care and safety facts only come from your verified data (`04` §1).

## 6. Decisions for you

The recommendation is listed first in each set of options.

| # | Question | Options | Recommendation and evidence |
| --- | --- | --- | --- |
| OD-1 | D-39: go ahead with the same-name 301s at launch? | (a) Go ahead: brockton-mk2 and its special edition 301 to the signet, the-bellwoods-one-hitter 301s to the pendant, and the 4 old Brockton redirects are repointed. (b) Make the three pipe URLs 404 and delete the 4 redirects. | **(a).** They're already in E-09, so choosing (b) means removing those 7 rows. The check D-39 asked for is done: no "brockton" query in 3 or 16 months, and "bellwoods" had 7 impressions. brockton-mk2: 2,883 sessions, 31 checkouts, 61 clicks in 16 months. |
| OD-2 | Brand merch (7 products, `/collections/apparel`, deleted `/products/dad-hat`): keep or retire? | (a) Retire: take it off every channel after the CSV export, unpublish apparel. (b) Keep it unlinked on the Online Store, with a 301 from `/products/dad-hat` to `/products/dad-hat-1`. | **(a).** 1,086 sessions across the 7 products, 3 of them from search, 0 checkouts. Apparel's 16-month clicks have almost gone (see §4). |
| OD-3 | Delete the 16 legacy redirects to the homepage, plus `/blogs/news/blog-post` → `/blogs/news/fathers-day-24` (now a 404)? | (a) Delete all 17 at launch step 6, logging each in `owner-inputs.md` E. (b) Delete them now. (c) Keep them, which conflicts with D-16. | **(a).** None has a relevant jewelry page. The largest is the aerospaced grinder: 80 sessions, 57 from search, 1 checkout. None is in the 16-month Pages export. They're kept in the [redirects.csv backup](backup/2026-11-27/content/redirects.csv). |
| OD-4 | Accept losing `/collections/metal-smoking-pipes` (404) at launch? | (a) Unpublish at launch, the same day the pipes are archived. (b) Keep it until the pipes are archived, then unpublish. | **(a).** It's in E-08 because both options unpublish it on launch day. It had 3,466 sessions and 14 checkouts, and 45 clicks in 16 months at position 38.59. |
| OD-5 | Stop selling brass-pipe-screens and the 6.5" pipe cleaners at launch? | (a) Take them off every channel after the CSV export (404). (b) Keep selling them unlinked. | **(a).** Neither has stock (inventory 0 and −28). Together they had 268 sessions and 0 checkouts. They aren't in E-08 until you choose. |
| OD-6 | `/collections/shop` (search snippet: "A place to shop for metal smoking pipes…"): 404 or a 301 to `/collections/jewelry`? | (a) 404. (b) A 301 to `/collections/jewelry`. | **(a).** It's unpublished either way (E-08). Its rule would otherwise pull jewelry in. 43 sessions, 0 checkouts, 2 clicks in 16 months. |
| OD-7 | Retire the 20 legacy articles with health, medical or safety claims (list below)? This amends D-36 for them. | (a) Retire them now. (b) Retire them at launch. (c) Keep them as an unlinked archive. | **(a), with an HTML backup first.** The claims are a risk today, not just at launch. They had 83,946 sessions and 1 checkout, 22 clicks in 3 months and 218 in 16. One of them, is-brass-safe-to-smoke-out-of, makes brass toxicity claims on a domain that will sell brass. |
| OD-8 | The 8 articles about the Parkdale Brass pipes (list below): when do they retire? | (a) The 4 with brass safety claims now, the other 4 at launch. (b) All 8 at launch. (c) Keep them, with product links and claims removed. | **(a).** Never redirect them to jewelry (D-39, D-44). They had 7,350 sessions and 16 checkouts, and 310 clicks in 16 months but 48 in the last 3. |
| OD-9 | The other 72 cannabis and smoking articles: retire or keep? | (a) Retire all 72 at launch. (b) Keep the 22 with 1,000+ sessions, retire 50. (c) Keep all 72 unlinked, after removing their pipe-product links. (d) Keep them published but noindexed. | **(a).** No jewelry redirect is allowed, so their SEO value can't pass to jewelry either way. They had 212,073 sessions (about 90% outside Canada) and 19 checkouts, 291 clicks in 3 months and 2,727 in 16. Backlinks and the Shopify date range can't change the destination, so don't wait for them. |
| OD-10 | Go ahead with the jewelry-article consolidations, now that the 16-month data is in? | (a) Yes, at the E-07 rewrite (launch step 7). (b) No consolidation: keep every article and only update it. | **(a).** It covers 11 merges plus 2 dead-handle 301s (below). The 16-month data confirms the canonical choices except OD-14 and OD-15. The 5 cleaning merges only run once how-to-clean-brass-jewelry is rewritten as a cleaning guide; its current title is about tarnish. |
| OD-11 | Merge does-brass-jewelry-turn-green into does-brass-turn-green? | (a) Merge. (b) Keep both and differentiate them. | **(a), narrowly.** 217 clicks against 188 in 16 months, and 30 against 24 in the last 3. The two pages compete at position 8 to 10. |
| OD-12 | 04 §5 says keep what-is-brass-jewelry-metal. Merge it into what-is-brass-made-of instead? | (a) Merge, and amend 04 §5. (b) Keep both. | **(a).** 69 clicks against 32 in 16 months, and 6 against 1 in the last 3. |
| OD-13 | the-parkdale-brass-story (the pipe and cannabis origin story): what happens to it? | (a) At launch, hide it and 301 it to `/pages/our-story`. (b) Rewrite it in your words. (c) Keep it as an archive. | **(a).** It has 0 search clicks in either window and 24 sessions. Hiding it removes its unverified "Medical-Grade Brass" and "non-toxic" claims. |
| OD-14 (new) | Tarnish cluster: which article is canonical? | (a) Keep does-brass-tarnish and merge does-brass-jewelry-tarnish, will-brass-jewelry-tarnish, brass-tarnish-jewelry-changes-color and brass-jewelry-tarnish into it. (b) Make does-brass-jewelry-tarnish the canonical. | **(a).** It has 40% more impressions over 16 months (121,081 against 86,578), it leads the last 3 months (24 clicks against 5), and its handle matches the top query. The other page has more 16-month clicks (166 against 137), so it's your call. |
| OD-15 (new) | "Is brass good" cluster: keep is-brass-good-for-jewelry as the canonical? | (a) Yes: merge is-brass-good-metal-for-mens-jewelry and is-brass-jewelry-good into it. (b) Make is-brass-good-metal-for-mens-jewelry the canonical. | **(a).** It has 18,378 impressions in 16 months against 8,162. Clicks are 10 against 15: small and close. |

**OD-7 articles (20):** can-you-donate-plasma-if-you-smoke-weed, marijuana-and-vitamin-c, 5-ways-to-get-higher-from-weed, when-to-stop-smoking-weed-while-pregnant, is-brass-safe-to-smoke-out-of, edibles-vs-smoking, cannabis-and-sex-does-weed-make-you-horny, what-are-the-differences-between-cbda-cbg, choosing-the-best-cannabis-strains-for-pain, cbd-vs-thc-is-one-better-for-you-than-the-other, let-s-talk-about-kief-and-how-awesome-it-is, is-marijuana-a-depressant-how-it-impacts-the-brain, jacqui-childs-cannabis-journey, how-to-dose-cannabis-properly-in-all-forms, the-best-cannabis-strains-for-anxiety, 3-benefits-of-cbd-skincare, cannabis-helps-prevent-covid-19-infections, 4-reasons-to-keep-cbd-legal, cannabis-and-your-pet, why-cannabis-gives-you-munchies.

**OD-8 articles (8):** with brass safety claims: an-introduction-to-the-brockton, an-introduction-to-the-brockton-mk2, the-brockton-versus-the-journey-pipe and slow-smoking-with-brass-pipes. Without: 3-benefits-of-a-smoking-pipe-with-a-lid, the-brockton-versus-the-proto-pipe, a-review-of-the-brockton-by-alyssa-yeoman and slow-smoking-on-the-go-with-the-bellwoods.

**OD-9 articles (72):** every other `legacy-smoking` article in `url-inventory.csv` with a blank `approved_by`.

### Redirects held back from E-09 until you decide

These 18 rows are in `url-inventory.csv` with their recommended destination. Add them to the import, or to step 7, once their decision is made:

| From | To | Waits on |
| --- | --- | --- |
| `/blogs/news/does-brass-jewelry-tarnish` | `/blogs/news/does-brass-tarnish` | OD-10, OD-14 |
| `/blogs/news/will-brass-jewelry-tarnish` | `/blogs/news/does-brass-tarnish` | OD-10, OD-14 |
| `/blogs/news/brass-tarnish-jewelry-changes-color` | `/blogs/news/does-brass-tarnish` | OD-10, OD-14 |
| `/blogs/news/brass-jewelry-tarnish` | `/blogs/news/does-brass-tarnish` | OD-10, OD-14 |
| `/blogs/news/the-straight-answer-will-brass-jewelry-tarnish` | `/blogs/news/does-brass-tarnish` | OD-14 |
| `/blogs/jewelry-stories/does-brass-jewelry-tarnish` | `/blogs/news/does-brass-tarnish` | OD-14 |
| `/blogs/news/does-brass-jewelry-turn-green` | `/blogs/news/does-brass-turn-green` | OD-11 |
| `/blogs/news/does-brass-jewelry-turn-skin-green` | `/blogs/news/does-brass-turn-your-skin-green` | OD-10 |
| `/blogs/news/importance-cleaning-brass-jewelry` | `/blogs/news/how-to-clean-brass-jewelry` | OD-10 and the cleaning rewrite |
| `/blogs/news/why-cleaning-brass-jewelry-matters` | `/blogs/news/how-to-clean-brass-jewelry` | OD-10 and the cleaning rewrite |
| `/blogs/news/why-cleaning-your-brass-jewelry-is-essential` | `/blogs/news/how-to-clean-brass-jewelry` | OD-10 and the cleaning rewrite |
| `/blogs/news/why-your-brass-jewelry-needs-polishing` | `/blogs/news/how-to-clean-brass-jewelry` | OD-10 and the cleaning rewrite |
| `/blogs/news/importance-right-brass-cleaner` | `/blogs/news/how-to-clean-brass-jewelry` | OD-10 and the cleaning rewrite |
| `/blogs/news/brass-mens-jewelry` | `/blogs/news/brass-jewelry` | OD-10 |
| `/blogs/news/is-brass-jewelry-good` | `/blogs/news/is-brass-good-for-jewelry` | OD-10, OD-15 |
| `/blogs/news/is-brass-good-metal-for-mens-jewelry` | `/blogs/news/is-brass-good-for-jewelry` | OD-15 |
| `/blogs/news/what-is-brass-jewelry-metal` | `/blogs/news/what-is-brass-made-of` | OD-12 |
| `/blogs/news/the-parkdale-brass-story` | `/pages/our-story` | OD-13 |

Each article redirect needs the same steps first: back up the article's HTML, merge its content into the kept article, hide the old article (never delete it), and then add the 301. If OD-2 keeps the merch, also add `/products/dad-hat` → `/products/dad-hat-1`.

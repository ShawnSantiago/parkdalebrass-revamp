# OD-7 / OD-8 · Hide the 24 legacy articles with health, medical or brass-safety claims now (D-69)

| | |
| --- | --- |
| Tracker | [`owner-inputs.md`](../owner-inputs.md) section E, row E-17; decision D-69 (amends D-36); [`search-traffic.md`](../search-traffic.md) §6, OD-7 and OD-8 |
| Trigger | The 2026-11-28 redirect plan found 20 legacy articles with health, medical or safety claims (OD-7) and 4 Parkdale Brass pipe articles with brass safety claims ("medical-grade", "non-toxic", "entirely safe"; OD-8) still public on a domain that will sell brass jewelry (`04` §1: no unverified safety claims). |
| Approval | The owner, in chat on 2026-11-28: OD-7 option (a), retire the 20 now with an HTML backup first; OD-8 option (a), the 4 with brass safety claims now and the other 4 at launch, never redirected to jewelry. Recorded as D-69. Applied under standing approval D-28 (hide only: nothing deleted, no redirect added, D-16). |
| Backup | [`backup/2026-11-28/articles-retired-now/`](../backup/2026-11-28/articles-retired-now/): one `<handle>.html` per article (an HTML comment header with the ID, handle, title, tags, SEO title and description, published state, `publishedAt`, template suffix, created and updated times, comment count, summary and the SHA-256 of the original body, then the body HTML) plus [`index.json`](../backup/2026-11-28/articles-retired-now/index.json). Read from the Admin API (read-only) on 2026-11-28 just before the change. |
| Status | **Done 2026-11-28** (backed up, applied at 02:22Z and verified the same day) |

## 1 · Scope

Exactly 20 + 4 articles, all in the `news` blog (`gid://shopify/Blog/25815515198`):

- **OD-7 (20):** the list in `search-traffic.md` §6, the same 20 handles tagged `T1` (health claim) in the plan's `verified-legacy-articles.json` and marked `retire-404` in `url-inventory.csv`.
- **OD-8 (4):** an-introduction-to-the-brockton, an-introduction-to-the-brockton-mk2, the-brockton-versus-the-journey-pipe and slow-smoking-with-brass-pipes. The other 4 OD-8 pipe articles (3-benefits-of-a-smoking-pipe-with-a-lid, the-brockton-versus-the-proto-pipe, a-review-of-the-brockton-by-alyssa-yeoman, slow-smoking-on-the-go-with-the-bellwoods) are **not** in this change. They stay published until launch step 6.2, with the 72 OD-9 articles.

All 24 were published before the change (Admin `isPublished: true`; each public URL returned 200 at 02:1xZ).

### Personal data in the backup

Personal data is redacted in the backup files only. The live records are unchanged and still hold the originals.

- `is-brass-safe-to-smoke-out-of` and `the-brockton-versus-the-journey-pipe`: the founder's name in the body → `[REDACTED: staff name]`.
- `jacqui-childs-cannabis-journey`: a guest writer's first-person account of her health history. Her name in the title, summary, SEO title, SEO description and body → `[REDACTED: person's name]`, and her three personal social media links → `[REDACTED: personal social media URL]`. The handle keeps her name because it's the public URL and the record key, and the brief names each file after its handle.
- The author field isn't exported (staff names), as in the 2026-11-27 `articles.json` backup.
- No personal email, phone number or home address was found in any of the 24.

Each file's header lists its redactions, and `index.json` holds `bodySha256Original`, the hash of the unredacted body, so a later read-back can be compared with it.

## 2 · The change

One Admin GraphQL mutation (Shopify connector) with 24 aliased `articleUpdate(id, article: { isPublished: false })` calls. Every call returned `userErrors: []` and `isPublished: false`.

Nothing else changed: no body, title, handle, tag, SEO field, template suffix, comment, menu, redirect, theme file or other article. No article was deleted.

| # | Group | Handle | Article ID | `publishedAt` before | Sessions | Checkouts | GSC clicks 3m / 16m | Result |
| ---: | --- | --- | --- | --- | ---: | ---: | ---: | --- |
| 1 | OD-7 | `can-you-donate-plasma-if-you-smoke-weed` | 557389774910 | 2022-08-24T12:30:01Z | 30,687 | 0 | 0 / 0 | hidden, 404 |
| 2 | OD-7 | `marijuana-and-vitamin-c` | 557347995710 | 2022-08-10T12:00:10Z | 19,612 | 0 | 7 / 48 | hidden, 404 |
| 3 | OD-7 | `5-ways-to-get-higher-from-weed` | 557532708926 | 2022-10-14T12:00:21Z | 13,178 | 0 | 1 / 21 | hidden, 404 |
| 4 | OD-7 | `when-to-stop-smoking-weed-while-pregnant` | 557507412030 | 2022-09-30T13:00:02Z | 11,732 | 0 | 0 / 9 | hidden, 404 |
| 5 | OD-7 | `is-brass-safe-to-smoke-out-of` | 32574668862 | 2019-09-25T09:32:00Z | 4,211 | 1 | 7 / 74 | hidden, 404 |
| 6 | OD-7 | `edibles-vs-smoking` | 604375253314 | 2022-10-21T12:00:02Z | 1,758 | 0 | 0 / 0 | hidden, 404 |
| 7 | OD-7 | `cannabis-and-sex-does-weed-make-you-horny` | 605691412802 | 2023-07-17T14:16:49Z | 1,033 | 0 | 3 / 13 | hidden, 404 |
| 8 | OD-7 | `what-are-the-differences-between-cbda-cbg` | 556350668862 | 2021-10-15T16:54:53Z | 477 | 0 | 1 / 13 | hidden, 404 |
| 9 | OD-7 | `choosing-the-best-cannabis-strains-for-pain` | 390603014206 | 2020-09-01T15:56:00Z | 287 | 0 | 0 / 0 | hidden, 404 |
| 10 | OD-7 | `cbd-vs-thc-is-one-better-for-you-than-the-other` | 604387901762 | 2022-10-28T12:00:01Z | 257 | 0 | 0 / 0 | hidden, 404 |
| 11 | OD-7 | `let-s-talk-about-kief-and-how-awesome-it-is` | 604387868994 | 2022-10-28T12:00:01Z | 245 | 0 | 0 / 0 | hidden, 404 |
| 12 | OD-7 | `is-marijuana-a-depressant-how-it-impacts-the-brain` | 557532741694 | 2022-10-14T12:00:21Z | 134 | 0 | 0 / 0 | hidden, 404 |
| 13 | OD-7 | `jacqui-childs-cannabis-journey` | 387139764286 | 2020-05-05T13:45:00Z | 131 | 0 | 3 / 40 | hidden, 404 |
| 14 | OD-7 | `how-to-dose-cannabis-properly-in-all-forms` | 604375220546 | 2022-10-21T12:00:01Z | 59 | 0 | 0 / 0 | hidden, 404 |
| 15 | OD-7 | `the-best-cannabis-strains-for-anxiety` | 390120669246 | 2020-07-21T09:59:00Z | 56 | 0 | 0 / 0 | hidden, 404 |
| 16 | OD-7 | `3-benefits-of-cbd-skincare` | 557159448638 | 2022-06-04T15:53:02Z | 42 | 0 | 0 / 0 | hidden, 404 |
| 17 | OD-7 | `cannabis-helps-prevent-covid-19-infections` | 556613173310 | 2022-01-17T23:22:05Z | 15 | 0 | 0 / 0 | hidden, 404 |
| 18 | OD-7 | `4-reasons-to-keep-cbd-legal` | 556586336318 | 2022-01-07T16:50:03Z | 14 | 0 | 0 / 0 | hidden, 404 |
| 19 | OD-7 | `cannabis-and-your-pet` | 556639715390 | 2022-01-24T17:08:55Z | 12 | 0 | 0 / 0 | hidden, 404 |
| 20 | OD-7 | `why-cannabis-gives-you-munchies` | 390805520446 | 2020-09-15T12:38:46Z | 6 | 0 | 0 / 0 | hidden, 404 |
| 21 | OD-8 | `an-introduction-to-the-brockton` | 32309248062 | 2019-09-06T01:41:00Z | 46 | 0 | 0 / 0 | hidden, 404 |
| 22 | OD-8 | `an-introduction-to-the-brockton-mk2` | 389957910590 | 2020-07-07T19:59:00Z | 37 | 0 | 0 / 0 | hidden, 404 |
| 23 | OD-8 | `the-brockton-versus-the-journey-pipe` | 555863572542 | 2021-06-09T17:58:22Z | 671 | 1 | 6 / 31 | hidden, 404 |
| 24 | OD-8 | `slow-smoking-with-brass-pipes` | 557099319358 | 2022-05-12T10:08:40Z | 2,169 | 2 | 18 / 124 | hidden, 404 |

Sessions and checkouts are Shopify "Sessions by landing page path", and clicks are Search Console, all from `url-inventory.csv`. The totals: OD-7 had 83,946 sessions and 1 checkout; these 4 OD-8 articles had 2,923 sessions and 3 checkouts.

## 3 · Verification (2026-11-28)

- **Admin read-back:** all 24 have `isPublished: false` and `publishedAt: null` (updated 02:22:47–48Z). Title, body, tags, template suffix and both SEO fields are identical to the backup read.
- **Public URLs:** each `https://parkdalebrass.com/blogs/news/<handle>` returns **404** with no redirect. That's 24 of 24, fetched with curl, 1.5 s apart, with a cache-busting query string. All 24 returned 200 just before the change.
- **No redirect:** `urlRedirects(query: "path:/blogs/news*")` returns only the existing `/blogs/news/blog-post` → `/blogs/news/fathers-day-24` (OD-3, deleted at launch). None of the 24 paths has a redirect.
- **The rest of the blog still loads:** `/blogs/news`, `?page=2` and `/blogs/news/tagged/journal` return 200. So do a kept legacy article (`how-to-clean-a-metal-smoking-pipe`), an OD-8 article retired at launch (`3-benefits-of-a-smoking-pipe-with-a-lid`) and a jewelry article (`does-brass-tarnish`). Paging `/blogs/news` to the end (18 pages of 6) lists **108 articles**: the 133 in the blog minus `fathers-day-24` (hidden by G-12) and these 24. None of the 24 appears.
- **Not checked:** the sitemap (`/sitemap_blogs_1.xml`) wasn't fetched, and Search Console will drop the URLs on its own schedule. Comments on these articles (20 in total) stay attached to the hidden records.

## 4 · Rollback

For each article, `articleUpdate(id: <Article ID>, article: { isPublished: true, publishDate: <publishedAt before> })`, with the ID and the original `publishedAt` from the table above or from `index.json`. Hiding cleared `publishedAt`. With `isPublished: true` alone, Shopify would stamp the time of the rollback, and the article would move to the top of `/blogs/news`, so pass `publishDate` too. The bodies and other fields were never changed, so the backup HTML is reference only. Don't write it back: it contains redaction markers.

## 5 · At launch

The other 4 OD-8 pipe articles and the 72 OD-9 articles are hidden at launch step 6.2 (E-08, D-69), the same way: back up first, hide, no redirect, never delete.

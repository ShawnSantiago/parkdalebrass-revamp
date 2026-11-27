# NAV-01 · Make the preview's menu targets load (D-46)

| | |
| --- | --- |
| Tracker | [`owner-inputs.md`](../owner-inputs.md) section E, row E-15; decision D-46 |
| Trigger | The owner reported (2026-11-27) that many header and footer links in the preview led to 404s. |
| Approval | Standing approval D-28. The owner picked the **holding line** option for the pages in chat on 2026-11-27. |
| Backup | [`backup/2026-11-27/nav-preview/collections-before.json`](../backup/2026-11-27/nav-preview/collections-before.json) and [`pages-draft-bodies.json`](../backup/2026-11-27/nav-preview/pages-draft-bodies.json) (the E-03 draft bodies, verbatim) |
| Status | **Done 2026-11-27** (backed up, applied and verified the same day) |

## 1 · Cause

The preview's menus (E-04) link 4 collections and 4 pages that Phase 3 created **hidden** (E-02, E-03, D-40). Shopify returns 404 for a hidden page or a collection that isn't on Online Store, even in a theme preview, so these 8 links 404ed:

| Link | Before | After |
| --- | --- | --- |
| `/collections/jewelry`, `/bracelets`, `/necklaces`, `/rings` | 404 | 200, empty grid ("Nothing here yet.") |
| `/pages/our-story`, `/why-brass`, `/jewelry-care`, `/size-guide` | 404 | 200, holding line plus the template's sections |

Every other preview menu link (home, Journal, cart, contact, CCPA, the four policies) already returned 200. `/account` redirects to Shopify customer accounts (302), as expected.

The **live** Craft menus were checked at the same time. Every link returns 200 except the footer's **Sitemap** (`/pages/sitemap`), which a legacy redirect sends to the homepage (G-26, not changed).

## 2 · The change

1. `metafieldsSet`: `seo.hidden = 1` (`number_integer`) on the 4 collections. Shopify then adds `noindex,nofollow` and leaves the resource out of the sitemap and storefront search.
2. `publishablePublish` of the 4 collections to **Online Store only** (`gid://shopify/Publication/31212404798`). No other channel. They hold only the two Draft products, so they render empty on both themes.
3. `pageUpdate` on the 4 pages: `body` set to `<p>We're writing this page for the launch of our jewelry. Please check back soon.</p>`, `isPublished: true`, and `seo.hidden = 1`. `templateSuffix` is unchanged (D-42).

No menu, product, redirect, theme file or other channel was touched.

## 3 · Verification (2026-11-27)

- **Preview (theme 196453663042, in a browser):** every link in the header, menu drawer and footer returns 200. The 8 URLs carry `<meta name="robots" content="noindex,nofollow">`.
- **Live (Craft, theme 168071168322):** the 8 URLs return 200 with `noindex,nofollow`. The pages show only their title and the holding line; the collections show an empty grid. Nothing on the live site links to them.
- **Admin read-back:** all four pages have `isPublished: true`, the holding body, `seo.hidden` "1" and their `templateSuffix`.

## 4 · Rollback

1. Pages: `pageUpdate` each with `isPublished: false` and its `body` from `pages-draft-bodies.json`.
2. Collections: `publishableUnpublish` from the Online Store publication.
3. Optionally `metafieldsDelete` the eight `seo.hidden` metafields. They're harmless while the resources are hidden.

## 5 · At launch

`phase-5-brief.md` step 3 now says: put the approved copy (B-05) back on each page in place of the holding line, check the template suffix, and remove `seo.hidden` from all eight. The rule that no `[bracketed placeholder]` is ever visible still holds: the drafts go back for review in the theme editor or as a hidden duplicate, never live with brackets.

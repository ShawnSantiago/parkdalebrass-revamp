# Verification of the 2026-11-27 store changes (E-01, E-02, E-03, E-04, G-18)

- **Verifier:** an independent agent. It only read: no mutations, no theme writes, and GET-only requests to the live storefront.
- **When:** 2026-11-27, 02:13 to 02:18 UTC, after the last change commit (`b8e97cb`, 02:12Z).
- **How:** Admin GraphQL reads through the Shopify connector, paged to the end every time (`hasNextPage` false). Each result was compared by script with the exports in [`backup/2026-11-27/`](../backup/2026-11-27/). Live pages were fetched with `curl`, with and without a cache-buster.
- **Changes checked:** E-01 `f723cb9`, E-02 `576484f`, E-03 `ccbe464`, E-04 `7fb2c0e`, G-18 `b8e97cb` (branch `pb3/store`).

## Result

**All five changes check out.** The store matches what each change file says, and nothing this run did removed, published or hid an existing record.

Check 2 has one strict failure that this run did not cause: the store now has **21 redirects, one fewer than the 22 rows** in `redirects.csv`. The missing row is `/pages/reviews → /` (`UrlRedirect/441294848322`). It was deleted between 01:14 and 01:22 UTC, before this run's first change. The owner approved that deletion (G-20), and it is recorded on branch `claude/loving-mccarthy-7dq7ak`. See [Discrepancies](#discrepancies).

| # | Check | Result |
| - | ----- | ------ |
| 1 | `main-menu` and `footer` match `menus.json` exactly | **Pass** |
| 2 | Product, collection, page, article and redirect counts are at least the export counts | **Pass, except redirects** (21 against 22; deleted before this run with owner approval, G-20) |
| 3 | New collections are on no channel, new pages are hidden, and the article edits only added `journal` | **Pass** |
| 4 | The live storefront is unaffected | **Pass** (one intended new URL, G-18) |
| 5 | Each change has a change file with rollback steps, and `owner-inputs.md` records it | **Pass** (G-11 and G-12 rows are stale on this branch, see Discrepancies) |

## 1 · `main-menu` and `footer`

The full live read was `menus(first: 50)`, 4 levels deep, with `hasNextPage` false. It returned 10 menus: the 5 legacy menus and the 5 from E-04.

- **`main-menu`** (`Menu/69103386686`): the live JSON matches the backup record exactly (`id`, `handle`, `title`, `isDefault`, `createdAt` and every item's `id`, `title`, `type`, `url`, `resourceId`, `tags` and nesting), apart from the export-only `itemCount` key. Both have 9 items: Home / Shop (Pipes > The Brockton MK2, The Bellwoods; Apparel; All) / Blog / Contact.
- **`footer`** (`Menu/69103419454`): the live JSON matches the backup record exactly in the same way. Both have 3 items: Sitemap, Do not sell my personal information, Created By Parkdale Digital.
- The other legacy menus have the same IDs and item counts as the backup: `sitemap` has 26 items, `minimal` 0 and `customer-account-main-menu` 2. These were not compared field by field.
- The new menus are `jewelry-main-menu` (332042404162), `shop-categories` (332042600770), `footer-shop` (332042633538), `footer-learn` (332042666306) and `footer-help` (332042699074), all created 02:01 to 02:03Z. Their items point at the E-02 collections and E-03 pages by resource ID. The two Journal items are HTTP links to `/blogs/news/tagged/journal`, as D-43 records.

## 2 · Nothing deleted

| Resource | Export (`backup/2026-11-27/`) | Live now | Same IDs? |
| -------- | ----------------------------- | -------- | --------- |
| Products (all statuses) | 14 (`products.json`) | 14 (12 active, 1 draft, 1 archived; EXACT) | Yes. All 14 have the same handle, status and `updatedAt` |
| Collections | 14 (`collections.json`) | 17 (EXACT) = 14 legacy + 3 from E-02 | Yes. All 14 legacy collections have the same handle, sort order and product count |
| Pages | 16 (`pages.json`) | 20 (EXACT) = 16 legacy + 4 from E-03 | Yes, all 16 |
| Articles (blog `news`) | 133 (`articles.json`) | 133 (EXACT). None created since 2026-11-26 | Yes |
| Redirects | 22 rows (`redirects.csv`) | **21** (EXACT) | 21 of 22. **Missing: `/pages/reviews → /`** |
| Metafield definitions | PRODUCT 14, COLLECTION 0 | PRODUCT 23 (14 legacy with the same IDs + 9 from E-01), COLLECTION 1 (from E-01) | Yes |

The redirect is the only record missing. `pages.json` (`snapshot.changedAfterRead`) records that "another process" removed it between 01:14Z and 01:22Z, and `audit.md` names that process as the G-20 redirect deletion. Branch `claude/loving-mccarthy-7dq7ak` records G-20 as **Done 2026-11-27**: the owner said "yes, delete the redirect", and the redirect was backed up first (to `backup/2026-11-27/live-changes/redirect-before.json` on that branch). This run's first change was E-01 (committed 01:44Z), after that deletion, and no change in this run calls a delete mutation. Apart from that row, the live redirect list matches `redirects.csv` exactly.

## 3 · New records are hidden; the article edits only add a tag

**E-02 collections.** There are 4 publications: Online Store, Facebook & Instagram, Inbox and Whatnot. All four have `autoPublish` false.

| Collection | ID | `publishedOnPublication` on all 4 | `resourcePublicationsCount` (incl. scheduled) | `resourcePublicationsV2` (incl. scheduled) | Products |
| ---------- | -- | --------------------------------- | --------------------------------------------- | ------------------------------------------ | -------- |
| `jewelry` | 530340053314 | false on all four | 0 | empty | 0 |
| `bracelets` | 530340184386 | false on all four | 0 | empty | 0 |
| `necklaces` | 530340282690 | false on all four | 0 | empty | 0 |

- `collections(query: "published_status:unpublished")` returns exactly these three.
- Each of the 14 legacy collections still returns `publishedOnPublication` true on all 4 publications, and `collectionsCount(query: "published_status:published")` is 14.

**E-03 pages.** All four are hidden, with `isPublished` false and `publishedAt` null:

| Page | ID | `templateSuffix` |
| ---- | -- | ---------------- |
| `our-story` | 171437818178 | `our-story` |
| `why-brass` | 171437883714 | `why-brass` |
| `jewelry-care` | 171437916482 | `jewelry-care` |
| `size-guide` | 171437949250 | `size-guide` |

Each page's `updatedAt` equals its `createdAt`, so none has been edited since it was created.

The legacy pages all match `pages.json`, except three. None of the three changed in this run:

- `reviews` was hidden at 01:12:27Z and `page-2` at 01:10:08Z. Both are listed in `changedAfterRead` (G-11, and the Instant clean-up).
- `fathers-day-24` was hidden at 01:37:04Z. That is G-21 on branch `claude/loving-mccarthy-7dq7ak`, and E-03.md §2 notes it too.

**G-18 articles.**

- `articles(query: "tag:journal")` returns exactly 30 IDs (`hasNextPage` false).
- They are the same 30 articles the backup marks `_derived.topic = jewelry`, with no extras and none missing.
- For each of the 30, the live record was compared with `articles.json`:
  - Handle, title, `isPublished` (all true), `publishedAt` and `templateSuffix` are identical.
  - Tags were `[]` in the backup and are now exactly `["journal"]`.
  - Each `updatedAt` falls between 02:09:47 and 02:10:11Z, which is the G-18 write window.
- The other 103 articles have not changed since the backup. In a read sorted by `UPDATED_AT` (newest first), the next article after the 30 is `fathers-day-24` at 01:14:28Z. That article was unpublished before this run (G-12, listed in `changedAfterRead`). Every other article has `updatedAt` on or before 2024-07-23. Any tag, title, handle or visibility edit would have moved that timestamp.
- Both brand articles are untouched:
  - `the-parkdale-brass-story`: tags `[]`, updated 2022-02-16
  - `the-bright-history-of-brass`: tags `["Brass"]`, updated 2021-11-25

**E-01 definitions.** No product has changed. All 14 products have the same `updatedAt` as the backup, so no values were written to them.

## 4 · Live storefront (GET only, 02:16Z)

- The live theme is still **Craft 14.0.0** (`Shopify.theme` id 168071168322, role `main`).

| URL | Status |
| --- | ------ |
| `/` | 200 |
| `/collections/jewelry` | **404** (with and without a cache-buster); `/collections/jewelry/products.json` returns `{"products":[]}` |
| `/collections/bracelets`, `/collections/necklaces`, `/collections/rings` | 404 |
| `/pages/our-story` | **404** (with and without a cache-buster) |
| `/pages/why-brass`, `/pages/jewelry-care`, `/pages/size-guide` | 404 |
| `/pages/contact-us`, `/pages/ccpa-opt-out`, `/collections/metal-smoking-pipes`, `/products/brockton-mk2`, `/blogs/news` | 200 |
| `/products/the-brockton` | 301 to `/products/brockton-mk2` (legacy redirect intact) |

**Header nav on `/`.** The `header__inline-menu` block has MD5 `6e857642e12a992e20d82c524a903879`, the same as the E-04 pre-change baseline taken at 01:59Z. It shows the old `main-menu`: Home / Shop (Pipes > The Brockton MK2, The Bellwoods; Apparel; All) / Blog / Contact.

**Footer on `/`.** It shows the old `footer` items (Sitemap, Do not sell my personal information, Created By Parkdale Digital) and the 4 policy links.

**New handles and links.** None of the new menu handles, collection URLs, page URLs, `tagged/journal` or "Support for previous orders" appears in the homepage HTML.

**Sitemaps.** `sitemap_collections_1.xml` lists only the 14 legacy collections. `sitemap_pages_1.xml` lists only `contact-us` and `ccpa-opt-out`.

**One intended live change.** `/blogs/news/tagged/journal` now returns **200** (before G-18 it was 404). Page 1 lists 6 jewelry articles. Nothing on the live Craft theme links to this URL, and the G-18 change file expects this.

**Not caused by this run (G-11, G-12, G-20, G-21):**

| URL | Status |
| --- | ------ |
| `/pages/reviews` | 404 |
| `/pages/fathers-day-24` | 404 |
| `/pages/page-2` | 404 |
| `/blogs/news/fathers-day-24` | 404 |
| `/blogs/news/blog-post` | 301 to `/blogs/news/fathers-day-24`, which ends on a 404 (already noted in `audit.md`) |

## 5 · Change records

| Change | Change file | Rollback section | `owner-inputs.md` row |
| ------ | ----------- | ---------------- | --------------------- |
| E-01 | [`E-01.md`](E-01.md) | §4: unpin, or delete with `deleteAllAssociatedMetafields: false`, after exporting any values; tell the owner first | E-01 "**Done 2026-11-27**", "Approved under D-28", links the change file |
| E-02 | [`E-02.md`](E-02.md) | §4: unpublish if needed, repoint links, `collectionDelete` by the listed IDs; tell the owner first | E-02 "**Done 2026-11-27**", "Approved under D-28", links the change file |
| E-03 | [`E-03.md`](E-03.md) | §4: hide, repoint links, `pageDelete` by the listed IDs, or the softer `templateSuffix` reset; tell the owner first | E-03 "**Done 2026-11-27**", "Approved under D-28", links the change file |
| E-04 | [`E-04.md`](E-04.md) | §4: repoint the theme if it is live, `menuDelete` only the five new IDs, never `main-menu` or `footer`; tell the owner first | E-04 "**Done 2026-11-27**", "Approved under D-28", links the change file |
| G-18 | [`G-18.md`](G-18.md) | §4: `tagsRemove(["journal"])` on each of the 30 IDs, then re-check, with the warning that the E-04 Journal links would then 404 | G-18 "**Done 2026-11-27**", "Approved under D-28", links the change file |

## Discrepancies

1. **Redirect count is 21, the export has 22.** The missing redirect is `/pages/reviews → /` (`gid://shopify/UrlRedirect/441294848322`). It was deleted between 01:14 and 01:22 UTC by the G-20 work on branch `claude/loving-mccarthy-7dq7ak`, which records the owner's approval and a backup. That is before this run's first change (E-01, 01:44Z), so this run did not cause it. Check 2 still fails for redirects as the check is worded.
2. **`owner-inputs.md` on `pb3/store` is behind on G-11 and G-12, and has no G-20 or G-21 rows.**
   - On this branch, G-11 (`/pages/reviews`) and G-12 (`fathers-day-24` article) say "Approved (D-28), not yet applied".
   - In the store, both are already done: `reviews` was hidden at 01:12:27Z, and the `fathers-day-24` article at 01:14:28Z.
   - Branch `claude/loving-mccarthy-7dq7ak` records them as Done, along with G-20 and G-21, in `changes/G-10-G-12-E-07.md`.
   - When `pb3/store` is merged, take those rows from that branch, and keep this branch's G-22 and later rows and its E-01 to E-04 and G-18 rows.
3. **Concierge Shopping Guide channel (seen, not caused by this run).**
   - `collections.json`, exported 01:09:53Z, lists 5 channels on each legacy collection. `publications.json`, exported about 01:26Z, already lists only 4 publications, and Concierge is not among them.
   - Each legacy collection's `updatedAt` is 01:10:46 to 01:10:47Z, which matches the "hidden on Concierge" events that E-02.md reports.
   - This is the same item E-02 recorded (G-06 and G-23). It is listed here only so that no later reader mistakes it for a removal by this run.

## Not checked

- The new menus, collections and pages were not rendered in the unpublished theme 196453663042. That is Phase 4 QA.
- `shopify theme check` was not run, because no theme files changed.
- The bodies of the four E-03 pages and the E-02 collection rules were not re-read. The page `updatedAt` values show the bodies have not changed since they were created, and each new collection holds 0 products.
- Product channel publications were not compared one by one. Twelve products are on the Online Store, the same count as the backup.

# Rings collection, Rings menu items and the two draft launch products (D-39, D-40), 2026-11-27

**Approval:** the owner confirmed "Bellwoods pendant, Brockton signet, both at launch" in chat on 2026-11-27. These changes are additive and hidden, under D-28. Applied by the agent through the Shopify connector.
**Backup:** [`backup/2026-11-27/rings/menus-before.json`](../backup/2026-11-27/rings/menus-before.json) holds the three menus before the change. The collection and products are new, so they need no backup; the full catalog export is in [`backup/2026-11-27/catalog/`](../backup/2026-11-27/catalog/).

| Change | Record | Result |
| --- | --- | --- |
| E-02 (D-40) | Smart collection `rings` (`gid://shopify/Collection/530354471234`): title Rings, product type = Ring **and** tag = `jewelry`, sort newest first | Created. Published on no channel (0 publications; `publishedOnPublication` Online Store = false). `/collections/rings` returns 404 on the live site. |
| E-04 (D-40) | Added a "Rings" item (COLLECTION `rings`) to `jewelry-main-menu` under Shop, and to `shop-categories` and `footer-shop` | Every existing item kept its ID, title and link; only the Rings items are new. The live Craft theme doesn't use these menus (its nav still shows the old main-menu). |
| E-05 (D-39) | Draft product **The Brockton** (`the-brockton-signet`, `gid://shopify/Product/15570782617922`), type Ring, tag `jewelry`, vendor Parkdale Brass | Created as **Draft** with no channels. It has one default variant at 0.00 and inventory policy DENY. Holds the handle until the facts arrive. |
| E-05 (D-39) | Draft product **The Bellwoods** (`the-bellwoods-pendant`, `gid://shopify/Product/15570782748994`), type Necklace, tag `jewelry`, vendor Parkdale Brass | As above. |

**Not set on purpose:** description, product category (`the-bellwoods-pendant` depends on whether it ships with a chain), options and variants (Finish and Size), price, SKU, weight, stock, images, metafields and SEO. Each one comes from the owner's fact sheet ([`product-data/`](../product-data/)). Never fill these with estimates.

**Before either product goes Active (Phase 5):** check that the price isn't 0.00, the options and variants match the fact sheet, inventory is tracked with stock per size, and the D-40 ring gates are met.

**Found:** an archived pipe product also has the title "The Brockton" (`the-brockton`, `gid://shopify/Product/2145566883902`, type pipe). An existing redirect sends `/products/the-brockton` to `/products/brockton-mk2`. At launch (E-09) that redirect should point to `/products/the-brockton-signet`, so it doesn't chain to a retired page. The two products can be told apart by handle and type in Admin.

## Rollback

- Menus: `menuUpdate` each of the three menus with the items in `menus-before.json` (the Rings items are dropped).
- Collection: `collectionDelete(input: { id: "gid://shopify/Collection/530354471234" })`, after removing the Rings menu items. It's new and empty, so this deletes nothing that existed before; tell the owner first anyway (AGENTS.md).
- Products: `productDelete` on the two IDs above. They're new, but tell the owner first (AGENTS.md).

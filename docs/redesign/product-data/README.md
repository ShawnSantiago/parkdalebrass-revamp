# Product data template

Use this to collect and import the launch jewelry once the facts are verified. It has two parts:

1. **`product-import-template.csv`**: a Shopify product CSV with the Parkdale Brass product fields (metafields) added as columns. It holds one worked example (The Junction, 3 variant rows) to copy.
2. **The fact sheet below**: the questions to answer per product, in plain language, for you or the supplier. Answers go into the CSV.

> **The example rows are deliberately unimportable.** The prices are blank, and SKUs, weights and costs say `[VERIFY-…]`, so a half-finished file fails import instead of creating products with made-up data. Every `[VERIFY…]` value must be replaced or cleared before import.

---

## Before the first import (store-level, needs approval, `owner-inputs.md` E-01 / E-05)

1. Create the metafield definitions in `04-content-and-data.md` §2 (Settings → Custom data → Products). The CSV can only fill definitions that already exist.
2. **Check the columns against your store.** Export one existing product (Products → Export → CSV) and compare its header row with this template. Shopify changes CSV columns from time to time, and the store's export is the authority. Match its exact column names, especially the metafield columns, which use the form `Label (product.metafields.custom.key)`.
3. Import with **Status = draft** and **Published = FALSE**. Review each product in Admin and preview it on the unpublished theme. Publish to sales channels only after launch approval.
4. Stock: enter quantities in Admin, or with Shopify's separate inventory CSV, per location after import. This template doesn't set stock.

## How rows work

- **One row per variant.** The first row of a product holds all product-level fields. Following rows repeat only the `Handle` plus the variant fields (option values, SKU, weight, price…).
- **Images:** add extra rows with only `Handle`, `Image Src`, `Image Position` and `Image Alt Text`. You can also upload images in Admin after import, which is easier for the 4-shot set (see `../photography-brief.md`).
- Options: `Option1 Name` = `Finish`, `Option2 Name` = `Size`. Leave out an option a product doesn't have. A product with one finish has no Finish option.

## Column guide

| Column | Rule | Example |
| --- | --- | --- |
| Handle | Lowercase, hyphenated, permanent (it becomes the URL). Check for collisions with legacy products. | `the-junction` |
| Title | "The {Place}" naming. Approved names only. | The Junction |
| Body (HTML) | Description from the approved sample, 40–90 words. No banned claims (`04` §1). | n/a |
| Vendor | Always `Parkdale Brass` | n/a |
| Product Category | Shopify standard taxonomy | Apparel & Accessories > Jewelry > Bracelets / Necklaces / Rings |
| Type | `Bracelet`, `Necklace` or `Ring` (drives the smart collections) | Bracelet |
| Tags | Must include `jewelry`. Add others only if a collection uses them. | jewelry |
| Published | `FALSE` until launch | FALSE |
| Option1 Name / Value | `Finish` / the real finish name | Finish / Brushed |
| Option2 Name / Value | `Size` / the real size label | Size / S / M |
| Variant SKU | Unique, from your SKU scheme | n/a |
| Variant Grams | Packed weight in grams (used for shipping rates) | n/a |
| Variant Inventory Tracker | `shopify` | shopify |
| Variant Inventory Policy | `deny`, so it can't be sold when out of stock. `continue` only with approved preorder terms. | deny |
| Variant Fulfillment Service | `manual` unless a fulfilment app is used | manual |
| Variant Price | CAD, approved price | n/a |
| Variant Compare At Price | **Leave blank.** No strike-through pricing without a real, approved sale. | n/a |
| Variant Requires Shipping / Taxable | `TRUE` / `TRUE` unless the owner says otherwise | n/a |
| Variant Barcode | UPC/EAN if you have them, otherwise blank | n/a |
| Image Src / Position / Alt Text | Public image URL, order, descriptive alt | "The Junction open cuff in brushed brass, front view" |
| SEO Title | ≤ 60 characters, "{Name} {Type} · Parkdale Brass" | The Junction Brass Cuff · Parkdale Brass |
| SEO Description | 150–160 characters, factual | n/a |
| Variant Weight Unit | `g` | g |
| Cost per item | Your landed cost (private; never shown) | n/a |
| Status | `draft` | draft |
| Short description | 1–2 sentences under the price | A minimal open cuff with softened edges. |
| Material | Verified alloy or composition, as you want it shown | n/a |
| Finish | Actual surface finish and any coating | n/a |
| Patina notes | How the finish changes with wear. **Blank** for coated or plated finishes that don't patina. | n/a |
| Dimensions | Measurements in mm, with inches where useful. Line breaks allowed. | Width 6 mm. Inner circumference 160 mm. Opening 25 mm. |
| Fit notes | Tested fit range per size. No "adjustable" without tested limits. | n/a |
| Care instructions | Steps confirmed on samples for this finish | n/a |
| Origin | Verified country of manufacture, or blank. Never inferred from the Toronto brand. | n/a |

Dimensions and care are **multi-line text** fields so they import by CSV (decision D-18). Use line breaks, not HTML.

---

## Fact sheet: answer per product (for the owner or supplier)

Copy this block once per product. Every answer must come from the actual sample or supplier documentation.

```text
PRODUCT: ______________________   Category: Bracelet / Necklace / Ring

1. Final name and handle:
2. Description (40–90 words, from the sample):
3. Base metal / alloy composition (as documented by the supplier):
4. Safety documentation held (e.g. lead/nickel/cadmium test reports, market requirements met). Yes/No and document reference:
5. Finish(es) offered, and any coating or plating (type, thickness if known):
6. Does each finish patina or darken with wear? (Yes / No / Unknown)
7. Sizes offered and the tested fit range for each:
8. Dimensions (mm): width, thickness, inner circumference / diameter, opening, pendant size, chain length, clasp type:
9. Packed weight per variant (g):
10. Care instructions confirmed on a sample (per finish):
11. Country of manufacture (if it will be disclosed):
12. Price per variant (CAD):           Cost per variant:
13. SKU per variant:                   Barcode (if any):
14. Starting stock per variant:
15. Photography done? (4 shots per finish, per photography-brief.md): Yes/No
16. Anything that must NOT be claimed for this product:
```

Questions 3–6, 8 and 10 are the facts the storefront publishes. If any of them is unknown, that product isn't ready to launch, and the related block on its page stays hidden.

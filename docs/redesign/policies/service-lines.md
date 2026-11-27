# Product-page service lines

**Status:** proposed, waiting for the owner's approval. Design spec `02` §6.2 item 10 says these are "owner-approved shipping and returns summaries, hidden until approved". Until the owner approves the text, the two settings stay empty and the lines don't show.

## What the design asks for

`02` §6.2 item 10: two short lines in 14 px `--pb-body` text, each with a gold line icon, after a `--pb-rule` hairline, below Add to bag. Canvas page B (`Archive-Product`) draws the truck line as "[Shipping markets and delivery time: owner to confirm]" and the return line as "[Returns and exchanges window: owner to confirm]". The truck and return glyphs are already in the theme (D-38). `04` §1 has no wording for them. `04` §4 still lists "Shipping markets, timelines, duties" (for the PDP service lines) and "Returns and exchanges" as missing, and `qa-results.md` says the lines wait on D-01 and D-02. The owner has since answered both (D-53, D-54), so `04` §4 needs updating in a later docs task.

## The two lines

Built only from owner decisions. Each is at most about 60 characters.

| # | Icon | Text | Characters | Source |
| --- | --- | --- | --- | --- |
| 1 | Truck | Ships in 1 to 2 business days. $15 flat, free from $129. | 56 | Owner 2026-11-27 (D-53; owner-inputs D-01): orders ship in 1 to 2 business days; $15.00 CAD flat; free on orders of $129.00 CAD or more. Canada only (D-44), and prices are in CAD. |
| 2 | Return | 30-day returns and exchanges. Free ring size exchange. | 54 | D-44 and D-53 (owner-inputs D-02): returns or exchanges of unworn pieces within 30 days of delivery, in original packaging; one free size exchange per ring order within those 30 days, with a prepaid return label. |

Why this wording:

- **Line 1 shows the $15.00 rate, not only the free threshold.** It's a fixed charge on every order under $129.00, and showing it before checkout is the safer reading of the drip-pricing rules (Competition Act s. 74.01(1.1); [`README.md`](README.md), legal point 33). "Free from $129" means $129.00 or more, which matches the store rate (`TOTAL_PRICE >= 129.00 CAD`). "Over $129" would be wrong.
- **Line 1 leaves out "Canada" and the 2 to 7 days.** Both are in the Shipping & returns tab and the Shipping policy. The store sells only to Canada and checkout takes Canadian addresses only (once the markets are narrowed, Phase 5). Fitting the rate in mattered more.
- **Line 2 has to read right on both products.** The Brockton and The Bellwoods share one product template (`templates/product.json`), so both pages show the same lines. "Free ring size exchange" names rings, so it's still accurate on the pendant page. We never say "resize".
- **Words used across the site:** "1 to 2 business days", "30 days" and "size exchange" are the words in the Shipping policy, the Returns and exchanges policy and the terms.

## Before the lines can show

1. **The owner approves the text** (`02` §6.2 item 10). See owner question 62 in [`README.md`](README.md).
2. **Line 2, "Free":** the owner confirms the new size is also shipped free on a size exchange. Until then the returns draft keeps "[owner to confirm: we ship the new size to you at no charge]". If it isn't free, "Free ring size exchange" could mislead (Competition Act s. 74.01(1)(a); legal point 28), and line 2 becomes "30-day returns and exchanges, prepaid size-exchange label." (58 characters).
3. **Line 1, "free from $129":** the owner says how the $129.00 is counted (before tax; before or after a discount), and the Shipping policy says so (`[Threshold: …]`; legal point 34).
4. **The policies are live** with the same facts, so a line never promises more than the policy behind it.
5. **Checks:** banned phrases and claims (`04` §1): none used. Canadian English: yes.

## Alternatives, if the owner prefers

| Text | Characters | Trade-off |
| --- | --- | --- |
| Ships across Canada in 1 to 2 business days. Free from $129. | 61 | Names the market, as the canvas placeholder does, but drops the $15.00 rate (legal point 33) |
| Ships in 1 to 2 business days. $15 flat, free from $129 CAD. | 60 | Adds "CAD". Use it if the price on the page doesn't show CAD (money format, G-24) |
| Returns or exchanges within 30 days of delivery | 47 | Exact window, no size-exchange mention. Suits a pendant-only template |
| Free size exchange within 30 days of delivery | 45 | For a ring-only template, if one is added later |

## Where they go (a later theme task, not this folder)

`templates/product.json` → block `service` (Dawn `icon-with-text`, `layout: vertical`): line 1 in `heading_1` (`icon_1: truck`), line 2 in `heading_2` (`icon_2: return`). Both are empty today. Merge the two keys; don't overwrite the file (`AGENTS.md`). Change the text whenever the shipping or returns facts change.

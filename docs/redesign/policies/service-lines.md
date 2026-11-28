# Product-page service lines

**Status:** launch-ready. Both lines use only owner decisions (D-44, D-53, D-54, D-57) and match the four policies word for word where they overlap. Design spec `02` §6.2 item 10 calls them "owner-approved shipping and returns summaries, hidden until approved". Under D-55 the policies and their summaries count as owner-approved text for launch, so the lines can be set once the policies go live (E-10). Until then the two settings stay empty and the lines don't show.

## What the design asks for

`02` §6.2 item 10: two short lines in 14 px `--pb-body` text, each with a gold line icon, after a `--pb-rule` hairline, below Add to bag. Canvas page B (`Archive-Product`) draws them as "[Shipping markets and delivery time: owner to confirm]" (truck) and "[Returns and exchanges window: owner to confirm]" (return). The truck and return glyphs are already in the theme (D-38).

## The two lines

Each is 60 characters or fewer.

| # | Icon | Text | Characters | Source |
| --- | --- | --- | --- | --- |
| 1 | Truck | Ships in 1 to 2 business days. $15 flat, free from $129. | 56 | D-53 (owner-inputs D-01): ships in 1 to 2 business days; $15.00 CAD flat; free on orders of $129.00 CAD or more. Store rate `TOTAL_PRICE >= 129.00 CAD` ([`shipping.json`](../backup/2026-11-27/config/shipping.json)). Shipping policy, "How long it takes" and "Shipping costs" |
| 2 | Return | Free ring size exchange. 30-day returns. | 40 | D-44, D-53 (owner-inputs D-02): one free size exchange per ring order within 30 days, prepaid return label; returns of unworn pieces within 30 days of delivery. D-57: the new size ships free, so "free" holds both ways. Returns and exchanges policy, "Ring sizes and your free size exchange" |

Why this wording:

- **Line 1 shows the $15.00 rate, not only the free threshold.** It's a fixed charge on every order under $129.00. A price that can't be paid because of a fixed, obligatory charge is misleading unless the charge is a government tax (Competition Act s. 74.01(1.1), s. 52(1.3), verified on Justice Laws; README legal point 36). "Free from $129" means $129.00 or more, which matches the store rate and the policy's "The $129.00 is the total price of the jewelry in your order, before tax and shipping". "Over $129" would be wrong.
- **Line 1 gives the shipping time and the free threshold**, as the brief asks. "Canada" and the 2 to 7 delivery days are in the Shipping & returns tab and the Shipping policy; fitting the rate in mattered more.
- **Line 2 leads with the free size exchange,** now that D-57 ships the new size free and the return comes back on a prepaid label. "Free" is true end to end, so it isn't misleading (Competition Act s. 74.01(1)(a) and s. 74.03(5), general impression; README legal point 27). The earlier fallback wording ("prepaid size-exchange label") is no longer needed.
- **"30-day returns"** stays short. The conditions (unworn, original packaging, from delivery, customer pays return shipping on refunds) are in the Shipping & returns tab and the Returns policy, which the product page links. It doesn't say "free returns": refunds of unworn pieces are at the customer's cost (D-53).
- **Both lines read right on both products.** The Brockton and The Bellwoods share one product template (`templates/product.json`), so both pages show the same lines. "Free ring size exchange" names rings, so it stays accurate on the pendant page. We never say "resize".
- **Checks:** no banned phrases or claims (`04` §1); Canadian English; prices in CAD per the store (the "CAD" code shows once E-14 is applied).

## Alternatives, if the owner prefers

| Text | Characters | Trade-off |
| --- | --- | --- |
| Ships in 1 to 2 business days. $15 flat, free from $129 CAD. | 60 | Adds "CAD". Use it if the price on the page doesn't show CAD (money format, E-14) |
| Free ring size exchange. Returns within 30 days of delivery. | 60 | Exact return window; longer |
| One free ring size exchange. 30-day returns. | 44 | Says "one", as the policy does |

## Where they go (a theme task)

`templates/product.json` → block `service` (Dawn `icon-with-text`, `layout: vertical`): line 1 in `heading_1` (`icon_1: truck`), line 2 in `heading_2` (`icon_2: return`). Both are empty today. Merge the two keys; don't overwrite the file (`AGENTS.md`). If a shipping or returns fact ever changes, change the line and the policy together.

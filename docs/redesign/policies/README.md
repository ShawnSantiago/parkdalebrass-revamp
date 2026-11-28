# Policies: launch package

The four store policies, the newsletter consent line and the two product-page service lines for the Parkdale Brass jewelry launch. **Nothing here is in force yet.** The live store still shows its 2019 policies, backed up and redacted in [`../backup/2026-11-27/config/policies/`](../backup/2026-11-27/config/policies/). This isn't legal advice.

## Status

- **No lawyer (D-55).** The owner decided there's no lawyer review before launch. For every legal point, the agent applied its recommended answer: the reading that protects the customer more wherever the law is unclear, with no business promise or cost beyond the owner's decisions (D-44, D-53 to D-57).
- **Checked against the official sources.** Every citation was read on the official text on 2026-11-27 and re-checked on 2026-11-28: Ontario e-Laws (Consumer Protection Act, 2002 and O. Reg. 17/05, Sale of Goods Act, Business Names Act, Limitations Act, 2002, Employment Standards Act, 2000, Electronic Commerce Act, 2000, Age of Majority and Accountability Act, Courts of Justice Act, and the Consumer Protection Act, 2023, which is **not yet in force**), Justice Laws (PIPEDA, CASL and SOR/2012-36, the Competition Act, the CCPSA, SOR/2018-64, SOR/2018-82, the Income Tax Act and the Excise Tax Act), the OPC, the Competition Bureau, LégisQuébec (only for why Quebec is left out) and Shopify's legal pages. A rule that couldn't be confirmed is worded without a citation. See "Sources that didn't load".
- **Final once the owner facts are filled.** Each policy is launch-ready text except for the visible `[bracketed placeholders]` in "Still needed from the owner". Once those are filled, the text counts as owner-approved for launch under D-55, which meets the `phase-5-brief.md` §1 gate "Policies ready". No policy goes live with a bracket in it.
- **Revisit with a lawyer** (D-55) before the first meaningful sales volume, a new market (the US, or Quebec with its French-language rules), engraving or other custom work, or a dispute. The "Legal points resolved" index below is the lawyer's brief.
- **Re-check on launch day:** the Consumer Protection Act, 2023 is still not proclaimed ([e-Laws](https://www.ontario.ca/laws/statute/23c23)), and PIPEDA Part 1 is still the federal private-sector law ([Justice Laws](https://laws-lois.justice.gc.ca/eng/acts/P-8.6/FullText.html)). If either has changed, the affected points need redoing.

## Files

| File | What it is | Goes live as |
| --- | --- | --- |
| [`shipping-policy.md`](shipping-policy.md) | Shipping policy: customer text above the `---` line; sources, placeholders, store follow-ups and resolved legal points below it | Admin → Settings → Policies → Shipping policy (`/policies/shipping-policy`; the footer's "Shipping & Returns" link) |
| [`returns-and-exchanges.md`](returns-and-exchanges.md) | Returns and exchanges policy, laid out the same way | Admin → Settings → Policies → Refund policy (`/policies/refund-policy`) |
| [`privacy-policy.md`](privacy-policy.md) | Privacy policy | Admin → Settings → Policies → Privacy policy (`/policies/privacy-policy`), as manual text, not Shopify's automated policy |
| [`terms-of-service.md`](terms-of-service.md) | Terms of service | Admin → Settings → Policies → Terms of service (`/policies/terms-of-service`) |
| [`html/shipping-policy.html`](html/shipping-policy.html) | The Shipping policy's customer text, as Shopify-ready HTML | Pasted into the policy editor's HTML view |
| [`html/refund-policy.html`](html/refund-policy.html) | The Returns and exchanges policy, as HTML | Same, for the Refund policy |
| [`html/privacy-policy.html`](html/privacy-policy.html) | The Privacy policy, as HTML (its two tables become lists) | Same, for the Privacy policy |
| [`html/terms-of-service.html`](html/terms-of-service.html) | The Terms of service, as HTML | Same, for the Terms of service |
| [`newsletter-consent.md`](newsletter-consent.md) | The approved D-03 consent line with the contact email filled and a privacy-policy link, the exact richtext HTML for the `pb-newsletter` "Consent text" setting, and the CASL elements it covers | Theme setting (`templates/index.json`), when the signup goes public |
| [`service-lines.md`](service-lines.md) | The two product-page service lines (`02` §6.2 item 10), with sources | Theme settings (`templates/product.json`, block `service`) |
| [`requirements.md`](requirements.md) | The legal checklist the drafts were built on (ON-, PROV-, QC-, PRIV-, CASL-, COMP-, SHOP- ids) | Reference only |

The HTML files hold only the customer-facing body: no H1 (Shopify prints the title), no review notes, no "Legal points resolved". They use `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<li>`, `<a>`, `<strong>`, `<br>` (contact blocks) and one `<blockquote>` (the consent line quoted in the privacy policy). Placeholders stay visibly bracketed. If a Markdown file changes, regenerate its HTML so the two match.

## How the policies go live

1. **Fill every bracket** from "Still needed from the owner", with the same answer in every file (Markdown and HTML).
2. **Make the store match** ("Store changes these policies depend on"). A policy is only true once those are done.
3. **Paste at launch,** step 7 of `phase-5-brief.md` (store change **E-10**). Back up the current text first (`phase-3-brief.md` §2), paste each HTML file into its policy, and log the change in `owner-inputs.md` E. Rollback is pasting the backed-up text back (`phase-5-brief.md` §3, row 5).
4. **The consent line can go in earlier,** when the launch-list signup goes public (D-03). It's a theme setting, not a policy page.

## The same placeholder everywhere

| Placeholder | Meaning | Where |
| --- | --- | --- |
| `[legal name]` | The corporation's exact legal name (it trades as "Parkdale Brass") | All four policies |
| `[premises street address]` | The street address, with postal code, of the premises the business operates from. Not a P.O. box | Shipping, Returns, Terms |
| `[business phone]` | The business phone number | Shipping, Returns, Terms |
| `[mailing address]`, `[postal code]` | The CASL mailing address (a P.O. box is fine), written as "[mailing address], Toronto, ON [postal code]" | Consent line, Privacy |
| `[launch date]` | The launch date: each policy's "Effective" line and the lines on orders, records and subscribers from before launch | All four policies |
| `[payment processor]` | Who processes card payments | Privacy (three places) |
| `[Canada Post service]`, `[method of transport]` | The Canada Post service, and whether parcels go by road, air or both | Shipping |
| `[Changing or cancelling before it ships: …]` | Whether the buyer can change the address or cancel before shipping (same words in all three) | Shipping, Returns, Terms |
| `[Undeliverable or refused parcels: …]` | What happens when a parcel comes back, and any charge | Shipping |
| `[Returned piece that's worn or isn't in its original packaging: …]`, `[Original shipping charge: …]` | Two returns choices | Returns |
| `[how long records from before launch are kept]` | Retention for pre-launch records | Privacy |
| `[Any other app still connected at launch …]`, `[Any other app still on the site at launch …]` | Apps that still receive data or run scripts at launch, or delete both | Privacy |

The contact email **shawns@parkdalebrass.com** (owner-supplied, owner-inputs D-03) is filled in everywhere: customer service, returns, cancellations, safety reports and privacy.

## Cross-policy fixes (2026-11-28)

The four policies were read together. Fixed in place:

1. **Legacy orders:** one wording in all four, in the owner's words (D-53): "keep the terms they were sold under, and your rights under the law still apply". "Return and warranty terms" is gone, since no decision confirms a warranty, matching the privacy policy's earlier fix. Shipping now also offers the contact page.
2. **Late delivery:** Returns and Terms now carry Shipping's sentence on a later delivery date agreed in writing (CPA s. 26(1)(a)), so the right reads the same in all three.
3. **Cancellation notice:** Shipping now uses the Returns and Terms wording, including "If you write to us, your notice counts from the day you send it" (CPA s. 92(4)).
4. **A parcel that arrives after cancelling:** Shipping now uses the Returns and Terms wording (a return address we give you; counts as returned when sent; prepaid label or repayment).
5. **Card reversal:** the same sentence, with the 60-day limit (O. Reg. 17/05 s. 85(1)), is now in Shipping's late-delivery section too. Returns and Terms already matched word for word.
6. **Delivery date:** Shipping now has the same fallback as Returns and Terms ("If the tracking doesn't show a delivery date, it's the day you receive your parcel").
7. **Returns summary in Shipping:** "Each order with a ring", the damaged, faulty or wrong bullet and the refund bullet now read as in Returns and Terms.
8. **Business days:** Returns now says "the Ontario public holidays listed in our Shipping policy", as Terms does.
9. **Minimum age:** Privacy now uses the Terms' words, "the age of majority in your province or territory".
10. **Order emails:** Privacy now names the tracking number, as Shipping and Terms do.
11. **Consent line:** the line quoted in Privacy matches [`newsletter-consent.md`](newsletter-consent.md), including the new privacy-policy link.
12. **Review notes** in each file no longer say another policy is out of step.

Checked and already consistent: 30 days from delivery everywhere; $15.00 CAD flat and free from $129.00 CAD, counted before tax and shipping; 1 to 2 and 2 to 7 business days (3 to 9 in all); refunds within 5 business days after the return arrives; one free size exchange per order with a ring, prepaid label, new size shipped free; damaged, faulty or wrong pieces reported within 30 days with photos, buyer's choice, prepaid label, replacement shipped free; buyer pays return shipping only on a change-of-mind refund; Quebec, P.O. boxes and international shipping excluded; Canada Post with tracking, no signature; the safety line; the contact blocks and placeholder names.

## Legal points resolved (index)

Every point from the four files' former "For the lawyer" lists and the consent line, merged. *Policy* gives where each is resolved, by that file's point number: **S** Shipping, **R** Returns, **P** Privacy, **T** Terms, **C** the consent line, **SL** the service lines. The full reasoning is in each file's "Legal points resolved (D-55)". Those notes still cite the numbers of the former "Questions for the lawyer" list ("R" or "README" plus a number); that list is merged into this index, and it's kept in git history. Sources are official texts, read 2026-11-27 and re-checked 2026-11-28, unless marked otherwise.

| # | Point and what was applied | Policy | Source |
| --- | --- | --- | --- |
| | **Research and status** | | |
| 1 | Every citation checked on the official text; wrong section numbers corrected (late delivery is CPA s. 26, not s. 23; refund O. Reg. 17/05 s. 79(1); return s. 81; amendments ss. 41–42; return terms s. 32 item 11) | S16, T23, R (all), P (all) | As listed per point |
| 2 | Consumer Protection Act, 2023: not in force; written to the 2002 Act. Re-check on launch day | S14, R14, T22, P21 | [CPA 2023](https://www.ontario.ca/laws/statute/23c23); [CPA 2002](https://www.ontario.ca/laws/statute/02c30) header note |
| 3 | PIPEDA Part 1 still in force; Bill C-36 not written for | P20 | [PIPEDA](https://laws-lois.justice.gc.ca/eng/acts/P-8.6/FullText.html) currency note |
| | **Who the seller is** | | |
| 4 | "[legal name], operating as Parkdale Brass" in every contact block and the order confirmation; a corporation (D-57), so B-05 isn't affected | S13, R10, T1, P2 | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) s. 32 items 1–2; [Business Names Act](https://www.ontario.ca/laws/statute/90b17) s. 2(1), (6) |
| 5 | A premises street address and phone, not a P.O. box; the P.O. box is for the CASL mailing address only | S13, R10, T2 | O. Reg. 17/05 s. 32 item 2, s. 78 |
| 6 | Privacy contact by role title, with email and mailing address | P2 | PIPEDA Sch. 1 cl. 4.1, 4.8.2(a) |
| | **Disclosure and the contract** | | |
| 7 | Delivery: place, window, carrier, plus `[Canada Post service]` and `[method of transport]` | S1 | O. Reg. 17/05 s. 32 items 8, 9 |
| 8 | Key terms before purchase and in the order confirmation (the copy, within 15 days) | S11, R9, T3 | CPA ss. 38–40; O. Reg. 17/05 ss. 32–33 |
| 9 | Agreement starts at the order confirmation; price or description mistakes: buyer chooses, never charged more without agreement; refund within 15 days if no reply | T4 | CPA ss. 11, 14, 15(2)(e), 17; O. Reg. 17/05 ss. 41, 79(1) |
| 10 | The store's closed list of cancellation reasons; full refund within 15 days | T5 | CPA ss. 14(2) para. 13, 15(2)(e); O. Reg. 17/05 s. 79(1) |
| 11 | Changing or cancelling before shipping: owner placeholder, with a pointer to the statutory rights | S18, T24 | O. Reg. 17/05 s. 32 items 11, 14; CPA ss. 26, 40 |
| 12 | "The version in effect when you place your order applies"; privacy changes notified before they take effect | S12, R18, T9, P18 | O. Reg. 17/05 ss. 41–42; PIPEDA Sch. 1 cl. 4.2.4 |
| 13 | "If two policies conflict, the one that's better for you applies" | T10 | CPA s. 11 |
| | **Cancelling under the law, and refunds** | | |
| 14 | Late delivery: cancel any time before delivery if not delivered within 30 days after the order (or after a later date agreed in writing); waiver after the 30 days; deemed-delivery cases not listed | S2, R4, T13 | CPA ss. 1, 21(1), 26(1)–(4); O. Reg. 17/05 ss. 18, 23.1 |
| 15 | Statutory refund: everything paid, within 15 days after notice; notice in any way, written notice counts when sent | S2, R2, R17, T13 | CPA ss. 92(2)–(4), 94, 96(1)(a); O. Reg. 17/05 s. 79(1) |
| 16 | Returning goods after a statutory cancellation: 15 days after the later of notice and receipt, a method confirming delivery, counts when sent, store pays; no "unused" condition | S2, R1, R15, T13 | O. Reg. 17/05 ss. 78, 81(1)–(4), 82; CPA s. 96(2)–(3) |
| 17 | Card reversal: in writing, within 60 days after the store's 15 days end | S2, R3, T13 | CPA s. 99; O. Reg. 17/05 s. 85(1) |
| 18 | The $50 threshold isn't stated: rights are given on every order (protective; matters only if an order totals $50 or less) | R22, T13 | CPA ss. 21(1), 37; O. Reg. 17/05 ss. 23.1, 31 |
| 19 | Events outside our control: prompt notice and a choice to cancel for a full refund; doesn't affect late-order cancellation | T15 | CPA ss. 7(1), 26(2) |
| | **Risk of loss and delivery** | | |
| 20 | The parcel is the store's responsibility until delivered; lost parcels replaced or refunded, the buyer chooses; "delivered but not received" steps | S3, T7 | [Sale of Goods Act](https://www.ontario.ca/laws/statute/90s01) ss. 19, 21, 31(1); CPA ss. 11, 14(2) para. 13, 26 |
| 21 | Delivery date (starts the 30 days): Canada Post's tracking, or the day received | S3, R19, T7 | CPA s. 11 |
| | **Quality, faults and safety** | | |
| 22 | The 30-day damage window is the store's process; "doesn't shorten your rights"; must match the description and be of merchantable quality | S4, R5, T6 | CPA s. 9(2)–(3); SGA ss. 14, 15 para. 2; [Limitations Act, 2002](https://www.ontario.ca/laws/statute/02l24) s. 4 |
| 23 | Replace or refund at the buyer's choice; fault defined; wrong piece treated as faulty; out-of-stock becomes a refund | R6, R20 | SGA ss. 12(1), (3), 14, 15; CPA s. 11; [Competition Act](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) s. 74.01(1)(c) |
| 24 | Liability: no cap; unforeseeable and business losses excluded; every consumer carve-out kept | T6 | CPA ss. 7(1), 9(2)–(3) |
| 25 | Product statements: finishes only named; no coating, wear, hypoallergenic or nickel-free claim; "chrome is normally plated over nickel"; no "made for adults" yet | T11 | Competition Act s. 74.01(1)(a)–(c); [SOR/2018-82](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-82/FullText.html) s. 1 |
| 26 | Safety reports: Health Canada and the supplier if the law requires; supplier gets the customer's details only with agreement or by law | R13, T11, P23 | [CCPSA](https://laws-lois.justice.gc.ca/eng/acts/C-1.68/section-14.html) ss. 13, 14(1)–(2); PIPEDA s. 7(3)(i) |
| | **Returns details** | | |
| 27 | "Free" size exchange holds end to end (prepaid label, new size shipped free, D-57) | R7, SL | Competition Act ss. 74.01(1)(a), [74.03(5)](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.03.html) |
| 28 | "Unworn" (only tried on to check the fit, no marks, scratches or signs of wear) and "original packaging" (not the outer shipping box or mailer), defined once and the same in Shipping | R8, S15 | CPA ss. 11, 14, 15(2)(e), 17 |
| 29 | The 5-business-day refund runs from the return's arrival (D-57) | R16 | CPA s. 11 |
| 30 | Orders placed before launch keep the terms they were sold under, and the law still applies; void 2019 clauses not reaffirmed | R11, T14, S15 | CPA ss. 7(1), 9(3) |
| | **Scope** | | |
| 31 | One Canada-wide policy; Ontario law applies to every order; "the law where you live may protect you too" | S12, R12, T8 | CPA s. 2(1), 7(1) |
| 32 | Quebec left out at launch (D-57), said plainly in Shipping, Returns, Terms and Privacy | S10, R12, T17, P1 | [Charter of the French Language](https://www.legisquebec.gouv.qc.ca/en/document/cs/C-11) ss. 52, 55; [Quebec CPA](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1) ss. 54.1, 54.9, 54.13 |
| 33 | Ontario law, the buyer's home-province protection and local courts; no arbitration, no class-action waiver | T8 | CPA ss. 2(1), 7, 8, 100; [Courts of Justice Act](https://www.ontario.ca/laws/statute/90c43) s. 22(1) |
| 34 | Minimum age: "the age of majority in your province or territory", the same in Terms and Privacy; under-13 knowing collection | T12, P17 | [Age of Majority and Accountability Act](https://www.ontario.ca/laws/statute/90a07) s. 1; OPC consent guidelines |
| 35 | 2019 indemnity removed; the name and site content claimed, not the designs; "We stay responsible to you" for service providers; Online Store only (D-56) | T19, T20, T21 | CPA ss. 14(2) para. 13, 15(2)(e) |
| | **Prices, shipping claims and tax** | | |
| 36 | Drip pricing: the $15.00 flat rate shown before checkout (policy, service line 1, cart) | S5, T26, SL | Competition Act ss. 74.01(1.1), [52(1.3)](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-52.html); [Competition Bureau](https://competition-bureau.canada.ca/en/deceptive-marketing-practices/drip-pricing) |
| 37 | Free shipping: "$129.00 … before tax and shipping", the same everywhere | S6, SL | Competition Act ss. 52(4), 74.03(5) |
| 38 | "Sales tax", with shipping taxed; no tax types named | S7 | O. Reg. 17/05 s. 32 item 4 |
| 39 | No duties or brokerage fees, because orders ship within Canada | S8 | O. Reg. 17/05 s. 32 item 5 |
| 40 | "2 to 7 business days, wherever we ship in Canada" (owner to confirm no area takes longer) | S9 | CPA s. 14(2); Competition Act s. 74.01(1)(a) |
| 41 | Business days: Monday to Friday, except Ontario's nine public holidays; no order cut-off | S17 | [Employment Standards Act, 2000](https://www.ontario.ca/laws/statute/00e41) s. 1(1) |
| 42 | No gift cards or discounts at launch, so no terms for them | T16 | O. Reg. 17/05 ss. 25.1–25.5; Competition Act s. 74.01(2)–(3) |
| | **Email and CASL** | | |
| 43 | Order and shipping emails are transactional: no marketing in them, and their footer still identifies the business | S11, T18, P15 | [CASL](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/FullText.html) ss. 1(2), 6(2), 6(6)(b)–(c) |
| 44 | Checkout reminders treated as marketing: subscribers only | T18, P15 | CASL ss. 6(6), 10(10) |
| 45 | Consent line: purpose, name, mailing address, email, withdrawal statement; no pre-ticked box; privacy-policy link added | C, P15 | CASL s. 10(1); [SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html) s. 4; OPC consent guidelines |
| 46 | Unsubscribe at no cost, honoured within 10 business days; link valid 60 days (email template) | P15, C | CASL s. 11(1)–(3) |
| 47 | Proof of consent: a record kept; dated copies of each wording; confirmation email or double opt-in is a store choice | P24, C | CASL s. 13 |
| 48 | Pre-launch subscribers not emailed about jewelry; no implied consent used | P16 | CASL s. 10(9)–(10) |
| | **Privacy** | | |
| 49 | PIPEDA governs; Quebec's act not needed while Quebec is out | P1 | PIPEDA s. 4(1)(a) |
| 50 | The key elements up front ("At a glance"), including Shopify's own use and the foreign-access risk | P3 | PIPEDA s. 6.1; [OPC consent guidelines](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/) |
| 51 | Storage outside Canada, naming the US; "may" for providers not yet known | P4 | OPC (2019-09-23); [Shopify Privacy Policy](https://www.shopify.com/legal/privacy); PIPEDA Sch. 1 cl. 4.1.3 |
| 52 | Cookies: banner on, three groups, Shopify's list linked, one-year maximum | P5 | [Shopify cookie policy](https://www.shopify.com/legal/cookies); OPC on online behavioural advertising |
| 53 | "We don't sell your personal information", once the GTM pixel is gone; the "Do not sell or share" footer link not mentioned; no browser-signal promise | P6 | CPA s. 14; Competition Act s. 74.01(1)(a) |
| 54 | Retention: six years for orders; consent record three years after unsubscribing; messages and safety reports two years; pre-launch records a placeholder | P7 | [Income Tax Act](https://laws-lois.justice.gc.ca/eng/acts/I-3.3/section-230.html) s. 230(4)(b); [Excise Tax Act](https://laws-lois.justice.gc.ca/eng/acts/E-15/section-286.html) s. 286(3); CASL s. 13; Limitations Act s. 4 |
| 55 | Withdrawing consent, subject to legal or contractual limits | P8 | PIPEDA Sch. 1 cl. 4.3.8 |
| 56 | Access and correction: 30 days, one extension of no more than 30 days with notice, written refusal, cost rule, information kept until recourse is used | P9, P22 | PIPEDA s. 8(1)–(8); Sch. 1 cl. 4.9 |
| 57 | Complaints: the business first, then the OPC | P10 | PIPEDA s. 11(1); Sch. 1 cl. 4.10.4 |
| 58 | Breaches: report and notify where there's a real risk of significant harm; record every breach | P11 | PIPEDA s. 10.1; [SOR/2018-64](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-64/FullText.html) s. 6(1) |
| 59 | Disclosure without consent, advisers, and a sale of the business (both stages) | P12 | PIPEDA ss. 7(3), 7.2 |
| 60 | Service providers: only those at launch; placeholder rows for any app still connected, including staff AI apps | P13, P19 | PIPEDA Sch. 1 cl. 4.1.3; [Shopify DPA](https://www.shopify.com/legal/dpa) |
| 61 | Shopify's own use (Shop, Shop Pay, ads), its policy and opt-out; no "full card number" claim | P14 | [Shopify Consumer Privacy Policy](https://www.shopify.com/legal/privacy/consumers) |
| 62 | Closing an account: closed, unneeded details deleted, order records kept six years | P25 | PIPEDA Sch. 1 cl. 4.5.3 |
| | **The whole package** | | |
| 63 | General impression: no banned phrases, no unverified product facts, no mention of the old product line; "free" is free end to end. Re-read once the brackets are filled | S19, R21, T26, P21 | Competition Act s. 74.03(5); CPA s. 14 |

## Still needed from the owner

Only facts and choices no one else can supply. Each fills a visible placeholder.

1. **Legal name** of the corporation, and confirmation that "Parkdale Brass" is registered as its business name.
2. **Premises street address**, with postal code: where the business operates from (not a P.O. box).
3. **Business phone** number.
4. **Mailing address** for the consent line and the privacy policy, with postal code (a P.O. box is fine). Is it in Toronto?
5. **Launch date.**
6. **Payment processor** (for example Shopify Payments). The store export doesn't show it.
7. **Canada Post service** for jewelry orders, and whether parcels go by **road, air or both**.
8. **Four choices:** can a buyer change or cancel before it ships (how, until when, refund timing)? What happens to a parcel that comes back, and is there a charge? What happens to a return that's worn or has no packaging? Is the original shipping charge refunded on a change-of-mind refund?
9. **Pre-launch records:** how long to keep them (deleting any needs an export first).
10. **Apps at launch:** keep Klaviyo connected (then it's named in the privacy policy) or disconnect it? Any other app still receiving customer data?

Please confirm, or tell the agent if not: lost parcels are replaced or refunded at the buyer's choice, with a refund within 15 days (the law already requires a full refund after 30 days without delivery); Canada Post meets 2 to 7 business days everywhere you ship; no launch order can total $50 or less.

## Store changes these policies depend on

Each is a **Phase 3 store change**: back up first, apply, verify and log it in `owner-inputs.md` E under the `phase-3-brief.md` §2 change protocol. The policies are only true once they're done. "Tell the owner first" marks the cases `AGENTS.md` names (publishing, emailing customers, deleting, cost).

| # | Change | Policies | Tag |
| --- | --- | --- | --- |
| 1 | **Markets and zones:** sell to Canada only; remove **QC** from the Domestic zone; remove the US and International zones and the "Ships Outside North America" profile (D-44, D-57) | Shipping, Returns, Terms, Privacy | Phase 3 store change |
| 2 | **Canada Post tracked rates:** jewelry in the merchant General profile (CAD, not the Printful USD profiles); $15.00 CAD flat under $129.00 and free at $129.00 or more; test checkout: $128.99 is charged $15.00, $129.00 ships free, before tax | Shipping, Terms, service line 1 | Phase 3 store change |
| 3 | **P.O. boxes:** refuse them at checkout if possible; otherwise check each order and ask for a street address | Shipping, Terms | Phase 3 store change (process) |
| 4 | **Cookie banner on** for Canada (D-57); test that it holds back report and marketing cookies until accepted and asks again once cookies are cleared | Privacy | Phase 3 store change |
| 5 | **Checkout marketing box** ("Email me with news and offers") not ticked in advance for Canada | Privacy, Terms, consent line | Phase 3 store change |
| 6 | **Order confirmation email** edited to carry the Ontario CPA s. 32 and s. 33 details: "[legal name], operating as Parkdale Brass", premises address, phone and email; buyer's name and order date; items, prices, shipping, tax and total; delivery address; estimated delivery (3 to 9 business days); Canada Post with the service and method of transport; links to all four policies. No marketing content; the footer gives the name, mailing address and contact email | All four | Phase 3 store change |
| 7 | **Shipping confirmation email** on, with the Canada Post tracking number on every fulfilment; no marketing; the same footer | Shipping, Terms, Privacy | Phase 3 store change |
| 8 | **Policies pasted** from `html/` into Settings → Policies (E-10), privacy as manual text. Then check checkout shows the policy links, including the **refund policy** | All four | Phase 3 store change, applied at launch step 7 (tell the owner first) |
| 9 | **Abandoned-checkout emails** off, or sent to subscribers only | Privacy, Terms | Phase 3 store change |
| 10 | **Shopify Email:** pre-launch subscribers kept out of every audience (D-04); the newsletter template carries the name, mailing address, a contact method and an unsubscribe link; choose a welcome email or double opt-in | Privacy, consent line | Phase 3 store change |
| 11 | **Apps and pixels (D-56, D-27):** remove the GTM pixel, Ordersify, UpPromote, Concierge and Microsoft Clarity; Sezzle off; Judge.me off; Shop sign-in off; Online Store the only channel. Triple Whale is dropped | Privacy, Terms | Phase 3 store change (tell the owner the day of each uninstall: it deletes app data) |
| 12 | **Klaviyo's future**, and any other app still receiving customer data (Printful, ShipStation, Flow, staff AI apps): disconnect, or name it in the privacy policy's placeholder rows | Privacy | Phase 3 store change (tell the owner first: uninstalling deletes data) |
| 13 | **"Do not sell or share" footer link** and `/pages/ccpa-opt-out`: take the link out of `footer-help` or rewrite the page, which says the store shares data with advertising partners | Privacy | Phase 3 store change (tell the owner first if the page is deleted) |
| 14 | **Payments:** automatic capture stays on ("you pay the full amount when you place your order") | Terms | Phase 3 store change (check) |
| 15 | **Money format with "CAD"** (E-14) | Shipping, Terms, service lines | Phase 3 store change |
| 16 | **Customer accounts:** confirm one-time-code sign-in (E-13) and test closing an account that has orders | Privacy, Terms | Phase 3 store check |
| 17 | **Contact and size guide pages** live with approved copy (D-46) | All four (contact links), Terms | Phase 3 store change |

Theme settings that go with them (unpublished theme, merged key by key, not shared store data): the `pb-newsletter` consent setting ([`newsletter-consent.md`](newsletter-consent.md)), the two service lines ([`service-lines.md`](service-lines.md)), the cart note showing "$15 flat, free from $129" before checkout (legal point 36), and the product page's "Shipping & returns" tab stating the key restrictions (legal point 8).

## Sources that didn't load

Not relied on, and worded without a citation where they would have mattered: `help.shopify.com` (HTTP 403: the cookie banner's behaviour and one-time-code sign-in stay store tests), `www.canada.ca` (CRA and Health Canada guidance; the statutes were read instead), `crtc.gc.ca` (HTTP 403: the CASL bulletins), `ised-isde.canada.ca` (the Internet Sales Contract Harmonization Template), and `www.parl.ca` (Bill C-36's stage). `www.priv.gc.ca` loaded on 2026-11-27 and reset the connection on 2026-11-28. Other provinces' consumer statutes weren't read; the policies say only that "the law where you live may protect you too".

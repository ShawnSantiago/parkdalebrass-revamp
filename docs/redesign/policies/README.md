# Policy drafts (not in force)

This folder holds the drafts of Parkdale Brass's four store policies, the newsletter consent line and the product-page service lines for the jewelry launch. **Nothing here is in force.** The live store still shows its 2019 policies, backed up and redacted in [`../backup/2026-11-27/config/policies/`](../backup/2026-11-27/config/policies/). These drafts aren't legal advice.

**Legal review (D-55, owner, 2026-11-27).** The owner decided there's no lawyer review before launch. D-55 replaces the legal-review part of D-05 and D-53. For every legal point, the agent applies its recommended answer: the reading that protects the customer more wherever the law is unclear, checked against the official source, with no new business promises. "Questions for the lawyer" below lists each point with the recommended answer. If the owner brings in a lawyer later (D-55 says to before real sales volume, a new market such as the US or Quebec, custom work such as engraving, or a dispute), the same list is the lawyer's brief.

## Files

| File | What it is | Goes live as |
| --- | --- | --- |
| [`shipping-policy.md`](shipping-policy.md) | Shipping policy, with notes, owner questions and legal points | Admin → Settings → Policies → Shipping policy (`/policies/shipping-policy`; the footer's "Shipping & Returns" link) |
| [`returns-and-exchanges.md`](returns-and-exchanges.md) | Returns and exchanges policy | Admin → Settings → Policies → Refund policy (`/policies/refund-policy`) |
| [`privacy-policy.md`](privacy-policy.md) | Privacy policy | Admin → Settings → Policies → Privacy policy (`/policies/privacy-policy`), as manual text, not Shopify's automated policy |
| [`terms-of-service.md`](terms-of-service.md) | Terms of service | Admin → Settings → Policies → Terms of service (`/policies/terms-of-service`) |
| [`newsletter-consent.md`](newsletter-consent.md) | The approved D-03 consent line, the exact richtext HTML for the `pb-newsletter` "Consent text" setting, and the CASL items it covers | Theme setting (`templates/index.json`), when the signup goes public |
| [`service-lines.md`](service-lines.md) | The two product-page service lines (`02` §6.2 item 10) and their sources | Theme settings (`templates/product.json`, block `service`), once the owner approves them |
| [`requirements.md`](requirements.md) | The legal checklist the drafts are built on (ON-, PROV-, QC-, PRIV-, CASL-, COMP-, SHOP- ids) | Reference only |

## How the policies go live

1. **Fill every bracket.** Owner brackets need the answers in "Still needed from the owner". Under D-55, the agent resolves `[Lawyer …]` brackets with the recommended answers below, after checking each against the official text. No policy goes live with a bracket in it.
2. **Match the store first.** Each draft's notes list the store settings it depends on (markets and shipping narrowed to Canada, payment methods, the checkout email box, the order-confirmation template, the cookie banner, pixels and apps). A policy is only true once those are done.
3. **Final text counts as approved** under D-55, which meets the `phase-5-brief.md` §1 gate "Policies ready" (D-01 to D-06, E-10).
4. **Paste at launch, step 7** of `phase-5-brief.md` (store change **E-10**). Back up the current text first (step 1; `phase-3-brief.md` §2), convert each draft's text above its "---" line to HTML, drop the H1 and the draft banner (Shopify prints the title), and log the change in `owner-inputs.md` E. Rollback is to paste the backed-up text back (`phase-5-brief.md` §3, row 5).
5. **The consent line can go in earlier,** when the launch-list signup goes public (D-03). It's a theme setting, not a policy page.

## The same placeholder everywhere

The four policies and the consent line use these names, so one answer fills every copy:

| Placeholder | Meaning |
| --- | --- |
| `[contact email]` | The public customer contact email (D-03's consent wording calls it `[email address]`) |
| `[mailing address]`, `[postal code]` | The CASL mailing address (a P.O. box is fine) |
| `[business address: street]`, `[postal code]` | The street address of the premises (O. Reg. 17/05 s. 32; a P.O. box may not be enough, legal point 5) |
| `[business phone number]` | The business phone number |
| `[legal name of the business, if different]` | The legal name, if it isn't "Parkdale Brass" |
| `[privacy contact title]`, `[privacy contact email]` | The privacy role and its email (it can be the contact email) |
| `[launch date]`, `[date]` | The launch date (legacy-orders lines, D-06) and each policy's effective date |
| `[return address]`, `[reply time]` | Where returns go, and how soon the store replies |
| `[refund timing: …]` | Refund speed for anything D-54 doesn't cover (damaged or faulty refunds, orders the store cancels) |
| `[Changing or cancelling before it ships: …]` | The buyer's change or cancellation before shipping, in the same words in Shipping, Returns and Terms |
| `[Delivery date: …]` | How the delivery date is set (Returns and Terms) |
| `[Replace or refund: …]`, `[Replacement shipping: …]`, `[Packaging photos: …]` | The damaged-or-faulty process (Shipping and Returns) |
| `[Threshold: …]`, `[Quebec: …]`, `[minimum age: …]` | How the $129.00 is counted; whether Quebec is served; the minimum age |

## Cross-policy fixes made on 2026-11-27

The four reviewed drafts were read together and brought into line:

1. **Banner:** all four now read "Draft — not yet in force" (D-55 removed the lawyer sign-off), and each file's notes explain D-55.
2. **Late delivery:** Returns now uses Shipping's reviewed wording, "If those 30 days pass and you then agree to take delivery, you can't cancel for late delivery, but your return rights still apply." The earlier "If you agree to take it late" could read as losing the right as soon as the date passed.
3. **Cancellation notice:** Shipping now uses Returns' wording, "tell us you're cancelling. We suggest a way you can keep a record of, such as an email", so the record isn't a condition on the right (legal point 17).
4. **The 15-day refund** now runs "within 15 days after you tell us" in all three documents (Shipping said "after you cancel").
5. **Parcel arriving after a cancellation:** Shipping's bracket no longer asks for the piece back "unused" (Returns review removed that condition, legal point 16) and now gives the Returns rule word for word.
6. **Card reversal:** the terms' sentence ("If we don't refund you in time, you may be able to ask your credit card issuer, in writing, to reverse the charge") is now in Returns too, so the two match (legal point 19).
7. **Refund line:** one wording in all three: "within 5 business days after it reaches us and we've checked it. Your bank or card provider may take longer to show the refund." Returns' "At a glance" no longer applies the 5 days to every refund; D-54 covers unworn returns, and damaged or faulty refunds get a `[refund timing: …]` bracket.
8. **Legacy orders:** one wording in all three: "keep the return and warranty terms they were sold under, and your rights under the law still apply … include your order number."
9. **"Across Canada"** (the owner's words) replaces "anywhere in Canada" in the terms, and the terms' duties line now matches Shipping ("customs duties, import taxes or brokerage fees on delivery").
10. **Change or cancel before shipping:** Shipping's two brackets (address changes, cancelling) became one, worded the same in all three documents.
11. **Damage process placeholders:** Returns now uses Shipping's `[Replace or refund: …]`, `[Packaging photos: …]` and `[Replacement shipping: …]`.
12. **Delivery date and business days:** Returns and Terms share one `[Delivery date: …]` bracket. Returns now points to the holidays listed in the Shipping policy, as the terms do, instead of keeping its own list.
13. **Contact blocks:** the same lines in Shipping, Returns and Terms (legal name, `[business address: street], Toronto, ON [postal code]`, phone, email, contact page link). The privacy block uses the privacy contact title and `[mailing address]`. Brackets no longer carry "owner to supply" inside the policy text.
14. **Privacy policy:** the quoted consent line uses `[contact email]` and `[postal code]`; order emails are described as "messages about its delivery, a return or an exchange" (the Shipping draft still brackets tracking, so no "shipping updates" promise); sign-in reads "a one-time code sent to that address", as in the terms; the "made for adults" bracket now uses the terms' exact words; "set once the lawyer signs off" is gone.
15. **Safety line:** the terms now say "has caused an injury or a skin reaction", as Returns does.
16. **Notes brought up to date:** Shipping's and Returns' "keep in step" notes no longer say the other draft lacks D-54. Shipping owner questions 10 and 11 merged. Terms owner question 18 ("Is D-54 final?") is marked settled, because D-54 is recorded as approved and AGENTS.md says not to reopen a decision without new information. Terms legal point 7 now cites Sale of Goods Act ss. 21, 31(1) and 31(2), as Shipping's review corrected them.

## Questions for the lawyer

Merged and de-duplicated from the "For the lawyer" lists in the four drafts and the consent line. *From* gives the source points: S = Shipping, R = Returns, P = Privacy, T = Terms, C = consent line.

**Status of the recommended answers.** Under D-55, each one is the agent's proposal: the more protective reading where the law is unclear, and no new business promise. Where an answer needs a business choice, it goes to the owner as a question. None is applied to the policy text yet, except where it says "in the text". Each still has to be checked against the official source, which this session couldn't open (see "Research limits"). This isn't legal advice.

### A · Research and status

1. **Unverified citations.** Every section number was checked by web search only. *From:* S16, R (limits), P (limits), T23. *Recommended:* before any answer below is applied, read each cited section on e-Laws, Justice Laws, the OPC and LégisQuébec. That needs `www.ontario.ca`, `laws-lois.justice.gc.ca`, `canlii.org`, `www.priv.gc.ca`, `crtc.gc.ca` and `www.legisquebec.gouv.qc.ca` allowed in the session's network settings.
2. **Consumer Protection Act, 2023.** Is it in force? *From:* S14, R14, T22. *Recommended:* treat the 2002 Act as in force (no proclamation found by search on 2026-11-27; one secondary site's 2026-01-01 claim isn't confirmed). Re-check on launch day. If the 2023 Act is in force, redraft the disclosure, copy, cancellation and refund wording. [CPA 2023][cpa23]; [Bill 142 status][b142].
3. **Bill C-36** (federal privacy reform). *From:* P20. *Recommended:* don't write for it yet. It was at second reading on 2026-11-27. Keep the PIPEDA and OPC wording and re-check at launch. [LEGISinfo C-36][c36].

### B · Who the seller is

4. **Legal name.** Must the legal name appear (O. Reg. 17/05 s. 32 items 1 and 2), and does Business Names Act s. 2(6) require it on the terms and order confirmations, even for a sole proprietor whose legal name is their own? This conflicts with B-05 (founder not named). *From:* S13, R10, T1, P2. *Recommended:* the disclosure law comes first. Show the legal name in "Who we are", the contact blocks and the order confirmation wherever it differs from "Parkdale Brass". B-05 governs the brand story, not legal identification. The owner supplies the name and structure (owner question 4). [O. Reg. 17/05][oreg]; [Business Names Act][bna].
5. **Premises address and phone.** Is a P.O. box "the address of the premises from which the supplier conducts business"? *From:* S13, R10, T2. *Recommended:* no. Use a street address for the policies and the order confirmation, plus a phone number. A P.O. box is fine for the CASL mailing address only ([CRTC 2012-548][crtc548], search only). Owner question 5.
6. **Privacy contact by title only.** *From:* P2. *Recommended:* a role title with an email and a mailing address meets PIPEDA principles 4.1 and 4.8. Keep it, plus the legal name per point 4. [OPC principles][opcp].

### C · Disclosure, the copy and the contract

7. **Delivery disclosure.** Is a window enough instead of a date? The shipper's identity and the mode of transport are still placeholders. *From:* S1. *Recommended:* the window is enough if the policy also names the carrier, the service and road or air (owner question 10). Add an estimated delivery range to the order confirmation. [O. Reg. 17/05][oreg] s. 32; [Harmonization Template][tmpl].
8. **Disclosure before purchase, and the s. 39 copy.** Is a checkout link to the policies enough, and does an edited order confirmation complete the copy? *From:* R9, T3, S11 (copy). *Recommended:* don't rely on a link alone. State the key restrictions in the product page's "Shipping & returns" tab and in the order confirmation (unworn, original packaging, 30 days from delivery, customer pays return shipping on refunds, the 30-day damage report with photos, no resizing), with links to all four policies. Edit the confirmation template to carry the buyer's name, the date, the seller's name, address, phone and email, the totals, delivery and the policies (SHOP-06). [CPA 2002][cpa] ss. 38–40; [O. Reg. 17/05][oreg] ss. 32–33.
9. **When the contract is formed, and pricing errors.** *From:* T4. *Recommended:* keep "Our agreement for your order starts when we send the order confirmation" and the buyer-choice process for mistakes (never charge more without consent; cancel with a full refund). It protects the buyer more than acceptance at shipping. In the text.
10. **The store's cancellation grounds and refund timing.** *From:* T5, T25. *Recommended:* keep the closed list. Refund within the owner's chosen time and never later than 15 days. The agent suggests 5 business days, to match D-54 (owner question 34). The owner must also agree to run the mistakes process in practice.
11. **The buyer changing or cancelling before shipping.** *From:* T24. *Recommended:* whatever the owner decides (owner question 19), keep the pointer that statutory cancellation rights still apply, so the answer can't read as limiting CPA s. 40. In the text.
12. **"Changes to this policy" clauses.** *From:* S12, R18, T9, P18. *Recommended:* keep "the version in effect when you place your order applies". For privacy, give notice of a significant change before it takes effect, on the site and by email to the people affected, and ask for consent for any new use. Emailing customers needs the owner told first (`AGENTS.md`; owner question 61). O. Reg. 17/05 ss. 42–43 aim at ongoing agreements and don't reach a one-off sale.

### D · Cancelling under the law, and refunds

13. **Late delivery.** Which section gives the right (CPA s. 26, or s. 23 which O. Reg. 17/05 s. 18 switches off for internet orders)? What triggers it when the store gives a window, does handing the parcel to the carrier count as delivery, and does it reach other provinces? *From:* S2, R4, T15. *Recommended:* offer the right to every buyer in all three documents, whatever the section turns out to be (the harmonized rules give a similar right in other provinces). Read "the latest delivery date we gave you" as the last day of the 2-to-7-business-day window after shipping. Count delivery as the parcel reaching the buyer's address, not the carrier taking it. Don't list the deemed-delivery cases. In the text, except the reading of the window. [CPA 2002][cpa]; [Template][tmpl].
14. **The 15-day refund after a statutory cancellation.** *From:* S2(d), R2, T13(b). *Recommended:* keep "everything you paid, including shipping, within 15 days after you tell us" (O. Reg. 17/05 s. 79(1); CPA s. 96(1); search only). In the text.
15. **Returning goods after a statutory cancellation.** *From:* R1, S2(f), T13(b). *Recommended:* keep the rule: return within 15 days of the later of cancelling and receiving the piece, by a method that confirms delivery; the store pays the reasonable cost and bears the loss once the parcel is sent (O. Reg. 17/05 s. 81(2)–(4) in one version; search only). The simplest way to pay is a prepaid label (owner question 36). Use the same words in Shipping's "parcel arrives after you cancel" bracket. In the text.
16. **No "unused" condition.** *From:* R15. *Recommended:* keep it out for every buyer. Ontario's rule has no such condition, and one Canada-wide rule is simpler and more protective than Alberta's. In the text.
17. **How a buyer gives notice (CPA s. 92).** *From:* S2(e), R17. *Recommended:* accept notice given any way the buyer can show they gave it. Only suggest email, never require a form. In the text (all three documents).
18. **The s. 40 periods (7 and 30 days): summarize, or only link?** Plus the Consumer Protection Ontario link. *From:* R2, T13(a), T13(d). *Recommended:* keep the short summary with "Time limits apply" and the links to Ontario's pages. A summary helps buyers more than a bare link. In the text.
19. **Card reversal (CPA s. 99).** *From:* R3, T13(c). *Recommended:* keep the one sentence, now in both Returns and Terms, with "in writing" and "if we don't refund you in time". Leave out the 60-day detail (O. Reg. 17/05 s. 85(1), search only). In the text.
20. **Events outside our control.** *From:* T15. *Recommended:* keep the clause only as drafted: prompt notice and a choice to cancel for a full refund, so it can't cut across the late-delivery right. In the text.

### E · Risk of loss

21. **Lost in transit, and lost after a "delivered" scan.** Who bears each loss, and which date starts the 30-day windows? *From:* S3, T7. *Recommended:* the store bears loss until the parcel reaches the delivery address. If it's lost in transit, the store replaces it or refunds in full. The owner picks which, but the text never leaves the buyer with neither (owner question 22). For a "delivered" scan with no parcel, the text gives the customer's first steps and the store opens a carrier claim, without saying the buyer bears the loss (owner question 23). Overstating the buyer's risk misleads (CPA ss. 14–15). The 30-day windows run from the delivery date in the carrier's tracking, or from the day the buyer receives it if there's no tracking. Sale of Goods Act ss. 21, 31(1) and 31(2), search only. [Sale of Goods Act][sga].

### F · Quality, faults and safety

22. **The 30-day damage and fault window (D-54) against the implied conditions.** Is "This time limit doesn't shorten your rights under the law" enough, and is the "merchantable quality" gloss right? *From:* S4, R5, T6(d). *Recommended:* keep the 30 days as the store's process for its prepaid-label promise, with the "doesn't shorten your rights" sentence wherever the 30 days appear. Keep "merchantable quality" and the gloss "in general, fit for the normal use of that kind of jewelry". In the text. [CPA 2002][cpa] s. 9; [Sale of Goods Act][sga] ss. 14–15; Limitations Act, 2002 s. 4.
23. **The replace-or-refund promise, and normal wear versus a fault.** *From:* R6, T11(a). *Recommended:* define it once the samples are in (owner question 40). Until then, no draft calls any change in a finish "normal", and the brackets stay. Competition Act s. 74.01(1)(c). [Competition Act s. 74.01][ca7401].
24. **Shipping a replacement for a piece damaged in transit.** *From:* S4. *Recommended:* ship replacements free. A charge would undercut the replace-or-refund promise and sit badly with the implied conditions. Owner to confirm (owner question 33).
25. **Liability limits.** *From:* T6(a)–(c). *Recommended:* keep the exclusions of unforeseeable and business losses, add no cap, and keep every carve-out (consumer law, implied conditions, death or injury from negligence, fraud). In the text.
26. **Product statements.** "Uncoated brass darkens and softens with wear"; "Chrome plating is normally applied over a layer of nickel"; no hypoallergenic or nickel-free claim; "made for adults" (SOR/2018-82). *From:* T11(a)–(c). *Recommended:* keep the approved brass line as a disclosure once samples confirm there's no coating (C-03). Keep the nickel sentence and the "no hypoallergenic or nickel-free" line until the supplier's test result is in. Use "made for adults" only if sizing, packaging and marketing all match the SOR/2018-82 definition. [SOR/2018-82][sor82]; [Health Canada children's jewelry guide][hcjewel].
27. **Safety reports and health information.** Is the contact line enough? What consent is needed before passing a customer's details to Health Canada or the supplier, and how long are reports kept? *From:* R13, T11(d), P23. *Recommended:* keep the contact path (no safety claim). Share only what a CCPSA s. 14 report needs, and tell the customer. Ask first before giving the supplier their name or contact details. Add a retention row for safety reports in line with CCPSA s. 13 record-keeping (search only). The two-day report itself is an internal process. [CCPSA s. 14][ccpsa14]; [Health Canada mandatory reporting][hc14].

### G · Returns details

28. **"Free" size exchange.** Is it misleading if the new size doesn't ship free? *From:* R7. *Recommended:* either ship the new size free or stop saying "free". The agent recommends shipping it free (owner question 28). Service line 2 stays hidden until then. Competition Act s. 74.01(1)(a), s. 52.
29. **"Unworn" and "original packaging".** Are they fair and enforceable? *From:* R8. *Recommended:* define "unworn" as tried on briefly, with no marks, scratches or signs of wear, because a ring has to be tried on. Say what the packaging includes, and don't refuse a return just because the outer shipping box is damaged. Owner to confirm the definitions (owner question 26). CPA ss. 11, 14–15, 17.
30. **When the 5-business-day refund clock starts (D-54: after "receiving and checking").** *From:* R16. *Recommended:* the check needs a stated limit so the longest wait is knowable. The agent recommends counting the 5 business days from arrival. That changes D-54, so it's an owner question (35), and D-54 stands until the owner answers. CPA s. 11; Competition Act s. 74.01.
31. **Orders placed before launch (D-06).** Is "keep the terms they were sold under, and your rights under the law still apply" enough, given the 2019 terms have void clauses? *From:* R11, T14. *Recommended:* yes. The line no longer reaffirms the void clauses, and it's now the same in all three documents. In the text.
32. **One Canada-wide policy, and the buyer's home-province law.** *From:* S12, R12, T8 (part). *Recommended:* keep one Canada-wide policy that meets the harmonized internet-sales rules, and keep "Nothing in this policy limits your rights … where you live". In the text.

### H · Prices, shipping claims and tax

33. **Drip pricing.** Must the $15.00 flat rate show before checkout? *From:* S5. *Recommended:* yes. Show "$15 flat, free from $129" on the product page (service line 1) and in the cart, not only at checkout. The cart note today is Dawn's "Taxes, discounts and shipping calculated at checkout." Competition Act s. 74.01(1.1), s. 52(1.3); Cineplex decision upheld 2026-01-21. [Bureau: drip pricing][drip].
34. **The free-shipping claim.** *From:* S6. *Recommended:* after a test checkout, say exactly how the $129.00 is counted next to every "free shipping" mention (owner question 17). Until then the bracket stays. Competition Act s. 74.03(5).
35. **The tax sentence.** *From:* S7. *Recommended:* keep "sales tax" until an accountant confirms which taxes the store is registered to collect (owner question 25).
36. **"No customs duties, import taxes or brokerage fees."** *From:* S8. *Recommended:* keep it only while every order ships from inside Canada (owner question 18). If any piece ships from abroad, change it and the checkout disclosure.
37. **"2 to 7 business days, across Canada."** *From:* S9. *Recommended:* keep it only if no regularly served area takes longer. Otherwise add the remote-area time (owner question 14). Competition Act s. 74.01(1)(a); CPA s. 14.
38. **Gift cards and discount codes, if added.** *From:* T16. *Recommended:* none at launch (D-44). If added later, follow O. Reg. 17/05 ss. 25.1–25.5 (no expiry dates, fee limits and disclosure) and add plain terms (owner question 45).
39. **The general-impression read-through.** *From:* P21 (and every draft). *Recommended:* once every bracket is filled, the agent re-reads all four policies, the consent line and the service lines together for the general impression (Competition Act s. 74.01(1)(a), s. 52; CPA ss. 14–15) before they're pasted.

### I · Quebec

40. **Quebec: serve it or leave it out at launch?** If served: French versions given first (Charter of the French Language ss. 52 and 55), the Quebec CPA distance-contract rules (ss. 54.9, 54.13), the legal warranty (ss. 37–38), the price rule (s. 224(c)) and Quebec's privacy law (P-39.1). *From:* S10, R12, T17, P1, P5. *Recommended:* leave Quebec out at launch. D-55 treats Quebec's French-language rules as a reason to revisit with a lawyer. If it's left out, remove QC from the shipping zone and say so in Shipping and Terms. The owner decides (owner question 24). [P-40.1][p401]; [OPC Quebec: delivery delays][opcqc].

### J · Terms of service

41. **Governing law, courts, arbitration and class actions.** *From:* T8. *Recommended:* keep: Ontario law, the buyer's home-province protection and local courts, no arbitration clause, no class-action waiver (CPA ss. 7–8; TELUS v. Wellman, 2019 SCC 19). In the text.
42. **"If two policies conflict, the one better for you applies."** *From:* T10. *Recommended:* keep. It mirrors CPA s. 11. In the text.
43. **Minimum age.** *From:* T12, P17. *Recommended:* "the age of majority where you live" (19 in some provinces), the same in the terms and the privacy policy (owner question 41).
44. **Removing the 2019 indemnity.** *From:* T21. *Recommended:* keep it removed. In the text.
45. **Content, the name and the designs.** *From:* T20. *Recommended:* don't claim the product designs until ownership is settled with the supplier (D-44). A trademark application is a business decision outside the policies.
46. **Service providers, and sales on other platforms.** *From:* T19. *Recommended:* keep "We stay responsible to you for your order". If jewelry is sold on Instagram, Facebook or Whatnot (owner question 51), add a line that those platforms' terms also apply to the purchase there.

### K · Email and CASL

47. **Order, shipping and exchange emails.** Do they need CASL identification and an unsubscribe, and does an edited order confirmation complete the s. 39 copy? *From:* S11, P15(c), T18. *Recommended:* treat them as transactional (CASL s. 6(6)), keep marketing content out of them, and still put the business name, mailing address and a contact method in their footer, which is protective and cheap. Point 8 covers the copy. [CRTC CASL FAQ][crtcfaq].
48. **Abandoned-checkout reminders to non-subscribers.** *From:* P15(d), T18. *Recommended:* send them only to subscribers, so "only to people who subscribe" stays true (owner question 56).
49. **The consent line, the checkout box and unsubscribing.** *From:* P15(a), (b), (e); C. *Recommended:* the D-03 line meets SOR/2012-36 s. 4 once `[mailing address]` and `[contact email]` are filled (search only). The checkout "Email me with news and offers" box must be unticked for Canada and describe the same purpose. Honour unsubscribes within 10 business days and keep links valid for 60 days (CASL s. 11(2)–(3)). [SOR/2012-36][sor36]; [newsletter-consent.md](newsletter-consent.md).
50. **Proof and confirmation of consent.** *From:* P24, C. *Recommended:* keep a dated copy of each version of the consent wording (Shopify keeps only the status, opt-in level and date). Confirm each sign-up with a confirmation email or Shopify's double opt-in, as CRTC 2012-548 suggests (search only). The owner chooses which (owner question 54). CASL s. 13.
51. **Legacy subscribers (D-04).** *From:* P16. *Recommended:* keep D-04 (don't email them) and keep saying so in the privacy policy. Keep the old addresses only as a do-not-email list, and don't use implied consent (CASL s. 10(10)). Deleting the list would need the owner's approval and an export first (`AGENTS.md`).
52. **"By subscribing" next to a "Notify me" button.** *From:* C. *Recommended:* keep both. The eyebrow and text make the purpose clear, and the live label is "Subscribe".

### L · Privacy

53. **Which privacy laws apply.** *From:* P1. *Recommended:* PIPEDA (s. 4(1)(a)). The BC and Alberta PIPAs don't reach an Ontario seller. Quebec's P-39.1 applies only if Quebec is served (point 40). [OPC: PIPEDA][opcpip].
54. **The four key elements, and notice at the point of collection.** *From:* P3. *Recommended:* keep the foreign-access risk in "At a glance". Add a link to the privacy policy where information is collected: the signup form (adds words to D-03, so owner question 3), the contact form and checkout (Shopify links its policies there). [OPC consent guidelines][opcc].
55. **Storage outside Canada.** *From:* P4. *Recommended:* keep the general wording that names the United States. Don't name countries per provider, since providers move data between regions. In the text.
56. **Cookies with no banner.** *From:* P5. *Recommended:* turn Shopify's cookie banner on for all of Canada. That's protective and needed anyway if Quebec is ever served. It costs some analytics data, so it's owner question 58. Link to Shopify's cookie list rather than naming each cookie.
57. **"We don't sell", the "Do not sell or share" link, Do Not Track and GPC.** *From:* P6. *Recommended:* use "We don't sell your personal information" only once the GTM pixel and every other pixel that declares a sale-of-data purpose is removed or audited. Keep the footer link only if it actually works; a link that does nothing misleads. Don't promise to honour browser signals unless the banner does (owner question 58).
58. **Retention periods.** *From:* P7. *Recommended (owner to approve, question 59):* order, payment and refund records for six years from the end of the tax year (CRA); proof of consent for as long as the person is subscribed and for three years after (the agent's understanding of CASL's limitation period, unverified); messages for two years after the last reply; the account until it's closed, after which order records follow the six-year rule; safety reports per point 27.
59. **Withdrawing consent.** *From:* P8. *Recommended:* keep (PIPEDA 4.3.8). In the text.
60. **Access, correction and deletion.** *From:* P9, P22. *Recommended:* keep the 30-day reply and the "no more than 30 more days" promise, since it's more protective than s. 8(4)(b). Add that information under an access request is kept until the person has used any recourse (s. 8(8)). Make the deletion line match what Shopify can do: "we delete it or remove what identifies you, except what the law requires us to keep, and we tell you what we kept and why". [OPC access bulletin][opcacc].
61. **Complaints.** *From:* P10. *Recommended:* keep: the business first, then the OPC (PIPEDA s. 11). In the text.
62. **Breaches.** *From:* P11. *Recommended:* keep the statement (s. 10.1; a 24-month breach record, SOR/2018-64 s. 6(1)). In the text.
63. **Disclosure without consent, advisers, and a sale of the business.** *From:* P12. *Recommended:* keep all three bullets. The s. 7.2 conditions are now in the text.
64. **Service providers and accountability.** *From:* P13. *Recommended:* keep the sentence. Add a provider from privacy table B only after its data-processing terms are checked, and drop any tool that has none (for example, UpPromote's pixel declares no privacy purpose). PIPEDA 4.1.3.
65. **Shopify's own role (Shop, Shop Pay) and the platform statements.** *From:* P14. *Recommended:* include the Shop paragraph only if Shop Pay or Shop sign-in is on (owner questions 43 and 44), with the March 2026 Shopify link once it's been opened and checked. Keep the one-time-code, HTTPS and card-number lines only as the owner confirms them.
66. **Staff-side AI apps** (Shopify ChatGPT and Claude connector apps with Admin API access). *From:* P19. *Recommended:* if staff use them with customer data, list them as service providers. If not, restrict or remove them (owner question 57).
67. **Closing an account.** *From:* P25. *Recommended:* say that the store closes the account and removes the profile, keeps order records for the tax period, and keeps an unsubscribed email on the do-not-email list. Use the same words in the privacy "Your account" row that the terms point to.

## Still needed from the owner

Every `[bracketed]` item above the line in each policy comes back to one of these questions. Each draft's notes list its own placeholders in full.

### Needed before the signup goes public (D-03)

1. **Mailing address** for the consent line and the privacy policy: a street address or a P.O. box, with the postal code. Is it in Toronto? (The approved line says "Toronto, ON".)
2. **Contact email.** You gave a contact email for the consent line and the policies (owner-inputs D-03). It starts with a first name, and B-05 keeps the founder unnamed. Should the site show that address, or a role address at parkdalebrass.com? Is it also the privacy contact email, and the address customers write to about orders?
3. **Optional:** may the consent line end with a "Privacy policy" link? It adds two words to the approved D-03 text ([`newsletter-consent.md`](newsletter-consent.md); legal point 54).

### Business identity and contact (all four policies)

4. What's the business's legal name and structure (corporation, sole proprietorship or partnership)? Is "Parkdale Brass" a registered business name? If it's a sole proprietorship, the law may require your own name in the terms and on order confirmations (legal point 4). Is that acceptable, or would you rather change the structure first?
5. Which **street address** (the premises you work from) and **phone number** go in the policies and order confirmations? A P.O. box is probably not enough here (legal point 5).
6. What title should the privacy contact have (for example "Privacy contact")?
7. What's the **return address** for parcels?
8. How soon will you reply to customer emails and return requests (for example within 2 business days)?
9. What's the **launch date** (for the lines on earlier orders), and each policy's effective date?

### Shipping

10. Which **carrier and service** will you use, and do parcels travel by road or by air?
11. Will every order be **tracked**? How will customers get the tracking number?
12. Will any orders need a **signature**?
13. Do you deliver to **P.O. boxes**?
14. Do any addresses (for example in the territories or fly-in communities) take **longer than 7 business days**? How long?
15. Do the **2 to 7 business days count from the day the order ships**? (The drafts read it that way, so the longest wait is about 9 business days from ordering.)
16. Are business days **Monday to Friday**? Which **holidays** don't count? Is there a daily **order cut-off** time (Eastern Time)?
17. How is the **$129.00** for free shipping counted: before tax, and before or after a discount? Please check it in a test checkout. If a return brings a free-shipping order under $129.00, is anything taken off the refund? (The drafts assume nothing is.)
18. Will every jewelry order **ship from inside Canada**? The "no duties or brokerage fees" line depends on it, and the supplier isn't chosen yet.
19. Can customers **change their address or cancel** an order before it ships? How do they ask, until when, and how soon is the refund? (One answer goes in Shipping, Returns and Terms.)
20. What happens if a parcel **comes back** to you (wrong address, not collected, refused)? Is there a charge?
21. If an order can't ship within 2 business days, will you **email the customer**? What choices do they get, for example waiting or cancelling for a full refund?
22. If the carrier **loses a parcel**, will you replace it or refund it in full? After how long is it treated as lost? (Legal point 21: one of the two, never neither.)
23. If tracking says **"delivered"** but the customer says it never came, what should they do first, and within how many days should they tell you?
24. Will you ship to **Quebec** at launch? (The agent recommends not yet, because it needs French versions of the policies; legal point 40.)
25. Which **sales taxes** is the store registered to collect (GST/HST and any provincial tax)? Please check with your accountant.

### Returns and exchanges

26. What does **"unworn"** mean for a ring that has to be tried on? The agent suggests "tried on briefly, with no marks, scratches or signs of wear" (legal point 29). What's in the **original packaging** (box, pouch, card)?
27. After a customer contacts you within the 30 days, **how long** do they have to send the piece?
28. On a **free size exchange**: is the new size also shipped free (the agent recommends yes; legal point 28)? With two rings in one order, does each get a free exchange, or one per order? What does a second exchange cost, or isn't it offered? What if the size is out of stock?
29. Can a customer exchange for the **other finish or a different piece**? If so, who pays shipping each way, and how is a price difference handled?
30. On a **refund**, does the customer send the piece back themselves, or do you email a label and take its cost off the refund (how much)?
31. Is the **original shipping charge** refunded on a refund?
32. What happens to a return that's **worn or has no packaging**, for example you send it back?
33. For a **damaged or faulty** piece: who chooses between a replacement and a refund? Do you need photos of the box or mailer too? What if the replacement is out of stock? Will you ship the replacement free (the agent recommends yes; legal point 24)? Is a wrong piece, finish or size handled the same way? Is the original shipping refunded?
34. **Refund timing beyond D-54:** does the same "original payment method, within 5 business days" apply to (a) refunds for damaged or faulty pieces, (b) orders cancelled before they ship and (c) orders you cancel (sold out, price mistake)?
35. D-54 starts the 5 business days after you **"receive and check"** a return. How long does the check take? Could the 5 days count from the day it arrives (legal point 30)?
36. When a customer cancels under a right the law gives them, the store pays to get the piece back. Will you **send a prepaid label** for that?
37. If a **return parcel is lost** on its way to you, who's responsible? Should the policy suggest a tracked service?
38. Will you turn on **self-serve returns** in customer accounts? (They handle returns, not exchanges.)
39. Can someone who got a piece as a **gift** exchange it, and who gets the refund?
40. Once you have **samples**: is the raw brass uncoated? How does the chrome plating wear? Which changes in each finish are normal, and which would you treat as a fault (for example, chrome wearing through at the edges)? Has the supplier's nickel-release test come back?

### Terms of service

41. What's the **minimum age** to buy or open an account: 18, or the age of majority where the buyer lives? (The agent recommends the second; legal point 43.)
42. Can the terms say your jewelry is **made for adults**, and isn't made, sized, packaged, advertised or sold for children?
43. Can customers order **without an account**? Is **Shop sign-in** on (G-16)?
44. Which **payment methods** will be on at launch (cards through Shopify Payments, Shop Pay, PayPal, Apple Pay, Google Pay, Sezzle)? Who processes payments? Is payment taken when the order is placed, or when it ships? Which card details can you see (for example the card type and last four digits)?
45. Will there be **discount codes or gift cards** at launch?
46. If a price was wrong and the correct price is **lower**, will you refund the difference?
47. How many days do you wait for a customer's answer about a **price or description mistake** before you cancel and refund?
48. Is there any **other reason** you'd cancel an order, for example a limit on how many of one piece a person can buy?
49. What does the **final checkout button** say once checkout is back on?
50. How soon should a customer **chase a missing order confirmation** (for example after 1 business day)?
51. Will jewelry also be sold through **other channels** (Instagram, Facebook, Whatnot; G-23)?

### Privacy and email

52. Does checkout ask for a **phone number**, and is it optional?
53. Which **email provider** hosts the store's inbox?
54. Which platform sends the **newsletter**: Shopify Email or Klaviyo? If Klaviyo, does it run sign-up forms or onsite tracking on the site, and what does its Shopify link send? Should new subscribers get a **confirmation email**, or should Shopify's **double opt-in** be on (legal point 50)?
55. Does checkout show Shopify's **"Email me with news and offers"** box? (It must not be ticked in advance for Canada.)
56. Will **abandoned-checkout reminders** go out, and only to subscribers (the agent recommends that; legal point 48)?
57. Which **analytics, advertising and affiliate tools** stay at launch (privacy draft table B: the GTM pixel, Judge.me, UpPromote, Ordersify, Printful, Meta, Whatnot, Shopify Inbox, the AI apps and others)? Triple Whale is dropped (D-27), but uninstalling it deletes its data, so the agent will tell you before it's removed.
58. Should Shopify's **cookie banner** be on for Canada (the agent recommends yes; legal point 56)? Should the **"Do not sell or share my personal information"** footer link stay?
59. Do you approve the proposed **retention periods** (legal point 58)?
60. Who has **staff access** to the store, and is two-step authentication on for every staff account?
61. If the privacy policy changes in a way that affects existing customers, should they be told by **email** or by a **notice on the site**? (Emailing customers needs you told first.)

### Approvals

62. Do you approve the two **product-page service lines** in [`service-lines.md`](service-lines.md)?
63. Once the brackets are filled and the legal points resolved, do you approve the **final text** of the four policies? Under D-55, it then counts as the approved text for launch.

## Research limits

Neither this session nor the drafting and review sessions could open the official legal sites. In this session `laws-lois.justice.gc.ca` didn't resolve. The earlier sessions also found `www.ontario.ca`, `canlii.org`, `www.priv.gc.ca`, `crtc.gc.ca`, `ised-isde.canada.ca`, `canada.ca`, `forms.mgcs.gov.on.ca`, `dealerprep.ca` and `shop.app` blocked. So every citation rests on web search results, law-firm and government summaries, and the agent's knowledge, and is marked *search only* where it matters. D-55 asks for each answer to be "checked against the official source". That check (legal point 1) needs those hosts allowed in the session's network settings first.

[cpa]: https://www.ontario.ca/laws/statute/02c30
[cpa23]: https://www.ontario.ca/laws/statute/23c23
[b142]: https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-142/status
[c36]: https://www.parl.ca/legisinfo/en/bill/45-1/C-36
[oreg]: https://www.ontario.ca/laws/regulation/050017
[bna]: https://www.ontario.ca/laws/statute/90b17
[sga]: https://www.ontario.ca/laws/statute/90s01
[tmpl]: https://ised-isde.canada.ca/site/consumer-measures-committee/en/formal-agreements/internet-sales-contract-harmonization-template
[ca7401]: https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html
[drip]: https://competition-bureau.canada.ca/en/deceptive-marketing-practices/drip-pricing
[sor82]: https://laws-lois.justice.gc.ca/eng/regulations/SOR-2018-82/FullText.html
[hcjewel]: https://www.canada.ca/en/health-canada/services/consumer-product-safety/reports-publications/industry-professionals/guide-children-jewellery/guidance-document.html
[ccpsa14]: https://laws-lois.justice.gc.ca/eng/acts/C-1.68/section-14.html
[hc14]: https://www.canada.ca/en/health-canada/services/consumer-product-safety/legislation-guidelines/acts-regulations/canada-consumer-product-safety-act/industry/guide-mandatory-reporting-section-14.html
[p401]: https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1
[opcqc]: https://www.opc.gouv.qc.ca/en/consumer/topic/delivery-delays/delay
[crtc548]: https://crtc.gc.ca/eng/archive/2012/2012-548.htm
[crtcfaq]: https://crtc.gc.ca/eng/com500/faq500.htm
[sor36]: https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html
[opcp]: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/
[opcpip]: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/
[opcc]: https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/
[opcacc]: https://priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda-compliance-help/pipeda-interpretation-bulletins/interpretations_05_access

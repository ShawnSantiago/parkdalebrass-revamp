# Policy requirements checklist (draft for legal review)

**Status:** working draft, 2026-11-27. It isn't legal advice. It's the ground the four policy drafts (shipping, returns and exchanges, privacy, terms of service) are built on, and the owner's lawyer checks it before sign-off (owner-inputs D-05, D-53).

**Scope:** Parkdale Brass, an online store at parkdalebrass.com, based in Toronto, Ontario. It sells brass jewelry to consumers anywhere in Canada (Canada only at launch, D-44) in CAD, on Shopify.

**How to read the table:**
- **Policy** says which text must carry the rule: `shipping`, `returns`, `privacy`, `terms`, `consent` (newsletter and email) or `checkout/theme` (checkout, order emails, product pages or store settings rather than a policy page).
- **Confidence:**
  - **high:** confirmed on an official or platform source in this session, or a store fact read today;
  - **medium:** consistent across secondary sources or the agent's own knowledge, but the official text wasn't opened;
  - **low:** an interpretation, or it's unclear whether the rule applies to this store.

**Research limits (read this first):** this session couldn't open `ontario.ca` (e-Laws) or `laws-lois.justice.gc.ca` (Justice Laws), because neither host is in the session's allowed network. So no Ontario or federal statute text was read directly. The section numbers below come from web search results (official CRTC, OPC, Competition Bureau, ISED, Health Canada and Shopify pages, plus law-firm summaries) and from the agent's own knowledge. The lawyer should check each cited section against e-Laws and Justice Laws. A later session can do that if those two hosts are allowed in its network settings.

**Read-only store checks made today** (Shopify connector, no mutations):
- `consentPolicy`: every Canadian province and territory, Quebec included, has `consentRequired: false`. So Shopify shows no cookie banner to Canadian visitors, and pixels aren't held back for consent there.
- `shopifyPaymentsAccount`: access denied (the connector lacks the payments scope), so the payment providers are unknown.
- `shop.paymentSettings.supportedDigitalWallets`: an empty list.
- `shop.plan`: "Paused" (checkout off, F-05).

---

## 1 · Facts we have

Only these may appear in the policies as fact. Everything else is a `[bracketed placeholder]`.

| Fact | Source |
| --- | --- |
| Business name Parkdale Brass, online store at parkdalebrass.com, based in Toronto, Ontario, Est. 2019 | B-05 (approved 2026-11-27), D-53 |
| The founder isn't named, and the past product line isn't mentioned in customer-facing text | B-05, D-44, D-53 |
| Launch products: The Brockton (signet ring) and The Bellwoods (pendant), each in Raw brass and Chrome (plated) | D-39, D-44 |
| The Brockton comes in whole US/CA sizes 5 to 13, with no half sizes. No resizing. | D-44 |
| The Bellwoods comes on a 20 in / 50.8 cm chain, with a ring at 18 in / 45.7 cm and a lobster clasp. The chrome version comes on a chrome-plated chain. | D-44 |
| No engraving at launch. No hypoallergenic or nickel-free claims (the chrome is normally plated over nickel; the supplier's nickel-release test is pending). | D-44, `04` §1 |
| Canada only at launch. Prices in CAD, round, with no compare-at price or launch discount. | D-44 |
| Prices exclude tax. Tax is added at checkout, and shipping is taxed. | D-44; store setting `taxesIncluded: false`, `taxShipping: true` ([`markets.json`](../backup/2026-11-27/config/markets.json)) |
| Orders ship in 1 to 2 business days and arrive in 2 to 7 business days across Canada | Owner 2026-11-27 (D-01, D-53) |
| Shipping is $15.00 CAD flat, or free on orders of $129.00 CAD or more. No duties within Canada. No international shipping at launch. | Owner 2026-11-27 (D-01, D-53); store rate "Free Shipping" is `TOTAL_PRICE >= 129.00 CAD` ([`shipping.json`](../backup/2026-11-27/config/shipping.json)) |
| Unworn pieces can be returned or exchanged within 30 days of delivery, in their original packaging | D-44, D-53 |
| Each ring order gets one free size exchange within those 30 days, with a prepaid return label | D-44, D-53 |
| Damaged or faulty pieces are replaced or refunded, with a prepaid label | D-44, D-53 |
| On a refund of an unworn piece (not an exchange), the customer pays return shipping | Owner 2026-11-27 (D-02, D-53) |
| Newsletter consent wording is approved, shown under the email field with no pre-ticked box (D-03 text, verbatim in owner-inputs D-03) | D-03, D-53 |
| Legacy email subscribers aren't emailed about jewelry; they can join the new list through the site | D-04, D-53 |
| Orders placed before the jewelry launch keep the return and warranty terms they were sold under. Support for those orders is by email through the contact page. | D-06, D-53 |
| The agent drafts the policies; the owner's lawyer signs them off before launch | D-05, D-53 |
| Shopify is the platform. The store uses new customer accounts. | D-01, E-13 |
| Klaviyo is carried over from Craft (onsite forms and email) | D-24, [`craft-audit.md`](../craft-audit.md) |
| Triple Whale and EZ Preorder are dropped | D-26, D-27 |
| The store has no "Contact information" policy page; the four existing policies date from 2019 | [`policies/index.json`](../backup/2026-11-27/config/policies/index.json) |

## 2 · Facts we lack

Each becomes a visible placeholder in the drafts until the owner or the lawyer supplies it.

| Placeholder | Needed for | Who |
| --- | --- | --- |
| `[legal name of the business]` and its structure (corporation, or a sole proprietorship or partnership with a registered business name) | Ontario CPA disclosure (ON-03), Business Names Act (ON-22), terms | Owner, then lawyer: if it's a sole proprietorship, the legal name is a person's name, which conflicts with B-05 |
| `[business phone number]` | ON-03 (O. Reg. 17/05 requires a phone number) | Owner |
| `[business address]` (premises) and `[mailing address]` (a P.O. box is fine for CASL) | ON-03, CASL-02, CASL-04, privacy contact | Owner. Lawyer: is a P.O. box enough for the CPA's "address of the premises"? |
| `[contact email]` and `[privacy contact title and email]` | ON-03, CASL, PRIV-02 | Owner |
| `[return address]` | Returns, exchanges | Owner (the 2019 address is personal and redacted) |
| `[carrier]`, `[tracking: yes/no]`, `[signature]`, `[P.O. boxes: yes/no]`, `[remote areas]` | ON-07, shipping | Owner |
| `[lost or stolen parcel rule]` | Shipping | Owner and lawyer |
| `[refund method]` and `[refund timing]` | Returns, ON-13 | Owner (not decided) |
| `[how to report damage: time limit, photos]` and `[what counts as faulty]` (e.g. chrome wear) | Returns, COMP-03 | Owner and lawyer |
| `[cost of a second size exchange]`, `[what "per ring order" means with two rings]` | Returns | Owner |
| `[payment methods]` (Shopify Payments, Shop Pay, PayPal, Sezzle?) | Terms, privacy | Owner (store is paused; not readable today) |
| `[email platform]` (Klaviyo or Shopify Email) | Privacy, consent | Owner |
| `[analytics and marketing tools]` (what the GTM container holds; Clarity; Judge.me; UpPromote; Ordersify; Meta) | Privacy, consent | Owner (G-03, G-07, G-17) |
| `[cookie banner: on for Canada / Quebec?]` | Consent, privacy | Owner and lawyer |
| `[retention periods]` per record type | Privacy | Owner and lawyer (tax records at least 6 years) |
| `[launch date]` | Legacy-order wording (D-06) | Owner |
| `[minimum age]` | Terms | Owner and lawyer |
| `[Quebec: sell at launch, with French text?]` | Terms, all policies | Owner and lawyer |
| `[gift cards: yes/no]` | Terms (ON-20) | Owner |

---

## 3 · Requirements

### Ontario Consumer Protection Act, 2002 (CPA) and O. Reg. 17/05

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| ON-01 | CPA 2002 s. 2(1) | The Act applies when the consumer *or* the supplier is in Ontario at the time of the transaction, so it covers every Parkdale Brass order, wherever the buyer lives in Canada. | terms | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-02 | CPA 2002 s. 37; O. Reg. 17/05 s. 31 | The internet-agreement rules (ss. 38 to 40) apply when the consumer's total potential payment is over $50. Every order with a Brockton (CAD 150) qualifies, so treat every order as covered. | checkout/theme, terms | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017); [Ontario business guide](https://forms.mgcs.gov.on.ca/dataset/84a1187d-62f2-48a8-8310-d405c1941b9e/resource/8768fdd0-da01-49e4-aff4-9805002ad7bc/download/on00783e.pdf) | high |
| ON-03 | CPA s. 38(1); O. Reg. 17/05 s. 32, items 1–2 | Before the order, disclose the supplier's name and, if different, the name it does business under; its telephone number; the address of the premises it does business from; and other contact routes such as email. | terms, checkout/theme | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017); [Mann Lawyers summary](https://www.mannlawyers.com/resources/internet-agreements-with-ontario-consumers-consumer-protection-act-considerations-for-businesses/) | medium |
| ON-04 | CPA s. 38(1); O. Reg. 17/05 s. 32, item 3 | Give a fair and accurate description of the goods: material, finish, size range and chain length, from owner-verified data only (C-02 to C-06). | checkout/theme | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-05 | CPA s. 38(1); O. Reg. 17/05 s. 32, items 4–6 | Give an itemized list of prices, including taxes and shipping; any additional charges (duties or brokerage: none within Canada, so say so); and the total. Show amounts in CAD (G-24, E-14). | shipping, checkout/theme | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-06 | CPA s. 38(1); O. Reg. 17/05 s. 32, item 7 | Disclose the terms, conditions and method of payment, and when payment is taken. | terms | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-07 | CPA s. 38(1); O. Reg. 17/05 s. 32, items 8–9 | Give the delivery date, or the estimated window (ships in 1 to 2 business days, arrives in 2 to 7). Give the delivery arrangements: who ships it (the carrier), the mode of transport, and where it goes. The item wording wasn't confirmed against the regulation in this session. | shipping | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-08 | CPA s. 38(1); O. Reg. 17/05 s. 32, item 10 | Disclose the cancellation, return, exchange and refund policies before purchase. | returns | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-09 | CPA s. 38(1); O. Reg. 17/05 s. 32, last item | Disclose every other restriction, limitation or condition: Canada only; unworn and in original packaging; one free size exchange per ring order; no resizing; no engraving; the customer pays return shipping on refunds. | terms, returns, shipping | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | medium |
| ON-10 | CPA s. 38(2)–(3); O. Reg. 17/05 s. 32 | The disclosure must be clear, comprehensible and prominent, and in a form the buyer can keep and print. The buyer must get an express chance to accept or decline the order and to correct errors immediately before ordering. The lawyer should confirm that Shopify's checkout review step and policy links meet this, and whether the product-page service lines (D-38) should state the return and shipping terms. | checkout/theme | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30); [Mann Lawyers](https://www.mannlawyers.com/resources/internet-agreements-with-ontario-consumers-consumer-protection-act-considerations-for-businesses/) | medium |
| ON-11 | CPA s. 39; O. Reg. 17/05 s. 33 | Send a written copy of the agreement within 15 days of the order. It must contain the buyer's name, the date of the agreement and the s. 32 information. In practice, Shopify's order confirmation email is that copy. Shopify's default template doesn't print the supplier's phone or address or the return terms (agent's knowledge; check in Admin → Notifications), so it needs editing. | checkout/theme | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30); [Mann Lawyers](https://www.mannlawyers.com/resources/internet-agreements-with-ontario-consumers-consumer-protection-act-considerations-for-businesses/) | medium |
| ON-12 | CPA s. 40(1)–(2) | If the disclosure (s. 38) or the express chance to accept or correct is missing, the buyer may cancel until 7 days after receiving the copy. If no compliant copy is sent (s. 39), the buyer may cancel within 30 days of the order. The policies mustn't contradict these rights. | returns, terms | [CLEO](https://www.cleo.on.ca/en/publications/otmshop/how-do-i-cancel-agreement); [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-13 | CPA ss. 92, 96–97; O. Reg. 17/05 (refund period) | After a statutory cancellation: notice may be given in any way the buyer can prove; the supplier refunds within the prescribed period (15 days, per the harmonized rule); the buyer returns the goods. The voluntary refund timing (placeholder) shouldn't be slower than this where a statutory cancellation applies. Section numbers weren't confirmed in this session. | returns | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30); [Harmonization Template](https://ised-isde.canada.ca/site/consumer-measures-committee/en/formal-agreements/internet-sales-contract-harmonization-template) | low |
| ON-14 | CPA s. 99 | If the supplier doesn't refund after a statutory cancellation, the buyer can ask their credit card issuer to reverse the charge. No policy text is needed, but nothing may suggest otherwise. | returns, terms | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | low |
| ON-15 | CPA Part IV, future performance agreements (late delivery; s. 23 by the agent's reading, s. 26 in one secondary source) | If goods aren't delivered within 30 days after the promised date, the buyer may cancel before delivery and get a refund. Accepting a late delivery ends that right. The shipping policy should say what happens when an order is late. The lawyer should confirm how this applies to online orders. | shipping | [Ontario business guide](https://forms.mgcs.gov.on.ca/dataset/84a1187d-62f2-48a8-8310-d405c1941b9e/resource/8768fdd0-da01-49e4-aff4-9805002ad7bc/download/on00783e.pdf); [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-16 | CPA ss. 7–8 | Consumers' rights under the Act can't be waived. A pre-dispute arbitration clause, or a ban on class actions, doesn't bind a consumer. So there's no mandatory arbitration or class-action waiver in the terms. | terms | [McGill Law Journal on ss. 7–8](https://lawjournal.mcgill.ca/?p=12045); [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-17 | CPA s. 9; Sale of Goods Act (Ontario) s. 15 | The implied conditions (merchantable quality, fit for purpose) apply to consumer sales, and a term that negates them is void. Drop the 2019 terms' "as is … without warranties … merchantable quality, fitness for a particular purpose, durability" disclaimer for goods. The faulty-goods promise in the returns policy adds to these rights; it doesn't replace them. | terms, returns | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30); [Sale of Goods Act](https://www.ontario.ca/laws/statute/90s01) | medium |
| ON-18 | CPA ss. 14–15, 17 | No false, misleading, deceptive or unconscionable representation, including about the buyer's rights and remedies (for example "all sales final", or "we may cancel any order at any time"). Order acceptance and seller cancellation (pricing errors, stock) need fair wording and a prompt refund. | terms, returns, shipping | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-19 | CPA s. 11 | Any ambiguity in a consumer agreement is read in the consumer's favour. Use plain language, with one meaning per term (for example, "delivery" and "business day"). | terms | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| ON-20 | O. Reg. 17/05 gift card rules (ss. 25.1 to 25.5, as the agent recalls them) | Only if gift cards are sold: no expiry date and no fees, with limited exceptions. The 2019 refund policy lists gift cards as non-returnable. Confirm whether there will be gift cards at launch. | terms | [O. Reg. 17/05](https://www.ontario.ca/laws/regulation/050017) | low |
| ON-21 | Consumer Protection Act, 2023 (S.O. 2023, c. 23, Sch. 1) | It had Royal Assent on 2023-12-06 but wasn't in force when searched. The only 2026 change found to the 2002 regulation is O. Reg. 173/26, a Ticket Sales Act amendment. When proclaimed, the 2023 Act replaces internet and remote agreements with one set of consumer-contract rules, so the drafts would need re-checking. The lawyer confirms the status at sign-off. | terms | [Bill 142 status](https://www.ola.org/en/legislative-business/bills/parliament-43/session-1/bill-142/status); [e-Laws CPA 2023](https://www.ontario.ca/laws/statute/23c23); [O. Reg. 173/26](https://www.ontario.ca/laws/regulation/R26173) | medium |
| ON-22 | Business Names Act (Ontario) s. 2(6) | If the business is a corporation trading under a registered name, both names go on contracts and invoices, which includes the order confirmation. | terms, checkout/theme | [Business Names Act](https://www.ontario.ca/laws/statute/90b17) | low |

### Other provinces (flag only)

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| PROV-01 | Internet Sales Contract Harmonization Template (2001), as enacted: BC Business Practices and Consumer Protection Act (distance sales contracts), Alberta Internet Sales Contract Regulation (Alta. Reg. 81/2001), Manitoba, Saskatchewan, Nova Scotia, Newfoundland and Labrador and others | Most provinces use the same pattern: disclosure before the order, a copy within 15 days, cancellation if disclosure fails, cancellation if goods aren't delivered within 30 days of the promised date (or of the order, if no date was given), a refund within 15 days of cancellation, and credit card reversal. Draft once, to the common rule, for buyers anywhere in Canada. | shipping, returns, checkout/theme | [Harmonization Template](https://ised-isde.canada.ca/site/consumer-measures-committee/en/formal-agreements/internet-sales-contract-harmonization-template); [Alberta "Internet shopping"](https://open.alberta.ca/publications/internet-shopping) | medium |
| PROV-02 | Each province's consumer statute | The buyer's home-province law can apply as well as Ontario's. A governing-law clause (the 2019 text says "the laws of Canada") can't take that protection away. Name Ontario law, "without limiting any consumer protection law where you live". | terms | [Harmonization Template](https://ised-isde.canada.ca/site/consumer-measures-committee/en/formal-agreements/internet-sales-contract-harmonization-template) | medium |

### Quebec (flag only; the owner decides whether Quebec is served at launch)

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| QC-01 | Quebec Consumer Protection Act (CQLR c. P-40.1) ss. 54.1–54.16 (distance contracts) | The rules are similar to Ontario's: s. 54.4 disclosure (names, address, phone, email, description, itemized price, total, currency, delivery, return and refund policies, restrictions); a copy within 15 days (s. 54.7); cancellation within 7 days of the copy if information is missing (s. 54.8); cancellation for late delivery (s. 54.9); the merchant refunds within 15 days of cancellation (s. 54.13). | shipping, returns, checkout/theme | [LégisQuébec P-40.1](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1); [OPC Québec: cancelling an online purchase](https://www.opc.gouv.qc.ca/en/consumer/topic/purchase/online-purchase/cancelling) | medium |
| QC-02 | Quebec CPA s. 11.1 (arbitration and class-action waivers prohibited); ss. 37–38 (legal warranty: fit for use, durable for a reasonable time) | No arbitration clause. Nothing may suggest the warranty ends at 30 days. | terms, returns | [LégisQuébec P-40.1](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-40.1) | medium |
| QC-03 | Charter of the French Language (CQLR c. C-11) s. 55 (contracts of adhesion; "French first" since 2023-06-01), s. 52 (commercial publications, which the OQLF reads to include websites), s. 51 (product inscriptions) | Serving Quebec means a French version of the terms and policies, given first. The storefront and product inscriptions likely need French too. Whether this applies to an out-of-province online seller is debated. Options: translate before launch, or exclude Quebec from shipping at launch. | terms | [Gowling WLG on Bill 96](https://gowlingwlg.com/en/insights-resources/articles/2023/bill-96-s-french-first-rule-takes-effect); [LégisQuébec C-11](https://www.legisquebec.gouv.qc.ca/en/document/cs/C-11) | medium |
| QC-04 | Act respecting the protection of personal information in the private sector (CQLR c. P-39.1, as amended by Law 25): ss. 3.1, 3.2, 4.1, 8, 8.1, 17, 27 | Publish a privacy policy in clear, simple terms, with the title and contact details of the person in charge of personal information. Tell people the purposes, means and rights at collection. Identification, location or profiling technology must be off by default (s. 8.1), and the CAI reads that as opt-in. Do a privacy impact assessment before sending data outside Quebec (to Shopify, Klaviyo and so on). Under-14s need parental consent. Give access, correction and portability. Whether it reaches an Ontario seller is debated, so the lawyer decides. | privacy, consent | [LégisQuébec P-39.1](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1); [McCarthy Tétrault on cookies](https://www.mccarthy.ca/en/insights/blogs/techlex/quebecs-law-25-and-cookies-not-so-cookie-cutter) | low |
| QC-05 | Store fact, read today | Shopify's consent policy for `CA-QC`, and every other province, is `consentRequired: false`. So there's no banner, and the GTM, UpPromote, Judge.me and Shopify pixels run before any choice. That likely doesn't meet QC-04 s. 8.1 if Quebec is served. | consent, checkout/theme | Admin `consentPolicy` query, 2026-11-27 | high |

### Privacy: PIPEDA and OPC guidance

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| PRIV-01 | PIPEDA s. 4(1)(a) | PIPEDA governs the store's collection, use and disclosure of personal information in commercial activity. Ontario has no general private-sector privacy law. BC and Alberta PIPA apply to organizations in those provinces, so likely not to this store; the lawyer confirms. | privacy | [OPC: PIPEDA overview](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/) | medium |
| PRIV-02 | PIPEDA Sch. 1, principles 4.1, 4.1.1, 4.8.2(a) | Name someone accountable for privacy. A title is enough (for example "Privacy contact"), with an address and email, so the founder needn't be named. | privacy | [OPC: fair information principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | medium |
| PRIV-03 | PIPEDA Sch. 1, 4.2–4.3; s. 6.1; OPC *Guidelines for obtaining meaningful consent* (2018) | In plain language, state up front what is collected, who receives it, why, and any meaningful risk of harm. Use express consent where data is sensitive, outside reasonable expectations, or risky. A new purpose needs new consent. | privacy | [OPC meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/) | high |
| PRIV-04 | PIPEDA Sch. 1, 4.4 and 4.5 (4.5.2, 4.5.3) | Collect only what's needed. Set a minimum and maximum retention period per record type, then destroy or anonymize. The 2019 text ("until you ask us to delete") has no retention rule. Tax records are a floor (CRA: generally 6 years). | privacy | [OPC principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/); [CRA: keeping records](https://www.canada.ca/en/revenue-agency/services/tax/businesses/topics/keeping-records.html) | medium |
| PRIV-05 | PIPEDA Sch. 1, 4.7; s. 10.1; Breach of Security Safeguards Regulations (SOR/2018-64) | Have safeguards suited to the data. Report breaches with a real risk of significant harm to the OPC and to the people affected. Keep a record of every breach for 24 months. The policy says this in a sentence; the process is internal. | privacy | [OPC: privacy breaches](https://www.priv.gc.ca/en/privacy-topics/business-privacy/breaches-and-safeguards/privacy-breaches-at-your-business/gd_pb_201810/) | medium |
| PRIV-06 | PIPEDA Sch. 1, 4.8 | Openness: make it easy to find how to reach the privacy contact, how to get access, what information is held and what it's used for, and what is shared with whom. | privacy | [OPC principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | medium |
| PRIV-07 | PIPEDA Sch. 1, 4.9; s. 8(3), s. 8(6) | Give access and correction on request, within 30 days (extendable), at minimal or no cost. The 2019 text gives these rights only to "European residents". | privacy | [OPC principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | medium |
| PRIV-08 | PIPEDA Sch. 1, 4.10; s. 11 | Give a way to raise privacy concerns, and say that the person may complain to the Office of the Privacy Commissioner of Canada. | privacy | [OPC principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | medium |
| PRIV-09 | PIPEDA Sch. 1, 4.1.3; OPC *Guidelines for processing personal data across borders* (2009, reaffirmed 2019) | The store stays responsible for data its service providers handle, and protects it by contract. Tell customers, in clear language and ideally at collection, that data may be processed outside Canada (for example the US) and may be accessible to that country's courts, law enforcement and national security authorities. | privacy | [OPC 2019 announcement](https://www.priv.gc.ca/en/opc-news/news-and-announcements/2019/an_190923/); [OPC Findings 2020-001](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2020/pipeda-2020-001/) | high |
| PRIV-10 | OPC *Policy position on online behavioural advertising* (2012, updated 2015) | Opt-out consent to ad tracking is acceptable only if all of these hold: purposes are explained clearly at or before collection (not buried in a policy); the third parties are named; opting out is easy, immediate and lasting; the data isn't sensitive and is deleted or de-identified soon; children aren't tracked; and no technology the person can't control is used. Otherwise it needs opt-in. | privacy, consent | [OPC OBA position](https://www.priv.gc.ca/en/privacy-topics/technology/online-privacy-tracking-cookies/tracking-and-ads/bg_ba_1206/) | high |
| PRIV-11 | PIPEDA 4.2, 4.8; PRIV-10 | List cookies, analytics and marketing pixels by name and purpose, with how to opt out (the Shopify banner's preferences, if it's turned on, and each vendor's opt-out). Undecided vendors stay `[placeholders]` (section 4). | privacy, consent | [OPC OBA position](https://www.priv.gc.ca/en/privacy-topics/technology/online-privacy-tracking-cookies/tracking-and-ads/bg_ba_1206/) | medium |
| PRIV-12 | OPC meaningful-consent guidance (under-13s); Quebec P-39.1 s. 4.1 (under-14s) | The products and site aren't directed at children, and children aren't marketed to (this also keeps the products outside the CCPSA limits for children's jewelry, SOR/2018-82, COMP-08). Set a minimum age in the terms. | privacy, terms | [OPC meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/) | medium |
| PRIV-13 | PIPEDA 4.2.4, 4.3.1 | Legacy customer and subscriber records were collected for the old product line. Marketing jewelry to them would be a new purpose, which needs consent; D-04 already says no. The policy still has to cover keeping and using legacy records (orders, support). | privacy | [OPC principles](https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/p_principle/) | medium |
| PRIV-14 | Bill C-36, *Protecting Privacy and Consumer Data Act* (tabled 2026-06-15) | It would replace PIPEDA Part 1 and add a cross-border risk assessment and a new regulator. It wasn't law when searched. Check its status at sign-off. | privacy | [DLA Piper, June 2026](https://www.dlapiper.com/en/insights/publications/2026/06/canada-tables-bill-c36-the-protecting-privacy-and-consumer-data-act) | medium |
| PRIV-15 | US state privacy laws (for example CCPA); store setting | The new footer carries "Do not sell or share my personal information" (G-14), and the GTM pixel declares a sale-of-data purpose. With Canada only at launch, either explain what the link does in the policy, or drop it along with the US market. | privacy | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json); owner-inputs G-14 | low |

### CASL (newsletter consent and commercial email)

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| CASL-01 | CASL s. 6(1)(a) | No commercial electronic message (CEM) without express or implied consent. | consent | [fightspam (ISED)](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en) | high |
| CASL-02 | CASL s. 10(1); CRTC Electronic Commerce Protection Regulations (SOR/2012-36) ss. 2, 4 | A request for express consent states, clearly and simply: the purpose; the name of the person seeking consent (and the business name if different); a mailing address and one of phone, email or web address; and that consent can be withdrawn. The D-03 wording has the purpose, the name and the withdrawal line. It still needs `[mailing address]` and `[email address]`. | consent | [SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html); [CRTC 2012-548](https://crtc.gc.ca/eng/archive/2012/2012-548.htm) | high |
| CASL-03 | CRTC Bulletins 2012-548 and 2012-549 | Consent is opt-in: no pre-checked box and no auto-filled email. It's asked for separately, not bundled into the terms of sale, and a confirmation is recommended. Shopify's checkout "Email me with news and offers" box must not be preselected for Canada, and its label should carry or link the s. 10 information. | consent, checkout/theme | [CRTC 2012-548](https://crtc.gc.ca/eng/archive/2012/2012-548.htm); [CRTC 2012-549](https://crtc.gc.ca/eng/archive/2012/2012-549.htm) | high |
| CASL-04 | CASL s. 6(2); SOR/2012-36 ss. 2–3 | Every CEM identifies the sender (name, plus business name if different), gives a mailing address and one contact method, and includes an unsubscribe mechanism, all clear and prominent. This goes in the footer of the Klaviyo or Shopify Email templates. | consent | [SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html) | high |
| CASL-05 | CASL s. 11 | Unsubscribing is free and done by the same electronic means. The link or address stays valid for at least 60 days after sending. Requests take effect without delay, and within 10 business days at most. | consent, privacy | [CASL](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/); [CRTC FAQ](https://crtc.gc.ca/eng/com500/faq500.htm) | high |
| CASL-06 | CASL s. 10(9)–(10), s. 10(14) | Implied consent from an existing business relationship lasts 2 years after a purchase, or 6 months after an inquiry. Express consent lasts until withdrawn. D-04 already rules out emailing the legacy list about jewelry. | consent | [fightspam (ISED)](https://ised-isde.canada.ca/site/canada-anti-spam-legislation/en) | high |
| CASL-07 | CASL s. 6(6) | Messages that only confirm a transaction, give warranty, recall or safety information, or give factual updates on an ongoing purchase are exempt from the *consent* requirement. The CRTC says other exempt categories still need identification and an unsubscribe. The lawyer confirms whether Shopify's order, shipping and exchange emails need the s. 6(2) content. | consent, checkout/theme | [CRTC FAQ](https://crtc.gc.ca/eng/com500/faq500.htm) | medium |
| CASL-08 | CASL s. 13 | The sender must prove consent. Keep a record of when, where and with what wording each subscriber consented (form version, timestamp, Klaviyo or Shopify consent fields). | consent, privacy | [CASL](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/) | high |
| CASL-09 | CASL ss. 6, 10; Shopify checkout setting | Abandoned-checkout emails are CEMs. Send them only to subscribers, or get the lawyer's view on implied consent from an inquiry. Shopify says that a store sending abandoned-cart reminders should adjust the wording next to the checkout consent box. | consent, checkout/theme | [Shopify: customer contact information](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/customer-contact-information) | medium |

### Competition Act and product rules (only where they touch claims)

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| COMP-01 | Competition Act s. 52 (criminal) and s. 74.01(1)(a) (civil); general-impression test | No representation that is false or misleading in a material respect, about shipping times, "free" shipping, returns or the products. Applies to every policy. | shipping, returns, terms, privacy | [s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html); [s. 52](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-52.html) | high |
| COMP-02 | Competition Act s. 74.01(1)(b) | A performance, efficacy or length-of-life claim needs an adequate and proper test first. That rules out claims about wear, tarnish, skin reaction, water or lifetime (`04` §1 banned claims) in the policies too, for example "lasts a lifetime" or "won't tarnish". | terms, returns, checkout/theme | [s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) | high |
| COMP-03 | Competition Act s. 74.01(1)(c) | A warranty, guarantee or promise to replace or repair mustn't be materially misleading, and it must have a reasonable prospect of being carried out. "Damaged or faulty pieces are replaced or refunded" needs a defined process, a time limit and the meaning of "faulty". | returns | [s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) | medium |
| COMP-04 | Competition Act s. 52(1.3) and s. 74.01(1.1) (drip pricing, 2022) | A price that can't be paid because of fixed, obligatory extra charges is misleading (government taxes excepted). ISED treats address-based shipping as variable. Show the $15.00 flat rate and the free-from-$129.00 threshold before checkout (cart, shipping page, product service line), so the overall impression is right. | shipping, checkout/theme | [Bureau guide to the 2022 amendments](https://competition-bureau.canada.ca/en/guide-2022-amendments-competition-act); [ISED: junk fees](https://ised-isde.canada.ca/site/office-consumer-affairs/en/business-practices-and-consumer-concerns/junk-fees) | medium |
| COMP-05 | Competition Act s. 74.01(1)(b.1)–(b.2) (environmental claims, 2024) | An environmental benefit claim needs an adequate and proper test, or an internationally recognized method. "Sustainable" is already banned (`04` §1); no such claims in the policies or packaging copy. | checkout/theme | [s. 74.01](https://laws-lois.justice.gc.ca/eng/acts/C-34/section-74.01.html) | medium |
| COMP-06 | Precious Metals Marking Act (R.S.C. 1985, c. P-19) and Regulations (C.R.C., c. 1303); Competition Act s. 74.01 | Brass and chrome-plated brass aren't precious-metal articles, so no quality mark applies. But no mark or wording may suggest precious metal. Don't use "gold", "gold-tone", "gold-plated", "G.E.P." or a karat in product names, descriptions, alt text or policies. The site's "gold" is a UI colour only and never describes a product. The lawyer confirms whether "gold-coloured" wording is safe at all. | checkout/theme | [Bureau guide to the PMMA](https://competition-bureau.canada.ca/en/labelling/guide-precious-metals-marking-act-and-regulations) | medium |
| COMP-07 | Consumer Packaging and Labelling Act (R.S.C. 1985, c. C-38) and Regulations; Textile Labelling Act | If the jewelry is sold as a prepackaged product, its label may need a bilingual product identity and the dealer's name and principal place of business. The lawyer confirms whether that applies, and any net-quantity exemption. The Textile Labelling Act doesn't apply to metal jewelry. This is packaging, not policy text. | checkout/theme | [CPLA](https://laws-lois.justice.gc.ca/eng/acts/C-38/); [Textile Labelling Act](https://laws-lois.justice.gc.ca/eng/acts/T-10/) | low |
| COMP-08 | Canada Consumer Product Safety Act ss. 7, 13, 14; SOR/2018-82 (lead and cadmium limits for children's jewelry) | Sell nothing that is a danger to health. Keep supplier traceability records for 6 years (a retailer needn't keep consumer records; an importer records who it sold to, so the lawyer should confirm which applies). Report serious incidents within 2 days. Keep the products adult. Terms and returns give a contact path for safety issues and make no safety claims. | terms, privacy | [Health Canada s. 13 guidance](https://www.canada.ca/en/health-canada/services/consumer-product-safety/legislation-guidelines/guidelines-policies/guidance-preparing-maintaining-documents-under-canada-consumer-product-safety-act-section-13.html); [CCPSA s. 14](https://laws-lois.justice.gc.ca/eng/acts/C-1.68/section-14.html) | medium |

### Shopify platform facts

| ID | Law and section | Requirement | Policy | Source | Confidence |
| --- | --- | --- | --- | --- | --- |
| SHOP-01 | Shopify Data Processing Addendum; Shopify Consumer Privacy Policy | For store customer data, Shopify is the processor (service provider) and Parkdale Brass is the controller. For Shop and Shop Pay, Shopify is the controller. So the privacy policy names Shopify as a service provider and links Shopify's own policy for Shop and Shop Pay. | privacy | [Shopify DPA](https://www.shopify.com/legal/dpa); [Shopify Consumer Privacy Policy](https://www.shopify.com/legal/privacy/consumers) | high |
| SHOP-02 | Shopify Admin: Settings → Policies and Customer privacy | Shopify's "automated" privacy policy replaces custom text and updates itself. Shopify says its templates aren't legal advice and don't make a policy complete. Recommendation: keep the lawyer-approved text manual, and don't turn automation on over it. | privacy | [Shopify: privacy settings](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings/privacy-settings); [Shopify: store policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos) | high |
| SHOP-03 | Shopify Customer privacy (consent policy per region) | Today: `consentRequired: false` for every Canadian region, so no banner shows. Turn the cookie banner on for Canada, or at least Quebec, if opt-in is chosen (PRIV-10, QC-04), and check that each kept pixel declares the right privacy purpose. The UpPromote pixel declares none. | consent, checkout/theme | Admin `consentPolicy` query 2026-11-27; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) | high |
| SHOP-04 | Shopify checkout and customer-account settings | The email consent box can be preselected "based on Shopify's recommendations" or for chosen regions. Make sure Canada isn't preselected (CASL-03), and edit the label in the checkout language settings. The current setting wasn't readable today. | consent, checkout/theme | [Shopify: customer contact information](https://help.shopify.com/en/manual/promoting-marketing/create-marketing/customer-contact-information) | high |
| SHOP-05 | Shopify store policies | Shopify links the refund, privacy, terms and shipping policies in the checkout footer, and supports a "Contact information" policy that this store doesn't have. That page could carry the CPA identity and contact disclosures (ON-03) in one place. | terms, checkout/theme | [Shopify: store policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos); [`policies/index.json`](../backup/2026-11-27/config/policies/index.json) | medium |
| SHOP-06 | Shopify notifications (order confirmation) | This email is the CPA "copy of the agreement" (ON-11). Edit it to add the business name, phone, address, a link to the policies and the delivery estimate. Editing a template isn't emailing customers. | checkout/theme | [e-Laws CPA 2002](https://www.ontario.ca/laws/statute/02c30) | medium |
| SHOP-07 | Store facts, read today | The Shopify Payments account isn't readable (access denied), no digital wallets are listed, and the plan is "Paused" (F-05). So the payment processors stay `[placeholders]` in the terms and the privacy policy. | terms, privacy | Admin queries 2026-11-27 | high |

---

## 4 · Services that receive customer data at launch

Status: **keep** (decided), **drop** (decided, but it must actually be switched off or uninstalled before launch), **undecided** (it becomes a `[placeholder]` in the privacy policy). "Every theme" means it loads regardless of which theme is published, so publishing the new theme doesn't remove it.

| Service | What it receives | Status | Repo source |
| --- | --- | --- | --- |
| Shopify (Online Store, checkout, new customer accounts, order records, notifications, fraud screening) | Name, email, phone, addresses, order and payment details, device and browsing data | keep | D-01, E-13; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) (Online Store channel) |
| Shopify Search & Discovery, Flow | Search queries; order data inside any Flow workflow | keep (Search & Discovery, E-06); Flow undecided (no workflows reviewed) | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Shop Pay and the Shop app (Shopify as controller) | Buyer's Shop account and payment data | undecided | G-16; payments not readable 2026-11-27 |
| Payment processor(s): Shopify Payments, PayPal, others | Card and payment data | undecided | F-05 (plan paused); Admin query 2026-11-27 (access denied) |
| Sezzle (buy now, pay later) | Applicant and order data | undecided | G-04; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Klaviyo (email, onsite forms) | Email, consent record, browsing and order events | keep (carry-over, D-24); list and consent setup still open (D-03, `phase-3-brief.md` §3.6) | [`craft-audit.md`](../craft-audit.md); [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Shopify Messaging (Shopify Email) | Email and marketing consent | undecided (which tool sends the newsletter) | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json); [`craft-audit.md`](../craft-audit.md) ("pick one source of record") |
| Judge.me Reviews | App pixel (analytics) on every theme; reviewer name and email if reviews are on | undecided | G-07; D-13; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Google Tag Manager custom pixel "GTM" (`GTM-KX2JQ95R`; analytics, marketing, sale-of-data purposes) | Browsing and checkout events, plus whatever tags the container holds (unknown) | undecided | G-17; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Google Analytics | Browsing data | undecided (named in the 2019 policy; possibly inside GTM) | [`PRIVACY_POLICY.html`](../backup/2026-11-27/config/policies/PRIVACY_POLICY.html); G-17 |
| Microsoft Clarity | Session replay and heatmaps | undecided (recommend drop). It's hard-coded in Craft only, so it stops at launch unless re-added. | G-03; [`craft-audit.md`](../craft-audit.md) |
| UpPromote Affiliate | Script tag and app pixel on every theme (no privacy purpose declared); referral and order data | undecided | G-17; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Ordersify | Script tag on every theme; alert sign-ups if used | undecided (recommend remove if it does pre-orders or back-in-stock) | G-17, D-26, G-15 |
| `greenaffiliates.com` script | Unknown | undecided (unidentified; seen on live 2026-11-26 only) | G-17 |
| Triple Whale | App pixel (analytics, marketing) on every theme, preview included | **drop** (D-27), but it's still installed and running. Uninstall before launch; tell the owner first, because uninstalling deletes its data. | D-27, G-02, G-17 |
| EZ Preorder | Nothing in the new theme (embed off) | drop (D-26) | D-26, G-01 |
| Facebook & Instagram (Meta) channel | Product catalogue, plus pixel or Conversions API data if data sharing is on (setting not exported) | undecided | G-23; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Whatnot channel | Order and buyer data for sales made there | undecided | G-23 |
| Shopify Inbox (chat channel; embed off) | Chat messages | undecided (Craft audit: don't carry the embed) | G-23; [`craft-audit.md`](../craft-audit.md) |
| Concierge Shopping Guide (AI chat and sales channel) | Visitor chat text | undecided (recommend off) | G-06, G-23 |
| Shopify Agentic channel | Order data for agent-placed orders | undecided (installed, nothing published) | G-23 |
| Printful (fulfilment service, product customizer script on every theme) | Order and shipping data for Printful products | undecided (legacy merch decision C-11) | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json); [`shipping.json`](../backup/2026-11-27/config/shipping.json) |
| ShipStation | Names, addresses, order contents, if used for shipping | undecided | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Shipping carrier(s) | Name, address, phone | undecided (`[carrier]`; the 2019 text names Canada Post or FedEx, unverified) | [`SHIPPING_POLICY.html`](../backup/2026-11-27/config/policies/SHIPPING_POLICY.html); D-01 |
| Yoast SEO | No customer data expected (meta tags) | undecided | G-05 |
| Shopify ChatGPT MCP App and Shopify Claude Connector App (staff-side AI tools with Admin API access) | Can read store data, including customers, when staff use them | undecided (whether to list them as service providers) | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Bloggle | Unknown | undecided (not shown as installed) | [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Instant; Stamped; Theme Access | None (Instant uninstalled by the owner, G-13; Stamped not installed; Theme Access touches themes only) | n/a | G-13; [`apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |

## 5 · Store settings that must match the policies by launch

These are store changes for Phase 5, not policy text. The policies are only true once they're done.

- Markets and shipping still cover the US, International (177 countries), and Australia and New Zealand ([`markets.json`](../backup/2026-11-27/config/markets.json), [`shipping.json`](../backup/2026-11-27/config/shipping.json)). Narrow both to Canada (D-01, D-44). The four Printful profiles price in USD.
- The money format has no "CAD" (G-24, E-14). ON-05 and QC-01 favour showing the currency.
- No consent banner for any Canadian region (SHOP-03).
- Triple Whale's pixel still runs on every theme (D-27).
- The order confirmation email needs the CPA content (ON-11, SHOP-06). The checkout consent box must not be preselected for Canada (SHOP-04).
- Checkout is off on the "Paused" plan (F-05). The payment methods named in the terms have to match whatever is switched on.

## 6 · What not to carry from the 2019 text

- **Shipping:** "1-3 business days", "Canada Post or Fed Ex" and the "$75 … trackable" note are unverified legacy facts. The return address is personal and redacted. Return-shipping rules belong in the returns policy.
- **Refund:** Shopify's 2019 template boilerplate (perishables, books, CDs, software). Also "sale items cannot be refunded", the gift-credit paragraph, and vague timing ("within a certain amount of days").
- **Privacy:** rights given only to "European residents", nothing on Canadian rights, no retention period, and ad opt-out links for Facebook and Bing that may not apply. It names a person and a home address (redacted). Minimum age 18.
- **Terms:** Shopify's 2019 template. Watch the "as is" disclaimer of merchantable quality and fitness (ON-17); "governed by … the laws of Canada" (PROV-02); changes binding on "continued use" (ON-18, ON-21); "the age of majority in your state or province"; and the broad right to refuse or cancel (ON-18).

## 7 · Questions this checklist raises

**For the owner:**
1. What's the business's legal name and structure? If it's a sole proprietorship, the CPA disclosure may need a person's name.
2. Which business phone number, business address and contact email go on the site? Will you use a P.O. box?
3. What's the return address?
4. Which carrier and service will you use? Tracking, signature, P.O. boxes, and remote areas that may take longer than 7 business days?
5. Who bears a parcel lost or stolen after delivery?
6. How and when are refunds paid?
7. How long after delivery can a customer report damage or a fault, and with what proof? Does chrome wear count as a fault?
8. What does a second size exchange cost? How does "one free size exchange per ring order" work for an order with two rings?
9. Which payment methods will you offer at launch (Shopify Payments, Shop Pay, PayPal, Sezzle)?
10. Which tool sends the newsletter, Klaviyo or Shopify Email? Are abandoned-checkout emails sent to subscribers only?
11. Which tracking stays: GTM (and what's inside it), Clarity, Judge.me, UpPromote, Ordersify, `greenaffiliates.com`, Meta data sharing, Concierge, Inbox?
12. Should the cookie banner be turned on for Canada, or at least Quebec?
13. Can we uninstall Triple Whale now? Uninstalling deletes its data.
14. Do we sell to Quebec at launch (which needs French text), or leave Quebec out at first?
15. Will there be gift cards or discount codes at launch?
16. How long are accounts, orders, subscriber records and support emails kept?
17. What title should the privacy contact use?
18. What's the launch date, for the legacy-order wording?
19. Is the minimum age to buy 18, or the age of majority?
20. Are Printful and ShipStation used for jewelry?
21. Is the free-shipping threshold measured before tax and after discounts?
22. Does the US "Do not sell or share" link stay?

**For the lawyer:** each row marked medium or low above, plus:
- whether Shopify's checkout and an edited order confirmation meet ss. 38–39;
- whether a P.O. box satisfies "address of the premises";
- the late-delivery cancellation right for online orders;
- whether Quebec French and Law 25 apply to this store;
- whether transactional emails need CASL identification and an unsubscribe;
- whether opt-out is enough for analytics outside Quebec;
- risk of loss in transit;
- CPLA labelling on the packaging;
- the status of the CPA 2023 and of Bill C-36 at sign-off.

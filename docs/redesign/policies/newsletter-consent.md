# Newsletter consent line (D-03)

**Status:** the wording is approved by the owner (D-03, D-53, 2026-11-27). It can't go live until the two placeholders are filled: `[mailing address]` (with its `[postal code]`) and `[contact email]`. It's a theme setting, not a policy page, so it goes in when the launch-list signup goes public, which may be before the policies go live (owner-inputs D-03: "Prelaunch signup going public"). Not legal advice; see "Checks" below.

## The wording, as shoppers see it

Shown in the launch-list panel on the homepage (`pb-newsletter`, `02` §4.8), under the email field and button, in 13 px `#CFC6B4` text [12 px on phones]. There's no checkbox, and nothing is ticked in advance. The shopper types their email address and presses the button ("Notify me" before launch, "Subscribe" after).

> By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON [postal code] · Contact: [contact email]

The approved D-03 text, word for word, is:

> By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON · Contact: [email address]

Only the placeholder names differ. `[email address]` is now called `[contact email]`, the name all four policies use for the same address. `[postal code]` is shown on its own because a Canadian postal code follows the province ("Toronto, ON M6K …"); it's part of the mailing address D-03 already asks for, not new wording. If the mailing address isn't in Toronto, "Toronto, ON" changes with it.

## The setting: exact richtext HTML

Paste this into the theme editor: Home page → **Newsletter** (`pb-newsletter`) section → **Consent text**. It's stored as `sections.<id>.settings.consent` in `templates/index.json` (the key is `""` today). Fill both placeholders first; never publish the brackets.

```html
<p>By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON [postal code] · Contact: [contact email]</p>
```

Notes for whoever sets it:

- One `<p>`, as on canvas page B (`Archive-Home`: one 13 px line under the form). The section's CSS sets `.pb-newsletter__consent > * { margin: 0 }`, so a second `<p>` would sit flush against the first.
- No links. The approved wording has none, and the contact email stays plain text. A privacy-policy link is optional and needs the owner's OK, because it adds words to approved text (see "Optional: a privacy-policy link").
- `sections/pb-newsletter.liquid` prints the setting inside `#PbNewsletterConsent-<section id>` and adds that id to the email input's `aria-describedby`, so screen readers read the consent line with the field. Until the setting has a value, the storefront shows no consent line and the theme editor shows the reminder `pb.home.newsletter.consent_missing`.
- Change it in the editor or by merging that one key in `templates/index.json`. Don't overwrite the file (`AGENTS.md`). It's a theme setting on the unpublished theme, so it isn't shared store data.
- The privacy policy quotes this line ("When you subscribe to our emails"). Both must match word for word once filled.

### Optional: a privacy-policy link (needs the owner's OK)

```html
<p>By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON [postal code] · Contact: [contact email] · <a href="/policies/privacy-policy">Privacy policy</a></p>
```

The OPC's consent guidance favours linking the privacy policy where information is collected ([`README.md`](README.md), legal point 54). CASL doesn't require it. The section CSS already styles links in this line (`.pb-newsletter__consent a`).

## The CASL items it covers

| Item | Rule | Where in the line | Status |
| --- | --- | --- | --- |
| Purpose of the consent | CASL s. 10(1)(a): set out the purpose clearly and simply | "emails from Parkdale Brass about new collections and releases" | Covered |
| Who is asking | SOR/2012-36 s. 4(a): the name the business carries on under | "Parkdale Brass" (twice) | Covered. Paragraphs (b) and (c), consent sought on someone else's behalf, don't apply. |
| Mailing address | SOR/2012-36 s. 4(d) | "Parkdale Brass, [mailing address], Toronto, ON [postal code]" | **Open.** A P.O. box is accepted: CRTC Bulletin 2012-548 counts a street, postal box, rural route or general delivery address *(search only)* |
| One other contact method | SOR/2012-36 s. 4(d): a phone number, email address or web address | "Contact: [contact email]" | **Open.** See owner question 2 in [`README.md`](README.md) |
| Right to withdraw | SOR/2012-36 s. 4(e): a statement that consent can be withdrawn | "You can unsubscribe at any time." | Covered |
| Opt-in, not opt-out | CRTC Bulletins 2012-548 and 2012-549: no pre-checked box; the person has to act | No checkbox; the shopper types their address and presses the button | Covered, while no box is added. A Cassels summary of 2012-548 gives "typing in an email address" as an acceptable way to show consent *(search only)* |
| Separate from the terms of sale | CRTC 2012-548: consent can't be bundled into terms and conditions | A standalone form. At checkout, Shopify's "Email me with news and offers" box must not be pre-ticked for Canada | Covered on the form. Checkout setting still to check (privacy policy placeholder, SHOP-04) |
| Proof of consent | CASL s. 13: the sender must prove consent | Not in the line. Shopify stores the state, opt-in level and date for the customer tagged `newsletter` | Keep a dated copy of each version of this wording (privacy policy, legal point 50) |
| Confirming the consent | CRTC 2012-548 says receipt of express consent should be confirmed to the person *(search only)* | Not in the line | Owner question 54 in [`README.md`](README.md): a confirmation (welcome) email or Shopify's double opt-in |

Sources: [SOR/2012-36 (Justice Laws)](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html), s. 4 as quoted in search results on 2026-11-27; [CRTC Bulletin 2012-548](https://crtc.gc.ca/eng/archive/2012/2012-548.htm); [CRTC Bulletin 2012-549](https://crtc.gc.ca/eng/archive/2012/2012-549.htm); [CRTC CASL FAQ](https://crtc.gc.ca/eng/com500/faq500.htm). `laws-lois.justice.gc.ca` and `crtc.gc.ca` couldn't be opened from this session, so every row is *search only* until someone reads the official text.

What the line doesn't have to do: every newsletter sent later needs its own identification (name, mailing address, a contact method) and a working unsubscribe link that's honoured within 10 business days and stays valid for 60 days (CASL s. 6(2), s. 11(2)–(3); privacy policy, "Marketing emails"). That belongs in the email template, not here. Legacy subscribers aren't emailed about jewelry and can join through this form (D-04).

## Open placeholders

| Placeholder | What's needed | Who |
| --- | --- | --- |
| `[mailing address]` | Street address or P.O. box for the business (D-03 says a P.O. box is fine). If it isn't in Toronto, "Toronto, ON" changes too | Owner |
| `[postal code]` | The postal code for that address | Owner |
| `[contact email]` | The public contact email. The same address goes in all four policies | Owner (see [`README.md`](README.md), owner question 2) |

## Checks

- **D-55:** there's no lawyer review. The agent's recommended answers to the CASL points are in [`README.md`](README.md) (legal points 47 to 52).
- **Small point (legal point 52):** the prelaunch button says "Notify me" while the line says "By subscribing". The eyebrow ("LAUNCH LIST") and text ("Get collection news and new release updates.") make the purpose clear, so the agent recommends keeping both. The live label is "Subscribe" anyway.

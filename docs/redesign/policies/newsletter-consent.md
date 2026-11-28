# Newsletter consent line (D-03, D-55)

**Status:** launch-ready except for one owner fact. The wording is the owner's approved D-03 line (D-53), with the owner-supplied contact email filled in and a privacy-policy link added as the D-55 recommendation (no lawyer; the agent's recommendation stands in). It can't go live until `[mailing address]` and its `[postal code]` are filled. It's a theme setting, not a policy page, so it can go in when the launch-list signup goes public, before the policies (owner-inputs D-03). This isn't legal advice.

## The wording, as shoppers see it

Shown in the launch-list panel on the homepage (`pb-newsletter`, `02` §4.8), under the email field and button, in 13 px `#CFC6B4` text [12 px on phones]. There's no checkbox, and nothing is ticked in advance. The shopper types their email address and presses the button ("Notify me" before launch, "Subscribe" after).

> By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON [postal code] · Contact: shawns@parkdalebrass.com · [Privacy policy](https://parkdalebrass.com/policies/privacy-policy)

The approved D-03 text, word for word, is:

> By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON · Contact: [email address]

What changed, and why:

- `[email address]` is now **shawns@parkdalebrass.com**, the contact email the owner supplied (owner-inputs D-03). All four policies use the same address.
- `[postal code]` is shown on its own because a Canadian postal code follows the province ("Toronto, ON M6K …"). It's part of the mailing address D-03 already asks for, not new wording. If the mailing address isn't in Toronto, "Toronto, ON" changes with it.
- **"· Privacy policy"** (a link) is added at the end. This is the D-55 answer to former README legal point 54 (now legal point 45 in the [`README.md`](README.md) index): the OPC's consent guidance favours a link to the privacy policy where information is collected. CASL doesn't require it. Under D-55 the agent applies its recommendation where it adds no business promise or cost, and a link adds neither.

The Privacy policy quotes this line under "When you subscribe to our emails". The two must match word for word.

## The setting: exact richtext HTML

Paste this into the theme editor: Home page → **Newsletter** (`pb-newsletter`) section → **Consent text**. It's stored as `sections.<id>.settings.consent` in `templates/index.json` (the key is `""` today). Fill `[mailing address]` and `[postal code]` first; never publish the brackets.

```html
<p>By subscribing, you agree to get emails from Parkdale Brass about new collections and releases. You can unsubscribe at any time. Parkdale Brass, [mailing address], Toronto, ON [postal code] · Contact: shawns@parkdalebrass.com · <a href="https://parkdalebrass.com/policies/privacy-policy">Privacy policy</a></p>
```

Notes for whoever sets it:

- One `<p>` and one `<a>`, as on canvas page B (`Archive-Home`: one 13 px line under the form). The section's CSS sets `.pb-newsletter__consent > * { margin: 0 }`, so a second `<p>` would sit flush against the first, and it already styles links in this line (`.pb-newsletter__consent a`).
- The contact email stays plain text, not a `mailto:` link, so the line has exactly one link.
- `sections/pb-newsletter.liquid` prints the setting inside `#PbNewsletterConsent-<section id>` and adds that id to the email input's `aria-describedby`, so screen readers read the consent line with the field. Until the setting has a value, the storefront shows no consent line and the theme editor shows the reminder `pb.home.newsletter.consent_missing`.
- Change it in the editor, or by merging that one key in `templates/index.json`. Don't overwrite the file (`AGENTS.md`). It's a setting on the unpublished theme, not shared store data.
- The link points to the live domain's policy page. Until launch (E-10) that page still shows the 2019 policy, so set the line when the new privacy policy is in place, or accept that the link shows the old text until then.

## The CASL elements it covers

Read on the official text, Justice Laws, 2026-11-28 (CASL and SOR/2012-36 current to 2026-11-12).

| Element | Rule (official text) | Where in the line | Status |
| --- | --- | --- | --- |
| Purpose, set out clearly and simply | CASL s. 10(1)(a): "the purpose or purposes for which the consent is being sought" | "emails from Parkdale Brass about new collections and releases" | Covered |
| Who is asking | SOR/2012-36 s. 4(a): "the name by which the person seeking consent carries on business" | "Parkdale Brass" | Covered. Paragraphs (b) and (c) (consent sought on someone else's behalf) don't apply |
| Mailing address | SOR/2012-36 s. 4(d): "the mailing address" | "Parkdale Brass, [mailing address], Toronto, ON [postal code]" | **Open: owner fact.** A P.O. box is the owner's choice (D-03). The regulation says only "mailing address" |
| One other contact method | SOR/2012-36 s. 4(d): "either a telephone number providing access to an agent or a voice messaging system, an email address or a web address" | "Contact: shawns@parkdalebrass.com" | Covered |
| Right to withdraw | SOR/2012-36 s. 4(e): "a statement indicating that the person whose consent is sought can withdraw their consent" | "You can unsubscribe at any time." | Covered |
| Consent sought separately | SOR/2012-36 s. 4: consent "must be sought separately for each act described in sections 6 to 8" | A standalone form for email only. At checkout, Shopify's "Email me with news and offers" box must not be ticked in advance for Canada (store change 5 in the README) | Covered on the form; checkout is a store change |
| Express consent, the person acts | CASL s. 10(1) (express consent). No box is ticked in advance; the shopper types their address and presses the button | No checkbox | Covered, while no box is added. The CRTC's bulletins on pre-checked boxes (crtc.gc.ca) returned HTTP 403, so this rests on the protective practice, not a cited bulletin |
| Proof of consent | CASL s. 13: the person alleging consent "has the onus of proving it" | Not in the line. Shopify stores the consent state, opt-in level and date | Keep a dated copy of each version of this wording (README legal point 47) |
| Notice at collection | OPC Guidelines for obtaining meaningful consent (read 2026-11-27; www.priv.gc.ca reset the connection on 2026-11-28) | "Privacy policy" link | Covered |

What the line doesn't have to do: every newsletter sent later needs its own identification (the name, a mailing address and a way to contact the sender) and an unsubscribe mechanism at no cost (CASL s. 6(2), s. 11(1)). The unsubscribe address or page must stay valid for at least 60 days after the message is sent (s. 11(2)), and an unsubscribe must take effect "without delay, and in any event no later than 10 business days" (s. 11(3)). That belongs in the Shopify Email template, not here. Legacy subscribers aren't emailed about jewelry and can join through this form (D-04).

Sources: [CASL (S.C. 2010, c. 23)](https://laws-lois.justice.gc.ca/eng/acts/E-1.6/FullText.html) ss. 6(2), 10(1), 11(1)–(3), 13; [SOR/2012-36](https://laws-lois.justice.gc.ca/eng/regulations/SOR-2012-36/FullText.html) s. 4; [OPC Guidelines for obtaining meaningful consent](https://www.priv.gc.ca/en/privacy-topics/privacy-for-businesses/appropriate-handling-of-personal-information/collecting-personal-information-and-consent/consent/gl_omc_201805/).

## Open placeholders

| Placeholder | What's needed | Who |
| --- | --- | --- |
| `[mailing address]` | The business's mailing address (a P.O. box is fine, D-03). If it isn't in Toronto, "Toronto, ON" changes too | Owner |
| `[postal code]` | The postal code for that address | Owner |

## Settled under D-55

- **Privacy-policy link** (former owner question 3): added, as above.
- **"By subscribing" next to a "Notify me" button** (former legal point 52): kept. The eyebrow ("LAUNCH LIST") and text ("Get collection news and new release updates.") make the purpose clear, and the live label is "Subscribe".
- **Confirming the sign-up:** a welcome email or Shopify's double opt-in is a store choice, listed under "Store changes" in [`README.md`](README.md). The line doesn't depend on it.

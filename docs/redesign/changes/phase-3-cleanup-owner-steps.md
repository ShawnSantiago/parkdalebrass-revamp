# Phase 3 clean-up · your Admin steps (about 10 minutes)

**For:** the owner. **Record:** [`E-18.md`](E-18.md) (tracker row E-18).

The agent's connector can't do any of these: Shopify's API can't uninstall another app, can't see custom pixels, and the connector has no privacy-settings permission. They're ordered safest first. Steps 1 to 6 delete nothing. Steps 7 to 9 remove things, so do the export first.

All of this affects the **current live store**. Nothing here touches billing, staff accounts, products, customers or orders.

The menu wording below is from memory except step 6, which follows shopify.dev. Shopify's help site isn't reachable from the agent's session, so a label may differ slightly in your Admin. If something isn't where the step says, stop and tell the agent.

## Checks first (nothing changes)

1. **Test the checkout.** In a normal browser, open parkdalebrass.com, add an item that is **in stock** (one whose button says "Add to cart", not "Sold out"), and go to checkout. Don't use the Brockton MK2: it's sold out.
   - Why: the agent's automated test (a US-located browser) got "This store isn't set up to receive orders yet". The cause isn't known. It may be the test only: the test's record names a sold-out item, so it isn't confirmed that a purchasable item was in the cart.
   - Tell the agent what you see: a normal checkout, or that message. If it's the message, look at **Settings → Payments** for an inactive provider. Don't change anything there yet.
2. **Confirm the apps that already disappeared.** Open **Settings → Apps and sales channels**. Ordersify, UpPromote, Concierge Shopping Guide, Sezzle and EZ PreOrder should **not** be listed.
   - Concierge was also a sales channel. On the same screen, look at the **Sales channels** list too: Concierge should **not** be there either.
   - These were on the store on 2026-11-27 and are gone today. The agent didn't remove them. If you did, say so and the agent will log it. If you didn't, tell the agent.
   - Their data inside Shopify went with the uninstall. If you still want the UpPromote affiliate list, try logging in to UpPromote directly; the agent can't tell whether it's still there.
   - If any of them **is** still listed, leave it and tell the agent.

## Settings (reversible in one click)

3. **Checkout email box.** **Settings → Checkout → Marketing options → Email**: leave the sign-up option on, clear **Preselected**, **Save**.
   - What it does: the "Email me with news and offers" box starts unticked, so sign-ups are a real opt-in (needed for CASL).
   - Nothing is lost. To undo, tick it again.
4. **Shop sign-in off (D-56).** **Settings → Customer accounts →** the sign-in options: turn off **Sign in with Shop**, **Save**.
   - What it does: customers sign in with the email code only. Nothing is lost.
5. **Sezzle as a payment method (D-56).** **Settings → Payments**: if Sezzle is listed, **Manage → Deactivate**. If it isn't listed, there's nothing to do.
   - What it does: removes "Checkout with Sezzle". Past Sezzle orders stay in Orders.
   - Don't change any other payment provider here.
6. **Cookie banner for Canada (D-57).** **Settings → Customer privacy → Cookie banner**: turn the banner on if it's off, then under **Regions** add **Canada**, **Save**.
   - What it does: Canadian visitors see Shopify's consent banner, and analytics and marketing pixels wait for their choice.
   - Nothing is lost. To undo, remove Canada from the regions.
   - The real test: from Canada, open parkdalebrass.com in a private (incognito) window and check that the banner appears. The setting being saved isn't proof; seeing the banner is.

## A question for you (optional, nothing to do unless you choose)

- **Judge.me: keep it installed or uninstall it?** Its app pixel runs store-wide, on every theme. D-56 keeps reviews off in the new theme, but that doesn't stop the pixel. Your choice:
  - **Leave it installed:** nothing changes; the pixel keeps loading.
  - **Uninstall it:** the pixel stops. The reviews data stays with Judge.me only if you export it from Judge.me first.
  - Tell the agent which you prefer. This is a question, not an instruction; it isn't one of the numbered steps.

## Removals (export first)

7. **GTM custom pixel (D-56).** **Settings → Customer events → Custom pixels → GTM**.
   1. Open the pixel, copy all of its code and paste it into a private note. That's the backup; the agent can't read this code.
   2. **Disconnect**, then in the **…** menu choose **Delete**.
   - What it does: Google Tag Manager container `GTM-KX2JQ95R` stops loading on every page. You said it isn't used.
   - What's lost: only the pixel's code (hence the note). The container still exists in your Google account.
8. **Triple Whale (D-27).** **Settings → Apps and sales channels → TripleWhale → Uninstall**.
   - What it does: removes its tracking pixel and embed from every theme.
   - What's lost: the connection, and its settings inside Shopify. Reports you want to keep should be exported from the Triple Whale dashboard first.
   - Triple Whale may bill outside Shopify. Uninstalling may not cancel that, so check your Triple Whale account. The agent doesn't touch billing.
9. **Klaviyo (D-68).** Do this one last.
   1. In Klaviyo, export what you want to keep: **Audience → Lists & segments →** each list **→ Export to CSV** (include the consent columns), and note any flows or sign-up forms worth keeping. Save the files privately; **don't send them to the agent or put them in the repo** (they hold customer emails).
   2. In Shopify: **Settings → Apps and sales channels → Klaviyo: Email Marketing & SMS → Uninstall**.
   - What it does: `klaviyo.js` stops loading on every page, and Klaviyo stops receiving customers and orders.
   - What's lost: the sync. Any Klaviyo sign-up form or automated email (welcome, abandoned cart) stops. Check in Klaviyo that no flow you rely on is live before you uninstall.
   - Subscribers who exist only in Klaviyo aren't in Shopify Email. Tell the agent if you want a plan for bringing them over; it needs your approval and their recorded consent.
   - Klaviyo bills outside Shopify. Uninstalling doesn't close the Klaviyo account; that's yours to cancel.

## When you're done

Tell the agent which numbers you did. It then checks, without changing anything:

| Step | How the agent verifies |
| --- | --- |
| 1 | Records your answer; re-tests the checkout page |
| 2, 8, 9 | The app lookup returns no installation, and the live pages no longer request `klaviyo.js` or `config-security.com`; pixel 327876930 is gone from the page's pixel list |
| 3 | Loads the checkout and reads the box's state (only possible once step 1 is sorted); otherwise asks you for a screenshot |
| 4 | Checks the sign-in page; if that's inconclusive, asks you for a screenshot |
| 5 | The product, cart and checkout pages show no Sezzle option |
| 6 | The real test is yours: from Canada, open the site in a private window and confirm the banner appears (the agent's browser is in the US and can't see it). The agent also checks that the consent policy query shows `consentRequired: true` for the 13 provinces and territories |
| 7 | Pixel 83525954 is gone from the page's pixel list, and no page requests `googletagmanager.com` |

**Not part of this list (launch day):** removing Quebec from shipping, the money format, publishing the theme, redirects, unpublishing products. Microsoft Clarity lives in the old theme's code and goes away when the new theme is published.

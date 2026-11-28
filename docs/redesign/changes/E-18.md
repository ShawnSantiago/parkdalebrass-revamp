# Phase 3 clean-up · apps, pixels and privacy settings (D-56, D-57, D-68, D-27)

| | |
| --- | --- |
| Tracker | [`owner-inputs.md`](../owner-inputs.md) section E, row E-18; section G rows G-02, G-03, G-04, G-06, G-16, G-17 |
| Decisions | D-56 (apps, scripts, channels), D-57 (cookie banner for Canada, Shopify Email), D-68 (disconnect Klaviyo), D-27 (Triple Whale dropped) |
| Approval | Owner, in chat, 2026-11-28 ("Step 2 approved"), after being told it affects the live store and that uninstalling an app deletes its data |
| Backup | [`backup/2026-11-28/config/apps-and-pixels-before-cleanup.json`](../backup/2026-11-28/config/apps-and-pixels-before-cleanup.json) (state before; read-only inventory). Earlier state: [`backup/2026-11-27/config/apps-and-pixels.json`](../backup/2026-11-27/config/apps-and-pixels.json) |
| Status | **Waiting on the owner's Admin steps** ([`phase-3-cleanup-owner-steps.md`](phase-3-cleanup-owner-steps.md)). The agent applied **nothing**: no target is changeable with this connector. |

## 1 · What was approved

Remove the GTM custom pixel "GTM" (`GTM-KX2JQ95R`); uninstall Ordersify, UpPromote, Concierge Shopping Guide (app and channel), Triple Whale and Klaviyo; Sezzle off; Shop sign-in off; Shopify's cookie banner on for Canada; the checkout "Email me with news and offers" box not pre-ticked.

Not in scope (launch day): Quebec shipping, the money format, publishing, redirects, unpublishing products. Judge.me stays installed (D-56 turns it off in the new theme only). Never touched: billing, staff accounts, the live theme's files (168071168322), products, customers, orders, articles.

## 2 · State on 2026-11-28, before any change

| Target | State | Changeable by the agent? |
| --- | --- | --- |
| Ordersify, UpPromote | Gone. Script tags and UpPromote pixel 2119827778 were live on 2026-11-27 and are absent; no installation | Nothing to do |
| Concierge, Sezzle widget, EZ PreOrder | Gone. Live HTML reports each app block as "does not exist"; no installation; no Concierge channel or publication | Nothing to do |
| Klaviyo | Installed (installation 707152380226); its embed requests `klaviyo.js` on every page | No. No API uninstalls another app |
| Triple Whale | Installed (installation 721553686850); app pixel 327876930 and embed live | No, same reason |
| GTM custom pixel | Pixel 83525954 "GTM" requests `gtm.js?id=GTM-KX2JQ95R` on home, product and cart | No. Custom pixels have no Admin API object |
| Cookie banner, Canada | `consentRequired: false` for all 13 provinces and territories. Whether the banner feature is on is unreadable | No. `consentPolicyUpdate` needs `write_privacy_settings`, which the connector lacks, and no mutation enables the banner |
| Checkout email box | Unknown (not in the API; the checkout page didn't render, §5) | No mutation exists |
| Shop sign-in | Unknown (not in the API). New customer accounts, login links shown | No mutation exists |
| Sezzle payment method | Unknown (not readable) | No |

Someone other than this task removed Ordersify, UpPromote, Concierge, Sezzle and EZ PreOrder between 2026-11-27 and 2026-11-28. No per-app settings backup from before those uninstalls exists, which D-56 asked for. The only record is the 2026-11-27 inventory.

## 3 · What the agent applied

**Nothing.** Before/after values are identical to §2.

Re-checked on 2026-11-28 before deciding:

- The connector's granted scopes (`currentAppInstallation.accessScopes`) include no `read_privacy_settings` or `write_privacy_settings`, and no pixel or script-tag scope.
- `consentPolicy` read back unchanged: the 13 Canadian rows are `consentRequired: false`.
- `consentPolicyUpdate` wasn't attempted. It would be refused for scope, and the regional policy alone doesn't switch the banner on.
- `appUninstall` was **not** called. It takes no arguments and uninstalls the calling app (the connector).

## 4 · Waiting on the owner

The nine steps in [`phase-3-cleanup-owner-steps.md`](phase-3-cleanup-owner-steps.md): two checks (checkout test; confirm the vanished apps), four settings (checkout email box, Shop sign-in, Sezzle payment method, cookie banner for Canada) and three removals (GTM pixel, Triple Whale, Klaviyo). The backups for the removals are the owner's: the GTM pixel code in a private note, and Klaviyo list exports kept **outside the repo** (personal data).

## 5 · Verification

Done on 2026-11-28 (read-only): the inventory in the backup file, from Admin GraphQL queries and the live storefront in a browser (home, a product, cart).

After the owner's steps, the agent re-runs the same reads; the per-step checks are in the table at the end of the owner checklist. Results get appended here and the E-18 status updated.

Limits of the checks so far:

- **Checkout returned HTTP 403** "This store isn't set up to receive orders yet" for the agent's US-located automated browser (one item added, cart cleared afterwards). Cause not established; the shop reports no supported digital wallets. Owner step 1 checks it from a normal browser.
- The agent's browser is seen as a **US** visitor, so the Canadian banner can't be seen from here; the owner confirms it in a private window.
- The session blocks third-party hosts, so their scripts were requested but never ran. The host list is first-level requests only.
- The Admin click paths are unverified wording except the cookie banner path (shopify.dev); `help.shopify.com` isn't reachable from the session.

## 6 · Rollback

- Agent: nothing to roll back.
- Checkout box, Shop sign-in, cookie banner regions, Sezzle payment method: switch the setting back in the same Admin screen.
- GTM pixel: **Settings → Customer events → Add custom pixel**, paste the saved code, connect.
- Triple Whale, Klaviyo: reinstall from the Shopify App Store and reconnect the account. Settings held inside Shopify by the app don't come back; data in the vendor's own account is the vendor's to keep.
- Ordersify, UpPromote, Concierge, Sezzle, EZ PreOrder: already uninstalled by someone else; reinstalling is possible, their old settings are not recoverable from this repo.

## 7 · Still open after this clean-up

- Microsoft Clarity loads on the live site from the Craft theme file until the new theme is published (G-03). The live theme's files are out of scope.
- Stale embed entries for Sezzle, Concierge and EZ PreOrder remain in the live Craft settings. They output only an HTML comment.
- The installed-app list dropped from 12 to 10 since 2026-11-27: "Shopify ChatGPT MCP App" is gone, and the Claude connector no longer lists itself though it's still installed.
- Printful's script tag, Judge.me, `unpkg.com` (a Craft homepage section) and `shop.app` still load on live. None is a target here.

# Operations

Building, deploying, and the live infrastructure.

## Local

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build; every route prerenders
pnpm start    # serve the production build
pnpm lint
npx tsc --noEmit   # there is no typecheck script
```

Built with Node 24 and pnpm 10.19 locally; Vercel builds on Node 24.x. Next 16 needs Node ≥ 20.9.

## Deployment

GitHub → Vercel git integration. **Pushing to `main` deploys to production**, typically live in under
a minute. There is no staging environment; branches get preview deployments if pushed.

- Repository: `robertocinetto/robertocinetto-com`
- Vercel project: `robertocinetto-com`, scope `robertocinettos-projects`
- Framework preset, install command and build command are all auto-detected. **No environment
  variables** — the app reads no `process.env` anywhere.

Project and org IDs are deliberately not written down here. Read them from `.vercel/project.json`
(gitignored) or run `vercel project inspect robertocinetto-com`.

Never commit `.vercel/` or any `.env` file; both are already in `.gitignore`.

## Domains

`robertocinetto.com` is the canonical host. This is not arbitrary: `SITE_URL` in `src/content/site.ts`
drives the canonical tag, `metadataBase`, `og:url`, `sitemap.xml`, `robots.txt` and the JSON-LD `@id`.
If the primary host ever changes, that constant is the thing to change.

DNS is at Namecheap and already points at Vercel (`cname.vercel-dns.com`). Both the apex and `www` are
attached to the project.

Two quirks worth knowing:

- **`vercel domains add` prints `403 You don't have access to <domain>` and the domain is attached
  anyway.** The failure is its follow-up *account-level* domain lookup; the domain is registered
  externally at Namecheap rather than at Vercel, so that lookup has nothing to return. Harmless.
- Other subdomains of `robertocinetto.com` point at unrelated Vercel projects. Never add a wildcard
  domain to this project.

### Open item

**`www.robertocinetto.com` currently serves `200` instead of redirecting to the apex.** The site
answers on two hostnames while every canonical signal names one, which is a duplicate-content signal.
Fix in Project → Settings → Domains → `www` → Redirect to `robertocinetto.com`, 308 Permanent. The
Vercel CLI has no flag for this; the alternative is a host-matched redirect in `next.config.ts`
alongside the `/blog` rules.

## Analytics

GA4, measurement ID `G-VC7X9406GZ`, in `src/components/Analytics.tsx` and rendered from the root
layout. The ID is already public in the served HTML, so naming it here costs nothing.

It uses `next/script` at the default `afterInteractive` strategy rather than `@next/third-parties`.
That package's `GoogleAnalytics` component is the documented route, but it would add a dependency to
reproduce the same four lines, and its main advantage — re-firing a pageview on client-side navigation
— is moot on a site with no client-side routing. The footer's link to `/privacy` is a plain anchor, so
every route change is a full page load that fires its own pageview.

**The script only renders when `VERCEL_ENV === "production"`,** so preview deploys and `pnpm dev`
report nothing and the live property stays clean. `NODE_ENV` would be the wrong test: it is
`production` for a local `pnpm build && pnpm start` too. The `data-ga-*` attributes still render in
every environment and only the script goes away, so the markup can be inspected anywhere without
sending a single hit.

### Click tracking

Seven links, three events, one delegated listener.

| Event | `link_location` | Fires on |
| --- | --- | --- |
| `book_call_click` | `hero`, `contact` | the Cal.com button |
| `email_click` | `hero`, `contact`, `footer` | the `mailto:` links |
| `social_click` | `contact`, `footer` | the LinkedIn link |

Every event also carries `link_url`, read off the anchor's own `href`. That is how two social links in
the same location are told apart, so there is no second attribute for it.

LinkedIn is currently the only social link on the page. The GitHub links were pulled from the contact
band and the footer before the agency outreach: the profile holds two old demo apps, which reads
against fifteen years of senior work. `GITHUB_URL` stays in `site.ts` and in the JSON-LD `sameAs`,
so restoring the links is JSX-only, once there is something on the profile worth clicking.

The footer's `Privacy` link is deliberately untracked: it is neither a lead nor a social click. On
`/privacy` the footer's email and LinkedIn links still fire with `link_location: footer`, and GA4's
own page dimension tells them apart from the home page's.

Tag a link by spreading `gaAttrs(event, location)` from `Analytics.tsx` onto an anchor:

```tsx
<a {...gaAttrs("email_click", "footer")} href={`mailto:${EMAIL}`}>
```

`GaEvent` and `GaLocation` are string unions, so a typo is a type error rather than a silently missing
event. `CtaPair` takes `location` as a **required** prop for the same reason: its two renders are
otherwise byte-identical, and telling the hero CTA from the closing one is the entire point of
tracking them.

### GA4 admin configuration

Both items below were configured on 21 August 2026, **before** the tracking code went live. Neither is
retroactive, and that ordering is the whole reason nothing was lost.

1. **`link_location` is registered as a custom dimension** — Admin → Data display → Custom
   definitions; name "Link location", scope **Event**, parameter `link_location`. An unregistered
   parameter is still collected, but appears in no report and no exploration — only in Realtime and
   DebugView. That parameter field is exact and case-sensitive, and getting the string wrong is the
   quietest possible way for all of this to produce nothing.
2. **`book_call_click` and `email_click` are marked as key events** — Admin → Data display → Key
   events. GA4 accepts an event name before the first event ever arrives, so this did not wait on
   traffic.

`social_click` is deliberately **not** a key event: it is interest rather than intent, and folding it
in would make the conversion number mean "clicked something" rather than "moved toward booking".

`purchase`, `qualify_lead` and `close_convert_lead` also appear in that list. GA4 pre-registered them
when the property was created; nothing here sends them, so they sit at zero permanently.

#### The default that would silently wreck the data

GA4's **Create an event** dialog opens on *Create without code*, which builds a **derived** event from
an existing one — with the trigger pre-filled as `page_view`. Accepting that for `book_call_click`
would synthesize a booking on every page load, and since the fabricated event carries the same name as
the real one, the two can never be separated afterwards. On a one-page site that is every single visit
counted as a lead.

For an event the site already sends from its own code, scroll down that dialog and choose **Create
with code**. The `page_view` trigger disappears along with it.

#### Two dialog settings worth overriding

- **Counting method: "Once per session", not the badged "Once per event".** The Cal.com link is
  `target="_blank"`, so the visitor stays on the page after clicking and re-clicking is ordinary
  behaviour; and both CTAs render twice, so one person can fire the same event from the hero and again
  from the closing band. Per-event counting turns one lead into two or three. Google's default suits
  purchases, where every event really is a separate transaction. This is not that.
- **No default key event value.** The dialog offers a monetary amount per key event. A placeholder
  figure surfaces as a value next to real money in channel and campaign comparisons, so it reads as
  revenue that does not exist. Set one only when it means something — expected project value × close
  rate from a booking click — never `1`.

Enhanced measurement stays on. Its outbound `click` events overlap these but sit under a different
event name, so nothing double-counts — and `mailto:` is not an outbound click at all, which is half
the reason this exists.

### Automating the GA4 side

The official [Google Analytics MCP server](https://github.com/googleanalytics/google-analytics-mcp) is
**read-only** — `run_report`, `get_property_details`, `get_custom_dimensions_and_metrics` and similar.
It can verify a configuration but never create one, and there is no official GA CLI.

The Admin API v1beta *can* write both items above, under OAuth scope
`https://www.googleapis.com/auth/analytics.edit`:

```
POST https://analyticsadmin.googleapis.com/v1beta/properties/{id}/customDimensions
POST https://analyticsadmin.googleapis.com/v1beta/properties/{id}/keyEvents
```

The cost is the auth handshake — `gcloud auth application-default login` with that scope, or a service
account added as an Editor on the property. For a two-item one-off the dashboard is faster. DebugView
has no API at all.

### Verifying without sending a hit

`pnpm build && pnpm start` (no `VERCEL_ENV`, so no GA script loads), then in the console stub `gtag`,
paste the listener from `Analytics.tsx`, and dispatch the clicks rather than making them by hand — it
covers all seven without opening Cal.com, a mail client and two tabs, and `preventDefault` does not
stop the listener firing:

```js
window.gtag = (...a) => console.log(...a);
document.addEventListener('click', e => e.preventDefault(), true);
for (const a of document.querySelectorAll('[data-ga-event]')) {
  let n = a; while (n.lastElementChild) n = n.lastElementChild;  // usually the sr-only span
  n.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
}
```

Expect exactly seven lines. Walking to the deepest child is the point: four of the seven anchors wrap an
`sr-only` span, so that is what a real click usually lands on, and it is what `closest()` in the
listener exists to handle.

When checking the live site instead, expect blockers to get in the way — and note that they fail
*silently and convincingly*. The inline script always runs, so `gtag` is defined, `dataLayer` fills up
and every event looks correct in the console, while nothing ever leaves the browser. This was observed
on the first live smoke test: all events reached `dataLayer` and none reached GA4.

`gtag` being a function proves nothing — that is our own four-line stub. The reliable test is whether
Google's script actually executed:

```js
typeof window.google_tag_manager === 'object'   // false => gtag.js never ran
performance.getEntriesByType('resource')
  .filter(r => /googletagmanager/.test(r.name)).length   // 0 => request never left
```

A count of zero with the `<script>` tag present in the DOM means blocked outright rather than failed.
Extension-level blocking is fixed by allowlisting the domain or using a clean profile; DNS-level
blocking (Pi-hole, NextDNS) is not, so a phone on cellular is the unambiguous test. Always confirm in
**GA4 → Reports → Realtime**, never in the console.

Worth carrying into how the numbers are read: this audience is agencies and developers, who block at
well above the general rate. GA4 will undercount real interest, so treat the click events as a floor
and a trend line, not a headcount.

### No consent banner

Deliberate, and part of the design. GA4 sets cookies, so if EU traffic ever matters this needs either
GA4 Consent Mode with `denied` defaults, or a cookieless provider. Worth revisiting before any
European campaign. `/privacy` says there is no banner in so many words, so adding one means updating
`src/content/privacy.ts` in the same commit.

## The OG image

`src/app/opengraph-image.tsx` renders a 1200×630 PNG at build time via `next/og`.

It reads three subset fonts from `src/assets/`: Instrument Sans 400 and 600, JetBrains Mono 400, each
about 13 KB and subset to basic Latin. If the card copy ever needs a glyph outside that range,
regenerate them:

```bash
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30"
curl -G -H "User-Agent: $UA" \
  --data-urlencode "family=Instrument Sans:wght@600" \
  --data-urlencode "text=<the glyphs you need>" \
  https://fonts.googleapis.com/css2
# then download the url(...) it prints — that UA gets WOFF, which Satori accepts
```

Satori resolves no CSS custom properties, so that file also repeats the palette as hex constants. See
[gotchas.md](./gotchas.md).

## Verifying a deployment

```bash
U=https://robertocinetto.com
for p in / /privacy /opengraph-image /sitemap.xml /robots.txt /blog; do
  printf "%-18s %s\n" "$p" "$(curl -sI -o /dev/null -w '%{http_code} %{redirect_url}' "$U$p")"
done
```

Expect `200` on the first five and a `308` to `/` on `/blog`. `/privacy` should also carry
`<meta name="robots" content="noindex"/>` and be absent from `sitemap.xml`.

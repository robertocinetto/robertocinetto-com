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
— is moot on a site with one route and no client-side routing.

**The script only renders when `VERCEL_ENV === "production"`,** so preview deploys and `pnpm dev`
report nothing and the live property stays clean. `NODE_ENV` would be the wrong test: it is
`production` for a local `pnpm build && pnpm start` too. The `data-ga-*` attributes still render in
every environment and only the script goes away, so the markup can be inspected anywhere without
sending a single hit.

### Click tracking

Nine links, three events, one delegated listener.

| Event | `link_location` | Fires on |
| --- | --- | --- |
| `book_call_click` | `hero`, `contact` | the Cal.com button |
| `email_click` | `hero`, `contact`, `footer` | the `mailto:` links |
| `social_click` | `contact`, `footer` | GitHub and LinkedIn |

Every event also carries `link_url`, read off the anchor's own `href`. That is what tells GitHub from
LinkedIn, so there is no second attribute for it.

Tag a link by spreading `gaAttrs(event, location)` from `Analytics.tsx` onto an anchor:

```tsx
<a {...gaAttrs("email_click", "footer")} href={`mailto:${EMAIL}`}>
```

`GaEvent` and `GaLocation` are string unions, so a typo is a type error rather than a silently missing
event. `CtaPair` takes `location` as a **required** prop for the same reason: its two renders are
otherwise byte-identical, and telling the hero CTA from the closing one is the entire point of
tracking them.

### Two things to do in the GA4 admin

Neither is retroactive.

1. **Register `link_location` as a custom dimension** — Admin → Data display → Custom definitions →
   Custom dimensions, scope **Event**. Until you do, the parameter is collected but appears in no
   report or exploration, only in Realtime and DebugView. Data appears roughly 24h after registering.
2. **Mark `book_call_click` and `email_click` as key events** — Admin → Data display → Key events. GA4
   accepts a name before the first event arrives. `social_click` is interest rather than intent, so
   leave it unmarked.

Enhanced measurement stays on. Its outbound `click` events overlap these but sit under a different
event name, so nothing double-counts — and `mailto:` is not an outbound click at all, which is half
the reason this exists.

### Verifying without sending a hit

`pnpm build && pnpm start` (no `VERCEL_ENV`, so no GA script loads), then in the console stub
`window.gtag = console.log`, paste the listener from `Analytics.tsx`, and click around.
`[...document.querySelectorAll('[data-ga-event]')]` should return exactly nine anchors.

When checking the live site instead, note that privacy extensions commonly intercept
`google-analytics_analytics.js` and substitute a stub: `gtag` will be defined and `dataLayer`
populated while no hit ever leaves. Confirm in **GA4 → Reports → Realtime**, or from a clean profile.

### No consent banner

Deliberate, and part of the design. GA4 sets cookies, so if EU traffic ever matters this needs either
GA4 Consent Mode with `denied` defaults, or a cookieless provider. Worth revisiting before any
European campaign.

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
for p in / /opengraph-image /sitemap.xml /robots.txt /blog; do
  printf "%-18s %s\n" "$p" "$(curl -sI -o /dev/null -w '%{http_code} %{redirect_url}' "$U$p")"
done
```

Expect `200` on the first four and a `308` to `/` on `/blog`.

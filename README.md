# robertocinetto.com

The personal site of Roberto Cinetto, a senior full-stack developer in North Vancouver, BC. One
statically rendered marketing page, live at **[robertocinetto.com](https://robertocinetto.com)**.

Next.js 16 (App Router) + React 19 + Tailwind v4 + TypeScript. No CMS, no database, no client-side
data fetching and no client components; every byte of application code runs at build time. The one
script that runs in the browser is Google Analytics — it loads after hydration, and only on the
production deployment.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build; every route prerenders
pnpm start    # serve the production build
pnpm lint
```

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, <html>
    page.tsx              composes the seven sections (+ the testimonial band)
    globals.css           @theme tokens, base layer, hero backdrop, proof-rise
    opengraph-image.tsx   generated 1200x630 card, built at build time
    robots.ts  sitemap.ts
  components/
    home/                 one component per section
    Analytics.tsx         GA4 via next/script; also exports `gaAttrs` for click tracking
    ExternalLink.tsx      target=_blank + "(opens in a new tab)" for screen readers
    icons.tsx             inline GitHub/LinkedIn marks — currently unused
  content/                all copy, as typed TypeScript constants
  assets/                 Instrument Sans + JetBrains Mono subsets, OG image only
docs/                     how this repo works — see below
```

All copy lives in `src/content/`. Editing the site means editing a TypeScript file, committing, and
letting Vercel redeploy. There is nothing else to log into.

## Before launch

| What | Where | Status |
| --- | --- | --- |
| `CAL_URL` | `src/content/site.ts` | Set to `https://cal.com/robertocinetto/30min`. Confirm the event is published and public. |
| `roberto@robertocinetto.com` | `src/content/site.ts` (`EMAIL`) | Confirm the mailbox or forwarder exists. It is the secondary CTA and appears in the footer and JSON-LD. |
| `link_location` custom dimension | GA4 admin | Register it, or click-tracking data never leaves Realtime. See [docs/operations.md](docs/operations.md#two-things-to-do-in-the-ga4-admin). |
| `www` redirect | Vercel dashboard | `www` still serves `200` instead of redirecting to the apex. See [docs/operations.md](docs/operations.md#open-item). |

## Documentation

`AGENTS.md` is the entry point for anyone — human or agent — about to change something. It carries
the invariants and routes into `docs/`:

| Doc | Read it when |
| --- | --- |
| [docs/architecture.md](docs/architecture.md) | Changing structure, adding a route or component, or touching config |
| [docs/design-system.md](docs/design-system.md) | Changing anything visual — colour, type, spacing, layout |
| [docs/content-and-voice.md](docs/content-and-voice.md) | Writing or editing any copy on the page |
| [docs/operations.md](docs/operations.md) | Building, deploying, domains, analytics |
| [docs/gotchas.md](docs/gotchas.md) | Before editing `globals.css`, the hero, the OG image or analytics |

The design direction is called **Night Shift**, and its rules are not stylistic preferences: radius is
`0` everywhere except the portrait, there are no shadows anywhere, and the accent colour never covers
more than about 2% of the page. `docs/design-system.md` has the rest.

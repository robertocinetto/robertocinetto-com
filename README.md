# robertocinetto.com

A single, statically rendered marketing page. Next.js 16 (App Router) + React 19 +
Tailwind v4 + TypeScript. No CMS, no database, no client-side data fetching and no
client components; every byte of application code runs at build time. The one
script that runs in the browser is Google Analytics, and it loads after
hydration.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build; every route prerenders
pnpm start    # serve the production build
pnpm lint
```

## Before launch

| What | Where | Status |
| --- | --- | --- |
| `CAL_URL` | `src/content/site.ts` | Set to `https://cal.com/robertocinetto/30min`. Confirm the event is published and public. |
| `roberto@robertocinetto.com` | `src/content/site.ts` (`EMAIL`) | Confirm the mailbox or forwarder exists. It is the secondary CTA and appears in the footer and JSON-LD. |

`CTA_PRIMARY` names the duration ("Book a 30-minute call") because in this design
the stated length *is* the offer. If the Cal.com event ever changes length, change
both — they sit next to each other in `site.ts` for that reason.

## Where the copy lives

All content is typed TypeScript constants under `src/content/`. There is no CMS —
edit these files, commit, redeploy. Nothing else needs touching.

| File | Holds |
| --- | --- |
| `site.ts` | Name, job title, email, Cal.com URL, GitHub/LinkedIn, location. Anything used in more than one place. |
| `hero.ts` | The `h1`, subhead, the two halves of the availability line, portrait alt text. |
| `proof.ts` | The four outcome figures, their eyebrow and the caption under them. |
| `services.ts` | The three "What I do" entries, plus that section's eyebrow and heading. |
| `work.ts` | The three case-study cards, plus that section's eyebrow and heading. |
| `agency.ts` | The six "How I work with agencies" points, plus eyebrow, heading and lead. |
| `background.ts` | The Background paragraphs, plus eyebrow and heading. |
| `contact.ts` | The closing heading and body. |
| `testimonials.ts` | The testimonial band — off by default. See below. |

Each section opens with a mono eyebrow above its `h2`. Both live in the content
file, not the component: eyebrows are copy, and they are written in sentence case
and shouted by CSS — never typed in capitals.

Every section component in `src/components/home/` reads from exactly one of these
and holds no copy of its own.

### A rule about the numbers

Every figure in `proof.ts` and every `outcome` in `work.ts` is a measured result
from a shipped project. Do not add one without a real project behind it, and do
not round a number up to make a row look tidier.

## Adding a work item

Append an object to `workItems` in `src/content/work.ts`:

```ts
{
  slug: "short-stable-identifier",     // used by a future /work/[slug] route
  title: "What the project was",
  summary: "Context in the first sentence, then what you actually built.",
  stack: ["WordPress", "Python"],      // rendered as tags, in this order
  outcome: "+40% sales.",              // the measured result
}
```

It renders immediately — no route or component changes. `WorkItem` is shaped so a
`/work/[slug]` route can consume the same objects later by adding a `body` field
for the long-form case study. **That route does not exist yet and nothing links to
these slugs.**

## Testimonials

The band is **built and switched off**. `src/content/testimonials.ts` exports
`enabled: false` and an empty `items` array, and `page.tsx` renders the section
only when that flag is true.

To turn it on: add two or three attributable quotes — role, agency size and city,
never a personal name — and flip `enabled`. One thing to change at the same time:
with the band visible, its panel sits directly against the agencies panel and the
night/panel alternation that separates every other section disappears. Give
`<AgencyTerms />` a night surface when you do, and the rhythm holds.

Nothing is invented in the meantime. The design ships this band with two example
quotes behind a `PLACEHOLDER COPY` badge; those are the design system's own
placeholder text and were deliberately not carried across.

## Design tokens

Defined once in the `@theme` block of `src/app/globals.css` — Tailwind v4 is
CSS-first, so there is no `tailwind.config.js`.

The palette is "Night Shift". Two backgrounds only, three text values, one
accent; contrast is measured against `--color-night` unless stated.

| Token | Value | Role |
| --- | --- | --- |
| `--color-night` | `#0e1522` | Page ground. Hero, services, work, background, footer. |
| `--color-panel` | `#17223a` | Raised bands — proof bar, work cards, agencies, contact. |
| `--color-panel-hi` | `#1e2b45` | Work-card hover. Never a resting background. |
| `--color-line` | `#2c3b54` | Every 1px border on the page. |
| `--color-daylight` | `#f2f5f8` | Headings, figures, focus ring. 15.4:1. |
| `--color-haze` | `#9fb0c6` | All body copy. 8.0:1 on night, 6.6:1 on panel. |
| `--color-haze-dim` | `#7c8ca3` | Mono labels and captions. 4.9:1 — **labels only, never paragraphs**. |
| `--color-signal` | `#facc15` | Top rule, primary button, `+` glyphs, `Result:`. Never a resting link colour. |
| `--color-signal-hi` | `#ffda4d` | Primary-button hover only. |
| `--color-signal-active` | `#e0b400` | Primary-button press only. |

Signal never exceeds about 2% of a rendered page, and there is no
success/warning/error scale — this is a one-page instrument, not an application.

Radius is `0` everywhere. The single exception is the portrait: a circle with a
2px signal border. There are **no shadows at all** — elevation is panel versus
night, never blur — and no gradients, transparency or `backdrop-filter` outside
the hero scrim.

Type is **Instrument Sans** (400/500/600, never 700, never italic) for everything
set in prose, and **JetBrains Mono** (400/700) for labels, captions, result lines,
the email address and the proof figures. Setting the numbers in mono is the point
of the direction: a figure reads as a measurement rather than a claim. Both load
as variable fonts through `next/font` and are self-hosted — nothing is requested
from Google at runtime.

### Why every rem in the scale looks odd

The root font size is `112.5%` rather than a fixed `18px`, so `1rem` is 18px at
default browser settings but still scales for anyone who has raised their own.
The design system, however, authors its `clamp()` steps against a 16px root — so
every rem in `--text-*` is the design's own value multiplied by `16/18`. That
lands the *rendered* size exactly on the design's specimens: `--text-h1` maxes at
58px, `--text-figure` at 72px, body runs 17→18px.

`--spacing` is set to `0.2222rem` (4px) for the same reason, which puts Tailwind's
whole numeric spacing scale back on the design's 8px grid — `p-2` is 8px, `p-6` is
24px, `p-12` is 48px.

Two things deliberately do **not** get rescaled: the `vw` terms inside each
`clamp()`, and every px value (the 20→48px gutter, the 80→144px section padding,
borders, card padding). Both are already independent of the root size. Neither are
breakpoints — `rem` inside a media query resolves against the initial 16px, not
against `html`, so Tailwind's `md`/`lg` still mean 768px and 1024px.

### The proof bar is the one loud thing

`--text-figure` is the largest step in the scale — 72px against the `h1`'s 58px —
and the only one set in mono. If you add a section, keep it below that. The four
numbers are the page's single typographic moment and they stop working the
instant something else competes with them.

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
    icons.tsx             inline GitHub/LinkedIn marks — currently unused
    ExternalLink.tsx      target=_blank + "(opens in a new tab)" for screen readers
    Analytics.tsx         GA4 via next/script, the only browser-side script
  content/                all copy (see above)
  assets/                 Instrument Sans + JetBrains Mono subsets, OG image only
```

## Notes

- **`experimental.inlineCss` is on** (`next.config.ts`). Tailwind output is ~7 KB
  gzipped and almost every visitor arrives cold from an email or LinkedIn link, so
  there is no cached stylesheet to benefit from — inlining removes a
  render-blocking round trip. Turn it off if the site ever grows enough pages for
  a shared cached stylesheet to pay for itself.
- **The hero backdrop timing lives in two places.** `HeroBackdrop.tsx` computes
  per-frame animation delays from `HOLD_SECONDS` and `TRANSITION_SECONDS`; the
  matching duration and keyframe stops are in `globals.css`. Changing one means
  changing the other — both files say so.
- **The OG image fonts** in `src/assets/` are Instrument Sans 400/600 and
  JetBrains Mono 400, subset to basic Latin (~13 KB each). Satori resolves no CSS
  custom properties, so `opengraph-image.tsx` also repeats the palette as hex
  constants — a palette change has to touch that file too. If the card copy ever
  needs a glyph outside basic Latin, regenerate the subsets:

  ```bash
  UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30"
  curl -G -H "User-Agent: $UA" \
    --data-urlencode "family=Instrument Sans:wght@600" \
    --data-urlencode "text=<the glyphs you need>" \
    https://fonts.googleapis.com/css2
  # then download the url(...) it prints — that UA gets WOFF, which Satori accepts
  ```

- **`src/components/icons.tsx` is currently unreferenced.** The design renders the
  contact and footer links as plain text, so the inline GitHub/LinkedIn marks are
  not used. The file is kept because putting them back is a one-line change.

- **Analytics** is GA4 (`G-VC7X9406GZ`), in `src/components/Analytics.tsx` and
  rendered from the root layout. It uses `next/script` at the default
  `afterInteractive` strategy rather than `@next/third-parties`, which would add
  a dependency to reproduce the same four lines. The measurement ID lives in that
  component, not in `src/content/`, because `content/` is copy and this is
  configuration.

  There is **no consent banner**, which is a deliberate part of the design (see
  the design system's layout rules). GA4 sets cookies, so if EU traffic ever
  matters, this needs either GA4 Consent Mode with `denied` defaults or a
  cookieless analytics provider. Worth revisiting before any European campaign.

- `/blog` and `/blog/*` redirect permanently to `/` (`next.config.ts`). The blog
  left with Strapi; the redirects keep old inbound links from hard-404ing.

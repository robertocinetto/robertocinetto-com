# robertocinetto.com

A single, statically rendered marketing page. Next.js 16 (App Router) + React 19 +
Tailwind v4 + TypeScript. No CMS, no database, no client-side data fetching, and
no client components — every byte of application code runs at build time.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build; every route prerenders
pnpm start    # serve the production build
pnpm lint
```

## Before launch

Two things must be set by hand or the page ships with a broken primary action.

| What | Where | Status |
| --- | --- | --- |
| `CAL_URL` | `src/content/site.ts` | **Placeholder** — currently `https://cal.com/REPLACE-ME`. Left obviously broken so it can't ship unnoticed. |
| `roberto@robertocinetto.com` | `src/content/site.ts` (`EMAIL`) | Confirm the mailbox or forwarder exists. It is the secondary CTA and appears in the footer and JSON-LD. |

## Where the copy lives

All content is typed TypeScript constants under `src/content/`. There is no CMS —
edit these files, commit, redeploy. Nothing else needs touching.

| File | Holds |
| --- | --- |
| `site.ts` | Name, job title, email, Cal.com URL, GitHub/LinkedIn, location. Anything used in more than one place. |
| `hero.ts` | The `h1`, subhead, availability line, portrait alt text. |
| `proof.ts` | The four outcome figures and the caption under them. |
| `services.ts` | The three "What I do" entries. |
| `work.ts` | The three case-study cards. |
| `agency.ts` | The six "How I work with agencies" points. |
| `background.ts` | The Background paragraphs. |
| `contact.ts` | The closing heading and body. |

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

There is a clearly marked, intentionally empty slot in `src/app/page.tsx`,
directly after Selected work. When two or three real quotes exist, add
`src/content/testimonials.ts` and a section component there.

## Design tokens

Defined once in the `@theme` block of `src/app/globals.css` — Tailwind v4 is
CSS-first, so there is no `tailwind.config.js`.

| Token | Value | Role |
| --- | --- | --- |
| `--color-ink` | `#0a0f1c` | Page ground. The navy-black of the harbour sky in the hero photographs. |
| `--color-surface` | `#131a2b` | Raised panels — work cards, the contact block. |
| `--color-haze` | `#8c97ad` | Secondary text and labels. 6.5:1 on ink. |
| `--color-paper` | `#f2f4f8` | Body and headings. 17:1 on ink. |
| `--color-brand` | `#facc15` | The existing site's accent, unchanged. 12.5:1 on ink. |
| `--color-ember` | `#f5a524` | Warmer amber. Proof-bar rule and the primary button's hover only. |

Type is **Rubik** (display: headings, proof figures, buttons, tags) and
**Open Sans** (body), both loaded as variable fonts through `next/font` and
self-hosted — one file each covers every weight, and nothing is requested from
Google at runtime.

The root font size is `112.5%` rather than a fixed `18px`, so `1rem` is 18px at
default browser settings but still scales for anyone who has raised their own.

### The proof bar is the one loud thing

`--text-figure` is the only step in the scale past 2.5rem. If you add a section,
keep it below that — the four numbers are the page's single typographic moment
and they stop working if something else competes.

## Structure

```
src/
  app/
    layout.tsx            fonts, metadata, <html>
    page.tsx              composes the seven sections (+ testimonials slot)
    globals.css           @theme tokens, base layer, hero backdrop animation
    opengraph-image.tsx   generated 1200x630 card, built at build time
    robots.ts  sitemap.ts
  components/
    home/                 one component per section
    icons.tsx             inline GitHub/LinkedIn marks
    ExternalLink.tsx      target=_blank + "(opens in a new tab)" for screen readers
  content/                all copy (see above)
  assets/                 Rubik subsets, used only by the OG image
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
- **The OG image fonts** in `src/assets/` are Rubik subset to basic Latin. If the
  card copy ever needs a glyph outside that range, regenerate them:

  ```bash
  UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/534.30 (KHTML, like Gecko) Version/5.1 Safari/534.30"
  curl -G -H "User-Agent: $UA" \
    --data-urlencode "family=Rubik:wght@700" \
    --data-urlencode "text=<the glyphs you need>" \
    https://fonts.googleapis.com/css2
  # then download the URL it prints — that UA gets WOFF, which Satori accepts
  ```

- `/blog` and `/blog/*` redirect permanently to `/` (`next.config.ts`). The blog
  left with Strapi; the redirects keep old inbound links from hard-404ing.

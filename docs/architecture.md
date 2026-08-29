# Architecture

How the site is put together, and the contracts that keep it that way.

## Shape

One statically rendered marketing page. Next.js 16 (App Router), React 19, Tailwind v4, TypeScript.
No CMS, no database, no client-side data fetching. Every route prerenders at build time:

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` |
| `/opengraph-image` | `src/app/opengraph-image.tsx` (1200×630 PNG, generated at build) |
| `/icon.svg` | `src/app/icon.svg` (App Router file convention, becomes the favicon) |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |

There is **no navigation and no header**. The page is one uninterrupted scroll. Section anchor ids
(`#services`, `#work`, `#agencies`, `#background`, `#contact`) exist but nothing links to them.

## Server components only

Every component in this repo is a server component. There is not one `"use client"` in the codebase
and adding the first one is a real architectural decision, not a detail.

`src/components/Analytics.tsx` is the only thing that ships executable JavaScript to the browser, and
it is *still* a server component: `next/script` needs `"use client"` only when you attach
`onLoad`/`onError` handlers, and it attaches none.

**Click tracking is delegated for exactly this reason.** Anchors are tagged with `data-ga-*`
attributes at build time, and one `click`/`auxclick` listener on `document` reads them back. An
`onClick` handler would make its component the site's first client component and pull its subtree
into the browser bundle. Delegation costs nothing here, because the script is already on the page and
the markup it reads is plain server-rendered HTML. The same reasoning rules out `sendGAEvent` from
`@next/third-parties`. See [operations.md](./operations.md#click-tracking).

## The content layer

All copy is typed TypeScript under `src/content/`. **Every section component reads from exactly one
content module and holds no copy of its own.** This is the contract that makes the whole
edit-commit-redeploy workflow work, and it is the easiest one to break by accident — a hard-coded
heading in a component looks harmless and quietly ends the arrangement.

See [content-and-voice.md](./content-and-voice.md) for what lives where and how to write it.

## Styling

`src/app/globals.css` is the only stylesheet. Tailwind v4 is CSS-first, so the design tokens live in
its `@theme` block and **there is no `tailwind.config.js`** — do not create one.

Roughly 97% of styling is Tailwind utilities in JSX. The exceptions are deliberate: the hero backdrop
classes (`.hero-backdrop`, `.hero-backdrop__frame`) and the base layer.

**Read [gotchas.md](./gotchas.md) before editing the base layer.** It contains a specificity trap that
fails silently.

## Layout primitives

Four components own the page's rhythm. Nothing else should reimplement what they do.

| Primitive | Owns |
| --- | --- |
| `Shell` | The one horizontal rhythm: 1180px max width, centred, `clamp(20px, 4vw, 48px)` gutter. |
| `Section` | Vertical padding and the 48px gap down to content. Exports `SECTION_PADDING` and `SECTION_PADDING_FLUSH`. |
| `SectionHeading` | The opener rhythm: mono eyebrow → 12px → `h2` → 24px → optional lead. |
| `CtaPair` | The page's only two actions, used in the hero and again in contact. |

`Section` handles the stacked case. Three sections put their heading in a left-hand column and build
their own `<section>` element instead — `AgencyTerms`, `Background`, `Contact`. **Those import
`SECTION_PADDING` rather than restating the padding**, so it stays declared in one place.

## Band sequence

Sections alternate between two full-bleed surfaces, and **that alternation is the only divider the
page has** — no section carries a rule. The order, from `page.tsx`:

```
night   hero
panel   proof bar
night   services + selected work   ← one band; SelectedWork uses `flush` to drop its top padding
panel   agencies
night   background
panel   contact
night   footer
```

Enabling the testimonial band inserts a panel directly before the agencies panel and collapses that
alternation. See [content-and-voice.md](./content-and-voice.md#testimonials).

## SEO machinery

| Concern | File |
| --- | --- |
| Title, description, canonical, OpenGraph, Twitter | `src/app/layout.tsx` |
| Social card | `src/app/opengraph-image.tsx` |
| JSON-LD (`Person` + `ProfessionalService`) | `src/components/home/StructuredData.tsx` |
| Sitemap, robots | `src/app/sitemap.ts`, `src/app/robots.ts` |

All of them derive their URLs from `SITE_URL` in `src/content/site.ts`, which is why the apex is the
canonical host — see [operations.md](./operations.md#domains).

## Config that must not be naively "fixed"

Each of these looks like an oversight and is not.

**`next.config.ts`**
- `pageExtensions: ["ts", "tsx", "md", "mdx"]` — required by the MDX wiring below. Removing `md`/`mdx`
  silently disables it.
- `experimental.inlineCss: true` — Tailwind output is ~7 KB gzipped and almost every visitor arrives
  cold from an email or LinkedIn link, so there is no cached stylesheet to benefit from and inlining
  removes a render-blocking round trip. Reverse it if the site ever grows enough pages for a shared
  cached stylesheet to pay for itself.
- `redirects()` sends `/blog` and `/blog/:path*` to `/`, permanently. The blog left with Strapi; these
  keep old inbound links from hard-404ing. Not dead code.
- `createMDX({})` — **the empty object is intentional.** Under Turbopack, remark/rehype plugins must be
  passed as strings; leaving the list empty avoids that until content actually needs it.

**MDX is wired but unused.** `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react` and `@types/mdx` are real
dependencies, `src/mdx-components.tsx` is a pass-through stub, and there are zero `.mdx` files. It is
scaffolding for a future `/work/[slug]`, not an accident.

**`eslint.config.mjs`** — `globalIgnores([...])` deliberately restates `eslint-config-next`'s own
defaults (`.next/**`, `out/**`, `build/**`, `next-env.d.ts`). Declaring `globalIgnores` *overrides*
them, so deleting the list would un-ignore `.next`.

**`pnpm-workspace.yaml`** — `ignoredBuiltDependencies: [sharp, unrs-resolver]` suppresses their
postinstall builds. This is fine on Vercel, which does its own image optimization, and `next/og` uses
WASM rather than sharp. It would matter if the site were ever self-hosted behind `next start`.

**`postcss.config.mjs`** — only `@tailwindcss/postcss`. No `autoprefixer`, no `tailwindcss` plugin
entry; that is the Tailwind v4 shape. Adding either would be wrong.

**`tsconfig.json`** — the `@/*` → `./src/*` alias is used throughout. `next-env.d.ts` is gitignored yet
appears in `include`; that is expected.

**`package.json`** — `next`, `react`, `react-dom` and `eslint-config-next` are pinned to exact versions
on purpose while everything else uses carets. There is no test or typecheck script; use
`npx tsc --noEmit`.

# Gotchas

Traps that fail silently, and values that are duplicated on purpose. Skim this before editing
`globals.css`, the hero, the OG image or anything analytics-related.

## `:where()` in the base layer will silently break headings

**`src/app/globals.css`.** The heading and anchor rules use plain element selectors — `h1, h2, h3…`
and `a` — not `:where(h1, h2, h3…)`. This looks like an inconsistency worth "modernizing". It is not.

Tailwind's preflight resets headings to `font-weight: inherit` and anchors to
`text-decoration: inherit`, both at **one point of specificity**. A `:where()` rule has zero
specificity and loses to it. Wrap those selectors in `:where()` and every heading on the site quietly
renders at 400 and every link loses its underline. Nothing errors.

The plain selectors win because they come later in the same `@layer base`. Utilities still beat them,
because the utilities layer is declared after the base layer — which is what `:where()` was there to
guarantee in the first place, and is unnecessary once real cascade layers are in play.

## The hero crossfade timing lives in two files

**`src/app/globals.css` and `src/components/home/HeroBackdrop.tsx`.** Both derive from the same three
numbers, and neither can be changed alone.

```
images = 2, hold = 10s, transition = 1s
cycle  = images × (hold + transition)         = 22s   → animation duration
stop 1 = transition / cycle                   = 5%    → fully faded in
stop 2 = (hold + transition) / cycle          = 50%   → begins fading out
stop 3 = stop 2 × 1.1                         = 55%   → fully faded out
```

`HeroBackdrop.tsx` computes each frame's `animationDelay` from `HOLD_SECONDS` and
`TRANSITION_SECONDS`; `globals.css` hard-codes the resulting duration and keyframe stops. Changing
either constant **or the number of images** means recomputing the stops by hand.

`FADE_IN_OFFSET_SECONDS` exists so the first frame starts already at full opacity rather than fading
up from nothing on load, which would show a bare scrim for the first second.

## The hero scrim depends on stacking order

**`src/app/globals.css`.** `.hero-backdrop::after` paints over the image frames, so it must stay
**after** them in source order. Move it above and the photographs cover the scrim, taking the headline
with them.

## The palette is duplicated in the OG image

**`src/app/opengraph-image.tsx`.** Satori resolves no CSS custom properties, so the card re-declares
`NIGHT`, `DAYLIGHT`, `HAZE`, `HAZE_DIM` and `SIGNAL` as hex constants. **A palette change has to touch
that file too**, and nothing will tell you if it does not — the card is generated at build time and
only looks wrong when someone shares a link.

## `CAL_URL` and `CTA_PRIMARY` must agree

**`src/content/site.ts`.** The CTA copy names the meeting length ("Book a 30-minute call") because in
this design the stated duration *is* the offer. If the Cal.com event changes length, both change. They
sit next to each other in the file for that reason.

## Section padding must be imported, never restated

**`src/components/home/Section.tsx`** exports `SECTION_PADDING` and `SECTION_PADDING_FLUSH`. The three
sections that build their own `<section>` element — `AgencyTerms`, `Background`, `Contact` — import
them. Restating the clamp inline is how vertical rhythm drifts one section at a time.

## The JSON-LD escape is load-bearing

**`src/components/home/StructuredData.tsx`.** The serialized payload runs `.replace(/</g, "\\u003c")`
before going into `dangerouslySetInnerHTML`. That is not cosmetic: without it, a `<` in any content
string could close the `<script>` tag early. Do not simplify it away while tidying the
`JSON.stringify` call.

## Analytics: four things that look wrong and are not

**`src/components/Analytics.tsx`.**

1. **The inline `<Script>` carries an `id`.** Next cannot track or optimize an inline script without
   one. Removing it is not a cleanup.
2. **There is no `"use client"`, and there must not be.** `next/script` needs it only for
   `onLoad`/`onError` handlers. Adding one would make this the site's first client component.
3. **The listener is a template string in the same file as `gaAttrs`.** The write half (the
   `data-ga-*` attributes) and the runtime half (the listener that reads them) have to agree on
   attribute names. They are deliberately adjacent so neither can be edited without seeing the other.
   `closest()` in that listener is load-bearing rather than defensive: every `ExternalLink` puts an
   `sr-only` span inside the anchor, so the click target is very often that span.
4. **The environment test is `VERCEL_ENV`, not `NODE_ENV`.** Swapping it would send real hits from a
   laptop running `pnpm start`. [operations.md](./operations.md#analytics) explains why.

`ExternalLink` spreads `{...rest}` **before** `href`, `target` and `rel` so those stay authoritative —
a caller cannot accidentally drop `target="_blank"` while passing analytics attributes.

One more trap sits in the GA4 dashboard rather than in this repo: the **Create an event** dialog
defaults to building a derived event off `page_view`, which would fabricate a conversion on every
visit. See [operations.md](./operations.md#the-default-that-would-silently-wreck-the-data).

## The privacy policy describes the code

**`src/content/privacy.ts`.** The `/privacy` page states what GA4 records, that the site sets no
cookies of its own and has no consent banner, that fonts and images are self-hosted, and that there
are no forms. Change `Analytics.tsx`, add a tracked event, a third-party script, a form or a consent
tool, and the page is false until that file changes too. Nothing will flag it. The same page is the
privacy policy registered with Google for Robi Second Brain, so its route (`PRIVACY_PATH` in
`src/content/site.ts`) cannot move without updating the Google Cloud consent screen.

## `priority` is deprecated on `next/image` in Next 16

Use `loading="eager"` with `fetchPriority="high"` instead, which is what the hero portrait and the
first backdrop frame do. See `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`.

## `rem` in a media query is not 18px

The page runs `html { font-size: 112.5% }`, so `1rem` is 18px in content. **Inside a media query,
`rem` resolves against the initial 16px instead**, so Tailwind's `md` and `lg` still mean 768px and
1024px. This is why the type scale is rescaled by 16/18 but the breakpoints are not — see
[design-system.md](./design-system.md#why-every-rem-in-the-scale-looks-odd).

## Do not restore `--spacing` to its default

It is overridden in the `@theme` block so Tailwind's numeric scale lands on the design's 8px grid at
this page's 18px root. Reverting it shifts every margin and padding on the site by 12.5%, everywhere,
at once. The derivation is in
[design-system.md](./design-system.md#why-every-rem-in-the-scale-looks-odd).

## `globalIgnores` overrides eslint's defaults

**`eslint.config.mjs`.** The list looks like redundant boilerplate and is not: declaring
`globalIgnores` *replaces* `eslint-config-next`'s own ignores rather than adding to them, so deleting
it un-ignores `.next` and lints the build output. See
[architecture.md](./architecture.md#config-that-must-not-be-naively-fixed).

## `AGENTS.md` is partly machine-generated

`next dev` rewrites the block between `<!-- BEGIN:nextjs-agent-rules -->` and
`<!-- END:nextjs-agent-rules -->` whenever it is missing or stale. Everything **outside** those
markers is preserved — `upsertAgentRulesBlock()` in
`node_modules/next/dist/server/lib/generate-agent-files.js` splices the block back as
`before + block + after`.

So: write project content below the `END` marker, never inside the block. If the block shows up as an
uncommitted change, commit it rather than reverting it — reverting only re-creates the diff on the
next `next dev`.

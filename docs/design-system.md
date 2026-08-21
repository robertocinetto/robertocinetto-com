# Design system — "Night Shift"

Everything about how the page looks. If you are changing colour, type, spacing or layout, this is the
file.

## Provenance

The visual source of truth is a Claude Design project called **"Night Shift — Roberto Cinetto Design
System"**, read through the `DesignSync` MCP tool (`list_files`, `get_file`). The project ID is not
committed to this public repo — ask the owner, or check agent memory.

The useful paths inside it: `readme.md` (brand voice and visual foundations, the single most
informative file), `tokens/*.css`, `templates/homepage/Homepage.dc.html` (the authoritative one-pager
this repo implements), and `ui_kits/website/`.

**Where this repo deliberately departs from it.** Do not "correct" these back:

| Departure | Why |
| --- | --- |
| The hero keeps two crossfading photographs | The design system contradicts itself: its `readme.md` says photographic backgrounds are "explicitly deleted" and the page has "exactly one image", while `Homepage.dc.html` keeps them. The template won, because it also matches what the site already did. |
| Em dashes reduced in page copy | An explicit owner preference that overrides the design system's stated punctuation rule. See [content-and-voice.md](./content-and-voice.md#punctuation). |
| Contact and footer links are plain text | The template renders them as text, so the inline SVG marks in `src/components/icons.tsx` went unused. The file is kept because restoring them is a one-line change. |

Its `tokens/typography.css` also asserts that this repo already uses Instrument Sans and JetBrains
Mono. It did not at the time — treat the design system's claims about repo state as unverified.

## Palette

Two backgrounds only, three text values, one accent. Defined in the `@theme` block of
`src/app/globals.css`. Contrast is against `--color-night` unless stated.

| Token | Value | Role |
| --- | --- | --- |
| `--color-night` | `#0e1522` | Page ground. Hero, services, work, background, footer. |
| `--color-panel` | `#17223a` | Raised bands — proof bar, work cards, agencies, contact. |
| `--color-panel-hi` | `#1e2b45` | Work-card hover. **Never a resting background.** |
| `--color-line` | `#2c3b54` | Every 1px border on the page. |
| `--color-daylight` | `#f2f5f8` | Headings, figures, focus ring. 15.4:1. |
| `--color-haze` | `#9fb0c6` | All body copy. 8.0:1 on night, 6.6:1 on panel. |
| `--color-haze-dim` | `#7c8ca3` | Mono labels and captions. 4.9:1 — **labels only, never paragraphs**. |
| `--color-signal` | `#facc15` | Top rule, primary button, `+` glyphs, `Result:`. |
| `--color-signal-hi` | `#ffda4d` | Primary-button hover only. |
| `--color-signal-active` | `#e0b400` | Primary-button press only. |

Body copy is `haze`, not `daylight`. Only headings and figures go bright, and that contrast is what
makes the proof figures read as the loud element.

The palette is duplicated as hex constants in `src/app/opengraph-image.tsx` — see
[gotchas.md](./gotchas.md).

## Type

**Instrument Sans** (400/500/600, never 700, never italic) for everything set in prose.
**JetBrains Mono** (400/700) for labels, captions, result lines, the email address and the proof
figures. Setting the numbers in mono is the central idea of the direction: a figure reads as a
measurement taken off a dashboard rather than a marketing claim.

Both load through `next/font` as variable fonts and are self-hosted, so nothing is requested from
Google at runtime.

`--text-figure` is the largest step in the scale (72px against the `h1`'s 58px) and the only one set
in mono. **If you add a section, keep it below that.** The four numbers are the page's single
typographic moment and they stop working the instant something else competes.

### Why every rem in the scale looks odd

`html` runs at `font-size: 112.5%`, so `1rem` is 18px at default browser settings while still scaling
for anyone who has raised their own. The design system authors its `clamp()` steps against a **16px**
root. So every rem in `--text-*` is the design's value **× 16/18**, which lands the *rendered* size
exactly on the design's specimens: `--text-h1` maxes at 58px, `--text-figure` at 72px, body 17→18px.

`--spacing` is `0.2222rem` (4px) for the same reason. That puts Tailwind's whole numeric spacing scale
back on the design's 8px grid: `p-2` is 8px, `p-6` is 24px, `p-12` is 48px.

Three things deliberately do **not** get rescaled:

- the `vw` terms inside each `clamp()`
- every px value (the 20→48px gutter, the 80→144px section padding, borders, card padding)
- **breakpoints** — `rem` inside a media query resolves against the initial 16px, not against `html`,
  so Tailwind's `md`/`lg` still mean 768px and 1024px

## Breakpoints

Tailwind's `md` (768) and `lg` (1024) are used where they fit. The design also has three of its own,
written as arbitrary variants:

| Width | What changes |
| --- | --- |
| 768 | CTAs stop stacking full-width |
| 900 | Hero scrim turns horizontal; testimonial quotes go two-up |
| 1024 | Proof bar goes four-up |
| 1100 | Contact splits into two columns |
| 1120 | Work cards move the stack and result into their own 340px column |

Test at 375 / 768 / 900 / 1024 / 1120 / 1440 — several of these are invisible at Tailwind's defaults.

## Motion

Exactly two animations exist on the whole site.

1. **Hero crossfade** — two photographs, 22s cycle, `globals.css` + `HeroBackdrop.tsx`. The timing is
   duplicated across both files; see [gotchas.md](./gotchas.md) before changing it.
2. **Proof bar fade-up** — `--animate-proof-rise`, 320ms ease-out, 12px, fires once on load. CSS-only,
   with no observer, which is what keeps `ProofBar` a server component.

`@media (prefers-reduced-motion: reduce)` kills all animation and transition globally and pins the
first hero frame to full opacity. Nothing else on the page moves: no scroll reveals, no parallax, no
counters, no hover transforms.

## The visual law

These are the rules the design system states outright. Breaking one is not a style preference, it is a
defect.

- **Radius is `0` everywhere.** The single exception in the entire system is the portrait: a circle
  with a 2px signal border.
- **No shadows at all.** Elevation is panel versus night, never blur. No inner shadows, no glows.
- **No gradients, transparency or `backdrop-filter`** anywhere outside the hero scrim. If something
  needs to sit above something else, it gets a panel.
- **Signal never exceeds about 2% of a rendered page**, and is never a resting link colour. There is
  no success/warning/error scale — this is a one-page instrument, not an application.
- **Hovers are colour only and instant.** There is deliberately no `transition` on interactive colour.
  Nothing scales, moves or gains a shadow.
- **Sans never goes past 600.**
- **`--color-haze-dim` is never used for paragraphs**, only labels and captions.
- **The focus ring is global and never removed**: `3px solid var(--color-daylight)`, `outline-offset:
  2px`, square. Daylight rather than signal because signal-on-signal is illegible.
- **Never two primary buttons side by side.** The page has one action.
- **Links** are underlined at rest in a `line`-coloured underline at 4px offset, and turn signal on
  hover, text and underline together. The two CTAs and the footer row opt out with `no-underline`.
- **No icons in content.** Where a list needs a marker it gets a typographic one — the signal `/` in
  front of each agency point, chosen because the points are not a sequence and must not be numbered.
- **No emoji, ever.** Not in copy, not as bullets.
- **Nothing is fixed or sticky.** No floating nav, no cookie bar, no scroll-to-top, no chat bubble.

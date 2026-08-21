# Content and voice

Where every string lives, and how to write one. The copy *is* the design here — the layout has no
ornament to hide behind, so getting the voice wrong stops the visual system working.

## Where the copy lives

All content is typed TypeScript under `src/content/`. There is no CMS: edit a file, commit, redeploy.

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
| `testimonials.ts` | The testimonial band. Off by default — see below. |

**Every section component reads from exactly one of these and holds no copy of its own.** A
hard-coded heading in a component looks harmless and quietly ends this arrangement.

Each section opens with a mono eyebrow above its `h2`, and both live in the content file. Eyebrows are
copy. They are **written in sentence case and shouted by CSS** — never typed in capitals.

Configuration is not copy. The GA4 measurement ID lives in `src/components/Analytics.tsx`, not here.

## Voice

First person singular. Present tense for what he does, past tense for what he shipped. Plain, senior,
unhurried: state the fact and let the reader draw the conclusion.

- **No superlatives.** Not one on the page. No "passionate", "cutting-edge", "world-class",
  "solutions", "leverage", "empower".
- **Never "we".** He is one person and the page says so.
- ***I*** for anything he did or will do. ***You*** for the working relationship, and it means the
  agency, not the end client. The end client is always "your client", third person, never addressed.
- **Sentence case everywhere**, including headings, buttons and eyebrows. Technology names keep their
  real casing: WordPress, WooCommerce, Next.js, Ruby on Rails, PostgreSQL, Sanity, ACF, LLM, RAG.
- **Headings are declarative, never questions** — with exactly one exception, the contact band ("Need
  senior capacity?"), the only place the page asks the reader for anything.
- **CTAs are specific and small-commitment.** "Book a 30-minute call" — the duration is the point.
  Never "Get started", "Let's talk", "Hire me".
- **No emoji. No exclamation marks. No urgency**, no "2 spots left", no social-proof counters, no
  badges, no "trusted by" logo wall. Availability is stated flatly.
- British-leaning spelling appears in the source ("anonymised"). Follow the existing copy rather than
  "correcting" it. Contractions are used freely.

## Punctuation

**Em dashes are used sparingly.** Prefer a comma where the dash is only holding an appositive or a
result clause. Prefer parentheses where the sentence already runs on commas and another one would
flatten the aside into a list item.

Keep a dash only where neither works — typically a comma-separated list followed by a turn to the
reader. The contact band is the one place on the page that still earns one:

> "If you've got a build that's too technical for your team, a deadline that slipped, or a product
> that needs AI features adding — tell me what you're working on."

This overrides the design system's own stated rule ("em dashes with spaces for asides"), and it
overrides its canonical proof-caption format. The captions are parenthesised here:
`quote requests (Italian manufacturing client)`.

Middle dots separate mono metadata rows: `North Vancouver, BC · Pacific time`.

The `<title>` and the JSON-LD service name keep their dashes; there the dash is a structural separator
sitting beside a pipe, not prose.

## Claims and numbers

Every figure in `proof.ts` and every `outcome` in `work.ts` is a **measured result from a shipped
project**. Do not add one without a real project behind it, and do not round a number up to make a row
look tidier. The proof bar carries its own disclaimer in mono — "Measured results from shipped
projects, not estimates." — and that line is not optional.

Numbers appear as `+200%` with a lower-case caption naming the metric and the client *type*.

**Work is anonymised on purpose: no client names, no logos, no screenshots.** Titles are concrete and
number-led ("130,000 products, multiple supplier APIs, one store"), never "Case study 01", never a
client name, never a vertical.

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

It renders immediately, with no route or component change. `WorkItem` is shaped so a `/work/[slug]`
route can consume the same objects later by adding a `body` field. **That route does not exist and
nothing links to these slugs.**

## Two couplings to respect

**`CAL_URL` and `CTA_PRIMARY` must agree on the duration.** The CTA names the length because in this
design the stated length *is* the offer. They sit next to each other in `site.ts` for that reason. If
the Cal.com event changes length, change both.

**`AgencyTerm.detail` carries its own leading punctuation and space.** It continues the sentence begun
by `lead`, which is rendered in a heavier face. Writing `detail: "agreed up front"` instead of
`", agreed up front"` produces `Fixed weekly capacityagreed up front`.

## Testimonials

The band is **built and switched off**. `src/content/testimonials.ts` exports `enabled: false` and an
empty `items` array; `page.tsx` renders the section only when that flag is true.

Nothing is invented in the meantime. The design ships this band with two example quotes behind a
`PLACEHOLDER COPY` badge; those are the design system's own placeholder text and were deliberately not
carried across. Inventing or paraphrasing a testimonial would undo the credibility the rest of the
page is built to establish.

To turn it on:

1. Add two or three attributable quotes — role, agency size and city, **never a personal name**.
2. Flip `enabled` to `true`.
3. **Give `<AgencyTerms />` `surface="night"` at the same time.** With the band visible its panel sits
   directly against the agencies panel, and the night/panel alternation that separates every other
   section disappears. See the band sequence in [architecture.md](./architecture.md#band-sequence).

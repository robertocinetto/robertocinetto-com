import { proofCaption, proofFigures, proofLabel } from "@/content/proof";

import Shell from "./Shell";

/**
 * The signature element, and the one place the page raises its voice.
 *
 * The figures are set in mono rather than the display face on purpose: a number
 * in a monospaced, tabular face reads as a measurement taken off a dashboard,
 * where the same number in a display face reads as a marketing claim. The digits
 * are daylight and only the `+` is signal — the accent marks the figure, it
 * doesn't become it.
 */
const ProofBar = () => (
  <section
    id="proof"
    aria-labelledby="proof-heading"
    className="bg-panel py-[clamp(56px,7vw,72px)]"
  >
    <Shell>
      {/* The one animation on the page besides the hero crossfade: a 320ms
          fade-up, fired once on load, CSS-only so this stays a server
          component. Disabled under prefers-reduced-motion. */}
      <div className="animate-proof-rise">
        <h2
          id="proof-heading"
          className="font-mono text-label font-normal uppercase text-haze-dim"
        >
          {proofLabel}
        </h2>

        <ul className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-10 lg:grid-cols-4">
          {proofFigures.map((figure) => (
            <li key={figure.label} className="flex flex-col gap-3.5">
              <p className="font-mono text-figure font-bold tabular-nums text-daylight">
                <span className="text-signal">{figure.prefix}</span>
                {figure.value}
                <span className="text-[0.48em] text-haze-dim">
                  {figure.unit}
                </span>
              </p>
              <p className="text-small">{figure.label}</p>
            </li>
          ))}
        </ul>

        {/* Not optional. A column of numbers this loud has to say where it got
            them, or it reads as decoration. */}
        <p className="mt-10 font-mono text-label tracking-[0.04em] normal-case text-haze-dim">
          {proofCaption}
        </p>
      </div>
    </Shell>
  </section>
);

export default ProofBar;

import { proofCaption, proofFigures } from "@/content/proof";

import Shell from "./Shell";

/* The prefix and unit are set well below the digits so the numbers themselves
   carry the weight — "+200%" should read as two-hundred, not as punctuation. */
const affixClassName = "align-baseline text-[0.42em] font-medium";

/**
 * The signature element. Nothing else on this page is allowed past 2.5rem.
 */
const ProofBar = () => (
  <section
    aria-labelledby="proof-heading"
    className="relative border-b border-brand/20 bg-surface/50"
  >
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-brand/30 via-ember to-brand/30"
    />
    <Shell>
      <div className="py-14 md:py-16">
        <h2 id="proof-heading" className="sr-only">
          Measured outcomes
        </h2>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {proofFigures.map((figure) => (
            <li key={figure.label}>
              <p className="font-display text-figure font-bold tabular-nums text-brand">
                <span className={affixClassName}>{figure.prefix}</span>
                {figure.value}
                <span className={affixClassName}>{figure.unit}</span>
              </p>
              <p className="mt-4 max-w-[24ch] text-sm leading-relaxed text-haze">
                {figure.label}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-12 text-sm text-haze">{proofCaption}</p>
      </div>
    </Shell>
  </section>
);

export default ProofBar;

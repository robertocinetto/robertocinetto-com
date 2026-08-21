import type { ReactNode } from "react";

import SectionHeading from "./SectionHeading";
import Shell from "./Shell";

/* Section padding is declared here and nowhere else, so specificity can't drift.
   The three sections that put their heading in a left-hand column build their
   own <section> element, but they import these rather than restating them. */
export const SECTION_PADDING = "py-[clamp(80px,10vw,144px)]";

/** Drops the top padding, so a band reads as one block with the one above it. */
export const SECTION_PADDING_FLUSH = "pb-[clamp(80px,10vw,144px)]";

interface SectionProps {
  id: string;
  label?: string;
  heading: string;
  lead?: string;
  /** Bands alternate night/panel, and that alternation *is* the divider. */
  surface?: "night" | "panel";
  flush?: boolean;
  children: ReactNode;
}

/** The stacked case: heading block, then 48px, then content. */
const Section = ({
  id,
  label,
  heading,
  lead,
  surface = "night",
  flush = false,
  children,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={`${surface === "panel" ? "bg-panel" : ""} ${
      flush ? SECTION_PADDING_FLUSH : SECTION_PADDING
    }`}
  >
    <Shell>
      <SectionHeading
        id={`${id}-heading`}
        label={label}
        heading={heading}
        lead={lead}
      />
      <div className="mt-12">{children}</div>
    </Shell>
  </section>
);

export default Section;

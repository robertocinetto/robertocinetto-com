import type { ReactNode } from "react";

interface SectionHeadingProps {
  id: string;
  /** Mono eyebrow. Written sentence case in the content file, shouted by CSS. */
  label?: string;
  heading: ReactNode;
  /** Optional short lead under the heading. Keep it under two lines. */
  lead?: ReactNode;
  /** `large` is the contact band's bigger h2. */
  size?: "default" | "large";
}

/**
 * The fixed opener for every section: label -> 12 -> h2 -> 24 -> lead. Putting
 * it in one place is the only way to stop that rhythm drifting section by
 * section; the 48px down to the content itself is declared by <Section>.
 */
const SectionHeading = ({
  id,
  label,
  heading,
  lead,
  size = "default",
}: SectionHeadingProps) => (
  <>
    {label ? (
      <p className="font-mono text-label uppercase text-haze-dim">{label}</p>
    ) : null}
    <h2
      id={id}
      className={`${label ? "mt-3" : ""} ${
        size === "large" ? "text-h2-contact" : "text-h2"
      }`}
    >
      {heading}
    </h2>
    {lead ? <p className="mt-6 max-w-[44ch] text-prose">{lead}</p> : null}
  </>
);

export default SectionHeading;

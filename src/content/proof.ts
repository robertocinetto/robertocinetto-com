export interface ProofFigure {
  /** Rendered small, so the digits carry the visual weight. */
  prefix: string;
  /** The digits. This is the thing the page is built around. */
  value: string;
  /** Rendered small, alongside the prefix. */
  unit: string;
  label: string;
}

/**
 * Every figure here is a measured result from a shipped project.
 * Do not add a figure without a real project behind it.
 */
export const proofFigures: ProofFigure[] = [
  {
    prefix: "+",
    value: "200",
    unit: "%",
    label: "quote requests (Italian manufacturing client)",
  },
  {
    prefix: "+",
    value: "80",
    unit: "%",
    label: "quote requests (franchise network)",
  },
  {
    prefix: "+",
    value: "65",
    unit: "%",
    label: "sales (custom CRM built around the client’s sales workflow)",
  },
  { prefix: "+", value: "40", unit: "%", label: "sales (e-commerce UX rebuild)" },
];

export const proofCaption =
  "Measured results from shipped projects, not estimates.";

/** Mono eyebrow above the figures. Sentence case here, uppercased by CSS. */
export const proofLabel = "Outcomes";

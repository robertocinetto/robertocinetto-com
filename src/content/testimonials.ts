export interface Testimonial {
  /** The quote itself, without surrounding quotation marks. */
  quote: string;
  /** The speaker's role — never a personal name. */
  role: string;
  /** Agency type, size and city: "design agency, 20 people (Toronto)". */
  org: string;
}

/**
 * Off until real quotes exist.
 *
 * The design ships this band with two spec-authored example quotes behind a
 * "PLACEHOLDER COPY" badge; both the design system's readme and its UI kit are
 * explicit that those must not go live. Inventing or paraphrasing a testimonial
 * would undo the credibility the rest of this page is built to establish, so the
 * section is built and switched off instead.
 *
 * To turn it on: add two or three attributable quotes to `items` (role, agency
 * size and city, never a personal name) and flip `enabled` to true. One other
 * thing has to change at the same time: with this band visible its panel sits
 * directly against the agencies panel, and the night/panel alternation that
 * separates every other section disappears. Give `<AgencyTerms />` a night
 * surface when you do. Full steps in docs/content-and-voice.md.
 */
export const testimonials = {
  enabled: false,
  label: "What agencies say",
  heading: "Two references, on request",
  items: [] as Testimonial[],
} as const;

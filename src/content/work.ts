export interface WorkItem {
  /**
   * Stable identifier. A future `/work/[slug]` route can consume these objects
   * as-is; add a `body` field for the long-form case study when that route is
   * built. No route exists yet — nothing links to these slugs.
   */
  slug: string;
  title: string;
  /** The verbatim card paragraph. Opens with the context, then the substance. */
  summary: string;
  stack: string[];
  outcome: string;
}

/**
 * Anonymized on purpose: no client names, no logos, no screenshots.
 * Every outcome below is a real measured number.
 */
export const workItems: WorkItem[] = [
  {
    slug: "multi-supplier-catalogue-aggregation",
    title: "130,000 products, multiple supplier APIs, one store",
    summary:
      "An e-commerce business needed to sell the combined catalogues of several suppliers, each with a different API, format and update schedule. I built the aggregation and normalization pipeline in Python, mapped it into WooCommerce, and kept it in sync automatically. Then I rebuilt the storefront UX around how people actually searched it.",
    stack: ["WordPress", "WooCommerce", "Python", "MySQL", "Linode"],
    outcome:
      "+40% sales from the UX work, +65% from the campaign work that followed.",
  },
  {
    slug: "integrated-quote-request-system",
    title: "A quote system that tripled enquiries",
    summary:
      "A manufacturer’s site described their products well but gave visitors no way to ask for a price without picking up the phone. I designed and built an integrated quote-request flow around their actual product configuration, wired into how the sales team already worked.",
    stack: ["Ruby on Rails", "JavaScript"],
    outcome: "+200% quote requests, their primary business goal.",
  },
  {
    slug: "custom-crm-around-sales-workflow",
    title: "Custom CRM built around an existing sales workflow",
    summary:
      "Rather than fitting the client into off-the-shelf software, I spent time mapping how their sales process actually ran and built a CRM around it — so the tool matched the work instead of the other way round.",
    stack: ["Ruby on Rails", "PostgreSQL"],
    outcome: "+65% sales.",
  },
];

export const workSection = {
  label: "Selected work",
  heading: "Three builds, anonymised",
} as const;

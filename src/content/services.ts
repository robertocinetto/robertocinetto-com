export interface Service {
  title: string;
  description: string;
}

/**
 * Three services of equal weight. Deliberately unnumbered — they are not a
 * sequence and nobody buys them in order.
 */
export const services: Service[] = [
  {
    title: "Custom WordPress & block architecture",
    description:
      "Gutenberg and ACF block systems built properly (server-rendered first paint, no page-builder dependency, maintainable by whoever inherits them). WooCommerce at scale, including Memberships, Subscriptions and LMS platforms.",
  },
  {
    title: "Headless & migrations",
    description:
      "Moving WordPress sites to Next.js and headless CMSs like Sanity, and migrating legacy content and product data into structures that hold up. Including large, messy imports.",
  },
  {
    title: "AI integration",
    description:
      "RAG assistants over your own documents, LLM data and content pipelines, and workflow automation added to existing web products (including local models where privacy matters).",
  },
];

export const servicesSection = {
  label: "What I do",
  heading: "Three kinds of work",
} as const;

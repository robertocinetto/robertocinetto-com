import type { MetadataRoute } from "next";

import { PRODUCTS_PATH, SITE_URL } from "@/content/site";

/* Two indexable pages. /privacy is left out on purpose: it is noindex (see its
   metadata), and listing a noindex URL here would send contradictory signals.
   Add entries when /work/[slug] or /agencies land. */
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
  {
    url: `${SITE_URL}${PRODUCTS_PATH}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  },
];

export default sitemap;

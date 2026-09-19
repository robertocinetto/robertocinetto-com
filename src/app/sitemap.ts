import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

/* One indexable page. /privacy is left out on purpose: it is noindex (see its
   metadata), and listing a noindex URL here would send contradictory signals.
   Add entries when /work/[slug] or /agencies land. */
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;

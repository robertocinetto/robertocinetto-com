import type { MetadataRoute } from "next";

import { SITE_URL } from "@/content/site";

/* One page. Add entries here when /work/[slug] or /agencies land. */
const sitemap = (): MetadataRoute.Sitemap => [
  {
    url: SITE_URL,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 1,
  },
];

export default sitemap;

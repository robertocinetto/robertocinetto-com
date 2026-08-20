import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    /* Tailwind output for this site is ~7 KB gzipped, and almost every visitor
       arrives cold from a cold email or a LinkedIn link — so there is no cached
       stylesheet to benefit from. Inlining it removes a render-blocking round
       trip on the only page that exists. Reverse this if the site ever grows
       enough pages for a shared cached stylesheet to pay for itself. */
    inlineCss: true,
  },
  async redirects() {
    return [
      // The blog moved out with Strapi. Keep the old URLs from hard-404ing.
      { source: "/blog", destination: "/", permanent: true },
      { source: "/blog/:path*", destination: "/", permanent: true },
    ];
  },
};

/* No remark/rehype plugins yet: under Turbopack they have to be passed as
   strings, so leaving the list empty avoids that until content actually needs it. */
const withMDX = createMDX({});

export default withMDX(nextConfig);

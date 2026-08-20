import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
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

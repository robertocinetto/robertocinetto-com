import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    /* The two hero photographs are the only real weight on the page, and until
       this block existed Next 16's default served them as WebP only — so the
       "AVIF/WebP" claim in HeroBackdrop was aspirational rather than true.
       Measured on the frames actually shipped: the LCP image drops 136 KB -> 70 KB
       and the whole image payload 228 KB -> 123 KB, well past the ~20% the Next
       docs quote, because these are large photographic JPEGs. Order matters: the
       first format matching the request's Accept header wins, so WebP sits behind
       AVIF as the fallback and older browsers still get exactly what they got
       before. Encoding a variant the first time is slower; after that it caches. */
    formats: ["image/avif", "image/webp"],
  },
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

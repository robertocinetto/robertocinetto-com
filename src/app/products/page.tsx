import type { Metadata } from "next";

import ProductCard from "@/components/home/ProductCard";
import { SECTION_PADDING, SECTION_PADDING_FLUSH } from "@/components/home/Section";
import Shell from "@/components/home/Shell";
import SiteFooter from "@/components/home/SiteFooter";
import { products, productsPage } from "@/content/products";
import { NAME, PRODUCTS_PATH } from "@/content/site";

/* The title picks up the root layout's `%s | Roberto Cinetto` template. The
   canonical is restated for the same reason /privacy restates it: metadata
   merges shallowly, so it would otherwise inherit "/". */
export const metadata: Metadata = {
  title: productsPage.heading,
  description: productsPage.description,
  alternates: { canonical: PRODUCTS_PATH },
};

/* Same opener as /privacy (name eyebrow, h1, lead) inside Shell, then the
   products as the same cards the home page shows, with their facts added, all
   in one night band. Off-site links go through ExternalLink. */
const Products = () => (
  <>
    <main>
      <header aria-labelledby="products-heading" className={SECTION_PADDING}>
        <Shell>
          <div className="flex max-w-[66ch] flex-col gap-7">
            <p className="font-mono text-label uppercase text-haze-dim">
              {NAME}
            </p>
            <h1 id="products-heading" className="text-h1">
              {productsPage.heading}
            </h1>
            <p className="max-w-[52ch] text-lead">{productsPage.lead}</p>
            <p className="max-w-[52ch] text-prose">{productsPage.intro}</p>
          </div>
        </Shell>
      </header>

      <section
        aria-label={productsPage.heading}
        className={SECTION_PADDING_FLUSH}
      >
        <Shell>
          <div className="flex flex-col gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                detailed
                as="h2"
              />
            ))}
          </div>
        </Shell>
      </section>
    </main>
    <SiteFooter />
  </>
);

export default Products;

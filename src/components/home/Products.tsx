import { PRODUCTS_PATH } from "@/content/site";
import { homeProducts, products } from "@/content/products";

import ProductCard from "./ProductCard";
import { SECTION_PADDING_FLUSH } from "./Section";
import SectionHeading from "./SectionHeading";
import Shell from "./Shell";

/* Shares the night band with the background above it, hence the flush padding:
   the page's night/panel alternation has no room for a band of its own here, so
   this one reads as the second half of "who I am". Heading column on the left,
   cards on the right, the same split Background and the agencies band use. */
const Products = () => (
  <section
    id="products"
    aria-labelledby="products-heading"
    className={SECTION_PADDING_FLUSH}
  >
    <Shell>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-x-16 gap-y-12">
        <div>
          <SectionHeading
            id="products-heading"
            label={homeProducts.label}
            heading={homeProducts.heading}
            lead={homeProducts.lead}
          />
          <p className="mt-8 font-mono text-caption">
            <a href={PRODUCTS_PATH}>{homeProducts.linkLabel}</a>
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Shell>
  </section>
);

export default Products;

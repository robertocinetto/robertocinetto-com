import type { Metadata } from "next";
import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import Section, { SECTION_PADDING } from "@/components/home/Section";
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

/* Same opener as /privacy (name eyebrow, h1, lead) inside Shell, then one band
   per product, starting on panel under the night opener and alternating, so the
   page ends the way the home page does, with the night footer after it. Links
   are plain anchors; off-site ones go through ExternalLink. */
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
          </div>
        </Shell>
      </header>

      {products.map((product, index) => (
        <Section
          key={product.id}
          id={product.id}
          label={product.label}
          heading={product.name}
          lead={product.description}
          surface={index % 2 === 0 ? "panel" : "night"}
        >
          <div className="flex flex-col gap-12">
            <div className="flex items-center gap-6">
              <Image
                src={product.icon.src}
                alt={product.icon.alt}
                width={72}
                height={72}
                className="size-[72px] shrink-0"
              />
              <p className="font-mono text-caption text-haze-dim">
                {product.byline}
              </p>
            </div>

            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-12">
              {product.facts.map((fact) => (
                <li key={fact.title} className="flex flex-col gap-3.5">
                  <h3 className="text-h3">{fact.title}</h3>
                  <p className="text-body">{fact.detail}</p>
                </li>
              ))}
            </ul>

            <p className="border-t border-line pt-6 font-mono text-caption text-haze-dim">
              <ExternalLink href={product.site.href}>
                {product.site.label}
              </ExternalLink>
              <span className="mx-3" aria-hidden="true">
                ·
              </span>
              <a href={`mailto:${product.supportEmail}`}>
                {product.supportEmail}
              </a>
            </p>
          </div>
        </Section>
      ))}
    </main>
    <SiteFooter />
  </>
);

export default Products;

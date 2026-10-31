import Image from "next/image";

import ExternalLink from "@/components/ExternalLink";
import type { Product } from "@/content/products";

interface ProductCardProps {
  product: Product;
  /** Home shows the short card; /products adds the facts and the support line. */
  detailed?: boolean;
  /** Heading level: h3 under the home section's h2, h2 on /products. */
  as?: "h2" | "h3";
}

/* One product, as a flat panel rectangle like a work card: no border, no
   radius, no shadow. Shared by the home band and /products so the two can't
   drift apart. The tag reuses the stack-chip look from the work cards. */
const ProductCard = ({
  product,
  detailed = false,
  as: Heading = "h3",
}: ProductCardProps) => (
  <article
    id={detailed ? product.id : undefined}
    aria-labelledby={`${product.id}-name`}
    className="flex flex-col gap-8 bg-panel p-[clamp(24px,3vw,40px)]"
  >
    <div className="flex items-start gap-5">
      <Image
        src={product.icon.src}
        alt={product.icon.alt}
        width={72}
        height={72}
        className="size-14 shrink-0 min-[480px]:size-[72px]"
      />
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <Heading id={`${product.id}-name`} className="text-h3-work">
            {product.name}
          </Heading>
          <span className="border border-line px-[9px] py-[5px] font-mono text-label uppercase text-haze-dim">
            {product.label}
          </span>
        </div>
        <p className="max-w-[52ch] text-body">{product.description}</p>
      </div>
    </div>

    {detailed ? (
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-10">
        {product.facts.map((fact) => (
          <li key={fact.title} className="flex flex-col gap-3.5">
            <h3 className="text-h3">{fact.title}</h3>
            <p className="text-body">{fact.detail}</p>
          </li>
        ))}
      </ul>
    ) : null}

    <p className="border-t border-line pt-4 font-mono text-caption text-haze-dim">
      <ExternalLink href={product.site.href}>{product.site.label}</ExternalLink>
      {detailed ? (
        <>
          <span className="mx-3" aria-hidden="true">
            ·
          </span>
          <a href={`mailto:${product.supportEmail}`}>{product.supportEmail}</a>
        </>
      ) : null}
    </p>
  </article>
);

export default ProductCard;

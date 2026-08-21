import type { ComponentProps, ReactNode } from "react";

/* Widened to the full anchor prop set so callers can pass the data-ga-*
   attributes from `gaAttrs`. The spread comes first in the JSX below, which
   keeps target/rel authoritative — the point of this component is that they are
   never forgotten. */
interface ExternalLinkProps extends ComponentProps<"a"> {
  href: string;
  children: ReactNode;
}

/** Opens in a new tab, and says so for anyone who can't see that happen. */
const ExternalLink = ({ href, children, ...rest }: ExternalLinkProps) => (
  <a {...rest} href={href} target="_blank" rel="noreferrer">
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export default ExternalLink;

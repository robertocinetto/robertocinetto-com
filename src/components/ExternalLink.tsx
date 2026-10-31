import type { ComponentProps, ReactNode } from "react";

/* Widened to the full anchor prop set so callers can pass the data-ga-*
   attributes from `gaAttrs`. The spread comes first in the JSX below, which
   keeps target authoritative, and rel always carries noopener noreferrer (a caller's own rel, such as "me", is added to it) — the point of this component is that they are
   never forgotten. */
interface ExternalLinkProps extends ComponentProps<"a"> {
  href: string;
  children: ReactNode;
}

/** Opens in a new tab, and says so for anyone who can't see that happen. */
const ExternalLink = ({ href, children, rel, ...rest }: ExternalLinkProps) => (
  <a
    {...rest}
    href={href}
    target="_blank"
    rel={["noopener", "noreferrer", rel].filter(Boolean).join(" ")}
  >
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export default ExternalLink;

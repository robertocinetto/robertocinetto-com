import type { ReactNode } from "react";

interface ExternalLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

/** Opens in a new tab, and says so for anyone who can't see that happen. */
const ExternalLink = ({ href, className, children }: ExternalLinkProps) => (
  <a href={href} target="_blank" rel="noreferrer" className={className}>
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

export default ExternalLink;

import ExternalLink from "@/components/ExternalLink";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAME } from "@/content/site";

import Shell from "./Shell";

/* Footer links drop the underline and sit in mono haze-dim — quieter than the
   links in the body of the page, which keep theirs. */
const linkClassName = "no-underline text-haze-dim hover:text-signal";

const SiteFooter = () => (
  <footer className="pt-8 pb-12">
    <Shell>
      <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3 border-t border-line pt-6 font-mono text-caption text-haze-dim">
        <span className="text-haze">{NAME}</span>
        <span>© {new Date().getFullYear()}</span>
        <a href={`mailto:${EMAIL}`} className={linkClassName}>
          {EMAIL}
        </a>
        <ExternalLink href={GITHUB_URL} className={linkClassName}>
          GitHub
        </ExternalLink>
        <ExternalLink href={LINKEDIN_URL} className={linkClassName}>
          LinkedIn
        </ExternalLink>
      </div>
    </Shell>
  </footer>
);

export default SiteFooter;

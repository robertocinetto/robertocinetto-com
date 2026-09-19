import { gaAttrs } from "@/components/Analytics";
import ExternalLink from "@/components/ExternalLink";
import {
  EMAIL,
  LINKEDIN_URL,
  NAME,
  PRIVACY_LABEL,
  PRIVACY_PATH,
} from "@/content/site";

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
        <a
          href={`mailto:${EMAIL}`}
          className={linkClassName}
          {...gaAttrs("email_click", "footer")}
        >
          {EMAIL}
        </a>
        <ExternalLink
          href={LINKEDIN_URL}
          className={linkClassName}
          {...gaAttrs("social_click", "footer")}
        >
          LinkedIn
        </ExternalLink>
        {/* A plain anchor, not next/link: the site has no client-side routing
            and this link doesn't justify adding it. Untracked on purpose, since
            it is neither a lead nor a social click. It also puts the policy one
            click from the home page, which Google's OAuth homepage requirements
            ask for now that this site is Robi Second Brain's listed homepage. */}
        <a href={PRIVACY_PATH} className={linkClassName}>
          {PRIVACY_LABEL}
        </a>
      </div>
    </Shell>
  </footer>
);

export default SiteFooter;

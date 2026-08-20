import ExternalLink from "@/components/ExternalLink";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, NAME } from "@/content/site";

import Shell from "./Shell";

const linkClassName = "transition-colors hover:text-brand";

const SiteFooter = () => (
  <footer className="border-t border-paper/10">
    <Shell>
      <div className="flex flex-col gap-5 py-10 text-sm text-haze sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {NAME}
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-2">
          <li>
            <a href={`mailto:${EMAIL}`} className={linkClassName}>
              {EMAIL}
            </a>
          </li>
          <li>
            <ExternalLink href={GITHUB_URL} className={linkClassName}>
              GitHub
            </ExternalLink>
          </li>
          <li>
            <ExternalLink href={LINKEDIN_URL} className={linkClassName}>
              LinkedIn
            </ExternalLink>
          </li>
        </ul>
      </div>
    </Shell>
  </footer>
);

export default SiteFooter;

import ExternalLink from "@/components/ExternalLink";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { contact } from "@/content/contact";
import { GITHUB_URL, LINKEDIN_URL } from "@/content/site";

import CtaPair from "./CtaPair";
import SectionHeading from "./SectionHeading";
import Shell from "./Shell";

const socialClassName =
  "inline-flex items-center gap-2 transition-colors hover:text-brand";

/* Sits on a raised panel rather than open ink: it is the end of the page and the
   only thing being asked for, so it should read as a block to act on rather than
   trail off. No form — agency people email, and a form is one more thing that can
   quietly stop delivering. */
const Contact = () => (
  <section
    id="contact"
    aria-labelledby="contact-heading"
    className="pt-16 pb-20 md:pt-24 md:pb-28"
  >
    <Shell>
      <div className="rounded-lg bg-surface p-8 md:grid md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-x-14 md:p-12">
        <div>
          <SectionHeading id="contact-heading">{contact.heading}</SectionHeading>
          <p className="max-w-[38rem] text-[0.95rem] leading-relaxed text-paper/80 md:text-base">
            {contact.body}
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm text-haze">
            <li>
              <ExternalLink href={GITHUB_URL} className={socialClassName}>
                <GithubIcon />
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink href={LINKEDIN_URL} className={socialClassName}>
                <LinkedinIcon />
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </div>

        <div className="mt-9 md:mt-0">
          <CtaPair stacked />
        </div>
      </div>
    </Shell>
  </section>
);

export default Contact;

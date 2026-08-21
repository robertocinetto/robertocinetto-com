import { gaAttrs } from "@/components/Analytics";
import ExternalLink from "@/components/ExternalLink";
import { contact } from "@/content/contact";
import { GITHUB_URL, LINKEDIN_URL } from "@/content/site";

import CtaPair from "./CtaPair";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./Section";
import Shell from "./Shell";

/* A full-bleed panel band rather than a card on open night: it is the end of the
   page and the only thing being asked for, so it should read as a block to act
   on rather than trail off. The one heading on the page that asks a question.
   No form — agency people email, and a form is one more thing that can quietly
   stop delivering. */
const Contact = () => (
  <section
    id="contact"
    aria-labelledby="contact-heading"
    className={`bg-panel ${SECTION_PADDING}`}
  >
    <Shell>
      <div className="grid items-start gap-x-16 gap-y-10 min-[1100px]:grid-cols-2">
        <div className="flex flex-col gap-5">
          <SectionHeading
            id="contact-heading"
            heading={contact.heading}
            size="large"
          />
          <p className="max-w-[56ch] text-prose">{contact.body}</p>
        </div>

        <div className="flex flex-col gap-6 pt-2">
          <CtaPair location="contact" />
          <ul className="flex gap-6 text-small">
            <li>
              <ExternalLink
                href={GITHUB_URL}
                {...gaAttrs("social_click", "contact")}
              >
                GitHub
              </ExternalLink>
            </li>
            <li>
              <ExternalLink
                href={LINKEDIN_URL}
                {...gaAttrs("social_click", "contact")}
              >
                LinkedIn
              </ExternalLink>
            </li>
          </ul>
        </div>
      </div>
    </Shell>
  </section>
);

export default Contact;

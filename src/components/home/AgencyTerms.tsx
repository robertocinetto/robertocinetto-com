import { agencyTerms } from "@/content/agency";

import Section from "./Section";

/* Each point gets a gold left rule: these read as terms of engagement, and the
   rule is the closest typographic equivalent of a clause marker. */
const AgencyTerms = () => (
  <Section id="agencies" heading="How I work with agencies">
    <ul className="grid gap-x-12 gap-y-7 md:grid-cols-2">
      {agencyTerms.map((term) => (
        <li
          key={term.lead}
          className="border-l-2 border-brand/35 pl-5 text-[0.95rem] leading-relaxed text-paper/80"
        >
          <strong className="font-display font-medium text-paper">
            {term.lead}
          </strong>
          {term.detail}
        </li>
      ))}
    </ul>
  </Section>
);

export default AgencyTerms;

import { agencySection, agencyTerms } from "@/content/agency";

import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./Section";
import Shell from "./Shell";

/* Each point is marked with a signal `/` rather than a number or a rule: these
   are terms of engagement, not a sequence, and numbering them would imply an
   order that isn't there. */
const AgencyTerms = () => (
  <section
    id="agencies"
    aria-labelledby="agencies-heading"
    className={`bg-panel ${SECTION_PADDING}`}
  >
    <Shell>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,360px),1fr))] items-start gap-x-16 gap-y-12">
        <div>
          <SectionHeading
            id="agencies-heading"
            label={agencySection.label}
            heading={agencySection.heading}
            lead={agencySection.lead}
          />
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-10 gap-y-7">
          {agencyTerms.map((term) => (
            <li key={term.lead} className="flex gap-3.5 text-body">
              <span aria-hidden="true" className="font-mono text-signal">
                /
              </span>
              <p>
                <strong className="font-semibold text-daylight">
                  {term.lead}
                </strong>
                {term.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Shell>
  </section>
);

export default AgencyTerms;

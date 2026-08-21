import { backgroundParagraphs, backgroundSection } from "@/content/background";

import SectionHeading from "./SectionHeading";
import { SECTION_PADDING } from "./Section";
import Shell from "./Shell";

const Background = () => (
  <section
    id="background"
    aria-labelledby="background-heading"
    className={SECTION_PADDING}
  >
    <Shell>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-x-16 gap-y-8">
        <div>
          <SectionHeading
            id="background-heading"
            label={backgroundSection.label}
            heading={backgroundSection.heading}
          />
        </div>

        <div className="flex max-w-[66ch] flex-col gap-6 text-prose">
          {backgroundParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </Shell>
  </section>
);

export default Background;

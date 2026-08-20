import { backgroundParagraphs } from "@/content/background";

import Section from "./Section";

const Background = () => (
  <Section id="background" heading="Background">
    <div className="flex max-w-[38rem] flex-col gap-5 text-[0.95rem] leading-relaxed text-paper/80">
      {backgroundParagraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </Section>
);

export default Background;

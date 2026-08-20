import type { ReactNode } from "react";

import SectionHeading from "./SectionHeading";
import Shell from "./Shell";

interface SectionProps {
  id: string;
  heading: string;
  children: ReactNode;
}

const Section = ({ id, heading, children }: SectionProps) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="py-16 md:py-24">
    <Shell>
      <SectionHeading id={`${id}-heading`}>{heading}</SectionHeading>
      {children}
    </Shell>
  </section>
);

export default Section;

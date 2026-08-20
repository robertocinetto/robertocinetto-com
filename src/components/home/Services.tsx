import { services } from "@/content/services";

import Section from "./Section";

/* Deliberately unnumbered and equal-width: these are three things I do, not
   three steps of a process, and numbering them would imply an order that
   doesn't exist. Subgrid keeps the descriptions on a shared baseline even when
   one title wraps to two lines — equal weight has to look equal. */
const Services = () => (
  <Section id="services" heading="What I do">
    <ul className="grid gap-10 md:grid-cols-3 md:grid-rows-[auto_auto] md:gap-x-9 md:gap-y-3">
      {services.map((service) => (
        <li
          key={service.title}
          className="md:row-span-2 md:grid md:grid-rows-subgrid"
        >
          <h3 className="text-h3 font-medium">{service.title}</h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-paper/80 md:mt-0">
            {service.description}
          </p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;

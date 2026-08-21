import { services, servicesSection } from "@/content/services";

import Section from "./Section";

/* Deliberately unnumbered and equal-width: these are three things I do, not
   three steps of a process, and numbering them would imply an order that
   doesn't exist. */
const Services = () => (
  <Section
    id="services"
    label={servicesSection.label}
    heading={servicesSection.heading}
  >
    <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-12">
      {services.map((service) => (
        <li key={service.title} className="flex flex-col gap-3.5">
          <h3 className="text-h3">{service.title}</h3>
          <p className="text-body">{service.description}</p>
        </li>
      ))}
    </ul>
  </Section>
);

export default Services;

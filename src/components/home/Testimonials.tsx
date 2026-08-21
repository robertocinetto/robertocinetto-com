import { testimonials } from "@/content/testimonials";

import Section from "./Section";

/**
 * Off by default — see `src/content/testimonials.ts` for why. The band exists so
 * that turning it on is a one-line change once real, attributable quotes are in
 * hand; nothing about the layout has to be designed again at that point.
 */
const Testimonials = () => (
  <Section
    id="testimonials"
    label={testimonials.label}
    heading={testimonials.heading}
    surface="panel"
  >
    <div className="grid gap-8 min-[900px]:grid-cols-2 min-[900px]:gap-x-12">
      {testimonials.items.map((testimonial) => (
        <blockquote
          key={testimonial.quote}
          className="flex flex-col gap-5 border-t-[3px] border-signal pt-6"
        >
          <p className="max-w-[46ch] text-lead text-daylight">
            {testimonial.quote}
          </p>
          <footer className="font-mono text-caption text-haze-dim">
            {testimonial.role}
            <br />
            <span className="text-haze">{testimonial.org}</span>
          </footer>
        </blockquote>
      ))}
    </div>
  </Section>
);

export default Testimonials;

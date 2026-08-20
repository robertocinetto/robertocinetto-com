import { workItems } from "@/content/work";

import Section from "./Section";

/* Stacked full-width rows rather than a card grid: each item is a short case
   with a beginning and an end, so reading order is vertical. On desktop the
   outcome is pulled into its own column so an agency lead scanning for evidence
   can read just that column straight down the page. */
const SelectedWork = () => (
  <Section id="work" heading="Selected work">
    <div className="flex flex-col gap-5">
      {workItems.map((item) => (
        <article
          key={item.slug}
          className="rounded-lg bg-surface p-7 md:grid md:grid-cols-[minmax(0,1fr)_15rem] md:gap-x-10 md:p-9"
        >
          <div>
            <h3 className="max-w-[34ch] text-h3 font-medium md:text-xl">
              {item.title}
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-paper/80">
              {item.summary}
            </p>

            <ul aria-label="Stack" className="mt-6 flex flex-wrap gap-2">
              {item.stack.map((tool) => (
                <li
                  key={tool}
                  className="rounded border border-paper/15 px-2.5 py-1 font-display text-[0.78rem] text-haze"
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-7 border-t border-paper/10 pt-5 md:mt-0 md:border-t-0 md:border-l md:border-brand/25 md:pt-1 md:pl-8">
            <span className="block font-display text-label uppercase text-brand">
              Result
            </span>
            <span className="mt-2 block text-[0.95rem] leading-relaxed">
              {item.outcome}
            </span>
          </p>
        </article>
      ))}
    </div>
  </Section>
);

export default SelectedWork;

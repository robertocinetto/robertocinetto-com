import { workItems, workSection } from "@/content/work";

import Section from "./Section";

/* Shares the night band with the services above it — hence `flush`, which drops
   this section's top padding so the two read as one block.

   Stacked full-width rows rather than a card grid: each item is a short case
   with a beginning and an end, so reading order is vertical. From 1120px the
   stack and the outcome move into their own column, so an agency lead scanning
   for evidence can read that column straight down the page. A card here is a
   flat panel rectangle — no border, no radius, no shadow. */
const SelectedWork = () => (
  <Section
    id="work"
    label={workSection.label}
    heading={workSection.heading}
    flush
  >
    <div className="flex flex-col gap-8">
      {workItems.map((item) => (
        <article
          key={item.slug}
          className="grid items-start gap-8 bg-panel p-[clamp(24px,3vw,40px)] hover:bg-panel-hi min-[1120px]:grid-cols-[minmax(0,1fr)_340px] min-[1120px]:gap-x-12"
        >
          <div className="flex flex-col gap-4.5">
            <h3 className="text-h3-work">{item.title}</h3>
            <p className="max-w-[70ch] text-body">{item.summary}</p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2.5">
              <p
                id={`${item.slug}-stack`}
                className="font-mono text-label-sm uppercase text-haze-dim"
              >
                Stack
              </p>
              <ul
                aria-labelledby={`${item.slug}-stack`}
                className="flex flex-wrap gap-2"
              >
                {item.stack.map((tool) => (
                  <li
                    key={tool}
                    className="border border-line px-[9px] py-[5px] font-mono text-label normal-case tracking-normal"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>

            <p className="border-t border-line pt-4 font-mono text-result text-daylight">
              <span className="text-signal">Result:</span> {item.outcome}
            </p>
          </div>
        </article>
      ))}
    </div>
  </Section>
);

export default SelectedWork;

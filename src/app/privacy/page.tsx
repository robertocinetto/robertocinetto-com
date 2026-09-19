import type { Metadata } from "next";
import { Fragment } from "react";

import ExternalLink from "@/components/ExternalLink";
import Section, { SECTION_PADDING } from "@/components/home/Section";
import Shell from "@/components/home/Shell";
import SiteFooter from "@/components/home/SiteFooter";
import { privacy, privacySections, type Paragraph } from "@/content/privacy";
import { NAME, PRIVACY_PATH } from "@/content/site";

/* The title picks up the root layout's `%s | Roberto Cinetto` template.

   noindex, and deliberately absent from the sitemap: the site is a one-page
   pitch, and a policy page ranking for his name helps nobody. robots.txt still
   allows it, because a crawler has to fetch the page to see the noindex, and
   Google's OAuth review has to fetch it at all.

   The canonical has to be restated. Metadata merges shallowly per segment, so
   without it this page inherits the root layout's canonical of "/", which
   would tell search engines it is a copy of the home page. openGraph and
   twitter are left to inherit: overriding either drops every field not
   restated, and a shared link to a noindex page can preview as the site's
   own card. */
export const metadata: Metadata = {
  title: privacy.heading,
  description: privacy.description,
  alternates: { canonical: PRIVACY_PATH },
  robots: { index: false },
};

/* en-CA's long form is "September 18, 2026". The ISO string parses as UTC
   midnight, so the time zone is pinned to UTC: formatted in Pacific time, as on
   a laptop here, it would print the day before. */
const effectiveDate = new Intl.DateTimeFormat("en-CA", {
  dateStyle: "long",
  timeZone: "UTC",
}).format(new Date(privacy.effectiveDate));

/* Links in the policy are data in the content file, so no words live here.
   Anything off-site goes through ExternalLink (new tab, announced). mailto and
   same-site links stay plain anchors, never next/link: there is no client-side
   routing on this site, and adding it for a page this rarely visited would
   ship a router to the home page too. The address is set in mono, as it is
   everywhere else on the site. */
const Runs = ({ paragraph }: { paragraph: Paragraph }) =>
  typeof paragraph === "string"
    ? paragraph
    : paragraph.map((run, index) => {
        if (typeof run === "string") {
          return <Fragment key={index}>{run}</Fragment>;
        }
        if (run.href.startsWith("https://")) {
          return (
            <ExternalLink key={index} href={run.href}>
              {run.text}
            </ExternalLink>
          );
        }
        return (
          <a
            key={index}
            href={run.href}
            className={run.href.startsWith("mailto:") ? "font-mono" : undefined}
          >
            {run.text}
          </a>
        );
      });

/* Built from the home page's own pieces so it reads as the same site. The
   opener mirrors the hero (name eyebrow, h1, lead, mono hairline) without the
   backdrop or portrait. Sections then alternate panel and night exactly as the
   home page's bands do, because that alternation is the only divider the
   design allows; starting on panel under the night opener, three sections end
   on panel and the night footer follows, the same close as the home page. */
const Privacy = () => (
  <>
    <main>
      <header aria-labelledby="privacy-heading" className={SECTION_PADDING}>
        <Shell>
          <div className="flex max-w-[66ch] flex-col gap-7">
            <p className="font-mono text-label uppercase text-haze-dim">
              {NAME}
            </p>

            <h1 id="privacy-heading" className="text-h1">
              {privacy.heading}
            </h1>

            <p className="max-w-[52ch] text-lead">
              <Runs paragraph={privacy.intro} />
            </p>

            <p className="mt-3 border-t border-line pt-4 font-mono text-caption text-haze-dim">
              {privacy.effectiveLabel}{" "}
              <time dateTime={privacy.effectiveDate} className="text-haze">
                {effectiveDate}
              </time>
            </p>
          </div>
        </Shell>
      </header>

      {privacySections.map((section, index) => (
        <Section
          key={section.id}
          id={section.id}
          label={section.label}
          heading={section.heading}
          surface={index % 2 === 0 ? "panel" : "night"}
        >
          <div className="flex max-w-[66ch] flex-col gap-12">
            {section.topics.map((topic, topicIndex) => (
              <div
                key={topic.heading ?? topicIndex}
                className="flex flex-col gap-3.5"
              >
                {topic.heading ? (
                  <h3 className="text-h3">{topic.heading}</h3>
                ) : null}
                <div className="flex flex-col gap-6 text-prose">
                  {topic.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>
                      <Runs paragraph={paragraph} />
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </main>
    <SiteFooter />
  </>
);

export default Privacy;

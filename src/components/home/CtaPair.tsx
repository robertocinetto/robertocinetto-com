import { gaAttrs, type GaLocation } from "@/components/Analytics";
import ExternalLink from "@/components/ExternalLink";
import { CAL_URL, CTA_PRIMARY, EMAIL } from "@/content/site";

/* Radius 0, and deliberately no transition: hovers in this system are colour
   only and instant. Below `md` both actions stack full-width at 48px min height
   so they stay thumb-sized. */
const baseClassName =
  "inline-flex min-h-12 w-full items-center justify-center no-underline md:w-auto";

/* Never two primaries side by side — this is the page's one action. */
const primaryClassName = `${baseClassName} bg-signal px-[26px] py-4 text-cta font-semibold text-night hover:bg-signal-hi hover:text-night active:bg-signal-active`;

/* The secondary CTA is literally the email address in mono, not a word like
   "Contact". At 320px that 26-character unbreakable string plus the design's
   22px padding leaves no slack at all, so the padding eases off below `sm`. */
const secondaryClassName = `${baseClassName} border border-line px-4 py-[15px] font-mono text-small text-daylight hover:border-haze hover:text-daylight sm:px-[22px]`;

interface CtaPairProps {
  stacked?: boolean;
  /* Required, because the whole reason to track these is telling the hero copy
     from the closing band. Both renders are otherwise byte-identical. */
  location: GaLocation;
}

/**
 * The page's only two actions, repeated verbatim in the hero and in contact.
 * `stacked` is for the contact band, where they sit in a narrow side column.
 */
const CtaPair = ({ stacked = false, location }: CtaPairProps) => (
  <div
    className={
      stacked
        ? "flex flex-col gap-3"
        : "flex flex-col gap-3 md:flex-row md:flex-wrap"
    }
  >
    <ExternalLink
      href={CAL_URL}
      className={primaryClassName}
      {...gaAttrs("book_call_click", location)}
    >
      {CTA_PRIMARY}
    </ExternalLink>
    <a
      href={`mailto:${EMAIL}`}
      className={secondaryClassName}
      {...gaAttrs("email_click", location)}
    >
      {EMAIL}
    </a>
  </div>
);

export default CtaPair;

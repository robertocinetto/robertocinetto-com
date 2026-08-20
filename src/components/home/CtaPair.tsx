import ExternalLink from "@/components/ExternalLink";
import { CAL_URL, CTA_PRIMARY, EMAIL } from "@/content/site";

/* Full-width and a notch smaller below `sm`: "roberto@robertocinetto.com" is a
   single unbreakable 26-character label, and at 18px it is wider than a 320px
   viewport can hold once padding is added — which blew the hero grid column
   past the edge of the screen. */
const baseClassName =
  "inline-flex w-full items-center justify-center rounded-md px-4 py-3.5 font-display text-[0.9rem] font-medium transition-colors sm:w-auto sm:px-6 sm:text-base";

const primaryClassName = `${baseClassName} bg-brand text-ink hover:bg-ember`;

const secondaryClassName = `${baseClassName} border border-paper/25 text-paper hover:border-brand hover:text-brand`;

/**
 * The page's only two actions, repeated verbatim in the hero and in contact.
 * `stacked` is for the contact panel, where they sit in a narrow side column.
 */
const CtaPair = ({ stacked = false }: { stacked?: boolean }) => (
  <div
    className={
      stacked ? "flex flex-col gap-3" : "flex flex-col gap-3 sm:flex-row sm:flex-wrap"
    }
  >
    <ExternalLink href={CAL_URL} className={primaryClassName}>
      {CTA_PRIMARY}
    </ExternalLink>
    <a href={`mailto:${EMAIL}`} className={secondaryClassName}>
      {EMAIL}
    </a>
  </div>
);

export default CtaPair;

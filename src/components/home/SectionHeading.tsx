/**
 * Each section is tagged by a short gold rule the width of a dash rather than
 * ruled off by a full-width hairline — these are a sequence of claims, not
 * columns of a newspaper.
 */
const SectionHeading = ({ id, children }: { id: string; children: string }) => (
  <>
    <span aria-hidden="true" className="block h-0.5 w-10 bg-brand" />
    <h2 id={id} className="mt-6 mb-8 text-h2 font-medium md:mb-11">
      {children}
    </h2>
  </>
);

export default SectionHeading;

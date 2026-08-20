import type { ReactNode } from "react";

/** The one horizontal rhythm on the page. Every section uses it. */
const Shell = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-full max-w-5xl px-6 md:px-10">{children}</div>
);

export default Shell;

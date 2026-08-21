import type { ReactNode } from "react";

/** The one horizontal rhythm on the page: 1180px, centred, 20 -> 48px gutter. */
const Shell = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-full max-w-page px-[clamp(20px,4vw,48px)]">
    {children}
  </div>
);

export default Shell;

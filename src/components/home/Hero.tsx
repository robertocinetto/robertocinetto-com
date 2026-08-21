import Image from "next/image";

import { hero } from "@/content/hero";
import { NAME } from "@/content/site";

import CtaPair from "./CtaPair";
import HeroBackdrop from "./HeroBackdrop";
import Shell from "./Shell";

import portrait from "../../../public/roberto-cinetto-picture.jpeg";

/* No navigation sits above this: the page is one uninterrupted scroll, so the
   hero is the first thing under the signal rule and has to carry the whole
   introduction on its own. */
const Hero = () => (
  <header
    aria-labelledby="hero-heading"
    className="relative isolate flex min-h-[clamp(560px,84vh,900px)] items-center overflow-hidden pt-[clamp(72px,9vw,128px)] pb-[clamp(80px,9vw,128px)]"
  >
    <HeroBackdrop />
    <Shell>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-12">
        <div className="flex flex-col gap-7">
          <p className="font-mono text-label uppercase text-haze-dim">{NAME}</p>

          <h1 id="hero-heading" className="max-w-[26ch] text-h1">
            {hero.heading}
          </h1>

          <p className="max-w-[52ch] text-lead">{hero.subhead}</p>

          <div className="mt-1">
            <CtaPair location="hero" />
          </div>

          <p className="mt-3 border-t border-line pt-4 font-mono text-caption text-haze-dim">
            {hero.location} · <span className="text-haze">{hero.availability}</span>
          </p>
        </div>

        <div className="flex justify-end">
          <Image
            src={portrait}
            alt={hero.portraitAlt}
            sizes="260px"
            /* The only rounded corner in the entire system, and the only
               photograph the design allows outside the backdrop. */
            className="size-[260px] rounded-full border-2 border-signal object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </Shell>
  </header>
);

export default Hero;

import Image from "next/image";

import { hero } from "@/content/hero";

import CtaPair from "./CtaPair";
import HeroBackdrop from "./HeroBackdrop";
import Shell from "./Shell";

import portrait from "../../../public/roberto-cinetto-picture.jpeg";

const Hero = () => (
  <section
    aria-labelledby="hero-heading"
    className="relative isolate overflow-hidden"
  >
    <HeroBackdrop />
    <Shell>
      <div className="grid gap-x-14 gap-y-10 pt-14 pb-16 md:grid-cols-[minmax(0,1fr)_auto] md:pt-20 md:pb-20">
        <div className="max-w-[40rem] md:col-start-1 md:row-start-1">
          <h1 id="hero-heading" className="text-h1 font-bold">{hero.heading}</h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-paper/80">
            {hero.subhead}
          </p>
          <div className="mt-9">
            <CtaPair />
          </div>
        </div>

        <div className="md:col-start-2 md:row-start-1">
          <Image
            src={portrait}
            alt={hero.portraitAlt}
            sizes="(min-width: 768px) 180px, 126px"
            className="size-[7rem] rounded-full object-cover ring-2 ring-brand md:size-[10rem]"
            priority
          />
        </div>

        <p className="max-w-[38rem] text-sm leading-relaxed text-haze md:col-start-1 md:row-start-2">
          {hero.availability}
        </p>
      </div>
    </Shell>
  </section>
);

export default Hero;

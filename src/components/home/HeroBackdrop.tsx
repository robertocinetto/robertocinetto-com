import Image from "next/image";

import bgFrontendDeveloper from "../../../public/roberto-cinetto-vancouver-frontend-developer.jpg";
import bgWebDeveloper from "../../../public/roberto-cinetto-vancouver-web-developer.jpg";

const images = [bgFrontendDeveloper, bgWebDeveloper];

/* Seconds each image is held, plus the crossfade between them. Changing either
   of these — or the number of images — means updating the animation duration and
   keyframe stops in globals.css to match. */
const HOLD_SECONDS = 10;
const TRANSITION_SECONDS = 1;

/* Starts the first frame already at full opacity instead of fading it in from
   nothing on load, which would show a bare scrim for the first second. */
const FADE_IN_OFFSET_SECONDS =
  (HOLD_SECONDS + TRANSITION_SECONDS) * images.length * 0.05;

/**
 * Night Vancouver behind the hero only. Served through next/image so the two
 * photographs ship as responsive AVIF/WebP rather than the ~510 KB of raw JPEG
 * the previous CSS `background-image` approach loaded.
 */
const HeroBackdrop = () => (
  <div className="hero-backdrop absolute inset-0 -z-10" aria-hidden="true">
    {images.map((image, index) => (
      <div
        key={image.src}
        className="hero-backdrop__frame"
        style={{
          animationDelay: `${
            index * (HOLD_SECONDS + TRANSITION_SECONDS) - FADE_IN_OFFSET_SECONDS
          }s`,
        }}
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
          loading={index === 0 ? "eager" : "lazy"}
          fetchPriority={index === 0 ? "high" : "auto"}
        />
      </div>
    ))}
  </div>
);

export default HeroBackdrop;

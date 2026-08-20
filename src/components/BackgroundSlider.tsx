import bgFrontendDeveloper from "../../public/roberto-cinetto-vancouver-frontend-developer.jpg";
import bgWebDeveloper from "../../public/roberto-cinetto-vancouver-web-developer.jpg";

const images = [bgFrontendDeveloper, bgWebDeveloper];

/* Seconds each image is held, plus the crossfade between them. Changing either
   of these — or the number of images — means updating the animation duration and
   keyframe stops in globals.css to match. */
const HOLD_SECONDS = 10;
const TRANSITION_SECONDS = 1;

const BackgroundSlider = () => (
  <div className="background-slider" aria-hidden="true">
    {images.map((image, index) => (
      <figure
        key={image.src}
        style={{
          backgroundImage: `url(${image.src})`,
          animationDelay: `${index * (HOLD_SECONDS + TRANSITION_SECONDS)}s`,
        }}
      />
    ))}
  </div>
);

export default BackgroundSlider;

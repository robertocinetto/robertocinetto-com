import Image from "next/image";

import BackgroundSlider from "@/components/BackgroundSlider";
import ContactLinks from "@/components/ContactLinks";

import portrait from "../../public/roberto-cinetto-picture.jpeg";

const Home = () => (
  <header>
    <div className="px-10 border-t-4 border-brand mx-auto min-h-screen grid place-items-center">
      <div className="flex flex-col justify-center items-center w-full md:w-1/2 md:max-w-2xl mx-auto">
        <div className="w-full px-5 py-5 md:py-10 -mt-20 rounded-md backdrop-blur-xs bg-white/5 border border-white/5">
          <div className="flex-initial w-2/5 md:w-1/4 mx-auto rounded-full border-2 border-brand overflow-hidden my-6 md:my-16 xl:mb-0">
            <Image
              src={portrait}
              alt="Roberto Cinetto portrait"
              sizes="100vw"
              className="w-full h-auto"
              priority
            />
          </div>
          {/* Empty, but its my-10/px-10 spacing is load-bearing for the card layout. */}
          <div className="flex-initial w-full mx-auto md:w-3/4 text-center xl:text-left my-10 xl:mb-0 px-10" />
          <ContactLinks />
        </div>
      </div>
    </div>
    <BackgroundSlider />
  </header>
);

export default Home;

import AgencyTerms from "@/components/home/AgencyTerms";
import Background from "@/components/home/Background";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import SelectedWork from "@/components/home/SelectedWork";
import Services from "@/components/home/Services";
import SiteFooter from "@/components/home/SiteFooter";
import StructuredData from "@/components/home/StructuredData";
import Testimonials from "@/components/home/Testimonials";
import { testimonials } from "@/content/testimonials";

/* Bands alternate night and panel all the way down, and that alternation is the
   only divider the page has — night (hero), panel (proof), night (services and
   work, which share one band), panel (agencies), night (background), panel
   (contact), night (footer). The testimonial slot is off, which keeps that
   sequence intact; turning it on puts a panel band directly before the agencies
   panel, so give the agencies band `surface="night"` at the same time. */
const Home = () => (
  <>
    <main>
      <Hero />
      <ProofBar />
      <Services />
      <SelectedWork />
      {testimonials.enabled ? <Testimonials /> : null}
      <AgencyTerms />
      <Background />
      <Contact />
    </main>
    <SiteFooter />
    <StructuredData />
  </>
);

export default Home;

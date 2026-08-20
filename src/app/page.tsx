import AgencyTerms from "@/components/home/AgencyTerms";
import Background from "@/components/home/Background";
import Contact from "@/components/home/Contact";
import Hero from "@/components/home/Hero";
import ProofBar from "@/components/home/ProofBar";
import SelectedWork from "@/components/home/SelectedWork";
import Services from "@/components/home/Services";
import SiteFooter from "@/components/home/SiteFooter";
import StructuredData from "@/components/home/StructuredData";

const Home = () => (
  <>
    <main>
      <Hero />
      <ProofBar />
      <Services />
      <SelectedWork />

      {/* ------------------------------------------------------------------
          TESTIMONIALS SLOT — intentionally empty.

          No testimonials have been collected yet, and inventing or paraphrasing
          one would undo the credibility the rest of this page is built to
          establish. When two or three real quotes exist, add
          `src/content/testimonials.ts` and a <Testimonials /> section here —
          this is the right position for it, directly after the case studies.
          ------------------------------------------------------------------ */}

      <AgencyTerms />
      <Background />
      <Contact />
    </main>
    <SiteFooter />
    <StructuredData />
  </>
);

export default Home;

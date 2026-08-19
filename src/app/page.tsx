import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { BrandStatement } from "@/components/BrandStatement";
import { SelectedWork } from "@/components/SelectedWork";
import { Services } from "@/components/Services";
import { WhyArcwell } from "@/components/WhyArcwell";
import { Process } from "@/components/Process";
import { IntroOffer } from "@/components/IntroOffer";
import { About } from "@/components/About";
import { FinalCTA } from "@/components/FinalCTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BrandStatement />
        <SelectedWork />
        <Services />
        <WhyArcwell />
        <Process />
        <IntroOffer />
        <About />
        <FinalCTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

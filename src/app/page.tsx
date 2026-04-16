import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import Hero from "@/components/sections/Hero";
import Pain from "@/components/sections/Pain";
import Services from "@/components/sections/Services";
import WhatYouGet from "@/components/sections/WhatYouGet";
import Pricing from "@/components/sections/Pricing";
import Process from "@/components/sections/Process";
import Benefits from "@/components/sections/Benefits";
import Guarantee from "@/components/sections/Guarantee";
import CTA from "@/components/sections/CTA";
import Founder from "@/components/sections/Founder";

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Navbar />
      <main>
        <Hero />
        <Pain />
        <Services />
        <WhatYouGet />
        <Pricing />
        <Process />
        <Benefits />
        <Guarantee />
        <CTA />
        <Founder />
      </main>
      <Footer />
    </>
  );
}

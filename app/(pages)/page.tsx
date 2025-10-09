import React from "react";
import Proof from "@/components/Home/Proof";
import Hero from "@/app/components/Home/Hero";
import Header from "@/components/layout/Header";
import Modules from "@/components/Home/Modules";
import Footer from "@/components/layout/Footer";
import KeyValue from "@/components/Home/KeyValue";
import Resources from "@/components/Home/Resources";
import HowItWorks from "@/components/Home/HowItWorks";
import ImastTrial from "../components/Home/ImastTrial";
import CaseStudies from "@/components/Home/CaseStudies";
import CallToAction from "@/components/Home/CallToAction";
import ImpactSection from "@/components/Home/ImpactSection";
import ImastAISection from "@/components/Home/ImastAISection";
import WhyChooseIMAST from "@/components/Home/WhyChooseIMAST";
import EcosystemSection from "@/components/Home/EcosystemSection";
import ImastImpactSection from "@/components/Home/ImastImpactSection";
import ImastValuesSection from "@/components/Home/ImastValuesSection";
import ImastPromoSection from "@/components/Home/ImastPromoSection";
import LogoSlider from "../components/Home/LogoSlider";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <KeyValue />
      <EcosystemSection />
      <ImastImpactSection />
      <ImastPromoSection />
      <ImastValuesSection />
      <Modules />
      <ImastAISection />
      <ImpactSection />
      <HowItWorks />
      <ImastTrial />
      <Proof />
      <WhyChooseIMAST />
      <CaseStudies />
      <Resources />
      <CallToAction />
      <Footer />
    </>
  );
}

export default HomePage;

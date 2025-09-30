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
import WhyChooseIMAST from "@/components/Home/WhyChooseIMAST";
import EcosystemSection from "@/components/Home/EcosystemSection";
import ImastImpactSection from "@/components/Home/ImastImpactSection";
import ImastValuesSection from "@/components/Home/ImastValuesSection";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <KeyValue />
      <EcosystemSection />
      <ImastImpactSection />
      <ImastValuesSection />
      <Modules />
      <HowItWorks />
      <ImastTrial />
      <Proof />
      <WhyChooseIMAST />
      <CaseStudies />
      <CallToAction />
      <Resources />
      <Footer />
    </>
  );
}

export default HomePage;

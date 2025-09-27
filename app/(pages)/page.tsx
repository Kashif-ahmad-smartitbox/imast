import React from "react";
import Proof from "@/components/Home/Proof";
import Header from "@/components/layout/Header";
import Modules from "@/components/Home/Modules";
import Footer from "@/components/layout/Footer";
import KeyValue from "@/components/Home/KeyValue";
import DeepDive from "@/components/Home/DeepDive";
import UseCases from "@/components/Home/UseCases";
import Resources from "@/components/Home/Resources";
import HowItWorks from "@/components/Home/HowItWorks";
import Hero from "@/app/components/PreviousDesign/Hero";
import CaseStudies from "@/components/Home/CaseStudies";
import CallToAction from "@/components/Home/CallToAction";
import WhyChooseIMAST from "@/components/Home/WhyChooseIMAST";
import EcosystemSection from "@/components/Home/EcosystemSection";
import PartnersIntegrations from "@/components/Home/PartnersIntegrations";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <KeyValue />
      <EcosystemSection />
      <Modules />
      <HowItWorks />
      <UseCases />
      <Proof />
      <DeepDive />
      <WhyChooseIMAST />
      <CaseStudies />
      <PartnersIntegrations />
      <Resources />
      <CallToAction />
      <Footer />
    </>
  );
}

export default HomePage;

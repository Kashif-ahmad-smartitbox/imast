import React from "react";
import Header from "../components/layout/Header";
import Hero from "../components/Hero";
import HeroCentered from "../components/HeroCentered";
import BenefitsSection from "../components/BenefitsSection";
import EcosystemSection from "../components/EcosystemSection";
import StatsSection from "../components/StatsSection";
import ModulesSection from "../components/ModulesSection";
import MediaPressSection from "../components/MediaPressSection";

function HomePage() {
  return (
    <>
      <Header />
      <Hero />
      <HeroCentered
      //  backgroundImage="https://cdn.pixabay.com/collection/thumbnail/2025/06/05/island-2722471_1280.jpg"
      />
      <BenefitsSection />
      <EcosystemSection />
      <StatsSection />
      <ModulesSection initiallySelectedId="pos" />
      <MediaPressSection />
    </>
  );
}

export default HomePage;

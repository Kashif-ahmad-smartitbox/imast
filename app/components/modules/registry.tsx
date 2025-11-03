"use client";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";

const Hero = dynamic(() => import("@/app/components/Home/Hero"), { ssr: true });
const Header = dynamic(() => import("@/app/components/layout/Header"), {
  ssr: true,
});
const Footer = dynamic(() => import("@/app/components/layout/Footer"), {
  ssr: true,
});
const Modules = dynamic(() => import("@/components/Home/Modules"), {
  ssr: false,
});
const Proof = dynamic(() => import("@/components/Home/Proof"), { ssr: false });
const KeyValue = dynamic(() => import("@/components/Home/KeyValue"), {
  ssr: false,
});
const Resources = dynamic(() => import("@/components/Home/Resources"), {
  ssr: false,
});
const HowItWorks = dynamic(() => import("@/components/Home/HowItWorks"), {
  ssr: false,
});
const ImastTrial = dynamic(() => import("@/components/Home/ImastTrial"), {
  ssr: false,
});
const CaseStudies = dynamic(() => import("@/components/Home/CaseStudies"), {
  ssr: false,
});
const CallToAction = dynamic(() => import("@/components/Home/CallToAction"), {
  ssr: false,
});
const ImpactSection = dynamic(() => import("@/components/Home/ImpactSection"), {
  ssr: false,
});
const ImastAISection = dynamic(
  () => import("@/components/Home/ImastAISection"),
  { ssr: false }
);
const WhyChooseIMAST = dynamic(
  () => import("@/components/Home/WhyChooseIMAST"),
  { ssr: false }
);
const EcosystemSection = dynamic(
  () => import("@/components/Home/EcosystemSection"),
  { ssr: false }
);
const ImastImpactSection = dynamic(
  () => import("@/components/Home/ImastImpactSection"),
  { ssr: false }
);
const ImastValuesSection = dynamic(
  () => import("@/components/Home/ImastValuesSection"),
  { ssr: false }
);
const ImastPromoSection = dynamic(
  () => import("@/components/Home/ImastPromoSection"),
  { ssr: false }
);

const HeroHeader = dynamic(() => import("@/components/common/HeroHeader"), {
  ssr: false,
});

const SolutionHeroHeader = dynamic(
  () => import("@/components/common/SolutionHeroHeader"),
  {
    ssr: false,
  }
);

const ServicesHeroHeader = dynamic(
  () => import("@/components/common/ServicesHeroHeader"),
  {
    ssr: false,
  }
);

const StoriesShow = dynamic(() => import("@/components/common/StoriesShow"), {
  ssr: false,
});

const Blogs = dynamic(() => import("@/components/pages/Blogs"), {
  ssr: false,
});

const Contact = dynamic(() => import("@/components/common/ContactSection"), {
  ssr: false,
});

const MapComponent = dynamic(() => import("@/components/common/MapComponent"), {
  ssr: false,
});

const WhyWeExistSection = dynamic(
  () => import("@/components/sections/WhyWeExistSection"),
  {
    ssr: false,
  }
);

const WordsFromFounder = dynamic(
  () => import("@/components/sections/WordsFromFounder"),
  {
    ssr: false,
  }
);

const MeetTheMaestros = dynamic(
  () => import("@/components/sections/MeetTheMaestros"),
  {
    ssr: false,
  }
);

const LifeVideoSection = dynamic(
  () => import("@/components/sections/LifeVideoSection"),
  {
    ssr: false,
  }
);

const ImastWhyChooseSection = dynamic(
  () => import("@/components/sections/ImastWhyChooseSection"),
  {
    ssr: false,
  }
);

const ImastIntegrationsSection = dynamic(
  () => import("@/components/sections/ImastIntegrationsSection"),
  {
    ssr: false,
  }
);

const CareerSection = dynamic(
  () => import("@/components/sections/CareerSection"),
  {
    ssr: false,
  }
);

export type ModuleComponentProps = {
  data: any;
};

const registry: Record<string, ComponentType<ModuleComponentProps>> = {
  header: Header,
  hero: Hero,
  modules: Modules,
  proof: Proof,
  keyvalue: KeyValue,
  resources: Resources,
  howitworks: HowItWorks,
  imasttrial: ImastTrial,
  casestudies: CaseStudies,
  cta: CallToAction,
  impact: ImpactSection,
  imastai: ImastAISection,
  whychooseimast: WhyChooseIMAST,
  ecosystem: EcosystemSection,
  imastimpact: ImastImpactSection,
  imastvalues: ImastValuesSection,
  imastpromo: ImastPromoSection,
  footer: Footer,
  heroheader: HeroHeader,
  solutionheroheader: SolutionHeroHeader,
  servicesheroheader: ServicesHeroHeader,
  storiesshow: StoriesShow,
  blogs: Blogs,
  contact: Contact,
  map: MapComponent,
  whyweexistsection: WhyWeExistSection,
  showfounder: WordsFromFounder,
  meetthemaestros: MeetTheMaestros,
  lifevideosection: LifeVideoSection,
  imastwhychoose2: ImastWhyChooseSection,
  integrationssection: ImastIntegrationsSection,
  careers: CareerSection,
};

export default registry;

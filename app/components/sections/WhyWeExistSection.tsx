"use client";

import React from "react";

interface Principle {
  title: string;
  description: string;
  color: "primary" | "orange" | "teal";
}

interface WhyWeExistSectionProps {
  data: {
    heading?: string;
    subheading?: string;
    logoSrc?: string;
    paragraphBlocks?: string[];
    highlightParagraphs?: string[];
    principles?: Principle[];
    stats?: {
      projects?: string;
      satisfaction?: string;
    };
    promise?: {
      title?: string;
      description?: string;
    };
    principlesSection?: {
      title?: string;
      description?: string;
    };
  };
}

// Default data with complete type safety
const defaultData = {
  logoSrc: "/logo.png",
  paragraphBlocks: [
    "We believe in creating meaningful solutions that bridge the gap between technology and human needs. Our mission is to empower businesses with innovative tools that drive growth and foster lasting connections.",
    "In a world of constant change, we provide the stability and innovation needed to thrive. Our commitment to excellence shapes every product, service, and interaction.",
  ],
  principles: [
    {
      title: "Unified Vision",
      description:
        "Bringing together diverse perspectives to create cohesive, powerful solutions that work in harmony.",
      color: "primary" as const,
    },
    {
      title: "Integrated Approach",
      description:
        "Seamlessly connecting technology, strategy, and execution for maximum impact and efficiency.",
      color: "orange" as const,
    },
    {
      title: "Comprehensive Solutions",
      description:
        "Delivering end-to-end solutions that address every aspect of your challenges and opportunities.",
      color: "teal" as const,
    },
  ],
  stats: {
    projects: "50+",
    satisfaction: "98%",
  },
  promise: {
    title: "Our Promise",
    description: "Delivering excellence through innovation and dedication",
  },
  principlesSection: {
    title: "Our Core Principles",
    description: "The foundation of everything we build and deliver",
  },
};

// Color configuration with type safety
const colorConfig = {
  primary: {
    bg: "bg-primary-50",
    border: "border-primary-200",
    text: "text-primary-700",
    accent: "bg-primary-500",
    light: "bg-primary-100",
  },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
    accent: "bg-orange-500",
    light: "bg-orange-100",
  },
  teal: {
    bg: "bg-teal-50",
    border: "border-teal-200",
    text: "text-teal-700",
    accent: "bg-teal-500",
    light: "bg-teal-100",
  },
} as const;

// Helper function for safe data access
const getSafeData = <T,>(data: T | undefined, defaultValue: T): T => {
  return data ?? defaultValue;
};

export default function WhyWeExistSection({ data }: WhyWeExistSectionProps) {
  // Safely merge provided data with defaults
  const content = {
    logoSrc: getSafeData(data?.logoSrc, defaultData.logoSrc),
    paragraphBlocks: getSafeData(
      data?.paragraphBlocks,
      defaultData.paragraphBlocks
    ),
    principles: getSafeData(data?.principles, defaultData.principles),
    stats: {
      projects: getSafeData(data?.stats?.projects, defaultData.stats.projects),
      satisfaction: getSafeData(
        data?.stats?.satisfaction,
        defaultData.stats.satisfaction
      ),
    },
    promise: {
      title: getSafeData(data?.promise?.title, defaultData.promise.title),
      description: getSafeData(
        data?.promise?.description,
        defaultData.promise.description
      ),
    },
    principlesSection: {
      title: getSafeData(
        data?.principlesSection?.title,
        defaultData.principlesSection.title
      ),
      description: getSafeData(
        data?.principlesSection?.description,
        defaultData.principlesSection.description
      ),
    },
  };

  // Reusable components for better code organization
  const BackgroundElements = () => (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary-50 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-40" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-100 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl opacity-30" />
    </div>
  );

  const ParagraphBlock = ({ text, index }: { text: string; index: number }) => (
    <div className="group">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center mt-1 group-hover:bg-primary-200 transition-colors duration-300">
          <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
        </div>
        <p className="text-lg text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
          {text}
        </p>
      </div>
    </div>
  );

  const StatsSection = () => (
    <div className="grid grid-cols-2 gap-6 pt-8 border-t border-gray-200">
      <div className="text-center">
        <div className="text-3xl font-bold text-primary-600 mb-2">
          {content.stats.projects}
        </div>
        <div className="text-sm text-gray-600">Projects Delivered</div>
      </div>
      <div className="text-center">
        <div className="text-3xl font-bold text-primary-600 mb-2">
          {content.stats.satisfaction}
        </div>
        <div className="text-sm text-gray-600">Client Satisfaction</div>
      </div>
    </div>
  );

  const LogoVisual = () => (
    <div className="relative">
      <div className="relative bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl p-8 aspect-square flex items-center justify-center shadow-2xl">
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <img
              src={content.logoSrc}
              alt="Company logo"
              className="w-48 h-48 object-contain filter brightness-0 invert"
              loading="lazy"
            />
          </div>
        </div>
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="absolute top-6 right-6 w-16 h-16 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 transform rotate-12" />
        <div className="absolute bottom-6 left-6 w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 transform -rotate-6" />
      </div>
      <PromiseCard />
    </div>
  );

  const PromiseCard = () => (
    <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl border border-gray-100 max-w-xs">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse" />
        <span className="text-sm font-semibold text-gray-900">
          {content.promise.title}
        </span>
      </div>
      <p className="text-sm text-gray-600">{content.promise.description}</p>
    </div>
  );

  const PrincipleCard = ({
    principle,
    index,
  }: {
    principle: Principle;
    index: number;
  }) => {
    const colors = colorConfig[principle.color];

    return (
      <div className="group relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 transition-all duration-500 hover:shadow-lg">
        <div
          className={`absolute -top-4 -left-4 w-8 h-8 rounded-full ${colors.bg} ${colors.border} border-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
        >
          <span className={`text-sm font-bold ${colors.text}`}>
            {index + 1}
          </span>
        </div>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full ${colors.accent}`} />
            <h4 className={`text-xl font-bold ${colors.text}`}>
              {principle.title}
            </h4>
          </div>
          <p className="text-gray-600 leading-relaxed">
            {principle.description}
          </p>
        </div>
        <div
          className={`absolute bottom-0 left-0 w-0 h-1 ${colors.accent} rounded-full group-hover:w-full transition-all duration-500`}
        />
      </div>
    );
  };

  const PrinciplesSection = () => (
    <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 border border-gray-200">
      <div className="text-center mb-12">
        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
          {content.principlesSection.title}
        </h3>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {content.principlesSection.description}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.principles.map((principle, index) => (
          <PrincipleCard
            key={principle.title}
            principle={principle}
            index={index}
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="relative py-14 lg:py-20 bg-white overflow-hidden">
      <BackgroundElements />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Content - Text */}
          <div className="space-y-8">
            <div className="space-y-6">
              {content.paragraphBlocks.map((paragraph, index) => (
                <ParagraphBlock key={index} text={paragraph} index={index} />
              ))}
            </div>
            <StatsSection />
          </div>

          {/* Right Content - Visual */}
          <LogoVisual />
        </div>

        <PrinciplesSection />
      </div>
    </section>
  );
}

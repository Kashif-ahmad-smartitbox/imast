"use client";

import React from "react";

interface Principle {
  title: string;
  description: string;
}

interface Stats {
  projects: string;
  satisfaction: string;
}

interface Promise {
  title: string;
  description: string;
}

interface PrinciplesSection {
  title: string;
  description: string;
}

interface WhyWeExistSectionProps {
  data: {
    heading?: string;
    subheading?: string;
    logoSrc?: string;
    paragraphBlocks?: string[];
    principles?: Principle[];
    stats?: Stats;
    promise?: Promise;
    principlesSection?: PrinciplesSection;
  };
}

const defaultData = {
  heading: "Why we exist",
  subheading:
    "We design and build products that enable teams and creators to scale with confidence.",
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
    },
    {
      title: "Integrated Approach",
      description:
        "Seamlessly connecting technology, strategy, and execution for maximum impact and efficiency.",
    },
    {
      title: "Comprehensive Solutions",
      description:
        "Delivering end-to-end solutions that address every aspect of your challenges and opportunities.",
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

export default function WhyWeExistSection({ data }: WhyWeExistSectionProps) {
  // Merge data with defaults
  const content = React.useMemo(
    () => ({
      heading: data?.heading ?? defaultData.heading,
      subheading: data?.subheading ?? defaultData.subheading,
      logoSrc: data?.logoSrc ?? defaultData.logoSrc,
      paragraphBlocks: data?.paragraphBlocks ?? defaultData.paragraphBlocks,
      principles: data?.principles ?? defaultData.principles,
      stats: {
        projects: data?.stats?.projects ?? defaultData.stats.projects,
        satisfaction:
          data?.stats?.satisfaction ?? defaultData.stats.satisfaction,
      },
      promise: {
        title: data?.promise?.title ?? defaultData.promise.title,
        description:
          data?.promise?.description ?? defaultData.promise.description,
      },
      principlesSection: {
        title:
          data?.principlesSection?.title ?? defaultData.principlesSection.title,
        description:
          data?.principlesSection?.description ??
          defaultData.principlesSection.description,
      },
    }),
    [data]
  );

  const ParagraphBlock = React.useCallback(
    ({ text }: { text: string }) => (
      <div className="group">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 mt-1">
            <div className="w-6 h-6 rounded-full border-2 border-primary-300 grid place-items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
            </div>
          </div>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    ),
    []
  );

  const StatsSection = React.useCallback(
    () => (
      <div className="grid grid-cols-2 gap-6 pt-8 border-t border-primary-300">
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-2">
            {content.stats.projects}
          </div>
          <div className="text-sm text-primary-700">Projects Delivered</div>
        </div>
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-extrabold text-primary-900 mb-2">
            {content.stats.satisfaction}
          </div>
          <div className="text-sm text-primary-700">Client Satisfaction</div>
        </div>
      </div>
    ),
    [content.stats.projects, content.stats.satisfaction]
  );

  const PromiseCard = React.useCallback(
    () => (
      <aside
        className="absolute -bottom-6 -right-6 bg-white bg-opacity-95 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-primary-300 max-w-xs hidden lg:block"
        aria-labelledby="promise-title"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full bg-primary-500 animate-pulse" />
          <h4
            id="promise-title"
            className="text-sm font-semibold text-primary-900"
          >
            {content.promise.title}
          </h4>
        </div>
        <p className="text-sm text-primary-700">
          {content.promise.description}
        </p>
      </aside>
    ),
    [content.promise.title, content.promise.description]
  );

  const LogoVisual = React.useCallback(
    () => (
      <div className="relative w-full">
        <div className="relative rounded-3xl p-6 lg:p-8 aspect-square lg:aspect-auto lg:h-96 flex items-center justify-center shadow-2xl overflow-hidden bg-gradient-to-br from-primary-600 to-primary-500">
          <div className="relative z-10 p-6 rounded-2xl bg-white bg-opacity-10 border border-white border-opacity-10 backdrop-blur-sm">
            <div className="w-36 h-36 bg-white rounded-lg flex items-center justify-center">
              {content.logoSrc ? (
                <img
                  src={content.logoSrc}
                  alt="Company Logo"
                  className="w-24 h-24 object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const fallback = target.nextSibling as HTMLElement;
                    if (fallback) fallback.style.display = "flex";
                  }}
                />
              ) : null}
              <div className="w-24 h-24 hidden items-center justify-center">
                <span className="text-2xl font-bold text-primary-600">
                  LOGO
                </span>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-white to-transparent mix-blend-overlay" />
          </div>

          <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white bg-opacity-10 border border-white border-opacity-20 rotate-12" />
          <div className="absolute bottom-6 left-6 w-10 h-10 rounded-xl bg-white bg-opacity-10 border border-white border-opacity-20 -rotate-6" />
        </div>

        <PromiseCard />
      </div>
    ),
    [content.logoSrc, PromiseCard]
  );

  const PrincipleCard = React.memo(
    ({ principle, index }: { principle: Principle; index: number }) => (
      <article
        className="group relative rounded-2xl p-6 md:p-8 bg-primary-50 border border-primary-300 hover:shadow-lg hover:border-primary-500 transition-all duration-300"
        aria-labelledby={`principle-${index}-title`}
      >
        <div className="absolute -top-4 -left-4">
          <div className="w-8 h-8 rounded-full grid place-items-center bg-primary-100 ring-1 ring-primary-200">
            <span
              className="text-sm font-semibold text-primary-700"
              aria-hidden="true"
            >
              {index + 1}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary-500" />
            <h4
              id={`principle-${index}-title`}
              className="text-lg font-semibold text-primary-900"
            >
              {principle.title}
            </h4>
          </div>
          <p className="text-primary-700 leading-relaxed">
            {principle.description}
          </p>
        </div>

        <div
          className="bg-primary-500 absolute bottom-0 left-0 w-0 h-1 rounded-full group-hover:w-full transition-all duration-500"
          aria-hidden="true"
        />
      </article>
    )
  );

  PrincipleCard.displayName = "PrincipleCard";

  const PrinciplesSection = React.useCallback(
    () => (
      <section className="mt-12">
        <div className="bg-primary-50 rounded-3xl p-6 lg:p-10 border border-primary-300">
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-3xl font-extrabold text-primary-900 mb-3">
              {content.principlesSection.title}
            </h3>
            <p className="text-base text-primary-700 max-w-2xl mx-auto">
              {content.principlesSection.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.principles.map((principle, index) => (
              <PrincipleCard
                key={`${principle.title}-${index}`}
                principle={principle}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    ),
    [
      content.principles,
      content.principlesSection.title,
      content.principlesSection.description,
    ]
  );

  return (
    <section
      className="relative py-14 lg:py-20 overflow-hidden bg-white"
      aria-labelledby="whyweexist-heading"
    >
      {/* Updated Grid Pattern - Same as other components */}
      <div className="pointer-events-none absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                           linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">
          <div className="space-y-8">
            <header>
              <h2
                id="whyweexist-heading"
                className="text-2xl md:text-3xl font-extrabold text-primary-900"
              >
                {content.heading}
              </h2>
              <p className="mt-2 text-base text-primary-700 max-w-2xl">
                {content.subheading}
              </p>
            </header>

            <div className="space-y-6">
              {content.paragraphBlocks.map((text, index) => (
                <ParagraphBlock key={`paragraph-${index}`} text={text} />
              ))}
            </div>

            <StatsSection />
          </div>

          <LogoVisual />
        </div>

        <PrinciplesSection />
      </div>
    </section>
  );
}

// components/ModulesSection.tsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight, ChevronRight } from "lucide-react";

export type ModuleItem = {
  id: string;
  logo?: string;
  title: string;
  description: string;
  ctaLabel?: string;
  features?: string[]; // Added for enhanced content
};

type Props = {
  heading?: React.ReactNode;
  ctaText?: string;
  modules?: ModuleItem[];
  initiallySelectedId?: string | null;
};

const DEFAULT_MODULES: ModuleItem[] = [
  {
    id: "pos",
    logo: "/logo.svg",
    title: "Point of Sales Solution",
    description:
      "An intelligent, easy-to-use cloud solution to manage your entire retail business that allows you to go beyond billing and maximise repeat sales.",
    ctaLabel: "Learn More",
    features: [
      "Real-time inventory",
      "Multi-store management",
      "Customer analytics",
    ],
  },
  {
    id: "dist",
    logo: "/logo.svg",
    title: "Distributor Management System",
    description:
      "A solution to automate, manage and accelerate distributors operations with an integrated B2B E-commerce platform.",
    ctaLabel: "Learn More",
    features: ["Order automation", "Route optimization", "B2B portal"],
  },
  {
    id: "loy",
    logo: "/logo.svg",
    title: "Loyalty Management solution",
    description:
      "The most advanced, feature-loaded and impactful loyalty engine for creating and managing customised Loyalty and Engagement Programs.",
    ctaLabel: "Learn More",
    features: ["Points system", "Gamification", "Personalized rewards"],
  },
  {
    id: "sales",
    logo: "/logo.svg",
    title: "Sales Force Automation Solution",
    description:
      "Easy and powerful field sales operations tool to empower your sales force and transform entire sales operations.",
    ctaLabel: "Learn More",
    features: ["Mobile CRM", "Performance tracking", "Lead management"],
  },
  {
    id: "lead",
    logo: "/logo.svg",
    title: "Lead Management Solution",
    description:
      "An end-to-end system for sales leads and marketing automation along with a proficient CRM platform.",
    ctaLabel: "Learn More",
    features: ["Lead scoring", "Automated follow-ups", "Conversion tracking"],
  },
  {
    id: "after",
    logo: "/logo.svg",
    title: "After Sales Service Management Solution",
    description:
      "A foolproof solution that enables you to track and manage complete after-sales service support for your customers.",
    ctaLabel: "Learn More",
    features: ["Ticket management", "Service analytics", "Customer support"],
  },
];

export default function ModulesSection({
  heading = (
    <>
      <span className="block text-lg font-medium text-gray-600 mb-2">
        Explore All Modules
      </span>
      <span className="inline-flex items-center gap-4">
        <span className="sr-only">imast360</span>
        <div className="bg-gradient-to-r from-white to-gray-50 px-6 py-3 rounded-xl shadow-lg border border-gray-100">
          <Image src="/imast360.png" width={160} height={40} alt="imast360" />
        </div>
      </span>
    </>
  ),
  ctaText = "Get Started Free",
  modules = DEFAULT_MODULES,
  initiallySelectedId = "sales",
}: Props) {
  const [selectedId, setSelectedId] = useState<string | null>(
    initiallySelectedId ?? null
  );

  function onSelect(id: string) {
    setSelectedId((prev) => (prev === id ? null : id));
  }

  return (
    <section
      aria-labelledby="modules-heading"
      className="relative bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-[#e36b3e] rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#f08a4e] rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Header bar - Improved design */}
        <div className="flex flex-col lg:flex-row items-center justify-between bg-gradient-to-r from-[#fff4f2] to-[#ffffff] rounded-2xl p-8 lg:p-10 border-l-[6px] border-[#e36b3e] mb-16">
          <div className="text-center lg:text-left mb-6 lg:mb-0">{heading}</div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#e36b3e] to-[#f08a4e] hover:from-[#d55c2f] hover:to-[#e36b3e] text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span>{ctaText}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Cards grid - Enhanced layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {modules.map((module, index) => {
            const isSelected = selectedId === module.id;

            return (
              <article
                key={module.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelect(module.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(module.id);
                  }
                }}
                aria-pressed={isSelected}
                className={`group relative rounded-3xl p-8 cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-[#f7c9b8] transition-all duration-500 ease-out transform hover:-translate-y-2 ${
                  isSelected
                    ? "bg-gradient-to-br from-[#e36b3e] to-[#f08a4e] text-white shadow-2xl scale-105"
                    : "bg-white text-gray-900 shadow-lg hover:shadow-xl border border-gray-100"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: `fadeInUp 0.6s ease-out ${index * 100}ms both`,
                }}
              >
                {/* Animated border effect */}
                <div
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-r from-[#e36b3e] to-[#f08a4e] opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${
                    isSelected ? "opacity-10" : ""
                  }`}
                ></div>

                {/* Logo with better styling */}
                <div
                  className={`relative rounded-2xl p-3 mb-6 inline-flex items-center justify-center ${
                    isSelected
                      ? "bg-white/20"
                      : "bg-gradient-to-br from-gray-50 to-white"
                  } shadow-sm`}
                >
                  {module.logo ? (
                    <div className="relative w-16 h-8">
                      <Image
                        src={module.logo}
                        alt={`${module.title} logo`}
                        fill
                        className="object-contain filter brightness-0"
                        style={{
                          filter: isSelected
                            ? "brightness(0) invert(1)"
                            : "brightness(0)",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
                  )}
                </div>

                {/* Title with icon */}
                <div className="flex items-start justify-between mb-4">
                  <h3
                    className={`text-xl font-bold leading-tight pr-4 ${
                      isSelected ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {module.title}
                  </h3>
                  <ChevronRight
                    size={20}
                    className={`flex-shrink-0 mt-1 transition-transform duration-300 ${
                      isSelected
                        ? "text-white rotate-90"
                        : "text-gray-400 group-hover:text-[#e36b3e] group-hover:translate-x-1"
                    }`}
                  />
                </div>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed mb-6 ${
                    isSelected ? "text-white/90" : "text-gray-600"
                  }`}
                >
                  {module.description}
                </p>

                {/* Features list - appears on selection */}
                {module.features && isSelected && (
                  <div className="mb-6 space-y-2">
                    {module.features.map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="w-2 h-2 bg-white/80 rounded-full"></div>
                        <span className="text-white/90">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* CTA with enhanced styling */}
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isSelected
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-gray-50 hover:bg-gray-100 group-hover:bg-[#fff4f2]"
                  }`}
                >
                  <span
                    className={`text-sm font-semibold ${
                      isSelected ? "text-white" : "text-[#e36b3e]"
                    }`}
                  >
                    {module.ctaLabel ?? "Learn More"}
                  </span>
                  <ArrowRight
                    size={16}
                    className={isSelected ? "text-white" : "text-[#e36b3e]"}
                  />
                </div>

                {/* Enhanced glow effect */}
                {isSelected && (
                  <>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -inset-2 rounded-3xl blur-xl opacity-30 bg-gradient-to-r from-[#e36b3e] to-[#f08a4e]"
                    />
                    <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-bl-3xl rounded-tr-3xl"></div>
                  </>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom decorative element */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-current rounded-full animate-pulse"></div>
            <span>Scroll to discover more features</span>
          </div>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

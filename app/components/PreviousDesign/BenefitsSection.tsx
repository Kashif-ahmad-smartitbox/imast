"use client";
import React from "react";
import { Rocket, Crosshair, BarChart3, ShieldCheck } from "lucide-react"; // Lucide icons

/* ---------- data ---------- */
const FEATURES = [
  {
    id: 1,
    Icon: Rocket,
    kicker: "Hassle",
    title: "Clutter",
    text: "A one-stop solution that eliminates the need to juggle between multiple vendors — simple onboarding, faster outcomes.",
  },
  {
    id: 2,
    Icon: Crosshair,
    kicker: "Focused",
    title: "Implementation",
    text: "IMAST delivers robust on-ground implementation and project delivery to help your teams scale with confidence.",
  },
  {
    id: 3,
    Icon: BarChart3,
    kicker: "ROI",
    title: "Booster",
    text: "An ecosystem built to convert potential into measurable gains — optimized for ROI with a minimum investment model.",
  },
  {
    id: 4,
    Icon: ShieldCheck,
    kicker: "Reliable",
    title: "Secure",
    text: "Enterprise-grade security and compliance so your data and operations stay protected under all circumstances.",
  },
];

/* ---------- Component ---------- */
export default React.memo(function BenefitsSection() {
  return (
    <section
      aria-label="IMAST benefits"
      className="relative overflow-hidden bg-[#ab3f90] px-6 sm:px-8 lg:px-12"
    >
      {/* Decorative soft shapes (purely decorative - aria-hidden) */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-44 -translate-x-28 opacity-12"
        viewBox="0 0 200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M0,300 C60,200 140,200 200,300 L200,600 L0,600 Z"
          fill="#ffffff"
        />
      </svg>

      <svg
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-44 translate-x-28 opacity-12"
        viewBox="0 0 200 600"
        preserveAspectRatio="none"
      >
        <path
          d="M200,300 C140,200 60,200 0,300 L0,600 L200,600 Z"
          fill="#ffffff"
        />
      </svg>

      <div className="max-w-7xl mx-auto py-16 lg:py-24">
        {/* Headline */}
        <div className="text-center px-4">
          <h2 className="mx-auto max-w-4xl text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
            <span className="text-yellow-300">IMAST</span>
            <span className="mx-2">- The Only Unified</span>
            <span className="text-yellow-300">Ecosystem</span>
            <span className="mx-2">That Guarantees</span>
            <span className="text-yellow-300">Extensive ROI</span>
            <span className="block lg:inline">
              Through Intelligent Automation & Next-Gen Technology
            </span>
          </h2>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FEATURES.map(({ id, Icon, kicker, title, text }) => (
            <article
              key={id}
              role="listitem"
              aria-labelledby={`feature-title-${id}`}
              className="relative bg-white rounded-2xl p-6 sm:p-6 lg:p-7 shadow-md border border-white/20 transition-transform duration-300 ease-out hover:-translate-y-2 focus-within:-translate-y-2 focus-within:ring-4 focus-within:ring-white/20"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white ring-1 ring-white/10 shadow-sm flex-shrink-0">
                  <Icon className="h-5 w-5 text-[#ab3f90]" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-indigo-600">
                    {kicker}
                  </p>
                  <h3
                    id={`feature-title-${id}`}
                    className="mt-1 text-lg font-bold text-gray-900 leading-snug"
                  >
                    {title}
                  </h3>
                </div>
              </div>

              <p className="mt-4 text-sm text-gray-600 leading-relaxed">
                {text}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#8a2da6] to-transparent pointer-events-none" />
    </section>
  );
});

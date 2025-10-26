"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

type Button = {
  text: string;
  link: string;
  ariaLabel?: string;
  visible?: boolean;
};

type RightCard = {
  title?: string;
  subtitle?: string;
  bullets?: string[];
  cta?: Button;
};

type ServicesData = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  description?: string;
  buttons?: {
    primary?: Button;
    secondary?: Button;
  };
  rightCard?: RightCard;
  showWave?: boolean;
};

interface ServicesHeroHeaderProps {
  data: ServicesData;
  className?: string;
}

export default function ServicesHeroHeader({
  data,
  className = "",
}: ServicesHeroHeaderProps) {
  const {
    eyebrow,
    title,
    subtitle,
    description,
    buttons = {},
    rightCard,
    showWave = true,
  } = data;

  const primary = buttons.primary ?? {
    text: "Talk to an expert",
    link: "/contact",
  };
  const secondary = buttons.secondary ?? {
    text: "View work",
    link: "/case-studies",
  };

  return (
    <section
      aria-label="Services hero"
      className={`relative overflow-hidden pt-32 pb-24 text-white bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 ${className}`}
    >
      {/* Subtle gradient overlay for depth — fixed */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-b from-[#24357e]/40 via-[#1b275d]/70 to-[#101526]"
        aria-hidden
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-6">
            {eyebrow && (
              <p className="text-lg font-semibold tracking-wide text-primary-500">
                {eyebrow}
              </p>
            )}

            <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-6 text-base text-gray-200 max-w-2xl">
                {subtitle}
              </p>
            )}

            {description && (
              <p className="mt-4 text-base text-gray-200 max-w-2xl">
                {description}
              </p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primary.visible !== false && (
                <a
                  href={primary.link}
                  aria-label={primary.ariaLabel ?? primary.text}
                  className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>{primary.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}

              {secondary.visible !== false && (
                <a
                  href={secondary.link}
                  aria-label={secondary.ariaLabel ?? secondary.text}
                  className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>{secondary.text}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>

          {/* Right Feature Card (render only if backend provides rightCard) */}
          <div className="lg:col-span-6">
            {rightCard ? (
              <div className="relative bg-white rounded-3xl shadow-2xl ring-1 ring-white/10 p-8 md:p-10 lg:p-12">
                {rightCard.title && (
                  <h3 className="text-base font-semibold text-gray-800">
                    {rightCard.title}
                  </h3>
                )}

                {rightCard.subtitle && (
                  <p className="mt-3 text-gray-500 leading-relaxed">
                    {rightCard.subtitle}
                  </p>
                )}

                {rightCard.bullets?.length ? (
                  <ul className="mt-6 space-y-3">
                    {rightCard.bullets.map((b, i) => (
                      <li className="flex items-center gap-3" key={i}>
                        <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary-600 text-white text-xs font-bold">
                          ✓
                        </span>
                        <span className="text-sm text-gray-500">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {rightCard.cta && rightCard.cta.visible !== false && (
                  <div className="mt-8">
                    <a
                      href={rightCard.cta.link}
                      aria-label={rightCard.cta.ariaLabel ?? rightCard.cta.text}
                      className="rounded group inline-flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                    >
                      <span>{rightCard.cta.text}</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                )}

                <div className="absolute -bottom-10 -right-10 w-56 h-56 bg-primary-500 opacity-20 blur-3xl rounded-full" />
              </div>
            ) : (
              <div className="hidden lg:block" />
            )}
          </div>
        </div>
      </div>

      {/* Soft bottom wave */}
      {showWave && (
        <div className="absolute bottom-0 left-0 right-0 pointer-events-none opacity-30">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-24"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M0,48 C120,96 360,120 720,96 C1080,72 1320,16 1440,0 L1440 120 L0 120 Z"
              fill="url(#gradient)"
            />
            <defs>
              <linearGradient id="gradient" x1="0" x2="1">
                <stop offset="0%" stopColor="#EF0046" stopOpacity="1" />
                <stop offset="100%" stopColor="#A53D96" stopOpacity="0.5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
    </section>
  );
}

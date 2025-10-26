"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

type ButtonData = {
  text: string;
  link: string;
  ariaLabel?: string;
  visible?: boolean;
};

type TextsData = {
  title: string;
  subtitle?: string;
  description?: string;
};

type LogoData = {
  src?: string;
  alt?: string;
  size?: number;
};

export type HeroData = {
  logo?: LogoData;
  texts: TextsData;
  buttons?: {
    primary?: ButtonData;
    secondary?: ButtonData;
  };
  primaryColor?: string;
  bgClass?: string;
  bgGradient?: string;
  showScrollIndicator?: boolean;
};

interface SolutionHeroHeaderProps {
  data: HeroData;
  className?: string;
}

export default function SolutionHeroHeader({
  data,
  className = "",
}: SolutionHeroHeaderProps) {
  const {
    logo,
    texts,
    buttons = {},
    primaryColor = "#24357e",
    bgClass = "bg-gradient-to-br from-primary-50 to-[#24357e]",
    bgGradient = "linear-gradient(135deg, #141b3a 0%, #1c2554 40%, #24357e 100%)",
    showScrollIndicator = true,
  } = data;

  const primaryBtn = buttons.primary ?? { text: "Get Started", link: "#" };
  const secondaryBtn = buttons.secondary ?? {
    text: "Learn More",
    link: "#features",
  };

  return (
    <section
      aria-labelledby="solution-hero-title"
      className={`relative overflow-hidden min-h-[80vh] flex items-center ${className}`}
      style={!bgClass ? { background: bgGradient } : undefined}
    >
      <div
        className={`absolute inset-0 -z-20 ${bgClass}`}
        aria-hidden
        style={!bgClass ? { background: bgGradient } : undefined}
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

      <div className="absolute top-1/4 -right-24 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-24 w-80 h-80 bg-secondary-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            {logo?.src && (
              <div className="mb-6">
                <div
                  className="inline-block rounded-2xl flex items-center justify-center overflow-hidden bg-white p-2"
                  style={{ height: logo.size ?? 80 }}
                >
                  <img
                    src={logo.src}
                    alt={logo.alt ?? texts.title ?? "logo"}
                    className="w-full h-full object-contain p-3"
                    loading="lazy"
                  />
                </div>
              </div>
            )}

            {texts.subtitle && (
              <p className="text-sm uppercase tracking-widest text-primary-200/80 mb-3 font-semibold">
                {texts.subtitle}
              </p>
            )}

            <h1
              id="solution-hero-title"
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight"
            >
              {texts.title}
            </h1>

            {texts.description && (
              <p className="text-lg text-gray-200 max-w-xl mb-8 font-light">
                {texts.description}
              </p>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {primaryBtn.visible !== false && (
                <a
                  href={primaryBtn.link}
                  aria-label={primaryBtn.ariaLabel ?? primaryBtn.text}
                  className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>{primaryBtn.text}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
              )}

              {secondaryBtn.visible !== false && (
                <a
                  href={secondaryBtn.link}
                  aria-label={secondaryBtn.ariaLabel ?? secondaryBtn.text}
                  className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>{secondaryBtn.text}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

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

      {showScrollIndicator && (
        <div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          aria-hidden
        >
          <div className="flex flex-col items-center gap-3">
            <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center">
              <div className="w-1.5 h-3 bg-red-500 rounded-full mt-2 animate-bounce"></div>
            </div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-medium">
              Scroll
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

/* Utility functions */
function hexToRgba(hex: string, alpha = 1) {
  const normalized = hex.replace("#", "");
  const bigint = parseInt(
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized,
    16
  );
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function shadeHex(hex: string, amount: number) {
  const normalized = hex.replace("#", "");
  const full =
    normalized.length === 6
      ? normalized
      : normalized
          .split("")
          .map((c) => c + c)
          .join("");
  const num = parseInt(full, 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
}

"use client";
import React from "react";
import Image from "next/image";

type Card = {
  id: string | number;
  title: string;
  description: string;
  icon?: string;
};

type Props = {
  data: {
    heading?: string;
    subheading?: string;
    imageSrc?: string;
    imageAlt?: string;
    background?: string;
    cardBg?: string;
    accentColor?: string;
    cards: Card[];
    containerPadding?: string;
    badgeText?: string;
  };
};

export default function SalesStaffModule({ data }: Props) {
  const {
    heading = "Imast Sales Staff Module",
    subheading = "Empower your sales team with cutting-edge tools to boost productivity and drive revenue growth",
    imageSrc = "/images/sales-phone.png",
    imageAlt = "sales staff mockup",
    background = "#fff8f6",
    cardBg = "#ffffff",
    accentColor = "#ea7a3a",
    cards = [],
    containerPadding = "py-20 lg:py-28 px-4 sm:px-6 lg:px-8",
    badgeText = "Sales Excellence",
  } = data || {};

  const paleBg = (hex: string) => `${hex}14`;

  return (
    <section
      className={`relative overflow-hidden ${containerPadding}`}
      style={{ background }}
      aria-labelledby="sales-staff-module-heading"
    >
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-20 right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header Section */}
        <div className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-orange-200 mb-6">
            <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide text-orange-700">
              {badgeText}
            </span>
          </div>

          <h2
            id="sales-staff-module-heading"
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            {heading.split(" ").map((word, index) =>
              word.toLowerCase().includes("sales") ||
              word.toLowerCase().includes("staff") ? (
                <span
                  key={index}
                  className="bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent"
                  style={{ marginRight: 8 }}
                >
                  {word}
                </span>
              ) : (
                <span key={index} style={{ marginRight: 8 }}>
                  {word}
                </span>
              )
            )}
          </h2>

          {subheading && (
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Enhanced Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          {/* Enhanced Left Image */}
          <div className="lg:col-span-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-lg">
              {/* Background decorative elements */}
              <div
                className="absolute -left-8 -top-8 w-80 h-80 rounded-3xl transform rotate-6"
                style={{ background: paleBg(accentColor) }}
                aria-hidden
              />

              <div
                className="absolute -right-6 -bottom-6 w-64 h-64 rounded-3xl transform -rotate-12"
                style={{ background: paleBg(accentColor) }}
                aria-hidden
              />

              {/* Main image container */}
              <div className="relative rounded-3xl p-8 backdrop-blur-sm bg-white/20 border border-white/30">
                <div className="relative w-full h-[400px] lg:h-[480px] rounded-[32px] overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={imageAlt}
                    fill
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-700 hover:scale-110"
                  />
                </div>
              </div>

              {/* Enhanced floating elements */}
              <div
                className="absolute -right-4 -bottom-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transform transition-all duration-500 hover:scale-110 hover:-rotate-12"
                style={{
                  background: `linear-gradient(135deg, ${accentColor}, #d2691e)`,
                  boxShadow: "0 10px 30px rgba(234, 122, 58, 0.3)",
                }}
                aria-hidden
              >
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>

              <div
                className="absolute -left-6 top-8 w-12 h-12 rounded-xl flex items-center justify-center shadow-xl transform transition-all duration-500 hover:scale-110 hover:rotate-12"
                style={{
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(10px)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.1)",
                }}
                aria-hidden
              >
                <svg
                  className="w-5 h-5 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Enhanced Right Text Content */}
          <div className="lg:col-span-6">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200 mb-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span className="text-sm font-semibold text-orange-700">
                  Sales Empowerment
                </span>
              </div>

              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                Transform Your Sales Operations
              </h3>

              <p className="text-lg text-gray-600 leading-relaxed">
                Equip your sales team with powerful tools to streamline
                processes, enhance customer engagement, and achieve
                unprecedented growth targets.
              </p>

              {/* Feature Highlights */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Lead Management
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Performance Analytics
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Real-time Updates
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-orange-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Customer Insights
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <button className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 shadow-lg group">
                  Explore Sales Module
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <article
                key={card.id}
                className="group relative rounded-3xl p-8 backdrop-blur-sm border border-orange-100 hover:border-orange-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                style={{ background: cardBg }}
              >
                {/* Background decorative element */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                {/* Enhanced Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-orange-100 rounded-2xl transform rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                    {card.icon ? (
                      <img
                        src={card.icon}
                        alt={`${card.title} icon`}
                        className="w-6 h-6 filter brightness-0 invert"
                      />
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="text-white"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="4"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-800 transition-colors duration-300">
                  {card.title}
                </h3>

                <p className="text-gray-600 leading-relaxed text-base">
                  {card.description}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}

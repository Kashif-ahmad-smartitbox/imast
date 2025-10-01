"use client";
import React from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function ImastTrial({
  illustrationSrc = "/rightImage.png",
}: {
  illustrationSrc?: string;
}) {
  return (
    <section className="w-full py-16 lg:py-24 px-6 lg:px-12 bg-gradient-to-r from-[#A94093] to-[#771660] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300/10 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* LEFT: Content */}
          <div className="p-6 lg:p-8 text-white space-y-6">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white backdrop-blur-sm rounded-xl p-2">
                <img
                  src="/logo.svg"
                  alt="IMAST"
                  className="w-8 h-8 lg:w-10 lg:h-10"
                />
              </div>
              <span className="text-sm font-semibold text-rose-100 bg-white/10 px-3 py-1 rounded-full">
                ENTERPRISE PLATFORM
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Try{" "}
              <span className="relative inline-block">
                <span className="relative z-10">IMAST</span>
                <div className="absolute bottom-2 left-0 w-full h-3 bg-rose-300/30 -rotate-1 z-0"></div>
              </span>{" "}
              Free
            </h1>

            <p className="text-xl lg:text-2xl font-light text-rose-100 leading-relaxed max-w-xl">
              No credit card required. No software to install. Start in minutes.
            </p>

            {/* Features List */}
            <div className="space-y-3">
              {[
                "Unified platform for retail, distribution & loyalty",
                "Fast setup with enterprise-grade controls",
                "Measurable outcomes from day one",
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-rose-200 flex-shrink-0" />
                  <span className="text-rose-100 text-sm lg:text-base">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href="/start-trial"
                  className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white text-rose-700 font-bold rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl active:scale-95 min-w-[200px] justify-center"
                >
                  <span className="relative z-10">Start Free Trial</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-gradient-to-r from-white to-rose-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>

                {/* Trust Indicators */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 text-rose-100">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-6 h-6 bg-rose-300 rounded-full border-2 border-rose-600"
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      Trusted by <strong className="text-white">500+</strong>{" "}
                      brands
                    </span>
                  </div>
                  <div className="hidden sm:block w-px h-4 bg-rose-400/50"></div>
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <strong className="text-white">2M+</strong> users
                  </div>
                </div>
              </div>

              {/* No Risk Guarantee */}
              <div className="flex items-center gap-2 text-rose-200/80 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                No risk · 14-day free trial · Cancel anytime
              </div>
            </div>
          </div>

          {/* RIGHT: illustration - Keeping original design */}
          <div className="relative p-8 lg:p-10 flex justify-center items-center">
            <div className="relative max-w-md lg:max-w-lg w-full">
              <img
                src={illustrationSrc}
                alt="IMAST product preview"
                className="w-full h-auto object-contain rounded-lg drop-shadow-2xl"
                loading="lazy"
              />
              {/* badge */}
              <div className="hidden md:flex absolute -left-6 -bottom-8">
                <div className="bg-white rounded-full p-3 shadow-lg ring-1 ring-black/5 flex items-center justify-center">
                  <span className="text-sm font-semibold text-rose-600">
                    ₹ 2000 /mo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

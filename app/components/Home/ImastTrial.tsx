"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function ImastTrial({
  illustrationSrc = "/rightImage.png",
}: {
  illustrationSrc?: string;
}) {
  return (
    <section className="w-full py-20 px-6 lg:px-12 bg-gradient-to-r from-rose-600 to-rose-700">
      <div className="max-w-8xl mx-auto">
        {/* card container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          {/* LEFT: copy */}
          <div className="p-10 lg:p-16 text-white">
            <h1 className="text-3xl sm:text-5xl lg:text-4xl font-extrabold leading-tight max-w-2xl">
              Try IMAST for free. No credit card required, no software to
              install.
            </h1>

            <p className="mt-6 text-sm max-w-xl text-rose-100">
              Get started quickly with the IMAST unified platform for retail,
              distribution, loyalty and after-sales. Fast setup, enterprise
              controls, and measurable outcomes.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="/start-trial"
                className="rounded group inline-flex text-nowrap items-center gap-3 px-5 py-3 bg-white text-rose-700 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Start free trial</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <div className="mt-3 sm:mt-0 text-xs text-rose-100">
                Trusted by <strong className="text-white">500+</strong> brands ·{" "}
                <strong className="text-white">2M+</strong> users
              </div>
            </div>
          </div>

          {/* RIGHT: illustration */}
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

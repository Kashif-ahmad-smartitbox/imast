"use client";
import React from "react";
import { ArrowRight } from "lucide-react";

export default function ImastTrial({
  illustrationSrc = "/rightImage.png",
}: {
  illustrationSrc?: string;
}) {
  return (
    <section className="py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* card container */}
        <div className="relative rounded-2xl bg-white ring-1 ring-black/5 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            {/* LEFT: copy */}
            <div className="p-10 lg:p-16">
              <h1 className="text-3xl sm:text-5xl lg:text-4xl font-extrabold leading-tight text-slate-900 max-w-2xl">
                Try IMAST for free. No credit card required, no software to
                install.
              </h1>

              <p className="mt-6 text-sm text-slate-600 max-w-xl">
                Get started quickly with the IMAST unified platform for retail,
                distribution, loyalty and after-sales. Fast setup, enterprise
                controls, and measurable outcomes.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <a
                  href="/start-trial"
                  className="rounded group inline-flex text-nowrap items-center gap-3 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>Start free trial</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <div className="mt-3 sm:mt-0  text-xs text-slate-500">
                  Trusted by <strong className="text-slate-800">500+</strong>{" "}
                  brands · <strong className="text-slate-800">2M+</strong> users
                </div>
              </div>
            </div>

            {/* RIGHT: illustration */}
            <div className="relative p-8 lg:p-10 flex justify-center items-center">
              {/* rounded background circle */}
              <div
                className="hidden lg:block absolute -right-36 w-[36rem] h-[36rem] rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 opacity-10"
                aria-hidden
              />

              {/* illustration (keeps aspect and allows overlap) */}
              <div className="relative max-w-md lg:max-w-lg w-full">
                <img
                  src={illustrationSrc}
                  alt="IMAST product preview"
                  className="w-full h-auto object-contain rounded-lg drop-shadow-2xl"
                  loading="lazy"
                />

                {/* optional small mascot badge overlapping bottom-left */}
                <div className="hidden md:flex absolute -left-6 -bottom-8 transform translate-x-0 translate-y-0">
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

        {/* subtle large drop shadow under card for depth */}
        <div className="mt-8 h-2/6">
          <div className="max-w-7xl mx-auto">
            <div className="h-6 w-full rounded-xl blur-lg opacity-20 bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

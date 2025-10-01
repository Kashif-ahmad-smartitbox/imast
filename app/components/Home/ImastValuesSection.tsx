"use client";
import React from "react";
import { CheckCircle, Target, Users } from "lucide-react";

type ValueItem = {
  icon?: React.ReactNode;
  title: string;
  description: string;
};

const DEFAULT_VALUES: ValueItem[] = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Long-term commitment",
    description:
      "29+ years of running a profitable organization gives us a good sense of challenges that a growing business faces. We take pride in running a sustainable business that's powered by you, our customer.",
  },
  {
    icon: <Target className="w-6 h-6" />,
    title: "Focus on research and development",
    description:
      "Software is our craft and we back it up with our relentless investments in R&D. So much so that we prefer to own the entire technology stack, including running our data centers globally.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Customer-first philosophy",
    description:
      "In all these years, it's our customers' trust and goodwill that has helped us establish a strong position in the market. No matter the size of your business, we're here to help you grow.",
  },
];

export default function ImastValuesSection({
  heroImage = "/team-hero.jpg",
  title = "The core values and principles that drive us",
  values = DEFAULT_VALUES,
  ctaHref = "/about",
  ctaText = "READ OUR STORY",
}: {
  heroImage?: string;
  title?: string;
  values?: ValueItem[];
  ctaHref?: string;
  ctaText?: string;
}) {
  return (
    <section className="relative">
      {/* Hero Section */}
      <div className="relative">
        {/* Hero Image with gradient overlay */}
        <div className="w-full h-[250px] md:h-[300px] lg:h-[500px] overflow-hidden bg-gradient-to-br from-slate-900/20 to-rose-900/10">
          <img
            src={heroImage}
            alt="IMAST team gathered at event"
            className="w-full h-full object-cover object-top mix-blend-overlay"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Content Card */}
        <div className="relative z-30 -mt-[60px] md:-mt-[80px] lg:-mt-[100px]">
          <div className="w-[94vw] md:w-[86vw] lg:w-[76vw] max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl ring-1 ring-slate-200 p-8 md:p-12 lg:p-16">
              <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                  <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
                    Our Values
                  </p>
                  <h2
                    id="impact-heading"
                    className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
                  >
                    {title.split("\n").map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                </header>

                {/* Values Grid - Professional Design */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {values.map((value, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-xl p-8 border border-slate-100 hover:border-rose-200 transition-all duration-300 hover:shadow-lg"
                    >
                      {/* Icon Section */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center justify-center w-12 h-12 bg-rose-100 text-rose-600 rounded-xl">
                          {value.icon}
                        </div>
                        <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900 mb-4 leading-tight">
                          {value.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed text-[15px]">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer */}
      <div className="h-18 md:h-20 lg:h-25" />
    </section>
  );
}

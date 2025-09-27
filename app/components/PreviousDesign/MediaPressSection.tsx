"use client";

import React from "react";
import Image from "next/image";
import { ExternalLink, Calendar } from "lucide-react";

type PressItem = {
  id: string;
  image: string;
  title: string;
  excerpt: string;
  href?: string;
  date?: string;
};

const SAMPLE: PressItem[] = [
  {
    id: "1",
    image: "/pres-pic1.png",
    title: "IMAST Unleashes Tech Innovation: Introduces Next-Gen Suite",
    excerpt:
      "In the dynamic realm of Indian tech, IMAST takes the lead, reshaping industry benchmarks with a comprehensive next-gen product suite focused on automation and growth.",
    href: "#",
    date: "2025-08-12",
  },
  {
    id: "2",
    image: "/pres-pic2.png",
    title: "IMAST Launches Integrated Solutions for Enterprise Growth",
    excerpt:
      "IMAST launches an integrated solution to simplify operations across channels and boost ROI for mid-market and enterprise clients.",
    href: "#",
    date: "2025-07-21",
  },
  {
    id: "3",
    image: "/pres-pic3.png",
    title: "IMAST Transforms Tech Horizon: Inks Pioneering Partnerships",
    excerpt:
      "Strategic collaborations set the stage for a new ecosystem of partners, expanding reach and customer outcomes across retail and distribution.",
    href: "#",
    date: "2025-06-02",
  },
];

export default function MediaPressSection({
  items = SAMPLE,
  heading = "Media & Press",
  sub = "How we help companies optimize their program for growth",
}: {
  items?: PressItem[];
  heading?: string;
  sub?: string;
}) {
  return (
    <section
      aria-labelledby="media-press-heading"
      className="bg-gradient-to-br from-gray-50 to-white py-16 lg:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#fff5f4] border border-[#ffeceb] mb-6">
            <div className="w-2 h-2 bg-[#d44b59] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-[#d44b59]">
              Latest Updates
            </span>
          </div>

          <h2
            id="media-press-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d44b59] to-[#8b3c86]">
              Media
            </span>{" "}
            & Press
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            {sub}
          </p>
        </div>

        {/* Enhanced Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((it, index) => (
            <article
              key={it.id}
              className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

              {/* Image with Overlay */}
              <div className="relative rounded-t-2xl overflow-hidden">
                <div className="relative w-full h-48 sm:h-52 md:h-56 lg:h-52">
                  <Image
                    src={it.image}
                    alt={it.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={index === 0}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

                  {/* Date Badge */}
                  {it.date && (
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 text-xs font-medium text-gray-700">
                      <Calendar size={12} />
                      {new Date(it.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-3 line-clamp-2 group-hover:text-[#8b3c86] transition-colors duration-300">
                  {it.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3">
                  {it.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a
                    href={it.href ?? "#"}
                    target={it.href ? "_blank" : undefined}
                    rel={it.href ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b3c86] hover:text-[#d44b59] transition-all duration-300 group-hover:gap-3"
                    aria-label={`Read full article: ${it.title}`}
                  >
                    Read Full Story
                    <ExternalLink
                      size={16}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </a>

                  {/* Hidden date for mobile */}
                  <div className="md:hidden flex items-center gap-1 text-xs text-gray-400">
                    <Calendar size={10} />
                    {it.date ? new Date(it.date).toLocaleDateString() : ""}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

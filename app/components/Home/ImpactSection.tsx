"use client";
import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function ImpactSection() {
  const stats = [
    { value: "25K+", label: "Retailers Empowered" },
    { value: "10+", label: "Countries Served" },
    { value: "15+", label: "Years in Business" },
    { value: "50+", label: "Enterprise Clients" },
  ];

  return (
    <section className="relative bg-rose-700 text-white overflow-hidden">
      {/* Decorative line-art illustration at bottom right */}
      <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none select-none">
        <Image src="/temple-line-white.svg" alt="" width={480} height={280} />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight max-w-3xl">
          Made in India.
          <br />
          Built for Global Growth.
        </h2>

        {/* Stats */}
        <dl className="mt-10 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-4xl">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="text-2xl md:text-3xl font-extrabold">{s.value}</dt>
              <dd className="text-sm text-rose-100">{s.label}</dd>
            </div>
          ))}
        </dl>

        {/* CTA */}
        <div className="mt-10">
          <a
            href="/about"
            className="inline-flex items-center gap-2 rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm md:text-base font-semibold hover:bg-white hover:text-rose-700 transition"
          >
            More about IMAST
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function ImastCreativeHero(props: any) {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Subtle radial backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 w-[680px] h-[680px] rounded-full bg-gradient-to-br from-primary-50 via-white to-transparent opacity-80 blur-3xl" />
        <div className="absolute -right-32 bottom-0 w-[520px] h-[520px] rounded-full bg-gradient-to-tr from-sky-50 via-white to-transparent opacity-60 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="relative text-center">
          {/* Floating logo/icon */}
          <motion.div
            initial={{ y: -6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mx-auto mb-4 py-3 flex items-center justify-center"
          >
            <Image
              src="/imast360.png"
              alt="IMAST"
              width={100}
              height={100}
              className="object-contain"
            />
          </motion.div>

          {/* Superheadline */}
          <p className="text-sm md:text-base text-gray-500 mb-2">
            Multiply the impact of your workforce with
          </p>

          {/* Headline */}
          <motion.h1
            initial={{ scale: 0.995, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight"
          >
            IMAST <span className="text-primary-600">AI</span> — intelligent
            decisions at scale
          </motion.h1>

          {/* Underline accent */}
          <div className="mt-3 flex justify-center">
            <span className="inline-block w-16 h-1 rounded-full bg-primary-600/90 shadow-sm" />
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ y: 6, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mt-6 text-gray-600 max-w-3xl mx-auto text-base md:text-lg"
          >
            Embedded across IMAST modules — supply chain, retail, distribution,
            and loyalty — IMAST AI suggests actions, automates routine
            decisions, and highlights the signals that actually move the needle.
          </motion.p>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/imast-ai"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary-600 text-white font-semibold shadow-lg hover:bg-primary-700 transition"
            >
              Explore IMAST AI
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              href="/demo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/90 border border-gray-200 text-gray-800 font-medium shadow-sm hover:shadow-md transition"
            >
              <Play className="w-4 h-4" /> Watch demo
            </a>
          </div>
          <Sparkles />
        </div>
      </div>
    </section>
  );
}

/* small stat component */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center text-center px-3 py-2">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-xl font-bold text-gray-900">{value}</div>
    </div>
  );
}

/* floating sparkles: small positioned svgs for visual flair */
function Sparkles() {
  const sparkle = (cx: number, cy: number, r = 6, key?: string | number) => (
    <svg
      key={key ?? `${cx}-${cy}`}
      width={r * 2}
      height={r * 2}
      viewBox="0 0 24 24"
      className="absolute opacity-60"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden
    >
      <g fill="none" stroke="none" strokeWidth="0">
        <path
          d="M12 2l1.9 3.8L18 8l-4.1 2.2L12 14l-1.9-3.8L6 8l4.1-2.2z"
          fill="rgba(151, 85, 255, 0.12)"
        />
      </g>
    </svg>
  );

  return (
    <>
      {sparkle(14, 18, 8, "s1")}
      {sparkle(82, 26, 8, "s2")}
      {sparkle(60, 60, 10, "s3")}
      {sparkle(28, 72, 9, "s4")}
    </>
  );
}

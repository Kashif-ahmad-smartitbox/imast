"use client";
import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

type HeroCenteredProps = {
  backgroundImage?: string;
  imageAlt?: string;
  accentColor?: string;
  useNextImage?: boolean;
  className?: string;
};

export default function HeroCentered({
  backgroundImage,
  imageAlt = "IMAST visual",
  accentColor = "#E31E24",
  useNextImage = false,
  className = "",
}: HeroCenteredProps) {
  const prefersReducedMotion = useReducedMotion();

  const badgeMotion = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 } };

  const titleMotion = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 } };

  const imageMotion = prefersReducedMotion
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      aria-label="Hero — IMAST overview"
      className={`relative overflow-hidden py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-red-50/10 ${className}`}
    >
      {/* Tonal decorative shapes (purely decorative) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-36 -right-36 w-72 h-72 bg-red-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute -bottom-36 -left-36 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-28 animate-[pulse_9s_ease-in-out_infinite] delay-1000" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          {...badgeMotion}
          transition={{ duration: 0.36 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/85 backdrop-blur-sm border border-gray-200/60 shadow-sm mb-8"
        >
          <span
            className="block h-2 w-2 rounded-full"
            style={{ backgroundColor: accentColor }}
          />
          <span className="text-sm font-medium text-gray-700">
            Transform your business operations
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          {...titleMotion}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="mx-auto max-w-4xl font-extrabold text-gray-900 leading-tight -tracking-tight"
          style={{ WebkitFontSmoothing: "antialiased" }}
        >
          <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-red-700">
              IMAST
            </span>{" "}
            — the reliable partner for{" "}
            <span style={{ color: accentColor }}>process transformation</span>
          </span>

          <span className="mt-3 block text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto">
            Automate operations, empower teams, and unlock measurable growth
            with a single integrated platform built for enterprise needs.
          </span>
        </motion.h1>

        {/* CTA */}
        <motion.div
          {...(prefersReducedMotion
            ? {}
            : { initial: { opacity: 0 }, animate: { opacity: 1 } })}
          transition={{ delay: 0.12, duration: 0.36 }}
          className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <Link
            href="#contact"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg text-white font-semibold shadow-md"
            style={{ backgroundColor: accentColor }}
            role="button"
            aria-label="Get started free"
          >
            Get Started Free
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M5 12h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <Link
            href="#solutions"
            className="inline-flex items-center gap-3 px-6 py-3.5 rounded-lg border border-gray-200 text-gray-800 font-semibold bg-white/60 hover:bg-white transition"
            aria-label="View solutions"
          >
            View Solutions
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M9 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </motion.div>

        {/* Visual / Image */}
        {backgroundImage && (
          <motion.div
            {...imageMotion}
            transition={{ delay: 0.24, duration: 0.6 }}
            className="mt-12 w-full max-w-5xl mx-auto"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
              {/* Image: optional Next/Image for optimization */}
              {useNextImage ? (
                <div className="w-full h-64 sm:h-80 md:h-96 relative">
                  <Image
                    src={backgroundImage}
                    alt={imageAlt}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width:768px) 100vw, 80vw"
                  />
                </div>
              ) : (
                <div
                  role="img"
                  aria-label={imageAlt}
                  className="w-full h-64 sm:h-80 md:h-96 bg-center bg-cover"
                  style={{ backgroundImage: `url(${backgroundImage})` }}
                />
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

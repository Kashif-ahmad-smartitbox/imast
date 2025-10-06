"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Play,
  X,
  Star,
  CheckCircle,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

type ImastPromoSectionProps = {
  posterSrc?: string;
  videoSrc?: string;
  theme?: "orange" | "blue";
};

export default function ImastPromoSection({
  posterSrc = "/videos/imast-promo-poster.jpg",
  videoSrc = "/videos/imast-promo.mp4",
  theme = "orange",
}: ImastPromoSectionProps) {
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // prevent background scroll when modal open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  // close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (open && modalRef.current) modalRef.current.focus();
  }, [open]);

  const themeConfig = {
    orange: {
      cta: "bg-gradient-to-r from-rose-600 to-orange-500 hover:from-rose-700 hover:to-orange-600 focus-visible:ring-rose-300",
      sectionBg: "bg-gradient-to-br from-white to-slate-50",
      accent: "text-rose-600",
      badge: "bg-rose-100 text-rose-700",
      gradientText: "from-rose-600 to-rose-400",
    },
    blue: {
      cta: "bg-gradient-to-r from-sky-600 to-blue-500 hover:from-sky-700 hover:to-blue-600 focus-visible:ring-sky-300",
      sectionBg: "bg-gradient-to-br from-sky-50 via-blue-50 to-white",
      accent: "text-sky-600",
      badge: "bg-sky-100 text-sky-700",
      gradientText: "from-sky-600 to-blue-500",
    },
  };

  const currentTheme = themeConfig[theme];

  return (
    <section
      ref={sectionRef}
      className={`${currentTheme.sectionBg} py-10 lg:py-18 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div
            className={`lg:col-span-6 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <p className="text-lg font-semibold text-gray-600 uppercase tracking-wider mb-3">
              Promotional
            </p>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-6">
              <span className="block">IMAST360 for MSMEs &amp; SMBs</span>
              <span
                className={`block text-transparent bg-clip-text bg-gradient-to-r ${currentTheme.gradientText} mt-4`}
              >
                Flat 50% Off
              </span>
            </h1>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 ${currentTheme.accent}`} />
                <span className="text-sm font-medium text-gray-700">
                  50% Discount
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className={`w-5 h-5 ${currentTheme.accent}`} />
                <span className="text-sm font-medium text-gray-700">
                  3 Weeks Deployment
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Users className={`w-5 h-5 ${currentTheme.accent}`} />
                <span className="text-sm font-medium text-gray-700">
                  Dedicated Support
                </span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className={`w-5 h-5 ${currentTheme.accent}`} />
                <span className="text-sm font-medium text-gray-700">
                  Zero Third-Party
                </span>
              </div>
            </div>

            <div className="text-md text-gray-700 space-y-4 leading-relaxed mb-8">
              <p>
                For the first time, IMAST is making it easier than ever for
                Indian MSMEs &amp; SMBs to digitize their entire supply chain.
              </p>

              <p>
                With this limited-time offer, get <strong>50% off</strong> on
                IMAST360 flagship solutions — including Distributor Management
                System (DMS), Sales Force Automation (SFA), Lead Management,
                Loyalty &amp; Rewards Platform, and more.
              </p>

              <p>
                Go live in just <strong>3 weeks</strong> with our dedicated
                in-house implementation team, ensuring a smooth rollout with
                zero dependency on third-party implementers.
              </p>

              <p>
                Empower your distribution, sales, and customer engagement on one
                integrated SaaS platform — only with IMAST360.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/contact"
                className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Get Special Pricing</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right column - media */}
          <div
            className={`lg:col-span-6 flex justify-center lg:justify-end transition-all duration-700 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative w-full max-w-2xl">
              <div className="relative">
                <div className="relative w-full rounded-3xl border border-gray-100 overflow-hidden ring-1 ring-white/20 bg-white/10 backdrop-blur-sm">
                  <div className="relative w-full aspect-[16/10] bg-gradient-to-br from-gray-100 to-gray-200">
                    {/* Demo dashboard image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900">
                      <div className="absolute inset-0 p-6">
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div
                              key={i}
                              className="h-20 bg-slate-700/50 rounded-lg border border-slate-600/50"
                            ></div>
                          ))}
                        </div>

                        <div className="h-32 bg-slate-700/30 rounded-lg border border-slate-600/30 mb-4"></div>

                        <div className="flex gap-4">
                          <div className="flex-1 h-24 bg-gradient-to-r from-rose-500/20 to-orange-500/20 rounded-lg border border-rose-500/30"></div>
                          <div className="flex-1 h-24 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-lg border border-blue-500/30"></div>
                        </div>
                      </div>

                      {/* Play button overlay */}
                      <button
                        aria-label="Play IMAST360 demo video"
                        onClick={() => setOpen(true)}
                        className="absolute inset-0 flex items-center justify-center group focus:outline-none"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-white/20 rounded-full scale-150 group-hover:scale-170 transition-transform duration-300"></div>
                          <div className="relative bg-gradient-to-r from-rose-600 to-rose-700 rounded-full p-6 shadow-2xl group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Card footer */}
                  <div className="p-6 bg-white/90 backdrop-blur-sm">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                          IMAST360 Platform Demo
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          See how IMAST360 transforms distribution, sales, and
                          customer engagement with real-time analytics and
                          seamless integration.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 ml-4">
                        <Clock className="w-4 h-4" />
                        <span>2:05</span>
                      </div>
                    </div>

                    <div className="mt-4 w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full bg-gradient-to-r ${currentTheme.gradientText}`}
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-rose-600">50%</div>
                    <div className="text-xs font-medium text-gray-600">OFF</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-3 border border-gray-300">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      3 Weeks
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal / Lightbox */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="IMAST360 demo video"
          tabIndex={-1}
          ref={modalRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
          style={{ background: "rgba(0,0,0,0.8)" }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={videoSrc}
              controls
              autoPlay
              className="w-full h-[70vh] max-h-[80vh] object-contain bg-black"
            />

            <button
              aria-label="Close video"
              onClick={() => setOpen(false)}
              className="absolute top-6 right-6 z-20 inline-flex items-center justify-center h-12 w-12 rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white hover:scale-110 transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="absolute bottom-6 left-6 right-6 bg-gradient-to-t from-black/80 to-transparent p-6 pt-16 pointer-events-none">
              <h3 className="text-white text-xl font-bold mb-2">
                IMAST360 Platform Overview
              </h3>
              <p className="text-white/80 text-sm">
                Complete supply chain digitization for MSMEs & SMBs
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

"use client";
import React, { useEffect, useRef, useState } from "react";
import { Star, Users, Award, CheckCircle, ArrowRight } from "lucide-react";

/**
 * Proof.tsx — improved design with dummy client logos
 *
 * Notes:
 * - Dummy logos use placeholder images (via.placeholder.com). Replace with real assets in /public or CDN.
 * - Counters animate using requestAnimationFrame and format large numbers (2,000,000 -> 2M+).
 */

const CLIENT_LOGOS = [
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
  "https://picsum.photos/900/300",
];

const STATS = [
  { key: "brands", label: "Brands", value: 500 },
  { key: "users", label: "Users", value: 2_000_000 },
  { key: "uptime", label: "Uptime", value: 99.95 },
  { key: "retention", label: "Retention", value: 95 },
];

const TESTIMONIALS = [
  {
    quote:
      "IMAST improved our route efficiency by 32% — the analytics make decisions simple.",
    author: "Logistics Head, Regional Distributor",
    role: "Logistics",
  },
  {
    quote:
      "Integration was frictionless. We were live in 6 weeks and saw measurable uplift.",
    author: "Head of Ops, Retail Chain",
    role: "Operations",
  },
  {
    quote:
      "Campaign ROI jumped — the loyalty module paid for itself within two quarters.",
    author: "Head of CRM, FMCG Brand",
    role: "Marketing",
  },
];

function formatStat(key: string, value: number) {
  if (key === "users") {
    // show as 2M+
    if (value >= 1_000_000) return `${Math.round(value / 1_000_000)}M+`;
    if (value >= 1_000) return `${Math.round(value / 1_000)}k+`;
  }
  if (key === "uptime") {
    return value.toFixed(2) + "%";
  }
  if (key === "brands" || key === "retention") {
    return `${value}${key === "brands" ? "+" : "%"}`;
  }
  return String(value);
}

/** small hook to animate numbers */
function useCountTo(target: number, duration = 1200) {
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    startTimeRef.current = null;
    const step = (ts: number) => {
      if (!startTimeRef.current) startTimeRef.current = ts;
      const elapsed = ts - startTimeRef.current!;
      const progress = Math.min(1, elapsed / duration);
      const current = target * progress;
      setValue(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return Math.round(value);
}

export default function Proof() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const [marqueePaused, setMarqueePaused] = useState(false);

  // autoplay testimonials
  useEffect(() => {
    startAuto();
    return stopAuto;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function startAuto() {
    stopAuto();
    timerRef.current = window.setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
  }
  function stopAuto() {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = null;
  }

  // counters with visible animation on mount
  const brandsCount = useCountTo(STATS[0].value, 1200);
  const usersCount = useCountTo(STATS[1].value, 1400);
  const uptimeCount = useCountTo(STATS[2].value, 1000);
  const retentionCount = useCountTo(STATS[3].value, 1000);

  // marquee CSS animation control (pause on hover)
  useEffect(() => {
    if (marqueeRef.current) {
      marqueeRef.current.style.animationPlayState = marqueePaused
        ? "paused"
        : "running";
    }
  }, [marqueePaused]);

  return (
    <section className="py-8 lg:py-12 bg-white" aria-labelledby="proof-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-rose-600">Proof</p>
          <h2
            id="proof-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Trusted by businesses across India & beyond
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Proven at scale — from local distributors to national retail chains.
          </p>
        </header>

        {/* MARQUEE: logos — duplicated to make continuous scroll */}
        <div
          className="overflow-hidden rounded-2xl border border-gray-100"
          onMouseEnter={() => setMarqueePaused(true)}
          onMouseLeave={() => setMarqueePaused(false)}
        >
          <div
            ref={marqueeRef}
            className="flex items-center gap-8 px-6 py-4 whitespace-nowrap"
            style={{
              animation: "marquee 18s linear infinite",
            }}
          >
            {/* first sequence */}
            {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((src, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-3 bg-white rounded-md shadow-sm"
                style={{ minWidth: 160 }}
              >
                <img
                  src={src}
                  alt={`client-${i + 1}`}
                  className="max-h-10 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats + testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-8">
          {/* Stats */}
          <div className="lg:col-span-1 bg-rose-50 rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Award className="text-rose-600" />
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  Proven at scale
                </div>
                <div className="text-xs text-gray-600">Numbers that matter</div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500">Brands</div>
                <div className="mt-1 text-lg font-bold text-gray-900">
                  {formatStat("brands", brandsCount)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  enterprise & mid-market
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500">Users</div>
                <div className="mt-1 text-lg font-bold text-gray-900">
                  {formatStat("users", usersCount)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  active monthly users
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500">Uptime</div>
                <div className="mt-1 text-lg font-bold text-gray-900">
                  {uptimeCount.toFixed
                    ? uptimeCount.toFixed(2) + "%"
                    : `${uptimeCount}%`}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  platform availability
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="text-sm text-gray-500">Retention</div>
                <div className="mt-1 text-lg font-bold text-gray-900">
                  {formatStat("retention", retentionCount)}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  annual customer retention
                </div>
              </div>
            </div>

            <div className="mt-4">
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"
              >
                See case studies <ArrowRight size={14} />
              </a>
            </div>
          </div>

          {/* Testimonial carousel */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
            <div
              className="relative min-h-[140px] flex items-center"
              onMouseEnter={stopAutoTestimonial}
              onMouseLeave={startAutoTestimonial}
              aria-live="polite"
            >
              {TESTIMONIALS.map((t, i) => {
                const visible = i === activeTestimonial;
                return (
                  <figure
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-out flex items-center gap-6 p-6 ${
                      visible
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 -translate-x-6 z-0"
                    }`}
                  >
                    <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-semibold text-lg">
                      {initialsFromName(t.author)}
                    </div>

                    <figcaption>
                      <blockquote className="text-lg font-semibold text-gray-900">
                        “{t.quote}”
                      </blockquote>
                      <div className="mt-2 text-sm text-gray-600">
                        — {t.author}{" "}
                        <span className="text-xs text-gray-400">
                          · {t.role}
                        </span>
                      </div>
                    </figcaption>
                  </figure>
                );
              })}

              {/* dots */}
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Show testimonial ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition ${
                      i === activeTestimonial ? "bg-rose-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4">
              <CheckCircle className="text-green-600" />
              <div>
                <div className="font-semibold text-gray-800">
                  Security & compliance
                </div>
                <div className="text-sm text-gray-600">
                  SOC2 readiness, TLS, role-based access and DPA available.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* local styles for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );

  // helpers for testimonial auto
  function startAutoTestimonial() {
    if (timerRef.current === null) {
      timerRef.current = window.setInterval(() => {
        setActiveTestimonial((i) => (i + 1) % TESTIMONIALS.length);
      }, 5000);
    }
  }
  function stopAutoTestimonial() {
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }
}

// small util: initials from author name
function initialsFromName(name: string) {
  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

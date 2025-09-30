"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
  ReactElement,
} from "react";
import { Award, CheckCircle, ArrowRight } from "lucide-react";

// Types
interface ClientLogo {
  src: string;
  alt: string;
}

interface Stat {
  key: "brands" | "users" | "uptime" | "retention";
  label: string;
  value: number;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
}

interface UseCountToOptions {
  duration?: number;
  precision?: number;
}

// Constants
const CLIENT_LOGOS: ClientLogo[] = [
  { src: "/client/01.jpg", alt: "Client logo 1" },
  { src: "/client/02.jpg", alt: "Client logo 2" },
  { src: "/client/03.jpg", alt: "Client logo 3" },
  { src: "/client/04.jpg", alt: "Client logo 4" },
  { src: "/client/05.jpg", alt: "Client logo 5" },
  { src: "/client/06.jpg", alt: "Client logo 6" },
  { src: "/client/07.jpg", alt: "Client logo 7" },
  { src: "/client/08.jpg", alt: "Client logo 8" },
  { src: "/client/09.jpg", alt: "Client logo 9" },
  { src: "/client/10.jpg", alt: "Client logo 10" },
];

const STATS: Stat[] = [
  { key: "brands", label: "Brands", value: 500 },
  { key: "users", label: "Users", value: 2_000_000 },
  { key: "uptime", label: "Uptime", value: 99.95 },
  { key: "retention", label: "Retention", value: 95 },
];

const TESTIMONIALS: Testimonial[] = [
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

const TESTIMONIAL_INTERVAL = 5000;
const DEFAULT_COUNT_DURATION = 1200;

// Custom Hooks
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handler = (): void => setReduced(mq.matches);
    handler();

    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  return reduced;
}

function useCountTo(
  target: number,
  { duration = DEFAULT_COUNT_DURATION, precision = 0 }: UseCountToOptions = {}
): number {
  const [value, setValue] = useState<number>(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    startRef.current = null;

    const step = (ts: number): void => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const current = target * progress;
      setValue(Number(current.toFixed(precision)));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, precision, reduced]);

  return value;
}

// Components
function StatCard({ label, value, sub }: StatCardProps): ReactElement {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm text-center">
      <div
        className="text-xl md:text-2xl font-bold text-gray-900 mb-1"
        aria-label={`${value} ${label}`}
      >
        {value}
      </div>
      <div className="text-sm font-medium text-gray-700">{label}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  );
}

// Utility Functions
function formatStat(key: Stat["key"], value: number): string {
  const numValue = Number(value);

  switch (key) {
    case "users":
      if (numValue >= 1_000_000) {
        return `${Math.round(numValue / 1_000_000)}M+`;
      }
      if (numValue >= 1_000) {
        return `${Math.round(numValue / 1_000)}k+`;
      }
      return String(numValue);

    case "uptime":
      return `${numValue.toFixed(2)}%`;

    case "brands":
      return `${Math.round(numValue)}+`;

    case "retention":
      return `${Math.round(numValue)}%`;

    default:
      return String(numValue);
  }
}

function getStatSubtext(key: Stat["key"]): string {
  const subtexts: Record<Stat["key"], string> = {
    brands: "enterprise & mid-market",
    users: "active monthly users",
    uptime: "platform availability",
    retention: "annual customer retention",
  };
  return subtexts[key] || "";
}

function initialsFromName(name: string): string {
  if (!name || typeof name !== "string") return "U";

  const parts = name.split(/\s+/).filter(Boolean);

  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Main Component
export default function Proof(): ReactElement {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [testimonialPaused, setTestimonialPaused] = useState<boolean>(false);
  const [marqueePaused, setMarqueePaused] = useState<boolean>(false);
  const testimonialTimerRef = useRef<number | null>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // Memoized counters for better performance
  const brandsCount = useCountTo(STATS[0].value, { duration: 1200 });
  const usersCount = useCountTo(STATS[1].value, { duration: 1400 });
  const uptimeCount = useCountTo(STATS[2].value, {
    duration: 1000,
    precision: 2,
  });
  const retentionCount = useCountTo(STATS[3].value, { duration: 1000 });

  // Memoized counter values array
  const statValues = useMemo<number[]>(
    () => [brandsCount, usersCount, uptimeCount, retentionCount],
    [brandsCount, usersCount, uptimeCount, retentionCount]
  );

  // Testimonial autoplay functions with useCallback
  const stopAuto = useCallback((): void => {
    if (testimonialTimerRef.current !== null) {
      window.clearInterval(testimonialTimerRef.current);
      testimonialTimerRef.current = null;
    }
  }, []);

  const startAuto = useCallback((): void => {
    stopAuto();
    if (!reduced && !testimonialPaused) {
      testimonialTimerRef.current = window.setInterval(() => {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      }, TESTIMONIAL_INTERVAL);
    }
  }, [reduced, testimonialPaused, stopAuto]);

  // Initialize autoplay
  useEffect(() => {
    startAuto();
    return stopAuto;
  }, [startAuto, stopAuto]);

  // Handle testimonial pause state
  useEffect(() => {
    if (testimonialPaused) {
      stopAuto();
    } else {
      startAuto();
    }
  }, [testimonialPaused, startAuto, stopAuto]);

  // Handlers with useCallback
  const handleTestimonialSelect = useCallback((index: number): void => {
    setActiveTestimonial(index);
    setTestimonialPaused(true);
  }, []);

  const handleTestimonialNavigation = useCallback(
    (direction: "prev" | "next") => {
      setTestimonialPaused(true);
      if (direction === "next") {
        setActiveTestimonial((prev) => (prev + 1) % TESTIMONIALS.length);
      } else {
        setActiveTestimonial(
          (prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length
        );
      }
    },
    []
  );

  const handleMarqueeMouseEnter = useCallback(
    (): void => setMarqueePaused(true),
    []
  );
  const handleMarqueeMouseLeave = useCallback(
    (): void => setMarqueePaused(false),
    []
  );
  const handleTestimonialMouseEnter = useCallback(
    (): void => setTestimonialPaused(true),
    []
  );
  const handleTestimonialMouseLeave = useCallback(
    (): void => setTestimonialPaused(false),
    []
  );

  // Memoized duplicate logos for marquee
  const logosForMarquee = useMemo<ClientLogo[]>(() => {
    return CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, index) => ({
      ...logo,
      alt: `${logo.alt} duplicate ${
        Math.floor(index / CLIENT_LOGOS.length) + 1
      }`,
    }));
  }, []);

  return (
    <section className="py-8 lg:py-12 bg-white" aria-labelledby="proof-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-rose-600 uppercase tracking-wide">
            Proof
          </p>
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

        {/* MARQUEE: logos */}
        <div
          className="overflow-hidden mb-12 relative"
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
          onFocus={handleMarqueeMouseEnter}
          onBlur={handleMarqueeMouseLeave}
          aria-label="Client logos"
        >
          <div
            ref={marqueeRef}
            className="flex items-center gap-8 px-6 py-4 whitespace-nowrap will-change-transform"
            style={{
              animationPlayState: marqueePaused ? "paused" : "running",
              animation: reduced ? "none" : "marquee 18s linear infinite",
            }}
            role="presentation"
          >
            {logosForMarquee.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center p-3 bg-white rounded-md shadow-sm flex-shrink-0"
                style={{ minWidth: 160 }}
              >
                <img
                  loading="lazy"
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-10 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-rose-50 rounded-2xl p-6 lg:p-8 mb-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Award className="text-rose-600" size={22} aria-hidden="true" />
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                  Proven at scale
                </h3>
              </div>
              <p className="text-gray-600">Numbers that matter</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map((stat, index) => (
                <StatCard
                  key={stat.key}
                  label={stat.label}
                  value={formatStat(stat.key, statValues[index])}
                  sub={getStatSubtext(stat.key)}
                />
              ))}
            </div>

            <div className="text-center mt-6">
              <a
                href="/case-studies"
                className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-md px-2 py-1"
                aria-label="View case studies"
              >
                See case studies <ArrowRight size={14} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                Customer Feedback
              </h3>
              <p className="text-gray-600">
                Hear from businesses that transformed their operations
              </p>
            </div>

            <div
              className="relative min-h-[180px] flex items-center"
              onMouseEnter={handleTestimonialMouseEnter}
              onMouseLeave={handleTestimonialMouseLeave}
              onFocus={handleTestimonialMouseEnter}
              onBlur={handleTestimonialMouseLeave}
              aria-live="polite"
              aria-atomic="true"
            >
              {/* Navigation Arrows */}
              <button
                onClick={() => handleTestimonialNavigation("prev")}
                className="absolute -left-10 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
                aria-label="Previous testimonial"
              >
                <ArrowRight className="w-4 h-4 rotate-180" aria-hidden="true" />
              </button>

              <button
                onClick={() => handleTestimonialNavigation("next")}
                className="absolute -right-10 z-20 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Next testimonial"
              >
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              {TESTIMONIALS.map((t, i) => {
                const visible = i === activeTestimonial;
                return (
                  <figure
                    key={i}
                    className={`absolute inset-0 transition-all duration-500 ease-out flex flex-col md:flex-row items-center gap-6 p-4 ${
                      visible
                        ? "opacity-100 translate-x-0 z-10"
                        : "opacity-0 -translate-x-6 z-0 pointer-events-none"
                    }`}
                    aria-hidden={!visible}
                  >
                    <div
                      className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-semibold text-lg flex-shrink-0"
                      aria-label={`${t.author} avatar`}
                    >
                      {initialsFromName(t.author)}
                    </div>

                    <figcaption className="flex-1 text-center md:text-left">
                      <blockquote className="text-base lg:text-lg font-semibold text-gray-900 leading-relaxed">
                        &apos;{t.quote}&apos;
                      </blockquote>
                      <div className="mt-3 text-sm text-gray-700">
                        — {t.author}
                      </div>
                      <div className="text-sm text-rose-600 font-medium">
                        {t.role}
                      </div>
                    </figcaption>
                  </figure>
                );
              })}

              <div
                className="absolute right-4 bottom-4 flex items-center gap-2"
                role="group"
                aria-label="Testimonial navigation"
              >
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => handleTestimonialSelect(i)}
                    aria-label={`Show testimonial ${i + 1} of ${
                      TESTIMONIALS.length
                    }`}
                    aria-current={i === activeTestimonial ? "true" : "false"}
                    className={`w-3 h-3 rounded-full transition focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 ${
                      i === activeTestimonial
                        ? "bg-rose-600"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-center gap-4">
                <CheckCircle
                  className="text-green-600 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="text-center md:text-left">
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
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 640px) {
          .overflow-hidden img {
            max-height: 28px;
          }
        }
      `}</style>
    </section>
  );
}

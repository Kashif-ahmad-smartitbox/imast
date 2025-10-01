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
import StatCard from "../StatCard";

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
  {
    quote:
      "Customer satisfaction scores increased by 45% after implementing IMAST's solutions.",
    author: "Customer Service Director, E-commerce",
    role: "Customer Experience",
  },
  {
    quote:
      "The platform reduced our operational costs by 28% while improving service quality.",
    author: "COO, Logistics Company",
    role: "Operations",
  },
  {
    quote:
      "Real-time analytics helped us identify new market opportunities we had missed.",
    author: "Business Analyst, Retail Group",
    role: "Analytics",
  },
];

const TESTIMONIAL_INTERVAL = 6000;
const DEFAULT_COUNT_DURATION = 1200;
const MARQUEE_DURATION = 18;

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

    return undefined;
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

    const step = (timestamp: number): void => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
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

interface MarqueeProps {
  logos: ClientLogo[];
  direction: "left" | "right";
  paused: boolean;
  reducedMotion: boolean;
}

function Marquee({
  logos,
  direction,
  paused,
  reducedMotion,
}: MarqueeProps): ReactElement {
  const marqueeRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={marqueeRef}
      className="flex items-center gap-8 px-6 py-4 whitespace-nowrap will-change-transform"
      style={{
        animationPlayState: paused ? "paused" : "running",
        animation: reducedMotion
          ? "none"
          : `marquee-${direction} ${MARQUEE_DURATION}s linear infinite`,
      }}
      role="presentation"
    >
      {logos.map((logo, index) => (
        <div
          key={`${logo.alt}-${index}`}
          className="flex items-center justify-center p-3 bg-white rounded-md  flex-shrink-0"
          style={{ minWidth: 160 }}
        >
          <img
            loading="lazy"
            src={logo.src}
            alt={logo.alt}
            className="max-h-20 w-auto object-contain"
            width={80}
            height={40}
          />
        </div>
      ))}
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

// Helper function to get current pair of testimonials
function getTestimonialPair(
  testimonials: Testimonial[],
  activeIndex: number
): [Testimonial, Testimonial | null] {
  const first = testimonials[activeIndex];
  const second = testimonials[activeIndex + 1] || null;
  return [first, second];
}

// Main Component
export default function Proof(): ReactElement {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [testimonialPaused, setTestimonialPaused] = useState<boolean>(false);
  const [marqueePaused, setMarqueePaused] = useState<boolean>(false);
  const testimonialTimerRef = useRef<number | null>(null);
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

  // Memoized duplicate logos for marquee
  const logosForMarquee = useMemo<ClientLogo[]>(() => {
    return CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, index) => ({
      ...logo,
      alt: `${logo.alt} duplicate ${
        Math.floor(index / CLIENT_LOGOS.length) + 1
      }`,
    }));
  }, []);

  // Calculate total pairs and current pair
  const totalPairs = Math.ceil(TESTIMONIALS.length / 2);
  const [currentTestimonial, nextTestimonial] = useMemo(() => {
    return getTestimonialPair(TESTIMONIALS, activeTestimonial * 2);
  }, [activeTestimonial]);

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
        setActiveTestimonial((prev) => (prev + 1) % totalPairs);
      }, TESTIMONIAL_INTERVAL);
    }
  }, [reduced, testimonialPaused, stopAuto, totalPairs]);

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

  // Event handlers with useCallback
  const handleTestimonialSelect = useCallback((index: number): void => {
    setActiveTestimonial(index);
    setTestimonialPaused(true);
  }, []);

  const handleTestimonialNavigation = useCallback(
    (direction: "prev" | "next") => {
      setTestimonialPaused(true);
      if (direction === "next") {
        setActiveTestimonial((prev) => (prev + 1) % totalPairs);
      } else {
        setActiveTestimonial((prev) => (prev - 1 + totalPairs) % totalPairs);
      }
    },
    [totalPairs]
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

  return (
    <section className="py-8 lg:py-12 bg-white" aria-labelledby="proof-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-2xl font-semibold text-rose-600 uppercase tracking-wide">
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
          className="overflow-hidden mb-6 relative"
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
          onFocus={handleMarqueeMouseEnter}
          onBlur={handleMarqueeMouseLeave}
          aria-label="Client logos"
        >
          <Marquee
            logos={logosForMarquee}
            direction="left"
            paused={marqueePaused}
            reducedMotion={reduced}
          />
        </div>

        {/* Second marquee flowing right */}
        <div
          className="overflow-hidden mb-12 relative"
          onMouseEnter={handleMarqueeMouseEnter}
          onMouseLeave={handleMarqueeMouseLeave}
          onFocus={handleMarqueeMouseEnter}
          onBlur={handleMarqueeMouseLeave}
          aria-label="Client logos continued"
        >
          <Marquee
            logos={logosForMarquee}
            direction="right"
            paused={marqueePaused}
            reducedMotion={reduced}
          />
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

        {/* IMPROVED Testimonials Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                Customer Feedback
              </h3>
              <p className="text-gray-600">
                Hear from businesses that transformed their operations
              </p>
            </div>

            <div
              className="relative"
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
                className="absolute -left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Previous testimonials"
              >
                <ArrowRight className="w-5 h-5 rotate-180" aria-hidden="true" />
              </button>

              <button
                onClick={() => handleTestimonialNavigation("next")}
                className="absolute -right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500"
                aria-label="Next testimonials"
              >
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {/* First Testimonial */}
                <figure className="bg-[#fbf8ff] rounded-2xl p-6 lg:p-8 transition-all duration-500 ease-out hover:shadow-lg">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-semibold text-base flex-shrink-0"
                      aria-label={`${currentTestimonial.author} avatar`}
                    >
                      {initialsFromName(currentTestimonial.author)}
                    </div>
                    <figcaption className="flex-1">
                      <blockquote className="text-sm lg:text-base text-gray-900 leading-relaxed">
                        &ldquo;{currentTestimonial.quote}&rdquo;
                      </blockquote>
                      <div className="mt-4">
                        <div className="font-semibold text-gray-800 text-sm">
                          {currentTestimonial.author}
                        </div>
                        <div className="text-xs text-rose-600 font-medium mt-1">
                          {currentTestimonial.role}
                        </div>
                      </div>
                    </figcaption>
                  </div>
                </figure>

                {/* Second Testimonial */}
                {nextTestimonial && (
                  <figure className="bg-[#fbf8ff] rounded-2xl p-6 lg:p-8 transition-all duration-500 ease-out hover:shadow-lg">
                    <div className="flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-semibold text-base flex-shrink-0"
                        aria-label={`${nextTestimonial.author} avatar`}
                      >
                        {initialsFromName(nextTestimonial.author)}
                      </div>
                      <figcaption className="flex-1">
                        <blockquote className="text-sm lg:text-base text-gray-900 leading-relaxed">
                          &ldquo;{nextTestimonial.quote}&rdquo;
                        </blockquote>
                        <div className="mt-4">
                          <div className="font-semibold text-gray-800 text-sm">
                            {nextTestimonial.author}
                          </div>
                          <div className="text-xs text-rose-600 font-medium mt-1">
                            {nextTestimonial.role}
                          </div>
                        </div>
                      </figcaption>
                    </div>
                  </figure>
                )}
              </div>

              {/* Enhanced Navigation Dots */}
              <div className="flex justify-center items-center gap-3 mt-8">
                {Array.from({ length: totalPairs }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleTestimonialSelect(index)}
                    aria-label={`Show testimonials ${
                      index * 2 + 1
                    } to ${Math.min(index * 2 + 2, TESTIMONIALS.length)} of ${
                      TESTIMONIALS.length
                    }`}
                    aria-current={
                      index === activeTestimonial ? "true" : "false"
                    }
                    className={`flex items-center gap-1 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 rounded-full px-3 py-1 ${
                      index === activeTestimonial
                        ? "bg-rose-600 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                    }`}
                  >
                    <span className="text-xs font-medium">{index + 1}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Enhanced Trust Indicators */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-3">
                  <CheckCircle
                    className="text-green-600"
                    size={20}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      Enterprise Security
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      SOC2, TLS, role-based access
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <Award
                    className="text-rose-600"
                    size={20}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      Industry Leader
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Trusted by 500+ brands
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      24/7 Support
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      Dedicated customer success
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
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

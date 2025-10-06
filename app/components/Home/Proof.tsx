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

interface UseCountToOptions {
  duration?: number;
  precision?: number;
}

const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 45 }, (_, i) => ({
  src: `/client/${String(i + 1).padStart(2, "0")}.jpg`,
  alt: `Client logo ${i + 1}`,
}));

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
const MARQUEE_DURATION = 25;

// Custom Hooks
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = (): void => setReduced(mediaQuery.matches);
    handleChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
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
  className?: string;
}

function Marquee({
  logos,
  direction,
  paused,
  reducedMotion,
  className = "",
}: MarqueeProps): ReactElement {
  return (
    <div
      className={`flex items-center gap-8 px-6 py-4 whitespace-nowrap will-change-transform ${className}`}
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
          className="flex items-center justify-center p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 border border-gray-100"
          style={{ minWidth: 160 }}
        >
          <img
            loading="lazy"
            src={logo.src}
            alt={logo.alt}
            className="max-h-15 w-auto object-contain transition-all duration-300"
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

function getTestimonialPair(
  testimonials: Testimonial[],
  activeIndex: number
): [Testimonial, Testimonial | null] {
  const first = testimonials[activeIndex];
  const second = testimonials[activeIndex + 1] || null;
  return [first, second];
}

// Enhanced Marquee Container Component
interface MarqueeContainerProps {
  logos: ClientLogo[];
  reducedMotion: boolean;
}

function MarqueeContainer({
  logos,
  reducedMotion,
}: MarqueeContainerProps): ReactElement {
  const [paused, setPaused] = useState<boolean>(false);

  // Split logos into 3 parts
  const logoParts = useMemo(() => {
    const partSize = Math.ceil(logos.length / 3);
    return [
      logos.slice(0, partSize),
      logos.slice(partSize, partSize * 2),
      logos.slice(partSize * 2),
    ];
  }, [logos]);

  const handleMouseEnter = useCallback((): void => setPaused(true), []);
  const handleMouseLeave = useCallback((): void => setPaused(false), []);

  return (
    <div className="space-y-4">
      {/* First row: right to left */}
      <div
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label="Client logos scrolling right to left"
      >
        <Marquee
          logos={logoParts[0]}
          direction="left"
          paused={paused}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Second row: left to right */}
      <div
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label="Client logos scrolling left to right"
      >
        <Marquee
          logos={logoParts[1]}
          direction="right"
          paused={paused}
          reducedMotion={reducedMotion}
        />
      </div>

      {/* Third row: right to left (same as first) */}
      <div
        className="overflow-hidden relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label="Client logos scrolling right to left"
      >
        <Marquee
          logos={logoParts[2]}
          direction="left"
          paused={paused}
          reducedMotion={reducedMotion}
        />
      </div>
    </div>
  );
}

// Main Component
export default function Proof(): ReactElement {
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [testimonialPaused, setTestimonialPaused] = useState<boolean>(false);
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

  // Memoized duplicate logos for seamless marquee
  const logosForMarquee = useMemo<ClientLogo[]>(() => {
    const duplicated = CLIENT_LOGOS.concat(CLIENT_LOGOS);
    return duplicated.map((logo, index) => ({
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

  // Testimonial autoplay functions
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

  // Event handlers
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

        {/* Enhanced Marquee Section */}
        <div className="mb-12">
          <MarqueeContainer logos={logosForMarquee} reducedMotion={reduced} />
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
          <div className="max-w-7xl mx-auto">
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

            {/* Trust Indicators */}
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
                <a
                  href="/case-studies"
                  className="w-full md:w-auto inline-flex items-center gap-3 bg-white border border-gray-100 rounded-xl px-4 py-3 hover:shadow-md transition"
                  aria-label="Read case studies"
                >
                  <div className="flex-none w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center font-bold text-rose-600">
                    CS
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-gray-900">
                      See the impact
                    </div>
                    <div className="text-xs text-gray-600">
                      Case studies & outcomes — 3 min reads
                    </div>
                  </div>
                  <ArrowRight className="ml-3 text-rose-600" size={16} />
                </a>

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

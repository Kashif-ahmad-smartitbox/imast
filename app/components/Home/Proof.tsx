"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Award, CheckCircle, ArrowRight, Star, Quote } from "lucide-react";
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
  id: string;
  quote: string;
  author: string;
  role: string;
  company?: string;
  rating?: number;
}

interface UseCountToOptions {
  duration?: number;
  precision?: number;
}

// Constants
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
    id: "1",
    quote:
      "IMAST improved our route efficiency by 32% — the analytics make decisions simple.",
    author: "Sarah Chen",
    role: "Logistics Head",
    company: "Regional Distributor",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Integration was frictionless. We were live in 6 weeks and saw measurable uplift.",
    author: "Michael Rodriguez",
    role: "Head of Operations",
    company: "Retail Chain",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Campaign ROI jumped — the loyalty module paid for itself within two quarters.",
    author: "Priya Sharma",
    role: "Head of CRM",
    company: "FMCG Brand",
    rating: 4,
  },
  {
    id: "4",
    quote:
      "Customer satisfaction scores increased by 45% after implementing IMAST's solutions.",
    author: "James Wilson",
    role: "Customer Service Director",
    company: "E-commerce Platform",
    rating: 5,
  },
  {
    id: "5",
    quote:
      "The platform reduced our operational costs by 28% while improving service quality.",
    author: "Lisa Thompson",
    role: "COO",
    company: "Logistics Company",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "Real-time analytics helped us identify new market opportunities we had missed.",
    author: "David Park",
    role: "Business Analyst",
    company: "Retail Group",
    rating: 4,
  },
];

const TESTIMONIAL_INTERVAL = 6000;
const DEFAULT_COUNT_DURATION = 1200;
const MARQUEE_DURATION = 25;

// Custom Hooks
function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleChange = () => setReduced(mediaQuery.matches);
    handleChange();

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return reduced;
}

function useCountTo(
  target: number,
  { duration = DEFAULT_COUNT_DURATION, precision = 0 }: UseCountToOptions = {}
): number {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(target);
      return;
    }

    startRef.current = null;

    const step = (timestamp: number) => {
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
      rafRef.current && cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, precision, reduced]);

  return value;
}

function useTestimonialAutoPlay(totalItems: number, interval: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<number | null>(null);
  const reduced = usePrefersReducedMotion();

  const stopAutoPlay = useCallback(() => {
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = null;
  }, []);

  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    if (!reduced && !isPaused) {
      timerRef.current = window.setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % totalItems);
      }, interval);
    }
  }, [reduced, isPaused, totalItems, interval, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return stopAutoPlay;
  }, [startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    if (isPaused) {
      stopAutoPlay();
    } else {
      startAutoPlay();
    }
  }, [isPaused, startAutoPlay, stopAutoPlay]);

  return {
    activeIndex,
    isPaused,
    setActiveIndex,
    setIsPaused,
  };
}

// Components
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
}: MarqueeProps) {
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
          className="flex items-center justify-center p-3 bg-white rounded-lg hover:shadow-md transition-all duration-300 flex-shrink-0 border border-gray-100 hover:border-rose-200 hover:scale-105"
          style={{ minWidth: 160 }}
        >
          <img
            loading="lazy"
            src={logo.src}
            alt={logo.alt}
            className="max-h-20 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
            width={80}
            height={40}
          />
        </div>
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isActive?: boolean;
}

function TestimonialCard({
  testimonial,
  isActive = true,
}: TestimonialCardProps) {
  return (
    <figure
      className={`bg-gradient-to-br from-white to-rose-25 rounded-2xl p-6 lg:p-8 transition-all duration-500 border-2 ${
        isActive
          ? "border-rose-200 shadow-lg scale-100"
          : "border-gray-100 shadow-md scale-95"
      } hover:shadow-xl hover:border-rose-300 group`}
    >
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-rose-700 font-bold text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md"
            aria-label={`${testimonial.author} avatar`}
          >
            {initialsFromName(testimonial.author)}
          </div>
          {testimonial.rating && <StarRating rating={testimonial.rating} />}
        </div>

        <figcaption className="flex-1">
          <Quote
            className="text-rose-200 mb-2 transform -scale-x-100"
            size={20}
          />
          <blockquote className="text-sm lg:text-base text-gray-800 leading-relaxed mb-4 font-medium">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>

          <div className="border-t border-gray-100 pt-4">
            <div className="font-bold text-gray-900 text-sm">
              {testimonial.author}
            </div>
            <div className="text-xs text-rose-600 font-semibold mt-1">
              {testimonial.role}
            </div>
            {testimonial.company && (
              <div className="text-xs text-gray-500 mt-1">
                {testimonial.company}
              </div>
            )}
          </div>
        </figcaption>
      </div>
    </figure>
  );
}

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

function StarRating({ rating, maxRating = 5 }: StarRatingProps) {
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }, (_, index) => (
        <Star
          key={index}
          size={14}
          className={
            index < rating ? "text-amber-500 fill-amber-500" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

interface MarqueeContainerProps {
  logos: ClientLogo[];
  reducedMotion: boolean;
}

function MarqueeContainer({ logos, reducedMotion }: MarqueeContainerProps) {
  const [paused, setPaused] = useState(false);

  const logoParts = useMemo(() => {
    const partSize = Math.ceil(logos.length / 3);
    return [
      logos.slice(0, partSize),
      logos.slice(partSize, partSize * 2),
      logos.slice(partSize * 2),
    ];
  }, [logos]);

  const handleMouseEnter = useCallback(() => setPaused(true), []);
  const handleMouseLeave = useCallback(() => setPaused(false), []);

  return (
    <div className="space-y-4">
      {logoParts.map((part, index) => (
        <div
          key={index}
          className="overflow-hidden relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          aria-label={`Client logos scrolling ${
            index % 2 === 0 ? "right to left" : "left to right"
          }`}
        >
          <Marquee
            logos={part}
            direction={index % 2 === 0 ? "left" : "right"}
            paused={paused}
            reducedMotion={reducedMotion}
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

// Main Component
export default function Proof() {
  const reduced = usePrefersReducedMotion();

  // Stats counters
  const brandsCount = useCountTo(STATS[0].value, { duration: 1200 });
  const usersCount = useCountTo(STATS[1].value, { duration: 1400 });
  const uptimeCount = useCountTo(STATS[2].value, {
    duration: 1000,
    precision: 2,
  });
  const retentionCount = useCountTo(STATS[3].value, { duration: 1000 });

  const statValues = useMemo(
    () => [brandsCount, usersCount, uptimeCount, retentionCount],
    [brandsCount, usersCount, uptimeCount, retentionCount]
  );

  // Marquee logos
  const logosForMarquee = useMemo(() => {
    return CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, index) => ({
      ...logo,
      alt: `${logo.alt} duplicate ${
        Math.floor(index / CLIENT_LOGOS.length) + 1
      }`,
    }));
  }, []);

  // Testimonials management
  const testimonialsPerView = 2;
  const totalTestimonialGroups = Math.ceil(
    TESTIMONIALS.length / testimonialsPerView
  );

  const {
    activeIndex: activeTestimonialGroup,
    isPaused: testimonialPaused,
    setActiveIndex: setActiveTestimonialGroup,
    setIsPaused: setTestimonialPaused,
  } = useTestimonialAutoPlay(totalTestimonialGroups, TESTIMONIAL_INTERVAL);

  const currentTestimonials = useMemo(() => {
    const startIndex = activeTestimonialGroup * testimonialsPerView;
    return TESTIMONIALS.slice(startIndex, startIndex + testimonialsPerView);
  }, [activeTestimonialGroup, testimonialsPerView]);

  const handleTestimonialSelect = useCallback(
    (index: number) => {
      setActiveTestimonialGroup(index);
      setTestimonialPaused(true);
    },
    [setActiveTestimonialGroup, setTestimonialPaused]
  );

  const handleTestimonialNavigation = useCallback(
    (direction: "prev" | "next") => {
      setTestimonialPaused(true);
      if (direction === "next") {
        setActiveTestimonialGroup(
          (prev) => (prev + 1) % totalTestimonialGroups
        );
      } else {
        setActiveTestimonialGroup(
          (prev) => (prev - 1 + totalTestimonialGroups) % totalTestimonialGroups
        );
      }
    },
    [setActiveTestimonialGroup, setTestimonialPaused, totalTestimonialGroups]
  );

  const handleTestimonialMouseEnter = useCallback(
    () => setTestimonialPaused(true),
    [setTestimonialPaused]
  );
  const handleTestimonialMouseLeave = useCallback(
    () => setTestimonialPaused(false),
    [setTestimonialPaused]
  );

  return (
    <section className="py-8 lg:py-12 bg-white" aria-labelledby="proof-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
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
        <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 lg:p-8 mb-12 shadow-sm">
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

        {/* Enhanced Testimonials Section */}
        <div className="bg-white rounded-2xl p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                What Our Customers Say
              </h3>
              <p className="text-gray-600">
                Real stories from businesses that transformed their operations
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
              {/* Testimonials Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-8">
                {currentTestimonials.map((testimonial, index) => (
                  <TestimonialCard
                    key={testimonial.id}
                    testimonial={testimonial}
                    isActive={true}
                  />
                ))}
              </div>

              {/* Enhanced Navigation */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                {/* Navigation Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTestimonialNavigation("prev")}
                    aria-label="Previous testimonials"
                    className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                  </button>
                  <span className="text-sm text-gray-600 min-w-[80px] text-center">
                    {activeTestimonialGroup + 1} / {totalTestimonialGroups}
                  </span>
                  <button
                    onClick={() => handleTestimonialNavigation("next")}
                    aria-label="Next testimonials"
                    className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <CheckCircle
                    className="text-green-600"
                    size={24}
                    aria-hidden="true"
                  />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Enterprise Security
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      SOC2, TLS, role-based access
                    </div>
                  </div>
                </div>

                <a
                  href="/case-studies"
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-rose-200 transition-all group"
                  aria-label="Read case studies"
                >
                  <div className="flex-none w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center font-bold text-rose-600 group-hover:scale-110 transition-transform">
                    CS
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-gray-900">
                      See the impact
                    </div>
                    <div className="text-sm text-gray-600">
                      Case studies & outcomes — 3 min reads
                    </div>
                  </div>
                  <ArrowRight
                    className="text-rose-600 group-hover:translate-x-1 transition-transform"
                    size={16}
                  />
                </a>

                <div className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">
                      24/7 Support
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
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

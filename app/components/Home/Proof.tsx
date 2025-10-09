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

// --- Types
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

// --- Constants
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
const LOGO_SLIDER_PLAY_DURATION = 15000; // 15 seconds of movement
const LOGO_SLIDER_PAUSE_DURATION = 3000; // 3 seconds pause

// --- Hooks
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

// Logo Slider Hook
function useLogoSliderAutoPlay(logosCount: number) {
  const [isPlaying, setIsPlaying] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setIsPlaying(false);
      return;
    }

    const cycle = () => {
      // Play for LOGO_SLIDER_PLAY_DURATION
      setIsPlaying(true);

      setTimeout(() => {
        // Pause for LOGO_SLIDER_PAUSE_DURATION
        setIsPlaying(false);

        setTimeout(() => {
          // Restart the cycle
          cycle();
        }, LOGO_SLIDER_PAUSE_DURATION);
      }, LOGO_SLIDER_PLAY_DURATION);
    };

    cycle();

    return () => {
      // Cleanup will be handled by the component unmounting
    };
  }, [reduced, logosCount]);

  return isPlaying;
}

// --- Small UI pieces
function initialsFromName(name: string): string {
  if (!name || typeof name !== "string") return "U";

  const parts = name.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "U";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

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

function StarRating({
  rating,
  maxRating = 5,
}: {
  rating: number;
  maxRating?: number;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-hidden>
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

// Logo Slider Component
function LogoSlider({ logos }: { logos: ClientLogo[] }) {
  const isPlaying = useLogoSliderAutoPlay(logos.length);
  const reduced = usePrefersReducedMotion();

  // Duplicate logos for seamless looping
  const duplicatedLogos = useMemo(() => {
    return [...logos, ...logos, ...logos];
  }, [logos]);

  return (
    <div className="overflow-hidden">
      <div
        className="flex gap-8 items-center"
        style={{
          animation: reduced
            ? "none"
            : `logo-slide ${LOGO_SLIDER_PLAY_DURATION}ms linear infinite`,
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        {duplicatedLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 flex items-center justify-center p-4 hover:border-rose-200 hover:shadow-md transition-all duration-300 hover:scale-105"
            style={{ minWidth: 160 }}
          >
            <img
              loading="lazy"
              src={logo.src}
              alt={logo.alt}
              className="max-h-20 w-auto object-contain transition-all duration-300 grayscale hover:grayscale-0 hover:opacity-100 opacity-80"
              width={80}
              height={40}
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
      `}</style>
    </div>
  );
}

// --- Group testimonials into pages
function chunkArray<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// --- Main Component
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

  // --- Responsive testimonials per page
  const [testimonialsPerPage, setTestimonialsPerPage] = useState(2);

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      if (w < 640) setTestimonialsPerPage(1);
      else if (w < 1024) setTestimonialsPerPage(2);
      else setTestimonialsPerPage(3);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const testimonialGroups = useMemo(
    () => chunkArray(TESTIMONIALS, testimonialsPerPage),
    [testimonialsPerPage]
  );

  const totalTestimonialGroups = testimonialGroups.length;

  const {
    activeIndex: activeTestimonialGroup,
    isPaused: testimonialPaused,
    setActiveIndex: setActiveTestimonialGroup,
    setIsPaused: setTestimonialPaused,
  } = useTestimonialAutoPlay(totalTestimonialGroups, TESTIMONIAL_INTERVAL);

  const handleNav = useCallback(
    (dir: "prev" | "next") => {
      setTestimonialPaused(true);
      setActiveTestimonialGroup((prev) => {
        if (dir === "next") return (prev + 1) % totalTestimonialGroups;
        return (prev - 1 + totalTestimonialGroups) % totalTestimonialGroups;
      });
    },
    [setActiveTestimonialGroup, setTestimonialPaused, totalTestimonialGroups]
  );

  // Pause autoplay on pointer interactions (mouse or touch)
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const onEnter = () => setTestimonialPaused(true);
    const onLeave = () => setTestimonialPaused(false);

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("focusin", onEnter);
    el.addEventListener("focusout", onLeave);

    return () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("focusin", onEnter);
      el.removeEventListener("focusout", onLeave);
    };
  }, [setTestimonialPaused]);

  // For accessibility: keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleNav("prev");
      if (e.key === "ArrowRight") handleNav("next");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [handleNav]);

  // Current group testimonials (for aria-live)
  const currentTestimonials = testimonialGroups[activeTestimonialGroup] || [];

  return (
    <>
      <section
        className="py-8 lg:py-12 bg-gray-50"
        aria-labelledby="proof-title"
      >
        <header className="w-full text-center mb-8">
          <p className="text-2xl font-semibold text-rose-600 uppercase">
            Proof
          </p>
          <h2
            id="proof-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Trusted by businesses across India & beyond
          </h2>
          <p className="mt-3 text-gray-600">
            Proven at scale — from local distributors to national retail chains.
          </p>
        </header>
        <div className="rounded-2xl mb-8">
          <div className="bg-rose-600">
            <LogoSlider logos={CLIENT_LOGOS} />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Stats */}
          <div className="bg-gradient-to-br from-rose-50 to-rose-100 rounded-2xl p-6 lg:p-8 mb-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Award className="text-rose-600" size={22} aria-hidden="true" />
                <h3 className="text-lg lg:text-xl font-bold text-gray-900">
                  Proven at scale
                </h3>
              </div>
              <p className="text-gray-600">Numbers that matter</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
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

          {/* Testimonials Slider */}
          <div className="rounded-2xl">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-6">
                <h3 className="text-lg lg:text-xl font-bold text-rose-600">
                  What Our Customers Say
                </h3>
                <p className="text-gray-600">
                  Real stories from businesses that transformed their operations
                </p>
              </div>

              <div
                ref={carouselRef}
                className="relative"
                aria-live="polite"
                aria-atomic="true"
              >
                {/* Slider viewport */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      width: `${testimonialGroups.length * 100}%`,
                      transform: `translateX(-${
                        activeTestimonialGroup *
                        (100 / testimonialGroups.length)
                      }%)`,
                    }}
                  >
                    {testimonialGroups.map((group, gIdx) => (
                      <div
                        key={`group-${gIdx}`}
                        className="flex-shrink-0 px-4 py-6"
                        style={{ width: `${100 / testimonialGroups.length}%` }}
                        aria-hidden={gIdx !== activeTestimonialGroup}
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {group.map((t) => (
                            <figure
                              key={t.id}
                              className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between border border-gray-100"
                            >
                              <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center gap-3">
                                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-rose-700 font-bold text-lg flex-shrink-0 shadow-md">
                                    {initialsFromName(t.author)}
                                  </div>
                                  {t.rating && <StarRating rating={t.rating} />}
                                </div>

                                <figcaption className="flex-1">
                                  <Quote
                                    className="text-rose-200 mb-2 transform -scale-x-100"
                                    size={20}
                                  />
                                  <blockquote className="text-sm lg:text-base text-gray-800 leading-relaxed mb-4 font-medium">
                                    “{t.quote}”
                                  </blockquote>

                                  <div className="border-t border-gray-100 pt-4">
                                    <div className="font-bold text-gray-900 text-sm">
                                      {t.author}
                                    </div>
                                    <div className="text-xs text-rose-600 font-semibold mt-1">
                                      {t.role}
                                    </div>
                                    {t.company && (
                                      <div className="text-xs text-gray-500 mt-1">
                                        {t.company}
                                      </div>
                                    )}
                                  </div>
                                </figcaption>
                              </div>
                            </figure>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center mt-6">
                  <button
                    onClick={() => handleNav("prev")}
                    aria-label="Previous testimonials"
                    className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors mr-2"
                  >
                    <ArrowRight size={16} className="rotate-180" />
                  </button>

                  <div className="flex items-center gap-2">
                    {testimonialGroups.map((_, i) => (
                      <button
                        key={`dot-${i}`}
                        onClick={() => {
                          setActiveTestimonialGroup(i);
                          setTestimonialPaused(true);
                        }}
                        aria-label={`Show testimonials page ${i + 1}`}
                        className={`w-3 h-3 rounded-full ${
                          i === activeTestimonialGroup
                            ? "bg-rose-600"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => handleNav("next")}
                    aria-label="Next testimonials"
                    className="p-2 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition-colors ml-2"
                  >
                    <ArrowRight size={16} />
                  </button>
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
        </div>

        <style jsx>{`
          @keyframes logo-slide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-33.33%);
            }
          }

          /* Small responsive tweak */
          @media (max-width: 640px) {
            .overflow-hidden img {
              max-height: 28px;
            }
          }
        `}</style>
      </section>
    </>
  );
}

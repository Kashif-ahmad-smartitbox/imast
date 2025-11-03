import React, { useEffect, useMemo, useRef, useState } from "react";

export type LogoEntry = {
  url: string;
  alt?: string;
};

export type IntegrationSlot = {
  id: string;
  name?: string;
  logos: LogoEntry[];
  intervalMs?: number;
};

export type IntegrationsData = {
  heading?: string;
  subheading?: string;
  description?: string;
  items: IntegrationSlot[];
};

export type ImastIntegrationsRotatingSectionProps = {
  data: IntegrationsData;
  className?: string;
  defaultIntervalMs?: number;
  /** tailwind translate class applied to middle column items (tweak to taste) */
  middleColumnOffsetClass?: string;
};

function useStableRandomSeed() {
  const ref = useRef<number | null>(null);
  if (ref.current == null) ref.current = Math.floor(Math.random() * 600);
  return ref.current;
}

function RotatingLogo({
  logos,
  intervalMs = 3000,
  pauseOnHover = true,
}: {
  logos: LogoEntry[];
  intervalMs?: number;
  pauseOnHover?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const runningRef = useRef(true);
  const jitter = useStableRandomSeed();
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    runningRef.current = true;
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (!logos || logos.length <= 1) {
      setIndex(0);
      return () => {};
    }
    const startTimeout = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        if (!runningRef.current) return;
        setIndex((i) => (i + 1) % logos.length);
      }, intervalMs);
    }, jitter);

    return () => {
      window.clearTimeout(startTimeout);
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [logos, intervalMs, jitter]);

  const onMouseEnter = () => {
    if (pauseOnHover) runningRef.current = false;
  };
  const onMouseLeave = () => {
    if (pauseOnHover) runningRef.current = true;
  };

  return (
    <div
      className="relative w-full h-full flex items-center justify-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {logos.map((l, i) => {
        const isActive = i === index;
        return (
          <div
            key={i}
            className={
              "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-in-out " +
              (isActive
                ? "opacity-100 translate-y-0 scale-100 z-10"
                : "opacity-0 -translate-y-3 scale-95 z-0 pointer-events-none")
            }
            aria-hidden={!isActive}
            style={{ willChange: "transform, opacity" }}
          >
            {/* logo wrapper ensures consistent padding and aspect for diverse logos */}
            <div className="w-full max-w-[420px] px-6 md:px-8 lg:px-12">
              <img
                src={l.url}
                alt={isActive ? l.alt ?? "" : ""}
                loading="lazy"
                className="block mx-auto object-contain w-full md:max-h-[72px]"
                width={420}
                height={120}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function ImastIntegrationsRotatingSection({
  data,
  className = "",
  defaultIntervalMs = 3000,
  middleColumnOffsetClass = "lg:translate-y-6", // reduced offset so it's subtle
}: ImastIntegrationsRotatingSectionProps) {
  const {
    heading = "Our Integrated Partnerships",
    subheading = "Seamless Integration with Your Favorite Tools!",
    description = "Welcome the ease of integration with our system that already incorporates these smart tools.",
    items = [],
  } = data ?? {};

  const slots = useMemo(() => (items ?? []).slice(), [items]);

  /**
   * Layout approach:
   * - grid 3 columns on lg, 2 on md, 1 on sm
   * - each card keeps a consistent height via responsive classes
   * - logos contained in a constrained wrapper (max-w) so very wide logos don't overflow
   * - middle column items (index % 3 === 1) get a small translate-y to match the screenshot stagger
   */

  return (
    <section
      className={`py-16 bg-white ${className}`}
      aria-labelledby="integrations-heading"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2
            id="integrations-heading"
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900"
          >
            {heading}
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-700">
            {subheading}
          </p>
          <p className="mt-4 text-sm text-gray-600">{description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {slots.map((slot, idx) => {
            const colIndex = idx % 3;
            const translateClass =
              colIndex === 1 ? middleColumnOffsetClass : "";
            const ms = slot.intervalMs ?? defaultIntervalMs;

            return (
              <div
                key={slot.id}
                className={`relative flex items-center justify-center h-[84px] md:h-[100px] lg:h-[120px] rounded-2xl border-[2px] border-red-200 bg-white shadow-sm overflow-hidden transform ${translateClass}`}
                aria-label={slot.name ?? slot.id}
                role="group"
              >
                {/* inner padding keeps border spacing consistent with screenshot */}
                <div className="w-full h-full flex items-center">
                  <div className="w-full px-4">
                    <RotatingLogo logos={slot.logos} intervalMs={ms} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

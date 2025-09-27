"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Building,
  Truck,
  Coffee,
  ShoppingBag,
  Users,
  Globe,
  ArrowRight,
  Star,
} from "lucide-react";

type Vertical = {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  problems: string[];
  outcomes: string[];
  stat?: { label: string; value: string }[];
};

const VERTICALS: Vertical[] = [
  {
    id: "retail",
    title: "Retail & Chain Stores",
    icon: ShoppingBag,
    problems: [
      "Fragmented POS & inventory",
      "Low repeat purchase",
      "Slow promo rollouts",
    ],
    outcomes: [
      "Unified POS & stock",
      "Higher repeat rates",
      "Faster campaign launches",
    ],
    stat: [
      { label: "Stores", value: "1.2k" },
      { label: "+Rev", value: "+18%" },
    ],
  },
  {
    id: "distribution",
    title: "Distributors & Wholesalers",
    icon: Truck,
    problems: [
      "Complex order routing",
      "Returns & disputes",
      "Limited visibility",
    ],
    outcomes: [
      "Optimised routing",
      "Faster settlements",
      "End‑to‑end visibility",
    ],
    stat: [
      { label: "Routes/day", value: "4.5k" },
      { label: "OTR", value: "99%" },
    ],
  },
  {
    id: "fmcg",
    title: "FMCG Brands",
    icon: Globe,
    problems: [
      "Fragmented channel data",
      "Campaign ROI uncertainty",
      "Trade compliance",
    ],
    outcomes: ["Single source of truth", "Measurable lift", "Audit-ready ops"],
    stat: [
      { label: "SKUs", value: "8.2k" },
      { label: "NPS", value: "62" },
    ],
  },
  {
    id: "hospitality",
    title: "Hospitality & QSR",
    icon: Coffee,
    problems: [
      "Inconsistent guest experience",
      "Loyalty fragmentation",
      "Slow feedback",
    ],
    outcomes: [
      "Unified loyalty",
      "Faster guest recovery",
      "Actionable feedback",
    ],
    stat: [
      { label: "Outlets", value: "720" },
      { label: "Repeat", value: "+22%" },
    ],
  },
  {
    id: "field-sales",
    title: "Field Sales & Distribution",
    icon: Users,
    problems: ["Manual reporting", "Territory gaps", "Lead leakage"],
    outcomes: ["Realtime reporting", "Better coverage", "Higher conversion"],
    stat: [
      { label: "Reps", value: "5.4k" },
      { label: "Conv", value: "+14%" },
    ],
  },
  {
    id: "enterprise",
    title: "Enterprises & Integrators",
    icon: Building,
    problems: ["Integration debt", "Vendor sprawl", "Security & governance"],
    outcomes: [
      "API-first integrations",
      "Reduced vendors",
      "Enterprise-grade security",
    ],
    stat: [
      { label: "Orgs", value: "180+" },
      { label: "SLA", value: "99.95%" },
    ],
  },
];

export default function UseCases() {
  const [active, setActive] = useState<string | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonials = [
    {
      quote:
        "IMAST reduced stock-outs and increased campaign ROI by 28% in 6 months.",
      author: "Operations Head, FMCG Brand",
    },
    {
      quote: "Route efficiency improved 32% after we onboarded Distribution+.",
      author: "Logistics Head, Regional Distributor",
    },
    {
      quote: "Our loyalty program scaled fast — integration was painless.",
      author: "Head of CRM, National Retailer",
    },
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const t = setInterval(
      () => setTestimonialIndex((i) => (i + 1) % testimonials.length),
      5000
    );
    return () => clearInterval(t);
  }, []);

  return (
    <section
      className="py-16 lg:py-24 bg-gray-50"
      aria-labelledby="usecases-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-8">
          <p className="text-sm font-semibold text-rose-600">Use cases</p>
          <h2
            id="usecases-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Industry verticals we help
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We tailor implementations to your industry realities — fewer
            surprises, faster outcomes.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {VERTICALS.map((v) => (
            <VerticalCard
              key={v.id}
              v={v}
              active={active === v.id}
              onHover={() => setActive(v.id)}
              onLeave={() => setActive(null)}
            />
          ))}
        </div>

        {/* CTA strip */}
        <div className="mt-8 rounded-lg bg-gradient-to-r from-white to-rose-50 p-6 flex flex-col sm:flex-row items-center gap-4 justify-between border border-gray-100">
          <div>
            <div className="text-sm text-gray-600">
              Need a tailored solution?
            </div>
            <div className="mt-1 text-lg font-semibold text-gray-900">
              See how IMAST solves problems specific to your industry.
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold"
            >
              Talk to us
            </a>
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200"
            >
              View case studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Subcomponents ---------------- */
function VerticalCard({
  v,
  active,
  onHover,
  onLeave,
}: {
  v: Vertical;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const Icon = v.icon;
  return (
    <article
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`relative group bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-xl transition transform hover:-translate-y-1`}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-rose-50 to-rose-100 text-rose-600 shadow-sm">
            <Icon size={20} />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{v.title}</h3>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>
              <div className="font-medium text-gray-800">Problems</div>
              <ul className="mt-2 space-y-1">
                {v.problems.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-rose-600 rounded-full mt-1" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="font-medium text-gray-800">Outcomes</div>
              <ul className="mt-2 space-y-1">
                {v.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-1" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <a
              href={`/verticals/${v.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"
            >
              Explore <ArrowRight size={14} />
            </a>
            <a
              href="/contact"
              className="ml-auto inline-flex items-center px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-medium"
            >
              Talk to us
            </a>
          </div>

          {v.stat && (
            <div className="mt-4 flex gap-3 text-xs text-gray-700">
              {v.stat.map((s) => (
                <div
                  key={s.label}
                  className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg"
                >
                  <div className="font-bold text-gray-900">{s.value}</div>
                  <div className="text-gray-500">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function RolePill({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm font-semibold"
    >
      {children}
    </a>
  );
}

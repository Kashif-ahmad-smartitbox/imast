"use client";
import React, { useMemo, useState, useEffect } from "react";
import { Briefcase, ArrowRight, ChevronDown, X } from "lucide-react";

type CaseStudy = {
  id: string;
  title: string;
  logo?: string;
  excerpt: string;
  vertical: string;
  outcomes: string[];
  metrics?: { label: string; value: string }[];
  image?: string;
  featured?: boolean;
};

// prettier-ignore
const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-1",
    title: "How Brand X reduced stock-outs and grew revenue",
    logo: "https://placehold.co/80x40?text=Brand+X",
    excerpt:
      "Brand X used IMAST to unify retail & distributor data, reducing stock-outs by 45% and improving campaign ROI.",
    vertical: "FMCG",
    outcomes: ["Inventory", "Campaign ROI"],
    metrics: [
      { label: "Stock-outs", value: "-45%" },
      { label: "Campaign ROI", value: "+28%" },
    ],
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1400&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "cs-2",
    title: "Distributor Y optimizes routes and cuts costs",
    logo: "https://placehold.co/80x40?text=Dist+Y",
    excerpt:
      "Distribution+ reduced travel time and increased on-time delivery to 95% for Distributor Y.",
    vertical: "Distribution",
    outcomes: ["Routing", "POD"],
    metrics: [
      { label: "Route efficiency", value: "+32%" },
      { label: "OTD", value: "95%" },
    ],
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1400&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "cs-3",
    title: "Retail chain Z scales loyalty across 400 stores",
    logo: "https://placehold.co/80x40?text=Retail+Z",
    excerpt:
      "Loyalty Board helped Retail Z scale loyalty, increasing repeat purchase rates by 18%.",
    vertical: "Retail",
    outcomes: ["Loyalty", "Retention"],
    metrics: [{ label: "Repeat", value: "+18%" }],
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=1400&q=80&auto=format&fit=crop",
    featured: true,
  },
  {
    id: "cs-4",
    title: "QSR A enhances guest experience with unified data",
    logo: "https://placehold.co/80x40?text=QSR+A",
    excerpt:
      "Unified guest profiles and faster checkout reduced wait times and boosted NPS for QSR A.",
    vertical: "Hospitality",
    outcomes: ["Guest experience", "Checkout"],
    metrics: [{ label: "NPS", value: "+12 pts" }],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1400&q=80&auto=format&fit=crop",
  },
];

export default function CaseStudies() {
  const [open, setOpen] = useState<CaseStudy | null>(null);

  const featured = useMemo(
    () => CASE_STUDIES.filter((c) => c.featured).slice(0, 3),
    []
  );
  const others = useMemo(() => CASE_STUDIES.filter((c) => !c.featured), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section
      className="py-16 lg:py-24 bg-gray-50"
      aria-labelledby="case-studies-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-3xl font-semibold text-primary-600">
            Customer stories
          </p>
          <h2
            id="case-studies-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Success stories that move the needle
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Real outcomes from customers using IMAST across retail, distribution
            and FMCG.
          </p>
        </header>

        {/* Featured row — three compact cards aligned horizontally */}
        {featured.length > 0 && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featured.map((f) => (
              <article
                key={f.id}
                className="relative rounded-2xl overflow-hidden bg-white hover:shadow-xl transition transform hover:-translate-y-1"
              >
                <div className="relative h-44 md:h-48">
                  <img
                    src={f.image}
                    alt={f.title}
                    className="w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-100"
                    aria-hidden
                  />

                  {f.featured && (
                    <div className="absolute top-3 left-3 inline-flex items-center gap-2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm font-semibold text-gray-900">
                        {f.title}
                      </h3>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                    {f.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setOpen(f)}
                        className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm"
                        aria-label={`Read story: ${f.title}`}
                      >
                        Read story <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            // close when backdrop clicked
            if (e.target === e.currentTarget) setOpen(null);
          }}
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-hidden max-h-[85vh]">
            <div className="p-4 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <img
                    src={open.logo}
                    alt="logo"
                    className="h-10 object-contain"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {open.title}
                    </h3>
                    <div className="text-sm text-gray-500">{open.vertical}</div>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(null)}
                  className="text-gray-400 p-2 rounded-md hover:bg-gray-100"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-4">
                <img
                  src={open.image}
                  alt={open.title}
                  className="w-full h-56 object-cover rounded-md"
                />
              </div>

              <div className="mt-4 text-gray-700">
                <p>{open.excerpt}</p>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {open.metrics?.map((m) => (
                    <div key={m.label} className="bg-gray-50 p-3 rounded-md">
                      <div className="text-xs text-gray-500">{m.label}</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {m.value}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <a
                    href={`/case-studies/${open.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-600 text-white font-semibold"
                  >
                    Read full case study
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200"
                  >
                    Talk to our team
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

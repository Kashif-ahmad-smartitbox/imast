"use client";
import React, { useMemo, useState } from "react";
import {
  Briefcase,
  BookOpen,
  ArrowRight,
  ChevronDown,
  Search,
  Filter,
  Play,
} from "lucide-react";

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
    image: "https://placehold.co/600x360?text=Case+1",
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
    image: "https://placehold.co/600x360?text=Case+2",
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
    image: "https://placehold.co/600x360?text=Case+3",
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
    image: "https://placehold.co/600x360?text=Case+4",
  },
];

export default function CaseStudies() {
  const [vertical, setVertical] = useState<string | "All">("All");
  const [query, setQuery] = useState("");
  const [showCount, setShowCount] = useState(6);
  const [open, setOpen] = useState<CaseStudy | null>(null);

  const verticals = useMemo(
    () => ["All", ...Array.from(new Set(CASE_STUDIES.map((c) => c.vertical)))],
    []
  );

  const filtered = useMemo(() => {
    return CASE_STUDIES.filter((c) => {
      if (vertical !== "All" && c.vertical !== vertical) return false;
      if (
        query &&
        !`${c.title} ${c.excerpt}`.toLowerCase().includes(query.toLowerCase())
      )
        return false;
      return true;
    }).slice(0, showCount);
  }, [vertical, query, showCount]);

  const featured = CASE_STUDIES.filter((c) => c.featured).slice(0, 3);

  return (
    <section
      className="py-16 lg:py-24 bg-gray-50"
      aria-labelledby="case-studies-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold text-rose-600">
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

        {/* Featured carousel */}
        {featured.length > 0 && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {featured.map((f, i) => (
              <article
                key={f.id}
                className="relative rounded-2xl overflow-hidden bg-white shadow-md group"
              >
                <img
                  src={f.image}
                  alt={f.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={f.logo}
                        alt="logo"
                        className="h-6 object-contain"
                      />
                      <div className="text-sm font-semibold text-gray-900">
                        {f.title}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{f.vertical}</div>
                  </div>

                  <p className="mt-3 text-sm text-gray-600 line-clamp-3">
                    {f.excerpt}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      {f.metrics?.map((m) => (
                        <div
                          key={m.label}
                          className="bg-gray-100 px-2 py-1 rounded-md"
                        >
                          {m.label}:{" "}
                          <strong className="text-gray-900">{m.value}</strong>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => setOpen(f)}
                      className="inline-flex items-center gap-2 text-rose-600 font-semibold"
                    >
                      Read story <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-2">
            <label className="sr-only">Filter vertical</label>
            <div className="inline-flex items-center gap-2 bg-white rounded-md border border-gray-200 px-3 py-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={vertical}
                onChange={(e) => setVertical(e.target.value)}
                className="bg-transparent outline-none text-sm"
              >
                {verticals.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div className="inline-flex items-center bg-white rounded-md border border-gray-200 px-3 py-2 ml-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                placeholder="Search stories"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="ml-2 text-sm outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/case-studies"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold"
            >
              View all case studies
            </a>
            <button
              onClick={() => setShowCount((s) => s + 6)}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
            >
              Load more
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <img src={c.logo} alt="logo" className="h-8 object-contain" />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {c.title}
                  </h3>
                  <div className="text-xs text-gray-400">{c.vertical}</div>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-600 line-clamp-4">
                {c.excerpt}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  {c.outcomes.map((o) => (
                    <span key={o} className="bg-gray-100 px-2 py-1 rounded-md">
                      {o}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => setOpen(c)}
                  className="inline-flex items-center gap-2 text-rose-600 font-semibold text-sm"
                >
                  Read story <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Simple modal (inline) — replace with real modal when integrating */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg overflow-auto max-h-[85vh]">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={open.logo}
                  alt="logo"
                  className="h-8 object-contain"
                />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {open.title}
                  </h3>
                  <div className="text-sm text-gray-500">{open.vertical}</div>
                </div>
                <button onClick={() => setOpen(null)} className="text-gray-400">
                  Close
                </button>
              </div>

              <img
                src={open.image}
                alt={open.title}
                className="mt-4 rounded-md object-cover w-full h-56"
              />

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
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold"
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

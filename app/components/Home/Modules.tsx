"use client";
import React from "react";
import {
  ShoppingCart,
  Repeat,
  Star,
  TrendingUp,
  Zap,
  Settings,
  Layers,
  Database,
  ArrowRight,
} from "lucide-react";

export default function Modules() {
  const modules = [
    {
      id: "retail-point",
      title: "Retail Point",
      desc: "Fast, reliable POS built for modern retail — payments, inventory and receipts.",
      icon: ShoppingCart,
      category: "Retail",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      id: "distribution-plus",
      title: "Distribution+",
      desc: "End‑to‑end Distributor Management System (DMS) to manage orders, returns and routes.",
      icon: Repeat,
      category: "Ops",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: "loyalty-board",
      title: "Loyalty Board",
      desc: "Design and run reward programs that keep customers and channels engaged.",
      icon: Star,
      category: "Loyalty",
      gradient: "from-amber-500 to-orange-500",
    },
    {
      id: "sales-track",
      title: "Sales Track",
      desc: "Sales force automation with territory management, targets and performance.",
      icon: TrendingUp,
      category: "Ops",
      gradient: "from-emerald-500 to-green-500",
    },
    {
      id: "lead-sprint",
      title: "Lead Sprint",
      desc: "Capture, route and convert leads — faster time to close and better visibility.",
      icon: Zap,
      category: "Retail",
      gradient: "from-violet-500 to-purple-500",
    },
    {
      id: "true-view",
      title: "True View",
      desc: "After-sales service management for repair, warranty and field teams.",
      icon: Settings,
      category: "Service",
      gradient: "from-sky-500 to-blue-500",
    },
    {
      id: "imast-core",
      title: "Platform Core",
      desc: "APIs, data layer and integrations for unified operations and analytics.",
      icon: Layers,
      category: "Platform",
      gradient: "from-gray-700 to-gray-900",
    },
    {
      id: "data-engine",
      title: "Data Engine",
      desc: "Centralized analytics, reporting and dashboards for real-time decisions.",
      icon: Database,
      category: "Platform",
      gradient: "from-indigo-500 to-blue-700",
    },
  ];

  const categories = ["All", "Retail", "Ops", "Loyalty", "Service", "Platform"];

  const [activeCat, setActiveCat] = React.useState<string>("All");

  const visible = modules.filter(
    (m) => activeCat === "All" || m.category === activeCat
  );

  return (
    <section className="py-20 lg:py-28 bg-rose-700 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-[#FFECEC] uppercase tracking-wide">
            Core Solutions
          </p>
          <h2
            id="proof-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-white"
          >
            Modules that power your business
          </h2>
          <p className="mt-3 text-[#F5E8E6] max-w-2xl mx-auto">
            Choose the modules that fit your needs — integrate seamlessly, start
            with an MVP, and scale as you grow. All built to work together
            perfectly.
          </p>
        </header>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                activeCat === c
                  ? "bg-white text-gray-900 shadow-lg shadow-gray-200/50 ring-1 ring-gray-200"
                  : "text-white hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Mobile category selector */}
        <div className="sm:hidden mb-8">
          <select
            value={activeCat}
            onChange={(e) => setActiveCat(e.target.value)}
            className="w-full border border-gray-200 rounded-xl p-3 bg-white shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
            aria-label="Filter modules"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {visible.map((m) => (
            <article
              key={m.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 p-6 flex flex-col relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${m.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
              />

              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`rounded-2xl p-3 bg-gradient-to-br ${m.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <m.icon size={24} />
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                  {m.category}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-gray-800 transition-colors">
                  {m.title}
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {m.desc}
                </p>
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                <a
                  href={`/solutions/${m.id}`}
                  className="text-sm font-semibold text-gray-700 hover:text-gray-900 inline-flex items-center gap-2 group/link transition-colors"
                >
                  Learn more
                  <ArrowRight
                    size={14}
                    className="group-hover/link:translate-x-1 transition-transform"
                  />
                </a>
                <a
                  href="/contact"
                  className="ml-auto inline-flex items-center px-4 py-2 rounded bg-gradient-to-r from-rose-600 to-rose-700 text-white text-sm font-semibold hover:shadow-xl hover:shadow-red-500/30 transition-all duration-300"
                >
                  Get demo
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

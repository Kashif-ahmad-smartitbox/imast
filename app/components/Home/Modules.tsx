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
    },
    {
      id: "distribution-plus",
      title: "Distribution+",
      desc: "End‑to‑end Distributor Management System (DMS) to manage orders, returns and routes.",
      icon: Repeat,
      category: "Ops",
    },
    {
      id: "loyalty-board",
      title: "Loyalty Board",
      desc: "Design and run reward programs that keep customers and channels engaged.",
      icon: Star,
      category: "Loyalty",
    },
    {
      id: "sales-track",
      title: "Sales Track",
      desc: "Sales force automation with territory management, targets and performance.",
      icon: TrendingUp,
      category: "Ops",
    },
    {
      id: "lead-sprint",
      title: "Lead Sprint",
      desc: "Capture, route and convert leads — faster time to close and better visibility.",
      icon: Zap,
      category: "Retail",
    },
    {
      id: "true-view",
      title: "True View",
      desc: "After-sales service management for repair, warranty and field teams.",
      icon: Settings,
      category: "Service",
    },
    {
      id: "imast-core",
      title: "Platform Core",
      desc: "APIs, data layer and integrations for unified operations and analytics.",
      icon: Layers,
      category: "Platform",
    },
    {
      id: "data-engine",
      title: "Data Engine",
      desc: "Centralized analytics, reporting and dashboards for real-time decisions.",
      icon: Database,
      category: "Platform",
    },
  ];

  const categories = ["All", "Retail", "Ops", "Loyalty", "Service", "Platform"];

  const [activeCat, setActiveCat] = React.useState<string>("All");

  const visible = modules.filter(
    (m) => activeCat === "All" || m.category === activeCat
  );

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 mb-8">
          <div>
            <h3 className="text-base font-semibold text-red-600">
              Core Solutions
            </h3>
            <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
              Modules that run your business
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-xl">
              Pick the modules that match your needs — integrate them, start
              with an MVP, and expand when ready.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCat(c)}
                className={`px-3 py-2 rounded-full text-sm font-medium transition ${
                  activeCat === c
                    ? "bg-red-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile category selector */}
        <div className="sm:hidden mb-6">
          <select
            value={activeCat}
            onChange={(e) => setActiveCat(e.target.value)}
            className="w-full border rounded-lg p-2"
            aria-label="Filter modules"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((m) => (
            <article
              key={m.id}
              className="group bg-white rounded-2xl border border-gray-100 hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl p-3 bg-gray-50 text-red-600 group-hover:bg-red-50 transition">
                  <m.icon size={20} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{m.title}</h4>
                  <p className="mt-2 text-sm text-gray-600">{m.desc}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3">
                <a
                  href={`/solutions/${m.id}`}
                  className="text-sm font-semibold text-red-600 inline-flex items-center gap-2"
                >
                  Learn more <ArrowRight size={14} />
                </a>
                <a
                  href="/contact"
                  className="ml-auto inline-flex items-center px-3 py-2 rounded-lg bg-red-600 text-white text-sm font-medium"
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

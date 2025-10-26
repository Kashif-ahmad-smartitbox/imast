"use client";
import React, { useMemo, useState } from "react";
import {
  Link as LinkIcon,
  Database,
  Zap,
  Cloud,
  Box,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

type Partner = {
  id: string;
  name: string;
  logo: string; // url
  category: string; // Payments, ERP, Analytics, Devices, Cloud
  desc?: string;
  docs?: string;
};

const PARTNERS: Partner[] = [
  {
    id: "p-razor",
    name: "Razorpay",
    logo: "https://placehold.co/140x40?text=Razorpay",
    category: "Payments",
    desc: "Payments gateway for India",
    docs: "/docs/integrations/razorpay",
  },
  {
    id: "p-payu",
    name: "PayU",
    logo: "https://placehold.co/140x40?text=PayU",
    category: "Payments",
    desc: "Popular payments provider",
    docs: "/docs/integrations/payu",
  },
  {
    id: "p-tally",
    name: "Tally",
    logo: "https://placehold.co/140x40?text=Tally",
    category: "ERP",
    desc: "Accounting and ERP integration",
    docs: "/docs/integrations/tally",
  },
  {
    id: "p-zoho",
    name: "Zoho",
    logo: "https://placehold.co/140x40?text=Zoho",
    category: "ERP",
    desc: "CRM & ERP connector",
    docs: "/docs/integrations/zoho",
  },
  {
    id: "p-ga",
    name: "Google Analytics",
    logo: "https://placehold.co/140x40?text=GA",
    category: "Analytics",
    desc: "Event and campaign analytics",
    docs: "/docs/integrations/ga",
  },
  {
    id: "p-powerbi",
    name: "Power BI",
    logo: "https://placehold.co/140x40?text=PowerBI",
    category: "Analytics",
    desc: "BI connector for tiled dashboards",
    docs: "/docs/integrations/powerbi",
  },
  {
    id: "p-bluetooth",
    name: "Barcode Devices",
    logo: "https://placehold.co/140x40?text=Scanners",
    category: "Devices",
    desc: "Scanners, printers and cash-drawers",
    docs: "/docs/integrations/devices",
  },
  {
    id: "p-aws",
    name: "AWS",
    logo: "https://placehold.co/140x40?text=AWS",
    category: "Cloud",
    desc: "Cloud hosting & storage",
    docs: "/docs/integrations/aws",
  },
  {
    id: "p-gcp",
    name: "GCP",
    logo: "https://placehold.co/140x40?text=GCP",
    category: "Cloud",
    desc: "Managed cloud services",
    docs: "/docs/integrations/gcp",
  },
];

export default function PartnersIntegrations() {
  const [filter, setFilter] = useState<string>("All");
  const [query, setQuery] = useState<string>("");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(PARTNERS.map((p) => p.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTNERS.filter((p) => {
      if (filter !== "All" && p.category !== filter) return false;
      if (q && !`${p.name} ${p.desc || ""}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [filter, query]);

  return (
    <section
      className="py-8 lg:py-12 bg-white"
      aria-labelledby="partners-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-primary-600">
            Partners & Integrations
          </p>
          <h2
            id="partners-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Connect the systems you already use
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Pre-built connectors for payments, ERP, analytics and devices — plus
            open APIs so you can integrate anything.
          </p>
        </header>

        {/* Partner logos marquee */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-gray-100">
          <div className="flex gap-8 px-6 py-4 animate-marquee whitespace-nowrap">
            {PARTNERS.concat(PARTNERS).map((p, i) => (
              <div
                key={p.id + i}
                className="inline-flex items-center justify-center min-w-[160px]"
              >
                <img
                  src={p.logo}
                  alt={p.name}
                  className="max-h-10 object-contain opacity-95"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                  filter === c
                    ? "bg-primary-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              aria-label="Search integrations"
              placeholder="Search integrations (e.g. Razorpay, Tally)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full sm:w-64 px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-100"
            />
            <Link
              href="/integrations"
              className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50"
            >
              View all
            </Link>
          </div>
        </div>

        {/* Integrations grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-4 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 flex items-center justify-center bg-gray-50 rounded">
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="max-h-8 object-contain"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm font-semibold text-gray-900">
                      {p.name}
                    </h3>
                    <div className="text-xs text-gray-400">{p.category}</div>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{p.desc}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a
                  href={p.docs || "/docs/integrations"}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary-600"
                >
                  View docs <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href={`/integrations/${p.id}`}
                  className="text-xs px-2 py-1 rounded bg-gray-50 border border-gray-100"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-3 bg-primary-50 px-4 py-3 rounded-2xl border border-primary-100">
            <Cloud className="text-primary-600" />
            <div className="text-left">
              <div className="font-semibold text-gray-900">Open API & SDKs</div>
              <div className="text-sm text-gray-600">
                Build custom connectors or use our SDKs to integrate deeply.
              </div>
            </div>
            <Link
              href="/docs/api"
              className="ml-4 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white"
            >
              Explore API <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
}

// components/StatsSection.tsx
"use client";

import React from "react";
import { Users, CheckCircle2, Layers, Repeat } from "lucide-react";

type Stat = {
  id: string;
  value: string | number;
  label: string;
  color?: string; // main accent color for the stat
  accent?: string; // light background tint
  Icon?: React.ComponentType<any>;
};

const DEFAULT_STATS: Stat[] = [
  {
    id: "users",
    value: "2M+",
    label: "Users Served",
    color: "#F78A4D",
    accent: "rgba(247,138,77,0.08)",
    Icon: Users,
  },
  {
    id: "impl",
    value: "500+",
    label: "Successful implementations",
    color: "#E5475B",
    accent: "rgba(229,71,91,0.06)",
    Icon: CheckCircle2,
  },
  {
    id: "vert",
    value: "100+",
    label: "Product Verticals Served",
    color: "#F5B94A",
    accent: "rgba(245,185,74,0.06)",
    Icon: Layers,
  },
  {
    id: "ret",
    value: "95%",
    label: "Client Retention Rate",
    color: "#9B4DAA",
    accent: "rgba(155,77,170,0.06)",
    Icon: Repeat,
  },
];

export default function StatsSection({
  title = "IMAST - The Catalyst Your Business Needs!",
  description = "With IMAST, you can connect all the dots between your sales channels and customers. We empower you to build your own unique digital ecosystem that is integrated, resilient, and scalable.",
  stats = DEFAULT_STATS,
}: {
  title?: string;
  description?: string;
  stats?: Stat[];
}) {
  return (
    <section
      aria-labelledby="stats-heading"
      className="bg-white py-16 lg:py-28"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 text-center">
        <h2
          id="stats-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight"
        >
          {title}
        </h2>

        <p className="mt-6 text-gray-600 max-w-4xl mx-auto text-base sm:text-lg">
          {description}
        </p>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.Icon ?? Users;
            return (
              <article
                key={s.id}
                className="relative rounded-2xl p-8 bg-white/60 hover:bg-white transition-shadow transition-colors duration-250 ease-out shadow-sm hover:shadow-2xl border border-transparent hover:border-gray-100"
                aria-labelledby={`stat-${s.id}-title`}
                role="region"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex-shrink-0 h-12 w-12 rounded-lg flex items-center justify-center"
                    style={{
                      background: s.accent ?? "rgba(0,0,0,0.03)",
                      boxShadow: "inset 0 -6px 12px rgba(255,255,255,0.4)",
                    }}
                    aria-hidden
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                      style={{ color: s.color ?? "#E84A5F" }}
                      aria-hidden
                    />
                  </div>

                  <div className="flex-1 text-left">
                    <div
                      id={`stat-${s.id}-title`}
                      className="text-3xl sm:text-4xl font-extrabold"
                      style={{ color: s.color ?? "#E84A5F" }}
                    >
                      {s.value}
                    </div>
                    <div className="mt-2 text-sm font-medium text-gray-800">
                      {s.label}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

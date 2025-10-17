"use client";

import React, { useMemo, useState } from "react";
import { TrendingUp, Users, FileText, Clock, Calendar } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Metric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  icon: React.ComponentType<any>;
};

const demoMetrics: Metric[] = [
  {
    id: "visits",
    label: "Visits",
    value: "24.3K",
    delta: "+15%",
    icon: TrendingUp,
  },
  {
    id: "users",
    label: "Unique Visitors",
    value: "12.8K",
    delta: "+9%",
    icon: Users,
  },
  {
    id: "pages",
    label: "Pageviews",
    value: "48.1K",
    delta: "+12%",
    icon: FileText,
  },
  {
    id: "avg",
    label: "Avg. Session",
    value: "3m 12s",
    delta: "-1%",
    icon: Clock,
  },
];

const baseSeries = Array.from({ length: 14 }).map((_, i) => {
  const day = `Day ${i + 1}`;
  const visits = Math.round(
    800 + Math.sin(i / 2) * 120 + i * 30 + Math.random() * 80
  );
  const users = Math.round(visits * (0.45 + Math.random() * 0.15));
  return { day, visits, users };
});

const topPages = [
  { title: "/", pageviews: 8431, visitors: 4120, change: "+8%" },
  { title: "/blog", pageviews: 5202, visitors: 3001, change: "+4%" },
  { title: "/pricing", pageviews: 3200, visitors: 2100, change: "+10%" },
  { title: "/about", pageviews: 2380, visitors: 1200, change: "-2%" },
];

const Analytics: React.FC = () => {
  const [range, setRange] = useState<"7d" | "14d" | "30d">("14d");
  const [metric, setMetric] = useState<"visits" | "users">("visits");

  // filter or synthesize series based on range
  const series = useMemo(() => {
    const days = range === "7d" ? 7 : range === "14d" ? 14 : 30;
    // if baseSeries shorter than days, extend by repeating pattern
    const result: any[] = [];
    for (let i = 0; i < days; i++) {
      const idx = i % baseSeries.length;
      const base = baseSeries[idx];
      // slightly vary values for longer ranges
      const multiplier = 1 + Math.floor(i / baseSeries.length) * 0.03;
      result.push({
        label:
          base.day +
          (Math.floor(i / baseSeries.length)
            ? `+${Math.floor(i / baseSeries.length)}`
            : ""),
        visits: Math.round(base.visits * multiplier),
        users: Math.round(base.users * multiplier),
      });
    }
    return result;
  }, [range]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500">
            Traffic, engagement and trends for your site. Data shown is
            synthetic for demo purposes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">Last: </span>
            <div className="inline-flex gap-1">
              <button
                onClick={() => setRange("7d")}
                className={`px-2 py-1 rounded-md text-sm ${
                  range === "7d"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                7d
              </button>
              <button
                onClick={() => setRange("14d")}
                className={`px-2 py-1 rounded-md text-sm ${
                  range === "14d"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                14d
              </button>
              <button
                onClick={() => setRange("30d")}
                className={`px-2 py-1 rounded-md text-sm ${
                  range === "30d"
                    ? "bg-primary-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                30d
              </button>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2">
            <span className="text-sm text-gray-500">Metric</span>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value as any)}
              className="bg-transparent outline-none text-sm text-gray-700"
              aria-label="Select metric"
            >
              <option value="visits">Visits</option>
              <option value="users">Unique Visitors</option>
            </select>
          </div>
        </div>
      </div>

      {/* Metrics */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {demoMetrics.map((m) => (
          <div
            key={m.id}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500 font-medium">{m.label}</div>
              <m.icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="mt-3 flex items-end justify-between gap-4">
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {m.value}
                </div>
                <div className="text-sm text-gray-500">{m.delta} vs prior</div>
              </div>
              <div
                className={`text-sm font-medium ${
                  m.delta.startsWith("-")
                    ? "text-primary-600"
                    : "text-emerald-600"
                }`}
              >
                {m.delta}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Chart + Top pages */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-gray-900">
              Traffic trend
            </h2>
            <div className="text-sm text-gray-500">
              Showing: {metric === "visits" ? "Visits" : "Unique Visitors"}
            </div>
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={series}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="label" tick={{ fontSize: 12 }} />
                <YAxis
                  tickFormatter={(v) =>
                    v >= 1000 ? `${Math.round(v / 1000)}k` : `${v}`
                  }
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey={metric}
                  stroke="#fb7185" // primary-400
                  strokeWidth={2}
                  dot={{ r: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-md font-semibold text-gray-900">Top pages</h3>
            <div className="text-xs text-gray-500">by pageviews</div>
          </div>

          <ul className="divide-y divide-gray-100">
            {topPages.map((p) => (
              <li
                key={p.title}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <div className="text-sm font-medium text-gray-900 truncate">
                    {p.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.visitors} visitors
                  </div>
                </div>
                <div className="text-sm text-gray-900 text-right">
                  <div>{p.pageviews}</div>
                  <div
                    className={`text-xs ${
                      p.change.startsWith("-")
                        ? "text-primary-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {p.change}
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-center">
            <button className="text-sm text-primary-600 hover:underline">
              View full analytics
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Analytics;

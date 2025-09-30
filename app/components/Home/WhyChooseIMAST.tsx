"use client";
import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Award,
  Globe,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const differentiators = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise-grade security",
    desc: "TLS, RBAC, audit logs, and compliance-ready controls.",
    accent: "from-green-50 to-green-100",
    color: "text-green-600",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast to deploy",
    desc: "MVP-first delivery — production-capable in weeks, not months.",
    accent: "from-amber-50 to-amber-100",
    color: "text-amber-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "On-ground support",
    desc: "Local implementation teams and training to make rollouts stick.",
    accent: "from-sky-50 to-sky-100",
    color: "text-sky-600",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Modular & extensible",
    desc: "Pick modules now and integrate systems later — future-proof.",
    accent: "from-violet-50 to-violet-100",
    color: "text-violet-600",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Proven outcomes",
    desc: "Measured lift in revenue, retention and operational efficiency.",
    accent: "from-rose-50 to-rose-100",
    color: "text-rose-600",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Scalable globally",
    desc: "Deploy once, expand seamlessly across regions with localization support.",
    accent: "from-indigo-50 to-indigo-100",
    color: "text-indigo-600",
  },
];

export default function WhyChooseIMAST() {
  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="why-imast-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-rose-600">Why IMAST</p>
          <h2
            id="why-imast-title"
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Practical engineering that delivers — secure, fast, and field-proven
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            No fluff — we build what moves the business. Simple contracts,
            hands-on onboarding, and outcomes that show up on your P&L.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <article
                key={d.title}
                className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6hover:shadow-md transition-transform transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${d.accent} flex items-center justify-center ring-0`}
                    aria-hidden
                  >
                    <div className={`${d.color} bg-white/0`}>{d.icon}</div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 leading-tight">
                      {d.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{d.desc}</p>

                    <div className="mt-4 flex items-center gap-3">
                      <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-rose-600 text-white text-sm font-medium shadow-sm hover:opacity-95 transition"
                      >
                        Discuss
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl bg-white p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    Why IMAST is better
                  </div>
                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    Less risk. Faster wins.
                  </div>
                </div>
                <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                  Quick comparison
                </div>
              </div>

              <ul className="mt-4 space-y-3 text-sm text-gray-700">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    Delivery in <strong>weeks</strong> with MVP-first scope
                    control.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    Field teams for onboarding — we don’t just drop a link and
                    go.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    Modular architecture — integrates with your ERP, not
                    replaces it.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span>
                    Measurable ROI: focus on retention, revenue lift and reduced
                    ops cost.
                  </span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

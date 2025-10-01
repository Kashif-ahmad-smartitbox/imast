"use client";
import React, { useMemo } from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Award,
  Globe,
  ArrowRight,
} from "lucide-react";

type Differentiator = {
  icon: React.ReactNode;
  title: string;
  desc: string;
  accent: string;
  color: string;
};

const differentiatorsData = (): Differentiator[] =>
  [
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
  ] as Differentiator[];

/**
 * BlinkBullet
 * - Just a pulsing green circle, no check icon
 */
function BlinkBullet({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      aria-hidden="true"
    >
      {/* Ping animation */}
      <span
        className="absolute inline-flex h-3 w-3 rounded-full bg-green-400/60 animate-ping"
        style={{ animationDuration: "1200ms" }}
      />
      {/* Solid dot */}
      <span className="relative inline-flex h-3 w-3 rounded-full bg-green-600" />
    </span>
  );
}

export default function WhyChooseIMAST() {
  const differentiators = useMemo(() => differentiatorsData(), []);

  const quickPoints = useMemo(
    () => [
      "Delivery in weeks with MVP-first scope control.",
      "Field teams for onboarding — we don't just drop a link and go.",
      "Modular architecture — integrates with your ERP, not replaces it.",
      "Measurable ROI: focus on retention, revenue lift and reduced ops cost.",
      "Built-in compliance and audit readiness — no shortcuts on governance.",
      "Scales from pilot to enterprise rollout without rework.",
      "Human + AI support model — automation where it fits, people where it matters.",
      "Transparent pricing — no hidden costs, no lock-ins.",
    ],
    []
  );

  return (
    <section
      className="w-full bg-gradient-to-br from-[#E63935] to-[#F29646]"
      aria-labelledby="why-imast-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <header className="text-center mb-8">
          <p className="text-3xl font-semibold text-rose-100">Why IMAST?</p>
          <h2
            id="why-imast-title"
            className="mt-3 text-xl sm:text-4xl font-extrabold tracking-tight text-white"
          >
            Practical engineering that delivers — secure, fast, and field-proven
          </h2>
          <p className="mt-3 max-w-3xl mx-auto text-rose-100">
            No fluff — we build what moves the business. Simple contracts,
            hands-on onboarding, and outcomes that show up on your P&amp;L.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <article
                key={d.title}
                className="relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 hover:shadow-md transition-transform transform hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br ${d.accent} flex items-center justify-center`}
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

          <aside className="lg:col-span-5 flex flex-col gap-6 h-full">
            <div className="rounded-2xl bg-white p-6 shadow-sm flex-1">
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
                {quickPoints.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span className="flex-shrink-0 mt-1 flex items-center justify-center">
                      <BlinkBullet />
                    </span>
                    <span className="leading-tight">{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Card */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500">Trusted by</div>
                  <div className="mt-1 text-2xl font-bold text-gray-900">
                    500+
                  </div>
                </div>

                <a
                  href="/start-trial"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-rose-600 text-white text-sm font-medium shadow-sm hover:opacity-95 transition"
                >
                  Start trial
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

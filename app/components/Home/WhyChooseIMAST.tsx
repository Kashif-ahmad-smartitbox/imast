"use client";
import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  Layers,
  Award,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

/**
 * WhyChooseIMAST.tsx — Polished & improved design
 *
 * Notes:
 * - TailwindCSS required.
 * - Replace /logo.svg and /one-pager.pdf with your actual assets.
 */

const differentiators = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Enterprise-grade security",
    desc: "TLS, RBAC, audit logs, and SOC-ready controls — built for compliance.",
    accent: "from-green-50 to-green-100",
    color: "text-green-600",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Fast to deploy",
    desc: "MVP-first, production-capable in weeks — get value early and iterate.",
    accent: "from-amber-50 to-amber-100",
    color: "text-amber-600",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "On-ground support",
    desc: "Local implementation teams, training and ops to make the rollout stick.",
    accent: "from-sky-50 to-sky-100",
    color: "text-sky-600",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "Modular & extensible",
    desc: "Pick modules now, integrate systems later — future-proof architecture.",
    accent: "from-violet-50 to-violet-100",
    color: "text-violet-600",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Proven outcomes",
    desc: "Measurable lift in revenue, retention and operational efficiency.",
    accent: "from-rose-50 to-rose-100",
    color: "text-rose-600",
  },
];

export default function WhyChooseIMAST() {
  return (
    <section
      className="bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="why-imast-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <header className="text-center mb-10">
          <p className="text-sm font-semibold text-rose-600">Why IMAST</p>
          <h2
            id="why-imast-title"
            className="mt-3 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight"
          >
            Built for real businesses — practical, secure, and fast
          </h2>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            We combine enterprise-grade engineering with pragmatic field
            experience — less ceremony, faster outcomes. No buzzwords; just
            things that actually move the needle.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Differentiators */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {differentiators.map((d) => (
              <article
                key={d.title}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-4 sm:p-6 hover:shadow-lg transition transform hover:-translate-y-1"
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

                      <a
                        href="/case-studies"
                        className="text-sm text-gray-500 hover:text-gray-700 transition"
                      >
                        See examples
                      </a>
                    </div>
                  </div>
                </div>

                {/* subtle accent */}
                <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
                  <svg
                    width="160"
                    height="160"
                    viewBox="0 0 160 160"
                    fill="none"
                  >
                    <circle cx="80" cy="80" r="80" fill="#fff00050" />
                  </svg>
                </div>
              </article>
            ))}
          </div>

          {/* Right column: comparison + badges + quick wins */}
          <aside className="lg:col-span-5 space-y-6">
            {/* Comparison card */}
            <div className="rounded-2xl bg-gradient-to-br from-white to-gray-50 p-6 border border-gray-100">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-gray-500">
                    IMAST vs Typical vendor
                  </div>
                  <div className="mt-2 text-lg font-semibold text-gray-900">
                    Less risk. Faster outcomes.
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs text-gray-400">
                  Quick view
                </div>
              </div>

              {/* Table - compact with icons */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-500">
                      <th className="pb-2">Capability</th>
                      <th className="pb-2">IMAST</th>
                      <th className="pb-2">Typical</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-700">
                    <tr className="border-t border-gray-100">
                      <td className="py-3">Time to value</td>
                      <td className="py-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" /> Weeks
                      </td>
                      <td className="py-3 flex items-center gap-2 text-gray-600">
                        <X className="w-4 h-4 text-gray-300" /> Months
                      </td>
                    </tr>

                    <tr className="border-t border-gray-100">
                      <td className="py-3">Implementation</td>
                      <td className="py-3">On-ground + remote</td>
                      <td className="py-3">Remote-only</td>
                    </tr>

                    <tr className="border-t border-gray-100">
                      <td className="py-3">Security</td>
                      <td className="py-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600" />{" "}
                        Enterprise-grade
                      </td>
                      <td className="py-3">Varies</td>
                    </tr>

                    <tr className="border-t border-gray-100">
                      <td className="py-3">Expandability</td>
                      <td className="py-3">Modular</td>
                      <td className="py-3">Often siloed</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 text-white font-semibold shadow-sm hover:shadow"
                >
                  Talk to us
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="/one-pager.pdf"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-sm"
                >
                  Download one-pager
                </a>
              </div>
            </div>

            {/* Trust / badges */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center gap-4">
              <img src="/logo.svg" alt="imast" className="h-8" />
              <div>
                <div className="text-sm font-semibold text-gray-800">
                  Trusted & compliant
                </div>
                <div className="text-xs text-gray-600">
                  SOC-ready processes • Data residency • Contractual SLAs
                </div>
              </div>
            </div>

            {/* Short wins */}
            <div className="bg-white rounded-2xl p-4 border border-gray-100 text-sm text-gray-700">
              <div className="font-semibold text-gray-800 mb-2">
                Short wins you can expect
              </div>
              <ul className="space-y-1 list-disc pl-5">
                <li>30% faster checkout and lower queues</li>
                <li>20% reduction in returns through smarter routing</li>
                <li>Measurable campaign uplift in 60–90 days</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom: extended trust row */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center gap-4">
            <img src="/logo.svg" alt="imast" className="h-8" />
            <div className="text-sm text-gray-600">
              Deployments across retail, distribution and FMCG — partner-led
              onboarding available.
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-700">Want the short version?</div>
            <a
              href="/one-pager.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200"
            >
              Download one-pager
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

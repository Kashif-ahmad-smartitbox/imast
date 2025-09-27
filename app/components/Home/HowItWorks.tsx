"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Server,
  Zap,
  Users,
  Database,
  Link as LinkIcon,
  Cloud,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

// HowItWorks.tsx — improved
// - Cleaner, more semantic structure
// - Small reveal-on-scroll animations for steps
// - Accessible roles and labels
// - Easier-to-read diagram and improved spacing
// - Extracted Step component

type Step = {
  id: number;
  title: string;
  desc: string;
  Icon: React.ComponentType<any>;
  colorClass: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Connect channels",
    desc: "Plug POS, e-commerce and distributor systems into a single data layer.",
    Icon: LinkIcon,
    colorClass: "bg-rose-50 text-rose-600",
  },
  {
    id: 2,
    title: "Automate operations",
    desc: "Route orders, sync inventory and automate settlements and returns.",
    Icon: Zap,
    colorClass: "bg-amber-50 text-amber-600",
  },
  {
    id: 3,
    title: "Engage customers",
    desc: "Run personalised loyalty campaigns and omnichannel promotions.",
    Icon: Users,
    colorClass: "bg-sky-50 text-sky-600",
  },
  {
    id: 4,
    title: "Analyze & optimize",
    desc: "Centralized analytics and alerts to improve decisions in real-time.",
    Icon: Database,
    colorClass: "bg-violet-50 text-violet-600",
  },
];

export default function HowItWorks() {
  // reveal state for steps (simple intersection observer)
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [visibleSteps, setVisibleSteps] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const nodes = Array.from(
      containerRef.current?.querySelectorAll<HTMLElement>("[data-step]") || []
    );
    if (!nodes.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-step"));
          if (entry.isIntersecting) {
            setVisibleSteps((s) => ({ ...s, [id]: true }));
            // unobserve after visible
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, threshold: 0.2 }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <section
      className="py-16 lg:py-24 bg-gradient-to-b from-gray-100 to-white"
      aria-labelledby="how-it-works-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="text-center mb-8">
          <p className="text-sm font-semibold text-rose-600">How it works</p>
          <h2
            id="how-it-works-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            From data to decisions — a simple 4-step flow
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            We keep the plumbing invisible so your teams can focus on customers
            — connect once, reuse everywhere.
          </p>
        </header>

        {/* Steps */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {STEPS.map((step) => (
            <StepCard
              key={step.id}
              step={step}
              visible={!!visibleSteps[step.id]}
            />
          ))}
        </div>

        {/* Architecture card */}
        <div className="bg-white rounded-2xl p-6 lg:p-10">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Diagram - semantic and responsive */}
            <div className="w-full lg:w-2/3">
              <div className="relative rounded-lg bg-gradient-to-b from-gray-50 to-white p-6 border border-gray-100">
                {/* header cloud */}
                <div className="flex items-center gap-3 mb-4">
                  <Cloud className="text-gray-400" />
                  <div className="text-sm text-gray-600">IMAST Cloud</div>
                </div>

                <div className="flex flex-col lg:flex-row items-center gap-6">
                  {/* Channels column */}
                  <div className="flex-1 grid grid-cols-3 gap-4 place-items-center">
                    <Channel icon={<Server size={28} />} label="Retail POS" />
                    <Channel icon={<Server size={28} />} label="E‑commerce" />
                    <Channel icon={<Server size={28} />} label="Distributors" />
                  </div>

                  {/* Bus */}
                  <div className="flex-1">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-full flex items-center justify-center gap-4">
                        <BusCard title="API & Data" subtitle="Core bus" />
                        <BusCard
                          title="Integrations"
                          subtitle="Payments, ERP, CRM"
                        />
                        <BusCard title="Analytics" subtitle="Dashboards & ML" />
                      </div>

                      <svg
                        className="w-full h-12"
                        viewBox="0 0 600 40"
                        preserveAspectRatio="none"
                        aria-hidden
                      >
                        <defs>
                          <linearGradient id="g1" x1="0" x2="1">
                            <stop offset="0%" stopColor="#FCA5A5" />
                            <stop offset="100%" stopColor="#FDE68A" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M0 20 C150 0 450 40 600 20"
                          stroke="url(#g1)"
                          strokeWidth="3"
                          fill="none"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right bullets */}
            <aside
              className="w-full lg:w-1/3"
              aria-label="Architecture highlights"
            >
              <h3 className="text-lg font-semibold text-gray-900">
                Architecture highlights
              </h3>
              <ul className="mt-4 space-y-4 text-sm text-gray-600">
                <li className="flex items-start gap-3">
                  <ShieldCheck className="text-green-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Security first
                    </div>
                    <div>TLS, role-based access and audit logs by default.</div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Server className="text-gray-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Scalable platform
                    </div>
                    <div>
                      Cloud-native microservices that scale with traffic.
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3">
                  <Cloud className="text-indigo-600 mt-1" />
                  <div>
                    <div className="font-semibold text-gray-800">
                      Open integrations
                    </div>
                    <div>
                      APIs, webhooks and pre-built connectors for fast
                      integration.
                    </div>
                  </div>
                </li>
              </ul>

              <div className="mt-6">
                <a
                  href="/integrations"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600"
                >
                  View integrations
                  <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          </div>
        </div>

        <p className="mt-8 text-sm text-gray-500 text-center">
          Start with the modules you need — our platform handles the rest. Need
          on‑ground support? We offer implementation services and training.
        </p>
      </div>
    </section>
  );
}

/* ---------------- Helpers ---------------- */
function StepCard({ step, visible }: { step: Step; visible: boolean }) {
  return (
    <article
      data-step={step.id}
      className={`bg-white rounded-2xl p-6 transform transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      aria-labelledby={`step-${step.id}-title`}
    >
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.colorClass} shrink-0`}
        >
          <step.Icon size={20} aria-hidden />
        </div>
        <div>
          <h4
            id={`step-${step.id}-title`}
            className="font-semibold text-gray-900"
          >
            {step.title}
          </h4>
          <p className="text-sm text-gray-600 mt-2">{step.desc}</p>
        </div>
      </div>
    </article>
  );
}

function Channel({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function BusCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="w-28 h-20 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 flex items-center justify-center shadow-sm">
      <div className="text-center">
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-xs text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}

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
  Cpu,
  GitBranch,
  BarChart3,
} from "lucide-react";
import ImastCertificationsRow from "./ImastCertificationsRow";

type Step = {
  id: number;
  title: string;
  desc: string;
  Icon: React.ComponentType<any>;
  colorClass: string;
  gradient: string;
};

const STEPS: Step[] = [
  {
    id: 1,
    title: "Connect modules",
    desc: "Plug warehouse , SFA , Distribution , Retail, CRM modules into single data layer",
    Icon: LinkIcon,
    colorClass: "bg-rose-50 text-rose-600",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    id: 2,
    title: "Automate Operations",
    desc: "Streamline order routing, inventory synchronization, and automated settlements",
    Icon: Zap,
    colorClass: "bg-amber-50 text-amber-600",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    id: 3,
    title: "Engage Customers",
    desc: "Launch personalized loyalty programs and omnichannel promotional campaigns",
    Icon: Users,
    colorClass: "bg-sky-50 text-sky-600",
    gradient: "from-sky-500 to-blue-500",
  },
  {
    id: 4,
    title: "Analyze & Optimize",
    desc: "Leverage centralized analytics and real-time alerts for data-driven decisions",
    Icon: Database,
    colorClass: "bg-violet-50 text-violet-600",
    gradient: "from-violet-500 to-purple-500",
  },
];

export default function HowItWorks() {
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
      className="py-20 lg:py-28 bg-[#f5f5fa] to-blue-50/30"
      aria-labelledby="how-it-works-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-red-600">How it work</h3>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
            From Data to Decisions
          </h2>
          <p className="mt-2 text-sm text-gray-600 max-w-xl">
            A seamless 4-step journey that transforms your business operations
            through intelligent automation and unified data
          </p>
        </div>

        {/* Enhanced Steps with Connectors */}
        <div ref={containerRef} className="relative mb-20">
          {/* Progress Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-rose-200 via-amber-200 to-violet-200 hidden lg:block"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <StepCard
                key={step.id}
                step={step}
                visible={!!visibleSteps[step.id]}
                stepNumber={index + 1}
                totalSteps={STEPS.length}
              />
            ))}
          </div>
        </div>

        {/* Enhanced Architecture Visualization */}
        <div className="">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Enhanced Diagram */}
            <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-100">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Unified Platform Architecture
                </h3>
                <p className="text-gray-600">
                  A scalable, cloud-native infrastructure that connects all your
                  business modules
                </p>
              </div>

              <div className="">
                {/* Cloud Header */}
                <div className="flex items-center gap-3 mb-8 p-4 bg-white rounded-xl border border-gray-100">
                  <Cloud className="text-blue-500" size={24} />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">
                      IMAST 360 Cloud Platform
                    </div>
                    <div className="text-sm text-gray-500">
                      Enterprise-grade infrastructure
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-rose-400"></div>
                  </div>
                </div>

                {/* Main Architecture */}
                <div className="space-y-8">
                  {/* Business Modules */}
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white mb-6">
                      <GitBranch size={16} className="text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Business Modules
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                      <EnhancedChannel
                        icon={<Server className="text-black" size={24} />}
                        label="Warehouse & Inventory"
                        color="blue"
                      />
                      <EnhancedChannel
                        icon={<Zap className="text-black" size={24} />}
                        label="Sales Force Automation"
                        color="green"
                      />
                      <EnhancedChannel
                        icon={<BarChart3 className="text-black" size={24} />}
                        label="Distribution & Retail"
                        color="purple"
                      />
                      <EnhancedChannel
                        icon={<Users className="text-black" size={24} />}
                        label="Loyalty & Engagement"
                        color="amber"
                      />
                      <EnhancedChannel
                        icon={<Database className="text-black" size={24} />}
                        label="Service & CRM"
                        color="rose"
                      />
                    </div>
                  </div>

                  {/* Data Flow */}
                  <div className="relative">
                    <div className="relative flex items-center justify-center gap-2">
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-rose-600 to-rose-700"></div>
                      <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-100">
                        <Cpu size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">
                          Real-time Data Sync
                        </span>
                      </div>
                      <div className="flex-1 h-0.5 bg-gradient-to-r from-rose-600 to-rose-700"></div>
                    </div>
                  </div>

                  {/* Platform Services */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <EnhancedBusCard
                      title="API & Data Core"
                      subtitle="Unified data layer"
                      icon={<Database className="text-black" size={20} />}
                    />
                    <EnhancedBusCard
                      title="Integrations"
                      subtitle="Payments, ERP, CRM"
                      icon={<LinkIcon className="text-black" size={20} />}
                    />
                    <EnhancedBusCard
                      title="Analytics & ML"
                      subtitle="Intelligent insights"
                      icon={<BarChart3 className="text-black" size={20} />}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Highlights */}
            <aside className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Platform Highlights
                </h3>

                <div className="space-y-6">
                  <HighlightItem
                    icon={<ShieldCheck className="text-white" size={20} />}
                    title="Enterprise Security"
                    description="End-to-end protection"
                    gradient="from-green-500 to-emerald-500"
                  />

                  <HighlightItem
                    icon={<Cloud className="text-white" size={20} />}
                    title="Cloud Native"
                    description="Scalable microservices cloud"
                    gradient="from-blue-500 to-cyan-500"
                  />

                  <HighlightItem
                    icon={<GitBranch className="text-white" size={20} />}
                    title="Open Ecosystem"
                    description="300+ integrations ready"
                    gradient="from-purple-500 to-pink-500"
                  />
                </div>
              </div>

              {/* CTA Card */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
                <h4 className="font-semibold mb-2">Ready to Transform?</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Start with the modules you need and scale as you grow
                </p>
                <a
                  href="/integrations"
                  className="inline-flex items-center gap-2 text-sm font-semibold bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Explore Integrations
                  <ArrowRight size={16} />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <ImastCertificationsRow />
    </section>
  );
}

/* ---------------- Enhanced Components ---------------- */
function StepCard({
  step,
  visible,
  stepNumber,
  totalSteps,
}: {
  step: Step;
  visible: boolean;
  stepNumber: number;
  totalSteps: number;
}) {
  return (
    <article
      data-step={step.id}
      className={`relative bg-white border border-gray-100 rounded-2xl p-4 transform transition-all duration-700 hover:shadow-xl hover:scale-105 group ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      aria-labelledby={`step-${step.id}-title`}
    >
      {/* Step Number */}
      <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-lg flex items-center justify-center">
        <span className="text-sm font-bold text-gray-700">{stepNumber}</span>
      </div>

      <div className="flex flex-col items-start gap-6">
        {/* Icon with Gradient Background */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}
        >
          <step.Icon size={18} className="text-white" aria-hidden />
        </div>

        <div className="space-y-3">
          <h4
            id={`step-${step.id}-title`}
            className="font-bold text-gray-900 group-hover:text-gray-800 transition-colors"
          >
            {step.title}
          </h4>
          <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
        </div>

        {/* Progress indicator for last step */}
        {stepNumber === totalSteps && (
          <div className="w-full h-1 bg-gradient-to-r from-rose-500 via-amber-500 to-violet-500 rounded-full mt-2"></div>
        )}
      </div>
    </article>
  );
}

function EnhancedChannel({
  icon,
  label,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center gap-3 group cursor-pointer">
      <div
        className={`w-16 h-16 bg-white rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-gray-100`}
      >
        {icon}
      </div>
      <div className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors">
        {label}
      </div>
    </div>
  );
}

function EnhancedBusCard({
  title,
  subtitle,
  icon,
  gradient,
}: {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  gradient?: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-all duration-300 group hover:scale-105">
      <div className="flex items-start gap-4">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md`}
        >
          {icon}
        </div>
        <div>
          <div className="font-bold text-gray-900 group-hover:text-gray-800">
            {title}
          </div>
          <div className="text-sm text-gray-500 mt-1">{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function HighlightItem({
  icon,
  title,
  description,
  gradient,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:bg-gray-50 transition-colors">
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-md flex-shrink-0`}
      >
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-900 mb-1">{title}</h4>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

import React from "react";
import { ArrowRight, TrendingUp, Users, Star, Target } from "lucide-react";

export default function ImastCard() {
  return (
    <div className="group relative">
      <div className="relative rounded-2xl bg-white/80 ring-1 ring-white/20  border border-gray-100 overflow-hidden transition-all duration-500 group-hover:scale-[1.02] group-hover:ring-primary-100/50">
        <div className="p-6 lg:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Unified Cloud Solution
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                All cloud modules integrating complete supply chain and
                producing
                <span className="font-semibold text-gray-700">
                  {" "}
                  measurable results
                </span>
              </p>
            </div>
            <div className="ml-4">
              <img
                className="w-16 opacity-90 hover:opacity-100 transition-opacity"
                src="/imast360.png"
                alt="Imast 360 Logo"
              />
            </div>
          </div>

          {/* Key metrics grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <MetricCard
              icon={<TrendingUp className="w-4 h-4" />}
              label="ROI Increase"
              value="50%+"
              gradient="from-primary-500 to-primary-600"
              delay="0"
            />
            <MetricCard
              icon={<Target className="w-4 h-4" />}
              label="Reach Growth"
              value="100%+"
              gradient="from-amber-500 to-amber-600"
              delay="100"
            />
            <MetricCard
              icon={<Users className="w-4 h-4" />}
              label="Customer Engagement"
              value="80%+"
              gradient="from-blue-500 to-blue-600"
              delay="200"
            />
          </div>

          {/* Modules section */}
          <div className="mb-8">
            <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-amber-500 rounded-full"></div>
              Integrated Modules
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "Distribution & Retail",
                "Warehouse & Inventory",
                "After Sales Service & CRM",
                "Loyalty & Engagement",
                "Sales Force Automation",
                "Lead Management",
              ].map((module, index) => (
                <div
                  key={index}
                  className="px-3 py-2 rounded-xl bg-white text-gray-700 text-xs font-medium border border-gray-100  hover:border-gray-200 hover:scale-105 transition-all duration-300 cursor-pointer group/module"
                >
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        index % 3 === 0
                          ? "bg-primary-400"
                          : index % 3 === 1
                          ? "bg-amber-400"
                          : "bg-blue-400"
                      }`}
                    ></div>
                    {module}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom stats and CTA */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <StatPill
                  icon="₹"
                  label="Revenue Growth"
                  value="30%+"
                  color="rose"
                  delay="0"
                />
                <StatPill
                  icon="★"
                  label="Customer NPS"
                  value="50+"
                  color="rose"
                  delay="150"
                />
              </div>

              <a
                href="/case-studies"
                className="group/cta inline-flex items-center gap-2 px-4 py-2 rounded bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                View Case Study
                <ArrowRight className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Metric Card Component */
function MetricCard({
  icon,
  label,
  value,
  gradient,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
  delay: string;
}) {
  return (
    <div
      className="text-center p-3 rounded-xl bg-white border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md group/metric group-hover:scale-[1.02] group-hover:ring-primary-100/50"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div
        className={`inline-flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r ${gradient} text-white mb-2 group-hover/metric:scale-110 transition-transform duration-300`}
      >
        {icon}
      </div>
      <div className="text-lg font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-600 leading-tight">{label}</div>
    </div>
  );
}

/* Stat Pill Component */
function StatPill({
  icon,
  label,
  value,
  color,
  delay,
}: {
  icon: string;
  label: string;
  value: string;
  color: "rose" | "amber" | "blue";
  delay: string;
}) {
  const colorClasses = {
    rose: "bg-primary-50 text-primary-700 border-primary-200",
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
  };

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${colorClasses[color]} transition-all duration-300 hover:scale-105 hover:shadow-sm`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className="font-bold text-sm">{icon}</span>
      <div>
        <div className="text-xs font-medium">{value}</div>
        <div className="text-[10px] text-gray-600">{label}</div>
      </div>
    </div>
  );
}

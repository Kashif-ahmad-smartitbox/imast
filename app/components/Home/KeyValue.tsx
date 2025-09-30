"use client";
import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import ImastCard from "./ImastCard";

export default function KeyValue() {
  return (
    <section className="bg-gradient-to-br from-white via-rose-50/20 to-gray-50/50 py-20 lg:py-28 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-rose-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* LEFT: Pitch + benefits */}
          <div className="relative">
            <div>
              <h3 className="text-base font-semibold text-red-600">
                Why Choose IMAST
              </h3>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900">
                Unified platform. Practical outcomes.
              </h2>
              <p className="mt-2 text-sm text-gray-600 max-w-xl">
                We bring retail, distribution, loyalty and after-sales together
                so you can keep what works, fix what doesn&apos;t, and scale the
                right way — faster and with less risk
              </p>
            </div>
            <div className="mt-8 flex items-center gap-6 p-4 bg-white/60 rounded-2xl border border-gray-100">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="w-8 h-8 bg-gradient-to-br from-red-600 to-red-400 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  Trusted by industry leaders
                </p>
                <p className="text-xs text-gray-600">
                  <strong className="text-gray-800">500+</strong> brands ·{" "}
                  <strong className="text-gray-800">2M+</strong> daily users
                </p>
              </div>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>

            {/* Benefits grid */}
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <EnhancedFeature
                icon={<TrendingUp className="w-5 h-5" />}
                title="Proven ROI"
                desc="Measurable lift in revenue & retention within months."
                color="from-rose-500 to-rose-600"
                delay="0"
              />

              <EnhancedFeature
                icon={<Zap className="w-5 h-5" />}
                title="Fast to deploy"
                desc="MVP-first rollout so you start learning on day one."
                color="from-amber-500 to-amber-600"
                delay="100"
              />

              <EnhancedFeature
                icon={<Users className="w-5 h-5" />}
                title="People-first"
                desc="On-ground implementation and training that lasts."
                color="from-blue-500 to-blue-600"
                delay="200"
              />

              <EnhancedFeature
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Secure & compliant"
                desc="Enterprise controls and privacy-first design."
                color="from-violet-500 to-violet-600"
                delay="300"
              />
            </div>

            {/* CTA section */}
            <div className="mt-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href="/contact"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Request a demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/solutions"
                className="group inline-flex items-center gap-3 px-5 py-3 rounded border border-gray-200 bg-white/80 text-gray-700 font-medium hover:bg-white hover:border-gray-300 hover:shadow-md transition-all duration-300"
              >
                Explore solutions
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* RIGHT: Card component */}
          <div className="relative">
            <div className="relative z-10">
              <ImastCard />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-rose-400/20 to-amber-400/20 rounded-3xl blur-xl animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-400/15 to-violet-400/15 rounded-3xl blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>

      {/* Local CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes statIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-stat {
          animation: statIn 700ms cubic-bezier(0.2, 0.9, 0.3, 1.2) both;
        }

        .feature-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-hover:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}

function EnhancedFeature({
  icon,
  title,
  desc,
  color,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  delay: string;
}) {
  return (
    <div
      className="feature-hover group p-4 rounded-2xl bg-white/60 border border-gray-100 hover:border-gray-200 hover:bg-white/80 backdrop-blur-sm cursor-pointer transition-all duration-300"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex gap-4 items-start">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-r ${color} text-white shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110`}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 text-sm group-hover:text-gray-800 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mt-2 leading-relaxed text-xs">{desc}</p>
        </div>
      </div>
    </div>
  );
}

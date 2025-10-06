"use client";
import React from "react";
import {
  ArrowRight,
  Phone,
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  Target,
  Rocket,
} from "lucide-react";

export default function CallToActionImproved() {
  return (
    <section
      className="relative overflow-hidden py-24 bg-rose-700 text-white"
      aria-labelledby="cta-title"
    >
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left - headline and bullets */}
          <div className="lg:col-span-7">
            <h1
              id="cta-title"
              className="mt-6 text-3xl font-bold leading-tight"
            >
              Ready to see{" "}
              <span className="bg-gradient-to-r from-white to-rose-100 bg-clip-text text-transparent">
                IMAST
              </span>{" "}
              move the needle?
            </h1>

            <p className="mt-6 text-lg text-rose-50 max-w-2xl leading-relaxed">
              Get a personalized demo, implementation plan, or quick
              consultation — we&apos;ll help you find the fastest path to
              measurable results.
            </p>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-bold text-white shadow-lg">
                  1
                </div>
                <div>
                  <div className="font-semibold text-white text-md">
                    Quick Demos
                  </div>
                  <div className="text-rose-100 text-sm mt-1">
                    20-minute focused walkthrough — see exactly how it works
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm p-5 rounded-xl border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center font-bold text-white shadow-lg">
                  2
                </div>
                <div>
                  <div className="font-semibold text-white text-md">
                    Pilot & Rollout
                  </div>
                  <div className="text-rose-100 text-sm mt-1">
                    MVP-first approach — deploy fast, expand with confidence
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
              <a
                href="/demo"
                className="rounded group inline-flex items-center gap-3 px-5 py-3  bg-white text-black font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Book a Demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/contact"
                className="rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Contact Sales</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right - contact cards */}
          <aside className="lg:col-span-5">
            <div className="relative bg-white/10 rounded-3xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-bold text-white">Quick Connect</h3>
              </div>

              <p className="text-rose-100 text-md mb-6">
                Choose your preferred way to connect — we&apos;ll respond within
                one business day.
              </p>

              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Phone,
                    title: "Request a Call",
                    desc: "+91 12 3456 7890",
                    href: "tel:+911234567890",
                    color: "from-green-500 to-emerald-500",
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    desc: "info@imast.in",
                    href: "mailto:info@imast.in",
                    color: "from-blue-500 to-cyan-500",
                  },
                  {
                    icon: Calendar,
                    title: "Book Demo",
                    desc: "20-min walkthrough",
                    href: "/demo",
                    color: "from-purple-500 to-indigo-500",
                  },
                  {
                    icon: MessageSquare,
                    title: "Live Chat",
                    desc: "Instant answers",
                    href: "/chat",
                    color: "from-orange-500 to-red-500",
                  },
                ].map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg`}
                    >
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-white group-hover:text-white/90">
                        {item.title}
                      </div>
                      <div className="text-rose-100 text-sm">{item.desc}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/demo"
                    className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-white text-black font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>

                  <a
                    href="/contact"
                    className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                  >
                    <span>View Pricing</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

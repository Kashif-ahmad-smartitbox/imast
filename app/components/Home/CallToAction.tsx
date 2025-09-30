"use client";
import React from "react";
import { ArrowRight, Phone, Mail, MessageSquare, Calendar } from "lucide-react";

export default function CallToActionImproved() {
  return (
    <section
      className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-900 to-red-900 text-white"
      aria-labelledby="cta-title"
    >
      {/* subtle decorative pattern */}
      <svg
        className="pointer-events-none absolute right-0 top-0 w-72 opacity-10"
        viewBox="0 0 200 200"
        aria-hidden
      >
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="200"
          height="200"
          fill="url(#g)"
          transform="rotate(25 100 100)"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left - headline and bullets */}
          <div className="lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90">
              Talk to product
            </p>

            <h2
              id="cta-title"
              className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
            >
              Ready to see IMAST move the needle?
            </h2>

            <p className="mt-4 text-lg text-rose-100 max-w-2xl">
              Book a demo, get a tailored implementation plan, or request a
              quick call — our team helps you pick the fastest path to
              measurable outcomes.
            </p>

            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <div className="font-medium">Quick demos</div>
                  <div className="text-rose-100">
                    20-minute focused walkthrough — no fluff.
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <div className="font-medium">Pilot & rollout</div>
                  <div className="text-rose-100">
                    MVP-first approach — deploy fast, expand later.
                  </div>
                </div>
              </li>
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              <a
                href="/demo"
                className="rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Book a demo</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="/contact"
                className="rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Contact sales</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            <div className="mt-6 text-sm text-rose-100">
              Prefer a tailored plan?{" "}
              <a href="/contact" className="underline font-semibold">
                Tell us your goals
              </a>{" "}
              and we’ll suggest a path.
            </div>
          </div>

          {/* Right - micro actions */}
          <aside className="lg:col-span-5">
            <div className="bg-white/6 backdrop-blur-sm rounded-2xl p-6 border border-white/10 shadow-md">
              <div className="text-sm font-semibold text-white">
                Quick contact
              </div>
              <p className="mt-2 text-sm text-rose-100">
                Pick how you&apos;d like to connect — we respond within one
                business day.
              </p>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="tel:+911234567890"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition"
                >
                  <Phone className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="font-medium">Request a call</div>
                    <div className="text-rose-100 text-sm">
                      +91 12 3456 7890
                    </div>
                  </div>
                </a>

                <a
                  href="mailto:info@imast.in"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition"
                >
                  <Mail className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="font-medium">Email us</div>
                    <div className="text-rose-100 text-sm">info@imast.in</div>
                  </div>
                </a>

                <a
                  href="/demo"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition"
                >
                  <Calendar className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="font-medium">Book demo</div>
                    <div className="text-rose-100 text-sm">
                      20-min walkthrough
                    </div>
                  </div>
                </a>

                <a
                  href="/chat"
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/8 transition"
                >
                  <MessageSquare className="w-5 h-5 text-white/90" />
                  <div>
                    <div className="font-medium">Live chat</div>
                    <div className="text-rose-100 text-sm">Instant answers</div>
                  </div>
                </a>
              </div>

              <div className="mt-4 text-xs text-rose-100">
                Or schedule a slot — we’d rather show results than slide-decks.
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href="/get-started"
                  className="rounded group inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>Get started</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="/pricing"
                  className="rounded group inline-flex items-center gap-3 px-4 py-2 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
                >
                  <span>View pricing</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* small note */}
            <div className="mt-4 text-xs text-rose-100">
              No hard selling — just practical answers and a clear plan to get
              value quickly.
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

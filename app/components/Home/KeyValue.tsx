import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// KeyValue.tsx — improved design
// - Cleaner layout, stronger visual hierarchy
// - Animated stat numbers (simple CSS), nicer CTA treatments
// - Accessible, responsive, Tailwind utility classes

export default function KeyValue() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT: Pitch + benefits */}
          <div className="relative">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center p-2 rounded-full bg-red-50 text-red-600 shadow-sm">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold text-red-600">
                Why IMAST
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-gray-900">
              Unified platform. Practical outcomes.
            </h2>

            <p className="mt-4 text-gray-600 text-base sm:text-lg max-w-xl">
              We bring retail, distribution, loyalty and after‑sales together so
              you can keep what works, fix what doesn’t, and scale the right way
              — faster and with less risk.
            </p>

            {/* Benefits */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Feature
                icon={<TrendingUp className="w-5 h-5" />}
                title="Proven ROI"
                desc=" measurable lift in revenue & retention within months"
                color="bg-rose-50 text-rose-600"
              />

              <Feature
                icon={<Zap className="w-5 h-5" />}
                title="Fast to deploy"
                desc="MVP‑first rollout so you start learning on day one"
                color="bg-amber-50 text-amber-600"
              />

              <Feature
                icon={<Users className="w-5 h-5" />}
                title="People‑first"
                desc="On-ground implementation and training that lasts"
                color="bg-sky-50 text-sky-600"
              />

              <Feature
                icon={<ShieldCheck className="w-5 h-5" />}
                title="Secure & compliant"
                desc="Enterprise controls and privacy-first design"
                color="bg-violet-50 text-violet-600"
              />
            </div>

            {/* CTA row */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <a
                href="/contact"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-red-600 text-white font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
              >
                Request a demo
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="/solutions"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 transition"
              >
                Explore solutions
              </a>

              <span className="mt-2 sm:mt-0 ml-auto text-xs text-gray-500">
                Trusted by <strong className="text-gray-800">500+</strong>{" "}
                brands · <strong className="text-gray-800">2M+</strong> users
              </span>
            </div>

            {/* subtle decorative vector */}
            <svg
              className="hidden lg:block absolute -right-24 top-6 w-56 h-56 opacity-10"
              viewBox="0 0 200 200"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="g" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FEE2E2" />
                  <stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="100" fill="url(#g)" />
            </svg>
          </div>

          {/* RIGHT: Visual / Card stack */}
          <div className="mx-auto w-full max-w-xl">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden bg-white ring-1 ring-black/5">
                <div className="p-6 lg:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs uppercase font-semibold tracking-wide text-gray-500">
                        Loyalty Campaign
                      </div>
                      <div className="mt-2 text-2xl font-bold text-gray-900">
                        Summer Rewards
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        23% uplift vs previous season
                      </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 font-semibold text-sm">
                      Active
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                    <StatAnimated label="Redemptions" value={"12.4k"} />
                    <StatAnimated label="Avg Ticket" value={"₹412"} />
                    <StatAnimated label="Comm. Uplift" value={"+23%"} />
                  </div>

                  <div className="mt-6">
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full w-[60%] transition-width duration-700" />
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                      <div>Campaign progress</div>
                      <div>Target 20k</div>
                    </div>
                  </div>
                </div>

                {/* subtle footer with mini insights */}
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-red-50 text-red-600">
                        ₹
                      </span>
                      <div>
                        <div className="text-xs">Revenue/Month</div>
                        <div className="font-semibold text-gray-900">₹1.2M</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-amber-50 text-amber-600">
                        ★
                      </span>
                      <div>
                        <div className="text-xs">NPS</div>
                        <div className="font-semibold text-gray-900">62</div>
                      </div>
                    </div>
                  </div>

                  <a
                    href="/case-studies"
                    className="text-sm font-semibold text-rose-600 inline-flex items-center gap-2"
                  >
                    See case
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------
   Small helper components
   ---------------------- */
function Feature({
  icon,
  title,
  desc,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color?: string;
}) {
  return (
    <div className="flex gap-4">
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-lg shadow-sm ${
          color ?? "bg-gray-100 text-red-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <div className="font-semibold text-gray-800">{title}</div>
        <div className="text-sm text-gray-600 mt-1">{desc}</div>
      </div>
    </div>
  );
}

function StatAnimated({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 font-bold text-gray-900 text-lg animate-count">
        {value}
      </div>
    </div>
  );
}

/* simple counting animation (add to your global CSS):

@keyframes countUp { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
.animate-count { animation: countUp 600ms ease-out both; }

You can also replace text values with a JS-driven counter if you want numbers to increment.
*/

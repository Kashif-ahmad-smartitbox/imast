"use client";
import React, { useState } from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowUp,
} from "lucide-react";

export default function FooterImproved() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setSubscribed(true);
  };

  return (
    <footer
      className="bg-black text-gray-200 pt-12 pb-8"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand / Summary */}
          <div className="space-y-4">
            <a href="/" className="inline-flex items-center gap-3">
              <img src="/logo.svg" alt="IMAST" className="h-8 w-auto" />
            </a>

            <p className="text-sm text-gray-300 max-w-sm">
              Practical software for retail, distribution and loyalty — built to
              deliver outcomes, not just reports.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="mailto:info@imast.in"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <Mail className="w-4 h-4" /> info@imast.in
              </a>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
              >
                <Phone className="w-4 h-4" /> +91 12 3456 7890
              </a>
            </div>

            <div className="flex items-center gap-3 mt-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Facebook className="w-4 h-4 text-gray-200" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Twitter className="w-4 h-4 text-gray-200" />
              </a>
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Instagram className="w-4 h-4 text-gray-200" />
              </a>
              <a
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="p-2 rounded-md bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Linkedin className="w-4 h-4 text-gray-200" />
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Product</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/solutions/retail-point" className="hover:text-white">
                  Retail Point
                </a>
              </li>
              <li>
                <a
                  href="/solutions/distribution-plus"
                  className="hover:text-white"
                >
                  Distribution+
                </a>
              </li>
              <li>
                <a href="/solutions/loyalty-board" className="hover:text-white">
                  Loyalty Board
                </a>
              </li>
              <li>
                <a href="/solutions/sales-track" className="hover:text-white">
                  Sales Track
                </a>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="/about" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/careers" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-white">
                  Insights
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-3">
              Newsletter
            </h4>
            <p className="text-sm text-gray-300">
              Short, practical playbooks — once a month.
            </p>

            {!subscribed ? (
              <form
                onSubmit={handleSubscribe}
                className="mt-3 flex flex-col gap-2"
              >
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm text-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold hover:bg-rose-700 transition"
                  >
                    Subscribe
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail("");
                      setError(null);
                    }}
                    className="px-3 py-2 rounded-lg border border-gray-700 text-sm text-gray-300 hover:bg-gray-800"
                  >
                    Clear
                  </button>
                </div>
                {error && <div className="text-xs text-rose-400">{error}</div>}
              </form>
            ) : (
              <div className="mt-3 flex items-center gap-3 text-sm text-gray-200">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-green-400"
                >
                  <path
                    d="M20 6L9 17l-5-5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Subscribed — check your inbox
              </div>
            )}

            <div className="mt-4 text-xs text-gray-400">
              By subscribing you agree to occasional updates. Unsubscribe
              anytime.
            </div>
          </div>
        </div>

        {/* Lower bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © {new Date().getFullYear()} IMAST Technologies Pvt. Ltd. — All
            rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <a href="/terms" className="text-sm text-gray-400 hover:text-white">
              Terms
            </a>
            <a
              href="/privacy"
              className="text-sm text-gray-400 hover:text-white"
            >
              Privacy
            </a>
            <a href="/aup" className="text-sm text-gray-400 hover:text-white">
              AUP
            </a>

            <a
              href="#"
              className="ml-4 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <ArrowUp className="w-4 h-4" /> Back to top
            </a>
          </div>
        </div>
      </div>

      {/* Floating back to top (mobile-friendly) */}
      <a
        href="#"
        className="fixed right-5 bottom-5 z-50 inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-600 text-white shadow-lg hover:bg-rose-700 transition"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5" />
      </a>
    </footer>
  );
}

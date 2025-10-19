"use client";
import React, { useMemo, useState } from "react";
import {
  TrendingUp,
  Zap,
  UserCircle,
  Briefcase,
  Package,
  ClipboardList,
  Repeat,
  ShoppingCart,
  Star,
  Users,
  Gift,
  Settings,
  Smartphone,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { motion } from "framer-motion";

type Item = {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
};

type Section = {
  title: string;
  color?: string;
  items: Item[];
};

const SECTIONS: Section[] = [
  {
    title: "Sales & Business",
    items: [
      {
        icon: TrendingUp,
        title: "Sales Force Automation (SFA)",
        desc: "Automate sales journeys with real-time tracking and performance insights.",
      },
      {
        icon: Zap,
        title: "Lead Management",
        desc: "Capture, nurture, and convert leads faster with smart automation.",
      },
      {
        icon: UserCircle,
        title: "CRM / Ticket Management",
        desc: "Manage customer issues in one system with faster resolutions.",
      },
      {
        icon: Briefcase,
        title: "HRMS Solution",
        desc: "Simplify HR, payroll, and performance with one powerful HRMS.",
      },
    ],
  },
  {
    title: "Warehouse",
    items: [
      {
        icon: Package,
        title: "Warehouse Automation",
        desc: "Digitize warehouse operations for faster, error-free processes.",
      },
      {
        icon: ClipboardList,
        title: "Inventory Management",
        desc: "Real-time stock tracking and control across all locations.",
      },
      {
        icon: Repeat,
        title: "Auto Replenishment",
        desc: "Smart inventory auto-replenishment using TOC principles for zero stock-outs.",
      },
    ],
  },
  {
    title: "Distribution",
    items: [
      {
        icon: Repeat,
        title: "Distributor Management System (DMS)",
        desc: "Digitize distributor operations with transparent orders and payments.",
      },
      {
        icon: TrendingUp,
        title: "Secondary Order Tracking",
        desc: "Track distributor-to-retailer sales with complete real-time visibility.",
      },
    ],
  },
  {
    title: "Retail",
    items: [
      {
        icon: ShoppingCart,
        title: "Point of Sales (POS)",
        desc: "Smart billing, invoicing, and promotions at retail counters.",
      },
      {
        icon: Star,
        title: "Retailer Loyalty",
        desc: "Reward and retain retailers with customized loyalty programs.",
      },
      {
        icon: Smartphone,
        title: "Retail App",
        desc: "Enable retailers with a mobile app for orders, offers, and engagement.",
      },
    ],
  },
  {
    title: "Loyalty & Rewards",
    items: [
      {
        icon: Users,
        title: "Channel Loyalty",
        desc: "Reward dealers and distributors to boost retention and growth.",
      },
      {
        icon: Users,
        title: "Influencer Loyalty",
        desc: "Engage mechanics, carpenters, fitters and other influencers of business with targeted rewards.",
      },
      {
        icon: UserCircle,
        title: "Customer Loyalty",
        desc: "Enhance retention with personalized customer loyalty programs.",
      },
      {
        icon: Gift,
        title: "Rewards & Redemption",
        desc: "Seamless redemptions via cash, vouchers, or gifts — instantly fulfilled.",
      },
    ],
  },
  {
    title: "Service",
    items: [
      {
        icon: Settings,
        title: "Service Automation",
        desc: "Automate service requests, scheduling, and case closures with ease.",
      },
      {
        icon: Smartphone,
        title: "Service Staff App",
        desc: "Mobile app for service teams with GPS, tasks, and real-time updates.",
      },
    ],
  },
];

export default function ModulesImproved(props: any) {
  const [query, setQuery] = useState("");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    () => {
      const map: Record<string, boolean> = {};
      SECTIONS.forEach((s) => (map[s.title] = true));
      return map;
    }
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return SECTIONS;
    const q = query.toLowerCase();
    return SECTIONS.map((s) => ({
      ...s,
      items: s.items.filter((i) =>
        (i.title + i.desc).toLowerCase().includes(q)
      ),
    })).filter((s) => s.items.length > 0);
  }, [query]);

  function toggleSection(title: string) {
    setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
  }

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-700 to-primary-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div>
              <div className="bg-white rounded my-3 p-3 shadow-md inline-block">
                <img src="/imast360.png" alt="IMAST360" className="h-6" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                Modules that Power Your Business
              </h2>
              <p className="mt-1 text-[#F8EFEF] text-sm sm:text-base max-w-xl">
                Start small, scale fast — a modular suite to digitize sales,
                distribution, retail and service in one place.
              </p>
            </div>
          </div>

          <div className="w-full md:w-1/3">
            <label className="relative block">
              <span className="sr-only">Search modules</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="placeholder:italic placeholder:text-slate-300 block bg-white w-full border border-transparent rounded-xl py-3 pl-12 pr-4 shadow focus:outline-none focus:ring-2 focus:ring-primary-400"
                placeholder="Search modules, e.g. 'inventory'"
                aria-label="Search modules"
              />
              <Search className="absolute left-4 top-3.5 w-5 h-5 text-primary-600" />
            </label>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {filtered.length === 0 ? (
            <div className="bg-white/10 rounded-xl p-8 text-center text-white/90">
              No modules match &ldquo;{query}&ldquo;.
            </div>
          ) : (
            filtered.map((section) => (
              <div key={section.title}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                      {section.title}
                    </h3>
                    <div className="h-1 w-24 bg-white/40 rounded-full" />
                  </div>

                  <button
                    onClick={() => toggleSection(section.title)}
                    aria-expanded={!!openSections[section.title]}
                    className="inline-flex items-center gap-2 text-sm text-white/90 bg-white/6 hover:bg-white/8 px-3 py-2 rounded-lg"
                  >
                    {openSections[section.title] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                    <span>
                      {openSections[section.title] ? "Collapse" : "Expand"}
                    </span>
                  </button>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-4"
                >
                  <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
                    aria-live="polite"
                  >
                    {openSections[section.title] &&
                      section.items.map((item) => (
                        <motion.article
                          key={item.title}
                          layout
                          whileHover={{
                            translateY: -6,
                            boxShadow: "0px 18px 40px rgba(0,0,0,0.18)",
                          }}
                          className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-transform will-change-transform"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex-none w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow">
                              <item.icon size={20} aria-hidden />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 mb-1">
                                {item.title}
                              </h4>
                              <p className="text-sm text-gray-600 leading-relaxed">
                                {item.desc}
                              </p>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <button className="text-sm px-3 py-1 rounded-md bg-primary-50 text-primary-700 font-medium hover:bg-primary-100">
                              Learn
                            </button>
                          </div>
                        </motion.article>
                      ))}
                  </div>
                </motion.div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

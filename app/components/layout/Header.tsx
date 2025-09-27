"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  ShoppingCart,
  Repeat,
  Star,
  TrendingUp,
  Zap,
  Settings,
  Building,
  FileText,
  Briefcase,
  MessageSquare,
  Shield,
  Film,
  Scale,
  Users,
  Award,
  Package,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import useWindowSize from "@/app/hooks/useWindowSize";

/**
 * Header.tsx
 *
 * Improvements:
 * - Clearer hook names & safer window checks.
 * - Extracted data arrays (solutions/services/company links).
 * - Pass `isScrolled` down to NavItem so nav text color toggles from white -> dark.
 * - Avoids recreating timeouts on every render; explicit cleanup.
 * - Tidier class composition and small accessibility fixes.
 */

/* ------------------------- Types ------------------------- */
type MenuType = "solution" | "services" | "company" | null;

/* ------------------------- Helpers / Hooks ------------------------- */

/** safe boolean check for browser */
const isBrowser = (): boolean => typeof window !== "undefined";

/** Scroll detection hook */
const useScrolled = (threshold = 10) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isBrowser()) return;

    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
};

/** Click outside detector for a ref */
const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) handler();
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [handler]);
  return ref;
};

/* ------------------------- Data ------------------------- */

const SOLUTIONS = [
  {
    icon: ShoppingCart,
    title: "Retail Point",
    description: "Point of sales solution and retail app",
    href: "/solutions/retail-point",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    icon: Repeat,
    title: "Distribution+",
    description: "Distributor Management System (DMS)",
    href: "/solutions/distribution-plus",
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
  },
  {
    icon: Star,
    title: "Loyalty Board",
    description: "Loyalty Management System",
    href: "/solutions/loyalty-board",
    gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
  },
  {
    icon: TrendingUp,
    title: "Sales Track",
    description: "Sales Force Automation Solution",
    href: "/solutions/sales-track",
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
  },
  {
    icon: Zap,
    title: "Lead Sprint",
    description: "Lead Management Solution",
    href: "/solutions/lead-sprint",
    gradient: "bg-gradient-to-r from-red-500 to-red-600",
  },
  {
    icon: Settings,
    title: "True View",
    description: "After Sales Service Management System",
    href: "/solutions/true-view",
    gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
  },
];

const SERVICES = [
  {
    icon: Award,
    title: "Loyalty Max",
    href: "/services/loyalty-max",
    gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
  },
  {
    icon: Users,
    title: "Work Champ",
    href: "/services/work-champ",
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
  },
  {
    icon: Package,
    title: "Reward MAX",
    href: "/services/reward-max",
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
  },
];

const COMPANY_LINKS = [
  { icon: Building, label: "About Us", href: "/about" },
  { icon: FileText, label: "Blogs", href: "/blog" },
  { icon: Briefcase, label: "Case Study", href: "/case-studies" },
  { icon: Users, label: "Career", href: "/careers" },
  { icon: MessageSquare, label: "Testimonials", href: "/testimonials" },
  { icon: Shield, label: "AUP", href: "/aup" },
  { icon: Shield, label: "Privacy Policy", href: "/privacy" },
  { icon: Film, label: "Media", href: "/media" },
  { icon: Scale, label: "Terms & Conditions", href: "/terms" },
];

/* ------------------------- Main Component ------------------------- */

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useScrolled(10);
  const { isMobile, isSmallTablet, isTablet, isDesktop, isLargeDesktop } =
    useWindowSize();
  const containerRef = useClickOutside(() => setOpenMenu(null));
  const closeOnDesktopSwitchRef = useRef<boolean>(false);

  // close desktop mega menu when moving to smaller viewport
  useEffect(() => {
    if (!isDesktop) {
      // avoid extra state churn if it's already closed
      if (openMenu !== null) setOpenMenu(null);
      closeOnDesktopSwitchRef.current = true;
    } else {
      closeOnDesktopSwitchRef.current = false;
    }
  }, [isDesktop, openMenu]);

  const getHeaderHeight = () => {
    if (isMobile) return "h-18";
    if (isSmallTablet || isTablet) return "h-16";
    return "h-20";
  };

  const getContainerPadding = () => {
    if (isMobile) return "px-3";
    if (isSmallTablet) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  const headerBase =
    "w-full left-0 right-0 z-50 transition-all duration-300 ease-out";
  const headerPosition = scrolled ? "sticky top-0" : "absolute top-0";
  const headerBg = scrolled
    ? "bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-200/60"
    : "bg-transparent";

  return (
    <header className={`${headerBase} ${headerPosition} ${headerBg}`}>
      <div className={`max-w-7xl mx-auto ${getContainerPadding()}`}>
        <div
          className={`flex items-center justify-between ${getHeaderHeight()}`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center gap-2 group relative"
              onClick={() => setOpenMenu(null)}
            >
              <div className="relative">
                <img
                  src="/logo.svg"
                  alt="imast"
                  className={`w-auto transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
                    isMobile ? "h-6" : isSmallTablet || isTablet ? "h-7" : "h-8"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              {!isMobile && (
                <Sparkles
                  size={isMobile ? 12 : isTablet ? 14 : 16}
                  className="text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                />
              )}
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isDesktop && (
            <nav className="flex items-center gap-1 xl:gap-2">
              <NavItem
                label="Solution"
                isOpen={openMenu === "solution"}
                onToggle={() =>
                  setOpenMenu((cur) => (cur === "solution" ? null : "solution"))
                }
                onMouseEnter={() => isDesktop && setOpenMenu("solution")}
                onMouseLeave={() => isDesktop && setOpenMenu(null)}
                isLargeDesktop={isLargeDesktop}
                isScrolled={scrolled}
              />
              <NavItem
                label="Services"
                isOpen={openMenu === "services"}
                onToggle={() =>
                  setOpenMenu((cur) => (cur === "services" ? null : "services"))
                }
                onMouseEnter={() => isDesktop && setOpenMenu("services")}
                onMouseLeave={() => isDesktop && setOpenMenu(null)}
                isLargeDesktop={isLargeDesktop}
                isScrolled={scrolled}
              />
              <NavItem
                label="Company"
                isOpen={openMenu === "company"}
                onToggle={() =>
                  setOpenMenu((cur) => (cur === "company" ? null : "company"))
                }
                onMouseEnter={() => isDesktop && setOpenMenu("company")}
                onMouseLeave={() => isDesktop && setOpenMenu(null)}
                isLargeDesktop={isLargeDesktop}
                isScrolled={scrolled}
              />
            </nav>
          )}

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isMobile && (
              <a
                href="/contact"
                className={`inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 hover:gap-3 group relative overflow-hidden ${
                  isSmallTablet
                    ? "px-3 py-2 text-sm"
                    : isTablet
                    ? "px-4 py-2 text-sm"
                    : "px-6 py-2.5 text-base"
                }`}
              >
                <span className="relative z-10">Contact</span>
                <ArrowRight
                  size={isTablet ? 12 : 14}
                  className="relative z-10 group-hover:translate-x-1 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            )}

            {/* Toggle for small screens */}
            {!isDesktop && (
              <button
                className={`rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 ${
                  isMobile ? "p-2" : "p-2.5"
                }`}
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
              >
                {mobileOpen ? (
                  <X size={isMobile ? 16 : 18} />
                ) : (
                  <Menu size={isMobile ? 16 : 18} />
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      {isDesktop && (
        <div
          ref={containerRef}
          className="absolute left-0 right-0 top-full pointer-events-none"
        >
          <div className={`max-w-7xl mx-auto ${getContainerPadding()}`}>
            <div
              className={`pointer-events-auto transition-all duration-500 ease-out overflow-hidden ${
                openMenu
                  ? "opacity-100 translate-y-0 py-6"
                  : "opacity-0 -translate-y-4 py-0"
              }`}
            >
              <div className="rounded-3xl border border-gray-200/50 bg-white/95 p-8 transform-gpu">
                {openMenu === "solution" && (
                  <SolutionMega isLargeDesktop={isLargeDesktop} />
                )}
                {openMenu === "services" && (
                  <ServicesMega isLargeDesktop={isLargeDesktop} />
                )}
                {openMenu === "company" && (
                  <CompanyMega isLargeDesktop={isLargeDesktop} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tablet alternative (keeps parity with previous behavior) */}
      {isTablet && !isDesktop && openMenu && (
        <div className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-200/40 shadow-lg">
          <div className={`max-w-7xl mx-auto ${getContainerPadding()}`}>
            <div className="py-4">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                {openMenu === "solution" && <SolutionMegaTablet />}
                {openMenu === "services" && <ServicesMegaTablet />}
                {openMenu === "company" && <CompanyMegaTablet />}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile={isMobile}
        isSmallTablet={isSmallTablet}
      />
    </header>
  );
}

/* ------------------------- Small Components ------------------------- */

interface NavItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLargeDesktop: boolean;
  isScrolled: boolean;
}

function NavItem({
  label,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isLargeDesktop,
  isScrolled,
}: NavItemProps) {
  /**
   * Important styling rule: when header is transparent (not scrolled),
   * the nav labels must be white (so they show over the hero).
   * When scrolled, use the normal dark color.
   */
  const basePadding = isLargeDesktop ? "px-4 text-base" : "px-3 text-sm";
  const colorClass = isScrolled
    ? isOpen
      ? "text-red-600"
      : "text-gray-700 hover:text-red-600"
    : isOpen
    ? "text-white"
    : "text-white hover:text-white/90";

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-2 py-3 font-semibold rounded-2xl transition-all duration-300 ${basePadding} ${colorClass}`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <span>{label}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={isLargeDesktop ? 16 : 14}
        />
      </button>

      {/* Animated underline — color adapts to scrolled state */}
      <div
        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 transition-all duration-300 ${
          isOpen
            ? isScrolled
              ? "bg-gradient-to-r from-red-500 to-red-600 w-4/5"
              : "bg-white w-4/5"
            : "w-0"
        }`}
      />
    </div>
  );
}

/* ------------------------- Mega menus (kept largely same, small DRY cleanup) ------------------------- */

/* SolutionMega (desktop) */
function SolutionMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-lg" : "text-base";
  const descSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {SOLUTIONS.map((s, idx) => {
          const Icon = s.icon;
          return (
            <a
              key={s.title}
              href={s.href}
              className={`${padding} group block rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200/60 transform hover:-translate-y-1`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`${s.gradient} h-12 w-12 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
                >
                  <Icon size={iconSize} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold ${titleSize} text-gray-900 group-hover:text-gray-800 mb-2`}
                  >
                    {s.title}
                  </h3>
                  <p className={`${descSize} text-gray-600 leading-relaxed`}>
                    {s.description}
                  </p>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-6 flex flex-col justify-between border border-gray-200/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="bg-white rounded-2xl p-3 w-fit mx-auto mb-6 shadow-lg">
            <img
              src="/imast360.png"
              alt="imast360"
              className={isLargeDesktop ? "h-8" : "h-6"}
            />
          </div>
          <p
            className={`text-gray-700 text-center font-medium leading-relaxed ${
              isLargeDesktop ? "text-lg" : "text-base"
            }`}
          >
            Integrated Business Solution Designed To Foster Rapid Growth
          </p>
        </div>

        <div className="text-center mt-6 relative z-10">
          <a
            href="/solutions"
            className={`inline-flex items-center gap-2 text-red-600 font-semibold hover:gap-3 transition-all duration-300 group ${
              isLargeDesktop ? "text-base" : "text-sm"
            }`}
          >
            Explore All Solutions
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

/* SolutionMegaTablet */
function SolutionMegaTablet() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {SOLUTIONS.slice(0, 4).map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.title}
            href={s.href}
            className="group block p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`${s.gradient} h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0`}
              >
                <Icon size={16} />
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-sm text-gray-900 truncate">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 truncate">
                  {s.description}
                </p>
              </div>
            </div>
          </a>
        );
      })}
      <a
        href="/solutions"
        className="col-span-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-700 font-semibold hover:shadow-md transition-all duration-300 border border-red-200"
      >
        View All Solutions
        <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ServicesMega (desktop) */
function ServicesMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-xl" : "text-lg";
  const descSize = isLargeDesktop ? "text-base" : "text-sm";
  const featureSize = isLargeDesktop ? "text-sm" : "text-xs";

  const servicesWithDesc = [
    {
      ...SERVICES[0],
      description:
        "Roll out customized loyalty initiatives for your clients, employees, channel associates, or influencers",
      features: [
        "Employee Loyalty",
        "Influencer Loyalty",
        "Customer Loyalty",
        "Channel Loyalty",
      ],
    },
    {
      ...SERVICES[1],
      description:
        "Unmatched on-ground implementation to turn your business into a behemoth together",
      features: ["Implementation", "Support", "Training"],
    },
    {
      ...SERVICES[2],
      description:
        "Reward Management Services & Solutions with top-notch rewards and best-in-class delivery",
      features: [
        "Reward Management",
        "Delivery Services",
        "Customer Engagement",
      ],
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      {servicesWithDesc.map((service, index) => {
        const Icon = service.icon;
        return (
          <a
            key={service.title}
            href={service.href}
            className={`${padding} group block rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200/60 bg-white transform hover:-translate-y-1`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`${service.gradient} h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
              >
                <Icon size={iconSize} />
              </div>
              <h3 className={`font-bold ${titleSize} text-gray-900`}>
                {service.title}
              </h3>
            </div>

            <p className={`text-gray-600 mb-4 leading-relaxed ${descSize}`}>
              {service.description}
            </p>

            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-3 ${featureSize} text-gray-700`}
                >
                  <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            <div
              className={`inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all duration-300 ${featureSize}`}
            >
              Learn More
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </a>
        );
      })}
    </div>
  );
}

/* ServicesMegaTablet */
function ServicesMegaTablet() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {SERVICES.map((s) => {
        const Icon = s.icon;
        return (
          <a
            key={s.title}
            href={s.href}
            className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div
              className={`${s.gradient} h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0`}
            >
              <Icon size={16} />
            </div>
            <span className="font-semibold text-sm text-gray-900">
              {s.title}
            </span>
            <ArrowRight
              size={14}
              className="ml-auto text-gray-400 group-hover:text-red-600"
            />
          </a>
        );
      })}
    </div>
  );
}

/* CompanyMega */
function CompanyMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const iconSize = isLargeDesktop ? 20 : 18;
  const padding = isLargeDesktop ? "p-4" : "p-3";
  const titleSize = isLargeDesktop ? "text-base" : "text-sm";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          {COMPANY_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                className={`${padding} group flex items-center gap-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200/60 transform hover:-translate-y-0.5`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
                  <Icon size={iconSize} />
                </div>
                <div className="min-w-0">
                  <span
                    className={`font-semibold text-gray-700 group-hover:text-gray-900 block ${titleSize}`}
                  >
                    {link.label}
                  </span>
                  <span
                    className={`text-gray-500 group-hover:text-gray-600 transition-colors text-xs`}
                  >
                    Learn more →
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white border border-gray-700 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="bg-white/10 rounded-2xl p-3 w-fit mx-auto mb-6 backdrop-blur-sm">
            <img
              src="/logo.svg"
              alt="imast"
              className={isLargeDesktop ? "h-8" : "h-6"}
            />
          </div>
          <h3
            className={`font-bold mb-4 ${
              isLargeDesktop ? "text-xl" : "text-lg"
            }`}
          >
            Why Choose iMast?
          </h3>
          <p
            className={`text-gray-300 leading-relaxed mb-6 ${
              isLargeDesktop ? "text-base" : "text-sm"
            }`}
          >
            Automate and transform business operations, empower your workforce,
            escalate traction, and transmogrify engagement with your customers.
          </p>
          <a
            href="/about"
            className={`inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl font-semibold hover:gap-3 transition-all duration-300 group hover:shadow-lg ${
              isLargeDesktop ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
            }`}
          >
            Our Story
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

/* CompanyMegaTablet */
function CompanyMegaTablet() {
  return (
    <div className="grid grid-cols-1 gap-2">
      {COMPANY_LINKS.slice(0, 5).map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
              <Icon size={16} />
            </div>
            <span className="font-semibold text-sm text-gray-900">
              {link.label}
            </span>
            <ArrowRight
              size={14}
              className="ml-auto text-gray-400 group-hover:text-red-600"
            />
          </a>
        );
      })}
      <a
        href="/company"
        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold hover:shadow-md transition-all duration-300"
      >
        Learn More About Us
        <ArrowRight size={14} />
      </a>
    </div>
  );
}

/* ------------------------- Mobile Menu ------------------------- */

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isSmallTablet: boolean;
}

function MobileMenu({
  isOpen,
  onClose,
  isMobile,
  isSmallTablet,
}: MobileMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    solution: SOLUTIONS.map((s) => ({
      label: s.title,
      icon: s.icon,
      href: s.href,
    })),
    services: SERVICES.map((s) => ({
      label: s.title,
      icon: s.icon,
      href: s.href,
    })),
    company: COMPANY_LINKS.map((c) => ({
      label: c.label,
      icon: c.icon,
      href: c.href,
    })),
  };

  if (!isOpen) return null;

  const menuWidth = isMobile ? "w-72" : "w-80";
  const padding = isMobile ? "p-4" : "p-6";
  const logoHeight = isMobile ? "h-6" : "h-7";
  const buttonTextSize = isMobile ? "text-sm" : "text-base";
  const itemTextSize = isMobile ? "text-xs" : "text-sm";
  const iconSize = isMobile ? 14 : 16;
  const smallIconSize = isMobile ? 12 : 14;

  return (
    <div
      className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={`absolute left-0 top-0 bottom-0 ${menuWidth} max-w-full h-[100vh] bg-white ${padding} overflow-y-auto transform transition-transform duration-300 shadow-xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <img src="/logo.svg" alt="imast" className={logoHeight} />
          <button
            onClick={onClose}
            className={`rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105 ${
              isMobile ? "p-2" : "p-2.5"
            }`}
            aria-label="Close menu"
          >
            <X size={isMobile ? 16 : 18} />
          </button>
        </div>

        <nav className="space-y-2">
          {Object.entries(menuItems).map(([key, items]) => (
            <div key={key}>
              <button
                onClick={() => setActiveMenu(activeMenu === key ? null : key)}
                className={`w-full flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 font-semibold text-gray-900 hover:shadow-md ${buttonTextSize}`}
              >
                <span className="capitalize">{key}</span>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    activeMenu === key ? "rotate-180" : ""
                  }`}
                  size={iconSize}
                />
              </button>

              {activeMenu === key && (
                <div className="pl-3 mt-1 space-y-1 animate-fadeIn">
                  {items.map((item, index) => {
                    const Icon = (item as any).icon;
                    return (
                      <a
                        key={(item as any).label}
                        href={(item as any).href}
                        className={`flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1 ${itemTextSize}`}
                        onClick={onClose}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Icon
                          size={smallIconSize}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span className="truncate">{(item as any).label}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <a
            href="/contact"
            className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold mt-4 hover:shadow-lg transition-all duration-300 hover:gap-3 hover:scale-105 ${buttonTextSize}`}
            onClick={onClose}
          >
            Contact Us
            <ArrowRight size={smallIconSize} />
          </a>
        </nav>

        {isMobile && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                Need immediate assistance?
              </p>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                <HeadphonesIcon size={14} />
                Call Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

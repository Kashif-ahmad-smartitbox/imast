"use client";
import React, { useState, useRef, useEffect } from "react";
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

// Types
type MenuType = "solution" | "services" | "company" | null;

// Custom hook for scroll detection
const useScrollDetection = (threshold: number = 10) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return isScrolled;
};

// Custom hook for click outside detection
const useClickOutside = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [callback]);

  return ref;
};

// Custom hook for responsive breakpoints
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: windowSize.width < 640,
    isSmallTablet: windowSize.width >= 640 && windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    isLargeDesktop: windowSize.width >= 1280,
    windowSize,
  };
};

export default function Header() {
  const [openMenu, setOpenMenu] = useState<MenuType>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrolled = useScrollDetection(10);
  const { isMobile, isSmallTablet, isTablet, isDesktop, isLargeDesktop } =
    useResponsive();
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const containerRef = useClickOutside(() => setOpenMenu(null));

  const handleMenuEnter = (menu: MenuType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (isDesktop) {
      setOpenMenu(menu);
    }
  };

  const handleMenuLeave = () => {
    if (isDesktop) {
      timeoutRef.current = setTimeout(() => {
        setOpenMenu(null);
      }, 200);
    }
  };

  const toggleMenu = (menu: MenuType) => {
    if (!isDesktop) {
      setOpenMenu((current) => (current === menu ? null : menu));
    }
  };

  // Close mega menu when switching to mobile
  useEffect(() => {
    if (!isDesktop) {
      setOpenMenu(null);
    }
  }, [isDesktop]);

  // Dynamic header height based on screen size
  const getHeaderHeight = () => {
    if (isMobile) return "h-14";
    if (isSmallTablet || isTablet) return "h-16";
    return "h-20";
  };

  // Dynamic padding based on screen size
  const getContainerPadding = () => {
    if (isMobile) return "px-3";
    if (isSmallTablet) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  return (
    <header
      className={`w-full bg-white/95 backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "shadow-xl border-b border-gray-200/60"
          : "border-b border-gray-200/40"
      }`}
    >
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
                onToggle={() => toggleMenu("solution")}
                onMouseEnter={() => handleMenuEnter("solution")}
                onMouseLeave={handleMenuLeave}
                isLargeDesktop={isLargeDesktop}
              />
              <NavItem
                label="Services"
                isOpen={openMenu === "services"}
                onToggle={() => toggleMenu("services")}
                onMouseEnter={() => handleMenuEnter("services")}
                onMouseLeave={handleMenuLeave}
                isLargeDesktop={isLargeDesktop}
              />
              <NavItem
                label="Company"
                isOpen={openMenu === "company"}
                onToggle={() => toggleMenu("company")}
                onMouseEnter={() => handleMenuEnter("company")}
                onMouseLeave={handleMenuLeave}
                isLargeDesktop={isLargeDesktop}
              />
            </nav>
          )}

          {/* Tablet Navigation */}
          {isTablet && !isDesktop && (
            <nav className="flex items-center gap-1">
              <TabletNavItem
                label="Solution"
                isOpen={openMenu === "solution"}
                onToggle={() => toggleMenu("solution")}
              />
              <TabletNavItem
                label="Services"
                isOpen={openMenu === "services"}
                onToggle={() => toggleMenu("services")}
              />
              <TabletNavItem
                label="Company"
                isOpen={openMenu === "company"}
                onToggle={() => toggleMenu("company")}
              />
            </nav>
          )}

          {/* CTA Button and Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* CTA Button - Hidden on mobile */}
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

            {/* Menu Button - Tablet and Mobile */}
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
          onMouseEnter={() => handleMenuEnter(openMenu)}
          onMouseLeave={handleMenuLeave}
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

      {/* Tablet Mega Menu */}
      {isTablet && !isDesktop && openMenu && (
        <div
          ref={containerRef}
          className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-200/40 shadow-lg"
        >
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

// NavItem Component (Desktop)
interface NavItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLargeDesktop: boolean;
}

function NavItem({
  label,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isLargeDesktop,
}: NavItemProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-2 py-3 font-semibold rounded-2xl transition-all duration-300 ${
          isLargeDesktop ? "px-4 text-base" : "px-3 text-sm"
        } ${isOpen ? "text-red-600" : "text-gray-700 hover:text-red-600"}`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={isLargeDesktop ? 16 : 14}
        />
      </button>

      {/* Animated underline */}
      <div
        className={`absolute bottom-2 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-red-500 to-red-600 transition-all duration-300 ${
          isOpen ? "w-4/5" : "w-0"
        }`}
      />
    </div>
  );
}

// TabletNavItem Component
interface TabletNavItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
}

function TabletNavItem({ label, isOpen, onToggle }: TabletNavItemProps) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`inline-flex items-center gap-1 py-2 px-3 font-semibold rounded-xl transition-all duration-300 text-sm ${
          isOpen
            ? "text-red-600 bg-red-50"
            : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
        }`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
          size={14}
        />
      </button>
    </div>
  );
}

// Solution Mega Menu (Desktop)
function SolutionMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const solutions = [
    {
      icon: ShoppingCart,
      title: "Retail Point",
      description: "Point of sales solution and retail app",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      icon: Repeat,
      title: "Distribution+",
      description: "Distributor Management System (DMS)",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      icon: Star,
      title: "Loyalty Board",
      description: "Loyalty Management System",
      gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
    },
    {
      icon: TrendingUp,
      title: "Sales Track",
      description: "Sales Force Automation Solution",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Lead Sprint",
      description: "Lead Management Solution",
      gradient: "bg-gradient-to-r from-red-500 to-red-600",
    },
    {
      icon: Settings,
      title: "True View",
      description: "After Sales Service Management System",
      gradient: "bg-gradient-to-r from-indigo-500 to-indigo-600",
    },
  ];

  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-lg" : "text-base";
  const descSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {solutions.map((solution, index) => (
          <a
            key={solution.title}
            href={`/solutions/${solution.title
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            className={`group block ${padding} rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200/60 transform hover:-translate-y-1`}
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`h-12 w-12 rounded-2xl ${solution.gradient} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
              >
                <solution.icon size={iconSize} />
              </div>
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold ${titleSize} text-gray-900 group-hover:text-gray-800 mb-2`}
                >
                  {solution.title}
                </h3>
                <p className={`${descSize} text-gray-600 leading-relaxed`}>
                  {solution.description}
                </p>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Side Panel */}
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

        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// Solution Mega Menu (Tablet)
function SolutionMegaTablet() {
  const solutions = [
    {
      icon: ShoppingCart,
      title: "Retail Point",
      description: "Point of sales solution and retail app",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      icon: Repeat,
      title: "Distribution+",
      description: "Distributor Management System (DMS)",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      icon: Star,
      title: "Loyalty Board",
      description: "Loyalty Management System",
      gradient: "bg-gradient-to-r from-amber-500 to-amber-600",
    },
    {
      icon: TrendingUp,
      title: "Sales Track",
      description: "Sales Force Automation Solution",
      gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {solutions.map((solution, index) => (
        <a
          key={solution.title}
          href={`/solutions/${solution.title
            .toLowerCase()
            .replace(/\s+/g, "-")}`}
          className="group block p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div className="flex items-center gap-3">
            <div
              className={`h-8 w-8 rounded-lg ${solution.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}
            >
              <solution.icon size={16} />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-sm text-gray-900 truncate">
                {solution.title}
              </h3>
              <p className="text-xs text-gray-600 truncate">
                {solution.description}
              </p>
            </div>
          </div>
        </a>
      ))}
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

// Services Mega Menu (Desktop)
function ServicesMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const services = [
    {
      icon: Award,
      title: "Loyalty Max",
      description:
        "Roll out customized loyalty initiatives for your clients, employees, channel associates, or influencers",
      features: [
        "Employee Loyalty",
        "Influencer Loyalty",
        "Customer Loyalty",
        "Channel Loyalty",
      ],
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Work Champ",
      description:
        "Unmatched on-ground implementation to turn your business into a behemoth together",
      features: ["Implementation", "Support", "Training"],
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      icon: Package,
      title: "Reward MAX",
      description:
        "Reward Management Services & Solutions with top-notch rewards and best-in-class delivery",
      features: [
        "Reward Management",
        "Delivery Services",
        "Customer Engagement",
      ],
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];

  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-xl" : "text-lg";
  const descSize = isLargeDesktop ? "text-base" : "text-sm";
  const featureSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-6">
      {services.map((service, index) => (
        <a
          key={service.title}
          href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
          className={`group block ${padding} rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-gray-200/60 bg-white hover:bg-white transform hover:-translate-y-1`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div
              className={`h-12 w-12 rounded-xl ${service.gradient} flex items-center justify-center text-white shadow-lg flex-shrink-0`}
            >
              <service.icon size={iconSize} />
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
      ))}
    </div>
  );
}

// Services Mega Menu (Tablet)
function ServicesMegaTablet() {
  const services = [
    {
      icon: Award,
      title: "Loyalty Max",
      gradient: "bg-gradient-to-r from-pink-500 to-pink-600",
    },
    {
      icon: Users,
      title: "Work Champ",
      gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      icon: Package,
      title: "Reward MAX",
      gradient: "bg-gradient-to-r from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {services.map((service, index) => (
        <a
          key={service.title}
          href={`/services/${service.title.toLowerCase().replace(/\s+/g, "-")}`}
          className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div
            className={`h-8 w-8 rounded-lg ${service.gradient} flex items-center justify-center text-white shadow-md flex-shrink-0`}
          >
            <service.icon size={16} />
          </div>
          <span className="font-semibold text-sm text-gray-900">
            {service.title}
          </span>
          <ArrowRight
            size={14}
            className="ml-auto text-gray-400 group-hover:text-red-600"
          />
        </a>
      ))}
    </div>
  );
}

// Company Mega Menu (Desktop)
function CompanyMega({ isLargeDesktop }: { isLargeDesktop: boolean }) {
  const links = [
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

  const iconSize = isLargeDesktop ? 20 : 18;
  const padding = isLargeDesktop ? "p-4" : "p-3";
  const titleSize = isLargeDesktop ? "text-base" : "text-sm";
  const descSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          {links.map((link, index) => (
            <a
              key={link.label}
              href={link.href}
              className={`group flex items-center gap-4 ${padding} rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-200/60 transform hover:-translate-y-0.5`}
              style={{ transitionDelay: `${index * 30}ms` }}
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
                <link.icon size={iconSize} />
              </div>
              <div className="min-w-0">
                <span
                  className={`font-semibold text-gray-700 group-hover:text-gray-900 block ${titleSize}`}
                >
                  {link.label}
                </span>
                <span
                  className={`text-gray-500 group-hover:text-gray-600 transition-colors ${descSize}`}
                >
                  Learn more →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Side Panel */}
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

        {/* Animated background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-600 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

// Company Mega Menu (Tablet)
function CompanyMegaTablet() {
  const links = [
    { icon: Building, label: "About Us", href: "/about" },
    { icon: FileText, label: "Blogs", href: "/blog" },
    { icon: Briefcase, label: "Case Study", href: "/case-studies" },
    { icon: Users, label: "Career", href: "/careers" },
    { icon: MessageSquare, label: "Testimonials", href: "/testimonials" },
  ];

  return (
    <div className="grid grid-cols-1 gap-2">
      {links.map((link, index) => (
        <a
          key={link.label}
          href={link.href}
          className="group flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
        >
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-600 flex-shrink-0">
            <link.icon size={16} />
          </div>
          <span className="font-semibold text-sm text-gray-900">
            {link.label}
          </span>
          <ArrowRight
            size={14}
            className="ml-auto text-gray-400 group-hover:text-red-600"
          />
        </a>
      ))}
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

// Mobile Menu Component
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
    solution: [
      {
        label: "Retail Point",
        icon: ShoppingCart,
        href: "/solutions/retail-point",
      },
      {
        label: "Distribution+",
        icon: Repeat,
        href: "/solutions/distribution-plus",
      },
      { label: "Loyalty Board", icon: Star, href: "/solutions/loyalty-board" },
      {
        label: "Sales Track",
        icon: TrendingUp,
        href: "/solutions/sales-track",
      },
      { label: "Lead Sprint", icon: Zap, href: "/solutions/lead-sprint" },
      { label: "True View", icon: Settings, href: "/solutions/true-view" },
    ],
    services: [
      { label: "Loyalty Max", icon: Award, href: "/services/loyalty-max" },
      { label: "Work Champ", icon: Users, href: "/services/work-champ" },
      { label: "Reward MAX", icon: Package, href: "/services/reward-max" },
    ],
    company: [
      { label: "About Us", icon: Building, href: "/about" },
      { label: "Blogs", icon: FileText, href: "/blog" },
      { label: "Case Study", icon: Briefcase, href: "/case-studies" },
      { label: "Career", icon: Users, href: "/careers" },
      { label: "Testimonials", icon: MessageSquare, href: "/testimonials" },
      { label: "AUP", icon: Shield, href: "/aup" },
      { label: "Privacy Policy", icon: Shield, href: "/privacy" },
      { label: "Media", icon: Film, href: "/media" },
      { label: "Terms & Conditions", icon: Scale, href: "/terms" },
    ],
  };

  if (!isOpen) return null;

  // Dynamic sizing based on device
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
                  {items.map((item, index) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className={`flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1 ${itemTextSize}`}
                      onClick={onClose}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <item.icon
                        size={smallIconSize}
                        className="text-gray-400 flex-shrink-0"
                      />
                      <span className="truncate">{item.label}</span>
                    </a>
                  ))}
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

        {/* Additional mobile-specific content */}
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

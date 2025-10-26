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

// --- Constants
const SCROLL_THRESHOLD = 10;

// --- Types
interface MenuItem {
  icon: string;
  title: string;
  description?: string;
  href: string;
  gradient: string;
  features?: string[];
}

interface CompanyLink {
  icon: string;
  label: string;
  href: string;
}

interface HeaderData {
  logo: {
    src: string;
    alt: string;
    mobileHeight: string;
    tabletHeight: string;
    desktopHeight: string;
  };
  imast360Logo: {
    src: string;
    alt: string;
  };
  navigation: {
    items: Array<{
      key: string;
      label: string;
    }>;
  };
  solutions: MenuItem[];
  services: MenuItem[];
  companyLinks: CompanyLink[];
  cta: {
    text: string;
    href: string;
  };
  companyMega: {
    title: string;
    description: string;
    cta: {
      text: string;
      href: string;
    };
  };
  mobileMenu: {
    contact: {
      text: string;
      phone: string;
    };
  };
}

// --- Hooks
const isBrowser = (): boolean => typeof window !== "undefined";

const useScrolled = (threshold = SCROLL_THRESHOLD) => {
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

const useClickOutside = (handler: () => void) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        handler();
      }
    };

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [handler]);

  return ref;
};

// --- Utils
const getIconComponent = (iconName: string) => {
  const iconMap = {
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
    ChevronDown,
    Menu,
    X,
    ArrowRight,
  };

  return iconMap[iconName as keyof typeof iconMap] || Award;
};

// --- Main Component
export default function Header({ data }: { data: HeaderData }) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrolled = useScrolled();
  const { isMobile, isSmallTablet, isTablet, isDesktop, isLargeDesktop } =
    useWindowSize();

  const containerRef = useClickOutside(() => {
    if (!isHovering) {
      setOpenMenu(null);
    }
  });

  // Close desktop mega menu when moving to smaller viewport
  useEffect(() => {
    if (!isDesktop && openMenu !== null) {
      setOpenMenu(null);
    }
  }, [isDesktop, openMenu]);

  const handleMenuInteraction = useCallback((menuKey: string | null) => {
    setOpenMenu(menuKey);
  }, []);

  const handleMouseEnter = useCallback(
    (menuKey: string) => {
      if (isDesktop) {
        setIsHovering(true);
        setOpenMenu(menuKey);
      }
    },
    [isDesktop]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    // Don't close immediately on mouse leave - let click outside handle it
  }, []);

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
    ? "bg-white/95 border-b border-gray-200/60"
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
              onClick={() => handleMenuInteraction(null)}
            >
              <div className="relative">
                <img
                  src={data.logo.src}
                  alt={data.logo.alt}
                  className={`w-auto transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 ${
                    isMobile
                      ? data.logo.mobileHeight
                      : isSmallTablet || isTablet
                      ? data.logo.tabletHeight
                      : data.logo.desktopHeight
                  }`}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {isDesktop && (
            <nav className="flex items-center gap-1 xl:gap-2">
              {data.navigation.items.map((item) => (
                <NavItem
                  key={item.key}
                  label={item.label}
                  menuKey={item.key}
                  isOpen={openMenu === item.key}
                  onToggle={() =>
                    handleMenuInteraction(
                      openMenu === item.key ? null : item.key
                    )
                  }
                  onMouseEnter={() => handleMouseEnter(item.key)}
                  onMouseLeave={handleMouseLeave}
                  isLargeDesktop={isLargeDesktop}
                  isScrolled={scrolled}
                />
              ))}
            </nav>
          )}

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            {!isMobile && (
              <CTAButton
                href={data.cta.href}
                text={data.cta.text}
                isSmallTablet={isSmallTablet}
                isTablet={isTablet}
              />
            )}

            {/* Toggle for small screens */}
            {!isDesktop && (
              <MobileToggleButton
                isOpen={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                isMobile={isMobile}
              />
            )}
          </div>
        </div>
      </div>

      {/* Desktop Mega Menu */}
      {isDesktop && (
        <div
          ref={containerRef}
          className="absolute left-0 right-0 top-full"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div className={`max-w-7xl mx-auto ${getContainerPadding()}`}>
            <div
              className={`transition-all duration-500 ease-out overflow-hidden ${
                openMenu
                  ? "opacity-100 translate-y-0 py-6 pointer-events-auto"
                  : "opacity-0 -translate-y-4 py-0 pointer-events-none"
              }`}
            >
              <div className="rounded-3xl border border-gray-200/50 bg-white/95 p-8 transform-gpu">
                {openMenu === "solution" && (
                  <SolutionMega data={data} isLargeDesktop={isLargeDesktop} />
                )}
                {openMenu === "services" && (
                  <ServicesMega
                    data={data.services}
                    isLargeDesktop={isLargeDesktop}
                  />
                )}
                {openMenu === "company" && (
                  <CompanyMega data={data} isLargeDesktop={isLargeDesktop} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tablet alternative */}
      {isTablet && !isDesktop && openMenu && (
        <TabletMegaMenu
          openMenu={openMenu}
          data={data}
          getContainerPadding={getContainerPadding}
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu
        data={data}
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isMobile={isMobile}
        isSmallTablet={isSmallTablet}
      />
    </header>
  );
}

// --- Sub Components
interface NavItemProps {
  label: string;
  menuKey: string;
  isOpen: boolean;
  onToggle: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  isLargeDesktop: boolean;
  isScrolled: boolean;
}

function NavItem({
  label,
  menuKey,
  isOpen,
  onToggle,
  onMouseEnter,
  onMouseLeave,
  isLargeDesktop,
  isScrolled,
}: NavItemProps) {
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

      {/* Animated underline */}
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

interface CTAButtonProps {
  href: string;
  text: string;
  isSmallTablet: boolean;
  isTablet: boolean;
}

function CTAButton({ href, text, isSmallTablet, isTablet }: CTAButtonProps) {
  const buttonSize = isSmallTablet
    ? "px-3 py-2 text-sm"
    : isTablet
    ? "px-4 py-2 text-sm"
    : "px-6 py-2.5 text-base";

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 hover:gap-3 group relative overflow-hidden ${buttonSize}`}
    >
      <span className="relative z-10">{text}</span>
      <ArrowRight
        size={isTablet ? 12 : 14}
        className="relative z-10 group-hover:translate-x-1 transition-transform"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
}

interface MobileToggleButtonProps {
  isOpen: boolean;
  onClick: () => void;
  isMobile: boolean;
}

function MobileToggleButton({
  isOpen,
  onClick,
  isMobile,
}: MobileToggleButtonProps) {
  return (
    <button
      className={`rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105 active:scale-95 ${
        isMobile ? "p-2" : "p-2.5"
      }`}
      aria-label="Toggle menu"
      onClick={onClick}
    >
      {isOpen ? (
        <X size={isMobile ? 16 : 18} />
      ) : (
        <Menu size={isMobile ? 16 : 18} />
      )}
    </button>
  );
}

interface TabletMegaMenuProps {
  openMenu: string;
  data: HeaderData;
  getContainerPadding: () => string;
}

function TabletMegaMenu({
  openMenu,
  data,
  getContainerPadding,
}: TabletMegaMenuProps) {
  return (
    <div className="absolute left-0 right-0 top-full bg-white/95 backdrop-blur-md border-t border-gray-200/40 shadow-lg">
      <div className={`max-w-7xl mx-auto ${getContainerPadding()}`}>
        <div className="py-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            {openMenu === "solution" && (
              <SolutionMegaTablet data={data.solutions} />
            )}
            {openMenu === "services" && (
              <ServicesMegaTablet data={data.services} />
            )}
            {openMenu === "company" && (
              <CompanyMegaTablet data={data.companyLinks} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function SolutionMega({
  data,
  isLargeDesktop,
}: {
  data: HeaderData;
  isLargeDesktop: boolean;
}) {
  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-lg" : "text-base";
  const descSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {data.solutions.map((s, idx) => {
          const Icon = getIconComponent(s.icon);
          return (
            <Link
              key={s.title}
              href={s.href}
              className={`${padding} group block rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-200/60 transform hover:-translate-y-1`}
              style={{ transitionDelay: `${idx * 50}ms` }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`bg-gradient-to-r from-primary-500 to-primary-600 h-12 w-12 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-lg flex-shrink-0`}
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
            </Link>
          );
        })}
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-primary-100/80 rounded-2xl p-6 flex flex-col justify-between border border-gray-200/40 relative overflow-hidden">
        <div className="relative z-10">
          <div className="bg-white rounded-2xl p-3 w-fit mx-auto mb-6 shadow-lg">
            <img
              src={data.imast360Logo.src}
              alt={data.imast360Logo.alt}
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
          <Link
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
          </Link>
        </div>

        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-red-500 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}

// These components remain exactly the same as in your original code
function SolutionMegaTablet({ data }: { data: MenuItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {data.slice(0, 4).map((s) => {
        const Icon = getIconComponent(s.icon);
        return (
          <a
            key={s.title}
            href={s.href}
            className="group block p-3 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-100"
          >
            <div className="flex items-center gap-3">
              <div
                className={`bg-gradient-to-r from-primary-500 to-primary-600 h-8 w-8 rounded-lg flex items-center justify-center text-white shadow-md flex-shrink-0`}
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
      <Link
        href="/solutions"
        className="col-span-full flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-red-50 to-red-100 text-red-700 font-semibold hover:shadow-md transition-all duration-300 border border-red-200"
      >
        View All Solutions
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

function ServicesMega({
  data,
  isLargeDesktop,
}: {
  data: MenuItem[];
  isLargeDesktop: boolean;
}) {
  const iconSize = isLargeDesktop ? 24 : 20;
  const padding = isLargeDesktop ? "p-6" : "p-5";
  const titleSize = isLargeDesktop ? "text-xl" : "text-lg";
  const descSize = isLargeDesktop ? "text-base" : "text-sm";
  const featureSize = isLargeDesktop ? "text-sm" : "text-xs";

  return (
    <div className="grid grid-cols-3 gap-6">
      {data.map((service, index) => {
        const Icon = getIconComponent(service.icon);
        return (
          <Link
            key={service.title}
            href={service.href}
            className={`${padding} group block rounded-2xl hover:shadow-xl transition-all duration-300 border border-gray-200 hover:border-gray-200/60 transform hover:-translate-y-1`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`bg-gradient-to-r from-primary-500 to-primary-600 h-12 w-12 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0`}
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

            {service.features && (
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
            )}

            <div
              className={`inline-flex items-center gap-2 text-red-600 font-semibold group-hover:gap-3 transition-all duration-300 ${featureSize}`}
            >
              Learn More
              <ArrowRight
                size={12}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function ServicesMegaTablet({ data }: { data: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((s) => {
        const Icon = getIconComponent(s.icon);
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

function CompanyMega({
  data,
  isLargeDesktop,
}: {
  data: HeaderData;
  isLargeDesktop: boolean;
}) {
  const iconSize = isLargeDesktop ? 20 : 18;
  const padding = isLargeDesktop ? "p-4" : "p-3";
  const titleSize = isLargeDesktop ? "text-base" : "text-sm";

  return (
    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          {data.companyLinks.map((link, index) => {
            const Icon = getIconComponent(link.icon);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`${padding} group flex items-center gap-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-gray-200/60 transform hover:-translate-y-0.5`}
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 shadow-sm flex-shrink-0">
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
              </Link>
            );
          })}
        </div>
      </div>

      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white border border-gray-700 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="bg-white/10 rounded-2xl p-3 w-fit mx-auto mb-6 backdrop-blur-sm">
            <img
              src={data.logo.src}
              alt={data.logo.alt}
              className={isLargeDesktop ? "h-8" : "h-6"}
            />
          </div>
          <h3
            className={`font-bold mb-4 ${
              isLargeDesktop ? "text-xl" : "text-lg"
            }`}
          >
            {data.companyMega.title}
          </h3>
          <p
            className={`text-gray-300 leading-relaxed mb-6 ${
              isLargeDesktop ? "text-base" : "text-sm"
            }`}
          >
            {data.companyMega.description}
          </p>
          <a
            href={data.companyMega.cta.href}
            className={`inline-flex items-center gap-2 bg-white text-gray-900 rounded-xl font-semibold hover:gap-3 transition-all duration-300 group hover:shadow-lg ${
              isLargeDesktop ? "px-6 py-3 text-base" : "px-4 py-2 text-sm"
            }`}
          >
            {data.companyMega.cta.text}
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

function CompanyMegaTablet({ data }: { data: CompanyLink[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.slice(0, 5).map((link) => {
        const Icon = getIconComponent(link.icon);
        return (
          <Link
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
          </Link>
        );
      })}
      <Link
        href="/company"
        className="flex items-center justify-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold hover:shadow-md transition-all duration-300"
      >
        Learn More About Us
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}

// --- Mobile Menu Component (keep the same implementation)
interface MobileMenuProps {
  data: HeaderData;
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
  isSmallTablet: boolean;
}

function MobileMenu({
  data,
  isOpen,
  onClose,
  isMobile,
  isSmallTablet,
}: MobileMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems = {
    solution: data.solutions.map((s) => ({
      label: s.title,
      icon: s.icon,
      href: s.href,
    })),
    services: data.services.map((s) => ({
      label: s.title,
      icon: s.icon,
      href: s.href,
    })),
    company: data.companyLinks.map((c) => ({
      label: c.label,
      icon: c.icon,
      href: c.href,
    })),
  };

  if (!isOpen) return null;

  const menuWidth = isMobile ? "w-72" : "w-80";
  const padding = isMobile ? "p-4" : "p-6";
  const logoHeight = isMobile ? data.logo.mobileHeight : data.logo.tabletHeight;
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
          <img src={data.logo.src} alt={data.logo.alt} className={logoHeight} />
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
                    const Icon = getIconComponent(item.icon);
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        className={`flex items-center gap-3 p-2 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-300 hover:translate-x-1 ${itemTextSize}`}
                        onClick={onClose}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Icon
                          size={smallIconSize}
                          className="text-gray-400 flex-shrink-0"
                        />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          <Link
            href={data.cta.href}
            className={`flex items-center justify-center gap-2 w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 rounded font-semibold mt-4 hover:shadow-lg transition-all duration-300 hover:gap-3 hover:scale-105 ${buttonTextSize}`}
            onClick={onClose}
          >
            {data.cta.text}
            <ArrowRight size={smallIconSize} />
          </Link>
        </nav>

        {isMobile && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">
                {data.mobileMenu.contact.text}
              </p>
              <Link
                href={`tel:${data.mobileMenu.contact.phone}`}
                className="inline-flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all duration-300"
              >
                <HeadphonesIcon size={14} />
                Call Us
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

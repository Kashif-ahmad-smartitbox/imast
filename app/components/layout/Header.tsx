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
interface FeatureLink {
  label: string;
  href: string;
}

type Feature = string | FeatureLink;

interface MenuItem {
  icon: string;
  title: string;
  description?: string;
  href: string;
  gradient?: string;
  features?: Feature[];
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
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
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
        // Clear any pending close timeout
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          setCloseTimeout(null);
        }

        setIsHovering(true);
        setOpenMenu(menuKey);
      }
    },
    [isDesktop, closeTimeout]
  );

  const handleMouseLeave = useCallback(() => {
    if (isDesktop) {
      setIsHovering(false);

      // Set a timeout to close the menu after a short delay
      // This prevents the menu from closing when moving between the button and the menu
      const timeout = setTimeout(() => {
        setOpenMenu(null);
      }, 200); // 200ms delay before closing

      setCloseTimeout(timeout);
    }
  }, [isDesktop]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

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
          onMouseEnter={() => {
            // Clear timeout when entering the mega menu
            if (closeTimeout) {
              clearTimeout(closeTimeout);
              setCloseTimeout(null);
            }
            setIsHovering(true);
          }}
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
              ? "bg-linear-to-r from-red-500 to-red-600 w-4/5"
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
      className={`inline-flex items-center gap-2 bg-linear-to-r from-primary-600 to-primary-700 text-white rounded shadow-lg hover:shadow-xl transition-all duration-300 font-semibold hover:scale-105 hover:gap-3 group relative overflow-hidden ${buttonSize}`}
    >
      <span className="relative z-10">{text}</span>
      <ArrowRight
        size={isTablet ? 12 : 14}
        className="relative z-10 group-hover:translate-x-1 transition-transform"
      />
      <div className="absolute inset-0 bg-linear-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
  const titleSize = isLargeDesktop ? "text-lg" : "text-sm";
  const descSize = isLargeDesktop ? "text-xs" : "text-xs";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
      {/* Solutions Grid - Enhanced */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-2">
        {data.solutions.map((s, idx) => {
          const Icon = getIconComponent(s.icon);
          return (
            <Link
              key={s.title}
              href={s.href}
              className={`${padding} group relative block rounded-2xl hover:shadow-2xl transition-all duration-500 border border-gray-200 hover:border-primary-200/60 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm overflow-hidden`}
              style={{ transitionDelay: `${idx * 75}ms` }}
            >
              {/* Background effects */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-200/30 rounded-2xl transition-all duration-500" />

              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className={`bg-linear-to-br from-primary-500 to-primary-600 h-12 w-12 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shrink-0`}
                  >
                    <Icon
                      size={iconSize}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-bold ${titleSize} text-gray-900 group-hover:text-primary-700 mb-3 transition-colors duration-300`}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={`${descSize} text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300`}
                    >
                      {s.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-6 right-6 h-1 bg-linear-to-r from-primary-500 to-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </Link>
          );
        })}
      </div>

      {/* IMAST 360 Card - Enhanced */}
      <div className="bg-linear-to-br from-primary-50 to-primary-100/80 rounded-2xl p-6 lg:p-8 flex flex-col justify-between border border-primary-200/40 relative overflow-hidden group hover:shadow-xl transition-all duration-500">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
        <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary-300 rounded-full mix-blend-multiply filter blur-lg opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

        <div className="relative z-10">
          {/* Logo container with enhanced styling */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 w-fit mx-auto mb-6 shadow-lg group-hover:scale-105 transition-transform duration-500 border border-primary-100">
            <img
              src={data.imast360Logo.src}
              alt={data.imast360Logo.alt}
              className={
                isLargeDesktop
                  ? "h-8"
                  : "h-6 transition-transform duration-300 group-hover:scale-110"
              }
            />
          </div>

          {/* Description with better typography */}
          <p
            className={`text-gray-800 text-center font-semibold leading-relaxed ${
              isLargeDesktop ? "text-lg" : "text-base"
            } group-hover:text-gray-900 transition-colors duration-300`}
          >
            Integrated Business Solution Designed To Foster Rapid Growth
          </p>
        </div>

        {/* Enhanced CTA */}
        <div className="text-center mt-6 lg:mt-8 relative z-10">
          <Link
            href="/contact"
            className={`inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl text-primary-600 font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 group border border-primary-200/60 ${
              isLargeDesktop ? "text-base" : "text-sm"
            }`}
          >
            <span className="bg-linear-to-r from-primary-600 to-primary-600 bg-size-[0%_2px] bg-bottom-left bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500">
              Explore All
            </span>
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-primary-300/0 group-hover:border-primary-300/50 transition-all duration-500 delay-200" />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-primary-300/0 group-hover:border-primary-300/50 transition-all duration-500 delay-300" />
      </div>
    </div>
  );
}

function SolutionMegaTablet({ data }: { data: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.slice(0, 4).map((s, idx) => {
        const Icon = getIconComponent(s.icon);
        return (
          <Link
            key={s.title}
            href={s.href}
            className="group block p-4 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200/60 transform hover:-translate-y-1"
            style={{ transitionDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`bg-linear-to-br from-primary-500 to-primary-600 h-10 w-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={18} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-sm text-gray-900 group-hover:text-primary-700 transition-colors duration-300 truncate">
                  {s.title}
                </h3>
                <p className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300 line-clamp-2 mt-1">
                  {s.description}
                </p>
              </div>
            </div>

            {/* Hover indicator */}
            <div className="mt-3 pt-2 border-t border-gray-100 group-hover:border-primary-100 transition-colors duration-300">
              <div className="inline-flex items-center gap-1 text-primary-600 text-xs font-medium group-hover:gap-1.5 transition-all duration-300">
                <span>Learn more</span>
                <ArrowRight
                  size={12}
                  className="group-hover:translate-x-0.5 transition-transform"
                />
              </div>
            </div>
          </Link>
        );
      })}

      {/* Enhanced View All Card */}
      <Link
        href="/solutions"
        className="col-span-full flex items-center justify-center gap-3 p-4 rounded-xl bg-linear-to-r from-primary-50 to-primary-100 text-primary-700 font-semibold hover:shadow-lg transition-all duration-300 border border-primary-200 hover:border-primary-300 transform hover:-translate-y-1 group"
      >
        <span className="bg-linear-to-r from-primary-600 to-primary-600 bg-size-[0%_2px] bg-bottom-left bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500">
          View All Solutions
        </span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
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
  const iconSize = isLargeDesktop ? 18 : 16;
  const padding = isLargeDesktop ? "p-4" : "p-3";
  const titleSize = isLargeDesktop ? "text-lg" : "text-sm";
  const descSize = isLargeDesktop ? "text-xs" : "text-xs";
  const featureSize = isLargeDesktop ? "text-xs" : "text-xs";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {data.map((service, index) => {
        const Icon = getIconComponent(service.icon);
        return (
          <Link
            key={service.title}
            href={service.href}
            className={`${padding} group relative rounded-xl transition-all duration-300 border border-gray-200/80 bg-white/90 backdrop-blur-sm min-h-[140px] flex flex-col hover:border-primary-300/50 hover:bg-white transform hover:-translate-y-0.5`}
            style={{
              transitionDelay: `${index * 30}ms`,
            }}
          >
            {/* Gradient border effect */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary-500/5 to-primary-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Animated corner accents */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 border-t border-r border-primary-500/0 group-hover:border-primary-500/50 transition-all duration-300 delay-100" />
            <div className="absolute bottom-2 left-2 w-1.5 h-1.5 border-b border-l border-primary-500/0 group-hover:border-primary-500/50 transition-all duration-300 delay-150" />

            <div className="relative z-10 flex-1 flex flex-col">
              {/* Icon and Title - Enhanced Compact */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className={`bg-linear-to-br from-primary-500 to-primary-600 h-7 w-7 rounded-lg flex items-center justify-center text-white shadow-md shrink-0 mt-0.5 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}
                >
                  <Icon size={iconSize} className="drop-shadow-sm" />
                </div>
                <h3
                  className={`font-semibold ${titleSize} text-gray-900 line-clamp-2 leading-tight flex-1 group-hover:text-primary-700 transition-colors duration-300`}
                >
                  {service.title}
                </h3>
              </div>

              {/* Description - Enhanced Compact */}
              {service.description && (
                <p
                  className={`text-gray-600 mb-2.5 leading-relaxed line-clamp-2 ${descSize} flex-1 group-hover:text-gray-700 transition-colors duration-300`}
                >
                  {service.description}
                </p>
              )}

              {/* Features List - Enhanced Compact */}
              {service.features && service.features.length > 0 && (
                <ul className="space-y-1.5 mb-2.5">
                  {service.features.slice(0, 2).map((feature, idx) => {
                    if (typeof feature === "string") {
                      return (
                        <li
                          key={idx}
                          className={`flex items-center gap-2 ${featureSize} text-gray-700 line-clamp-1 group-hover:text-gray-800 transition-colors duration-300`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-1.5 h-1.5 bg-linear-to-br from-primary-500 to-primary-600 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-sm" />
                          <span className="truncate">{feature}</span>
                        </li>
                      );
                    } else {
                      return (
                        <li
                          key={idx}
                          className={`flex items-center gap-2 ${featureSize} text-gray-700 line-clamp-1 group-hover:text-gray-800 transition-colors duration-300`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        >
                          <div className="w-1.5 h-1.5 bg-linear-to-br from-primary-500 to-primary-600 rounded-full shrink-0 group-hover:scale-125 transition-transform duration-300 shadow-sm" />
                          <Link
                            href={feature.href}
                            className="hover:underline hover:text-primary-600 transition-colors duration-300 truncate"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {feature.label}
                          </Link>
                        </li>
                      );
                    }
                  })}

                  {/* Enhanced "+ more" indicator */}
                  {service.features.length > 2 && (
                    <li
                      className={`flex items-center gap-2 ${featureSize} text-gray-500 group-hover:text-gray-600 transition-colors duration-300`}
                    >
                      <div className="w-1.5 h-1.5 bg-linear-to-br from-gray-400 to-gray-500 rounded-full shrink-0" />
                      <span>+{service.features.length - 2} more</span>
                    </li>
                  )}
                </ul>
              )}

              {/* Enhanced CTA */}
              <div className="mt-auto pt-1 border-t border-gray-100/50 group-hover:border-primary-100 transition-colors duration-300">
                <div
                  className={`inline-flex items-center gap-1.5 text-primary-600 font-semibold group-hover:gap-2 transition-all duration-300 ${featureSize}`}
                >
                  <span className="bg-linear-to-r from-primary-600 to-primary-600 bg-size-[0%_1px] bg-bottom-left bg-no-repeat group-hover:bg-size-[100%_1px] transition-all duration-500">
                    Learn more
                  </span>
                  <ArrowRight
                    size={12}
                    className="group-hover:translate-x-0.5 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Subtle hover glow */}
            <div className="absolute inset-0 rounded-xl ring-1 ring-primary-500/0 group-hover:ring-primary-500/10 transition-all duration-500" />
          </Link>
        );
      })}
    </div>
  );
}

function ServicesMegaTablet({ data }: { data: MenuItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-2">
      {data.map((service, index) => {
        const Icon = getIconComponent(service.icon);
        return (
          <Link
            key={service.title}
            href={service.href}
            className="group flex items-center gap-3 p-2.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-300 border border-gray-200/80 hover:border-primary-300/50 min-h-[52px] transform hover:-translate-y-0.5"
            style={{ transitionDelay: `${index * 20}ms` }}
          >
            {/* Background effect */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary-500/3 to-primary-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div
              className={`${
                service.gradient ||
                "bg-linear-to-br from-primary-500 to-primary-600"
              } h-7 w-7 rounded-lg flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300 relative z-10`}
            >
              <Icon size={16} className="drop-shadow-sm" />
            </div>

            <div className="flex-1 min-w-0 relative z-10">
              <span className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-primary-700 transition-colors duration-300">
                {service.title}
              </span>
              {service.description && (
                <p className="text-xs text-gray-600 mt-0.5 line-clamp-1 group-hover:text-gray-700 transition-colors duration-300">
                  {service.description}
                </p>
              )}
            </div>

            <ArrowRight
              size={14}
              className="ml-1 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all duration-300 shrink-0 relative z-10"
            />

            {/* Hover accent line */}
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-linear-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/50 group-hover:via-primary-500 group-hover:to-primary-500/50 transition-all duration-500 rounded-full" />
          </Link>
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
  const padding = isLargeDesktop ? "p-5" : "p-4";
  const titleSize = isLargeDesktop ? "text-lg" : "text-base";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Company Links Grid - Enhanced */}
      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-2">
          {data.companyLinks.map((link, index) => {
            const Icon = getIconComponent(link.icon);
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`${padding} group relative flex items-center gap-4 rounded-xl hover:shadow-xl transition-all duration-500 border border-gray-200 hover:border-primary-200/60 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Background effect */}
                <div className="absolute inset-0 rounded-xl bg-linear-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

                {/* Animated border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-200/30 rounded-xl transition-all duration-500" />

                {/* Icon with enhanced styling */}
                <div className="h-12 w-12 rounded-xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shrink-0 relative z-10">
                  <Icon
                    size={iconSize}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 relative z-10">
                  <span
                    className={`font-semibold text-gray-800 group-hover:text-primary-700 block ${titleSize} transition-colors duration-300`}
                  >
                    {link.label}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="text-primary-600 text-xs font-medium group-hover:gap-2 transition-all duration-300">
                      Learn more
                    </span>
                    <ArrowRight
                      size={12}
                      className="text-primary-600 group-hover:translate-x-0.5 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-linear-to-r from-primary-500 to-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Company Info Card - Enhanced */}
      <div className="bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-6 lg:p-8 text-white border border-gray-700 relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Animated background elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-blue-500/20 rounded-full mix-blend-overlay filter blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-purple-500/20 rounded-full mix-blend-overlay filter blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-700 delay-200" />

        <div className="relative z-10 text-center h-full flex flex-col justify-between">
          {/* Logo container */}
          <div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 w-fit mx-auto mb-6 border border-white/20 group-hover:scale-105 transition-transform duration-500">
              <img
                src={data.logo.src}
                alt={data.logo.alt}
                className={
                  isLargeDesktop
                    ? "h-8"
                    : "h-6 transition-transform duration-300 group-hover:scale-110"
                }
              />
            </div>

            {/* Title */}
            <h3
              className={`font-bold mb-4 text-white group-hover:text-gray-100 transition-colors duration-300 ${
                isLargeDesktop ? "text-xl" : "text-lg"
              }`}
            >
              {data.companyMega.title}
            </h3>

            {/* Description */}
            <p
              className={`text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300 ${
                isLargeDesktop ? "text-base" : "text-sm"
              }`}
            >
              {data.companyMega.description}
            </p>
          </div>

          {/* Enhanced CTA */}
          <div className="mt-auto">
            <a
              href={data.companyMega.cta.href}
              className={`inline-flex items-center gap-3 bg-white text-gray-900 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 group border border-white/20 ${
                isLargeDesktop ? "px-6 py-3 text-base" : "px-5 py-2.5 text-sm"
              }`}
            >
              <span className="bg-linear-to-r from-gray-900 to-gray-900 bg-size-[0%_2px] bg-bottom-left bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500">
                {data.companyMega.cta.text}
              </span>
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </a>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-white/0 group-hover:border-white/30 transition-all duration-500 delay-200" />
        <div className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-white/0 group-hover:border-white/30 transition-all duration-500 delay-300" />
      </div>
    </div>
  );
}

function CompanyMegaTablet({ data }: { data: CompanyLink[] }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {data.slice(0, 5).map((link, index) => {
        const Icon = getIconComponent(link.icon);
        return (
          <Link
            key={link.label}
            href={link.href}
            className="group flex items-center gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-primary-200/60 transform hover:-translate-y-0.5"
            style={{ transitionDelay: `${index * 30}ms` }}
          >
            {/* Background effect */}
            <div className="absolute inset-0 rounded-xl bg-linear-to-r from-primary-500/3 to-primary-600/3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="h-9 w-9 rounded-lg bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white shadow-md shrink-0 group-hover:scale-105 transition-transform duration-300 relative z-10">
              <Icon size={16} />
            </div>

            <div className="flex-1 min-w-0 relative z-10">
              <span className="font-semibold text-sm text-gray-900 group-hover:text-primary-700 transition-colors duration-300">
                {link.label}
              </span>
            </div>

            <ArrowRight
              size={14}
              className="ml-1 text-gray-400 group-hover:text-primary-600 group-hover:translate-x-0.5 transition-all duration-300 shrink-0 relative z-10"
            />

            {/* Hover indicator */}
            <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-linear-to-r from-primary-500/0 via-primary-500/0 to-primary-500/0 group-hover:from-primary-500/50 group-hover:via-primary-500 group-hover:to-primary-500/50 transition-all duration-500 rounded-full" />
          </Link>
        );
      })}

      {/* Enhanced CTA Card */}
      <Link
        href="/company"
        className="flex items-center justify-center gap-3 p-4 rounded-xl bg-linear-to-r from-gray-900 to-gray-800 text-white font-bold hover:shadow-xl transition-all duration-300 border border-gray-700 hover:border-gray-600 transform hover:-translate-y-0.5 group"
      >
        <span className="bg-linear-to-r from-white to-white bg-size-[0%_2px] bg-bottom-left bg-no-repeat group-hover:bg-size-[100%_2px] transition-all duration-500">
          Learn More About Us
        </span>
        <ArrowRight
          size={16}
          className="group-hover:translate-x-1 transition-transform duration-300"
        />
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
        className={`absolute left-0 top-0 bottom-0 ${menuWidth} max-w-full h-screen bg-white ${padding} overflow-y-auto transform transition-transform duration-300 shadow-xl`}
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
                          className="text-gray-400 shrink-0"
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
            className={`flex items-center justify-center gap-2 w-full bg-linear-to-r from-primary-600 to-primary-700 text-white py-3 rounded font-semibold mt-4 hover:shadow-lg transition-all duration-300 hover:gap-3 hover:scale-105 ${buttonTextSize}`}
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

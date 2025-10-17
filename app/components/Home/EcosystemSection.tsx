"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  BarChart2,
  Headphones,
  Link,
  ShoppingCart,
  MessageSquare,
  Mail,
  Globe,
  Smartphone,
  Zap,
  User,
  Handshake,
  Store,
  Box,
  DollarSign,
  Target,
  Star,
  LucideIcon,
  Play,
  Pause,
  ArrowRight,
} from "lucide-react";

// -------------------- Types --------------------
interface EcosystemItem {
  name: string;
  icon: keyof typeof ICONS;
  angle: number;
  description?: string;
}

interface EcosystemCircleProps {
  item: EcosystemItem;
  radius: number;
  size: number;
  className: string;
  index: number;
  scale: number;
  isActive: boolean;
  onHover: (item: EcosystemItem | null) => void;
}

// -------------------- Icon Map --------------------
const ICONS = {
  Briefcase,
  TrendingUp,
  Users,
  BarChart2,
  Headphones,
  Link,
  ShoppingCart,
  MessageSquare,
  Mail,
  Globe,
  Smartphone,
  Zap,
  User,
  Handshake,
  Store,
  Box,
  DollarSign,
  Target,
  Star,
} as const;

// -------------------- Hook --------------------
const useResponsiveScale = (): number => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        setScale(0.6);
      } else if (window.innerWidth < 1024) {
        setScale(0.8);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
};

// -------------------- Components --------------------
const EcosystemCircle: React.FC<EcosystemCircleProps> = ({
  item,
  radius,
  size,
  className,
  index,
  scale,
  isActive,
  onHover,
}) => {
  const radians = (item.angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius * scale;
  const y = Math.sin(radians) * radius * scale;
  const Icon: LucideIcon = ICONS[item.icon];

  return (
    <div
      className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-500 cursor-pointer ${
        isActive ? "z-20 scale-125" : "z-10 scale-100"
      } ${className}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: `${size * scale}px`,
        height: `${size * scale}px`,
        animationDelay: `${index * 0.1}s`,
      }}
      onMouseEnter={() => onHover(item)}
      onMouseLeave={() => onHover(null)}
      onClick={() => onHover(isActive ? null : item)}
    >
      <div
        className={`relative transition-all duration-300 ${
          isActive ? "scale-110" : "scale-100"
        }`}
      >
        <div
          className={`absolute inset-0 rounded-full blur-md transition-all duration-300 ${
            isActive ? "opacity-100 scale-125" : "opacity-0 scale-100"
          } ${
            className.includes("bg-gradient") ? "bg-inherit" : "bg-white/30"
          }`}
        />
        <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-full p-2 shadow-lg">
          <Icon
            size={Math.max(14, size * scale * 0.35)}
            className={`transition-colors duration-300 ${
              isActive ? "text-white" : "text-white/80"
            }`}
          />
        </div>
      </div>
      <div
        className={`absolute text-center font-semibold whitespace-nowrap px-2 py-1 rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 ${
          isActive
            ? "bg-white/20 text-white scale-110"
            : "bg-black/20 text-white/80 scale-100"
        }`}
        style={{
          top: `${size * scale + 12}px`,
          fontSize: `${Math.max(10, 11 * scale)}px`,
        }}
      >
        {item.name}
      </div>
    </div>
  );
};

const CentralHub: React.FC<{ scale: number; isActive: boolean }> = ({
  scale,
  isActive,
}) => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="relative">
      {/* Outer animated rings */}
      <div
        className={`border-2 border-red-400/30 rounded-full transition-all duration-1000 ${
          isActive ? "animate-spin" : ""
        }`}
        style={{
          width: `${140 * scale}px`,
          height: `${140 * scale}px`,
          animationDuration: "25s",
        }}
      />
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-400/20 rounded-full transition-all duration-1000 ${
          isActive ? "animate-spin" : ""
        }`}
        style={{
          width: `${160 * scale}px`,
          height: `${160 * scale}px`,
          animationDuration: "30s",
          animationDirection: "reverse",
        }}
      />

      {/* Main hub */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-red-600 to-from-primary-600 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 ${
          isActive ? "scale-110 shadow-2xl" : "scale-100 shadow-lg"
        }`}
        style={{
          width: `${100 * scale}px`,
          height: `${100 * scale}px`,
        }}
      >
        <div className="bg-white rounded-full p-3 shadow-inner">
          <img src="/logo.svg" className="w-10 h-10" alt="Logo" />
        </div>
      </div>

      {/* Pulsing effects */}
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-red-400/30 rounded-full transition-all duration-1000 ${
          isActive ? "animate-ping" : ""
        }`}
        style={{
          width: `${120 * scale}px`,
          height: `${120 * scale}px`,
        }}
      />
    </div>
  </div>
);

const DataFlowLines: React.FC<{ isActive: boolean }> = ({ isActive }) => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    <defs>
      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(239, 68, 68, 0.8)" />
        <stop offset="50%" stopColor="rgba(147, 51, 234, 0.9)" />
        <stop offset="100%" stopColor="rgba(239, 68, 68, 0.6)" />
      </linearGradient>
      <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(239, 68, 68, 1)" />
        <stop offset="100%" stopColor="rgba(147, 51, 234, 1)" />
      </linearGradient>
      <pattern
        id="flowPattern"
        x="0"
        y="0"
        width="20"
        height="4"
        patternUnits="userSpaceOnUse"
      >
        <rect width="10" height="4" fill="url(#flowGradient)" opacity="0.8">
          <animateTransform
            attributeName="transform"
            type="translate"
            values="0 0; 20 0; 0 0"
            dur="2s"
            repeatCount="indefinite"
          />
        </rect>
      </pattern>
    </defs>

    {Array.from({ length: 8 }, (_, i) => (
      <circle
        key={i}
        cx="50%"
        cy="50%"
        r={120 + i * 20}
        fill="none"
        stroke="url(#flowPattern)"
        strokeWidth="1.5"
        opacity={isActive ? 0.4 : 0.2}
        strokeDasharray="4 8"
        className="transition-all duration-1000"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`0 50% 50%; ${360 * (i % 2 === 0 ? 1 : -1)} 50% 50%`}
          dur={`${15 + i * 3}s`}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);

const FeatureDescription: React.FC<{ item: EcosystemItem | null }> = ({
  item,
}) => {
  if (!item) return null;

  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/30 backdrop-blur-lg border border-white/20 rounded-2xl p-4 max-w-sm mx-4 transition-all duration-500 animate-fadeIn">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-white/10 rounded-lg">
          {React.createElement(ICONS[item.icon], {
            size: 20,
            className: "text-white",
          })}
        </div>
        <h3 className="text-white font-bold text-lg">{item.name}</h3>
      </div>
      <p className="text-white/80 text-sm leading-relaxed">
        {item.description ||
          `Discover how ${item.name} integrates seamlessly with your digital ecosystem to drive growth and efficiency.`}
      </p>
    </div>
  );
};

// -------------------- Main Section --------------------
export default function EcosystemSection() {
  const scale = useResponsiveScale();
  const [activeItem, setActiveItem] = useState<EcosystemItem | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const core: EcosystemItem[] = [
    {
      name: "Warehouse",
      icon: "Box",
      angle: -90,
      description:
        "Smart inventory management with real-time tracking and AI-powered optimization.",
    },
    {
      name: "Inventory",
      icon: "Briefcase",
      angle: -18,
      description: "Automated stock control and predictive inventory planning.",
    },
    {
      name: "Automation",
      icon: "Zap",
      angle: 54,
      description:
        "Streamline operations with intelligent workflow automation.",
    },
    {
      name: "QR Code",
      icon: "Target",
      angle: 126,
      description:
        "Digital product identification and seamless tracking solutions.",
    },
    {
      name: "Logistics",
      icon: "TrendingUp",
      angle: 198,
      description: "End-to-end logistics management with route optimization.",
    },
  ];

  const channels: EcosystemItem[] = [
    {
      name: "SFA",
      icon: "Users",
      angle: -90,
      description: "Sales Force Automation for enhanced field operations.",
    },
    {
      name: "DMS",
      icon: "Briefcase",
      angle: -18,
      description:
        "Distribution Management System for efficient channel operations.",
    },
    {
      name: "Retail",
      icon: "Store",
      angle: 54,
      description: "Unified retail management across all touchpoints.",
    },
    {
      name: "Loyalty",
      icon: "Star",
      angle: 126,
      description:
        "Customer loyalty programs that drive engagement and retention.",
    },
    {
      name: "Leads",
      icon: "Target",
      angle: 198,
      description: "Intelligent lead management and conversion optimization.",
    },
  ];

  const touchpoints: EcosystemItem[] = [
    {
      name: "Service",
      icon: "Headphones",
      angle: 0,
      description: "24/7 customer service with AI-powered support.",
    },
    {
      name: "After Sales",
      icon: "Handshake",
      angle: 51.43,
      description: "Comprehensive after-sales service and support.",
    },
    {
      name: "CRM",
      icon: "Users",
      angle: 102.86,
      description: "Customer Relationship Management for lasting partnerships.",
    },
    {
      name: "Vendors",
      icon: "Store",
      angle: 154.29,
      description: "Vendor management and collaboration platform.",
    },
    {
      name: "HRMS",
      icon: "Users",
      angle: 205.71,
      description: "Human Resource Management System for your team.",
    },
    {
      name: "Customer Engagement",
      icon: "MessageSquare",
      angle: 257.14,
      description: "Multi-channel customer engagement solutions.",
    },
    {
      name: "E-commerce",
      icon: "ShoppingCart",
      angle: 308.57,
      description: "Integrated e-commerce platform with AI recommendations.",
    },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) scale(1) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) scale(1.05) rotate(2deg);
          }
        }
        @keyframes gentlePulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.95;
          }
        }
        @keyframes subtleBounce {
          0%,
          100% {
            transform: scale(1) rotate(0deg);
          }
          50% {
            transform: scale(1.08) rotate(1deg);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .ecosystem-core {
          animation: gentlePulse 4s ease-in-out infinite;
        }
        .ecosystem-channel {
          animation: float 6s ease-in-out infinite;
        }
        .ecosystem-touchpoint {
          animation: subtleBounce 7s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      <section className="bg-gradient-to-br from-slate-900 to-red-900 relative overflow-hidden">
        <div className="absolute top-6 right-6 bg-black/30 backdrop-blur-lg border border-white/20 px-4 py-2 rounded-full flex items-center gap-3 shadow-lg">
          <img className="w-16" src="/imast360.png" alt="Imast 360 Logo" />
          <span className="text-white font-semibold text-sm">Ecosystem</span>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div>
                <h3 className="text-3xl font-semibold text-white">
                  AI-Enabled Digital Ecosystem
                </h3>
                <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-primary-600">
                  Do you have your own AI-enabled Integrated Digital Ecosystem?
                </h2>
                <p className="mt-2 text-sm text-red-50 max-w-xl">
                  With IMAST, you can seamlessly connect your warehouse, sales
                  channels, and customers. We empower you to build a unique
                  AI-enabled digital ecosystem that is fully integrated,
                  resilient, and scalable.
                </p>
              </div>
              <a
                href="/contact"
                className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>Discover How</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>

            {/* Right Content - Ecosystem Visualization */}
            <div className="flex justify-center lg:justify-end">
              <div
                ref={containerRef}
                className="relative rounded-3xl"
                style={{
                  width: `${Math.min(550 * scale, 550)}px`,
                  height: `${Math.min(550 * scale, 550)}px`,
                  minHeight: "350px",
                }}
              >
                <CentralHub scale={scale} isActive={!activeItem} />

                {/* Core Layer */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {core.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={120}
                      size={40}
                      className="bg-gradient-to-br from-red-600 from-primary-600 rounded-2xl shadow-xl ecosystem-core"
                      index={index}
                      scale={scale}
                      isActive={activeItem?.name === item.name}
                      onHover={setActiveItem}
                    />
                  ))}
                </div>

                {/* Channels Layer */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {channels.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={190}
                      size={45}
                      className="bg-gradient-to-br from-red-500 to-from-primary-600 rounded-xl shadow-lg ecosystem-channel"
                      index={index}
                      scale={scale}
                      isActive={activeItem?.name === item.name}
                      onHover={setActiveItem}
                    />
                  ))}
                </div>

                {/* Touchpoints Layer */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {touchpoints.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={240}
                      size={50}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl ecosystem-touchpoint"
                      index={index}
                      scale={scale}
                      isActive={activeItem?.name === item.name}
                      onHover={setActiveItem}
                    />
                  ))}
                </div>

                <DataFlowLines isActive={!activeItem} />

                <FeatureDescription item={activeItem} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

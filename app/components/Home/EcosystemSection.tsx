"use client";

import React from "react";
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
} from "lucide-react";

// Icon mapping with proper typing
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

type IconKey = keyof typeof ICONS;

interface EcosystemItem {
  name: string;
  icon: IconKey;
  angle: number;
}

// Custom hook for responsive scaling
const useResponsiveScale = () => {
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 640) {
        setScale(0.7); // Mobile
      } else if (window.innerWidth < 1024) {
        setScale(0.85); // Tablet
      } else {
        setScale(1); // Desktop
      }
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return scale;
};

// Circle component for reusable ecosystem items
const EcosystemCircle: React.FC<{
  item: EcosystemItem;
  radius: number;
  size: number;
  className: string;
  index: number;
  scale: number;
}> = ({ item, radius, size, className, index, scale }) => {
  const radians = (item.angle * Math.PI) / 180;
  const x = Math.cos(radians) * radius * scale;
  const y = Math.sin(radians) * radius * scale;
  const Icon = ICONS[item.icon];

  return (
    <div
      className={`absolute flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${className}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        width: `${size * scale}px`,
        height: `${size * scale}px`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      <Icon size={Math.max(12, size * scale * 0.4)} className="flex-shrink-0" />
      <div
        className="absolute text-center font-medium whitespace-nowrap px-1 py-0.5 rounded"
        style={{
          top: `${size * scale + 8}px`,
          fontSize: `${Math.max(10, 12 * scale)}px`,
        }}
      >
        {item.name}
      </div>
    </div>
  );
};

// Animated background component
const AnimatedBackground: React.FC = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]" />
  </>
);

// Central hub component
const CentralHub: React.FC<{ scale: number }> = ({ scale }) => (
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="relative">
      {/* Rotating outer ring */}
      <div
        className="border-2 border-red-400/30 rounded-full animate-spin"
        style={{
          width: `${128 * scale}px`,
          height: `${128 * scale}px`,
          animationDuration: "20s",
        }}
      />

      {/* Core hub */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center shadow-lg"
        style={{
          width: `${96 * scale}px`,
          height: `${96 * scale}px`,
        }}
      >
        <div className="text-center">
          <img src="/logo.svg" className="w-16" />
        </div>
      </div>

      {/* Pulsing rings */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-red-400/50 rounded-full animate-ping"
        style={{
          width: `${112 * scale}px`,
          height: `${112 * scale}px`,
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-purple-400/30 rounded-full animate-ping"
        style={{
          width: `${128 * scale}px`,
          height: `${128 * scale}px`,
          animationDelay: "1s",
        }}
      />
    </div>
  </div>
);

// Data flow animation component
const DataFlowLines: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none">
    <defs>
      <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="rgba(239, 68, 68, 0.6)" />
        <stop offset="50%" stopColor="rgba(147, 51, 234, 0.8)" />
        <stop offset="100%" stopColor="rgba(239, 68, 68, 0.4)" />
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
            dur="3s"
            repeatCount="indefinite"
          />
        </rect>
      </pattern>
    </defs>

    {Array.from({ length: 6 }, (_, i) => (
      <circle
        key={i}
        cx="50%"
        cy="50%"
        r={60 + i * 25}
        fill="none"
        stroke="url(#flowPattern)"
        strokeWidth="2"
        opacity="0.3"
        strokeDasharray="5 10"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          values={`0 50% 50%; ${360 * (i % 2 === 0 ? 1 : -1)} 50% 50%`}
          dur={`${20 + i * 5}s`}
          repeatCount="indefinite"
        />
      </circle>
    ))}
  </svg>
);

export default function EcosystemSection() {
  const scale = useResponsiveScale();

  // Data arrays
  const core: EcosystemItem[] = [
    { name: "Sales", icon: "Briefcase", angle: 0 },
    { name: "Marketing", icon: "TrendingUp", angle: 60 },
    { name: "CRM", icon: "Users", angle: 120 },
    { name: "Analytics", icon: "BarChart2", angle: 180 },
    { name: "Support", icon: "Headphones", angle: 240 },
    { name: "Integration", icon: "Link", angle: 300 },
  ];

  const channels: EcosystemItem[] = [
    { name: "E-commerce", icon: "ShoppingCart", angle: 30 },
    { name: "Social Media", icon: "MessageSquare", angle: 90 },
    { name: "Email", icon: "Mail", angle: 150 },
    { name: "Web", icon: "Globe", angle: 210 },
    { name: "Mobile", icon: "Smartphone", angle: 270 },
    { name: "API", icon: "Zap", angle: 330 },
  ];

  const touchpoints: EcosystemItem[] = [
    { name: "Customers", icon: "User", angle: 0 },
    { name: "Partners", icon: "Handshake", angle: 45 },
    { name: "Vendors", icon: "Store", angle: 90 },
    { name: "Suppliers", icon: "Box", angle: 135 },
    { name: "Investors", icon: "DollarSign", angle: 180 },
    { name: "Team", icon: "Users", angle: 225 },
    { name: "Advisors", icon: "Target", angle: 270 },
    { name: "Community", icon: "Star", angle: 315 },
  ];

  return (
    <>
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-10px);
          }
        }

        @keyframes ecosystemBounce {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-50%, -50%) scale(1.05);
          }
        }

        .ecosystem-core {
          animation: ecosystemBounce 3s ease-in-out infinite;
        }

        .ecosystem-channel {
          animation: float 4s ease-in-out infinite;
        }

        .ecosystem-touchpoint {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Is Your Digital Ecosystem
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-red-600 to-purple-600 bg-clip-text text-transparent">
                Your Best Salesman?
              </span>
            </h2>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-700 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              With IMAST, you can connect all the dots between your sales
              channels and customers. We empower you to build your own unique
              digital ecosystem that is integrated, resilient, and scalable.
            </p>
            <button className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white font-medium rounded-lg hover:from-red-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
              Discover How
            </button>
          </div>

          {/* Ecosystem Visualization */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-xl">
              <div
                className="relative bg-gradient-to-br from-slate-900 to-red-900 rounded-2xl overflow-hidden shadow-2xl mx-auto"
                style={{
                  width: `${Math.min(500 * scale, 500)}px`,
                  height: `${Math.min(500 * scale, 500)}px`,
                  minHeight: "300px",
                }}
              >
                <AnimatedBackground />

                <CentralHub scale={scale} />

                {/* Inner Circle - Core Functions */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {core.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={90}
                      size={48}
                      className="bg-gradient-to-bl from-red to-purple-950 backdrop-blur-sm rounded-full shadow-lg ecosystem-core text-white/80"
                      index={index}
                      scale={scale}
                    />
                  ))}
                </div>

                {/* Middle Circle - Channels */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {channels.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={130}
                      size={40}
                      className="bg-gradient-to-bl from-red-600 to-purple-600 rounded-full shadow-lg ecosystem-channel text-white text-white/70"
                      index={index}
                      scale={scale}
                    />
                  ))}
                </div>

                {/* Outer Circle - Touchpoints */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {touchpoints.map((item, index) => (
                    <EcosystemCircle
                      key={item.name}
                      item={item}
                      radius={170}
                      size={32}
                      className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full ecosystem-touchpoint text-white/60"
                      index={index}
                      scale={scale}
                    />
                  ))}
                </div>

                <DataFlowLines />

                {/* Labels and Accents */}
                <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
                  <span className="text-white/80 text-xs sm:text-sm font-medium">
                    360° Ecosystem
                  </span>
                </div>

                {/* <div className="absolute top-0 left-0 w-12 sm:w-16 h-12 sm:h-16 border-l-2 border-t-2 border-red-400/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-12 sm:w-16 h-12 sm:h-16 border-r-2 border-b-2 border-purple-400/30 rounded-br-2xl" /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

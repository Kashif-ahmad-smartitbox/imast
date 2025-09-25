"use client";

import React from "react";
import {
  Briefcase,
  TrendingUp,
  Users,
  BarChart2,
  Headphones,
  Link as LinkIcon,
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

// map of icon components so we avoid dynamic string indexing errors in TypeScript
const ICONS = {
  Briefcase,
  TrendingUp,
  Users,
  BarChart2,
  Headphones,
  LinkIcon,
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

export default function EcosystemSection() {
  const core: Array<{ name: string; icon: IconKey; angle: number }> = [
    { name: "Sales", icon: "Briefcase", angle: 0 },
    { name: "Marketing", icon: "TrendingUp", angle: 60 },
    { name: "CRM", icon: "Users", angle: 120 },
    { name: "Analytics", icon: "BarChart2", angle: 180 },
    { name: "Support", icon: "Headphones", angle: 240 },
    { name: "Integration", icon: "LinkIcon", angle: 300 },
  ];

  const channels: Array<{ name: string; icon: IconKey; angle: number }> = [
    { name: "E-commerce", icon: "ShoppingCart", angle: 30 },
    { name: "Social Media", icon: "MessageSquare", angle: 90 },
    { name: "Email", icon: "Mail", angle: 150 },
    { name: "Web", icon: "Globe", angle: 210 },
    { name: "Mobile", icon: "Smartphone", angle: 270 },
    { name: "API", icon: "Zap", angle: 330 },
  ];

  const touchpoints: Array<{ name: string; icon: IconKey; angle: number }> = [
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
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Content */}
        <div className="px-4 lg:px-0">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Is Your Digital Ecosystem
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-purple-600">
              Your Best Salesman?
            </span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 max-w-lg leading-relaxed">
            With IMAST, you can connect all the dots between your sales channels
            and customers. We empower you to build your own unique digital
            ecosystem that is integrated, resilient, and scalable.
          </p>
          <button className="mt-8 px-8 py-3 bg-gradient-to-r from-red-500 to-purple-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
            Discover How
          </button>
        </div>

        {/* Right Visual - 360° Digital Ecosystem */}
        <div className="relative px-4 lg:px-0">
          <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-slate-900 to-red-900 rounded-2xl overflow-hidden shadow-2xl">
            {/* Animated background */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-purple-500/10"></div>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1),transparent_70%)]"></div>
            </div>

            {/* Central IMAST Logo */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                {/* Rotating outer ring */}
                <div
                  className="w-32 h-32 border-2 border-red-400/30 rounded-full animate-spin"
                  style={{ animationDuration: "20s" }}
                ></div>

                {/* Core hub with IMAST logo */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <img src="/logo.svg" className="w-14 h-14" />
                  </div>
                </div>

                {/* Pulsing rings */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 border border-red-400/50 rounded-full animate-ping"></div>
                <div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-400/30 rounded-full animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>
            </div>

            {/* 360° Ecosystem Layers */}

            {/* Inner Circle - Core Functions */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48">
              {core.map((item, index) => {
                const radians = (item.angle * Math.PI) / 180;
                const x = Math.cos(radians) * 90;
                const y = Math.sin(radians) * 90;
                const Icon = ICONS[item.icon];
                return (
                  <div
                    key={item.name}
                    className="absolute w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex flex-col items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2 animate-bounce"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animationDelay: `${index * 0.5}s`,
                      animationDuration: "3s",
                    }}
                  >
                    {Icon ? (
                      <Icon size={16} />
                    ) : (
                      <span className="text-xs">?</span>
                    )}
                    <div className="absolute -bottom-6 text-xs text-white/80 font-medium whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Middle Circle - Channels */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72">
              {channels.map((item, index) => {
                const radians = (item.angle * Math.PI) / 180;
                const x = Math.cos(radians) * 130;
                const y = Math.sin(radians) * 130;
                const Icon = ICONS[item.icon];
                return (
                  <div
                    key={item.name}
                    className="absolute w-10 h-10 bg-gradient-to-r from-red-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animation: `float 4s ease-in-out infinite`,
                      animationDelay: `${index * 0.7}s`,
                    }}
                  >
                    {Icon ? (
                      <Icon size={14} className="text-white" />
                    ) : (
                      <span className="text-xs">?</span>
                    )}
                    <div className="absolute -bottom-8 text-xs text-white/70 font-medium whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Outer Circle - Touchpoints */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96">
              {touchpoints.map((item, index) => {
                const radians = (item.angle * Math.PI) / 180;
                const x = Math.cos(radians) * 170;
                const y = Math.sin(radians) * 170;
                const Icon = ICONS[item.icon];
                return (
                  <div
                    key={item.name}
                    className="absolute w-8 h-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      animation: `pulse 3s ease-in-out infinite`,
                      animationDelay: `${index * 0.4}s`,
                    }}
                  >
                    {Icon ? (
                      <Icon size={12} />
                    ) : (
                      <span className="text-xs">?</span>
                    )}
                    <div className="absolute -bottom-6 text-xs text-white/60 font-medium whitespace-nowrap">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connecting Data Flow Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <defs>
                <linearGradient
                  id="flowGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
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
                  <rect
                    width="10"
                    height="4"
                    fill="url(#flowGradient)"
                    opacity="0.8"
                  >
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

              {/* Animated data flow circles */}
              {[0, 1, 2, 3, 4, 5].map((i) => (
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
                    values={`0 50% 50%; ${
                      360 * (i % 2 === 0 ? 1 : -1)
                    } 50% 50%`}
                    dur={`${20 + i * 5}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}
            </svg>

            {/* 360° Label */}
            <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm border border-white/20 px-3 py-1 rounded-full">
              <span className="text-white/80 text-sm font-medium">
                360° Ecosystem
              </span>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-red-400/30 rounded-tl-2xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-purple-400/30 rounded-br-2xl"></div>
          </div>

          {/* CSS animations */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translate(-50%, -50%) translateY(0px);
              }
              50% {
                transform: translate(-50%, -50%) translateY(-10px);
              }
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}

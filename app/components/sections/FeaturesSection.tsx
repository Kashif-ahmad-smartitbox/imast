"use client";
import React from "react";
import {
  Zap,
  Shield,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart3,
  Smartphone,
  Cloud,
  Lock,
  HeartHandshake,
  Globe,
} from "lucide-react";

type Feature = {
  id?: string | number;
  title: string;
  text: string;
  icon?: string;
};

type FeaturesData = {
  title?: string;
  maintitle?: string;
  subtitle?: string;
  description?: string;
  features: Feature[];
};

type Props = {
  data: FeaturesData;
};

// Icon mapping for Lucide icons
const iconMap: Record<string, React.ElementType> = {
  zap: Zap,
  shield: Shield,
  users: Users,
  trendingUp: TrendingUp,
  clock: Clock,
  checkCircle: CheckCircle,
  barChart: BarChart3,
  smartphone: Smartphone,
  cloud: Cloud,
  lock: Lock,
  heart: HeartHandshake,
  globe: Globe,
};

export default function FeaturesSection({ data }: Props) {
  const {
    title = "Fast, Simple, Smart",
    maintitle = "Why Choose Us",
    subtitle = "Your Cloud-Based POS Solution for Retail, Supermarket, and Multi-Store/Franchise",
    description = "IMAST Retail Point is the ultimate solution, making life easier for both retailers and brands in managing retail operations. Streamline your retail processes, from sales and inventory to purchases, customers, and finances, with our intuitive POS billing software.",
    features = [],
  } = data || {};

  // Default icons if none provided
  const defaultIcons = [Zap, Shield, Users, TrendingUp, Clock, CheckCircle];

  return (
    <section className="py-20 lg:py-28 bg-linear-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <header className="text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide text-primary-700">
              {maintitle}
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {title}
          </h2>

          <h3 className="mt-6 text-lg lg:text-xl font-semibold text-gray-800 max-w-4xl mx-auto leading-relaxed">
            {subtitle}
          </h3>

          <p className="mt-6 mx-auto text-sm text-gray-600 max-w-3xl leading-relaxed">
            {description}
          </p>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
              ? iconMap[feature.icon]
              : defaultIcons[index % defaultIcons.length];

            return (
              <article
                key={feature.id ?? index}
                className="group relative bg-white rounded-3xl p-8 border-2 border-gray-100 hover:border-primary-200 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute -top-2 -left-2 w-16 h-16 bg-primary-100 rounded-2xl transform rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="relative w-14 h-14 rounded-2xl bg-linear-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        className="text-white"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-gray-900 mb-4 group-hover:text-primary-800 transition-colors duration-300">
                  {feature.title}
                </h4>

                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.text}
                </p>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-8 right-8 h-1 bg-linear-to-r from-primary-500 to-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </article>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob {
            animation: none;
          }
          .group:hover .group-hover\\:scale-110 {
            transform: scale(1);
          }
          .group:hover .group-hover\\:-translate-y-2 {
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}

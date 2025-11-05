import React from "react";
import {
  Award,
  ShieldCheck,
  Users,
  Zap,
  Target,
  Server,
  ArrowRight,
  Clock,
  CheckCircle,
  TrendingUp,
} from "lucide-react";

// map icon names to lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  ShieldCheck,
  Users,
  Zap,
  Target,
  Server,
  Clock,
  CheckCircle,
  TrendingUp,
};

export type WhyItem = {
  id: string;
  title: string;
  description: string;
  icon?: string;
};

export type WhySectionData = {
  heading?: string;
  highlight?: string;
  subtitle?: string;
  intro?: string;
  items: WhyItem[];
  stats?: {
    years?: string;
    projects?: string;
    clients?: string;
  };
};

export type ImastWhyChooseSectionProps = {
  data: WhySectionData;
  className?: string;
};

const Card: React.FC<{ item: WhyItem; index: number }> = ({ item, index }) => {
  const IconComponent =
    (item.icon && ICON_MAP[item.icon]) ||
    Object.values(ICON_MAP)[index % Object.keys(ICON_MAP).length];

  return (
    <article
      aria-labelledby={`why-${item.id}-title`}
      className="group relative rounded-3xl bg-gradient-to-br from-white to-primary-50 p-8 border-2 border-primary-100 hover:border-primary-300 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
    >
      {/* Background decorative element */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 opacity-0 group-hover:opacity-5 transition-opacity duration-500" />

      {/* Icon with enhanced styling */}
      <div className="relative mb-6">
        <div className="absolute -top-2 -left-2 w-16 h-16 bg-primary-100 rounded-2xl transform rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-500" />
        <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
          {IconComponent && (
            <IconComponent
              size={24}
              className="text-white"
              aria-hidden="true"
            />
          )}
        </div>
      </div>

      <h3
        id={`why-${item.id}-title`}
        className="text-xl font-bold text-primary-900 mb-4 group-hover:text-primary-800 transition-colors duration-300"
      >
        {item.title}
      </h3>

      <p className="text-primary-700 leading-relaxed text-base">
        {item.description}
      </p>

      {/* Hover accent line */}
      <div className="absolute bottom-0 left-8 right-8 h-1 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </article>
  );
};

const StatCard: React.FC<{ value: string; label: string; index: number }> = ({
  value,
  label,
  index,
}) => (
  <div
    className="text-center p-6 rounded-2xl bg-white/80 border border-primary-100 hover:shadow-lg hover:border-primary-200 transition-all duration-300"
    style={{ animationDelay: `${index * 200}ms` }}
  >
    <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
      {value}
    </div>
    <div className="text-sm text-primary-700 font-medium">{label}</div>
  </div>
);

export default function ImastWhyChooseSection({
  data,
  className = "",
}: ImastWhyChooseSectionProps) {
  const {
    heading = "Why choose",
    highlight = "IMAST?",
    subtitle = "IMAST: Two Decades of Excellence, Trust, and Seamless Implementation",
    intro = "Founded by seasoned industry leaders, impeccable solutions, unrivalled client trust, and a team committed to success.",
    items = [],
  } = data || {};

  return (
    <section className={`relative overflow-hidden py-20 lg:py-28 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-primary-100">
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px),
                             linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <img
        src="https://res.cloudinary.com/diefvxqdv/image/upload/v1762095775/imast/media/employee-sec8-img.svg"
        alt=""
        className="absolute top-40 left-28 opacity-40 hidden lg:block"
        loading="lazy"
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-20 items-start">
          {/* Left Content */}
          <div className="col-span-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 mb-8">
              <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-sm font-semibold uppercase tracking-wide text-primary-700">
                Why Choose Us
              </span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-primary-900 leading-tight">
              {heading}{" "}
              <span className="bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h2>

            <h4 className="mt-6 text-xl lg:text-2xl font-semibold text-primary-800 leading-relaxed">
              {subtitle}
            </h4>

            <p className="mt-5 text-lg text-primary-700 leading-relaxed">
              {intro}
            </p>

            {/* CTA Button */}
            <button className="mt-8 inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary-300">
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Content - Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {items.map((item, index) => (
                <Card key={item.id} item={item} index={index} />
              ))}
            </div>
          </div>
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
      `}</style>
    </section>
  );
}

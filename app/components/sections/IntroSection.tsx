"use client";
import React from "react";
import Image from "next/image";
import { ArrowRight, Star, Award, Gift, Zap } from "lucide-react";

type Props = {
  data: {
    title: string;
    description: string;
    image: string;
    gradient?: string;
    variant?: "default" | "elegant" | "minimal" | "split";
    badge?: {
      text: string;
      color?: string;
    };
    cta?: {
      text: string;
      href: string;
    };
    features?: string[];
    accentColor?: string;
    imagePosition?: "left" | "right";
    showPattern?: boolean;
  };
};

export default function IntroSection({ data }: Props) {
  const {
    title = "Empower Your Loyalty Program with IMAST Rewards",
    description = "At IMAST, we specialize in delivering unparalleled rewards and redemption fulfillment solutions for all types of loyalty programs. Whether you cater to customers, employees, or channel partners, IMAST ensures a smooth and efficient process for both physical and electronic rewards. Our dedicated reward portal streamlines the entire rewards experience, making it effortlessly easy for our clients.",
    image = "https://images.unsplash.com/photo-1601597111029-0095ec03d85d?auto=format&fit=crop&w=1600&q=80",
    gradient = "linear-gradient(135deg, #f6044d 0%, #f5a623 100%)",
    variant = "default",
    badge,
    cta,
    features = [],
    accentColor = "#9b28a0",
    imagePosition = "right",
    showPattern = true,
  } = data;

  // Configuration based on variant
  const variantConfig = {
    default: {
      container: "overflow-hidden",
      text: "text-white",
      pattern: true,
    },
    elegant: {
      container: "overflow-hidden backdrop-blur-sm",
      text: "text-white",
      pattern: true,
    },
    minimal: {
      container: "",
      text: "text-white",
      pattern: false,
    },
    split: {
      container: "overflow-hidden",
      text: "text-gray-900",
      pattern: true,
    },
  };

  const currentVariant = variantConfig[variant];

  const FeatureItem = ({
    feature,
    index,
  }: {
    feature: string;
    index: number;
  }) => (
    <div
      className="flex items-center gap-3 group"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <div className="w-2 h-2 rounded-full bg-white" />
      </div>
      <span className="text-white/90 text-sm font-medium group-hover:text-white transition-colors">
        {feature}
      </span>
    </div>
  );

  const TextContent = () => (
    <div className="relative h-full flex items-center justify-center px-8 sm:px-12 lg:px-20 py-16 lg:py-24">
      {/* Background pattern */}
      {showPattern && currentVariant.pattern && (
        <div className="absolute inset-0 opacity-10">
          <div
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      )}

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-white/5 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      <div className="max-w-2xl relative z-10">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6 transition-all duration-300 hover:scale-105">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span className="text-sm font-semibold uppercase tracking-wide text-white">
              {badge.text}
            </span>
          </div>
        )}

        {/* Title */}
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 ${currentVariant.text}`}
        >
          {title}
        </h2>

        {/* Description */}
        <p
          className={`text-lg md:text-xl leading-relaxed mb-8 opacity-95 ${currentVariant.text}`}
        >
          {description}
        </p>

        {/* Features list */}
        {features.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} feature={feature} index={index} />
            ))}
          </div>
        )}

        {/* CTA Button */}
        {cta && (
          <a
            href={cta.href}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-primary-600 font-bold text-lg shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 group/cta"
          >
            {cta.text}
            <ArrowRight className="w-5 h-5 transform group-hover/cta:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </div>
  );

  const ImageContent = () => (
    <div className="relative h-80 lg:h-auto group">
      <Image
        src={image}
        alt="IMAST Rewards"
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        priority
      />

      {/* Image overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Decorative elements */}
      <div className="absolute top-6 right-6 w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200" />
      <div className="absolute bottom-6 left-6 w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 -rotate-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300" />
    </div>
  );

  return (
    <section className="relative overflow-hidden">
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 min-h-[520px] lg:min-h-[600px] ${currentVariant.container}`}
      >
        {/* Content order based on imagePosition */}
        {imagePosition === "left" ? (
          <>
            <ImageContent />
            <div style={{ background: gradient }}>
              <TextContent />
            </div>
          </>
        ) : (
          <>
            <div style={{ background: gradient }}>
              <TextContent />
            </div>
            <ImageContent />
          </>
        )}
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
      `}</style>
    </section>
  );
}

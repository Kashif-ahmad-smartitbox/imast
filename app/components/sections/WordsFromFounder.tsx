"use client";

import React from "react";

export interface FounderData {
  heading?: string;
  quote: string;
  name: string;
  title?: string;
  imageSrc: string;
  imageAlt?: string;
  accentColor?: string;
  bgShapeColor?: string;
  layout?: "image-left" | "image-right" | "centered";
  showDecoration?: boolean;
  variant?: "default" | "minimal" | "elegant";
  badgeText?: string;
}

interface WordsFromFounderProps {
  data: FounderData;
}

// Default configuration
const defaultData: Partial<FounderData> = {
  heading: "Words From Our Founder",
  title: "Founder IMAST",
  imageAlt: "Founder photo",
  accentColor: "#e06b3b",
  bgShapeColor: "#FDEBE6",
  layout: "image-left",
  showDecoration: true,
  variant: "default",
  badgeText: "Founder's Message",
};

// Layout configuration
const layoutConfig = {
  "image-left": {
    imageOrder: "order-1",
    textOrder: "order-2",
    textAlign: "lg:pl-12 xl:pl-16",
    gridClass: "grid-cols-1 lg:grid-cols-2",
  },
  "image-right": {
    imageOrder: "order-2",
    textOrder: "order-1",
    textAlign: "lg:pr-12 xl:pr-16",
    gridClass: "grid-cols-1 lg:grid-cols-2",
  },
  centered: {
    imageOrder: "order-1",
    textOrder: "order-2",
    textAlign: "text-center",
    gridClass: "grid-cols-1",
  },
} as const;

// Variant configurations
const variantConfig = {
  default: {
    container: "bg-white",
    quoteCard: "bg-white/95 rounded-2xl shadow-lg border border-gray-100",
    quoteText: "text-gray-700 text-lg leading-relaxed",
    nameText: "text-gray-900 font-semibold",
    titleText: "text-orange-600",
    imageStyle: "rounded-xl",
    imageBorder: "",
    hasAccentBar: true,
    hasOverlay: false,
  },
  minimal: {
    container: "bg-gray-50",
    quoteCard: "bg-transparent border-l-4 pl-6",
    quoteText: "text-gray-600 text-xl leading-relaxed italic",
    nameText: "text-gray-800 font-medium",
    titleText: "text-gray-500",
    imageStyle: "rounded-lg",
    imageBorder: "",
    hasAccentBar: false,
    hasOverlay: false,
  },
  elegant: {
    container: "bg-gradient-to-br from-gray-50 to-white",
    quoteCard:
      "bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50",
    quoteText: "text-gray-800 text-lg leading-relaxed font-light",
    nameText: "text-gray-900 font-semibold",
    titleText: "text-orange-500",
    imageStyle: "rounded-2xl",
    imageBorder: "border-8 border-white",
    hasAccentBar: true,
    hasOverlay: true,
  },
} as const;

// Helper function for safe data access
const getSafeData = <T,>(value: T | undefined, defaultValue: T): T => {
  return value ?? defaultValue;
};

export default function WordsFromFounder({ data }: WordsFromFounderProps) {
  // Safely merge provided data with defaults
  const content = {
    heading: getSafeData(data.heading, defaultData.heading!),
    quote: data.quote,
    name: data.name,
    title: getSafeData(data.title, defaultData.title!),
    imageSrc: data.imageSrc,
    imageAlt: getSafeData(data.imageAlt, defaultData.imageAlt!),
    accentColor: getSafeData(data.accentColor, defaultData.accentColor!),
    bgShapeColor: getSafeData(data.bgShapeColor, defaultData.bgShapeColor!),
    layout: getSafeData(data.layout, defaultData.layout!),
    showDecoration: getSafeData(
      data.showDecoration,
      defaultData.showDecoration!
    ),
    variant: getSafeData(data.variant, defaultData.variant!),
    badgeText: getSafeData(data.badgeText, defaultData.badgeText!),
  };

  const { imageOrder, textOrder, textAlign, gridClass } =
    layoutConfig[content.layout];
  const variantStyles = variantConfig[content.variant];

  // Reusable components for better code organization
  const BackgroundDecoration = () => {
    if (content.variant !== "elegant") return null;

    return (
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-5"
          style={{ background: content.accentColor }}
        />
        <div
          className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full opacity-5"
          style={{ background: content.accentColor }}
        />
      </div>
    );
  };

  const ImageComponent = () => (
    <div className="flex justify-center">
      <div
        className={`relative w-full max-w-md ${
          content.layout === "centered" ? "max-w-sm" : ""
        }`}
      >
        {/* Background Shape */}
        {content.showDecoration && content.variant !== "minimal" && (
          <div
            className={`absolute -left-6 -top-6 w-full h-full rounded-3xl transform ${
              content.variant === "elegant"
                ? "rotate-[-6deg] scale-105"
                : "rotate-[-8deg]"
            } transition-all duration-500 hover:rotate-[-4deg]`}
            style={{ background: content.bgShapeColor, zIndex: 0 }}
            aria-hidden
          />
        )}

        {/* Main Image Container */}
        <div
          className={`relative z-10 overflow-hidden ${variantStyles.imageStyle} ${variantStyles.imageBorder} transition-all duration-500 hover:scale-105`}
        >
          <img
            src={content.imageSrc}
            alt={content.imageAlt}
            className="w-full h-auto object-cover"
            loading="lazy"
          />

          {/* Overlay for elegant variant */}
          {variantStyles.hasOverlay && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>

        {/* Decorative Elements */}
        {content.showDecoration && content.variant === "elegant" && (
          <>
            <div
              className="absolute -right-4 -bottom-4 w-20 h-20 rounded-2xl opacity-60 transform rotate-12"
              style={{ background: content.accentColor }}
              aria-hidden
            />
            <div
              className="absolute -right-2 -bottom-2 w-10 h-10 rounded-xl opacity-40 transform -rotate-6"
              style={{ background: content.accentColor }}
              aria-hidden
            />
          </>
        )}
      </div>
    </div>
  );

  const HeadingComponent = () => {
    const words = content.heading.split(" ");
    const lastWord = words.pop();
    const firstPart = words.join(" ");

    return (
      <div className="mb-8">
        {content.variant === "minimal" && (
          <div className="inline-flex items-center gap-3 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: content.accentColor }}
              aria-hidden
            />
            <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              {content.badgeText}
            </span>
          </div>
        )}

        <h2
          className={`font-bold text-gray-900 ${
            content.variant === "minimal"
              ? "text-2xl lg:text-3xl"
              : content.variant === "elegant"
              ? "text-3xl lg:text-4xl"
              : "text-3xl lg:text-4xl"
          }`}
        >
          {firstPart}{" "}
          <span style={{ color: content.accentColor }}>{lastWord}</span>
        </h2>
      </div>
    );
  };

  const QuoteCard = () => (
    <div
      className={`${variantStyles.quoteCard} p-6 lg:p-8 relative transition-all duration-500 hover:shadow-xl`}
    >
      {/* Accent Bar */}
      {variantStyles.hasAccentBar && (
        <div
          className={`absolute left-0 top-6 bottom-6 w-1 rounded-r ${
            content.variant === "elegant" ? "rounded-full" : ""
          }`}
          style={{ background: content.accentColor }}
          aria-hidden
        />
      )}

      <div className={variantStyles.hasAccentBar ? "pl-6" : ""}>
        {/* Quote */}
        <blockquote className={`${variantStyles.quoteText} mb-6`}>
          "{content.quote}"
        </blockquote>

        {/* Author */}
        <AuthorSection />
      </div>

      {/* Decorative corner for elegant variant */}
      {content.variant === "elegant" && (
        <div
          className="absolute top-0 right-0 w-6 h-6 rounded-bl-full opacity-20"
          style={{ background: content.accentColor }}
          aria-hidden
        />
      )}
    </div>
  );

  const AuthorSection = () => (
    <div
      className={`flex items-center gap-4 ${
        content.variant === "minimal" ? "border-t border-gray-200 pt-4" : ""
      }`}
    >
      {content.variant === "elegant" && (
        <div
          className="w-1 h-8 rounded-full"
          style={{ background: content.accentColor }}
          aria-hidden
        />
      )}
      <div>
        <div className={variantStyles.nameText}>
          {content.name}
          {content.title && (
            <span className={`ml-2 ${variantStyles.titleText}`}>
              {content.title}
            </span>
          )}
        </div>
        {content.variant === "elegant" && (
          <div
            className="w-16 h-0.5 rounded-full mt-2 opacity-60"
            style={{ background: content.accentColor }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );

  const TextContent = () => (
    <div className={textAlign}>
      <HeadingComponent />
      <QuoteCard />
    </div>
  );

  const CenteredLayout = () => (
    <div className="text-center max-w-4xl mx-auto">
      <div className="mb-12">
        <ImageComponent />
      </div>
      <TextContent />
    </div>
  );

  const SideBySideLayout = () => (
    <div className={`grid ${gridClass} gap-12 lg:gap-16 items-center`}>
      <div className={imageOrder}>
        <ImageComponent />
      </div>
      <div className={textOrder}>
        <TextContent />
      </div>
    </div>
  );

  return (
    <section
      className={`py-16 lg:py-24 ${variantStyles.container} ${
        content.variant === "elegant" ? "overflow-hidden" : ""
      } relative`}
    >
      <BackgroundDecoration />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {content.layout === "centered" ? (
          <CenteredLayout />
        ) : (
          <SideBySideLayout />
        )}
      </div>
    </section>
  );
}

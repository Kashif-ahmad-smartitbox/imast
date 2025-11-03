import React from "react";

type CTA = { label: string; href: string };

export default function HeroHeader({ data }: { data: any }) {
  if (!data) return null;

  const {
    badgeText,
    title,
    highlight,
    subtitle,
    ctaPrimary,
    ctaSecondary,
    height,
    variant = "center",
    breadcrumb,
    backgroundImage,
    backgroundOverlayOpacity = 0.35,
  } = data;

  const containerClasses =
    variant === "compact"
      ? "py-12"
      : variant === "left"
      ? "py-20 sm:py-28"
      : "py-24 sm:py-32";

  return (
    <section
      role="region"
      aria-label={title || "Page hero"}
      className={`relative flex items-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 ${containerClasses}`}
      style={{
        minHeight: height || (variant === "compact" ? "36vh" : "70vh"),
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: backgroundImage ? "cover" : undefined,
        backgroundPosition: backgroundImage ? "center" : undefined,
      }}
    >
      {/* Sophisticated geometric background */}
      <div aria-hidden="true" className="absolute inset-0">
        {/* Large geometric shapes */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-primary-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-tr from-primary-400/5 to-primary-500/10 rounded-full blur-3xl" />

        {/* Angular shapes for modern feel */}
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-br from-gray-700/20 to-gray-600/10 transform rotate-45 blur-2xl" />
        <div className="absolute bottom-1/3 left-1/3 w-48 h-48 bg-gradient-to-tr from-gray-600/15 to-gray-500/10 transform -rotate-12 blur-2xl" />
      </div>

      {/* Grid pattern overlay */}
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

      {/* Subtle particle effect */}
      <div aria-hidden="true" className="absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px, 70px 70px",
          }}
        />
      </div>

      {backgroundImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gray-900"
          style={{
            opacity: backgroundOverlayOpacity,
            mixBlendMode: "multiply",
          }}
        />
      )}

      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-6 ${
          variant === "left" ? "text-left" : "text-center"
        }`}
      >
        {/* Breadcrumb */}
        {Array.isArray(breadcrumb) && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`mb-4 text-xs sm:text-sm ${
              variant === "left" ? "sm:mb-6" : "mx-auto max-w-3xl"
            }`}
          >
            <ol className="inline-flex items-center space-x-2">
              {breadcrumb.map((b: any, i: number) => (
                <li key={i} className="inline-flex items-center">
                  {b.href ? (
                    <a
                      href={b.href}
                      className="text-gray-300 hover:text-white hover:underline transition-colors"
                      aria-current={
                        i === breadcrumb.length - 1 ? "page" : undefined
                      }
                    >
                      {b.label}
                    </a>
                  ) : (
                    <span className="text-gray-200">{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span className="mx-2 text-gray-400">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className={`mx-auto ${
            variant === "left" ? "sm:mx-0 max-w-3xl" : "max-w-5xl"
          }`}
        >
          {badgeText && (
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-md shadow-lg">
              <span className="w-2 h-2 rounded-full mr-2.5 bg-primary-500 animate-pulse" />
              <span className="text-white text-sm font-semibold tracking-wide">
                {badgeText}
              </span>
            </div>
          )}

          {title && (
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight ${
                variant === "compact" ? "mb-3" : "mb-4"
              }`}
            >
              <span className="block drop-shadow-lg">{title}</span>

              {highlight && (
                <span className="block mt-2 bg-gradient-to-r from-primary-400 via-primary-300 to-primary-200 bg-clip-text text-transparent drop-shadow-lg">
                  {highlight}
                </span>
              )}
            </h1>
          )}

          {subtitle && (
            <p
              className={`text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed ${
                variant === "left" ? "sm:mx-0" : "mx-auto"
              } ${variant === "compact" ? "mb-4" : "mb-8"}`}
            >
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div
              className={`flex flex-col sm:flex-row gap-3 items-center ${
                variant === "left" ? "sm:justify-start" : "justify-center"
              }`}
            >
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="group relative px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary-300 overflow-hidden"
                >
                  <span className="relative z-10">{ctaPrimary.label}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              )}

              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="px-6 py-3 rounded-xl text-sm font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-gray-900 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 backdrop-blur-sm"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {variant !== "compact" && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-8 z-20">
          <a
            href="#content"
            aria-label="Scroll to content"
            className="flex flex-col items-center justify-center group"
          >
            <div className="w-6 h-10 flex justify-center">
              <div className="w-1 h-6 bg-white/70 rounded-full animate-bounce" />
            </div>
            <span className="text-white text-xs mt-2 opacity-0 group-hover:opacity-70 transition-opacity">
              Scroll
            </span>
          </a>
        </div>
      )}
    </section>
  );
}

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
      className={`relative flex items-center overflow-hidden bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 ${containerClasses}`}
      style={{
        minHeight: height || (variant === "compact" ? "36vh" : "70vh"),
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
        backgroundSize: backgroundImage ? "cover" : undefined,
        backgroundPosition: backgroundImage ? "center" : undefined,
      }}
    >
      {/* gradient + glow using your primary palette tokens */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            // large subtle primary glow + small secondary touch
            `radial-gradient(circle at 20% 20%, rgba(36,53,126,0.12), transparent 20%), radial-gradient(circle at 80% 80%, rgba(62,201,185,0.05), transparent 30%)`,
        }}
      />

      {backgroundImage && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundColor: `rgba(2,6,23,${backgroundOverlayOpacity})`,
            mixBlendMode: "multiply",
          }}
        />
      )}

      <div
        className={`relative z-10 w-full max-w-6xl mx-auto px-6 ${
          variant === "left" ? "text-left" : "text-center"
        }`}
      >
        {/* breadcrumb */}
        {Array.isArray(breadcrumb) && breadcrumb.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={`mb-4 text-xs sm:text-sm text-slate-300 ${
              variant === "left" ? "sm:mb-6" : "mx-auto max-w-3xl"
            }`}
          >
            <ol className="inline-flex items-center space-x-2">
              {breadcrumb.map((b: any, i: number) => (
                <li key={i} className="inline-flex items-center">
                  {b.href ? (
                    <a
                      href={b.href}
                      className="text-slate-300 hover:underline"
                      aria-current={
                        i === breadcrumb.length - 1 ? "page" : undefined
                      }
                    >
                      {b.label}
                    </a>
                  ) : (
                    <span className="text-slate-300">{b.label}</span>
                  )}
                  {i < breadcrumb.length - 1 && (
                    <span className="mx-2 text-slate-500">/</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div
          className={`mx-auto ${
            variant === "left" ? "sm:mx-0 max-w-3xl" : "max-w-7xl"
          }`}
        >
          {badgeText && (
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-4 backdrop-blur-sm">
              <span
                className="w-2 h-2 rounded-full mr-2 animate-pulse"
                // use a lighter primary tone for the dot (fallback to your secondary)
                style={{
                  backgroundColor:
                    "var(--color-primary-400, rgba(36,53,126,0.7))",
                }}
              />
              <span className="text-white text-sm font-medium tracking-wide">
                {badgeText}
              </span>
            </div>
          )}

          {title && (
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight ${
                variant === "compact" ? "mb-3" : "mb-4"
              }`}
            >
              <span className="block">{title}</span>

              {highlight && (
                <span
                  className="block mt-2 bg-clip-text text-transparent"
                  // gradient uses two primary stops from your theme for consistency
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, var(--color-primary-500, #24357e), var(--color-primary-700, #1f2a66))",
                  }}
                >
                  {highlight}
                </span>
              )}
            </h1>
          )}

          {subtitle && (
            <p
              className={`text-sm sm:text-base text-slate-300 max-w-2xl ${
                variant === "left" ? "sm:mx-0" : "mx-auto"
              } ${variant === "compact" ? "mb-4" : "mb-8"}`}
            >
              {subtitle}
            </p>
          )}

          {(ctaPrimary || ctaSecondary) && (
            <div
              className={`flex flex-col sm:flex-row gap-3 items-center justify-center ${
                variant === "left" ? "sm:justify-start" : ""
              }`}
            >
              {ctaPrimary && (
                <a
                  href={ctaPrimary.href}
                  className="px-6 py-3 rounded-xl text-sm font-semibold shadow-md text-white transition-transform transform hover:-translate-y-0.5 focus:outline-none"
                  style={{
                    // primary CTA uses primary-600 (good mid tone) with fallback
                    backgroundColor: "var(--color-primary-600, #24357e)",
                    boxShadow: "0 10px 30px rgba(36,53,126,0.16)",
                  }}
                >
                  {ctaPrimary.label}
                </a>
              )}

              {ctaSecondary && (
                <a
                  href={ctaSecondary.href}
                  className="px-6 py-3 rounded-xl text-sm font-semibold border border-white/10 text-white/90 hover:bg-white/6 transition-all"
                >
                  {ctaSecondary.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {variant !== "compact" && (
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-6 z-20">
          <a
            href="#content"
            aria-label="Scroll to content"
            className="flex items-center justify-center w-10 h-16"
          >
            <span
              className="block w-1.5 h-10 rounded-full animate-bounce"
              style={{ backgroundColor: "rgba(255,255,255,0.2)" }}
            />
          </a>
        </div>
      )}
    </section>
  );
}

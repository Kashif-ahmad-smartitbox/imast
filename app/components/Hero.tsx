// components/Hero.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

type HeroProps = {
  useNextImage?: boolean;
  thumbnail?: string; // poster image for video / first slide
  videoSrc?: string;
};

export default function Hero({
  useNextImage = false,
  thumbnail = "/Thumbnail22.png",
  videoSrc = "/imast.mp4",
}: HeroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    // cleanup: pause on unmount
    return () => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
        } catch {}
      }
    };
  }, []);

  // keyboard support: Enter/Space to play when thumbnail focused
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const active = document.activeElement as HTMLElement | null;
      if (!active) return;
      if (
        active.dataset?.role === "hero-play" &&
        (e.key === "Enter" || e.key === " ")
      ) {
        e.preventDefault();
        handlePlay();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handlePlay = async () => {
    setIsPlaying(true);
    // play after next paint to ensure <video> is mounted
    requestAnimationFrame(() => {
      if (!videoRef.current) return;
      const promise = videoRef.current.play();
      if (promise && typeof (promise as Promise<void>).catch === "function") {
        (promise as Promise<void>).catch(() => {
          // fallback: try muted autoplay if browser blocks sound
          try {
            videoRef.current!.muted = true;
            videoRef.current!.play().catch(() => {});
          } catch {}
        });
      }
    });
  };

  const handlePause = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsPlaying(false);
  };

  const handleEnded = () => {
    // on end: stop playing and show poster again
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-12 lg:py-24">
          {/* Text column */}
          <div className="order-2 lg:order-1">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-gray-900">
              <span className="mr-2">IMAST:</span>
              <span className="text-[#AB3F90]">
                Future Ready Infrastructure
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-xl">
              Our new office breathes vitality into our team — providing an
              environment that stimulates productivity, collaboration and
              consistent client wins.
            </p>

            <div className="mt-8 flex flex-wrap gap-3 items-center">
              <a
                href="#contact"
                className="inline-flex items-center rounded-2xl bg-[#E31E24] px-5 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#b7181c] focus:outline-none focus:ring-3 focus:ring-[#E31E24]/40 transition"
                aria-label="Get in touch with IMAST"
              >
                Get in touch
              </a>

              <a
                href="#learn"
                className="inline-flex items-center rounded-2xl border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition"
                aria-label="Learn more about IMAST"
              >
                Learn more
              </a>
            </div>
          </div>

          {/* Media column */}
          <div className="order-1 lg:order-2">
            <div className="relative w-full overflow-hidden rounded-2xl shadow-xl bg-gray-50 ring-1 ring-black/5">
              {/* Poster / thumbnail (shown when not playing) */}
              {!isPlaying && (
                <button
                  type="button"
                  onClick={handlePlay}
                  data-role="hero-play"
                  aria-label="Play IMAST video"
                  className="relative block w-full text-left focus:outline-none"
                >
                  {useNextImage ? (
                    <div className="relative w-full h-[320px] sm:h-[420px]">
                      <Image
                        src={thumbnail}
                        alt="IMAST office thumbnail"
                        fill
                        className="object-cover rounded-2xl transform transition-transform duration-300 hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority
                      />
                    </div>
                  ) : (
                    <img
                      src={thumbnail}
                      alt="IMAST office thumbnail"
                      className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl transform transition-transform duration-300 hover:scale-105"
                    />
                  )}

                  {/* overlay: dark gradient at left for text readability if needed */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-2xl pointer-events-none"
                    aria-hidden
                  />

                  {/* centered play CTA */}
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className="inline-flex items-center justify-center rounded-full bg-[#E31E24]/95 p-3 shadow-lg transform transition-all duration-200">
                      {/* play icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="1.5"
                        className="w-10 h-10"
                        aria-hidden
                      >
                        <path d="M8 5v14l11-7z" fill="currentColor" />
                      </svg>
                    </span>
                  </span>
                </button>
              )}

              {/* Video element (mounted when playing) */}
              {isPlaying && (
                <div className="relative">
                  <video
                    ref={videoRef}
                    src={videoSrc}
                    poster={thumbnail}
                    className="w-full h-[320px] sm:h-[420px] object-cover rounded-2xl"
                    controls
                    autoPlay
                    playsInline
                    onEnded={handleEnded}
                  />

                  {/* small top-left control to pause/close */}
                  <div className="absolute left-4 top-4">
                    <button
                      onClick={handlePause}
                      aria-label="Pause video"
                      className="inline-flex items-center gap-2 rounded-full bg-[#E31E24]/95 px-3 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-[#b7181c]/95 focus:outline-none focus:ring-2 focus:ring-[#E31E24]/40 transition"
                    >
                      Pause
                    </button>
                  </div>
                </div>
              )}
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Watch a quick walkthrough of our new office and capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

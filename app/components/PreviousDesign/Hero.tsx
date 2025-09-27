"use client";
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import useWindowSize from "../../hooks/useWindowSize";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const { isMobile, isSmallTablet, isTablet, isDesktop, isLargeDesktop } =
    useWindowSize();

  useEffect(() => {
    if (isVideoReady && videoRef.current) {
      const v = videoRef.current;
      const p = v.play();
      if (p !== undefined) {
        p.then(() => {
          setHasPlayed(true);
          setPlaying(true);
        }).catch(() => setHasPlayed(false));
      }
    }
  }, [isVideoReady]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        await v.play();
        setPlaying(true);
      } else {
        v.pause();
        setPlaying(false);
      }
    } catch {}
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const getContainerPadding = () => {
    if (isMobile) return "px-3";
    if (isSmallTablet) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  };

  return (
    <section className="relative w-full h-screen max-h-[880px] overflow-hidden bg-black">
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          hasPlayed ? "opacity-100" : "opacity-0"
        }`}
        src="/imast.mp4"
        poster="/Thumbnail22.png"
        playsInline
        muted={muted}
        loop
        preload="auto"
        onCanPlay={() => setIsVideoReady(true)}
      />

      <img
        src="/Thumbnail22.png"
        alt="IMAST hero thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none ${
          hasPlayed ? "opacity-0 scale-105" : "opacity-100"
        }`}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 mix-blend-multiply pointer-events-none" />

      <div
        className={`relative z-10 max-w-7xl mx-auto ${getContainerPadding()} h-full flex items-center`}
      >
        <div className="w-full md:w-3/5 lg:w-2/5 text-white">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
            Build connected customer journeys — from store to supply chain
          </h1>

          <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/90">
            IMAST unifies loyalty, distribution and service into a single
            platform — reducing complexity and improving revenue for retail and
            FMCG brands. Fast to implement, built for scale.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white text-black font-semibold shadow-md hover:shadow-lg transition"
            >
              Request a demo
            </a>

            <a
              href="#modules"
              className="inline-flex items-center justify-center px-5 py-3 rounded-lg border border-white/30 text-white/95 hover:bg-white/5 transition"
            >
              Explore modules
            </a>
          </div>
        </div>
      </div>

      {/* Controls moved to bottom-right */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button
          onClick={togglePlay}
          className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          aria-label={playing ? "Pause video" : "Play video"}
        >
          {playing ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
          aria-label={muted ? "Unmute video" : "Mute video"}
        >
          {muted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </section>
  );
}

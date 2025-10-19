"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ArrowRight } from "lucide-react";
import useWindowSize from "../../hooks/useWindowSize";

interface HeroButton {
  text: string;
  link: string;
}

interface HeroData {
  title: string;
  subtitle?: string;
  video?: string;
  image?: string;
  button1: HeroButton;
  button2?: HeroButton;
}

interface HeroProps {
  data: HeroData;
}

/**
 * Improved Hero component:
 * - better event handling and cleanup
 * - explicit debug events (onError / onLoadedMetadata)
 * - fallback UI if autoplay is blocked
 */
export default function Hero({ data }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mounted = useRef(true);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false); // whether we ever successfully started playback
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false); // autoplay blocked by browser
  const [loadError, setLoadError] = useState<string | null>(null);

  const { isMobile, isSmallTablet, isTablet } = useWindowSize();

  // mounted guard
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const getContainerPadding = useCallback(() => {
    if (isMobile) return "px-3";
    if (isSmallTablet) return "px-4";
    if (isTablet) return "px-6";
    return "px-8";
  }, [isMobile, isSmallTablet, isTablet]);

  // sync muted state to element
  useEffect(() => {
    const v = videoRef.current;
    if (v && v.muted !== isMuted) v.muted = isMuted;
  }, [isMuted]);

  // Attach media listeners (onLoadedMetadata, onError, play/pause)
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("[Hero] video loadedmetadata", v.currentSrc || data.video);
      }
      if (mounted.current) setIsVideoReady(true);
    };
    const onPlay = () => {
      if (mounted.current) {
        setHasPlayed(true);
        setIsPlaying(true);
        setAutoplayBlocked(false);
      }
    };
    const onPause = () => {
      if (mounted.current) setIsPlaying(false);
    };
    const onError = (ev: any) => {
      const err = v.error;
      const msg = err
        ? `code:${err.code} message:${(err as any).message || "unknown"}`
        : "unknown error event";
      setLoadError(msg);
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("[Hero] video error", msg, ev);
      }
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("error", onError);

    // ensure muted on mount (helps autoplay)
    v.muted = isMuted;

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("error", onError);
    };
  }, [data.video, isMuted]);

  // Attempt autoplay once when ready
  useEffect(() => {
    if (!isVideoReady) return;
    const v = videoRef.current;
    if (!v) return;

    let attempted = false;
    const attempt = async () => {
      if (attempted) return;
      attempted = true;

      // ensure muted state so browsers allow autoplay
      v.muted = isMuted;
      try {
        const p = v.play();
        if (p !== undefined) await p;
        if (mounted.current) {
          setHasPlayed(true);
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }
      } catch (err) {
        // autoplay blocked
        if (mounted.current) {
          setHasPlayed(false);
          setIsPlaying(false);
          setAutoplayBlocked(true);
        }
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.warn("[Hero] autoplay prevented:", err);
        }
      }
    };

    void attempt();
    // only run when video becomes ready
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVideoReady]);

  // Global keyboard (space toggles, m toggles mute)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const active = (document.activeElement?.tagName || "").toLowerCase();
      if (active === "input" || active === "textarea") return;
      if (e.code === "Space") {
        e.preventDefault();
        void togglePlay();
      } else if (e.key.toLowerCase() === "m") {
        e.preventDefault();
        toggleMute();
      }
    };
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []); // functions are stable below

  // Pause when tab hidden
  useEffect(() => {
    const onVis = () => {
      const v = videoRef.current;
      if (!v) return;
      if (document.hidden) {
        if (!v.paused) {
          v.pause();
        }
      } else {
        // Optionally try to resume only if previously played
        if (hasPlayed && v.paused) {
          void v.play().catch(() => {
            /* ignore */
          });
        }
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [hasPlayed]);

  // toggle play/pause
  const togglePlay = useCallback(async () => {
    const v = videoRef.current;
    if (!v) return;
    try {
      if (v.paused) {
        const p = v.play();
        if (p !== undefined) await p;
        if (mounted.current) setIsPlaying(true);
      } else {
        v.pause();
        if (mounted.current) setIsPlaying(false);
      }
    } catch (err) {
      // swallow errors (autoplay etc) but surface in dev
      if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.warn("[Hero] togglePlay failed:", err);
      }
      // mark autoplay blocked so overlay appears
      if (mounted.current) setAutoplayBlocked(true);
    }
  }, []);

  // toggle mute/unmute
  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (v) {
      v.muted = !v.muted;
      setIsMuted(v.muted);
    } else {
      setIsMuted((s) => !s);
    }
  }, []);

  // Visible overlay play button appears when autoplay blocked or not yet started
  const showOverlayPlay = autoplayBlocked || (!hasPlayed && !isPlaying);

  return (
    <section
      className="relative w-full h-[100vh] overflow-hidden bg-black"
      aria-label="Hero section with background video"
      role="region"
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
          hasPlayed ? "opacity-100" : "opacity-0"
        }`}
        src={data.video}
        poster={data.image}
        playsInline
        muted={isMuted}
        loop
        preload="metadata"
        // we already attach listeners in useEffect; keep onCanPlay for convenience
        onCanPlay={() => {
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log("[Hero] onCanPlay fired");
          }
          setIsVideoReady(true);
        }}
        // fallback for errors
        onError={() => {
          const v = videoRef.current;
          const err = v?.error;
          const msg = err ? `code:${err.code}` : "unknown";
          setLoadError(msg);
          if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.error("[Hero] video onError", msg);
          }
        }}
      />

      {/* Poster image */}
      <img
        src={data.image}
        alt="IMAST hero thumbnail"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none transform-gpu ${
          hasPlayed ? "opacity-0 scale-105" : "opacity-100 scale-100"
        }`}
      />

      {/* Dark gradient over video for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/50 mix-blend-multiply pointer-events-none" />

      <div
        className={`relative z-10 max-w-7xl mx-auto ${getContainerPadding()} h-full flex items-center`}
      >
        <div className="w-full md:w-3/5 lg:w-2/5 text-white">
          <h1 className="text-xl sm:text-4xl lg:text-4xl font-bold leading-tight drop-shadow-md">
            {data.title}
          </h1>

          {data.subtitle && (
            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/90">
              {data.subtitle}
            </p>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <a
              href={data.button1.link}
              className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <span>{data.button1.text}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>

            {data.button2 && (
              <a
                href={data.button2.link}
                className="mt-4 rounded group inline-flex items-center gap-3 px-5 py-3 hover:bg-white/5 text-white border border-white/30 font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02]"
              >
                <span>{data.button2.text}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-6 right-6 flex gap-3 z-20">
        <button
          onClick={() => void togglePlay()}
          className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-pressed={isPlaying}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          title={isPlaying ? "Pause (Space)" : "Play (Space)"}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={toggleMute}
          className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-primary-400"
          aria-pressed={!isMuted}
          aria-label={isMuted ? "Unmute video" : "Mute video"}
          title={isMuted ? "Unmute (M)" : "Mute (M)"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Big overlay play button if autoplay blocked or not started */}
      {showOverlayPlay && (
        <button
          onClick={() => void togglePlay()}
          className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
          aria-label="Play video"
        >
          <div className="bg-black/45 hover:bg-black/60 p-6 rounded-full flex items-center justify-center transition">
            <Play className="w-10 h-10 text-white" />
          </div>
        </button>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />

      {/* Announce status to assistive tech */}
      <div aria-live="polite" className="sr-only">
        {isPlaying ? "Video playing" : "Video paused"},{" "}
        {isMuted ? "muted" : "unmuted"}
      </div>
    </section>
  );
}

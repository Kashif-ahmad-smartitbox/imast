"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX, ArrowRight, X } from "lucide-react";
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

export default function Hero({ data }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);
  const mounted = useRef(true);

  const [isVideoReady, setIsVideoReady] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVideoPlaying, setIsModalVideoPlaying] = useState(false);

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

  // Attach media listeners for background video
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const onLoaded = () => {
      if (process.env.NODE_ENV === "development") {
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
        console.error("[Hero] video error", msg, ev);
      }
    };

    v.addEventListener("loadedmetadata", onLoaded);
    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("error", onError);

    v.muted = isMuted;

    return () => {
      v.removeEventListener("loadedmetadata", onLoaded);
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("error", onError);
    };
  }, [data.video, isMuted]);

  // Modal video event listeners
  useEffect(() => {
    const v = modalVideoRef.current;
    if (!v || !isModalOpen) return;

    const onPlay = () => {
      setIsModalVideoPlaying(true);
    };
    const onPause = () => {
      setIsModalVideoPlaying(false);
    };
    const onEnded = () => {
      setIsModalVideoPlaying(false);
    };

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, [isModalOpen]);

  // Attempt autoplay for background video once when ready
  useEffect(() => {
    if (!isVideoReady || isMobile) return; // Don't autoplay on mobile
    const v = videoRef.current;
    if (!v) return;

    let attempted = false;
    const attempt = async () => {
      if (attempted) return;
      attempted = true;

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
        if (mounted.current) {
          setHasPlayed(false);
          setIsPlaying(false);
          setAutoplayBlocked(true);
        }
        if (process.env.NODE_ENV === "development") {
          console.warn("[Hero] autoplay prevented:", err);
        }
      }
    };

    void attempt();
  }, [isVideoReady, isMobile, isMuted]);

  // Global keyboard (space toggles, m toggles mute)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isModalOpen) return; // Don't handle keys when modal is open

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
  }, [isModalOpen]);

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
        if (hasPlayed && v.paused && !isMobile) {
          // Don't auto-resume on mobile
          void v.play().catch(() => {
            /* ignore */
          });
        }
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [hasPlayed, isMobile]);

  // toggle play/pause for background video
  const togglePlay = useCallback(async () => {
    if (isMobile) {
      openModal();
      return;
    }

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
      if (process.env.NODE_ENV === "development") {
        console.warn("[Hero] togglePlay failed:", err);
      }
      if (mounted.current) setAutoplayBlocked(true);
    }
  }, [isMobile]);

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

  // Modal functions
  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setIsModalVideoPlaying(false);

    // Pause modal video when closing
    const modalVideo = modalVideoRef.current;
    if (modalVideo && !modalVideo.paused) {
      modalVideo.pause();
    }
  }, []);

  const toggleModalPlay = useCallback(async () => {
    const modalVideo = modalVideoRef.current;
    if (!modalVideo) return;

    try {
      if (modalVideo.paused) {
        await modalVideo.play();
        setIsModalVideoPlaying(true);
      } else {
        modalVideo.pause();
        setIsModalVideoPlaying(false);
      }
    } catch (err) {
      console.warn("Modal video play failed:", err);
    }
  }, []);

  // Show overlay play button on mobile or when autoplay blocked
  const showOverlayPlay =
    isMobile || autoplayBlocked || (!hasPlayed && !isPlaying);

  return (
    <>
      <section
        className="relative w-full h-[100vh] overflow-hidden bg-black"
        aria-label="Hero section with background video"
        role="region"
      >
        {/* Background video - hidden on mobile when modal approach is used */}
        <video
          ref={videoRef}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out ${
            hasPlayed ? "opacity-100" : "opacity-0"
          } ${isMobile ? "hidden" : "block"}`}
          src={data.video}
          poster={data.image}
          playsInline
          muted={isMuted}
          loop
          preload="metadata"
          onCanPlay={() => {
            if (process.env.NODE_ENV === "development") {
              console.log("[Hero] onCanPlay fired");
            }
            setIsVideoReady(true);
          }}
          onError={() => {
            const v = videoRef.current;
            const err = v?.error;
            const msg = err ? `code:${err.code}` : "unknown";
            setLoadError(msg);
            if (process.env.NODE_ENV === "development") {
              console.error("[Hero] video onError", msg);
            }
          }}
        />

        {/* Poster image */}
        <img
          src={data.image}
          alt="Hero background"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-out pointer-events-none transform-gpu ${
            hasPlayed && !isMobile
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100"
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

        {/* Controls - hidden on mobile since we use modal approach */}
        {!isMobile && (
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
        )}

        {/* Mobile-specific play button - positioned separately so it doesn't block other buttons */}
        {isMobile && (
          <div className="absolute bottom-6 left-6 z-20">
            <button
              onClick={openModal}
              className="p-4 rounded-full bg-black/50 text-white hover:bg-black/70 transition focus:outline-none focus:ring-2 focus:ring-primary-400 flex items-center gap-2"
              aria-label="Open video in modal"
            >
              <Play className="w-6 h-6" />
              <span className="text-sm font-medium">Play Video</span>
            </button>
          </div>
        )}

        {/* Big overlay play button - only for desktop when autoplay blocked */}
        {showOverlayPlay && !isMobile && (
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

      {/* Video Modal for Mobile */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
              aria-label="Close video modal"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Modal video */}
            <video
              ref={modalVideoRef}
              className="w-full h-full object-contain"
              src={data.video}
              playsInline
              controls={false}
              loop
              autoPlay
            />

            {/* Custom play/pause button for modal */}
            <button
              onClick={toggleModalPlay}
              className="absolute inset-0 z-20 flex items-center justify-center pointer-events-auto"
              aria-label={isModalVideoPlaying ? "Pause video" : "Play video"}
            >
              <div
                className={`bg-black/45 hover:bg-black/60 p-6 rounded-full flex items-center justify-center transition ${
                  isModalVideoPlaying
                    ? "opacity-0 hover:opacity-100"
                    : "opacity-100"
                }`}
              >
                {isModalVideoPlaying ? (
                  <Pause className="w-12 h-12 text-white" />
                ) : (
                  <Play className="w-12 h-12 text-white" />
                )}
              </div>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

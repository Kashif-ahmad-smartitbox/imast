"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";

export type Slide = {
  id: string;
  image: string;
  name?: string;
  role?: string;
  videoUrl: string;
  alt?: string;
};

export type LifeVideoData = {
  title?: string;
  paragraphs?: string[];
  buttonText?: string;
  buttonHref?: string;
  slides: Slide[];
  accentColor?: string;
  autoplay?: boolean;
  autoplayIntervalMs?: number;
};

export default function LifeVideoSection({ data }: { data: LifeVideoData }) {
  const {
    title = "Life At IMAST",
    paragraphs = [],
    buttonText = "Contact Us",
    buttonHref = "/contact",
    slides = [],
    accentColor = "#d94b50",
    autoplay = true,
    autoplayIntervalMs = 5000,
  } = data ?? {};

  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);

  const autoplayRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const playButtonRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // start/stop autoplay
  useEffect(() => {
    if (!autoplay || slides.length <= 1) return;
    function start() {
      stop();
      autoplayRef.current = window.setInterval(() => {
        setIndex((i) => (i + 1) % slides.length);
      }, autoplayIntervalMs);
    }
    function stop() {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    }
    start();
    const node = containerRef.current;
    const onEnter = () => stop();
    const onLeave = () => start();
    node?.addEventListener("mouseenter", onEnter);
    node?.addEventListener("mouseleave", onLeave);
    node?.addEventListener("focusin", onEnter);
    node?.addEventListener("focusout", onLeave);
    return () => {
      stop();
      node?.removeEventListener("mouseenter", onEnter);
      node?.removeEventListener("mouseleave", onLeave);
      node?.removeEventListener("focusin", onEnter);
      node?.removeEventListener("focusout", onLeave);
    };
  }, [autoplay, autoplayIntervalMs, slides.length]);

  // keyboard nav for slides
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % slides.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + slides.length) % slides.length);
      if (e.key === "Home") setIndex(0);
      if (e.key === "End") setIndex(slides.length - 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [slides.length, isModalOpen]);

  // open modal
  function openModalWithVideo(url: string) {
    if (!url) return;
    setModalVideoUrl(url);
    setIsModalOpen(true);
  }

  // close modal + cleanup
  function closeModal() {
    setIsModalOpen(false);
    try {
      const v = videoRef.current;
      if (v) {
        v.pause();
        v.currentTime = 0;
        v.removeAttribute("src");
        v.load();
      }
    } catch (_) {}
    setTimeout(() => playButtonRef.current?.focus(), 0);
  }

  // when modal opens: attach src and try play; trap Esc and Tab
  useEffect(() => {
    if (!isModalOpen) return;
    const v = videoRef.current;
    if (v && modalVideoUrl) {
      v.src = modalVideoUrl;
      const p = v.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    }
    closeButtonRef.current?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeModal();
      if (e.key === "Tab") {
        // very simple focus trap: only close button (ok for this modal)
        const focusable = [closeButtonRef.current].filter(
          Boolean
        ) as HTMLElement[];
        if (focusable.length === 0) return;
        const first = focusable[0];
        if (!document.activeElement) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isModalOpen, modalVideoUrl]);

  // smooth transition helper for slide change (adds small delay for fade)
  const [fadeKey, setFadeKey] = useState(0);
  useEffect(() => {
    // bump key so image container can animate via key changes
    setFadeKey((k) => k + 1);
  }, [index]);

  return (
    <section
      className="py-16 bg-white"
      aria-label="Life at Imast video section"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: heading + copy + CTA */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              {title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="text-[#ff4f61]">
                {title.split(" ").slice(-1)}
              </span>
            </h2>

            <div className="space-y-4 text-gray-700 mb-6">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <a
              href={buttonHref}
              className="inline-block rounded-lg text-white font-semibold px-6 py-3 shadow focus:outline-none focus:ring-4 focus:ring-offset-2"
              style={{ background: accentColor }}
            >
              {buttonText}
            </a>
          </div>

          {/* Right: carousel card */}
          <div
            className="lg:col-span-6 flex flex-col items-center"
            ref={containerRef}
          >
            <div className="w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-50">
                {/* animated image container: crossfade when key changes */}
                <div
                  key={fadeKey}
                  className="w-full h-[580px] bg-gray-200 transition-opacity duration-500 ease-out"
                >
                  {slides[index] ? (
                    <img
                      src={slides[index].image}
                      alt={
                        slides[index].alt ??
                        slides[index].name ??
                        `Slide ${index + 1}`
                      }
                      className="w-full h-full object-cover block transform transition-transform duration-700 ease-out hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                {/* play button (center) */}
                <button
                  ref={playButtonRef}
                  onClick={() => openModalWithVideo(slides[index]?.videoUrl)}
                  aria-label={`Play ${slides[index]?.name ?? "video"}`}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-2xl focus:outline-none focus:ring-4 focus:ring-offset-2"
                  title="Play video"
                >
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <Play className="w-7 h-7 text-[#d94b50]" />
                  </div>
                </button>
              </div>

              {/* dots (animated, keyboard accessible) */}
              <div className="mt-6 flex items-center justify-center gap-4">
                <div
                  className="flex gap-3"
                  role="tablist"
                  aria-label="Slide selector"
                >
                  {slides.map((s, i) => (
                    <button
                      key={s.id}
                      role="tab"
                      aria-selected={i === index}
                      aria-label={`Go to slide ${i + 1}: ${s.name ?? s.id}`}
                      onClick={() => setIndex(i)}
                      className={`w-3 h-3 rounded-full transition-all transform focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                        i === index
                          ? "bg-primary-500 scale-110 shadow-md"
                          : "bg-pink-200 hover:scale-105"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* small keyboard hint */}
              <div className="sr-only" aria-hidden>
                Use left/right arrow keys to navigate slides.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal: inline mp4 playback */}
      {isModalOpen && modalVideoUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeModal}
            aria-hidden
          />

          <div className="relative z-10 w-full max-w-4xl mx-auto bg-white rounded-xl overflow-hidden shadow-2xl">
            <div className="flex items-start justify-between p-3">
              <div />
              <button
                ref={closeButtonRef}
                onClick={closeModal}
                aria-label="Close video"
                className="p-2 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 pb-6">
              <video
                ref={videoRef}
                controls
                playsInline
                preload="metadata"
                className="w-full h-auto max-h-[75vh] bg-black rounded"
              >
                <source src={modalVideoUrl} type="video/mp4" />
                Your browser does not support HTML video.
              </video>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

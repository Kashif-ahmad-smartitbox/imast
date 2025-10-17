"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Cpu,
  Zap,
  Database,
  ShieldCheck,
  ArrowRight,
  Monitor,
  Layers,
} from "lucide-react";

type Module = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  heroImage?: string;
  video?: string;
  stats?: { label: string; value: string }[];
  features: { title: string; desc: string; icon?: React.ReactNode }[];
  integrations?: string[];
};

const MODULES: Module[] = [
  {
    id: "retail-point",
    name: "Retail Point",
    tagline: "Lightning-fast POS built for high-volume stores",
    description:
      "A point-of-sale system that keeps tills moving, syncs inventory in real-time and handles payments, returns and offline mode seamlessly.",
    video: "/imast.mp4",
    heroImage: "/thumbnail22.png",
    stats: [
      { label: "Transactions / sec", value: "120+" },
      { label: "Avg checkout time", value: "7s" },
      { label: "Offline resilience", value: "99.9%" },
    ],
    features: [
      {
        title: "Fast checkout",
        desc: "Optimised UI for speed and minimal taps",
        icon: <Zap />,
      },
      {
        title: "Inventory sync",
        desc: "Near-real-time stock across stores and DCs",
        icon: <Database />,
      },
      {
        title: "Offline-first",
        desc: "Local-first transactions that reconcile automatically",
        icon: <Monitor />,
      },
    ],
    integrations: [
      "Payments (Razorpay, PayU)",
      "ERP connectors",
      "Barcode printers",
    ],
  },
  {
    id: "distribution-plus",
    name: "Distribution+",
    tagline: "Manage routes, orders and returns with ease",
    description:
      "A distributor management system (DMS) to orchestrate orders, field teams and settlements with route optimisation and proof-of-delivery.",
    heroImage: "/thumbnail22.png",
    stats: [
      { label: "Routes / day", value: "4.5k" },
      { label: "On-time delivery", value: "95%" },
    ],
    features: [
      {
        title: "Route optimiser",
        desc: "Reduce travel time and fuel with smart routing",
        icon: <Layers />,
      },
      {
        title: "Field app",
        desc: "Order capture, POD and returns in a single mobile app",
        icon: <Cpu />,
      },
      {
        title: "Settlement engine",
        desc: "Automated commissions and invoicing",
        icon: <Database />,
      },
    ],
    integrations: ["TMS connectors", "GST invoicing", "Accounting systems"],
  },
];

export default function DeepDiveImproved() {
  // tabs
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const activeModule = MODULES.find((m) => m.id === activeId)!;

  // video / media
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // thumbnails (index)
  const [thumbIndex, setThumbIndex] = useState(0);
  const screenshots = [
    activeModule.heroImage || "/thumbnail22.png",
    "/thumbnail22.png",
    "/thumbnail22.png",
  ];

  // reset when module changes
  useEffect(() => {
    setThumbIndex(0);
    setIsVideoReady(false);
    setIsPlaying(true);
    setIsMuted(true);
    // if video exists, attempt autoplay after tiny delay
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.muted = true;
    }
  }, [activeId]);

  // toggle play/pause
  const togglePlay = async () => {
    if (!videoRef.current) return;
    try {
      if (videoRef.current.paused) {
        await videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } catch {
      // autoplay blocked — fall back to thumbnail
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) {
      setIsMuted((m) => !m);
      return;
    }
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  // keyboard navigation for tabs (left/right)
  const onKeyTabs = (e: React.KeyboardEvent) => {
    const idx = MODULES.findIndex((m) => m.id === activeId);
    if (e.key === "ArrowRight") {
      const next = MODULES[(idx + 1) % MODULES.length];
      setActiveId(next.id);
    } else if (e.key === "ArrowLeft") {
      const prev = MODULES[(idx - 1 + MODULES.length) % MODULES.length];
      setActiveId(prev.id);
    }
  };

  return (
    <section className="bg-white" aria-labelledby="deep-dive-title">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-6">
          <p className="text-sm font-semibold text-primary-600">Deep dive</p>
          <h2
            id="deep-dive-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Featured module — in focus
          </h2>
          <p className="mt-2 text-gray-600 max-w-2xl">
            Inspect a flagship module: UX, tech, integrations and quick stats.
          </p>
        </header>

        {/* Tabs */}
        <div
          className="flex items-center gap-3 mb-8"
          role="tablist"
          aria-label="Modules"
          onKeyDown={onKeyTabs}
        >
          {MODULES.map((m) => (
            <button
              key={m.id}
              role="tab"
              aria-selected={m.id === activeId}
              aria-controls={`panel-${m.id}`}
              id={`tab-${m.id}`}
              onClick={() => setActiveId(m.id)}
              className={`px-4 py-2 rounded-full font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 ${
                m.id === activeId
                  ? "bg-primary-600 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {m.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* media area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-gray-100">
              {/* thumbnail fallback (visible when video not ready OR when no video) */}
              {!activeModule.video && (
                <img
                  src={screenshots[thumbIndex]}
                  alt={`${activeModule.name} hero`}
                  className="w-full h-[460px] object-cover"
                />
              )}

              {/* video (if present) */}
              {activeModule.video && (
                <>
                  {/* poster-like thumbnail shown until canplay */}
                  {!isVideoReady && (
                    <img
                      src={activeModule.heroImage || screenshots[0]}
                      alt={`${activeModule.name} poster`}
                      className="w-full h-[460px] object-cover"
                    />
                  )}

                  <video
                    ref={videoRef}
                    src={activeModule.video}
                    className={`w-full h-[460px] object-cover transition-opacity duration-500 ${
                      isVideoReady ? "opacity-100" : "opacity-0"
                    }`}
                    poster={activeModule.heroImage}
                    playsInline
                    muted={isMuted}
                    autoPlay
                    onCanPlay={() => {
                      setIsVideoReady(true);
                      // autoplay if allowed
                      try {
                        videoRef.current?.play();
                        setIsPlaying(true);
                      } catch {
                        setIsPlaying(false);
                      }
                    }}
                  />
                </>
              )}

              {/* gradient overlay and controls */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </div>

              <div className="absolute left-4 bottom-4 flex items-center gap-3 pointer-events-auto">
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/95 shadow hover:scale-105 transition focus:outline-none"
                >
                  {isPlaying ? (
                    <Pause className="text-primary-600" />
                  ) : (
                    <Play className="text-primary-600" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-md bg-white/95 shadow hover:scale-105 transition focus:outline-none"
                >
                  {isMuted ? (
                    <VolumeX className="text-gray-700" />
                  ) : (
                    <Volume2 className="text-gray-700" />
                  )}
                </button>

                <a
                  href={`/modules/${activeModule.id}`}
                  className="ml-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-primary-600 text-white font-semibold"
                >
                  Open module <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* top-left label */}
              <div className="absolute left-4 top-4 bg-white/90 text-xs rounded-full px-3 py-1 font-medium shadow-sm">
                {activeModule.tagline}
              </div>
            </div>

            {/* thumbnails */}
            <div className="flex items-center gap-3">
              {screenshots.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setThumbIndex(i)}
                  className={`rounded-md overflow-hidden border ${
                    i === thumbIndex
                      ? "border-primary-600 ring-2 ring-primary-100"
                      : "border-transparent"
                  } focus:outline-none`}
                >
                  <img
                    src={src}
                    alt={`thumb-${i + 1}`}
                    className="w-36 h-20 object-cover"
                  />
                </button>
              ))}

              {/* small visual stats row */}
              <div className="ml-auto flex items-center gap-3">
                {activeModule.stats?.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white rounded-lg px-3 py-2 shadow text-sm"
                  >
                    <div className="text-xs text-gray-500">{s.label}</div>
                    <div className="font-semibold text-gray-900">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* details */}
          <aside
            className="space-y-6"
            aria-labelledby={`panel-${activeModule.id}`}
          >
            <div id={`panel-${activeModule.id}`}>
              <h3 className="text-xl font-semibold text-gray-900">
                {activeModule.name}
              </h3>
              <div className="mt-1 text-sm text-gray-600">
                {activeModule.tagline}
              </div>
              <p className="mt-3 text-gray-700">{activeModule.description}</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-800">
                Key capabilities
              </div>
              <ul className="mt-3 space-y-3">
                {activeModule.features.map((f) => (
                  <li key={f.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center text-primary-600 shadow-sm transform transition group-hover:scale-105">
                      {f.icon}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">{f.title}</div>
                      <div className="text-sm text-gray-600">{f.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border border-gray-100">
              <div className="text-sm font-semibold text-gray-800">
                Technical notes
              </div>
              <ul className="mt-3 text-sm text-gray-600 space-y-2">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="text-green-600" /> PCI-ready & secure
                  by default
                </li>
                <li className="flex items-center gap-2">
                  <Database className="text-indigo-600" /> Event-driven data
                  bus, low-latency sync
                </li>
                <li className="flex items-center gap-2">
                  <Cpu className="text-gray-600" /> Runs on cloud-native
                  microservices
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

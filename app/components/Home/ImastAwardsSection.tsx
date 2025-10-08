"use client";

import React, {
  memo,
  useMemo,
  useRef,
  useState,
  Fragment,
  KeyboardEvent,
  useEffect,
} from "react";
import Image from "next/image";
import {
  Award,
  Calendar,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/* ----- Types ----- */
type Media =
  | {
      type: "image";
      src: string;
      alt?: string;
      width?: number;
      height?: number;
    }
  | {
      type: "video";
      src: string;
      poster?: string;
      alt?: string;
      width?: number;
      height?: number;
    };

type AwardItem = {
  title: string;
  issuer: string;
  year?: number;
  description?: string;
  logo?: string;
  media?: Media;
};

interface ImastAwardsSectionProps {
  title?: string;
  awards?: AwardItem[];
}

/* ----- Defaults ----- */
const DEFAULT_AWARDS: AwardItem[] = [
  {
    title: "Excellence in Software Engineering",
    issuer: "Industry Board",
    year: 2023,
    description:
      "Recognised for robust engineering practices and long-term platform reliability.",
    media: {
      type: "image",
      src: "/awards/excellence.jpg",
      alt: "Trophy on stage",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Top Innovator Award",
    issuer: "Tech Innovators",
    year: 2022,
    description:
      "Awarded for pioneering R&D investments and owning the full stack.",
    media: {
      type: "video",
      src: "/awards/innovator.mp4",
      poster: "/awards/innovator-poster.jpg",
      alt: "Innovator award clip",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Customer Trust Award",
    issuer: "Global Clients Forum",
    year: 2021,
    description:
      "For building strong, long-lasting partnerships with customers across industries.",
    media: {
      type: "image",
      src: "/awards/customer-trust.jpg",
      alt: "Handshake",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Best Design System",
    issuer: "UX Awards",
    year: 2023,
    description:
      "Recognized for creating an intuitive and accessible design system used by thousands of developers.",
    media: {
      type: "image",
      src: "/awards/excellence.jpg",
      alt: "Design system showcase",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Sustainability Champion",
    issuer: "Green Tech Foundation",
    year: 2022,
    description:
      "Awarded for implementing eco-friendly practices and reducing carbon footprint in operations.",
    media: {
      type: "image",
      src: "/awards/excellence.jpg",
      alt: "Green technology",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Open Source Contribution",
    issuer: "Developer Community",
    year: 2023,
    description:
      "Honored for significant contributions to open source projects and community building.",
    media: {
      type: "video",
      src: "/awards/innovator.mp4",
      poster: "/awards/innovator-poster.jpg",
      alt: "Open source contribution",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Global Expansion Excellence",
    issuer: "International Business Council",
    year: 2021,
    description:
      "Recognized for successful international expansion and cultural adaptation in new markets.",
    media: {
      type: "image",
      src: "/awards/excellence.jpg",
      alt: "World map with locations",
      width: 1200,
      height: 675,
    },
  },
  {
    title: "Employee Satisfaction Award",
    issuer: "Great Place to Work",
    year: 2023,
    description:
      "Awarded for exceptional workplace culture and high employee satisfaction scores.",
    media: {
      type: "image",
      src: "/awards/excellence.jpg",
      alt: "Happy team celebration",
      width: 1200,
      height: 675,
    },
  },
];

/* ----- Lightbox Modal ----- */
function Lightbox({
  open,
  onClose,
  media,
  title,
}: {
  open: boolean;
  onClose: () => void;
  media?: Media;
  title?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  React.useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [open]);

  if (!open || !media) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Media preview"}
      className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4"
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl bg-white">
        <button
          aria-label="Close preview"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 rounded-full bg-white/90 p-2 shadow"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="w-full h-full flex items-center justify-center bg-black">
          {media.type === "image" ? (
            <div
              className="relative w-full"
              style={{ paddingTop: `${(media.height! / media.width!) * 100}%` }}
            >
              <Image
                src={media.src}
                alt={media.alt ?? title ?? "Image"}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          ) : (
            <video
              ref={videoRef}
              src={media.src}
              poster={media.poster}
              controls
              autoPlay
              style={{ maxHeight: "90vh", width: "100%", height: "auto" }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

/* ----- MediaBlock (card-level) ----- */
function MediaBlock({
  media,
  heading,
  onOpenLightbox,
  setPlayingFromPoster,
}: {
  media?: Media;
  heading?: string;
  onOpenLightbox?: () => void;
  setPlayingFromPoster?: (v: boolean) => void;
}) {
  if (!media) return null;

  const overlayHeading = (
    <div className="absolute left-4 right-4 bottom-4 md:bottom-6 flex items-center">
      <div className="bg-gradient-to-t from-black/70 to-transparent backdrop-blur-sm rounded-md px-3 py-2">
        <h4 className="text-sm md:text-base font-semibold text-white leading-tight truncate">
          {heading}
        </h4>
      </div>
    </div>
  );

  if (media.type === "image") {
    return (
      <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden rounded-t-lg">
        <Image
          src={media.src}
          alt={media.alt ?? heading ?? "Award image"}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/_placeholder.png"
        />
        {overlayHeading}
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] bg-slate-50 overflow-hidden rounded-t-lg">
      {media.poster ? (
        <Image
          src={media.poster}
          alt={media.alt ?? heading ?? "Award video poster"}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="/_placeholder.png"
        />
      ) : (
        <div className="absolute inset-0 bg-black/10" />
      )}

      <div className="absolute inset-0 flex items-center justify-center">
        <button
          aria-label={`Play ${heading ?? "video"}`}
          onClick={() => {
            setPlayingFromPoster?.(true);
            onOpenLightbox?.();
          }}
          className="bg-black/50 hover:bg-black/60 active:bg-black/70 rounded-full p-3 transition-shadow shadow-lg"
        >
          <Play className="w-6 h-6 text-white" />
        </button>
      </div>

      {overlayHeading}
    </div>
  );
}

function AwardCard({
  award,
  openLightbox,
}: {
  award: AwardItem;
  openLightbox: (media?: Media, title?: string) => void;
}) {
  const descRef = useRef<HTMLParagraphElement | null>(null);

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden cursor-pointer flex-shrink-0 w-[350px]"
      tabIndex={0}
      aria-labelledby={`award-title-${award.title}`}
      onKeyDown={(e: KeyboardEvent) => {
        if (e.key === "Enter" && award.media) {
          openLightbox(award.media, award.title);
        }
      }}
    >
      <div>
        <MediaBlock
          media={award.media}
          heading={award.title}
          onOpenLightbox={() => openLightbox(award.media, award.title)}
          setPlayingFromPoster={() => {}}
        />
      </div>

      <div className="p-5">
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-md bg-rose-50 flex items-center justify-center text-rose-600 flex-shrink-0"
            aria-hidden
          >
            <Award className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-4 mb-2">
              <h4
                id={`award-title-${award.title}`}
                className="text-base font-semibold truncate"
              >
                {award.title}
              </h4>
              {award.year && (
                <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full flex-shrink-0">
                  <Calendar className="w-3 h-3" />
                  <span>{award.year}</span>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-2">{award.issuer}</p>

            <p
              ref={descRef}
              className="text-sm text-gray-700 leading-relaxed overflow-hidden"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
              }}
            >
              {award.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(function ImastAwardsSection({
  title = "Awards & Accolades",
  awards = DEFAULT_AWARDS,
}: ImastAwardsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft <
          container.scrollWidth - container.clientWidth - 10
      );
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      checkScrollButtons(); // Initial check
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 400;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<Media | undefined>(
    undefined
  );
  const [lightboxTitle, setLightboxTitle] = useState<string | undefined>(
    undefined
  );

  function openLightbox(media?: Media, title?: string) {
    if (!media) return;
    setLightboxMedia(media);
    setLightboxTitle(title);
    setLightboxOpen(true);
  }
  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxMedia(undefined);
    setLightboxTitle(undefined);
  }

  return (
    <section className="relative py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-rose-100">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-50 max-w-xl">
            A steady record of recognition — built the old fashioned way: hard
            work, discipline and a long-term view.
          </p>
        </div>

        {/* Scrollable Container */}
        <div className="relative">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 -ml-4"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110 -mr-4"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          )}

          {/* Scrollable Awards Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {awards.map((award, idx) => (
              <AwardCard key={idx} award={award} openLightbox={openLightbox} />
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2 text-xs text-white">
            <span>Scroll horizontally to view more awards</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        onClose={closeLightbox}
        media={lightboxMedia}
        title={lightboxTitle}
      />

      {/* Hide scrollbar for webkit browsers */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
});

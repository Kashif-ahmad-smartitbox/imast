import React from "react";
import {
  Award,
  ShieldCheck,
  Users,
  Zap,
  Target,
  Server,
  ArrowRight,
} from "lucide-react";

// map icon names to lucide components
const ICON_MAP: Record<string, React.ElementType> = {
  Award,
  ShieldCheck,
  Users,
  Zap,
  Target,
  Server,
};

export type WhyItem = {
  id: string;
  title: string;
  description: string;
  icon?: string; // <-- now just string like "ShieldCheck"
  accent?: string;
};

export type WhySectionData = {
  heading?: string;
  highlight?: string;
  subtitle?: string;
  intro?: string;
  items: WhyItem[];
};

export type ImastWhyChooseSectionProps = {
  data: WhySectionData;
  className?: string;
};

const Card: React.FC<{ item: WhyItem; index: number }> = ({ item, index }) => {
  const IconComponent =
    (item.icon && ICON_MAP[item.icon]) ||
    Object.values(ICON_MAP)[index % Object.keys(ICON_MAP).length];

  return (
    <article
      aria-labelledby={`why-${item.id}-title`}
      className="group relative rounded-2xl bg-white/80 p-6 shadow-sm ring-1 ring-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="absolute -top-4 left-6 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-400 text-white shadow-md">
        {IconComponent && <IconComponent size={20} aria-hidden />}
      </div>

      <h3
        id={`why-${item.id}-title`}
        className="mt-6 text-lg font-semibold text-gray-900"
      >
        {item.title}
      </h3>

      <p className="mt-3 text-sm text-gray-600 leading-relaxed">
        {item.description}
      </p>
    </article>
  );
};

export default function ImastWhyChooseSection({
  data,
  className = "",
}: ImastWhyChooseSectionProps) {
  const {
    heading = "Why choose",
    highlight = "IMAST?",
    subtitle = "IMAST: Two Decades of Excellence, Trust, and Seamless Implementation",
    intro = "Founded by seasoned industry leaders, impeccable solutions, unrivalled client trust, and a team committed to success.",
    items = [],
  } = data || {};

  return (
    <section className={`relative overflow-hidden py-20 ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-30"
      >
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-primary-50 blur-3xl" />
        <div className="absolute right-8 bottom-8 h-96 w-96 rounded-full bg-secondary-50 blur-3xl" />
      </div>

      <img
        src="https://res.cloudinary.com/diefvxqdv/image/upload/v1762095775/imast/media/employee-sec8-img.svg"
        alt=""
        className="absolute top-40 left-28 opacity-25 hidden lg:block"
        loading="lazy"
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="col-span-1">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {heading}{" "}
              <span className="bg-gradient-to-r from-primary-500 to-primary-900 bg-clip-text text-transparent">
                {highlight}
              </span>
            </h2>

            <h4 className="mt-6 text-xl lg:text-2xl font-semibold text-gray-800 leading-relaxed max-w-lg">
              {subtitle}
            </h4>

            <p className="mt-5 text-base text-gray-600 max-w-lg">{intro}</p>

            <div className="mt-8 flex gap-6">
              <div>
                <div className="text-3xl font-bold text-primary-500">20+</div>
                <div className="text-sm text-gray-500">Years Experience</div>
              </div>

              <div>
                <div className="text-3xl font-bold text-primary-500">100+</div>
                <div className="text-sm text-gray-500">Projects Delivered</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((it, idx) => (
                <Card key={it.id} item={it} index={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

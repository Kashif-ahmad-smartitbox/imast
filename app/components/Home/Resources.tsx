"use client";
import React, { useMemo, useState } from "react";
import { Search, Tag, Calendar, BookOpen, ArrowRight } from "lucide-react";

/**
 * Resources.tsx
 * "Resources / Insights / Blog Previews" section
 * - Featured article banner + preview grid
 * - Search + tag/category filters + author/date chips
 * - Load more with simple client-side pagination
 * - Accessible markup and Tailwind styling
 *
 * Replace placeholder images and links with your real content.
 */

type Post = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  author?: string;
  date?: string; // ISO or readable
  readTime?: string;
  slug?: string;
  featured?: boolean;
};

const POSTS: Post[] = [
  {
    id: "p-1",
    title: "How to cut checkout time by 30%: field-tested tactics",
    excerpt:
      "Practical UX and process changes we implemented with a 400-store retail chain.",
    image: "https://placehold.co/1200x720?text=Checkout+optimisation",
    tags: ["Retail", "UX"],
    author: "Rajat Mehta",
    date: "2024-11-12",
    readTime: "6 min",
    slug: "/blog/checkout-optimisation",
    featured: true,
  },
  {
    id: "p-2",
    title: "Distributor routing: 5 levers that actually save fuel",
    excerpt:
      "Route clustering, priority deliveries and micro-optimisations that work in the field.",
    image: "https://placehold.co/1200x720?text=Routing",
    tags: ["Distribution", "Logistics"],
    author: "Anita Rao",
    date: "2025-02-08",
    readTime: "7 min",
    slug: "/blog/route-optimisation",
  },
  {
    id: "p-3",
    title: "Loyalty programs that don't fail: a blueprint",
    excerpt:
      "Design, rewards and measurement — the playbook we use for FMCG customers.",
    image: "https://placehold.co/1200x720?text=Loyalty",
    tags: ["Loyalty", "Marketing"],
    author: "Priya Singh",
    date: "2024-09-10",
    readTime: "8 min",
    slug: "/blog/loyalty-blueprint",
  },
  {
    id: "p-4",
    title: "Integrations checklist: connect POS, ERP and analytics cleanly",
    excerpt:
      "Common pitfalls, mapping templates and deployment tips for systems integration.",
    image: "https://placehold.co/1200x720?text=Integrations",
    tags: ["Integrations", "Tech"],
    author: "Siddharth Kumar",
    date: "2025-03-10",
    readTime: "5 min",
    slug: "/blog/integrations-checklist",
  },
  {
    id: "p-5",
    title: "After-sales success: tightening the service loop",
    excerpt:
      "How to close the loop on returns, warranties and customer claims at scale.",
    image: "https://placehold.co/1200x720?text=After-sales",
    tags: ["After-sales", "Operations"],
    author: "Meera Joshi",
    date: "2024-12-02",
    readTime: "6 min",
    slug: "/blog/after-sales",
  },
];

export default function Resources() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | "All">("All");
  const [count, setCount] = useState(6);

  const tags = useMemo(
    () => ["All", ...Array.from(new Set(POSTS.flatMap((p) => p.tags || [])))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((p) => {
      if (activeTag !== "All" && !(p.tags || []).includes(activeTag))
        return false;
      if (
        q &&
        !`${p.title} ${p.excerpt} ${(p.tags || []).join(" ")}`
          .toLowerCase()
          .includes(q)
      )
        return false;
      return true;
    }).slice(0, count);
  }, [query, activeTag, count]);

  const featured = POSTS.find((p) => p.featured) || POSTS[0];

  return (
    <section
      className="py-16 lg:py-24 bg-white"
      aria-labelledby="resources-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold text-rose-600">Resources</p>
          <h2
            id="resources-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Insights, guides and product updates
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Actionable articles and playbooks from the IMAST team — practical,
            no-nonsense advice for operators.
          </p>
        </header>

        {/* top: featured article */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <article className="lg:col-span-2 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-white">
            <div className="relative">
              <img
                src={featured.image}
                alt={featured.title}
                className="w-full h-[100%] object-cover"
              />

              <div className="absolute left-6 bottom-6 right-6 p-6 rounded-lg bg-gradient-to-t from-black/60 to-transparent">
                <div className="text-xs text-rose-400 font-semibold">
                  Featured
                </div>
                <h3 className="mt-2 text-white text-2xl font-bold">
                  {featured.title}
                </h3>
                <p className="mt-2 text-white/90 max-w-2xl">
                  {featured.excerpt}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <a
                    href={featured.slug}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-gray-900 font-semibold"
                  >
                    Read article <ArrowRight className="w-4 h-4" />
                  </a>
                  <div className="text-sm text-white/80">
                    {featured.author} ·{" "}
                    {new Date(
                      featured.date || "2024-01-01"
                    ).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* right: search & tags */}
          <aside className="space-y-4">
            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <label htmlFor="rs-search" className="sr-only">
                Search resources
              </label>
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  id="rs-search"
                  placeholder="Search articles"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full text-sm outline-none"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold text-gray-800">Tags</div>
                <div className="text-xs text-gray-400">Filter</div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTag(t as string)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      activeTag === t
                        ? "bg-rose-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <Tag className="w-4 h-4 inline-block mr-1" />
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm text-sm">
              <div className="font-semibold text-gray-800">Newsletter</div>
              <div className="mt-2 text-gray-600">
                Get product updates and practical playbooks — once a month.
              </div>
              <form
                className="mt-3 flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Subscribed (demo)");
                }}
              >
                <input
                  placeholder="Email address"
                  className="flex-1 px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none"
                />
                <button className="px-3 py-2 rounded-lg bg-rose-600 text-white text-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
        </div>

        {/* posts grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
        >
          {filtered.map((p) => (
            <article
              key={p.id}
              role="listitem"
              className="bg-white rounded-2xl overflow-hidden hover:shadow-md transition"
            >
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-44 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">{p.tags?.[0]}</div>
                  <div className="text-xs text-gray-400">
                    {new Date(p.date || "2024-01-01").toLocaleDateString()}
                  </div>
                </div>

                <h3 className="mt-2 text-lg font-semibold text-gray-900 leading-snug">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{p.excerpt}</p>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {p.author} · {p.readTime}
                  </div>
                  <a
                    href={p.slug}
                    className="inline-flex items-center gap-2 text-rose-600 font-semibold"
                  >
                    Read <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

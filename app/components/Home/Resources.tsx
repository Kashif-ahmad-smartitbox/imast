"use client";
import React, { useMemo, useState, useCallback } from "react";
import {
  Search,
  Tag,
  Calendar,
  BookOpen,
  ArrowRight,
  Clock,
  User,
} from "lucide-react";

type Post = {
  id: string;
  title: string;
  excerpt: string;
  image?: string;
  tags?: string[];
  author?: string;
  date?: string;
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
    image:
      "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=1200&q=80&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&q=80&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80&auto=format&fit=crop",
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
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80&auto=format&fit=crop",
    tags: ["After-sales", "Operations"],
    author: "Meera Joshi",
    date: "2024-12-02",
    readTime: "6 min",
    slug: "/blog/after-sales",
  },
];

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const FeaturedArticle = ({ post }: { post: Post }) => (
  <article className="lg:col-span-2 rounded-3xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
    <div className="relative ">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute left-6 bottom-6 right-6">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-primary-500 text-white mb-4 shadow-lg">
          Featured
        </span>
        <h3 className="text-white text-3xl font-bold mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-white/95 text-lg mb-4 max-w-2xl">{post.excerpt}</p>

        <div className="flex items-center gap-4 text-white/80 text-sm mb-6">
          {post.author && (
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          )}
          {post.date && (
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </span>
          )}
          {post.readTime && (
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </span>
          )}
        </div>

        <a
          href={post.slug}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-gray-900 font-semibold hover:bg-primary-600 hover:text-white transition-colors duration-300 shadow-lg"
        >
          Read article <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
);

const PostCard = ({ post }: { post: Post }) => (
  <article className="bg-white rounded-2xl overflow-hidden transition-all duration-300 group border border-gray-100">
    <div className="relative overflow-hidden h-56">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <div className="p-6">
      {post.tags && post.tags.length > 0 && (
        <div className="flex gap-2 mb-3">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary-50 text-primary-600"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <h3 className="text-xl font-bold text-gray-900 leading-tight mb-3 group-hover:text-primary-600 transition-colors">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <a
          href={post.slug}
          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm hover:gap-3 transition-all"
        >
          Read <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </article>
);

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => (
  <div className="bg-white rounded-2xl p-4 border border-gray-200 transition-shadow">
    <label htmlFor="rs-search" className="sr-only">
      Search resources
    </label>
    <div className="flex items-center gap-3">
      <Search className="w-5 h-5 text-gray-400" />
      <input
        id="rs-search"
        placeholder="Search articles..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full text-sm outline-none placeholder:text-gray-400"
      />
    </div>
  </div>
);

const TagFilter = ({
  tags,
  activeTag,
  onTagChange,
}: {
  tags: string[];
  activeTag: string;
  onTagChange: (tag: string) => void;
}) => (
  <div className="bg-white rounded-2xl p-5 border border-gray-200">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2">
        <Tag className="w-4 h-4 text-primary-600" />
        Filter by Topic
      </h3>
    </div>

    <div className="flex flex-wrap gap-2">
      {tags.map((t) => (
        <button
          key={t}
          onClick={() => onTagChange(t)}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeTag === t
              ? "bg-primary-600 text-white shadow-md scale-105"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  </div>
);

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (email) {
        alert(`Subscribed: ${email} (demo)`);
        setEmail("");
      }
    },
    [email]
  );

  return (
    <div className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-2xl p-6 border border-primary-100">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-primary-600" />
        <h3 className="font-bold text-gray-900">Newsletter</h3>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Get product updates and practical playbooks — once a month, no spam.
      </p>
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 text-sm outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-200"
        />
        <button
          onClick={handleSubmit}
          className="px-5 py-2 rounded-xl bg-primary-600 text-white text-sm font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default function Resources() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("All");
  const [displayCount, setDisplayCount] = useState(6);

  const allTags = useMemo(
    () => ["All", ...Array.from(new Set(POSTS.flatMap((p) => p.tags || [])))],
    []
  );

  const filteredPosts = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesTag =
        activeTag === "All" || (post.tags || []).includes(activeTag);
      const matchesSearch =
        !searchTerm ||
        `${post.title} ${post.excerpt} ${(post.tags || []).join(" ")}`
          .toLowerCase()
          .includes(searchTerm);
      return matchesTag && matchesSearch;
    });
  }, [query, activeTag]);

  const displayedPosts = useMemo(
    () => filteredPosts.slice(2, displayCount),
    [filteredPosts, displayCount]
  );

  const featuredPost = useMemo(
    () => POSTS.find((p) => p.featured) || POSTS[0],
    []
  );

  const handleLoadMore = useCallback(() => {
    setDisplayCount((prev) => prev + 3);
  }, []);

  return (
    <section
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      aria-labelledby="resources-title"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <header className="mb-8 text-center">
          <p className="text-3xl font-semibold text-primary-600">Resources</p>
          <h2
            id="case-studies-title"
            className="mt-2 text-2xl sm:text-3xl font-extrabold text-gray-900"
          >
            Insights, guides and product updates
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Actionable articles and playbooks from the IMAST team — practical,
            no-nonsense advice for operators.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <FeaturedArticle post={featuredPost} />

          <aside className="space-y-6">
            <SearchBar value={query} onChange={setQuery} />
            <TagFilter
              tags={allTags}
              activeTag={activeTag}
              onTagChange={setActiveTag}
            />
            <Newsletter />
          </aside>
        </div>

        {displayedPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {displayedPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {displayCount < filteredPosts.length && (
              <div className="text-center">
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gray-900 text-white font-semibold hover:bg-primary-600 transition-colors shadow-lg hover:shadow-xl"
                >
                  Load More Articles
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No articles found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

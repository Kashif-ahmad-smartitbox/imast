"use client";

import React, { useEffect, useState, useCallback } from "react";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import { getBlogs, BlogItem } from "@/services/modules/blog";
import { getModule, ModuleResponse } from "@/services/modules/module";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  Clock,
  ArrowRight,
  BookOpen,
  Search,
  Star,
  Eye,
  Tag,
  X,
  Sparkles,
  Bookmark,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const MODULE_IDS = {
  HEADER: "68f49bac620187ec2fdfb66a",
  FOOTER: "68f4a828620187ec2fdfb888",
} as const;

// Constants
const BLOGS_PER_PAGE = 9;
const FEATURED_BLOGS_PER_PAGE = 3;

interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function Blogs() {
  const [headerData, setHeaderData] = useState<ModuleResponse | null>(null);
  const [footerData, setFooterData] = useState<ModuleResponse | null>(null);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNext: false,
    hasPrev: false,
  });

  const fetchPageData = useCallback(
    async (page: number = 1, search: string = "") => {
      try {
        setLoading(true);
        setError(null);

        const [headerResponse, footerResponse, blogsResponse] =
          await Promise.all([
            getModule(MODULE_IDS.HEADER),
            getModule(MODULE_IDS.FOOTER),
            getBlogs({
              status: "published",
              sortBy: "publishedAt",
              sortOrder: "desc",
              page,
              limit: BLOGS_PER_PAGE,
              search: search.trim() || undefined,
            }),
          ]);

        setHeaderData(headerResponse);
        setFooterData(footerResponse);
        setBlogs(blogsResponse.items || []);

        // Update pagination state
        const totalPages = Math.ceil(
          (blogsResponse.total || 0) / BLOGS_PER_PAGE
        );
        setPagination({
          currentPage: page,
          totalPages,
          totalItems: blogsResponse.total || 0,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        });
      } catch (err) {
        console.error("Failed to fetch page data:", err);
        setError(
          err instanceof Error ? err.message : "Failed to load page data"
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchPageData(1, searchQuery);
  }, [fetchPageData, searchQuery]);

  // Handle page change
  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= pagination.totalPages) {
        fetchPageData(newPage, searchQuery);
        // Scroll to top of blog section
        const blogSection = document.getElementById("blog-content-section");
        if (blogSection) {
          blogSection.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [pagination.totalPages, searchQuery, fetchPageData]
  );

  // Get featured blogs from the current page data
  const featuredBlogs = blogs
    .filter((blog) => blog.featured)
    .slice(0, FEATURED_BLOGS_PER_PAGE);

  // Show all blogs in the main grid (including featured ones if they appear in this page)
  const displayBlogs = blogs;

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Reset to first page when search changes
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading Insights...</p>
        </div>
      </div>
    );
  }

  if (error && blogs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream-50">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-lg border border-gray-200">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Failed to load blogs
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => fetchPageData(1, searchQuery)}
            className="px-6 py-3 bg-primary-600 text-white hover:bg-primary-700 transition-all duration-300 rounded-lg font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header data={headerData?.module?.content} />

      <main>
        {/* Classic Hero Section */}
        <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white pt-32 pb-20 -mt-20 relative overflow-hidden">
          {/* Subtle Texture */}
          <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNDUgMTVIMTVWNDVINDVWMTVaTTE1IDE1SDBWMEgxNVYxNVpNNDUgMTVWNDBINjBWMTVINjBINjBINDBaTTE1IDQ1VjYwSDBWNDVIMTVaTTQ1IDQ1SDYwVjYwSDQ1VjQ1WiIgZmlsbD0iI2ZmZiIgZmlsbC1vcGFjaXR5PSIwLjEiLz48L3N2Zz4=')]"></div>

          <div className="container mx-auto px-6 pt-24 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <div className="mb-8">
                <div className="w-20 h-px bg-primary-500 mx-auto mb-6"></div>
                <h1 className="text-5xl font-bold text-white mb-6">
                  Expert Insights
                </h1>
                <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Discover in-depth analysis, industry trends, and professional
                  perspectives from our team of experts.
                </p>
              </div>

              {/* Enhanced Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative group">
                  {/* Main Search Container */}
                  <div
                    className={`relative transition-all duration-500 ${
                      isSearchFocused ? "scale-105" : "scale-100"
                    }`}
                  >
                    {/* Decorative Background Elements */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-primary-500/10 to-purple-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Search Input Container */}
                    <div
                      className={`relative bg-white/10 backdrop-blur-md border transition-all duration-300 rounded-2xl overflow-hidden ${
                        isSearchFocused
                          ? "border-primary-400/50 shadow-lg shadow-primary-500/20"
                          : "border-white/20 group-hover:border-white/30"
                      }`}
                    >
                      <div className="flex items-center">
                        {/* Search Icon */}
                        <div className="pl-6 pr-4 py-5">
                          <div
                            className={`transition-all duration-300 ${
                              isSearchFocused
                                ? "scale-110 text-primary-300"
                                : "text-gray-400"
                            }`}
                          >
                            <Search className="w-6 h-6" />
                          </div>
                        </div>

                        {/* Input Field */}
                        <input
                          type="text"
                          placeholder="Search articles, topics, or insights..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                          className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-400 text-lg py-5 pr-4 w-full"
                        />

                        {/* Search Actions */}
                        <div className="flex items-center gap-2 pr-4">
                          {/* Clear Button */}
                          {searchQuery && (
                            <button
                              onClick={clearSearch}
                              className="p-2 rounded-full hover:bg-white/10 transition-all duration-200 group/clear"
                            >
                              <X className="w-4 h-4 text-gray-400 group-hover/clear:text-white transition-colors" />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Active Search Indicator */}
                      {isSearchFocused && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-purple-400"></div>
                      )}
                    </div>
                  </div>

                  {/* Search Suggestions/Info */}
                  <div
                    className={`mt-4 text-center transition-all duration-300 ${
                      searchQuery || isSearchFocused
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2"
                    }`}
                  >
                    <div className="inline-flex items-center gap-3 text-sm text-gray-400 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                      <Sparkles className="w-4 h-4 text-primary-300" />
                      <span>
                        {searchQuery
                          ? `Found ${pagination.totalItems} ${
                              pagination.totalItems === 1
                                ? "article"
                                : "articles"
                            }`
                          : "Type to search our knowledge base"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
                <span className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-semibold text-white">
                    {pagination.totalItems}
                  </span>
                  {pagination.totalItems === 1 ? " Article" : " Articles"}
                </span>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>Curated Content</span>
                <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                <span>Regular Updates</span>
              </div>
            </div>
          </div>

          {/* Bottom Gradient Transition */}
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-cream-50 to-transparent"></div>
        </section>

        {/* Classic Blog Content Section */}
        <section id="blog-content-section" className="py-16 relative">
          <div className="container mx-auto px-6">
            {/* Featured Posts - Only show if we have featured blogs on this page */}
            {featuredBlogs.length > 0 && (
              <div className="mb-16">
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-4 mb-4">
                    <div className="w-16 h-px bg-gray-300"></div>
                    <Star className="w-5 h-5 text-primary-600" />
                    <div className="w-16 h-px bg-gray-300"></div>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Featured Insights
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Handpicked articles showcasing our most valuable content and
                    expert analysis
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {featuredBlogs.map((blog, index) => (
                    <FeaturedBlogCard
                      key={blog._id}
                      blog={blog}
                      isFirst={index === 0}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* All Blog Posts */}
            <div>
              <div className="text-center mb-12">
                <div className="w-20 h-px bg-gray-300 mx-auto mb-4"></div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {featuredBlogs.length > 0
                    ? "All Articles"
                    : "Latest Articles"}
                </h2>
                <p className="text-gray-600">
                  Browse our complete collection of insights and analysis
                </p>
              </div>

              {displayBlogs.length === 0 && !loading ? (
                <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-300">
                    <BookOpen className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">
                    {searchQuery
                      ? "No matching posts found"
                      : "Content Coming Soon"}
                  </h3>
                  <p className="text-gray-600 max-w-sm mx-auto">
                    {searchQuery
                      ? "Try adjusting your search terms or browse all articles"
                      : "We're crafting valuable insights for you. Stay tuned!"}
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {displayBlogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>

                  {/* Pagination Component */}
                  {pagination.totalPages > 1 && (
                    <Pagination
                      pagination={pagination}
                      onPageChange={handlePageChange}
                      loading={loading}
                    />
                  )}
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer data={footerData?.module?.content} />
    </div>
  );
}

// Pagination Component
const Pagination: React.FC<{
  pagination: PaginationState;
  onPageChange: (page: number) => void;
  loading: boolean;
}> = ({ pagination, onPageChange, loading }) => {
  const { currentPage, totalPages, totalItems, hasNext, hasPrev } = pagination;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 border-t border-gray-200">
      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {(currentPage - 1) * BLOGS_PER_PAGE + 1} to{" "}
        {Math.min(currentPage * BLOGS_PER_PAGE, totalItems)} of {totalItems}{" "}
        articles
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={!hasPrev || loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            !hasPrev || loading
              ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-300"
              : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                disabled={loading}
                className={`min-w-[2.5rem] px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                  currentPage === page
                    ? "bg-primary-600 text-white border-primary-600 shadow-sm"
                    : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={!hasNext || loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
            !hasNext || loading
              ? "opacity-50 cursor-not-allowed text-gray-400 border-gray-300"
              : "text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
          }`}
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

// Enhanced Featured Blog Card Component
const FeaturedBlogCard = ({
  blog,
  isFirst = false,
}: {
  blog: BlogItem;
  isFirst?: boolean;
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${blog.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 hover:border-primary-200 transition-all duration-500 overflow-hidden group-hover:shadow-lg">
        <div className="flex flex-col lg:flex-row h-full">
          {/* Image Container */}
          <div className="lg:w-2/5 relative">
            <div className="aspect-[4/3] lg:aspect-auto lg:h-full relative bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              {blog.cover && !imageError ? (
                <Image
                  src={blog.cover}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={isFirst}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-gray-400" />
                </div>
              )}

              {/* Enhanced Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

              {/* Featured Badge */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/95 backdrop-blur-sm text-primary-700 font-semibold text-sm border border-primary-200 shadow-sm">
                  <Star className="w-4 h-4" />
                  Featured
                </span>
              </div>

              {/* Hover Action Buttons */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <div className="flex gap-2">
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-sm">
                    <Bookmark className="w-4 h-4 text-gray-700" />
                  </button>
                  <button className="p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-sm">
                    <Share2 className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content Container */}
          <div className="lg:w-3/5 p-8 flex flex-col">
            {/* Header with enhanced accent */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-px bg-primary-500"></div>
                  <span className="text-sm font-medium text-primary-700 uppercase tracking-wide">
                    Featured Insight
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>{blog.readingTime} min read</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 flex-wrap">
                {blog.tags?.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 transition-colors duration-300 group-hover:bg-primary-100"
                  >
                    <Tag className="w-3 h-3" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 group-hover:text-primary-700 transition-colors duration-300 leading-tight">
              {blog.title}
            </h3>

            <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-3 flex-1">
              {blog.excerpt || blog.metaDescription}
            </p>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-auto">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-2 font-medium">
                  <Calendar className="w-4 h-4" />
                  {blog.publishedAt
                    ? formatDate(blog.publishedAt)
                    : formatDate(blog.createdAt)}
                </span>
              </div>
              <span className="inline-flex items-center text-primary-700 font-semibold group-hover:text-primary-800 group-hover:translate-x-2 transition-all duration-300">
                Read Full Article
                <ArrowRight className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
};

// Enhanced Regular Blog Card Component
const BlogCard = ({ blog }: { blog: BlogItem }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link href={`/blog/${blog.slug}`} className="block group">
      <article className="bg-white rounded-xl border border-gray-200 hover:border-primary-200 transition-all duration-300 overflow-hidden h-full flex flex-col group-hover:shadow-lg">
        {/* Image Container */}
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {blog.cover && !imageError ? (
            <Image
              src={blog.cover}
              alt={blog.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-gray-400" />
            </div>
          )}

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-300" />

          {/* Reading Time Badge */}
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-black/80 backdrop-blur-sm text-white text-xs font-medium border border-white/20">
              <Clock className="w-3 h-3" />
              {blog.readingTime} min
            </span>
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
            <div className="flex gap-1">
              <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-sm">
                <Bookmark className="w-3 h-3 text-gray-700" />
              </button>
              <button className="p-1.5 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-colors duration-200 shadow-sm">
                <Share2 className="w-3 h-3 text-gray-700" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 flex-1 flex flex-col">
          {/* Meta Information */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              {blog.tags?.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-200 transition-colors duration-300 group-hover:bg-primary-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300 leading-tight line-clamp-2 flex-1">
            {blog.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed flex-1">
            {blog.excerpt || blog.metaDescription}
          </p>

          <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-200 mt-auto">
            <span className="font-medium flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {blog.publishedAt
                ? formatDate(blog.publishedAt)
                : formatDate(blog.createdAt)}
            </span>
            <span className="inline-flex items-center text-primary-700 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 font-semibold">
              Read
              <ArrowRight className="w-3 h-3 ml-1 group-hover:scale-110 transition-transform" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Blogs;

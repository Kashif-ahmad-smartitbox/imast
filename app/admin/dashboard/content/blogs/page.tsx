"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FileText,
  Plus,
  Edit3,
  Eye,
  Search,
  RefreshCw,
  Calendar,
  Link,
} from "lucide-react";
import { getBlogs, BlogItem } from "@/app/services/modules/blogModule";
import CommonDashHeader from "@/app/components/common/CommonDashHeader";
import { useRouter } from "next/navigation";

type FetchResult = { items: BlogItem[] };

const formatDate = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

const StatusBadge: React.FC<{ status: string }> = React.memo(({ status }) => {
  const isPublished = status === "published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${
        isPublished
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-gray-50 text-gray-600 border border-gray-200"
      }`}
      aria-live="polite"
    >
      <span
        className={`w-2 h-2 rounded-full ${
          isPublished ? "bg-green-500" : "bg-gray-400"
        }`}
        aria-hidden
      />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
});
StatusBadge.displayName = "StatusBadge";

const SkeletonList: React.FC = () => (
  <div className="bg-white rounded-xl border border-gray-200 p-8">
    <div className="animate-pulse space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <div className="w-5 h-5 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const BlogRow: React.FC<{
  blog: BlogItem;
  onEdit: (id: string) => void;
  onView: (blog: BlogItem) => void;
}> = ({ blog, onEdit, onView }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{blog.title}</div>
            <div className="text-xs text-gray-500">by {blog.author || "—"}</div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-gray-600">
          <Link className="w-3 h-3" />/{blog.slug || blog._id}
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={blog.status} />
      </td>

      <td className="px-6 py-4 text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(blog.updatedAt)}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title={`View ${blog.title}`}
            aria-label={`View ${blog.title}`}
            onClick={() => onView(blog)}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEdit(blog._id)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title={`Edit ${blog.title}`}
            aria-label={`Edit ${blog.title}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Blogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const router = useRouter();

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = (await getBlogs()) as FetchResult;
      setBlogs(res.items || []);
    } catch (err: any) {
      console.error("Failed to load blogs:", err);
      setError(
        err?.message || "Failed to fetch blogs. Check console and try again."
      );
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const filteredBlogs = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return blogs.filter((b) => {
      const matchesSearch =
        !q ||
        b.title.toLowerCase().includes(q) ||
        (b.slug || "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, searchTerm, statusFilter]);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/admin/blogs/${id}/edit`);
    },
    [router]
  );

  const handleView = useCallback(
    (blog: BlogItem) => {
      const publicPath = blog.slug
        ? `/blog/${blog.slug}`
        : `/blog/id/${blog._id}`;
      if (typeof window !== "undefined") {
        window.open(publicPath, "_blank", "noopener,noreferrer");
      } else {
        router.push(publicPath);
      }
    },
    [router]
  );

  const handleCreateBlog = useCallback(
    () => router.push("/admin/blogs/new"),
    [router]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CommonDashHeader
          title="Blog Management"
          description="Create, edit and publish blog posts."
        />
        <div className="flex items-center gap-3">
          <button
            onClick={fetchBlogs}
            className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
              loading ? "opacity-60 cursor-wait" : ""
            }`}
            title="Refresh"
            aria-label="Refresh blogs"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleCreateBlog}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create Blog</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none bg-white transition-all duration-200"
              aria-label="Search blogs"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg outline-none transition-colors cursor-pointer text-sm font-medium text-gray-700 hover:border-gray-400 min-w-[140px]"
                aria-label="Filter by status"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-600 mb-2">{error}</div>
          <button
            onClick={fetchBlogs}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredBlogs.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {filteredBlogs.length}{" "}
                {filteredBlogs.length === 1 ? "post" : "posts"}
              </div>
            </div>
          )}

          {loading ? (
            <SkeletonList />
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredBlogs.map((b) => (
                      <BlogRow
                        key={b._id}
                        blog={b}
                        onEdit={handleEdit}
                        onView={handleView}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredBlogs.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {blogs.length === 0 ? "No blog posts" : "No matching posts"}
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    {blogs.length === 0
                      ? "Create your first blog post to start sharing content."
                      : "Try adjusting your search or filter to find what you're looking for."}
                  </p>
                  <button
                    onClick={handleCreateBlog}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Post
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Blogs;

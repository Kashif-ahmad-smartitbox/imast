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
import { getStories, StoryItem } from "@/app/services/modules/story";
import CommonDashHeader from "@/app/components/common/CommonDashHeader";
import { useRouter } from "next/navigation";

type FetchResult = { items: StoryItem[] };

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

const StoryRow: React.FC<{
  story: StoryItem;
  onEdit: (id: string) => void;
  onView: (story: StoryItem) => void;
}> = ({ story, onEdit, onView }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors group">
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center">
            <FileText className="w-4 h-4 text-primary-600" />
          </div>
          <div>
            <div className="font-medium text-gray-900">{story.title}</div>
            <div className="text-xs text-gray-500">
              by {story.author || "—"}
            </div>
          </div>
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center gap-1 text-gray-600">
          <Link className="w-3 h-3" />/{story.slug || story._id}
        </div>
      </td>

      <td className="px-6 py-4">
        <StatusBadge status={story.status} />
      </td>

      <td className="px-6 py-4 text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          {formatDate(story.updatedAt)}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            title={`View ${story.title}`}
            aria-label={`View ${story.title}`}
            onClick={() => onView(story)}
          >
            <Eye className="w-4 h-4" />
          </button>

          <button
            onClick={() => onEdit(story._id)}
            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
            title={`Edit ${story.title}`}
            aria-label={`Edit ${story.title}`}
          >
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

const Stories: React.FC = () => {
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const router = useRouter();

  const fetchStories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = (await getStories()) as FetchResult;
      setStories(res.items || []);
    } catch (err: any) {
      console.error("Failed to load stories:", err);
      setError(
        err?.message || "Failed to fetch stories. Check console and try again."
      );
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  const filteredStories = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return stories.filter((s) => {
      const matchesSearch =
        !q ||
        s.title.toLowerCase().includes(q) ||
        (s.slug || "").toLowerCase().includes(q);
      const matchesStatus = statusFilter === "all" || s.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [stories, searchTerm, statusFilter]);

  const handleEdit = useCallback(
    (id: string) => {
      router.push(`/admin/stories/${id}/edit`);
    },
    [router]
  );

  const handleView = useCallback(
    (story: StoryItem) => {
      const publicPath = story.slug
        ? `/stories/${story.slug}`
        : `/stories/id/${story._id}`;
      if (typeof window !== "undefined") {
        window.open(publicPath, "_blank", "noopener,noreferrer");
      } else {
        router.push(publicPath);
      }
    },
    [router]
  );

  const handleCreateStory = useCallback(
    () => router.push("/admin/stories/new"),
    [router]
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CommonDashHeader
          title="Stories"
          description="Create and manage stories for the website."
        />
        <div className="flex items-center gap-3">
          <button
            onClick={fetchStories}
            className={`p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors ${
              loading ? "opacity-60 cursor-wait" : ""
            }`}
            title="Refresh"
            aria-label="Refresh stories"
            disabled={loading}
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleCreateStory}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg"
          >
            <Plus className="w-4 h-4" />
            <span>Create Story</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl outline-none bg-white transition-all duration-200"
              aria-label="Search stories"
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
            onClick={fetchStories}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredStories.length > 0 && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-500">
                {filteredStories.length}{" "}
                {filteredStories.length === 1 ? "story" : "stories"}
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
                    {filteredStories.map((s) => (
                      <StoryRow
                        key={s._id}
                        story={s}
                        onEdit={handleEdit}
                        onView={handleView}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStories.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {stories.length === 0
                      ? "No stories"
                      : "No matching stories"}
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    {stories.length === 0
                      ? "Create your first story to start sharing."
                      : "Try adjusting your search or filter to find what you're looking for."}
                  </p>
                  <button
                    onClick={handleCreateStory}
                    className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Create New Story
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

export default Stories;

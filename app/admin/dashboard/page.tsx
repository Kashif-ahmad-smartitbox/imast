"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  FileText,
  Image,
  TrendingUp,
  Settings,
  Activity as ActivityIcon,
  ArrowUp,
  ArrowDown,
  Calendar,
  RefreshCw,
} from "lucide-react";
import CommonDashHeader from "@/app/components/common/CommonDashHeader";
import DashboardApi, {
  DashboardResult,
} from "@/app/services/modules/dashboard";

const Overview: React.FC = () => {
  const [data, setData] = useState<DashboardResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async (showRefresh = false) => {
    try {
      if (showRefresh) setRefreshing(true);
      const res = await DashboardApi.get();
      setData(res);
    } catch (err) {
      console.error("Dashboard load failed:", err);
    } finally {
      setLoading(false);
      if (showRefresh) setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        <p className="text-gray-500 text-lg font-medium">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <ActivityIcon className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900">
          Failed to load data
        </h3>
        <p className="text-gray-500 max-w-md">
          We couldn&apos;t load your dashboard data. Please check your
          connection and try again.
        </p>
        <button
          onClick={() => loadData()}
          className="mt-4 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Subscribers",
      value: data.totals.totalUsers.toLocaleString(),
      change: "+12%",
      changeType: "positive" as const,
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Published Pages",
      value: data.totals.publishedPages.toLocaleString(),
      change: "+3%",
      changeType: "positive" as const,
      icon: FileText,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "Media Library",
      value: data.totals.mediaItems.toLocaleString(),
      change: "+8%",
      changeType: "positive" as const,
      icon: Image,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Site Performance",
      value: "98.2%",
      change: "+0.5%",
      changeType: "positive" as const,
      icon: TrendingUp,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  const activities = data.recentActivity;

  const getIconForType = (type: string) => {
    switch (type) {
      case "subscriber_joined":
        return { icon: Users, color: "text-blue-600 bg-blue-50" };
      case "page_published":
      case "page_updated":
        return { icon: FileText, color: "text-green-600 bg-green-50" };
      case "media_uploaded":
        return { icon: Image, color: "text-purple-600 bg-purple-50" };
      case "story_published":
        return { icon: ActivityIcon, color: "text-orange-600 bg-orange-50" };
      default:
        return { icon: Settings, color: "text-gray-600 bg-gray-50" };
    }
  };

  const formatTimeAgo = (dateStr: string) => {
    const diffMs = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diffMs / 60000);
    if (mins < 1) return "just now";
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const getActivityDescription = (activity: any) => {
    switch (activity.type) {
      case "subscriber_joined":
        return `New subscriber: ${activity.title}`;
      case "page_published":
        return `Published: ${activity.title}`;
      case "page_updated":
        return `Updated: ${activity.title}`;
      case "media_uploaded":
        return `Uploaded: ${activity.title}`;
      case "story_published":
        return `Published story: ${activity.title}`;
      default:
        return activity.title;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <CommonDashHeader
          title="Dashboard Overview"
          description="A quick summary of your site's performance and recent activity."
        />
        <button
          onClick={() => loadData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw
            className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`}
          />
          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Stats Grid */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="relative bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-all duration-300 group overflow-hidden"
          >
            {/* Background accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600"></div>

            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>

            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === "positive"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {stat.changeType === "positive" ? (
                <ArrowUp className="w-4 h-4" />
              ) : (
                <ArrowDown className="w-4 h-4" />
              )}
              {stat.change} from last month
            </div>
          </div>
        ))}
      </section>

      {/* Activity Section */}
      <section className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Latest updates from your site
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              Last 30 days
            </div>
          </div>
        </div>

        <div className="p-6">
          {activities.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ActivityIcon className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No activity yet
              </h3>
              <p className="text-gray-500 max-w-sm mx-auto">
                Your recent activity will appear here once you start using the
                platform.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity, i) => {
                const { icon: Icon, color } = getIconForType(activity.type);
                return (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-200 group"
                  >
                    <div className={`p-3 rounded-lg ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {getActivityDescription(activity)}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(activity.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 font-medium bg-gray-100 px-2 py-1 rounded">
                        {formatTimeAgo(activity.createdAt)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Overview;

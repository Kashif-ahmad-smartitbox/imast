"use client";

import React from "react";
import {
  Users,
  FileText,
  Image,
  TrendingUp,
  Settings,
  Activity,
} from "lucide-react";
import CommonDashHeader from "@/app/components/common/CommonDashHeader";

const stats = [
  {
    label: "Total Users",
    value: "1,245",
    change: "+12%",
    icon: Users,
  },
  {
    label: "Published Pages",
    value: "58",
    change: "+3%",
    icon: FileText,
  },
  {
    label: "Media Items",
    value: "302",
    change: "+8%",
    icon: Image,
  },
  {
    label: "Monthly Traffic",
    value: "24.3K",
    change: "+15%",
    icon: TrendingUp,
  },
];

const activities = [
  {
    icon: FileText,
    title: "New page published",
    time: "30 minutes ago",
  },
  {
    icon: Image,
    title: "Image uploaded to media library",
    time: "1 hour ago",
  },
  {
    icon: Settings,
    title: "Admin updated site settings",
    time: "3 hours ago",
  },
];

const Overview: React.FC = () => {
  return (
    <div className="space-y-8">
      <CommonDashHeader
        title="Dashboard Overview"
        description="A quick summary of your site’s performance and recent activity."
      />
      {/* Stats Section */}
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-gray-500 font-medium">
                {stat.label}
              </div>
              <stat.icon className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-sm text-emerald-600 font-medium">
              {stat.change} from last month
            </div>
          </div>
        ))}
      </section>

      {/* Activity Section */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h2>
        <ul className="divide-y divide-gray-100">
          {activities.map((activity, i) => (
            <li
              key={i}
              className="flex items-center justify-between py-3 hover:bg-gray-50 rounded-lg px-2 transition-colors"
            >
              <div className="flex items-center gap-3">
                <activity.icon className="w-5 h-5 text-primary-600" />
                <span className="text-gray-700 text-sm font-medium">
                  {activity.title}
                </span>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Overview;

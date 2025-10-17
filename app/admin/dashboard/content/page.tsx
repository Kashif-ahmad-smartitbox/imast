"use client";

import React from "react";
import { FileText, Plus, Edit3, Trash2, Eye, Globe } from "lucide-react";

const mockPages = [
  {
    id: 1,
    title: "Home Page",
    slug: "/",
    status: "Published",
    lastUpdated: "Oct 6, 2025",
  },
  {
    id: 2,
    title: "About Us",
    slug: "/about",
    status: "Draft",
    lastUpdated: "Oct 3, 2025",
  },
  {
    id: 3,
    title: "Blog",
    slug: "/blog",
    status: "Published",
    lastUpdated: "Sep 28, 2025",
  },
  {
    id: 4,
    title: "Contact",
    slug: "/contact",
    status: "Published",
    lastUpdated: "Sep 22, 2025",
  },
];

const Content: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Content Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage and organize all website pages from one place.
          </p>
        </div>
        <button
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2.5 rounded-xl shadow-sm hover:bg-primary-700 transition-colors text-sm font-medium"
          aria-label="Add new page"
        >
          <Plus className="w-4 h-4" />
          New Page
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 text-xs uppercase">
            <tr>
              <th className="px-6 py-3 font-medium">Title</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Last Updated</th>
              <th className="px-6 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockPages.map((page) => (
              <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-gray-400" />
                  {page.title}
                </td>
                <td className="px-6 py-3 text-gray-600">{page.slug}</td>
                <td className="px-6 py-3">
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      page.status === "Published"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {page.status}
                  </span>
                </td>
                <td className="px-6 py-3 text-gray-500">{page.lastUpdated}</td>
                <td className="px-6 py-3 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="View"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Publish"
                    >
                      <Globe className="w-4 h-4" />
                    </button>
                    <button
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-primary-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {mockPages.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            No pages found. Create your first page to get started.
          </div>
        )}
      </div>
    </div>
  );
};

export default Content;

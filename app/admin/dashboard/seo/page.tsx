"use client";

import React, { useState } from "react";
import { Globe, Save, RefreshCcw, Link, Share2 } from "lucide-react";

const Seo: React.FC = () => {
  const [seoSettings, setSeoSettings] = useState({
    siteTitle: "Imast - AI-Powered Platform",
    siteDescription:
      "Imast is an intelligent platform that helps you manage and deploy your website effortlessly.",
    keywords: "imast, ai, automation, web management, dashboard",
    canonicalUrl: "https://imast.ai",
    socialImage: "/default-social.png",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSeoSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saved SEO Settings:", seoSettings);
    alert("SEO settings saved (demo mode).");
  };

  const handleReset = () => {
    if (confirm("Reset all SEO fields to default values?")) {
      setSeoSettings({
        siteTitle: "Imast - AI-Powered Platform",
        siteDescription:
          "Imast is an intelligent platform that helps you manage and deploy your website effortlessly.",
        keywords: "imast, ai, automation, web management, dashboard",
        canonicalUrl: "https://imast.ai",
        socialImage: "/default-social.png",
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            SEO Management
          </h1>
          <p className="text-sm text-gray-500">
            Manage global SEO settings, metadata, and social preview for your
            site.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-sm font-medium"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-xl shadow-sm hover:bg-primary-700 text-sm font-medium"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* SEO Form */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Meta Information
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label
              htmlFor="siteTitle"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Site Title
            </label>
            <input
              id="siteTitle"
              name="siteTitle"
              type="text"
              value={seoSettings.siteTitle}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label
              htmlFor="canonicalUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Canonical URL
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Link className="w-4 h-4 text-gray-400" />
              <input
                id="canonicalUrl"
                name="canonicalUrl"
                type="url"
                value={seoSettings.canonicalUrl}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
              />
            </div>
          </div>
        </div>

        <div>
          <label
            htmlFor="siteDescription"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="siteDescription"
            name="siteDescription"
            value={seoSettings.siteDescription}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label
            htmlFor="keywords"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Keywords
          </label>
          <input
            id="keywords"
            name="keywords"
            type="text"
            value={seoSettings.keywords}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            Separate keywords with commas.
          </p>
        </div>
      </section>

      {/* Social Preview */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Social Preview
          </h2>
          <button className="inline-flex items-center gap-2 text-sm text-primary-600 hover:underline">
            <Share2 className="w-4 h-4" />
            Update Social Image
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-48 h-28 bg-gray-50 border border-gray-100 rounded-xl overflow-hidden flex items-center justify-center">
            <img
              src={seoSettings.socialImage}
              alt="Social preview"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {seoSettings.siteTitle}
            </div>
            <div className="text-xs text-gray-500 line-clamp-2">
              {seoSettings.siteDescription}
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
              <Globe className="w-3 h-3" />
              {seoSettings.canonicalUrl}
            </div>
          </div>
        </div>
      </section>

      {/* Sitemap Settings */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Sitemap & Indexing
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-700 font-medium">
              Sitemap URL:
              <span className="text-gray-500 ml-1">
                {seoSettings.canonicalUrl}/sitemap.xml
              </span>
            </p>
            <p className="text-xs text-gray-400 mt-1">
              Ensure this file is accessible to search engines.
            </p>
          </div>
          <button className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-sm font-medium">
            <RefreshCcw className="w-4 h-4" />
            Regenerate
          </button>
        </div>
      </section>
    </div>
  );
};

export default Seo;

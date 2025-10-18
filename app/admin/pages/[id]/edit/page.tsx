"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getPage,
  getPageWithContent,
  updatePage,
} from "@/app/services/modules/pageModule";
import { updateModule } from "@/services/modules/module";
import {
  Save,
  Edit3,
  X,
  CheckCircle,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Settings,
  Layers,
  Calendar,
  Link,
  FileText,
  Eye,
  Code,
  RefreshCw,
  Search,
  ArrowLeft,
  Info,
  Globe,
  Type,
  Hash,
  FileCode,
} from "lucide-react";

// ────────────────────────────────
// Types
// ────────────────────────────────
type PageStatus = "draft" | "published" | "scheduled";

interface PageFields {
  title: string;
  slug: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  status: PageStatus;
  publishedAt?: string;
}

interface Module {
  _id: string;
  title: string;
  type: string;
  content: any;
}

interface PageLayoutItem {
  module: Module;
}

interface PageData {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  status: PageStatus;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  layout?: PageLayoutItem[];
}

interface UpdateMessage {
  type: "success" | "error";
  text: string;
}

// ────────────────────────────────
// Input Components
// ────────────────────────────────
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: "text" | "textarea" | "datetime-local";
  icon?: React.ReactNode;
  fullWidth?: boolean;
  helperText?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  icon,
  fullWidth = false,
  helperText,
  error,
}) => {
  const baseClasses = `
    w-full border rounded-xl px-4 py-3.5 text-sm outline-none focus:border-primary-500 
    transition-all duration-200 bg-white placeholder-gray-400
    ${
      error
        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
        : "border-gray-300"
    }
    ${icon ? "pl-11" : "pl-4"}
  `;

  return (
    <div className={fullWidth ? "col-span-full" : ""}>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        {type === "textarea" ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={4}
            className={`${baseClasses} resize-none`}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            required={required}
            className={baseClasses}
          />
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <AlertCircle className="w-4 h-4" />
          {error}
        </p>
      )}

      {helperText && !error && (
        <p className="mt-2 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  icon?: React.ReactNode;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  value,
  onChange,
  options,
  icon,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`
            w-full border border-gray-300 rounded-xl px-4 py-3.5 text-sm focus:ring-2 focus:ring-primary-500 
            focus:border-primary-500 transition-all duration-200 bg-white appearance-none
            ${icon ? "pl-11" : "pl-4"}
          `}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

// ────────────────────────────────
// Main Component
// ────────────────────────────────
export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // ────────────────────────────────
  // State Management
  // ────────────────────────────────
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [pageFields, setPageFields] = useState<PageFields>({
    title: "",
    slug: "",
    excerpt: "",
    metaTitle: "",
    metaDescription: "",
    canonicalUrl: "",
    status: "draft",
    publishedAt: "",
  });

  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof PageFields, string>>
  >({});
  const [updatingPage, setUpdatingPage] = useState(false);
  const [updateMsg, setUpdateMsg] = useState<UpdateMessage | null>(null);
  const [activeTab, setActiveTab] = useState<"settings" | "modules">(
    "settings"
  );

  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [savingModule, setSavingModule] = useState(false);
  const [moduleMsg, setModuleMsg] = useState<UpdateMessage | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedModules, setExpandedModules] = useState<Set<string>>(
    new Set()
  );

  // ────────────────────────────────
  // Data Fetching
  // ────────────────────────────────
  const getPageData = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    setError(null);

    try {
      const base = await getPage(id);
      const slug = base?.page?.slug;

      if (!slug) {
        throw new Error("Page slug not found");
      }

      let fullPageData: PageData | null = null;

      try {
        const full = await getPageWithContent(slug);
        fullPageData = full.page;
      } catch (err) {
        console.log("getPageWithContent failed, using base page data");
        fullPageData = {
          ...base.page,
          layout: [],
        };
      }

      const page = fullPageData || base.page;

      setPageData(page);
      setPageFields({
        title: page.title || "",
        slug: page.slug || "",
        excerpt: page.excerpt || "",
        metaTitle: page.metaTitle || "",
        metaDescription: page.metaDescription || "",
        canonicalUrl: page.canonicalUrl || "",
        status: (page.status as PageStatus) || "draft",
        publishedAt: page.publishedAt
          ? new Date(page.publishedAt).toISOString().slice(0, 16)
          : "",
      });
    } catch (err: any) {
      setError(err.message || "Failed to load page");
      console.error("Error fetching page:", err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getPageData();
  }, [getPageData]);

  // ────────────────────────────────
  // Validation
  // ────────────────────────────────
  const validateFields = (): boolean => {
    const errors: Partial<Record<keyof PageFields, string>> = {};

    if (!pageFields.title.trim()) {
      errors.title = "Title is required";
    }

    if (!pageFields.slug.trim()) {
      errors.slug = "Slug is required";
    } else if (!/^[a-z0-9-]+$/.test(pageFields.slug)) {
      errors.slug =
        "Slug can only contain lowercase letters, numbers, and hyphens";
    }

    if (
      pageFields.canonicalUrl &&
      !/^https?:\/\/.+\..+/.test(pageFields.canonicalUrl)
    ) {
      errors.canonicalUrl = "Please enter a valid URL";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ────────────────────────────────
  // Page Update
  // ────────────────────────────────
  const handlePageUpdate = async () => {
    if (!validateFields()) {
      setUpdateMsg({ type: "error", text: "Please fix the errors above" });
      return;
    }

    setUpdatingPage(true);
    setUpdateMsg(null);

    try {
      let canonicalUrl = pageFields.canonicalUrl?.trim() || undefined;
      if (canonicalUrl && !/^https?:\/\//i.test(canonicalUrl)) {
        canonicalUrl = `https://${canonicalUrl}`;
      }

      await updatePage(id, {
        title: pageFields.title.trim(),
        slug: pageFields.slug.trim(),
        excerpt: pageFields.excerpt?.trim() || undefined,
        metaTitle: pageFields.metaTitle?.trim() || undefined,
        metaDescription: pageFields.metaDescription?.trim() || undefined,
        canonicalUrl,
        status: pageFields.status,
        publishedAt: pageFields.publishedAt
          ? new Date(pageFields.publishedAt).toISOString()
          : null,
      });

      setUpdateMsg({ type: "success", text: "Page updated successfully!" });
      await getPageData();
    } catch (err: any) {
      setUpdateMsg({
        type: "error",
        text: err.message || "Failed to update page",
      });
    } finally {
      setUpdatingPage(false);
    }
  };

  // ────────────────────────────────
  // Module Management
  // ────────────────────────────────
  const startEdit = (module: Module) => {
    setEditingModuleId(module._id);
    setEditContent(JSON.stringify(module.content, null, 2));
    setModuleMsg(null);
  };

  const cancelEdit = () => {
    setEditingModuleId(null);
    setEditContent("");
  };

  const handleModuleUpdate = async (
    moduleId: string,
    type: string,
    title: string
  ) => {
    setSavingModule(true);
    setModuleMsg(null);

    try {
      const parsed = JSON.parse(editContent);
      await updateModule(moduleId, { type, title, content: parsed });
      setModuleMsg({ type: "success", text: "Module updated successfully!" });
      setEditingModuleId(null);
      await getPageData();
    } catch (err: any) {
      setModuleMsg({
        type: "error",
        text: err.message || "Failed to update module - check JSON format",
      });
    } finally {
      setSavingModule(false);
    }
  };

  const toggleModuleExpansion = (moduleId: string) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleId)) {
      newExpanded.delete(moduleId);
    } else {
      newExpanded.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };

  // ────────────────────────────────
  // Computed Values
  // ────────────────────────────────
  const filteredModules =
    pageData?.layout?.filter((item: PageLayoutItem) => {
      const moduleData = item.module;
      const searchLower = searchTerm.toLowerCase();

      return (
        moduleData.title?.toLowerCase().includes(searchLower) ||
        moduleData.type?.toLowerCase().includes(searchLower) ||
        JSON.stringify(moduleData.content).toLowerCase().includes(searchLower)
      );
    }) || [];

  const isDraftWithoutModules =
    pageFields.status === "draft" &&
    (!pageData?.layout || pageData.layout.length === 0);

  const moduleCount = pageData?.layout?.length || 0;

  // ────────────────────────────────
  // Loading State
  // ────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <RefreshCw className="w-8 h-8 text-white animate-spin" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Loading Page</h3>
          <p className="text-gray-500 max-w-sm">
            Fetching page details and content...
          </p>
        </div>
      </div>
    );
  }

  // ────────────────────────────────
  // Error State
  // ────────────────────────────────
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-md text-center">
          <div className="mx-auto w-24 h-24 bg-red-100 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Unable to Load Page
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={getPageData}
              className="px-8 py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold flex items-center gap-3 shadow-lg shadow-primary-600/25"
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <button
              onClick={() => router.back()}
              className="px-8 py-3.5 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold flex items-center gap-3 border border-gray-300 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <FileText className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-500 mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <button
            onClick={() => router.back()}
            className="px-8 py-3.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold"
          >
            Return to Previous Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* HEADER */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-3 hover:bg-white rounded-xl transition-all duration-200 border border-gray-200 bg-white/50 backdrop-blur-sm"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>

              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight line-clamp-1 capitalize">
                  {pageFields.title || "Untitled Page"}
                </h1>

                <div className="flex items-center gap-4 mt-3">
                  <span
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold capitalize border ${
                      pageFields.status === "published"
                        ? "bg-green-100 text-green-800 border-green-200"
                        : pageFields.status === "scheduled"
                        ? "bg-blue-100 text-blue-800 border-blue-200"
                        : "bg-gray-100 text-gray-800 border-gray-200"
                    }`}
                  >
                    {pageFields.status}
                  </span>

                  <p className="text-gray-600 text-sm flex items-center gap-2">
                    <Hash className="w-4 h-4" />
                    Slug:{" "}
                    <span className="font-mono bg-gray-100 px-3 py-1.5 rounded-lg text-gray-800 border">
                      /{pageData.slug}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-white rounded-2xl border border-gray-200 p-2">
              <button
                onClick={() => setActiveTab("settings")}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === "settings"
                    ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Settings className="w-4 h-4" />
                Page Settings
              </button>

              <button
                onClick={() => setActiveTab("modules")}
                disabled={isDraftWithoutModules}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  activeTab === "modules"
                    ? "bg-primary-500 text-white shadow-md shadow-primary-500/25"
                    : isDraftWithoutModules
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                <Layers className="w-4 h-4" />
                Modules ({moduleCount})
                {isDraftWithoutModules && (
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md ml-2">
                    Publish to view
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* SIDEBAR */}
          <div className="xl:col-span-1 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button
                  onClick={getPageData}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh Data
                </button>

                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={pageFields.status !== "published"}
                >
                  <Eye className="w-4 h-4" />
                  View Live Page
                  {pageFields.status !== "published" && (
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-md ml-auto">
                      {pageFields.status}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Page Status
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Last Updated</p>
                  <p className="text-sm font-medium text-gray-900">
                    {pageData.updatedAt
                      ? new Date(pageData.updatedAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )
                      : "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="text-sm font-medium text-gray-900">
                    {pageData.createdAt
                      ? new Date(pageData.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )
                      : "Unknown"}
                  </p>
                </div>

                {isDraftWithoutModules && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800 font-medium">
                      Modules are only available for published pages
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* MAIN CONTENT */}
          <div className="xl:col-span-3">
            {/* PAGE SETTINGS */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Settings className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Page Settings
                      </h2>
                      <p className="text-gray-500">
                        Manage your page details, SEO settings, and publication
                        status
                      </p>
                    </div>
                  </div>
                </div>

                {/* Form Content */}
                <div className="p-8 space-y-8">
                  {/* Basic Information */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Type className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Basic Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Title"
                        value={pageFields.title}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, title: value })
                        }
                        placeholder="Enter page title"
                        required
                        icon={<Type className="w-4 h-4" />}
                        error={fieldErrors.title}
                      />

                      <InputField
                        label="Slug"
                        value={pageFields.slug}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, slug: value })
                        }
                        placeholder="page-slug"
                        required
                        icon={<Hash className="w-4 h-4" />}
                        error={fieldErrors.slug}
                        helperText="Use lowercase letters, numbers, and hyphens only"
                      />

                      <InputField
                        label="Excerpt"
                        value={pageFields.excerpt || ""}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, excerpt: value })
                        }
                        placeholder="Brief description of your page"
                        type="textarea"
                        fullWidth
                      />
                    </div>
                  </section>

                  {/* SEO Settings */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Globe className="w-4 h-4 text-green-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        SEO Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        label="Meta Title"
                        value={pageFields.metaTitle || ""}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, metaTitle: value })
                        }
                        placeholder="SEO title for search engines"
                        icon={<Type className="w-4 h-4" />}
                        helperText="Recommended: 50-60 characters"
                      />

                      <InputField
                        label="Meta Description"
                        value={pageFields.metaDescription || ""}
                        onChange={(value) =>
                          setPageFields({
                            ...pageFields,
                            metaDescription: value,
                          })
                        }
                        placeholder="SEO description for search engines"
                        type="textarea"
                        fullWidth
                        helperText="Recommended: 150-160 characters"
                      />

                      <InputField
                        label="Canonical URL"
                        value={pageFields.canonicalUrl || ""}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, canonicalUrl: value })
                        }
                        placeholder="https://yourwebsite.com/page"
                        fullWidth
                        icon={<Link className="w-4 h-4" />}
                        error={fieldErrors.canonicalUrl}
                        helperText="The preferred version of this page for SEO"
                      />
                    </div>
                  </section>

                  {/* Publication Settings */}
                  <section className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-purple-600" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Publication Settings
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <SelectField
                        label="Status"
                        value={pageFields.status}
                        onChange={(value) =>
                          setPageFields({
                            ...pageFields,
                            status: value as PageStatus,
                          })
                        }
                        options={[
                          { value: "draft", label: "Draft" },
                          { value: "published", label: "Published" },
                          { value: "scheduled", label: "Scheduled" },
                        ]}
                        icon={<Calendar className="w-4 h-4" />}
                      />

                      <InputField
                        label="Published At"
                        value={pageFields.publishedAt || ""}
                        onChange={(value) =>
                          setPageFields({ ...pageFields, publishedAt: value })
                        }
                        type="datetime-local"
                        icon={<Calendar className="w-4 h-4" />}
                      />
                    </div>

                    {isDraftWithoutModules && (
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl">
                        <div className="flex items-start gap-3">
                          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-1">
                              Modules Visibility
                            </h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              Modules are only visible and editable when the
                              page is published. Change the status to
                              &quot;Published&quot; to view and manage modules.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </section>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-white px-8 py-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      {updateMsg && (
                        <div
                          className={`flex items-center gap-3 p-4 rounded-xl border ${
                            updateMsg.type === "success"
                              ? "bg-green-50 text-green-800 border-green-200"
                              : "bg-red-50 text-red-800 border-red-200"
                          }`}
                        >
                          {updateMsg.type === "success" ? (
                            <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          ) : (
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          )}
                          <span className="font-medium">{updateMsg.text}</span>
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handlePageUpdate}
                      disabled={updatingPage}
                      className={`flex items-center gap-3 px-8 py-4 rounded-xl text-white font-semibold shadow-lg transition-all duration-200 min-w-[160px] justify-center ${
                        updatingPage
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/25"
                      }`}
                    >
                      {updatingPage ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Updating...
                        </>
                      ) : (
                        <>
                          <Save className="w-5 h-5" />
                          Update Page
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MODULES SECTION */}
            {activeTab === "modules" && (
              <div className="animate-fadeIn space-y-6">
                {/* Modules Header */}
                <div className="bg-white rounded-2xl border border-gray-200 p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                        <Layers className="w-6 h-6 text-white" />
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Page Modules
                        </h2>
                        <p className="text-gray-500">
                          {isDraftWithoutModules
                            ? "Modules available after publishing"
                            : `${moduleCount} module${
                                moduleCount !== 1 ? "s" : ""
                              } found`}
                        </p>
                      </div>
                    </div>

                    {/* Search Bar */}
                    {!isDraftWithoutModules && (
                      <div className="flex gap-3">
                        <div className="relative">
                          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                          <input
                            type="text"
                            placeholder="Search modules by title, type, or content..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-80 transition-all duration-200 bg-white"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Modules Content */}
                {isDraftWithoutModules ? (
                  <div className="bg-white rounded-2xl border-2 border-dashed border-gray-300 p-12 text-center">
                    <div className="max-w-md mx-auto">
                      <Layers className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Modules Not Available
                      </h3>
                      <p className="text-gray-500 mb-8 leading-relaxed">
                        Page modules are only visible when the page is
                        published. Please change the page status to
                        &quot;Published&quot; in the Page Settings to view and
                        manage modules.
                      </p>
                      <button
                        onClick={() => setActiveTab("settings")}
                        className="px-8 py-3.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-semibold shadow-lg shadow-primary-500/25"
                      >
                        Go to Page Settings
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredModules.length > 0 ? (
                      filteredModules.map(
                        (item: PageLayoutItem, index: number) => {
                          const moduleData = item.module;
                          const isEditing = editingModuleId === moduleData._id;
                          const isExpanded = expandedModules.has(
                            moduleData._id
                          );

                          return (
                            <div
                              key={moduleData._id}
                              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-md transition-all duration-200"
                            >
                              <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                                <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                      {moduleData.title || "Untitled Module"}
                                    </h3>
                                    <span className="text-xs bg-gradient-to-r from-primary-500 to-primary-600 text-white px-3 py-1.5 rounded-full font-semibold shadow-sm">
                                      {moduleData.type}
                                    </span>
                                  </div>

                                  <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                    <Hash className="w-4 h-4" />
                                    Module ID:{" "}
                                    <span className="font-mono bg-gray-100 px-3 py-1 rounded-lg text-gray-800 border">
                                      {moduleData._id}
                                    </span>
                                  </p>

                                  {/* Quick Actions */}
                                  <div className="flex flex-wrap gap-2">
                                    <button
                                      onClick={() =>
                                        toggleModuleExpansion(moduleData._id)
                                      }
                                      className="flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-200 border border-gray-300"
                                    >
                                      <Code className="w-3 h-3" />
                                      {isExpanded ? "Collapse" : "Expand"} JSON
                                      {isExpanded ? (
                                        <ChevronUp className="w-3 h-3" />
                                      ) : (
                                        <ChevronDown className="w-3 h-3" />
                                      )}
                                    </button>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  {!isEditing ? (
                                    <button
                                      onClick={() => startEdit(moduleData)}
                                      className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-semibold shadow-lg shadow-primary-500/25"
                                    >
                                      <Edit3 className="w-4 h-4" />
                                      Edit Content
                                    </button>
                                  ) : (
                                    <button
                                      onClick={cancelEdit}
                                      className="flex items-center gap-2 px-5 py-2.5 text-sm bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-semibold border border-gray-300"
                                    >
                                      <X className="w-4 h-4" />
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </div>

                              {/* Module Content Display */}
                              {!isEditing && (
                                <div
                                  className={`mt-4 transition-all duration-200 ${
                                    isExpanded
                                      ? "block"
                                      : "max-h-32 overflow-hidden"
                                  }`}
                                >
                                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                    <pre className="text-sm text-gray-700 overflow-auto font-mono">
                                      {JSON.stringify(
                                        moduleData.content,
                                        null,
                                        2
                                      )}
                                    </pre>
                                  </div>
                                </div>
                              )}

                              {/* Edit Mode */}
                              {isEditing && (
                                <div className="mt-6 space-y-4">
                                  <div>
                                    <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                      <FileCode className="w-4 h-4" />
                                      Module Content (JSON)
                                    </label>
                                    <textarea
                                      value={editContent}
                                      onChange={(e) =>
                                        setEditContent(e.target.value)
                                      }
                                      rows={12}
                                      className="w-full font-mono text-sm rounded-xl border border-gray-300 p-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-white resize-none"
                                      placeholder="Enter valid JSON content..."
                                    />
                                  </div>

                                  {moduleMsg && (
                                    <div
                                      className={`p-4 rounded-xl border flex items-center gap-3 ${
                                        moduleMsg.type === "error"
                                          ? "bg-red-50 text-red-800 border-red-200"
                                          : "bg-green-50 text-green-800 border-green-200"
                                      }`}
                                    >
                                      {moduleMsg.type === "error" ? (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                      ) : (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                      )}
                                      <span className="font-medium">
                                        {moduleMsg.text}
                                      </span>
                                    </div>
                                  )}

                                  <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                                    <button
                                      onClick={cancelEdit}
                                      className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-semibold border border-gray-300"
                                    >
                                      Cancel
                                    </button>
                                    <button
                                      onClick={() =>
                                        handleModuleUpdate(
                                          moduleData._id,
                                          moduleData.type,
                                          moduleData.title
                                        )
                                      }
                                      disabled={savingModule}
                                      className={`flex items-center gap-3 px-6 py-3 rounded-xl text-white font-semibold transition-all duration-200 ${
                                        savingModule
                                          ? "bg-gray-400 cursor-not-allowed"
                                          : "bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 shadow-lg shadow-primary-500/25"
                                      }`}
                                    >
                                      {savingModule ? (
                                        <>
                                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                                          Saving...
                                        </>
                                      ) : (
                                        <>
                                          <Save className="w-4 h-4" />
                                          Save Changes
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                      )
                    ) : (
                      <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-300">
                        <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {searchTerm
                            ? "No Modules Found"
                            : "No Modules Available"}
                        </h3>
                        <p className="text-gray-500 max-w-md mx-auto mb-6">
                          {searchTerm
                            ? "No modules match your search criteria. Try adjusting your search terms."
                            : "This page doesn't have any modules configured yet."}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="px-6 py-2.5 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-200 font-semibold shadow-lg shadow-primary-500/25"
                          >
                            Clear Search
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import {
  Settings,
  Globe,
  Mail,
  Database,
  Save,
  RefreshCcw,
  Download,
  Upload,
  AlertTriangle,
} from "lucide-react";
import {
  exportCollectionsDownload,
  importNdjson,
  exportBinaryDumpDownload,
  importBinaryDump,
} from "@/services/modules/backup";
import { getCookie } from "@/app/lib/cookies";

interface SettingsState {
  siteName: string;
  siteUrl: string;
  timezone: string;
  language: string;
  contactEmail: string;
  smtpHost: string;
  smtpPort: string;
  enableAutoBackup: boolean;
}

interface Message {
  type: "info" | "success" | "error";
  text: string;
}

const DEFAULT_SETTINGS: SettingsState = {
  siteName: "Imast",
  siteUrl: "https://imast.in",
  timezone: "Asia/Kolkata",
  language: "en",
  contactEmail: "admin@imast.in",
  smtpHost: "",
  smtpPort: "587",
  enableAutoBackup: true,
};

const SettingPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  // Backup states
  const [ndjsonImporting, setNdjsonImporting] = useState(false);
  const [ndjsonUploadProgress, setNdjsonUploadProgress] = useState<
    number | null
  >(null);
  const [binaryImporting, setBinaryImporting] = useState(false);
  const [binaryUploadProgress, setBinaryUploadProgress] = useState<
    number | null
  >(null);
  const [exporting, setExporting] = useState(false);
  const [exportingBinary, setExportingBinary] = useState(false);

  const ndjsonFileRef = useRef<HTMLInputElement>(null);
  const binaryFileRef = useRef<HTMLInputElement>(null);

  const handleSettingChange =
    (key: keyof SettingsState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        e.target.type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;

      setSettings((prev) => ({ ...prev, [key]: value }));
    };

  const showMessage = (type: Message["type"], text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleSave = async () => {
    setSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaving(false);
    showMessage("success", "Settings saved successfully");
    console.log("Saved settings:", settings);
  };

  const handleReset = () => {
    if (confirm("Reset all settings to default values?")) {
      setSettings(DEFAULT_SETTINGS);
      showMessage("info", "Settings reset to defaults");
    }
  };

  const getAccessToken = (): string | undefined => {
    return typeof window !== "undefined"
      ? getCookie("token") || undefined
      : undefined;
  };

  // Backup handlers
  const handleExportCollections = async () => {
    try {
      setExporting(true);
      showMessage("info", "Preparing export...");

      const token = getAccessToken();
      const result = await exportCollectionsDownload(
        ["pages", "modules", "media"],
        token
      );

      if ((result as Blob).size) {
        showMessage("success", "Export completed - file downloaded");
      } else {
        showMessage("error", "Export failed: Invalid response");
      }
    } catch (error: any) {
      console.error("Export error:", error);
      showMessage(
        "error",
        `Export failed: ${error?.message || "Unknown error"}`
      );
    } finally {
      setExporting(false);
    }
  };

  const handleImportNdjson = async (file?: File) => {
    const selectedFile = file || ndjsonFileRef.current?.files?.[0];
    if (!selectedFile) {
      alert("Please select an NDJSON file");
      return;
    }

    try {
      setNdjsonImporting(true);
      setNdjsonUploadProgress(0);
      showMessage("info", "Uploading NDJSON backup...");

      const token = getAccessToken();
      const result = await importNdjson(
        selectedFile,
        "upsert",
        token,
        undefined,
        (loaded, total) => {
          const progress = Math.round((loaded / total) * 100);
          setNdjsonUploadProgress(progress);
        }
      );

      if (result.success) {
        showMessage("success", "NDJSON import completed successfully");
      } else {
        showMessage("error", result.message || "Import failed");
      }
    } catch (error: any) {
      console.error("NDJSON import error:", error);
      showMessage(
        "error",
        `Import failed: ${error?.message || "Unknown error"}`
      );
    } finally {
      setNdjsonImporting(false);
      setNdjsonUploadProgress(null);
      if (ndjsonFileRef.current) ndjsonFileRef.current.value = "";
    }
  };

  const handleExportBinary = async () => {
    try {
      setExportingBinary(true);
      showMessage("info", "Preparing binary dump...");

      const token = getAccessToken();
      const result = await exportBinaryDumpDownload(token);

      if ((result as Blob).size) {
        showMessage("success", "Binary export completed - file downloaded");
      } else {
        showMessage("error", "Binary export failed: Invalid response");
      }
    } catch (error: any) {
      console.error("Binary export error:", error);
      showMessage(
        "error",
        `Binary export failed: ${error?.message || "Unknown error"}`
      );
    } finally {
      setExportingBinary(false);
    }
  };

  const handleImportBinary = async (file?: File) => {
    const selectedFile = file || binaryFileRef.current?.files?.[0];
    if (!selectedFile) {
      alert("Please select a binary archive file");
      return;
    }

    if (
      !confirm(
        "WARNING: This will restore the binary backup and may OVERWRITE existing data. This action cannot be undone. Are you sure you want to continue?"
      )
    ) {
      return;
    }

    try {
      setBinaryImporting(true);
      setBinaryUploadProgress(0);
      showMessage("info", "Uploading binary archive...");

      const token = getAccessToken();
      const result = await importBinaryDump(
        selectedFile,
        token,
        undefined,
        (loaded, total) => {
          const progress = Math.round((loaded / total) * 100);
          setBinaryUploadProgress(progress);
        }
      );

      if (result.success) {
        showMessage("success", "Binary restore completed successfully");
      } else {
        showMessage("error", result.message || "Binary restore failed");
      }
    } catch (error: any) {
      console.error("Binary import error:", error);
      showMessage(
        "error",
        `Binary restore failed: ${error?.message || "Unknown error"}`
      );
    } finally {
      setBinaryImporting(false);
      setBinaryUploadProgress(null);
      if (binaryFileRef.current) binaryFileRef.current.value = "";
    }
  };

  const SectionHeader: React.FC<{
    icon: React.ReactNode;
    title: string;
    description: string;
  }> = ({ icon, title, description }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
    </div>
  );

  const BackupCard: React.FC<{
    title: string;
    description: string;
    danger?: boolean;
    children: React.ReactNode;
  }> = ({ title, description, danger = false, children }) => (
    <div
      className={`border rounded-lg p-4 ${
        danger ? "border-red-200 bg-red-50" : "border-gray-200"
      }`}
    >
      <div className="mb-3">
        <div
          className={`text-sm font-medium ${
            danger ? "text-red-900" : "text-gray-900"
          }`}
        >
          {title}
          {danger && (
            <span className="text-xs text-red-600 ml-2 font-normal">
              Dangerous Operation
            </span>
          )}
        </div>
        <div className={`text-xs ${danger ? "text-red-700" : "text-gray-500"}`}>
          {description}
        </div>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500 mt-1">
            Configure site preferences, email settings, and manage backups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            Reset
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* General Settings */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <SectionHeader
          icon={<Settings className="w-5 h-5 text-gray-600" />}
          title="General Settings"
          description="Basic site information and localization preferences"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Site Name
            </label>
            <input
              type="text"
              value={settings.siteName}
              onChange={handleSettingChange("siteName")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Site URL
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-primary-500 focus-within:border-primary-500 transition-colors">
              <Globe className="w-4 h-4 text-gray-400" />
              <input
                type="url"
                value={settings.siteUrl}
                onChange={handleSettingChange("siteUrl")}
                className="w-full bg-transparent outline-none text-gray-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Timezone
            </label>
            <select
              value={settings.timezone}
              onChange={handleSettingChange("timezone")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="UTC">UTC</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Language
            </label>
            <select
              value={settings.language}
              onChange={handleSettingChange("language")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </section>

      {/* Email Settings */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <SectionHeader
          icon={<Mail className="w-5 h-5 text-gray-600" />}
          title="Email Settings"
          description="Configure contact information and SMTP settings for outgoing emails"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Contact Email
            </label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={handleSettingChange("contactEmail")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              SMTP Host
            </label>
            <input
              type="text"
              value={settings.smtpHost}
              onChange={handleSettingChange("smtpHost")}
              placeholder="smtp.mailgun.org"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              SMTP Port
            </label>
            <input
              type="text"
              value={settings.smtpPort}
              onChange={handleSettingChange("smtpPort")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Test Email Configuration
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="recipient@example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
              <button
                onClick={() => showMessage("info", "Test email sent (demo)")}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              >
                Send Test
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Backup & Restore */}
      <section className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <SectionHeader
          icon={<Database className="w-5 h-5 text-gray-600" />}
          title="Backup & Restore"
          description="Export and import site data. NDJSON is recommended for portability. Binary restore may overwrite existing data."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {/* Export NDJSON */}
          <BackupCard
            title="Export Data (NDJSON)"
            description="Download selected collections as portable NDJSON format"
          >
            <button
              onClick={handleExportCollections}
              disabled={exporting}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              {exporting ? "Exporting..." : "Download NDJSON"}
            </button>
          </BackupCard>

          {/* Import NDJSON */}
          <BackupCard
            title="Import Data (NDJSON)"
            description="Upload NDJSON backup to import data (upsert mode)"
          >
            <div className="space-y-3">
              <input
                ref={ndjsonFileRef}
                type="file"
                accept=".ndjson,.jsonl,.json"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              />
              <button
                onClick={() => handleImportNdjson()}
                disabled={ndjsonImporting}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Upload className="w-4 h-4" />
                {ndjsonImporting ? "Importing..." : "Upload NDJSON"}
              </button>
              {ndjsonUploadProgress !== null && (
                <div className="text-xs text-gray-600">
                  Upload progress: {ndjsonUploadProgress}%
                </div>
              )}
            </div>
          </BackupCard>

          {/* Export Binary */}
          <BackupCard
            title="Export Data (Binary)"
            description="Create a complete binary database dump (.archive.gz)"
          >
            <button
              onClick={handleExportBinary}
              disabled={exportingBinary}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Download className="w-4 h-4" />
              {exportingBinary ? "Exporting..." : "Download Binary"}
            </button>
          </BackupCard>

          {/* Import Binary */}
          <BackupCard
            title="Restore Data (Binary)"
            description="Upload binary database dump to restore. This may overwrite existing data."
            danger
          >
            <div className="space-y-3">
              <input
                ref={binaryFileRef}
                type="file"
                accept=".gz,.archive"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-700 hover:file:bg-red-100"
              />
              <button
                onClick={() => handleImportBinary()}
                disabled={binaryImporting}
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <AlertTriangle className="w-4 h-4" />
                {binaryImporting ? "Restoring..." : "Restore Binary"}
              </button>
              {binaryUploadProgress !== null && (
                <div className="text-xs text-red-600">
                  Restore progress: {binaryUploadProgress}%
                </div>
              )}
            </div>
          </BackupCard>
        </div>
      </section>

      {/* Status Message */}
      {message && (
        <div
          className={`rounded-lg p-4 border transition-all duration-300 ${
            message.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : message.type === "success"
              ? "bg-green-50 border-green-200 text-green-700"
              : "bg-blue-50 border-blue-200 text-blue-700"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{message.text}</span>
            <button
              onClick={() => setMessage(null)}
              className="ml-4 text-sm opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingPage;

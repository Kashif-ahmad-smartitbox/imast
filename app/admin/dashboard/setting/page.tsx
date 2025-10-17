"use client";

import React, { useState } from "react";
import {
  Settings,
  Globe,
  Mail,
  Database,
  Layers,
  Trash2,
  Zap,
  Save,
  RefreshCcw,
} from "lucide-react";

type SettingsState = {
  siteName: string;
  siteUrl: string;
  timezone: string;
  language: string;
  contactEmail: string;
  smtpHost: string;
  smtpPort: string;
  analyticsKey: string;
  enableAutoBackup: boolean;
};

const defaultState: SettingsState = {
  siteName: "Imast",
  siteUrl: "https://imast.in",
  timezone: "Asia/Kolkata",
  language: "en",
  contactEmail: "admin@imast.in",
  smtpHost: "",
  smtpPort: "587",
  analyticsKey: "",
  enableAutoBackup: true,
};

const SettingPage: React.FC = () => {
  const [state, setState] = useState<SettingsState>(defaultState);
  const [saving, setSaving] = useState(false);

  const handleChange =
    (k: keyof SettingsState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value =
        (e.target as HTMLInputElement).type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : e.target.value;
      setState((s) => ({ ...s, [k]: value } as SettingsState));
    };

  const handleSave = () => {
    setSaving(true);
    // simulate save
    setTimeout(() => {
      setSaving(false);
      alert("Settings saved (demo).");
      console.log("Saved settings", state);
    }, 700);
  };

  const handleReset = () => {
    if (confirm("Reset settings to defaults?")) {
      setState(defaultState);
    }
  };

  const handleRegenerateKey = () => {
    const newKey = `ak-${Math.random().toString(36).slice(2, 10)}`;
    setState((s) => ({ ...s, analyticsKey: newKey }));
  };

  const handleDanger = (action: "delete-site" | "clear-backups") => {
    const confirmMsg =
      action === "delete-site"
        ? "This will permanently delete the site and all data. Are you sure?"
        : "This will remove all stored backups. Continue?";
    if (!confirm(confirmMsg)) return;
    alert(`${action} executed (demo).`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-gray-500">
            Configure site preferences, email, integrations and backups.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-100 text-sm font-medium"
            title="Reset to defaults"
          >
            <RefreshCcw className="w-4 h-4" /> Reset
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium shadow-sm ${
              saving
                ? "bg-primary-300 text-white cursor-wait"
                : "bg-primary-600 text-white hover:bg-primary-700"
            }`}
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </div>

      {/* General */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">General</h2>
            <p className="text-xs text-gray-500">
              Basic site information and locale.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site name
            </label>
            <input
              value={state.siteName}
              onChange={handleChange("siteName")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Site URL
            </label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2">
              <Globe className="w-4 h-4 text-gray-400" />
              <input
                value={state.siteUrl}
                onChange={handleChange("siteUrl")}
                className="w-full bg-transparent outline-none text-sm text-gray-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Timezone
            </label>
            <select
              value={state.timezone}
              onChange={handleChange("timezone")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option>Asia/Kolkata</option>
              <option>UTC</option>
              <option>America/New_York</option>
              <option>Europe/London</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Language
            </label>
            <select
              value={state.language}
              onChange={handleChange("language")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="es">Español</option>
            </select>
          </div>
        </div>
      </section>

      {/* Email */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Email</h2>
            <p className="text-xs text-gray-500">
              Contact address and SMTP settings for outgoing mail.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contact email
            </label>
            <input
              value={state.contactEmail}
              onChange={handleChange("contactEmail")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP host
            </label>
            <input
              value={state.smtpHost}
              onChange={handleChange("smtpHost")}
              placeholder="smtp.mailgun.org"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              SMTP port
            </label>
            <input
              value={state.smtpPort}
              onChange={handleChange("smtpPort")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Test email
            </label>
            <div className="flex gap-2">
              <input
                placeholder="recipient@example.com"
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                aria-label="Test recipient email"
              />
              <button
                onClick={() => alert("Test email sent (demo).")}
                className="inline-flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-sm"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Integrations
            </h2>
            <p className="text-xs text-gray-500">
              Connect analytics, backups and external services.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-lg p-3">
            <div>
              <div className="text-sm font-medium text-gray-900">
                Analytics (API key)
              </div>
              <div className="text-xs text-gray-500">
                Connect Google/3rd party analytics
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={state.analyticsKey}
                onChange={handleChange("analyticsKey")}
                placeholder="api-key-xxxxx"
                className="border border-gray-200 rounded-lg px-2 py-1 text-sm"
              />
              <button
                onClick={handleRegenerateKey}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm border border-gray-200"
                title="Regenerate key"
              >
                Regenerate
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 border border-gray-100 rounded-lg p-3">
            <div>
              <div className="text-sm font-medium text-gray-900">Backups</div>
              <div className="text-xs text-gray-500">
                Automatic daily backups
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={state.enableAutoBackup}
                  onChange={handleChange("enableAutoBackup")}
                />
                <span className="text-sm text-gray-700">Auto</span>
              </label>
              <button
                onClick={() => alert("Backup started (demo).")}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm border border-gray-200"
              >
                Run now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Danger zone */}
      <section className="bg-white rounded-2xl border border-primary-100 shadow-sm p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary-50 flex items-center justify-center text-primary-600">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary-700">
                Danger zone
              </h3>
              <p className="text-xs text-primary-500">
                Irreversible actions — use with extreme caution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleDanger("clear-backups")}
              className="px-4 py-2 rounded-lg border border-primary-200 text-primary-600 hover:bg-primary-50 text-sm"
            >
              Clear backups
            </button>
            <button
              onClick={() => handleDanger("delete-site")}
              className="px-4 py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 text-sm"
            >
              Delete site
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SettingPage;

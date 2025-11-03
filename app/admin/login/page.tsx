"use client";

import { useRouter } from "next/navigation";
import { setCookie } from "@/app/lib/cookies";
import React, { useState, useCallback } from "react";
import { adminLogin } from "@/app/services/modules/auth";

type FormState = { email: string; password: string };

const PRIMARY_COLOR = "#d83846";
const PRIMARY_COLOR_HOVER = "#b52c38";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = useCallback((): boolean => {
    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }

    // Require at least 8 characters (message and check aligned).
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  }, [formData]);

  const handleInputChange = useCallback(
    (field: keyof FormState, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (error) setError(null);
    },
    [error]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) return;
    setLoading(true);

    try {
      const data = await adminLogin(formData);

      if (!data?.accessToken) {
        throw new Error("Login failed. Invalid credentials.");
      }

      setCookie("token", data.accessToken, 7, "/", "Lax");

      window.location.replace("/admin/dashboard");
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((s) => !s);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-purple-50/30 p-4">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-100 rounded-full blur-3xl opacity-30 animate-pulse" />
        <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-primary-100 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 shadow-2xl shadow-gray-200/50 p-8 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-full flex justify-center">
              <img
                className="relative w-24 h-24 drop-shadow-lg"
                src="/logo.svg"
                alt="Imast Logo"
              />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Admin Portal
            </h1>
            <p className="text-gray-500 text-sm">
              Secure access to content management system
            </p>
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-xl bg-primary-50 border border-primary-200 text-primary-700 text-sm flex items-start space-x-2 animate-in fade-in slide-in-from-top-2 duration-300"
              role="alert"
            >
              <svg
                className="w-4 h-4 mt-0.5 flex-shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block text-sm font-semibold text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200/80 bg-white/50 text-gray-900 text-sm focus:ring-2 focus:ring-[#d83846] focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                placeholder="admin@imast.in"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <div className="flex justify-between items-center">
                <label className="block text-sm font-semibold text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-xs text-gray-500 hover:text-gray-700 font-medium"
                  disabled={loading}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3.5 rounded-xl border border-gray-200/80 bg-white/50 text-gray-900 text-sm focus:ring-2 focus:ring-[#d83846] focus:border-transparent outline-none transition-all duration-200 placeholder:text-gray-400 shadow-sm"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 text-white font-semibold rounded-xl py-4 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#d83846]/20 ${
                loading
                  ? "opacity-80 cursor-not-allowed"
                  : "shadow-lg hover:shadow-xl"
              }`}
              style={{
                backgroundImage: `linear-gradient(45deg, ${PRIMARY_COLOR}, ${PRIMARY_COLOR_HOVER})`,
              }}
            >
              {loading ? (
                <>
                  <svg
                    className="w-5 h-5 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeOpacity="0.25"
                    />
                    <path
                      d="M22 12A10 10 0 0012 2"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span>Signing you in...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Sign in to Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-xs text-gray-500">
            © {new Date().getFullYear()} IMAST • All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
}

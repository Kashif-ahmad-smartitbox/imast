"use client";
import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pointer-events-none">
      {/* Subtle top progress-ish bar */}
      <div className="w-full max-w-full">
        <div className="h-1 bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-500 animate-loading" />
      </div>

      {/* Center spinner (optional) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
        <div className="p-4 bg-black/60 rounded-lg shadow-lg">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-20%);
          }
          100% {
            transform: translateX(120%);
          }
        }
        .animate-loading {
          animation: loading 1.1s linear infinite;
        }
      `}</style>
    </div>
  );
}

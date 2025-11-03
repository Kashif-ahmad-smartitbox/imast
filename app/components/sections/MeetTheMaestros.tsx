"use client";

import React from "react";
import { Linkedin } from "lucide-react";

export type Maestro = {
  id: string;
  name: string;
  role?: string;
  bio: string;
  avatar: string; // url
  linkedin?: string;
};

export default function MeetTheMaestros({
  data,
}: {
  data: {
    title?: string;
    bgColor?: string;
    cardBg?: string;
    accent?: string;
    members: Maestro[];
  };
}) {
  const {
    title = "Meet The Maestros",
    bgColor = "#e06b3b",
    cardBg = "#ffffff",
    accent = "#9b3b9b",
    members = [],
  } = data ?? {};

  return (
    <section
      className="py-16"
      style={{ background: bgColor }}
      aria-label="Meet the maestros"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-10">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {members.map((m) => (
            <article
              key={m.id}
              className="rounded-2xl p-8"
              style={{ background: cardBg }}
            >
              <div className="flex items-start gap-6">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {m.name}
                  </h3>
                  {m.role && (
                    <div className="text-sm mt-1" style={{ color: accent }}>
                      {m.role}
                    </div>
                  )}
                  <p className="mt-4 text-gray-700 leading-relaxed text-sm">
                    {m.bio}
                  </p>

                  <div className="mt-6">
                    {m.linkedin && (
                      <a
                        href={m.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-[#e06b3b] hover:underline"
                        aria-label={`Open ${m.name} LinkedIn`}
                      >
                        <span
                          className="inline-flex items-center justify-center rounded-md"
                          style={{
                            width: 28,
                            height: 28,
                            background: "#fff",
                            boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                          }}
                        >
                          <Linkedin className="w-4 h-4 text-[#e06b3b]" />
                        </span>
                        <span className="ml-2">LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

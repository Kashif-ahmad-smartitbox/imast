import React from "react";
import ModuleRenderer from "@/components/modules/ModuleRenderer";

interface PageApiResponse {
  page?: {
    title?: string;
    slug?: string;
    layout?: any[];
    [k: string]: any;
  };
}

const API_BASE = process.env.API_URL || "http://localhost:4000/api";

export default async function HomePage() {
  const slug = "home";

  const response = await fetch(`${API_BASE}/admin/pages/slug/${slug}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return <div className="p-8">Home page not found</div>;
  }

  const data: PageApiResponse = await response.json();
  const page = data.page;

  if (!page?.layout) {
    return <div className="p-8">No modules configured for home</div>;
  }

  const layout = page.layout
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <main>
      {layout.map((item, index) => (
        <ModuleRenderer
          item={item}
          index={index}
          key={item.module?._id || index}
        />
      ))}
    </main>
  );
}

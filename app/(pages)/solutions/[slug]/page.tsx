import React from "react";
import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";
import { notFound } from "next/navigation";

import Schema from "@/components/Schema";
import {
  breadcrumbSchema,
  webPageSchema,
  softwareApplicationSchema,
} from "@/lib/schema";

type PageResponse = {
  page?: any;
  message?: string;
};

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const response: PageResponse = await getPageWithContent(slug);

    if (response.message === "Not found" || !response.page) {
      return {
        title: "Page Not Found",
        description: "The page you are looking for does not exist.",
      };
    }

    const page = response.page;
    // ensure this is a solutions page
    if (page.type !== "solutions") {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imast.in";
    const canonical = page.canonicalUrl || `${baseUrl}/solutions/${slug}`;

    return {
      title: page.metaTitle || page.title || "imast",
      description:
        page.metaDescription ||
        page.excerpt ||
        "Discover expert insights and analysis.",
      keywords: page.keywords?.length ? page.keywords.join(", ") : undefined,
      authors: [{ name: "iMast" }],
      openGraph: {
        title: page.metaTitle || page.title || "imast",
        description:
          page.metaDescription ||
          page.excerpt ||
          "Discover expert insights and analysis.",
        type: "website",
        url: canonical,
        siteName: "iMast",
        images: page.ogImage ? [page.ogImage] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: page.metaTitle || page.title || "imast",
        description:
          page.metaDescription ||
          page.excerpt ||
          "Discover expert insights and analysis.",
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
      },
    };
  } catch (error) {
    console.error("generateMetadata solutions:", error);
    return {
      title: "Page Not Found",
      description: "The page you are looking for does not exist.",
    };
  }
}

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  const response: PageResponse = await getPageWithContent(slug);

  if (response.message === "Not found" || !response.page) {
    notFound();
  }

  const page = response.page;

  // require solutions type
  if (page.type !== "solutions") {
    notFound();
  }

  if (!page.layout || page.layout.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            No content
          </h1>
          <p className="text-gray-600">
            No modules configured for this solution page.
          </p>
        </div>
      </div>
    );
  }

  const layout = (page.layout || [])
    .slice()
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  // build schema
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/solutions/${slug}`;

  const bc = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Solutions", item: `${baseUrl}/solutions` },
    { position: 3, name: page.title || slug, item: canonical },
  ]);

  const pageWeb = webPageSchema({
    name: page.metaTitle || page.title || "Solution",
    url: canonical,
    description: page.metaDescription || page.excerpt,
  });

  // SoftwareApplication schema for solution pages (fallback to WebPage if insufficient data)
  const appSchema = softwareApplicationSchema({
    name: page.title || "Solution",
    url: canonical,
    image:
      page.image ||
      page.ogImage ||
      `${baseUrl}/assets/images/solutions/default.png`,
    description: page.metaDescription || page.excerpt,
    operatingSystem: page.meta?.operatingSystem || page.meta?.os || "Web",
    applicationCategory:
      page.meta?.applicationCategory || "BusinessApplication",
    publisherName: page.meta?.publisherName || "IMAST",
  });

  // Decide which schemas to emit:
  // - Always emit breadcrumb + webpage
  // - Emit SoftwareApplication for solutions (helps rich results) — it's safe even if some fields are defaults
  const schemaList = [bc, pageWeb, appSchema];

  return (
    <main>
      {/* Page-level schema (Organization/WebSite already provided in layout) */}
      <Schema data={schemaList} />

      {layout.map((item: any, idx: number) => (
        <ModuleRenderer item={item} index={idx} key={item.module?._id ?? idx} />
      ))}
    </main>
  );
}

import React from "react";
import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import {
  getPageWithContent,
  PageWithContentResponse,
} from "@/services/modules/pageModule";
import Schema from "@/components/Schema";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response: PageWithContentResponse = await getPageWithContent("home");

    if (!response.page) {
      return {
        title: "Home | imast",
        description: "Welcome to imast - Your platform for insightful content.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imast.in";

    return {
      title: response.page.metaTitle || response.page.title || "imast",
      description:
        response.page.metaDescription ||
        response.page.excerpt ||
        "Discover expert insights and analysis.",
      openGraph: {
        title: response.page.metaTitle || response.page.title || "imast",
        description:
          response.page.metaDescription ||
          response.page.excerpt ||
          "Discover expert insights and analysis.",
        type: "website",
        url: baseUrl,
        images: [
          {
            url: "/favicon.png",
            width: 1200,
            height: 630,
            alt: "IMAST",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: response.page.metaTitle || response.page.title || "imast",
        description:
          response.page.metaDescription ||
          response.page.excerpt ||
          "Discover expert insights and analysis.",
        images: ["/favicon.png"],
      },
      alternates: {
        canonical: "/",
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Home | imast",
      description: "Welcome to iMast - Your platform for insightful content.",
    };
  }
}

export default async function HomePage() {
  let response: PageWithContentResponse;

  try {
    response = await getPageWithContent("home");
  } catch (error) {
    console.log("error", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load page
          </h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (response.message === "Not found" || !response.page) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Page not found
          </h1>
          <p className="text-gray-600">The home page does not exist.</p>
        </div>
      </div>
    );
  }

  if (!response.page.layout || response.page.layout.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            No content
          </h1>
          <p className="text-gray-600">No modules configured for home page.</p>
        </div>
      </div>
    );
  }

  const layout = response.page.layout
    .slice()
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Build page-level schema: breadcrumb + webpage
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = baseUrl + "/";

  const breadcrumb = {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonical,
      },
    ],
  };

  const webPage = {
    "@type": "WebPage",
    url: canonical,
    name:
      response.page.metaTitle ||
      response.page.title ||
      "IMAST – Smart Automation & Loyalty Solutions",
    description:
      response.page.metaDescription ||
      response.page.excerpt ||
      "IMAST provides enterprise automation, loyalty, SFA, HRMS and retail solutions to improve business efficiency and customer engagement.",
  };

  return (
    <main>
      {/* Page-level schema: breadcrumb + webpage (Organization & WebSite already in RootLayout) */}
      <Schema data={[breadcrumb, webPage]} />

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

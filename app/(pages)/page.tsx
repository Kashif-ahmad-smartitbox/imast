import React from "react";
import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import {
  getPageWithContent,
  PageWithContentResponse,
} from "@/services/modules/pageModule";
import Schema from "@/components/Schema";
import { breadcrumbSchema, webPageSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const response: PageWithContentResponse = await getPageWithContent("home");

    if (!response.page) {
      return {
        title: "Integrated SaaS Platform for Loyalty & Supply Chain | IMAST",
        description:
          "India's leading Integrated SaaS platform offering Loyalty & Supply Chain solutions. Empowering 100+ clients with innovative tools to drive growth.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonicalUrl = `${baseUrl}/`;
    const ogImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
    const defaultTitle =
      "Integrated SaaS Platform for Loyalty & Supply Chain | IMAST";
    const defaultDescription =
      "India's leading Integrated SaaS platform offering Loyalty & Supply Chain solutions. Empowering 100+ clients with innovative tools to drive growth.";

    return {
      title: response.page.metaTitle || response.page.title || defaultTitle,
      description:
        response.page.metaDescription ||
        response.page.excerpt ||
        defaultDescription,
      alternates: {
        canonical: canonicalUrl,
      },
      openGraph: {
        type: "website",
        siteName: "IMAST",
        title: response.page.metaTitle || response.page.title || defaultTitle,
        description:
          response.page.metaDescription ||
          response.page.excerpt ||
          defaultDescription,
        url: canonicalUrl,
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: "IMAST Integrated SaaS Platform",
          },
        ],
        locale: "en_IN",
      },
      twitter: {
        card: "summary_large_image",
        site: "@Imastopl",
        creator: "@Imastopl",
        title: response.page.metaTitle || response.page.title || defaultTitle,
        description:
          response.page.metaDescription ||
          response.page.excerpt ||
          defaultDescription,
        images: [ogImage],
      },
      other: {
        "og:image:alt": "IMAST Integrated SaaS Platform",
      },
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Integrated SaaS Platform for Loyalty & Supply Chain | IMAST",
      description:
        "India's leading Integrated SaaS platform offering Loyalty & Supply Chain solutions. Empowering 100+ clients with innovative tools to drive growth.",
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

  // Build page-level schema
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = baseUrl + "/";
  const ogImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

  const breadcrumb = breadcrumbSchema([
    {
      position: 1,
      name: "Home",
      item: canonical,
    },
  ]);

  const webPage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name:
      response.page.metaTitle ||
      response.page.title ||
      "Integrated SaaS Platform for Loyalty & Supply Chain | IMAST",
    description:
      response.page.metaDescription ||
      response.page.excerpt ||
      "India's leading Integrated SaaS platform offering Loyalty & Supply Chain solutions. Empowering 100+ clients with innovative tools to drive growth.",
    isPartOf: {
      "@id": `${canonical}#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
      width: 1200,
      height: 630,
      alt: "IMAST Integrated SaaS Platform",
    },
  };

  return (
    <main>
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

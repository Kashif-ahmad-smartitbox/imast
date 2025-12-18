import React from "react";
import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";
import { notFound } from "next/navigation";

import Script from "next/script";
import { breadcrumbSchema, webPageSchemaEnhanced } from "@/lib/schema";

type PageResponse = {
  page?: any;
  message?: string;
};

export const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in"
);

export async function generateMetadata({
  params,
}: {
  params: any;
}): Promise<Metadata> {
  const { slug } = await params;

  if (slug === "home") {
    return {
      title: "Page Not Found | IMAST",
      description: "This page does not exist.",
      robots: "noindex, nofollow",
      openGraph: {
        title: "Page Not Found | IMAST",
        description: "This page does not exist.",
        url: `${metadataBase}/${slug}`,
      },
    };
  }

  try {
    const response: PageResponse = await getPageWithContent(slug);

    if (response.message === "Not found" || !response.page) {
      return {
        title: "Page Not Found | IMAST",
        description: "The page you are looking for does not exist.",
        robots: "noindex, nofollow",
        openGraph: {
          title: "Page Not Found | IMAST",
          description: "The page you are looking for does not exist.",
          url: `${metadataBase}/${slug}`,
        },
      };
    }

    const page = response.page;
    if ((page.type || "default") !== "default") {
      return {
        title: "Page Not Found | IMAST",
        description: "The page you are looking for does not exist.",
        robots: "noindex, nofollow",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || metadataBase.toString();
    const canonical = page.canonicalUrl || `${baseUrl}/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
    const pageImage = page.ogImage || page.image || defaultImage;

    const title = page.metaTitle || page.title || "IMAST";
    const description =
      page.metaDescription ||
      page.excerpt ||
      "Discover expert insights and analysis.";

    return {
      title: title,
      description: description,
      keywords: page.keywords?.length ? page.keywords.join(", ") : undefined,
      authors: [{ name: "IMAST" }],
      openGraph: {
        title: title,
        description: description,
        type: "website",
        url: canonical,
        siteName: "IMAST",
        images: [
          {
            url: pageImage,
            width: 1200,
            height: 630,
            alt: page.metaTitle || page.title || "IMAST",
          },
        ],
        locale: "en_IN",
      },
      twitter: {
        card: "summary_large_image",
        site: "@Imastopl",
        creator: "@Imastopl",
        title: title,
        description: description,
        images: [pageImage],
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
      },
      other: {
        "og:image:alt": page.metaTitle || page.title || "IMAST",
      },
    };
  } catch (error) {
    console.error("generateMetadata default:", error);
    return {
      title: "Page Not Found | IMAST",
      description: "The page you are looking for does not exist.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function Page({ params }: { params: any }) {
  const { slug } = await params;

  if (slug === "home") {
    notFound();
  }

  const response: PageResponse = await getPageWithContent(slug);

  if (response.message === "Not found" || !response.page) {
    notFound();
  }

  const page = response.page;

  if ((page.type || "default") !== "default") {
    notFound();
  }

  if (!page.layout || page.layout.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            No content
          </h1>
          <p className="text-gray-600">This page has no content yet.</p>
        </div>
      </div>
    );
  }

  const layout = (page.layout || [])
    .slice()
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/${slug}`;
  const defaultImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
  const pageImage = page.ogImage || page.image || defaultImage;

  const title = page.metaTitle || page.title || "IMAST";
  const description =
    page.metaDescription ||
    page.excerpt ||
    "Discover expert insights and analysis.";

  // Build schemas
  const breadcrumb = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: page.title || slug, item: canonical },
  ]);

  const webPage = webPageSchemaEnhanced({
    name: title,
    url: canonical,
    description: description,
    image: pageImage,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: title,
  });

  let specialPageSchema = null;

  if (slug === "about") {
    specialPageSchema = {
      "@type": "AboutPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: description,
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
    };
  } else if (slug === "contact") {
    specialPageSchema = {
      "@type": "ContactPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: description,
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
    };
  } else if (
    slug === "privacy-policy" ||
    slug === "terms" ||
    slug === "terms-of-service"
  ) {
    specialPageSchema = {
      "@type": "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: title,
      description: description,
      isPartOf: {
        "@id": `${baseUrl}/#website`,
      },
      about: {
        "@type": "Thing",
        name: "Legal Document",
      },
    };
  }

  const schemaList = [];

  if (page.status === "published") {
    schemaList.push(breadcrumb);

    if (specialPageSchema) {
      schemaList.push(specialPageSchema);
    } else {
      schemaList.push(webPage);
    }
  }

  const combinedSchema =
    schemaList.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": schemaList,
        }
      : null;

  return (
    <>
      {combinedSchema && (
        <Script
          id={`schema-page-${slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
          strategy="afterInteractive"
        />
      )}

      <main>
        {layout.map((item: any, idx: number) => (
          <ModuleRenderer
            item={item}
            index={idx}
            key={item.module?._id ?? idx}
          />
        ))}
      </main>
    </>
  );
}

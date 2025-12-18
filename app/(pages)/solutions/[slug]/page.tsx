import React from "react";
import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";
import { notFound } from "next/navigation";

import Script from "next/script";
import {
  breadcrumbSchema,
  webPageSchemaEnhanced,
  softwareApplicationSchema,
  productSchema,
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
        title: "Page Not Found | IMAST",
        description: "The page you are looking for does not exist.",
      };
    }

    const page = response.page;
    if (page.type !== "solutions") {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonical = page.canonicalUrl || `${baseUrl}/solutions/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
    const solutionImage = page.image || page.ogImage || defaultImage;

    const title =
      page.metaTitle || page.title || `${page.title || "Solution"} | IMAST`;
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
            url: solutionImage,
            width: 1200,
            height: 630,
            alt: page.title || "IMAST Solution",
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
        images: [solutionImage],
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
      },
      other: {
        "og:image:alt": page.title || "IMAST Solution",
      },
    };
  } catch (error) {
    console.error("generateMetadata solutions:", error);
    return {
      title: "Page Not Found | IMAST",
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

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/solutions/${slug}`;
  const defaultImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
  const solutionImage = page.image || page.ogImage || defaultImage;

  const title =
    page.metaTitle || page.title || `${page.title || "Solution"} | IMAST`;
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
    image: solutionImage,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: page.title || "IMAST Solution",
  });

  const productSchemaData = productSchema({
    name: page.title || "Solution",
    url: canonical,
    image: solutionImage,
    description: description,
    brand: "IMAST",
    category: page.meta?.category || "Software",
    offers: {
      url: canonical,
      availability: "https://schema.org/InStock",
    },
    relatedSoftware: {
      name: page.title || "Solution",
      operatingSystem:
        page.meta?.operatingSystem || page.meta?.os || "Web, Android, iOS",
      applicationCategory:
        page.meta?.applicationCategory || "BusinessApplication",
    },
  });

  const appSchema = softwareApplicationSchema({
    name: page.title || "Solution",
    url: canonical,
    image: solutionImage,
    description: description,
    operatingSystem:
      page.meta?.operatingSystem || page.meta?.os || "Web, Android, iOS",
    applicationCategory:
      page.meta?.applicationCategory || "BusinessApplication",
    publisherName: page.meta?.publisherName || "IMAST",
  });

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, webPage, productSchemaData, appSchema],
  };

  return (
    <>
      <Script
        id={`schema-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        strategy="afterInteractive"
      />

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

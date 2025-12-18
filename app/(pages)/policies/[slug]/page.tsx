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
    if (page.type !== "policies") {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonical = page.canonicalUrl || `${baseUrl}/policies/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

    const title = page.metaTitle || page.title || "Policy | IMAST";
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
            url: defaultImage,
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
        title: title,
        description: description,
        images: [defaultImage],
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
      },
      other: {
        "og:image:alt": "IMAST Integrated SaaS Platform",
      },
    };
  } catch (error) {
    console.error("generateMetadata policies:", error);
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

  if (page.type !== "policies") {
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
            No modules configured for this policy page.
          </p>
        </div>
      </div>
    );
  }

  const layout = (page.layout || [])
    .slice()
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/policies/${slug}`;
  const defaultImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

  const title = page.metaTitle || page.title || "Policy | IMAST";
  const description =
    page.metaDescription ||
    page.excerpt ||
    "Discover expert insights and analysis.";

  // Build schemas
  const breadcrumb = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Policies", item: `${baseUrl}/policies` },
    { position: 3, name: page.title || slug, item: canonical },
  ]);

  const webPage = webPageSchemaEnhanced({
    name: title,
    url: canonical,
    description: description,
    image: defaultImage,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: "IMAST Integrated SaaS Platform",
  });

  // For policy pages, you might also want to add FAQPage schema if it's a Q&A style policy
  // Or Article schema if it's a detailed policy document
  const isFAQPage = page.meta?.isFAQ || slug.includes("faq");

  let additionalSchema = null;
  if (isFAQPage) {
    additionalSchema = {
      "@type": "FAQPage",
      mainEntity:
        page.meta?.faqs?.map((faq: any, index: number) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })) || [],
    };
  } else {
    // Add Article schema for detailed policy documents
    additionalSchema = {
      "@type": "Article",
      headline: title,
      description: description,
      author: {
        "@type": "Organization",
        name: "IMAST",
      },
      publisher: {
        "@type": "Organization",
        name: "IMAST",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.svg`,
        },
      },
      datePublished: page.meta?.publishedDate || page.createdAt,
      dateModified: page.meta?.modifiedDate || page.updatedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonical,
      },
    };
  }

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb,
      webPage,
      ...(additionalSchema ? [additionalSchema] : []),
    ],
  };

  return (
    <>
      {/* Use next/script for JSON-LD */}
      <Script
        id={`schema-policy-${slug}`}
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

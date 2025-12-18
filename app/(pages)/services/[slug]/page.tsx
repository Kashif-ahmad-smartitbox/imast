import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";
import { notFound } from "next/navigation";

import Script from "next/script";
import {
  breadcrumbSchema,
  webPageSchemaEnhanced,
  serviceSchema,
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

    if (page.type !== "services") {
      notFound();
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonical = page.canonicalUrl || `${baseUrl}/services/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
    const serviceImage = page.image || page.ogImage || defaultImage;

    const title =
      page.metaTitle || page.title || `${page.title || "Service"} | IMAST`;
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
            url: serviceImage,
            width: 1200,
            height: 630,
            alt: page.title || "IMAST Service",
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
        images: [serviceImage],
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
      },
      other: {
        "og:image:alt": page.title || "IMAST Service",
      },
    };
  } catch (error) {
    console.error("generateMetadata services:", error);
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

  if (page.type !== "services") {
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
            No modules configured for this service page.
          </p>
        </div>
      </div>
    );
  }

  const layout = (page.layout || [])
    .slice()
    .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/services/${slug}`;
  const defaultImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";
  const serviceImage = page.image || page.ogImage || defaultImage;

  const title =
    page.metaTitle || page.title || `${page.title || "Service"} | IMAST`;
  const description =
    page.metaDescription ||
    page.excerpt ||
    "Discover expert insights and analysis.";

  // Build schemas
  const breadcrumb = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Services", item: `${baseUrl}/services` },
    { position: 3, name: page.title || slug, item: canonical },
  ]);

  const webPage = webPageSchemaEnhanced({
    name: title,
    url: canonical,
    description: description,
    image: serviceImage,
    imageWidth: 1200,
    imageHeight: 630,
    imageAlt: page.title || "IMAST Service",
  });

  const serviceSchemaData = serviceSchema({
    name: page.title || "Service",
    url: canonical,
    description: description,
    serviceType: page.meta?.serviceType || page.title || "Business Service",
    providerId: `${baseUrl}/#organization`,
    areaServed: page.meta?.areaServed || "IN",
    offers: page.meta?.price
      ? {
          price: page.meta.price,
          priceCurrency: page.meta.priceCurrency || "INR",
        }
      : undefined,
  });

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, webPage, serviceSchemaData],
  };

  return (
    <>
      {/* Use next/script for JSON-LD */}
      <Script
        id={`schema-service-${slug}`}
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

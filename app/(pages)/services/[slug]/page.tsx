import { Metadata } from "next";
import ModuleRenderer from "@/components/modules/ModuleRenderer";
import { getPageWithContent } from "@/services/modules/pageModule";
import { notFound } from "next/navigation";

import Schema from "@/components/Schema";
import { breadcrumbSchema, webPageSchema, serviceSchema } from "@/lib/schema";

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

    return {
      title:
        page.metaTitle || page.title || `${page.title || "Service"} | IMAST`,
      description:
        page.metaDescription ||
        page.excerpt ||
        "Discover expert insights and analysis.",
      keywords: page.keywords?.length ? page.keywords.join(", ") : undefined,
      authors: [{ name: "IMAST" }],
      openGraph: {
        title:
          page.metaTitle || page.title || `${page.title || "Service"} | IMAST`,
        description:
          page.metaDescription ||
          page.excerpt ||
          "Discover expert insights and analysis.",
        type: "website",
        url: canonical,
        siteName: "IMAST",
        images: page.ogImage
          ? [page.ogImage]
          : [
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
        title:
          page.metaTitle || page.title || `${page.title || "Service"} | IMAST`,
        description:
          page.metaDescription ||
          page.excerpt ||
          "Discover expert insights and analysis.",
        images: page.ogImage ? [page.ogImage] : [defaultImage],
      },
      robots:
        page.status === "published" ? "index, follow" : "noindex, nofollow",
      alternates: {
        canonical,
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

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = page.canonicalUrl || `${baseUrl}/services/${slug}`;

  const bc = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Services", item: `${baseUrl}/services` },
    { position: 3, name: page.title || slug, item: canonical },
  ]);

  const pageWeb = webPageSchema({
    name: page.metaTitle || page.title || `${page.title || "Service"} | IMAST`,
    url: canonical,
    description: page.metaDescription || page.excerpt,
  });

  const serviceSchemaData = serviceSchema({
    name: page.title || "Service",
    url: canonical,
    description: page.metaDescription || page.excerpt,
    serviceType: page.meta?.serviceType || page.title || "Business Service",
    providerId: `${baseUrl}/#organization`,
    areaServed: page.meta?.areaServed || "IN",
  });

  const schemaList = [bc, pageWeb, serviceSchemaData];

  return (
    <main>
      <Schema data={schemaList} />

      {layout.map((item: any, idx: number) => (
        <ModuleRenderer item={item} index={idx} key={item.module?._id ?? idx} />
      ))}
    </main>
  );
}

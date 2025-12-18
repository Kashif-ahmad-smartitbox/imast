import React from "react";
import { Metadata } from "next";
import SingleStories from "@/app/components/pages/SingleStories";
import { getStory } from "@/app/services/modules/stories";
import { notFound } from "next/navigation";

import Script from "next/script";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = (await params) as { slug: string };

  try {
    const response = await getStory(slug);
    const story = response.story;

    if (!story || story.status === "draft") {
      return {
        title: "Story Not Found | IMAST",
        description:
          "The story you're looking for doesn't exist or may have been moved.",
        robots: "noindex, nofollow",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonicalUrl = `${baseUrl}/case-studies/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

    const metaDescription =
      story.metaDescription ||
      story.excerpt ||
      (story.body
        ? story.body
            .replace(/<[^>]*>/g, "")
            .substring(0, 160)
            .trim() + "..."
        : "Read this captivating story on IMAST");

    const openGraph: any = {
      type: "article",
      url: canonicalUrl,
      title: story.title,
      description: metaDescription,
      siteName: "IMAST",
      images: [
        {
          url: story.image || defaultImage,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
      locale: "en_IN",
    };

    if (story.publishedAt) openGraph.publishedTime = story.publishedAt;
    if (story.updatedAt) openGraph.modifiedTime = story.updatedAt;
    if (story.tags?.length) openGraph.tags = story.tags;

    return {
      title: `${story.title} | IMAST Stories`,
      description: metaDescription,
      keywords: story.tags?.join(", "),
      alternates: { canonical: canonicalUrl },
      openGraph,
      twitter: {
        card: "summary_large_image",
        site: "@Imastopl",
        creator: "@Imastopl",
        title: story.title,
        description: metaDescription,
        images: [story.image || defaultImage],
      },
      ...(story.publishedAt && { publishedTime: story.publishedAt }),
      ...(story.updatedAt && { modifiedTime: story.updatedAt }),
      ...(story.tags?.length && { keywords: story.tags.join(", ") }),
      other: {
        "og:image:alt": story.title,
      },
    };
  } catch (error) {
    console.error("Error generating metadata for story:", error);
    return {
      title: "Error Loading Story | IMAST",
      description:
        "There was an error loading this story. Please try again later.",
      robots: "noindex, nofollow",
    };
  }
}

export default async function SingleStoriesPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };

  const response = await getStory(slug);
  const story = response.story;

  if (!story || story.status === "draft") {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
  const canonical = `${baseUrl}/case-studies/${slug}`;
  const defaultImage =
    "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

  // Build schemas
  const breadcrumb = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Case Studies", item: `${baseUrl}/case-studies` },
    { position: 3, name: story.title || slug, item: canonical },
  ]);

  const article = articleSchema({
    title: story.title,
    url: canonical,
    image: story.image || defaultImage,
    description:
      story.metaDescription ||
      story.excerpt ||
      (story.body
        ? story.body
            .replace(/<[^>]*>/g, "")
            .substring(0, 160)
            .trim() + "..."
        : "Read this captivating story on IMAST"),
    authorName: "IMAST",
    publishedTime: story.publishedAt,
    modifiedTime: story.updatedAt,
  });

  // You might also want to add WebPage schema for better structure
  const webPage = {
    "@type": "WebPage",
    "@id": `${canonical}#webpage`,
    url: canonical,
    name: `${story.title} | IMAST Stories`,
    description: story.metaDescription || story.excerpt,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: story.image || defaultImage,
      width: 1200,
      height: 630,
      alt: story.title,
    },
  };

  // Combine all schemas
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [breadcrumb, webPage, article],
  };

  return (
    <>
      {/* Use next/script for JSON-LD */}
      <Script
        id={`schema-story-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }}
        strategy="afterInteractive"
      />

      <SingleStories />
    </>
  );
}

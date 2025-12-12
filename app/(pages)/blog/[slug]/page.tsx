// app/blog/[slug]/page.tsx
import React from "react";
import { Metadata } from "next";
import SingleBlog from "@/components/pages/SingleBlog";
import { getBlogBySlug } from "@/app/services/modules/blog";
import { notFound } from "next/navigation";

import Schema from "@/components/Schema";
import { breadcrumbSchema, articleSchema } from "@/lib/schema";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = (await params) as { slug: string };

  try {
    const response = await getBlogBySlug(slug);
    const blog = response.blog;

    if (!blog) {
      return {
        title: "Article Not Found | imast",
        description: "The article you're looking for doesn't exist.",
        robots: "noindex, nofollow",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imast.in";
    const canonicalUrl = `${baseUrl.replace(/\/$/, "")}/blog/${slug}`;

    const metaDescription =
      blog.metaDescription ||
      blog.excerpt ||
      (blog.body
        ? blog.body
            .replace(/<[^>]*>/g, "")
            .substring(0, 160)
            .trim() + "..."
        : "Read this insightful article on imast");

    const openGraph: any = {
      type: "article",
      url: canonicalUrl,
      title: blog.title,
      description: metaDescription,
      siteName: "imast",
      images: [blog.cover || `${baseUrl}/og-image.jpg`],
    };

    if (blog.publishedAt) openGraph.publishedTime = blog.publishedAt;
    if (blog.updatedAt) openGraph.modifiedTime = blog.updatedAt;
    if (blog.tags?.length) openGraph.tags = blog.tags;

    return {
      title: `${blog.title} | iMast`,
      description: metaDescription,
      keywords: blog.tags?.join(", "),
      authors: [{ name: "iMast" }],
      alternates: { canonical: canonicalUrl },
      openGraph,
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: metaDescription,
        images: [blog.cover || `${baseUrl}/twitter-image.jpg`],
      },
      ...(blog.publishedAt && { publishedTime: blog.publishedAt }),
      ...(blog.updatedAt && { modifiedTime: blog.updatedAt }),
      ...(blog.tags?.length && { keywords: blog.tags.join(", ") }),
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Error | imast",
      description: "Error loading article",
      robots: "noindex, nofollow",
    };
  }
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = params;

  // Fetch blog server-side so we can build JSON-LD (and avoid relying on client fetch)
  const response = await getBlogBySlug(slug);
  const blog = response.blog;

  if (!blog) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = `${baseUrl}/blog/${slug}`;

  // BreadcrumbList
  const bc = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Blog", item: `${baseUrl}/blog` },
    { position: 3, name: blog.title || slug, item: canonical },
  ]);

  // Article schema
  const art = articleSchema({
    title: blog.title,
    url: canonical,
    image: blog.cover || undefined,
    description:
      blog.metaDescription ||
      blog.excerpt ||
      (blog.body
        ? blog.body
            .replace(/<[^>]*>/g, "")
            .substring(0, 160)
            .trim() + "..."
        : undefined),
    authorName: "imast",
    publishedTime: blog.publishedAt || new Date().toISOString(),
    modifiedTime: blog.updatedAt,
  });

  return (
    <>
      <Schema data={[bc, art]} />
      <SingleBlog />
    </>
  );
}

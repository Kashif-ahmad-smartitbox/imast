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
        title: "Article Not Found | IMAST",
        description: "The article you're looking for doesn't exist.",
        robots: "noindex, nofollow",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.imast.in";
    const canonicalUrl = `${baseUrl.replace(/\/$/, "")}/blog/${slug}`;
    const defaultImage =
      "https://res.cloudinary.com/diefvxqdv/image/upload/v1761311252/imast/media/pres-pic2.png";

    const metaDescription =
      blog.metaDescription ||
      blog.excerpt ||
      (blog.body
        ? blog.body
            .replace(/<[^>]*>/g, "")
            .substring(0, 160)
            .trim() + "..."
        : "Read this insightful article on IMAST");

    const openGraph: any = {
      type: "article",
      url: canonicalUrl,
      title: blog.title,
      description: metaDescription,
      siteName: "IMAST",
      images: [blog.cover || defaultImage],
      locale: "en_IN",
    };

    if (blog.publishedAt) openGraph.publishedTime = blog.publishedAt;
    if (blog.updatedAt) openGraph.modifiedTime = blog.updatedAt;
    if (blog.tags?.length) openGraph.tags = blog.tags;

    return {
      title: `${blog.title} | IMAST`,
      description: metaDescription,
      keywords: blog.tags?.join(", "),
      authors: [{ name: "IMAST" }],
      alternates: { canonical: canonicalUrl },
      openGraph,
      twitter: {
        card: "summary_large_image",
        site: "@Imastopl",
        creator: "@Imastopl",
        title: blog.title,
        description: metaDescription,
        images: [blog.cover || defaultImage],
      },
      ...(blog.publishedAt && { publishedTime: blog.publishedAt }),
      ...(blog.updatedAt && { modifiedTime: blog.updatedAt }),
      ...(blog.tags?.length && { keywords: blog.tags.join(", ") }),
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Error | IMAST",
      description: "Error loading article",
      robots: "noindex, nofollow",
    };
  }
}

export default async function SingleBlogPage({ params }: Props) {
  const { slug } = (await params) as { slug: string };

  const response = await getBlogBySlug(slug);
  const blog = response.blog;

  if (!blog) {
    notFound();
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://www.imast.in";
  const canonical = `${baseUrl}/blog/${slug}`;

  const bc = breadcrumbSchema([
    { position: 1, name: "Home", item: `${baseUrl}/` },
    { position: 2, name: "Blog", item: `${baseUrl}/blogs` },
    { position: 3, name: blog.title || slug, item: canonical },
  ]);

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
    authorName: "IMAST",
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

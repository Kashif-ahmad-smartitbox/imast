import React from "react";
import { Metadata } from "next";
import SingleBlog from "@/components/pages/SingleBlog";
import { getBlogBySlug } from "@/app/services/modules/blog";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  try {
    const response = await getBlogBySlug(slug);
    const blog = response.blog;

    if (!blog) {
      return {
        title: "Article Not Found | iMast",
        description: "The article you're looking for doesn't exist.",
        robots: "noindex, nofollow",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imast.in";
    const canonicalUrl = `${baseUrl}/blog/${slug}`;

    const metaDescription =
      blog.metaDescription ||
      blog.excerpt ||
      blog.body
        ?.replace(/<[^>]*>/g, "")
        .substring(0, 160)
        .trim() + "..." ||
      "Read this insightful article on iMast";

    const openGraph: any = {
      type: "article",
      url: canonicalUrl,
      title: blog.title,
      description: metaDescription,
      siteName: "iMast",
      images: [blog.cover || `${baseUrl}/og-image.jpg`],
    };

    // Add optional properties only if they exist
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
    };
  } catch (error) {
    console.log("error", error);
    return {
      title: "Error | iMast",
      description: "Error loading article",
      robots: "noindex, nofollow",
    };
  }
}

function SingleBlogPage({ params }: Props) {
  console.log("params", params);
  return <SingleBlog />;
}

export default SingleBlogPage;

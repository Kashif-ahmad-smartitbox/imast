import React from "react";
import { Metadata } from "next";
import Blogs from "@/components/pages/Blogs";
import { getBlogs } from "@/app/services/modules/blog";

export async function generateMetadata(): Promise<Metadata> {
  try {
    // Fetch blog stats to make metadata more dynamic
    const blogsResponse = await getBlogs({
      status: "published",
      page: 1,
      limit: 1, // We just need the total count
    });

    const totalArticles = blogsResponse.total || 0;
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://imast.com";

    const title =
      totalArticles > 0
        ? `Expert Insights (${totalArticles}+ Articles) | iMast`
        : "Expert Insights & Articles | iMast";

    const description =
      totalArticles > 0
        ? `Explore ${totalArticles}+ in-depth articles, industry trends, and expert perspectives from our team. Stay updated with the latest insights and knowledge.`
        : "Discover in-depth analysis, industry trends, and professional perspectives from our team of experts. Browse our collection of insightful articles.";

    return {
      title,
      description,
      keywords:
        "blog articles, insights, industry trends, expert analysis, professional perspectives, knowledge base, latest updates, curated content",
      authors: [{ name: "iMast" }],
      creator: "iMast",
      publisher: "iMast",
      robots: "index, follow, max-image-preview:large",
      alternates: {
        canonical: `${baseUrl}/blogs`,
      },
      openGraph: {
        type: "website",
        url: `${baseUrl}/blogs`,
        title,
        description,
        siteName: "iMast",
        images: [
          {
            url: `${baseUrl}/blogs-og.jpg`,
            width: 1200,
            height: 630,
            alt: "iMast Blog - Expert Insights and Articles",
          },
        ],
        locale: "en_US",
      },
      twitter: {
        card: "summary_large_image",
        site: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@imast",
        creator: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@imast",
        title,
        description,
        images: [`${baseUrl}/blogs-twitter.jpg`],
      },
      other: {
        "revisit-after": "7 days",
        "geo.region": "US",
        "geo.placename": "United States",
        "content-language": "en",
      },
      verification: {
        // Add your verification codes here
        // google: "your-google-verification-code",
        // yandex: "your-yandex-verification-code",
      },
    };
  } catch (error) {
    // Fallback metadata in case of API failure
    return {
      title: "Expert Insights & Articles | iMast",
      description:
        "Discover in-depth analysis, industry trends, and professional perspectives from our team of experts.",
      robots: "index, follow",
    };
  }
}

function BlogsPage() {
  return <Blogs />;
}

export default BlogsPage;

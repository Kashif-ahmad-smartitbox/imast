// lib/schema.ts
export type JsonLd = Record<string, any>;

/**
 * Organization + WebSite wrapped in @graph (suitable for site-wide placement)
 */
export function organizationSchema({
  name,
  url,
  logo,
  sameAs,
  contactPoint,
}: {
  name: string;
  url: string;
  logo?: string;
  sameAs?: string[];
  contactPoint?: {
    telephone: string;
    contactType?: string;
    areaServed?: string;
  }[];
}): JsonLd {
  const org: any = {
    "@type": "Organization",
    "@id": `${url}#organization`,
    name,
    url,
  };

  if (logo) org.logo = logo;
  if (sameAs && sameAs.length) org.sameAs = sameAs;
  if (contactPoint && contactPoint.length) {
    org.contactPoint = contactPoint.map((c) => ({
      "@type": "ContactPoint",
      telephone: c.telephone,
      contactType: c.contactType || "customer service",
      areaServed: c.areaServed || undefined,
    }));
  }

  const site = {
    "@type": "WebSite",
    "@id": `${url}#website`,
    url,
    name,
    publisher: { "@id": `${url}#organization` },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [org, site],
  };
}

export function breadcrumbSchema(
  items: { position: number; name: string; item: string }[]
): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      name: it.name,
      item: it.item,
    })),
  };
}

export function webPageSchema(payload: {
  name: string;
  url: string;
  description?: string;
}): JsonLd {
  const out: any = {
    "@type": "WebPage",
    url: payload.url,
    name: payload.name,
  };
  if (payload.description) out.description = payload.description;
  return out;
}

/**
 * SoftwareApplication schema producer
 * Use for product/solution pages to increase chance of rich results for apps/products.
 */
export function softwareApplicationSchema(payload: {
  name: string;
  url: string;
  image?: string;
  description?: string;
  operatingSystem?: string;
  applicationCategory?: string;
  publisherName?: string;
}): JsonLd {
  const {
    name,
    url,
    image,
    description,
    operatingSystem,
    applicationCategory,
    publisherName,
  } = payload;
  const out: any = {
    "@type": "SoftwareApplication",
    name,
    url,
  };
  if (image) out.image = image;
  if (description) out.description = description;
  if (operatingSystem) out.operatingSystem = operatingSystem;
  if (applicationCategory) out.applicationCategory = applicationCategory;
  if (publisherName)
    out.publisher = { "@type": "Organization", name: publisherName };
  return out;
}

/**
 * Article schema (useful for blog / case-study pages)
 */
export function articleSchema(payload: {
  title: string;
  url: string;
  image?: string;
  description?: string;
  authorName?: string;
  publishedTime?: string;
  modifiedTime?: string;
}): JsonLd {
  const out: any = {
    "@type": "Article",
    headline: payload.title,
    url: payload.url,
  };
  if (payload.image) out.image = payload.image;
  if (payload.description) out.description = payload.description;
  if (payload.authorName)
    out.author = { "@type": "Organization", name: payload.authorName };
  if (payload.publishedTime) out.datePublished = payload.publishedTime;
  if (payload.modifiedTime) out.dateModified = payload.modifiedTime;
  return out;
}

"use client";

import Script from "next/script";

type Data = Record<string, any> | Record<string, any>[];

export default function Schema({ data }: { data: Data }) {
  const arr = Array.isArray(data) ? data : [data];

  const shouldWrapInGraph =
    arr.length > 1 ||
    (arr.length === 1 &&
      !arr[0]["@graph"] &&
      (!arr[0]["@context"] || arr[0]["@context"] !== "https://schema.org"));

  const json = shouldWrapInGraph
    ? {
        "@context": "https://schema.org",
        "@graph": arr,
      }
    : arr[0];

  return (
    <Script
      id="schema-script"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
      strategy="afterInteractive"
    />
  );
}

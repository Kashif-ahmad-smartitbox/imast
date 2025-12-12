import React from "react";

type Data = Record<string, any> | Record<string, any>[];

export default function Schema({ data }: { data: Data }) {
  const arr = Array.isArray(data) ? data : [data];

  const singleHasContextAndGraph =
    arr.length === 1 &&
    (arr[0]["@graph"] ||
      (arr[0]["@context"] && arr[0]["@graph"] !== undefined));

  const json = singleHasContextAndGraph
    ? arr[0]
    : {
        "@context": "https://schema.org",
        "@graph": arr,
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

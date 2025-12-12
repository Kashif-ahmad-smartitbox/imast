"use client";

import { useEffect } from "react";

export default function MetaTagFixer() {
  useEffect(() => {
    // Wait a bit for all meta tags to be rendered
    setTimeout(() => {
      // Find all meta, link, and title tags in the body
      const bodyMetaTags = document.body.querySelectorAll(
        'meta, link[rel="canonical"], link[rel="alternate"], title'
      );

      // Move them to head
      bodyMetaTags.forEach((tag) => {
        if (tag.parentNode === document.body) {
          document.head.appendChild(tag);
        }
      });
    }, 100);
  }, []);

  return null;
}

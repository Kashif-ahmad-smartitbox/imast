"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export function usePreviousUrl() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    const currentUrl =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");

    previousUrl.current = currentUrl;
  }, [pathname, searchParams]);

  return previousUrl.current;
}

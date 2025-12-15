"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationContextType = {
  previousUrl: string | null;
  currentUrl: string;
};

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const previousUrlRef = useRef<string | null>(null);
  const currentUrlRef = useRef<string>("");

  useEffect(() => {
    const fullUrl =
      pathname + (searchParams.toString() ? `?${searchParams}` : "");

    previousUrlRef.current = currentUrlRef.current || null;
    currentUrlRef.current = fullUrl;
  }, [pathname, searchParams]);

  return (
    <NavigationContext.Provider
      value={{
        previousUrl: previousUrlRef.current,
        currentUrl: currentUrlRef.current,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used inside NavigationProvider");
  }
  return context;
}

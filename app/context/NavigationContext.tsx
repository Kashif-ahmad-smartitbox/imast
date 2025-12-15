"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type NavigationContextType = {
  previousUrl: string;
  currentUrl: string;
  navigateFrom: string | null;
};

const NavigationContext = createContext<NavigationContextType>({
  previousUrl: "/",
  currentUrl: "",
  navigateFrom: null,
});

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [navigationState, setNavigationState] = useState<NavigationContextType>(
    {
      previousUrl: "",
      currentUrl: "",
      navigateFrom: null,
    }
  );

  useEffect(() => {
    // Store the navigation state in sessionStorage for persistence
    const storedNavigation = sessionStorage.getItem("imast-navigation");
    const initialPreviousUrl = storedNavigation
      ? JSON.parse(storedNavigation).currentUrl
      : null;

    const fullUrl =
      pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    setNavigationState({
      previousUrl: initialPreviousUrl,
      currentUrl: fullUrl,
      navigateFrom: initialPreviousUrl,
    });

    // Store current URL for next navigation
    sessionStorage.setItem(
      "imast-navigation",
      JSON.stringify({
        currentUrl: fullUrl,
        timestamp: Date.now(),
      })
    );
  }, [pathname, searchParams]);

  return (
    <NavigationContext.Provider value={navigationState}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}

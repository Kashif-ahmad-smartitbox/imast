"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Image,
  BarChart2,
  Users,
  Settings,
  Globe,
  LucideIcon,
} from "lucide-react";
import DashHeader from "@/components/dashboard/DashHeader";
import MobileDrawer from "@/components/dashboard/MobileDrawer";
import React, { useEffect, useState, useCallback } from "react";
import { AuthProvider } from "@/app/services/context/AuthContext";
import DesktopSidebar from "@/components/dashboard/DesktopSidebar";
import ExpandSidebarButton from "@/components/dashboard/ExpandSidebarButton";

const SIDEBAR_W = 280;
const SIDEBAR_COMPACT_W = 72;
const HEADER_H = 70;

export interface NavigationItem {
  id: string;
  label: string;
  Icon: LucideIcon;
  badge?: number;
  href?: string;
  children?: NavigationItem[];
}

interface LayoutProps {
  children: React.ReactNode;
}

export const SIDEBAR_ITEMS: NavigationItem[] = [
  { href: "/admin/dashboard", id: "overview", label: "Overview", Icon: Home },
  {
    id: "content",
    label: "Content",
    Icon: FileText,
    badge: 3,
    children: [
      {
        href: "/admin/dashboard/content/pages",
        id: "pages",
        label: "Pages",
        Icon: FileText,
      },
      {
        href: "/admin/dashboard/content/blogs",
        id: "blogs",
        label: "Blogs",
        Icon: FileText,
      },
      {
        href: "/admin/dashboard/content/stories",
        id: "stories",
        label: "Stories",
        Icon: FileText,
      },
    ],
  },
  { href: "/admin/dashboard/media", id: "media", label: "Media", Icon: Image },
  {
    href: "/admin/dashboard/analytics",
    id: "analytics",
    label: "Analytics",
    Icon: BarChart2,
  },
  { href: "/admin/dashboard/team", id: "team", label: "Team", Icon: Users },
  {
    href: "/admin/dashboard/seo",
    id: "seo",
    label: "SEO",
    Icon: Globe,
    badge: 12,
  },
  {
    href: "/admin/dashboard/setting",
    id: "settings",
    label: "Settings",
    Icon: Settings,
  },
];

const useKeyboardShortcuts = (callbacks: { [key: string]: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const callback = callbacks[key];

      if (callback && (e.ctrlKey || e.metaKey || e.key === "Escape")) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callbacks]);
};

export default function ImastLayout({ children }: LayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const getActiveItem = useCallback(() => {
    // Exact match first
    const exactMatch = SIDEBAR_ITEMS.find((item) => item.href === pathname);
    if (exactMatch) return exactMatch.id;

    // Check children for exact matches
    for (const item of SIDEBAR_ITEMS) {
      if (item.children) {
        const childExactMatch = item.children.find(
          (child) => child.href === pathname
        );
        if (childExactMatch) return childExactMatch.id;
      }
    }

    // Fallback: find by path segment for nested routes
    const pathMatch = SIDEBAR_ITEMS.find(
      (item) => item.href && pathname.startsWith(item.href + "/")
    );
    if (pathMatch) return pathMatch.id;

    // Check children for path matches
    for (const item of SIDEBAR_ITEMS) {
      if (item.children) {
        const childPathMatch = item.children.find(
          (child) => child.href && pathname.startsWith(child.href + "/")
        );
        if (childPathMatch) return childPathMatch.id;
      }
    }

    // Default to overview
    return "overview";
  }, [pathname]);

  const activeItem = getActiveItem();

  useKeyboardShortcuts({
    b: () => setSidebarExpanded((s) => !s),
    escape: () => setDrawerOpen(false),
  });

  const handleSidebarToggle = useCallback(() => {
    setSidebarExpanded((s) => !s);
  }, []);

  const handleNavigation = useCallback(
    (href: string | undefined) => {
      if (!href) return;

      // Close drawer if open
      setDrawerOpen(false);

      // Navigate
      router.push(href);
    },
    [router]
  );

  const handleItemClick = useCallback(
    (id: string, href?: string) => {
      console.log("Item clicked:", id, href);
      if (href) {
        handleNavigation(href);
      }
    },
    [handleNavigation]
  );

  const handleMenuOpen = useCallback(() => {
    setDrawerOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerOpen(false);
  }, []);

  return (
    <AuthProvider>
      <div
        className="min-h-screen antialiased bg-gray-50 text-gray-900"
        style={
          {
            ["--sidebar-w"]: `${SIDEBAR_W}px`,
            ["--sidebar-compact-w"]: `${SIDEBAR_COMPACT_W}px`,
            ["--header-h"]: `${HEADER_H}px`,
          } as React.CSSProperties
        }
      >
        <div className="flex h-screen">
          <DesktopSidebar
            isExpanded={sidebarExpanded}
            isMobile={false}
            activeItem={activeItem}
            onToggle={handleSidebarToggle}
            onItemClick={handleItemClick}
          />

          {!sidebarExpanded && (
            <ExpandSidebarButton onExpand={handleSidebarToggle} />
          )}

          <MobileDrawer
            isExpanded={false}
            isMobile={drawerOpen}
            activeItem={activeItem}
            onToggle={handleSidebarToggle}
            onItemClick={handleItemClick}
            onClose={handleDrawerClose}
          />

          <div className="flex-1 flex flex-col min-w-0">
            <DashHeader onMenuClick={handleMenuOpen} activeItem={activeItem} />

            <main className="flex-1 min-h-0 overflow-auto p-6 bg-gray-50/30">
              {children}
            </main>
          </div>
        </div>
      </div>
    </AuthProvider>
  );
}

"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import BrandSection from "./BrandSection";
import NavigationItem from "./NavigationItem";
import { classNames } from "@/lib/classNames";
import type { NavigationItem as NavItemType } from "@/app/admin/dashboard/layout";
import { SIDEBAR_ITEMS } from "@/app/admin/dashboard/layout";

interface DesktopSidebarProps {
  isExpanded: boolean;
  isMobile?: boolean;
  activeItem?: string; // optional override from parent
  onToggle: () => void;
  onItemClick: (id: string, href?: string) => void;
  onClose?: () => void;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  isExpanded,
  isMobile = false,
  activeItem,
  onToggle,
  onItemClick,
}) => {
  const pathname = usePathname() || "/";

  // Determine active id: prop override > URL matching (exact or startsWith) > first item
  const currentActiveId = useMemo(() => {
    if (activeItem) return activeItem;

    const exact = SIDEBAR_ITEMS.find((it) => it.href === pathname)?.id;
    if (exact) return exact;

    // fallback to startsWith match (handles nested routes)
    const startsWith = SIDEBAR_ITEMS.find(
      (it) => it.href && pathname.startsWith(it.href)
    )?.id;
    return startsWith || SIDEBAR_ITEMS[0]?.id || "";
  }, [activeItem, pathname]);

  return (
    <aside
      className={classNames(
        "hidden lg:flex lg:flex-col border-r transition-all duration-300 bg-white border-gray-100 shadow-sm",
        isExpanded ? "w-[var(--sidebar-w)]" : "w-[var(--sidebar-compact-w)]"
      )}
      aria-label="Main navigation"
    >
      <BrandSection
        isExpanded={isExpanded}
        onToggle={onToggle}
        ariaLabel="Toggle sidebar"
      />

      <nav className="px-3 py-6 flex-1 overflow-auto" aria-label="Sidebar">
        <ul className="space-y-1" role="menubar" aria-orientation="vertical">
          {SIDEBAR_ITEMS.map((item) => (
            <NavigationItem
              key={item.id}
              item={item as NavItemType}
              isActive={currentActiveId === item.id}
              isExpanded={isExpanded}
              onClick={(id, href) => onItemClick(id, href)}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DesktopSidebar;

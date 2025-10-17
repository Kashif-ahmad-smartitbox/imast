import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { SIDEBAR_ITEMS } from "@/app/admin/dashboard/layout";

import BrandSection from "./BrandSection";

interface MobileDrawerProps {
  isExpanded: boolean;
  isMobile: boolean;
  activeItem: string;
  onToggle: () => void;
  onItemClick: (id: string) => void;
  onClose?: () => void;
}

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLocked]);
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isMobile,
  activeItem,
  onItemClick,
  onClose,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const firstDrawerButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(isMobile);

  useEffect(() => {
    if (isMobile) {
      firstDrawerButtonRef.current?.focus();
    }
  }, [isMobile]);

  if (!isMobile) return null;

  return (
    <div
      className="fixed inset-0 z-40 lg:hidden"
      aria-hidden={!isMobile}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="absolute inset-0 transition-opacity duration-200 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        ref={drawerRef}
        className="absolute left-0 top-0 bottom-0 w-[var(--sidebar-w)] transform transition-transform duration-300 translate-x-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-full flex flex-col bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between mb-8">
            <BrandSection isExpanded={true} />
            <button
              ref={firstDrawerButtonRef}
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-auto">
            <ul className="space-y-2" role="navigation">
              {SIDEBAR_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      onItemClick(item.id);
                      onClose?.();
                    }}
                    className={`w-full flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      activeItem === item.id
                        ? "bg-blue-50 text-primary-700 border border-blue-100"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.Icon className="w-5 h-5" aria-hidden />
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileDrawer;

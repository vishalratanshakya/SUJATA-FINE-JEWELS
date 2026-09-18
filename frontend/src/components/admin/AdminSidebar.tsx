"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  FolderKanban,
  LayoutGrid,
  Award,
  FileText,
  ShieldAlert,
  Tag,
  BookOpen,
  Boxes,
  Settings,
  UserCheck,
  ChevronRight,
  Layers
} from "lucide-react";


type SidebarItem = {
  name: string;
  href: string;
  icon: any;
  isHome?: boolean;
};

type SidebarSection = {
  title?: string;
  items: SidebarItem[];
};

const SIDEBAR_SECTIONS: SidebarSection[] = [
  {
    items: [
      { name: "Dashboard", href: "/admin", icon: Home, isHome: true },
    ],
  },
  {
    title: "STORE MANAGEMENT",
    items: [
      { name: "Products", href: "/admin/products", icon: Package },
      { name: "Categories", href: "/admin/categories", icon: Layers },
      { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
      { name: "Customers", href: "/admin/customers", icon: Users },
      { name: "Collections", href: "/admin/collections", icon: FolderKanban },
      { name: "Homepage", href: "/admin/banners", icon: LayoutGrid },
    ],
  },


  {
    title: "JEWELLERY CONTENT",
    items: [
      { name: "Jewellery Certificates", href: "/admin/certificates", icon: Award },
      { name: "Product Details", href: "/admin/jewellery-content", icon: FileText },
      { name: "Care Instructions", href: "/admin/jewellery-content?tab=care", icon: ShieldAlert },
    ],
  },
  {
    title: "PROMOTIONS",
    items: [
      { name: "Offers & Coupons", href: "/admin/coupons", icon: Tag },
    ],
  },
  {
    title: "JOURNAL",
    items: [
      { name: "Articles", href: "/admin/journal", icon: BookOpen },
    ],
  },
  {
    title: "INVENTORY",
    items: [
      { name: "Stock Management", href: "/admin/inventory", icon: Boxes },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Store Settings", href: "/admin/settings", icon: Settings },
    ],
  },
  {
    title: "ADMIN USERS",
    items: [
      { name: "Admin Users", href: "/admin/users", icon: UserCheck },
    ],
  },
];

import { X } from "lucide-react";

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`w-64 bg-[#0F0E0D] text-white min-h-screen flex flex-col fixed inset-y-0 left-0 z-50 overflow-y-auto border-r border-white/10 hide-scrollbar no-scrollbar select-none transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-24 flex items-center justify-between px-6 border-b border-white/10 flex-shrink-0 bg-[#0F0E0D]">
          <Link href="/" className="flex flex-col items-center mx-auto">
            <span className="font-serif text-2xl tracking-[0.25em] font-medium text-amber-200/90 leading-none uppercase">
              SUJATA
            </span>
            <span className="text-[9px] tracking-[0.45em] font-light mt-1.5 text-amber-100/60 uppercase">
              FINE JEWELS
            </span>
          </Link>
          {/* Mobile Close Button */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 text-white/60 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 px-3 py-4 space-y-5">
          {SIDEBAR_SECTIONS.map((sec, idx) => (
            <div key={idx} className="space-y-1">
              {sec.title && (
                <div className="text-[9px] font-bold tracking-[0.15em] text-white/40 uppercase px-3 pt-2 pb-1.5">
                  {sec.title}
                </div>
              )}

              {sec.items.map((item) => {
                const isActive = item.isHome
                  ? pathname === "/admin"
                  : pathname === item.href || (pathname.startsWith(item.href) && item.href !== "/admin");
                const Icon = item.icon;

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs transition-all ${
                      isActive
                        ? "bg-[#352B1E] text-amber-200 font-semibold shadow-sm"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon size={15} className={isActive ? "text-amber-200" : "text-white/60"} />
                      <span>{item.name}</span>
                    </div>

                    {!item.isHome && (
                      <ChevronRight size={13} className={isActive ? "text-amber-200" : "text-white/30"} />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}



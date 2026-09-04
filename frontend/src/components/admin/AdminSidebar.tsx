"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PackageSearch,
  Image as ImageIcon,
  Users,
  ShoppingCart,
  Settings,
  LogOut,
  Tag,
  LayoutGrid,
  Award,
} from "lucide-react";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Products", href: "/admin/products", icon: PackageSearch },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Hero Banners", href: "/admin/banners", icon: ImageIcon },
  { name: "Homepage Sections", href: "/admin/sections", icon: LayoutGrid },
  { name: "Coupons", href: "/admin/coupons", icon: Tag },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-charcoal text-white min-h-screen flex flex-col fixed inset-y-0 left-0 z-50">

      {/* Logo */}
      <div className="h-20 flex flex-col items-center justify-center border-b border-white/10 mt-4 mb-4">
        <Link href="/" className="flex flex-col items-center">
          <span className="font-serif text-xl tracking-widest leading-none">SUJATA</span>
          <span className="text-[8px] tracking-[0.4em] font-light mt-1 text-champagne uppercase">Admin</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded text-sm transition-colors ${
                isActive
                  ? "bg-white/10 text-champagne font-medium"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center space-x-3 px-4 py-3 w-full text-sm text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

    </aside>
  );
}

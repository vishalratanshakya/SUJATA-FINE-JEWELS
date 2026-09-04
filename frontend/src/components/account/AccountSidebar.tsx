"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import {
  User,
  Package,
  Heart,
  MapPin,
  Gem,
  Eye,
  Bell,
  Settings,
  LogOut,
  Headphones,
  ShoppingBag,
} from "lucide-react";

export function AccountSidebar({ unreadCount = 2 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();

  // Zustand cart state
  const cartItems = useStore((s) => s.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    toast.success("Signed out successfully");
    router.push("/login");
  };

  const navItems = [
    { id: "overview", label: "Profile Overview", href: "/account", icon: User },
    { id: "orders", label: "My Orders", href: "/account/orders", icon: Package },
    { id: "cart", label: "Shopping Bag", href: "/account/bag", icon: ShoppingBag, badge: cartCount > 0 ? cartCount : undefined },
    { id: "wishlist", label: "Wishlist", href: "/account/wishlist", icon: Heart },
    { id: "addresses", label: "Saved Addresses", href: "/account/addresses", icon: MapPin },
    { id: "jewellery", label: "My Jewellery", href: "/account/my-jewellery", icon: Gem },
    { id: "notifications", label: "Notifications", href: "/account/notifications", icon: Bell, badge: unreadCount },
    { id: "settings", label: "Account Settings", href: "/account/settings", icon: Settings },
  ];

  return (
    <aside className="w-full lg:w-72 bg-[#FAF8F5] lg:sticky lg:top-28 space-y-6 flex-shrink-0">
      
      {/* Mobile Horizontal Navigation Bar */}
      <div className="lg:hidden bg-white rounded-xl p-3 border border-[#EAE4D9] shadow-xs overflow-x-auto no-scrollbar flex space-x-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/account" && pathname?.startsWith(item.href));
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => router.push(item.href)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex-shrink-0 cursor-pointer ${
                isActive
                  ? "bg-[#F5EFE6] text-[#B38E5D] font-bold border border-[#B38E5D]/30"
                  : "text-[#6B6357] hover:text-[#2C2825]"
              }`}
            >
              <Icon size={16} className={isActive ? "text-[#B38E5D]" : "text-[#8C8275]"} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Vertical Sidebar */}
      <div className="hidden lg:block bg-white rounded-2xl p-4 border border-[#EAE4D9] shadow-xs">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/account" && pathname?.startsWith(item.href));
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                  isActive
                    ? "bg-[#F5EFE6] text-[#B38E5D] border-l-4 border-[#B38E5D] font-bold shadow-2xs"
                    : "text-[#6B6357] hover:text-[#2C2825] hover:bg-[#FDFBF7]"
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <Icon size={18} className={isActive ? "text-[#B38E5D]" : "text-[#8C8275]"} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span className="w-5 h-5 rounded-full bg-[#B38E5D] text-white text-[10px] flex items-center justify-center font-mono font-bold">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="w-full h-px bg-[#EAE4D9] my-3" />

        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3.5 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* Need Help Card */}
      <div className="hidden lg:flex bg-white rounded-2xl p-5 border border-[#EAE4D9] shadow-xs items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-[#F5EFE6] text-[#B38E5D] flex items-center justify-center flex-shrink-0">
          <Headphones size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2825]">NEED HELP?</h4>
          <p className="text-[11px] text-[#8C8275] truncate">Our team is here to assist you</p>
          <Link
            href="/contact"
            className="mt-2 inline-block px-4 py-1.5 border border-[#E2DDD3] rounded-lg text-[10px] font-bold uppercase tracking-widest text-[#B38E5D] hover:bg-[#2C2825] hover:text-white transition-colors"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </aside>
  );
}

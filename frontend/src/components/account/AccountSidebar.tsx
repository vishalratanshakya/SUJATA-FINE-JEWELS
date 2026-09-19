"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useStore } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { useAuth } from "@/components/providers/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Package,
  Heart,
  MapPin,
  Gem,
  Bell,
  Settings,
  LogOut,
  Headphones,
  ShoppingBag,
  Menu,
  X
} from "lucide-react";

export function AccountSidebar({ unreadCount = 2 }: { unreadCount?: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Zustand cart state
  const cartItems = useStore((s) => s.cart);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const { logout } = useAuth();
  
  const handleLogout = () => {
    logout();
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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Header (Replaces main Navbar on mobile) */}
      <div className="lg:hidden fixed top-0 left-0 w-full z-50 bg-ivory/95 backdrop-blur-md shadow-sm border-b border-[#EAE4D9] px-4 h-[72px] flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-charcoal hover:text-champagne transition-colors"
          >
            <Menu size={24} strokeWidth={1} />
          </button>
        </div>
        <Link href="/" className="flex flex-col items-center group absolute left-1/2 -translate-x-1/2">
          <span className="font-serif text-2xl tracking-wider leading-none text-charcoal">SUJATA</span>
          <span className="text-[9px] tracking-[0.3em] font-light mt-1 text-charcoal/70">FINE JEWELS</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/account/bag" className="text-charcoal hover:text-champagne transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-champagne text-white text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] lg:hidden"
            />

            {/* Sidebar Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#FAF8F5] text-charcoal z-[110] overflow-y-auto lg:hidden flex flex-col shadow-2xl"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-6 border-b border-[#EAE4D9] bg-white">
                <span className="font-serif text-2xl tracking-wider text-[#2C2825]">Account</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-charcoal hover:text-champagne transition-colors bg-charcoal/5 rounded-full"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col p-4 space-y-1 pb-24">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== "/account" && pathname?.startsWith(item.href));
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => router.push(item.href)}
                      className={`w-full flex items-center justify-between px-4 py-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-200 text-left cursor-pointer ${
                        isActive
                          ? "bg-[#F5EFE6] text-[#B38E5D] border-l-4 border-[#B38E5D] font-bold shadow-2xs"
                          : "text-[#6B6357] hover:text-[#2C2825] hover:bg-white"
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

                <div className="w-full h-px bg-[#EAE4D9] my-4" />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3.5 px-4 py-4 text-xs font-semibold uppercase tracking-wider text-rose-700 hover:bg-rose-50 rounded-xl transition-colors"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
                
                <Link href="/" className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-[#B38E5D] hover:underline py-4 block">
                  ← Back to Store
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <aside className="hidden lg:block w-72 bg-[#FAF8F5] sticky top-28 space-y-6 flex-shrink-0">
        
        {/* Desktop Vertical Sidebar */}
        <div className="bg-white rounded-2xl p-4 border border-[#EAE4D9] shadow-xs">
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
        <div className="flex bg-white rounded-2xl p-5 border border-[#EAE4D9] shadow-xs items-center space-x-4">
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
    </>
  );
}

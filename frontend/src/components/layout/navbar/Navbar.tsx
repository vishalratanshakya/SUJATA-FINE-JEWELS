"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DesktopNav } from "./DesktopNav";
import { RightActions } from "./RightActions";
import { MobileNav } from "./MobileNav";
import { Heart, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/store/useStore";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Zustand state
  const cartItems = useStore((state) => state.cart);
  const wishlistItems = useStore((state) => state.wishlist);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialize state on mount
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        pathname?.startsWith("/account") ? "hidden lg:block " : ""
      }${
        isScrolled 
          ? "bg-ivory/95 backdrop-blur-md shadow-sm text-charcoal border-b border-charcoal/5" 
          : (isHome ? "bg-transparent text-white" : "bg-transparent text-charcoal")
      }`}
    >
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 h-[72px] md:h-[82px] flex items-center justify-between">
        
        {/* Mobile Left: Hamburger */}
        <div className="lg:hidden flex-1 flex justify-start">
          <MobileNav />
        </div>

        {/* Center/Left: Brand */}
        <div className="flex-1 flex justify-center lg:justify-start">
          <Link href="/" className="flex flex-col items-center lg:items-start group">
            <span className="font-serif text-2xl md:text-[28px] tracking-wider leading-none group-hover:text-champagne transition-colors">SUJATA</span>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] font-light mt-1 text-inherit/70">FINE JEWELS</span>
          </Link>
        </div>

        {/* Desktop Center: Navigation */}
        <div className="hidden lg:block flex-none">
          <DesktopNav />
        </div>

        {/* Desktop Right: Actions */}
        <div className="hidden lg:flex flex-1 justify-end">
          <RightActions />
        </div>

        {/* Mobile Right: Actions */}
        <div className="lg:hidden flex-1 flex justify-end items-center space-x-4">
          <Link href="/account" aria-label="Account" className="hover:text-champagne transition-colors">
            <User size={20} strokeWidth={1} />
          </Link>
          <Link href="/account/wishlist" aria-label="Wishlist" className="hover:text-champagne transition-colors relative">
            <Heart size={20} strokeWidth={1} />
            {isMounted && wishlistItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-champagne text-white text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {wishlistItems.length}
              </span>
            )}
          </Link>
          <Link href="/cart" aria-label="Cart" className="hover:text-champagne transition-colors relative">
            <ShoppingBag size={20} strokeWidth={1} />
            {isMounted && cartItems.length > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-charcoal text-white text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>

      </div>
    </header>
  );
}

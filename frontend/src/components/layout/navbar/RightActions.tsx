"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { useAuth } from "@/components/providers/AuthProvider";

export function RightActions() {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  
  // Zustand state
  const wishlistItems = useStore((state) => state.wishlist);
  const cartItems = useStore((state) => state.cart);
  
  // Hydration state
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Calculate actual counts
  const wishlistCount = isMounted ? wishlistItems.length : 0;
  const cartCount = isMounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;
  
  // Real auth state
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex-1 flex justify-end items-center space-x-5 md:space-x-6 relative">
      
      {/* Search */}
      <Link 
        href="/search"
        aria-label="Search" 
        className="hover:text-champagne transition-colors duration-200"
      >
        <Search size={20} strokeWidth={1} />
      </Link>

      {/* Wishlist */}
      <Link href="/account/wishlist" aria-label="Wishlist" className="hover:text-champagne transition-colors duration-200 relative">
        <Heart size={20} strokeWidth={1} />
        {wishlistCount > 0 && (
          <span className="absolute -top-1.5 -right-2 bg-champagne text-white text-[9px] w-[14px] h-[14px] rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* User Account Link / Login */}
      {isAuthenticated ? (
        <Link 
          href="/account" 
          aria-label="Account" 
          className="hover:text-champagne transition-colors duration-200 py-4 flex items-center"
        >
          <User size={20} strokeWidth={1} />
        </Link>
      ) : (
        <Link 
          href="/login" 
          className="hover:text-champagne transition-colors duration-200 py-4 flex items-center text-[10px] md:text-[11px] uppercase tracking-widest font-medium"
        >
          Login / Sign Up
        </Link>
      )}



    </div>
  );
}

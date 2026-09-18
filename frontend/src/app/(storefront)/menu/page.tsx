"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SHOP_CATEGORIES, COLLECTIONS } from "@/data/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export default function MobileMenuPage() {
  const [openAccordion, setOpenAccordion] = useState<"shop" | "collections" | null>("shop");
  
  const { isAuthenticated } = useAuth();

  const toggleAccordion = (name: "shop" | "collections") => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <div className="bg-ivory text-charcoal min-h-screen px-6 py-8 pb-20">
      
      <div className="border-b border-charcoal/10 pb-6 mb-6">
        <h1 className="font-serif text-3xl tracking-wider text-charcoal">Menu</h1>
      </div>

      <div className="flex flex-col">
        <Link href="/" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium hover:text-champagne transition-colors">Home</Link>
        
        {/* Shop Accordion */}
        <div className="border-b border-charcoal/5">
          <button 
            onClick={() => toggleAccordion("shop")}
            className="w-full py-4 flex items-center justify-between text-sm tracking-widest uppercase font-medium hover:text-champagne transition-colors"
          >
            <span>Shop</span>
            {openAccordion === "shop" ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
          </button>
          <AnimatePresence>
            {openAccordion === "shop" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-2 pb-4 flex flex-col space-y-4 pl-4">
                  {SHOP_CATEGORIES.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link 
                        key={cat.slug} 
                        href={`/shop/${cat.slug}`}
                        className="flex items-center space-x-4 text-sm hover:text-champagne transition-colors"
                      >
                        <Icon size={18} className="text-charcoal/60" />
                        <span>{cat.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Collections Accordion */}
        <div className="border-b border-charcoal/5">
          <button 
            onClick={() => toggleAccordion("collections")}
            className="w-full py-4 flex items-center justify-between text-sm tracking-widest uppercase font-medium hover:text-champagne transition-colors"
          >
            <span>Collections</span>
            {openAccordion === "collections" ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
          </button>
          <AnimatePresence>
            {openAccordion === "collections" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="py-2 pb-4 flex flex-col space-y-4 pl-4">
                  {COLLECTIONS.map((col) => (
                    <Link 
                      key={col.slug} 
                      href={`/collections/${col.slug}`}
                      className="font-serif text-lg hover:text-champagne transition-colors"
                    >
                      {col.name}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link href="/new-arrivals" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium hover:text-champagne transition-colors">New Arrivals</Link>
        <Link href="/best-sellers" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium hover:text-champagne transition-colors">Best Sellers</Link>
        <Link href="/about" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium hover:text-champagne transition-colors">Our Story</Link>

        <div className="pt-12 flex flex-col space-y-6">
          <Link href="/search" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">Search</Link>
          {isAuthenticated ? (
            <>
              <Link href="/account" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">My Account</Link>
              <Link href="/account/wishlist" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">My Wishlist</Link>
              <Link href="/account/orders" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">My Orders</Link>
            </>
          ) : (
            <Link href="/login" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">Login / Sign Up</Link>
          )}
          <Link href="/contact" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">Contact</Link>
        </div>
      </div>
    </div>
  );
}

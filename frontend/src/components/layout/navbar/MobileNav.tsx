"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SHOP_CATEGORIES, COLLECTIONS } from "@/data/navigation";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<"shop" | "collections" | null>(null);

  const toggleAccordion = (name: "shop" | "collections") => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <button 
        aria-label="Open Menu" 
        className="lg:hidden hover:text-champagne transition-colors"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} strokeWidth={1} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-ivory text-charcoal z-[100] flex flex-col h-screen overflow-hidden lg:hidden"
          >
            {/* Header */}
            <div className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-charcoal/10">
              <Link href="/" className="flex flex-col" onClick={closeMenu}>
                <span className="font-serif text-2xl tracking-wider leading-none">SUJATA</span>
                <span className="text-[9px] tracking-[0.3em] font-light mt-1">FINE JEWELS</span>
              </Link>
              <button aria-label="Close Menu" onClick={closeMenu} className="hover:text-champagne transition-colors p-2">
                <X size={24} strokeWidth={1} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-8">
              
              <Link href="/" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium" onClick={closeMenu}>Home</Link>
              
              {/* Shop Accordion */}
              <div className="border-b border-charcoal/5">
                <button 
                  onClick={() => toggleAccordion("shop")}
                  className="w-full py-4 flex items-center justify-between text-sm tracking-widest uppercase font-medium"
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
                              onClick={closeMenu}
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
                  className="w-full py-4 flex items-center justify-between text-sm tracking-widest uppercase font-medium"
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
                            onClick={closeMenu}
                          >
                            {col.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link href="/new-arrivals" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium" onClick={closeMenu}>New Arrivals</Link>
              <Link href="/best-sellers" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium" onClick={closeMenu}>Best Sellers</Link>
              <Link href="/about" className="block py-4 text-sm tracking-widest uppercase border-b border-charcoal/5 font-medium" onClick={closeMenu}>Our Story</Link>

              <div className="pt-12 pb-8 flex flex-col space-y-6">
                <Link href="/search" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors" onClick={closeMenu}>Search</Link>
                <Link href="/account" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors" onClick={closeMenu}>My Account</Link>
                <Link href="/account/wishlist" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors" onClick={closeMenu}>My Wishlist</Link>
                <Link href="/account/orders" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors" onClick={closeMenu}>My Orders</Link>
                <Link href="/contact" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors" onClick={closeMenu}>Contact</Link>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

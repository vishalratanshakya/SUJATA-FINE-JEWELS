"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SHOP_CATEGORIES, COLLECTIONS } from "@/data/navigation";
import { useAuth } from "@/components/providers/AuthProvider";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<"shop" | "collections" | null>("shop");
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const toggleAccordion = (name: "shop" | "collections") => {
    setOpenAccordion(openAccordion === name ? null : name);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        aria-label="Open Menu" 
        className="lg:hidden hover:text-champagne transition-colors"
      >
        <Menu size={24} strokeWidth={1} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm z-[100] lg:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-ivory text-charcoal z-[110] overflow-y-auto lg:hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-charcoal/10">
                <span className="font-serif text-2xl tracking-wider">Menu</span>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-charcoal hover:text-champagne transition-colors bg-charcoal/5 rounded-full"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col px-6 py-4 pb-24">
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

                <div className="pt-8 flex flex-col space-y-6">
                  <Link href="/contact" className="text-sm tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors">Contact</Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

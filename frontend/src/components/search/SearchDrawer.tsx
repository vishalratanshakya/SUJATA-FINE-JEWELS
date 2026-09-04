"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/mockData";

type SearchDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function SearchDrawer({ isOpen, onClose }: SearchDrawerProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when drawer opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery(""); // Clear query on close
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Simple client-side search against mock data
  const searchResults = query.trim().length > 1
    ? FEATURED_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="w-full bg-ivory text-charcoal shadow-2xl pt-8 pb-12 px-6 md:px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-[1200px] mx-auto">
              
              {/* Header / Search Input */}
              <div className="flex items-center justify-between border-b border-charcoal/20 pb-4 mb-8">
                <div className="flex items-center flex-1 pr-8">
                  <Search size={24} className="text-charcoal/50 mr-4" />
                  <input 
                    ref={inputRef}
                    type="text" 
                    placeholder="Search for jewelry, collections, or materials..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-xl md:text-3xl font-serif text-charcoal placeholder:text-charcoal/30"
                  />
                </div>
                <button 
                  onClick={onClose}
                  className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors"
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>

              {/* Results Area */}
              <div className="min-h-[40vh] max-h-[60vh] overflow-y-auto pr-4">
                {query.length <= 1 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center opacity-60 py-20">
                    <Search size={48} strokeWidth={1} className="mb-4" />
                    <p className="font-serif text-2xl mb-2">What are you looking for?</p>
                    <p className="text-sm">Start typing to search our collection.</p>
                  </div>
                ) : searchResults.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20">
                    <p className="font-serif text-2xl mb-2">No results found for "{query}"</p>
                    <p className="text-sm opacity-60">Try searching for generic terms like "Ring", "Diamond", or "Gold".</p>
                  </div>
                ) : (
                  <div>
                    <h3 className="text-xs uppercase tracking-[0.2em] text-charcoal/50 mb-6">
                      Results ({searchResults.length})
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
                      {searchResults.map((product) => (
                        <Link 
                          key={product.id} 
                          href={`/product/${product.slug}`}
                          onClick={onClose}
                          className="group flex flex-col"
                        >
                          <div className="relative aspect-square overflow-hidden bg-white mb-4">
                            <Image 
                              src={product.images[0]} 
                              alt={product.name}
                              fill
                              sizes="(max-width: 768px) 50vw, 25vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                          </div>
                          <h4 className="font-serif text-lg mb-1 group-hover:text-champagne transition-colors">{product.name}</h4>
                          <p className="text-sm text-charcoal/60 mb-2">{product.category}</p>
                          <p className="text-sm mt-auto">
                            ${product.price.toLocaleString()}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

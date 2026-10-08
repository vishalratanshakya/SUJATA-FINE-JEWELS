"use client";

import { useState } from "react";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

const CATEGORIES = ["All", "Necklaces", "Earrings", "Rings", "Bracelets", "Pendants", "Bridal"];

export function ExploreCollection() {
  const products = useStore((s) => s.products);
  const [activeCategory, setActiveCategory] = useState("All");

  const displayProducts = products.filter((p) => {
    if (!p.isExploreCollection) return false;
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section className="py-8 md:py-12 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="animate-in fade-in slide-in-from-left-8 duration-700 ease-out fill-mode-both">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide mb-2">
              Explore Our Collection
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Discover masterfully cut diamonds and certified 22K gold jewelry
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:gap-3 animate-in fade-in slide-in-from-right-8 duration-700 delay-200 ease-out fill-mode-both">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-charcoal text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 ease-out fill-mode-both">
          {displayProducts.slice(0, 8).map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-[22%] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
          {displayProducts.length === 0 && (
            <div className="col-span-4 text-center py-12 text-gray-400">
              No products found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

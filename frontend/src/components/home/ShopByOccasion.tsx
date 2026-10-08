"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";
import { ArrowRight } from "lucide-react";

export function ShopByOccasionSection() {
  const products = useStore((s) => s.products);
  const displayProducts = products.filter((p) => p.isShopByOccasion);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-ivory">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-row justify-between items-center mb-8 md:mb-12">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-wide mb-2">
              Shop by Occasion
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Find the perfect piece for your special moments
            </p>
          </div>
          <Link href="/catalogue?category=All" className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6">
          {displayProducts.slice(0, 8).map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-[22%] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

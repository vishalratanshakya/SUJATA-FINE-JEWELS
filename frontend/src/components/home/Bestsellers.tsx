"use client";

import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Bestsellers() {
  const products = useStore((s) => s.products);
  const bestSellers = products.filter(p => p.isBestSeller || p.isBestseller);
  const displayProducts = bestSellers.length > 0 ? bestSellers : products;

  return (
    <section className="py-12 md:py-24 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
          <div className="text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
              BESTSELLERS
            </h2>
            <div className="flex justify-start">
              <div className="w-16 h-[1px] bg-champagne flex items-center justify-center">
                <div className="w-2 h-2 bg-champagne rotate-45" />
              </div>
            </div>
          </div>
          <Link href="/catalogue?category=All" className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
          {displayProducts.slice(0, 4).map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-auto flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

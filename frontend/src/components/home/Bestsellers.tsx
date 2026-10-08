"use client";

import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/ui/Reveal";

export function Bestsellers() {
  const products = useStore((s) => s.products);
  const bestSellers = products.filter(p => p.isBestSeller || p.isBestseller);
  const displayProducts = bestSellers.length > 0 ? bestSellers : products;

  return (
    <section className="py-8 md:py-12 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-row items-center justify-between mb-10 md:mb-16 gap-4">
          <Reveal direction="up" className="text-left">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
              BESTSELLERS
            </h2>
            <div className="flex justify-start">
              <div className="w-16 h-[1px] bg-champagne flex items-center justify-center">
                <div className="w-2 h-2 bg-champagne rotate-45" />
              </div>
            </div>
          </Reveal>
          <Link href="/best-sellers" className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors flex items-center space-x-1">
            <span>View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <StaggerContainer staggerDelay={0.1} className="flex overflow-x-auto gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6">
          {displayProducts.slice(0, 8).map((product, idx) => (
            <StaggerItem key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-[22%] flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>

      </div>
    </section>
  );
}

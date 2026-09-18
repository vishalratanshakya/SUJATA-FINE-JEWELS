"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedCollection() {
  const products = useStore((s) => s.products);
  const displayProducts = products.length > 0 ? products : [];

  return (
    <section className="py-20 bg-pearl">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal tracking-wide mb-4 md:mb-0">
            FEATURED COLLECTION
          </h2>
          <Link href="/collections/featured" className="text-xs tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors flex items-center space-x-2">
            <span>VIEW ALL</span>
            <span className="w-6 h-[1px] bg-current inline-block" />
          </Link>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
          {displayProducts.slice(0, 8).map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-auto flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

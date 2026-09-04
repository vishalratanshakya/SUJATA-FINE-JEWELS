"use client";

import { FEATURED_PRODUCTS } from "@/data/mockData";
import { ProductCard } from "@/components/product/ProductCard";

export function Bestsellers() {

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
            BESTSELLERS
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-[1px] bg-champagne flex items-center justify-center">
              <div className="w-2 h-2 bg-champagne rotate-45" />
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
          {FEATURED_PRODUCTS.slice(0, 5).map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-auto flex-shrink-0 snap-start">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function BridalCollectionSection() {
  const allProducts = useStore((s) => s.products);
  const bridalProducts = allProducts.filter(p => p.isBridalWedding);

  if (bridalProducts.length === 0) {
    return null; // Hide section if no bridal products
  }

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-16 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide">
            Bridal & Wedding Collection
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Curated masterpieces for your perfect day. Explore collections that celebrate eternal love.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
          
          {/* Static Banner / Cover */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden group">
              <Image 
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Bridal Collection" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">The Bridal Suite</h3>
                <p className="text-white/80 text-sm md:text-base line-clamp-3 mb-6">
                  Discover our exclusive range of timeless bridal jewelry designed to make your special day unforgettable.
                </p>
                <Link href={`/catalogue?category=Bridal`} className="inline-block bg-white text-charcoal px-6 py-3 text-xs font-semibold tracking-widest uppercase text-center hover:bg-champagne hover:text-white transition-colors self-start">
                  Explore Collection
                </Link>
              </div>
            </div>
          </div>

          {/* Bridal Products - Shop the Look */}
          <div className="w-full lg:w-1/2">
            <h4 className="font-serif text-xl text-charcoal mb-6 flex items-center space-x-4">
              <span className="w-8 h-[1px] bg-champagne"></span>
              <span>Shop The Look</span>
            </h4>
            
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {bridalProducts.slice(0, 4).map((product: any, pIdx: number) => (
                <div key={`${product.id}-${pIdx}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

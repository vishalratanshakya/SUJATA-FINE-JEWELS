"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function GiftingStudioSection() {
  const allProducts = useStore((s) => s.products);
  const giftingProducts = allProducts.filter(p => p.isLuxuryGifting);

  if (giftingProducts.length === 0) {
    return null; 
  }

  return (
    <section className="py-16 md:py-24 bg-[#FDFBF7] overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="text-center mb-10 md:mb-14 space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-amber-800 tracking-wide">
            Luxury Gifting Studio
          </h2>
          <p className="text-amber-700/80 max-w-2xl mx-auto text-sm md:text-base">
            Curated expressions of love and gratitude. Find the perfect piece for every cherished milestone.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-amber-50 overflow-hidden">
          <div className="relative h-[300px] md:h-[400px] w-full">
            <Image 
              src="https://images.unsplash.com/photo-1549439602-43ebca2327af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
              alt="Gifts for Every Occasion" 
              fill 
              className="object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 text-center">
              <div className="max-w-xl">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 drop-shadow-md">Gifts for Every Occasion</h3>
                <p className="text-white/90 text-sm md:text-base drop-shadow">
                  Hand-picked selections of our finest jewelry, perfect for celebrating life's special moments.
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 lg:mx-0 lg:px-0">
              {giftingProducts.slice(0, 8).map((product: any, pIdx: number) => (
                <div key={`${product.id}-${pIdx}`} className="w-[calc(80vw-48px)] sm:w-[calc(50vw-48px)] lg:w-auto flex-shrink-0 snap-start">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            {giftingProducts.length > 8 && (
              <div className="mt-8 text-center">
                <Link href={`/catalogue?category=Gifts`} className="inline-block border border-amber-800 text-amber-800 px-8 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-amber-800 hover:text-white transition-colors">
                  View All Gifts
                </Link>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

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

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Image Banner */}
          <div className="w-full lg:w-1/2 flex">
            <div className="relative w-full h-full rounded-2xl overflow-hidden group min-h-[350px]">
              <Image 
                src="https://images.unsplash.com/photo-1549439602-43ebca2327af?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Gifts for Every Occasion" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center p-8 md:p-12 text-center">
                <div className="max-w-xl">
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 drop-shadow-md">Gifts for Every Occasion</h3>
                  <p className="text-white/90 text-sm md:text-base drop-shadow">
                    Hand-picked selections of our finest jewelry, perfect for celebrating life's special moments.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="w-full pl-0 lg:pl-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
                {giftingProducts.slice(0, 6).map((product: any, pIdx: number) => (
                  <div key={`${product.id}-${pIdx}`}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              {giftingProducts.length > 6 && (
                <div className="mt-8 text-center lg:text-left">
                  <Link href={`/catalogue?category=Gifts`} className="inline-block border border-amber-800 text-amber-800 px-6 py-2 text-xs font-semibold tracking-widest uppercase hover:bg-amber-800 hover:text-white transition-colors">
                    View All Gifts
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

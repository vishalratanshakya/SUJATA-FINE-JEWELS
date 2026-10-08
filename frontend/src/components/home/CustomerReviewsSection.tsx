"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Star, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function CustomerReviewsSection() {
  const allProducts = useStore((s) => s.products);
  const reviewedProducts = allProducts.filter(p => p.isVerifiedReviews);

  if (reviewedProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden border-t border-gray-100">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide mb-4">
            Highly Rated Pieces
          </h2>
          <p className="text-gray-500 text-sm md:text-base max-w-2xl mx-auto">
            Discover the jewelry that our clients love the most. Featuring verified customer favorites and timeless selections.
          </p>
        </div>

        <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0">
          {reviewedProducts.map((product: any, idx: number) => (
            <div 
              key={product.id} 
              className="w-[85vw] sm:w-[280px] flex-shrink-0 snap-center bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-3 border border-gray-100">
                    <Image 
                      src={(() => {
                        const img = product.primaryImage || product.images?.[0];
                        if (img && (img.startsWith('http') || img.startsWith('/') || img.startsWith('data:'))) return img;
                        return "/images/products/rings/ring_placeholder.jpg";
                      })()} 
                      alt={product.name} 
                      fill 
                      className="object-cover" 
                    />
                  </div>
                  <h3 className="font-serif text-lg text-charcoal line-clamp-1">{product.name}</h3>
                </div>

                <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star 
                          key={i} 
                          size={12} 
                          className="text-amber-500 fill-amber-500" 
                        />
                      ))}
                    </div>
                    <span className="flex items-center text-emerald-600 text-[10px] font-bold tracking-wider uppercase bg-emerald-50 px-2 py-1 rounded">
                      <Check size={12} className="mr-1" /> Verified
                    </span>
                  </div>
                  <p className="text-gray-700 italic text-sm leading-relaxed">
                    "Absolutely breathtaking! The craftsmanship on this piece is unparalleled. I receive compliments every time I wear it."
                  </p>
                  <p className="font-serif text-charcoal font-medium text-right mt-2 text-sm">- Customer {idx + 1}</p>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-50 text-center">
                <Link 
                  href={`/product/${product.slug || product.id}`} 
                  className="group inline-flex items-center justify-center text-xs font-semibold uppercase tracking-widest text-charcoal hover:text-amber-700 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FEATURED_PRODUCTS } from "@/data/mockData";
import { ArrowRight } from "lucide-react";

export function DealOfTheDay() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 24, seconds: 59 });
  const dealProduct = FEATURED_PRODUCTS[0]; // Let's use the first featured product as the deal

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 }; // Reset loop for demo
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <section className="py-20 bg-[#F9F8F6]">
      {/* Marquee */}
      <div className="bg-[#EBE5D9] py-3 mb-16 overflow-hidden">
        <div className="whitespace-nowrap inline-block animate-[marquee_20s_linear_infinite]">
          <span className="font-serif text-charcoal/80 text-xl tracking-widest mx-8 uppercase">100% HALLMARK GOLD</span>
          <span className="text-champagne mx-4">★</span>
          <span className="font-serif text-charcoal/80 text-xl tracking-widest mx-8 uppercase">GIA CERTIFIED DIAMONDS</span>
          <span className="text-champagne mx-4">★</span>
          <span className="font-serif text-charcoal/80 text-xl tracking-widest mx-8 uppercase">SECURE INSURED SHIPPING</span>
          <span className="text-champagne mx-4">★</span>
          <span className="font-serif text-charcoal/80 text-xl tracking-widest mx-8 uppercase">100% HALLMARK GOLD</span>
          <span className="text-champagne mx-4">★</span>
          <span className="font-serif text-charcoal/80 text-xl tracking-widest mx-8 uppercase">GIA CERTIFIED DIAMONDS</span>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-center bg-white border border-charcoal/5 rounded-2xl overflow-hidden shadow-sm">
          
          {/* Left: Content */}
          <div className="p-8 md:p-16 lg:w-1/2 flex flex-col justify-center">
            <div className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-6 self-start flex items-center space-x-1">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span>Deal of the Day</span>
            </div>
            
            <h2 className="font-serif text-3xl md:text-5xl text-charcoal mb-4 leading-tight">
              {dealProduct.name}
            </h2>
            
            <p className="text-charcoal/60 mb-8 max-w-md">
              Don't miss out on this exclusive offer. Expertly crafted with {dealProduct.metal} and {dealProduct.stone}, this stunning piece is available at a special price for a limited time.
            </p>

            <div className="flex items-end space-x-4 mb-10">
              <span className="text-3xl md:text-4xl text-charcoal font-medium">
                {formatPrice(dealProduct.price)}
              </span>
              {dealProduct.originalPrice && (
                <span className="text-xl text-charcoal/40 line-through mb-1">
                  {formatPrice(dealProduct.originalPrice)}
                </span>
              )}
            </div>

            {/* Timer */}
            <div className="mb-10">
              <p className="text-sm text-charcoal/60 font-medium mb-3 uppercase tracking-widest">Offer ends in:</p>
              <div className="flex space-x-3 md:space-x-4">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#F9F8F6] rounded flex items-center justify-center font-serif text-xl md:text-2xl text-charcoal border border-charcoal/5">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 md:mt-2 text-charcoal/50 block pb-1">Hours</span>
                </div>
                <div className="text-xl md:text-2xl font-serif text-charcoal/40 mt-3 md:mt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#F9F8F6] rounded flex items-center justify-center font-serif text-xl md:text-2xl text-charcoal border border-charcoal/5">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 md:mt-2 text-charcoal/50 block pb-1">Mins</span>
                </div>
                <div className="text-xl md:text-2xl font-serif text-charcoal/40 mt-3 md:mt-4">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-[#F9F8F6] rounded flex items-center justify-center font-serif text-xl md:text-2xl text-charcoal border border-charcoal/5">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider mt-1.5 md:mt-2 text-charcoal/50 block pb-1">Secs</span>
                </div>
              </div>
            </div>

            <Link href={`/product/${dealProduct.slug}`} className="bg-[#B38D45] hover:bg-[#9A7635] text-white px-8 py-4 rounded transition-colors inline-flex items-center space-x-2 self-start uppercase text-sm tracking-wider font-medium">
              <span>Shop the Deal</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 aspect-square md:aspect-[4/3] lg:aspect-[4/3] xl:aspect-[3/2] relative bg-[#F4F1ED]">
            <Image
              src={dealProduct.images[0]}
              alt={dealProduct.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

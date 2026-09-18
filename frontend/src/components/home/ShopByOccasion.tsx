"use client";

import Link from "next/link";
import Image from "next/image";
import { useStore } from "@/store/useStore";

const OCCASIONS = [
  {
    id: "wedding",
    name: "Wedding Bliss",
    description: "Bridal sets, mangalsutras, and statement pieces for your special day.",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  },
  {
    id: "office",
    name: "Office Elegance",
    description: "Subtle, lightweight jewelry perfect for professional settings.",
    image: "/images/products/earrings/earrings_placeholder.jpg"
  },
  {
    id: "festive",
    name: "Festive Glamour",
    description: "Traditional and contemporary pieces to celebrate in style.",
    image: "/images/products/bangles/bangle_placeholder.jpg"
  },
  {
    id: "everyday",
    name: "Daily Radiance",
    description: "Comfortable, durable classics for everyday wear.",
    image: "/images/products/rings/ring_placeholder.jpg"
  }
];

export function ShopByOccasion() {
  const occasions = useStore((s) => s.occasions);
  const displayOccasions = occasions.length > 0 ? occasions : OCCASIONS;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
            SHOP BY OCCASION
          </h2>
          <div className="flex justify-center">
            <div className="w-16 h-[1px] bg-champagne flex items-center justify-center">
              <div className="w-2 h-2 bg-champagne rotate-45" />
            </div>
          </div>
          <p className="mt-6 text-charcoal/60 max-w-lg mx-auto">
            Discover the perfect jewelry to complement every moment of your life, from grand celebrations to everyday elegance.
          </p>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
          {displayOccasions.map((occasion, idx) => (
            <Link 
              href={`/collections/${occasion.id}`} 
              key={occasion.id}
              className={`group relative overflow-hidden rounded-lg block w-[85vw] md:w-auto flex-shrink-0 snap-center ${idx === 0 || idx === 3 ? 'md:col-span-2 md:h-[400px]' : 'md:h-[350px]'} h-[350px]`}
            >
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors duration-500 z-10" />
              <Image
                src={occasion.image}
                alt={occasion.name}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100vw"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-white">
                <h3 className="font-serif text-3xl md:text-4xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{occasion.name}</h3>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-sm md:text-base text-white/90 max-w-md delay-75">
                  {occasion.description}
                </p>
                <div className="mt-6 flex items-center space-x-2 text-sm font-medium tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150">
                  <span className="border-b border-white pb-1">Explore</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

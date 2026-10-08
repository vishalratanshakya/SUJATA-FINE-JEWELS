"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import { useStore } from "@/store/useStore";
import { LazyVideo } from "@/components/ui/LazyVideo";

export function FeaturedMediaCarousel() {
  const items = useStore((s) => s.featuredMediaItems).filter(i => i.active);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (items.length === 0) return null;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <section className="py-20 bg-[#F9F8F6]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10 border-b border-[#EAE4D9] pb-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C2825] uppercase tracking-wider mb-2">Featured Product Media</h2>
            <p className="text-[#8C8275] text-xs uppercase tracking-widest font-medium">Explore Our Latest Campaigns</p>
          </div>
          <div className="flex space-x-2 hidden md:flex">
            <button 
              onClick={scrollLeft}
              className="p-2 border border-[#EAE4D9] rounded-full hover:bg-white transition-colors text-[#5C554E]"
              aria-label="Scroll Left"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={scrollRight}
              className="p-2 border border-[#EAE4D9] rounded-full hover:bg-white transition-colors text-[#5C554E]"
              aria-label="Scroll Right"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {items.map((item) => (
            <Link 
              href={item.link || "#"} 
              key={item.id} 
              className="snap-start shrink-0 w-[280px] md:w-[320px] lg:w-[400px] group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="relative aspect-[4/5] bg-[#EAE4D9] overflow-hidden">
                {item.videoUrl ? (
                  <LazyVideo
                    src={item.videoUrl}
                    poster={item.image}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                {item.videoUrl && (
                  <div className="absolute top-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 text-[#2C2825]">
                    <Play size={12} className="fill-current" />
                  </div>
                )}
              </div>
              <div className="p-5 border-t border-[#EAE4D9]">
                <h3 className="font-serif text-lg text-[#2C2825] group-hover:text-[#C5A880] transition-colors line-clamp-1">{item.title}</h3>
                <span className="text-xs uppercase tracking-wider text-[#8C8275] font-semibold mt-2 inline-block border-b border-transparent group-hover:border-[#C5A880] transition-colors">
                  Shop Now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

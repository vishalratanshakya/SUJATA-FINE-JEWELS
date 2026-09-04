"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, VolumeX, Volume2, Share2, Expand } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/mockData";

// Mock data simulating what admin would upload
const STORIES = [
  {
    id: 1,
    type: "image", // or video
    src: "/images/products/earrings/earrings_placeholder.jpg",
    title: "EVERY HOUR IS DIAMOND HOUR",
    subtitle: "Tea party",
    productSlug: FEATURED_PRODUCTS[0].slug,
    productName: FEATURED_PRODUCTS[0].name,
    productImage: FEATURED_PRODUCTS[0].images[0],
  },
  {
    id: 2,
    type: "image",
    src: "/images/products/necklaces/necklace_placeholder.jpg",
    title: "THE ROYAL COLLECTION",
    subtitle: "Evening Gala",
    productSlug: FEATURED_PRODUCTS[1].slug,
    productName: FEATURED_PRODUCTS[1].name,
    productImage: FEATURED_PRODUCTS[1].images[0],
  },
  {
    id: 3,
    type: "image",
    src: "/images/products/rings/ring_placeholder.jpg",
    title: "SIGNATURE RINGS",
    subtitle: "Everyday luxury",
    productSlug: FEATURED_PRODUCTS[2].slug,
    productName: FEATURED_PRODUCTS[2].name,
    productImage: FEATURED_PRODUCTS[2].images[0],
  },
  {
    id: 4,
    type: "image",
    src: "/images/products/bracelets/bracelet_placeholder.jpg",
    title: "GOLDEN HOUR",
    subtitle: "Weekend vibes",
    productSlug: FEATURED_PRODUCTS[3].slug,
    productName: FEATURED_PRODUCTS[3].name,
    productImage: FEATURED_PRODUCTS[3].images[0],
  }
];

export function StoriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-scroll or infinite loop could be added here
  
  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-ivory overflow-hidden">
      <div className="max-w-[1920px] mx-auto relative px-4 md:px-8">
        
        {/* Navigation Arrows */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur rounded-full items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronLeft className="text-charcoal" />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 backdrop-blur rounded-full items-center justify-center shadow-lg hover:bg-white transition-colors"
        >
          <ChevronRight className="text-charcoal" />
        </button>

        {/* Carousel Container */}
        <div 
          ref={containerRef}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory hide-scrollbar pb-8"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Infinite loop trick - repeat array */}
          {[...STORIES, ...STORIES].map((story, idx) => (
            <div 
              key={`${story.id}-${idx}`} 
              className="relative min-w-[320px] w-[320px] md:min-w-[400px] md:w-[400px] h-[600px] md:h-[700px] snap-center rounded-2xl overflow-hidden shadow-xl flex-shrink-0 group"
            >
              {/* Media */}
              {story.type === 'video' ? (
                <video 
                  src={story.src} 
                  autoPlay 
                  loop 
                  muted={isMuted} 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <Image 
                  src={story.src} 
                  alt={story.title} 
                  fill 
                  className="object-cover"
                />
              )}

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

              {/* Top Controls */}
              <div className="absolute top-4 w-full px-4 flex justify-between items-center text-white z-10">
                <span className="text-xs tracking-wider opacity-80">From business hours to bliss...</span>
                <div className="flex gap-4">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <button><Share2 size={18} /></button>
                  <button><Expand size={18} /></button>
                </div>
              </div>

              {/* Center Text */}
              <div className="absolute top-1/4 w-full text-center px-6 z-10">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight drop-shadow-md">
                  {story.title}
                </h3>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-6 w-full px-6 z-10 flex flex-col items-center">
                <p className="font-serif text-xl text-white italic mb-6">{story.subtitle}</p>
                
                {/* Linked Product Card */}
                <Link 
                  href={`/product/${story.productSlug}`}
                  className="w-full bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center gap-4 hover:bg-black/60 transition-colors"
                >
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0 bg-white">
                    <Image src={story.productImage} alt={story.productName} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex justify-between items-center">
                    <span className="text-white font-medium text-sm leading-tight pr-4">{story.productName}</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-charcoal">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>

                {/* Progress Indicators */}
                <div className="flex gap-1 mt-6 w-full justify-center">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className={`h-0.5 rounded-full ${i === (idx % 4) ? 'w-8 bg-white' : 'w-4 bg-white/30'}`} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}

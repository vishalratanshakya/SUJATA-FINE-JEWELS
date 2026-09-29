"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function BehindTheCraftSection() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const allProducts = useStore((s) => s.products);
  const craftProducts = allProducts.filter(p => p.isBehindTheCraft);

  if (craftProducts.length === 0) {
    return null;
  }

  const mainProduct = craftProducts[0];
  const defaultVideoUrl = mainProduct.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ";
  const defaultThumbnailUrl = mainProduct.primaryImage || mainProduct.images?.[0] || "https://images.unsplash.com/photo-1589128777085-f852e7284483?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";

  return (
    <section className="py-16 md:py-24 bg-charcoal text-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-wide mb-4 text-champagne">
              Behind the Craft
            </h2>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              Step into our ateliers and witness the meticulous artistry, heritage techniques, and passion poured into every masterpiece we create.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 bg-white/5 rounded-2xl p-4 md:p-6 lg:p-8 border border-white/10">
          {/* Video Thumbnail Area */}
          <div className="relative w-full lg:w-3/5 aspect-video rounded-xl overflow-hidden group cursor-pointer" onClick={() => setActiveVideo(defaultVideoUrl)}>
            <Image 
              src={defaultThumbnailUrl} 
              alt="The Art of High Jewelry" 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100" 
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform shadow-2xl">
                <Play size={28} className="text-white ml-1.5" />
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex flex-col justify-center w-full lg:w-2/5 space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl text-white">The Art of High Jewelry</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              Discover the intricate processes and timeless traditions that our master artisans use to bring each brilliant design to life.
            </p>
            
            <div className="pt-6 mt-4 border-t border-white/10">
              <p className="text-xs font-semibold tracking-widest uppercase text-champagne mb-4">Featured Pieces</p>
              <div className="grid grid-cols-2 gap-4">
                {craftProducts.slice(0, 2).map((product: any, pIdx: number) => (
                  <div key={`${product.id}-${pIdx}`} className="bg-white rounded-lg overflow-hidden">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm">
          <button 
            onClick={() => setActiveVideo(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors z-10"
          >
            <X size={24} />
          </button>
          
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl border border-white/10 flex justify-center items-center">
            {activeVideo.includes("youtube.com") || activeVideo.includes("vimeo.com") ? (
              <iframe
                src={`${activeVideo}${activeVideo.includes('?') ? '&' : '?'}autoplay=1`}
                title="Craft Story Video"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={activeVideo}
                className="w-full h-full"
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
}

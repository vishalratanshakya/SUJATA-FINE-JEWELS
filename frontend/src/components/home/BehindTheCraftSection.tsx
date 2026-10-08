"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function BehindTheCraftSection() {
  const allProducts = useStore((s) => s.products);
  const [story, setStory] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories`)
      .then(async res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then(data => {
        if (data.success && data.data.length > 0) {
          const activeStory = data.data.find((s: any) => s.isActive) || data.data[0];
          setStory(activeStory);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Fallback to legacy logic if no story is found
  const legacyCraftProducts = allProducts.filter(p => p.isBehindTheCraft);
  
  if (loading) return null;
  if (!story && legacyCraftProducts.length === 0) return null;

  const defaultVideoUrl = story?.videoUrl;
  const defaultThumbnailUrl = story?.thumbnailUrl || legacyCraftProducts[0]?.primaryImage || "https://images.unsplash.com/photo-1589128777085-f852e7284483?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80";
  
  const title = story?.title || "The Art of High Jewelry";
  const description = story?.description || "Discover the intricate processes and timeless traditions that our master artisans use to bring each brilliant design to life.";
  
  // Use linked products from story if available, otherwise use legacy isBehindTheCraft products
  const displayProducts = story?.linkedProducts && story.linkedProducts.length > 0
    ? allProducts.filter(p => story.linkedProducts.includes(p.id))
    : legacyCraftProducts;

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
          {/* Video Area */}
          <div className="relative w-full lg:w-3/5 aspect-video rounded-xl overflow-hidden group border border-white/10 bg-black flex justify-center items-center">
            {defaultVideoUrl ? (
              defaultVideoUrl.includes("youtube.com") || defaultVideoUrl.includes("vimeo.com") ? (
                <iframe
                  src={`${defaultVideoUrl}${defaultVideoUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&playlist=${defaultVideoUrl.split('/').pop()?.split('?')[0] || ''}`}
                  title={title}
                  className="w-full h-full object-contain"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={defaultVideoUrl}
                  className="w-full h-full object-contain"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={defaultThumbnailUrl}
                />
              )
            ) : (
              <Image 
                src={defaultThumbnailUrl}
                alt={title}
                fill
                className="object-cover opacity-80"
              />
            )}
          </div>

          {/* Content Area */}
          <div className="flex flex-col justify-center w-full lg:w-2/5 space-y-4">
            <h3 className="font-serif text-2xl md:text-3xl text-white">{title}</h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
              {description}
            </p>
            
            {displayProducts.length > 0 && (
              <div className="pt-6 mt-4 border-t border-white/10">
                <p className="text-xs font-semibold tracking-widest uppercase text-champagne mb-4">Featured Pieces</p>
                <div className="grid grid-cols-2 gap-4">
                  {displayProducts.slice(0, 2).map((product: any, pIdx: number) => (
                    <div key={`${product.id}-${pIdx}`} className="bg-white rounded-lg overflow-hidden">
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}

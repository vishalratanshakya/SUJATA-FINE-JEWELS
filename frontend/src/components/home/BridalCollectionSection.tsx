"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { Play, ArrowRight } from "lucide-react";

export function BridalCollectionSection() {
  const allProducts = useStore((s) => s.products);
  const bridalProducts = allProducts.filter(p => p.isBridalWedding);

  if (bridalProducts.length === 0) {
    return null; 
  }

  const p1 = bridalProducts[0];
  const p2 = bridalProducts[1];
  const p3 = bridalProducts[2];
  const p4 = bridalProducts[3];
  const p5 = bridalProducts[4];

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 space-y-4"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide">
            Bridal & Wedding Collection
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base mb-6">
            Curated masterpieces for your perfect day. Explore collections that celebrate eternal love.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left: Large Vertical Card */}
          {p1 && (
            <Link href={`/product/${p1.slug}`} className="relative group block w-full h-[400px] lg:h-[600px] rounded-xl overflow-hidden cursor-pointer">
              {p1.videoUrl ? (
                <video src={p1.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              ) : (
                <Image src={p1.primaryImage || ""} alt={p1.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="px-3 py-1 bg-white text-charcoal text-[10px] font-bold tracking-widest uppercase rounded-full">
                  Special Offer
                </span>
                {p1.videoUrl && (
                  <span className="px-2 py-1 bg-black/80 backdrop-blur-md text-amber-400 text-[10px] font-bold tracking-widest uppercase rounded flex items-center space-x-1 border border-amber-400/30">
                    <Play size={10} className="fill-amber-400" />
                    <span>Video</span>
                  </span>
                )}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1 block">
                  Heritage Bridal
                </span>
                <h3 className="font-serif text-3xl text-white mb-2 leading-tight">
                  {p1.name}
                </h3>
              </div>
            </Link>
          )}

          {/* Right: 2x2 Grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-4 h-full">
            
            {p2 && (
              <Link href={`/product/${p2.slug}`} className="relative group block w-full h-[200px] lg:h-[292px] rounded-xl overflow-hidden cursor-pointer">
                {p2.videoUrl ? (
                  <video src={p2.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Image src={p2.primaryImage || ""} alt={p2.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#8B7355] text-white text-[9px] font-bold tracking-widest uppercase rounded">
                    Limited Edition
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg text-white mb-1 leading-tight truncate">
                    {p2.name}
                  </h3>
                </div>
              </Link>
            )}

            {p3 && (
              <Link href={`/product/${p3.slug}`} className="relative group block w-full h-[200px] lg:h-[292px] rounded-xl overflow-hidden cursor-pointer">
                {p3.videoUrl ? (
                  <video src={p3.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Image src={p3.primaryImage || ""} alt={p3.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#8B7355] text-white text-[9px] font-bold tracking-widest uppercase rounded">
                    Trending Heirloom
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg text-white mb-1 leading-tight truncate">
                    {p3.name}
                  </h3>
                </div>
              </Link>
            )}

            {p4 && (
              <Link href={`/product/${p4.slug}`} className="relative group block w-full h-[200px] lg:h-[292px] rounded-xl overflow-hidden cursor-pointer">
                {p4.videoUrl ? (
                  <video src={p4.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Image src={p4.primaryImage || ""} alt={p4.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-black/60 text-[#D4AF37] text-[9px] font-bold tracking-widest uppercase rounded">
                    -50%
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg text-white mb-1 leading-tight truncate">
                    {p4.name}
                  </h3>
                </div>
              </Link>
            )}

            {p5 && (
              <Link href={`/product/${p5.slug}`} className="relative group block w-full h-[200px] lg:h-[292px] rounded-xl overflow-hidden cursor-pointer">
                {p5.videoUrl ? (
                  <video src={p5.videoUrl} autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Image src={p5.primaryImage || ""} alt={p5.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-[#8B7355] text-white text-[9px] font-bold tracking-widest uppercase rounded">
                    Solitaire
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-serif text-lg text-white mb-1 leading-tight truncate">
                    {p5.name}
                  </h3>
                </div>
              </Link>
            )}

          </div>
        </div>
      </div>
    </section>
  );
}

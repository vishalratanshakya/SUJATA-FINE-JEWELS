"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export function CuratedHeritageSection() {
  const allProducts = useStore((s) => s.products);
  const curatedProducts = allProducts.filter((p) => p.isCuratedHeritage);

  const mockProducts = [
    {
      id: "mock-1",
      name: "THE POLKI HERITAGE SUITE",
      slug: "polki-heritage-suite",
      primaryImage: "https://images.unsplash.com/photo-1599643478514-4a0013f9f43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metal: "22K GOLD",
      purity: "Pure Gold",
      category: "Necklaces",
    },
    {
      id: "mock-2",
      name: "SOLITAIRE SOLACE",
      slug: "solitaire-solace",
      primaryImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metal: "PLATINUM",
      category: "Rings",
    },
    {
      id: "mock-3",
      name: "TEMPLE GOLD ELEGANCE",
      slug: "temple-gold-elegance",
      primaryImage: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metal: "22K GOLD",
      purity: "Pure Gold",
      category: "Bangles",
    },
    {
      id: "mock-4",
      name: "BASRA PEARL & EMERALDS",
      slug: "basra-pearl-emeralds",
      primaryImage: "https://images.unsplash.com/photo-1603561596112-0a132b757442?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metal: "18K GOLD",
      purity: "Rare Finds",
      category: "Earrings",
    },
    {
      id: "mock-5",
      name: "FLORAL SOLITAIRE PENDANT LINK",
      slug: "floral-solitaire",
      primaryImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      metal: "18K WHITE GOLD",
      category: "Pendants",
    }
  ];

  const displayProducts: any[] = [...curatedProducts];

  if (displayProducts.length === 0) return null;

  const p1 = displayProducts[0];
  const p2 = displayProducts[1];
  const p3 = displayProducts[2];
  const p4 = displayProducts[3];
  const p5 = displayProducts[4];

  return (
    <section className="py-8 md:py-12 bg-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h2 className="font-serif text-3xl sm:text-4xl text-charcoal tracking-wide">
                Curated Heritage Suites
              </h2>
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-full border border-amber-200">
                <Sparkles size={12} />
                <span>Special Offers</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm md:text-base">
              Exclusive luxury promotional collections
            </p>
          </div>
          
          <Link href="/catalogue?category=All" className="text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors flex items-center space-x-1">
            <span>Explore All</span>
            <ArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[220px] lg:auto-rows-[240px]">
          
          {/* Column 1: Large Vertical (Row span 2) */}
          {p1 && (
            <motion.div 
              className="lg:col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {p1.videoUrl ? (
                <video 
                  src={p1.videoUrl} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <Image 
                  src={p1.primaryImage || ""} 
                  alt={p1.name || "Product"} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  <span>Curated Suite</span>
                </span>
                <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <Heart size={14} />
                </button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-2">
                  {p1.metal} {p1.purity}
                </span>
                <h3 className="font-serif text-2xl text-white mb-6 uppercase tracking-wider line-clamp-2">
                  {p1.name}
                </h3>
                <div className="flex space-x-3 w-full justify-center">
                  <Link href={`/product/${p1.slug}`} className="px-4 py-2 bg-white text-charcoal text-xs font-bold uppercase rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                    View Pieces
                  </Link>
                  <Link href={`/product/${p1.slug}`} className="px-4 py-2 border border-white/40 text-white text-xs font-bold uppercase rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                    Quick View
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Column 2: Center Section (Col span 2) */}
          <div className="lg:col-span-2 row-span-2 grid grid-cols-2 grid-rows-2 gap-4 md:gap-6">
            
            {/* Top Wide (Col span 2) */}
            {p2 && (
              <motion.div 
                className="col-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {p2.videoUrl ? (
                  <video 
                    src={p2.videoUrl} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <Image 
                    src={p2.primaryImage || ""} 
                    alt={p2.name || "Product"} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-amber-600 text-white text-[10px] font-bold tracking-widest uppercase rounded">
                    Certified
                  </span>
                </div>
                
                <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                  <div>
                    <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-1 block">
                      Precision Hand-Cut Diamonds
                    </span>
                    <h3 className="font-serif text-2xl text-white uppercase tracking-wider line-clamp-1">
                      {p2.name}
                    </h3>
                  </div>
                  <Link href={`/product/${p2.slug}`} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-colors shrink-0">
                    <ArrowRight size={18} />
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Bottom Left Small Square */}
            {p3 && (
              <motion.div 
                className="col-span-1 relative rounded-2xl overflow-hidden group cursor-pointer bg-black"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {p3.videoUrl ? (
                  <video 
                    src={p3.videoUrl} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                  />
                ) : (
                  <Image 
                    src={p3.primaryImage || ""} 
                    alt={p3.name || "Product"} 
                    fill 
                    className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <h3 className="font-serif text-sm md:text-base text-white uppercase tracking-wider mb-2 line-clamp-2">
                    {p3.name}
                  </h3>
                  <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                    {p3.metal}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Bottom Right Small Square */}
            {p4 && (
              <motion.div 
                className="col-span-1 relative rounded-2xl overflow-hidden group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {p4.videoUrl ? (
                  <video 
                    src={p4.videoUrl} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <Image 
                    src={p4.primaryImage || ""} 
                    alt={p4.name || "Product"} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-4 right-4 text-center">
                  <h3 className="font-serif text-sm md:text-base text-white uppercase tracking-wider mb-2 line-clamp-2">
                    {p4.name}
                  </h3>
                  <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase">
                    Rare Finds
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Column 3: Large Vertical (Row span 2) */}
          {p5 && (
            <motion.div 
              className="lg:col-span-1 row-span-2 relative rounded-2xl overflow-hidden group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {p5.videoUrl ? (
                <video 
                  src={p5.videoUrl} 
                  autoPlay 
                  muted 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              ) : (
                <Image 
                  src={p5.primaryImage || ""} 
                  alt={p5.name || "Product"} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              
              {/* Top Badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold tracking-widest uppercase rounded flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>Special Reserve</span>
                </span>
                <button className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/50 transition-colors">
                  <Heart size={14} />
                </button>
              </div>

              {/* Top Artistic Text */}
              <div className="absolute top-20 left-0 right-0 text-center px-4">
                <h4 className="text-white/40 text-4xl font-serif tracking-widest uppercase opacity-30">SOVAR</h4>
                <p className="font-serif text-white/90 text-sm mt-4 italic">
                  Elegance in Every Detail,<br />Beauty in Every Moment.
                </p>
                <p className="text-white/50 text-[10px] mt-4 tracking-widest uppercase">
                  Designed to shine. Made to be cherished.
                </p>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-center text-center">
                <span className="text-amber-400 text-[10px] font-bold tracking-widest uppercase mb-2 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
                  - 25%
                </span>
                <h3 className="font-serif text-xl text-white mb-6 uppercase tracking-wider line-clamp-2">
                  {p5.name}
                </h3>
                <div className="flex space-x-3 w-full justify-center">
                  <Link href={`/product/${p5.slug}`} className="px-4 py-2 bg-white text-charcoal text-xs font-bold uppercase rounded-full hover:bg-gray-100 transition-colors shadow-lg">
                    View Pieces
                  </Link>
                  <Link href={`/product/${p5.slug}`} className="px-4 py-2 border border-white/40 text-white text-xs font-bold uppercase rounded-full hover:bg-white/10 transition-colors backdrop-blur-sm">
                    Quick View
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}

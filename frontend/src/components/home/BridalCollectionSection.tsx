"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function BridalCollectionSection() {
  const allProducts = useStore((s) => s.products);
  const bridalProducts = allProducts.filter(p => p.isBridalWedding);

  if (bridalProducts.length === 0) {
    return null; // Hide section if no bridal products
  }

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
          <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
            Curated masterpieces for your perfect day. Explore collections that celebrate eternal love.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          
          {/* Static Banner / Cover */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full lg:w-1/2 flex"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden group min-h-[350px]">
              <Image 
                src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Bridal Collection" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-8 md:p-12">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-3">The Bridal Suite</h3>
                <p className="text-white/80 text-sm md:text-base line-clamp-3 mb-6">
                  Discover our exclusive range of timeless bridal jewelry designed to make your special day unforgettable.
                </p>
                <Link href={`/catalogue?category=Bridal`} className="inline-block bg-white text-charcoal px-6 py-3 text-xs font-semibold tracking-widest uppercase text-center hover:bg-champagne hover:text-white transition-colors self-start">
                  Explore Collection
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Bridal Products - Shop the Look */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/2 flex flex-col justify-center"
          >
            <div className="w-full pl-0 lg:pl-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {bridalProducts.slice(0, 6).map((product: any, pIdx: number) => (
                <div key={`${product.id}-${pIdx}`}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

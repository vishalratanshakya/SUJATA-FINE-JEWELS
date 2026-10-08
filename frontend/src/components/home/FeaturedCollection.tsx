"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

export function FeaturedCollection() {
  const products = useStore((s) => s.products);
  const displayProducts = products.filter((p) => p.isFeatured);

  return (
    <section className="py-12 md:py-20 bg-pearl">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <motion.div 
          className="flex flex-row justify-between items-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-charcoal tracking-wide">
            FEATURED COLLECTION
          </h2>
          <Link href="/collections/featured" className="text-xs tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors flex items-center space-x-2">
            <span>VIEW ALL</span>
            <span className="w-6 h-[1px] bg-current inline-block" />
          </Link>
        </motion.div>

        <motion.div 
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {displayProducts.slice(0, 4).map((product, idx) => (
            <motion.div 
              key={`${product.id}-${idx}`} 
              className="w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-auto flex-shrink-0 snap-start"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
}

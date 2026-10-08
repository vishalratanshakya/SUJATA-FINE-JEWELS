"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";

const CATEGORIES = ["All", "Necklaces", "Earrings", "Rings", "Bracelets", "Pendants", "Bridal"];

export function ExploreCollection() {
  const products = useStore((s) => s.products);
  const [activeCategory, setActiveCategory] = useState("All");

  const displayProducts = products.filter((p) => {
    if (!p.isExploreCollection) return false;
    if (activeCategory === "All") return true;
    return p.category === activeCategory;
  });

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 md:mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-charcoal tracking-wide mb-2">
              Explore Our Collection
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Discover masterfully cut diamonds and certified 22K gold jewelry
            </p>
          </motion.div>

          <motion.div 
            className="flex flex-wrap gap-2 lg:gap-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 md:px-6 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-charcoal text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="flex overflow-x-auto lg:grid lg:grid-cols-4 gap-4 md:gap-6 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {displayProducts.slice(0, 4).map((product, idx) => (
            <motion.div 
              key={`${product.id}-${idx}`} 
              className="w-[calc(80vw-24px)] sm:w-[calc(50vw-24px)] md:w-[calc(33vw-24px)] lg:w-auto flex-shrink-0 snap-start"
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
          {displayProducts.length === 0 && (
            <div className="col-span-4 text-center py-12 text-gray-400">
              No products found in this category.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

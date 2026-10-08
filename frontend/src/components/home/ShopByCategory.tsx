"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/mockData";
import { motion } from "framer-motion";

export function ShopByCategory() {
  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
            SHOP BY CATEGORY
          </h2>
          <div className="flex justify-center mb-16">
            <div className="w-16 h-[1px] bg-champagne flex items-center justify-center">
              <div className="w-2 h-2 bg-champagne rotate-45" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {CATEGORIES.map((category) => (
            <motion.div key={category.id} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <Link 
                href={`/shop/${category.id}`} 
              className="group flex flex-col items-center cursor-pointer"
            >
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden mb-6 relative border-2 border-transparent group-hover:border-champagne/30 transition-all duration-500">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 100px, 128px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center justify-center space-x-2 text-charcoal transition-transform duration-300 group-hover:-translate-y-1">
                <span className="text-xs md:text-sm tracking-widest font-medium relative">
                  {category.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-charcoal transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowRight size={14} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 text-champagne" />
              </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

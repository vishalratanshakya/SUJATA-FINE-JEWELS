"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { SHOP_CATEGORIES, SHOP_OCCASIONS, COLLECTIONS } from "@/data/navigation";

export function DesktopNav() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<"shop" | "collections" | null>(null);

  const mainLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop", hasMenu: true, menuType: "shop" },
    { label: "Collections", href: "/collections", hasMenu: true, menuType: "collections" },
    { label: "New Arrivals", href: "/new-arrivals" },
    { label: "Best Sellers", href: "/best-sellers" },
    { label: "Our Story", href: "/about" },
  ];

  return (
    <nav className="flex items-center justify-center space-x-8 xl:space-x-12 h-full">
      {mainLinks.map((link) => {
        const isActive = pathname === link.href;

        return (
          <div 
            key={link.label}
            className="h-full flex items-center relative"
            onMouseEnter={() => link.hasMenu && setActiveMenu(link.menuType as any)}
            onMouseLeave={() => link.hasMenu && setActiveMenu(null)}
          >
            <Link
              href={link.href}
              className={`text-[11px] uppercase tracking-[0.15em] transition-colors duration-200 py-4 flex items-center gap-1.5 ${
                isActive ? "text-champagne font-medium" : "hover:text-champagne/70"
              }`}
            >
              <span>{link.label}</span>
              {link.hasMenu && (
                <ChevronDown 
                  size={12} 
                  strokeWidth={2} 
                  className={`transition-transform duration-300 ${activeMenu === link.menuType ? "rotate-180 text-champagne" : "opacity-60"}`} 
                />
              )}
            </Link>
            
            {/* Active subtle indicator */}
            {isActive && (
              <div className="absolute bottom-6 left-0 w-full h-[1px] bg-champagne/50" />
            )}

            {/* Shop Mega Menu */}
            <AnimatePresence>
              {link.hasMenu && link.menuType === "shop" && activeMenu === "shop" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.2 }}
                  className="fixed top-20 left-0 w-full bg-ivory/80 backdrop-blur-lg text-charcoal border-b border-charcoal/5 shadow-sm z-40 overflow-hidden"
                >
                  <div className="max-w-[1440px] mx-auto px-8 py-8 flex items-start justify-between">
                    
                    {/* By Category */}
                    <div className="w-[55%]">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-black mb-5 font-bold">By Category</h3>
                      <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                        {SHOP_CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <Link 
                              key={cat.slug} 
                              href={`/shop/${cat.slug}`}
                              className="group flex items-center space-x-3"
                              onClick={() => setActiveMenu(null)}
                            >
                              <Icon size={18} className="text-charcoal/70 group-hover:text-champagne transition-colors" />
                              <span className="text-[13px] text-charcoal/90 group-hover:text-champagne transition-colors">{cat.name}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-[1px] h-[160px] bg-charcoal/5 mx-4 mt-2"></div>

                    {/* By Occasion */}
                    <div className="w-[20%] pl-6">
                      <h3 className="text-[10px] uppercase tracking-[0.2em] text-black mb-5 font-bold">By Occasion</h3>
                      <div className="flex flex-col space-y-3">
                        {SHOP_OCCASIONS.map((occ) => (
                          <Link 
                            key={occ.slug} 
                            href={`/shop/occasion/${occ.slug}`}
                            className="text-[13px] text-charcoal/90 hover:text-champagne transition-colors"
                            onClick={() => setActiveMenu(null)}
                          >
                            {occ.name}
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Featured Image */}
                    <div className="w-[22%] h-[200px] relative overflow-hidden group rounded-sm">
                      <Image 
                        src="/images/products/necklaces/necklace_placeholder.jpg" 
                        alt="Featured Collection" 
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-colors duration-300 flex flex-col justify-end p-5">
                        <span className="text-white/90 text-[9px] uppercase tracking-[0.2em] mb-1">Featured</span>
                        <span className="text-white font-serif text-xl">New Arrivals</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Collections Compact Dropdown */}
            <AnimatePresence>
              {link.hasMenu && link.menuType === "collections" && activeMenu === "collections" && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 w-64 bg-[#FAF8F5] text-charcoal border border-[#EAE4D9] shadow-xl z-50 rounded-xl overflow-hidden p-3 mt-1"
                >
                  <h3 className="text-[10px] uppercase tracking-[0.2em] text-[#8C8275] px-3 py-2 font-bold border-b border-[#EAE4D9] mb-1">
                    OUR COLLECTIONS
                  </h3>
                  <div className="flex flex-col space-y-1">
                    {COLLECTIONS.map((col) => (
                      <Link
                        key={col.slug}
                        href={`/collections/${col.slug}`}
                        className="px-3 py-2.5 rounded-lg text-xs font-serif hover:bg-[#F5EFE6] hover:text-[#B38E5D] transition-colors flex items-center justify-between group"
                        onClick={() => setActiveMenu(null)}
                      >
                        <span className="font-serif text-sm text-[#2C2825] group-hover:text-[#B38E5D]">{col.name}</span>
                        <span className="text-[9px] uppercase tracking-widest text-[#8C8275] group-hover:text-[#B38E5D]">Explore →</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}

"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export function SignatureProductCarousel() {
  const allProducts = useStore((s) => s.products);
  
  // Filter products tagged for Signature Carousel; fallback to all products if none tagged
  const signatureProducts = allProducts.filter((p) => p.isSignatureCarousel);
  const products = signatureProducts.length > 0 ? signatureProducts : allProducts;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalProducts = products.length;

  const triggerNavigation = useCallback((nextIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(nextIndex);
    setTimeout(() => setIsAnimating(false), 450);
  }, [isAnimating]);

  const handlePrev = useCallback(() => {
    if (totalProducts === 0 || isAnimating) return;
    triggerNavigation((currentIndex - 1 + totalProducts) % totalProducts);
  }, [totalProducts, isAnimating, currentIndex, triggerNavigation]);

  const handleNext = useCallback(() => {
    if (totalProducts === 0 || isAnimating) return;
    triggerNavigation((currentIndex + 1) % totalProducts);
  }, [totalProducts, isAnimating, currentIndex, triggerNavigation]);

  const handleDragEnd = useCallback(
    (_: any, info: PanInfo) => {
      const threshold = 40;
      if (info.offset.x < -threshold) {
        handleNext();
      } else if (info.offset.x > threshold) {
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  // Wheel scroll handler (Mouse scroll wheel support)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // DeltaX for trackpad horizontal swipe, DeltaY for normal mouse wheel
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta > 30) {
        handleNext();
      } else if (delta < -30) {
        handlePrev();
      }
    },
    [handleNext, handlePrev]
  );

  if (totalProducts === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Generate position offsets for 5 visible cards [-2, -1, 0, 1, 2]
  const positions = [-2, -1, 0, 1, 2];

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] overflow-hidden select-none border-y border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center space-x-2 text-[10px] md:text-xs tracking-[0.3em] uppercase text-[#8C8275] mb-3">
            <span className="w-6 h-[1px] bg-[#C5A880]" />
            <span>SIGNATURE PIECES</span>
            <span className="w-6 h-[1px] bg-[#C5A880]" />
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-[#2C2825] tracking-tight mb-3">
            Timeless Brilliance, Crafted for You
          </h2>
          <p className="text-xs md:text-sm text-[#787168] tracking-wider uppercase font-light">
            Discover our most loved creations
          </p>
        </div>

        {/* Carousel Scene */}
        <div className="relative min-h-[520px] md:min-h-[600px] flex items-center justify-center">
          
          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Product"
            className="hidden md:flex absolute left-1 md:left-4 lg:left-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#D5C9B8] bg-white/90 backdrop-blur-md text-[#4A4238] items-center justify-center shadow-md hover:bg-[#2C2825] hover:text-[#FBF9F5] hover:border-[#2C2825] transition-all duration-300 group cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Product"
            className="hidden md:flex absolute right-1 md:right-4 lg:right-8 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#D5C9B8] bg-white/90 backdrop-blur-md text-[#4A4238] items-center justify-center shadow-md hover:bg-[#2C2825] hover:text-[#FBF9F5] hover:border-[#2C2825] transition-all duration-300 group cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* 3D Perspective Stage */}
          <motion.div
            onWheel={handleWheel}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="w-full max-w-[1400px] h-[470px] md:h-[540px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
            style={{ perspective: 1200 }}
          >
            {products.map((product, idx) => {
              // Calculate offset from current active index in infinite loop
              let diff = idx - currentIndex;
              
              // Normalize diff for infinite wrap (-totalProducts/2 to +totalProducts/2)
              if (diff > totalProducts / 2) diff -= totalProducts;
              if (diff < -totalProducts / 2) diff += totalProducts;

              const isCenter = diff === 0;
              const isInnerLeft = diff === -1;
              const isInnerRight = diff === 1;
              const isOuterLeft = diff === -2;
              const isOuterRight = diff === 2;

              // Show 5 products in front stage (-2 to +2)
              const isVisible = Math.abs(diff) <= 2;

              // 5-Product Spatial 3D properties
              let xVal = "0%";
              let scaleVal = 1;
              let rotateYVal = 0;
              let opacityVal = 1;
              let zIndexVal = 30;

              if (isCenter) {
                xVal = "0%";
                scaleVal = 1;
                rotateYVal = 0;
                opacityVal = 1;
                zIndexVal = 30;
              } else if (isInnerLeft) {
                xVal = "-46%";
                scaleVal = 0.82;
                rotateYVal = 14;
                opacityVal = 0.92;
                zIndexVal = 20;
              } else if (isInnerRight) {
                xVal = "46%";
                scaleVal = 0.82;
                rotateYVal = -14;
                opacityVal = 0.92;
                zIndexVal = 20;
              } else if (isOuterLeft) {
                xVal = "-84%";
                scaleVal = 0.68;
                rotateYVal = 22;
                opacityVal = 0.78;
                zIndexVal = 10;
              } else if (isOuterRight) {
                xVal = "84%";
                scaleVal = 0.68;
                rotateYVal = -22;
                opacityVal = 0.78;
                zIndexVal = 10;
              } else if (diff < -2) {
                xVal = "-120%";
                scaleVal = 0.5;
                rotateYVal = 30;
                opacityVal = 0;
                zIndexVal = 0;
              } else {
                xVal = "120%";
                scaleVal = 0.5;
                rotateYVal = -30;
                opacityVal = 0;
                zIndexVal = 0;
              }

              return (
                <motion.div
                  key={product.id}
                  layout
                  onClick={() => {
                    if (isAnimating) return;
                    if (diff !== 0) {
                      setIsAnimating(true);
                      setCurrentIndex(idx);
                      setTimeout(() => setIsAnimating(false), 450);
                    }
                  }}
                  animate={{
                    x: xVal,
                    scale: scaleVal,
                    rotateY: rotateYVal,
                    opacity: isVisible ? opacityVal : 0,
                    zIndex: zIndexVal,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  whileHover={{
                    scale: isCenter ? 1 : scaleVal * 1.05,
                    opacity: isCenter ? 1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                    mass: 0.8,
                  }}
                  className={`absolute rounded-2xl p-5 md:p-7 flex flex-col items-center justify-between border transition-shadow duration-300 ${
                    isCenter
                      ? "w-[310px] sm:w-[370px] md:w-[420px] bg-[#FFFDF9] border-[#D5C9B8] shadow-2xl cursor-default"
                      : "w-[260px] sm:w-[310px] md:w-[360px] bg-[#EFECE6]/95 border-[#E2DDD3] shadow-md cursor-pointer"
                  }`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Bestseller Badge for center */}
                  {isCenter && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#B38E5D] text-white text-[10px] uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full shadow-sm">
                        BESTSELLER
                      </span>
                    </div>
                  )}

                  {/* Image container */}
                  <div className={`relative w-full mb-4 flex items-center justify-center ${
                    isCenter ? "h-[240px] sm:h-[280px] md:h-[320px]" : "h-[210px] sm:h-[250px] md:h-[280px]"
                  }`}>
                    {isCenter ? (
                      <Link href={`/product/${product.slug}`} className="w-full h-full relative block group">
                        <Image
                          src={product.images[0] || "/images/products/rings/ring_placeholder.jpg"}
                          alt={product.name}
                          fill
                          priority
                          sizes="(max-width: 768px) 370px, 420px"
                          className="object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                    ) : (
                      <Image
                        src={product.images[0] || "/images/products/rings/ring_placeholder.jpg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 310px, 360px"
                        className="object-contain drop-shadow-lg"
                      />
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="text-center w-full">
                    <h3 className={`font-serif text-[#2C2825] font-medium tracking-tight ${
                      isCenter ? "text-xl md:text-2xl" : "text-base md:text-lg text-[#3D3732] line-clamp-1"
                    }`}>
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-[#8C8275] mt-1 font-light tracking-wider uppercase">
                      {product.metal || "18K Gold"}, {product.stone || "Natural Diamonds"}
                    </p>

                    <p className={`font-serif font-semibold text-[#1F1B18] ${
                      isCenter ? "text-lg md:text-xl mt-3" : "text-sm mt-2"
                    }`}>
                      {formatPrice(product.price)}
                    </p>

                    {isCenter && (
                      <Link
                        href={`/product/${product.slug}`}
                        className="mt-5 inline-block w-full py-3.5 px-6 bg-[#26221F] hover:bg-[#3D3732] text-[#FFFDF9] text-xs font-semibold uppercase tracking-[0.2em] rounded-md transition-colors shadow-md text-center"
                      >
                        EXPLORE DETAILS
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Compact Dynamic Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-8 md:mt-10">
          {totalProducts <= 10 ? (
            products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to product ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === currentIndex
                    ? "w-8 bg-[#8C6D3B]"
                    : "w-2 bg-[#D9D2C5] hover:bg-[#B3A694]"
                }`}
              />
            ))
          ) : (
            <div className="flex items-center space-x-2 bg-white/80 border border-[#E2DDD3] px-4 py-1.5 rounded-full shadow-sm text-xs font-mono text-[#787168]">
              <span className="font-semibold text-[#2C2825]">{currentIndex + 1}</span>
              <span>/</span>
              <span>{totalProducts}</span>
            </div>
          )}
        </div>

        {/* Feature Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-12 border-t border-[#E8E2D5]/80 text-center">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E0D7C8] flex items-center justify-center mb-3 text-[#A38350] shadow-sm">
              💎
            </div>
            <h4 className="font-serif text-xs md:text-sm font-medium text-[#2C2825] uppercase tracking-wider">
              CERTIFIED DIAMONDS
            </h4>
            <p className="text-[11px] text-[#8C8275] mt-0.5">100% Authentic</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E0D7C8] flex items-center justify-center mb-3 text-[#A38350] shadow-sm">
              ✨
            </div>
            <h4 className="font-serif text-xs md:text-sm font-medium text-[#2C2825] uppercase tracking-wider">
              EXPERT CRAFTSMANSHIP
            </h4>
            <p className="text-[11px] text-[#8C8275] mt-0.5">Handcrafted to perfection</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E0D7C8] flex items-center justify-center mb-3 text-[#A38350] shadow-sm">
              🛡️
            </div>
            <h4 className="font-serif text-xs md:text-sm font-medium text-[#2C2825] uppercase tracking-wider">
              LIFETIME WARRANTY
            </h4>
            <p className="text-[11px] text-[#8C8275] mt-0.5">For your peace of mind</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-white border border-[#E0D7C8] flex items-center justify-center mb-3 text-[#A38350] shadow-sm">
              📦
            </div>
            <h4 className="font-serif text-xs md:text-sm font-medium text-[#2C2825] uppercase tracking-wider">
              SECURE DELIVERY
            </h4>
            <p className="text-[11px] text-[#8C8275] mt-0.5">Insured & discreet</p>
          </div>
        </div>

      </div>
    </section>
  );
}



"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export function SignatureProductCarousel() {
  const allProducts = useStore((s) => s.products);
  
  // Filter products tagged for Signature Carousel; fallback to all products if none tagged
  const signatureProducts = allProducts.filter((p) => p.isSignatureCarousel);
  const products = signatureProducts.length > 0 ? signatureProducts : allProducts;

  const totalProducts = products.length;
  // 5 sets to give plenty of buffer for fast swipes/scrolls (clones)
  const extendedProducts = [...products, ...products, ...products, ...products, ...products];
  const MIDDLE_SET_START = 2 * totalProducts;

  const containerRef = useRef<HTMLDivElement>(null);
  const [absoluteIndex, setAbsoluteIndex] = useState(MIDDLE_SET_START);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = absoluteIndex % totalProducts;

  const scrollToIndex = useCallback((index: number, smooth = true) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const cards = Array.from(container.children).filter(c => c.hasAttribute('data-index')) as HTMLElement[];
    const targetCard = cards.find(c => parseInt(c.getAttribute('data-index') || '0', 10) === index);
    
    if (targetCard) {
      const scrollPosition = targetCard.offsetLeft - container.offsetLeft - (container.clientWidth / 2) + (targetCard.clientWidth / 2);
      
      if (!smooth) {
        container.style.scrollBehavior = "auto";
        container.scrollLeft = scrollPosition;
        // Restore smooth behavior quickly
        setTimeout(() => {
          if (containerRef.current) containerRef.current.style.scrollBehavior = "smooth";
        }, 50);
      } else {
        container.style.scrollBehavior = "smooth";
        container.scrollLeft = scrollPosition;
      }
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    
    const scrollLeft = container.scrollLeft;
    const containerCenter = scrollLeft + container.clientWidth / 2;
    
    let closestIndex = absoluteIndex;
    let minDistance = Infinity;

    const cards = Array.from(container.children) as HTMLElement[];
    const productCards = cards.filter(card => card.hasAttribute('data-index'));
    
    productCards.forEach((card) => {
      const index = parseInt(card.getAttribute('data-index') || '0', 10);
      const cardCenter = card.offsetLeft + card.clientWidth / 2 - container.offsetLeft;
      const distance = Math.abs(containerCenter - cardCenter);
      
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    if (closestIndex !== absoluteIndex) {
      setAbsoluteIndex(closestIndex);
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      // If we got too close to edges (in the first or last set), jump silently to the middle set
      if (closestIndex < totalProducts || closestIndex >= extendedProducts.length - totalProducts) {
        const relativeIdx = closestIndex % totalProducts;
        const middleIdx = MIDDLE_SET_START + relativeIdx;
        scrollToIndex(middleIdx, false);
        setAbsoluteIndex(middleIdx);
      }
    }, 150);
  }, [absoluteIndex, totalProducts, extendedProducts.length, MIDDLE_SET_START, scrollToIndex]);

  useEffect(() => {
    // Initial centering without animation
    if (totalProducts > 0) {
      scrollToIndex(MIDDLE_SET_START, false);
    }
  }, [totalProducts, MIDDLE_SET_START, scrollToIndex]);

  const handlePrev = useCallback(() => {
    if (totalProducts === 0) return;
    scrollToIndex(absoluteIndex - 1, true);
  }, [absoluteIndex, totalProducts, scrollToIndex]);

  const handleNext = useCallback(() => {
    if (totalProducts === 0) return;
    scrollToIndex(absoluteIndex + 1, true);
  }, [absoluteIndex, totalProducts, scrollToIndex]);

  if (totalProducts === 0) return null;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5] overflow-hidden select-none border-y border-[#EAE4D9]">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          
          {/* Nav Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Product"
            className="hidden md:flex absolute left-0 lg:-left-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#D5C9B8] bg-white/90 backdrop-blur-md text-[#4A4238] items-center justify-center shadow-md hover:bg-[#2C2825] hover:text-[#FBF9F5] hover:border-[#2C2825] transition-all duration-300 group cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Product"
            className="hidden md:flex absolute right-0 lg:-right-6 z-40 w-12 h-12 md:w-14 md:h-14 rounded-full border border-[#D5C9B8] bg-white/90 backdrop-blur-md text-[#4A4238] items-center justify-center shadow-md hover:bg-[#2C2825] hover:text-[#FBF9F5] hover:border-[#2C2825] transition-all duration-300 group cursor-pointer"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Native Scroll Stage */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="w-full flex items-center justify-start gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar hide-scrollbar py-12 px-4"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >

            {extendedProducts.map((product, idx) => {
              const isCenter = absoluteIndex === idx;

              return (
                <div
                  key={`${product.id}-${idx}`}
                  data-index={idx}
                  onClick={() => {
                    if (!isCenter) scrollToIndex(idx);
                  }}
                  className={`relative flex-shrink-0 snap-center rounded-2xl p-5 md:p-6 flex flex-col items-center justify-between border transition-transform duration-500 ease-out origin-center will-change-transform w-[280px] sm:w-[320px] md:w-[360px] h-[480px] md:h-[520px] ${
                    isCenter
                      ? "bg-[#FFFDF9] border-[#D5C9B8] shadow-2xl scale-105 z-20 cursor-default"
                      : "bg-[#EFECE6]/95 border-[#E2DDD3] shadow-md scale-95 z-10 cursor-pointer opacity-70 hover:opacity-100"
                  }`}
                >
                  {/* Bestseller Badge for center */}
                  <div className={`absolute top-4 left-4 z-10 transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="bg-[#B38E5D] text-white text-[10px] uppercase tracking-widest font-semibold px-3.5 py-1 rounded-full shadow-sm">
                      BESTSELLER
                    </span>
                  </div>

                  {/* Image container */}
                  <div className="relative w-full flex-1 mb-4 flex items-center justify-center rounded-lg bg-[#F9F8F6] overflow-hidden group">
                    <Link href={`/product/${product.slug}`} className="w-full h-full relative block" onClick={(e) => { if (!isCenter) e.preventDefault(); }}>
                      <Image
                        src={product.images[0] || "/images/products/rings/ring_placeholder.jpg"}
                        alt={product.name}
                        fill
                        priority={isCenter}
                        sizes="(max-width: 768px) 370px, 420px"
                        className={`object-cover transition-transform duration-500 ${isCenter ? 'group-hover:scale-105' : ''}`}
                      />
                    </Link>
                  </div>

                  {/* Product Details */}
                  <div className="text-center w-full flex flex-col items-center">
                    <h3 className="font-serif text-[#2C2825] font-medium tracking-tight text-lg md:text-xl line-clamp-2 h-[56px] flex items-center justify-center" title={product.name}>
                      {product.name}
                    </h3>
                    
                    <p className="font-serif font-semibold text-[#1F1B18] text-base md:text-lg mt-2 h-[28px]">
                      {formatPrice(product.price)}
                    </p>

                    <div className="h-[48px] w-full mt-4 flex items-center justify-center">
                      <Link
                        href={`/product/${product.slug}`}
                        className={`inline-block w-full py-3.5 px-6 bg-[#26221F] hover:bg-[#3D3732] text-[#FFFDF9] text-xs font-semibold uppercase tracking-[0.2em] rounded-md shadow-md text-center transition-all duration-500 ${
                          isCenter ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
                        }`}
                      >
                        EXPLORE DETAILS
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Compact Dynamic Pagination */}
        <div className="flex items-center justify-center space-x-2 mt-4 md:mt-6">
          {totalProducts <= 10 ? (
            products.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToIndex(MIDDLE_SET_START + idx)}
                aria-label={`Go to product ${idx + 1}`}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  idx === activeIndex
                    ? "w-8 bg-[#8C6D3B]"
                    : "w-2 bg-[#D9D2C5] hover:bg-[#B3A694]"
                }`}
              />
            ))
          ) : (
            <div className="flex items-center space-x-2 bg-white/80 border border-[#E2DDD3] px-4 py-1.5 rounded-full shadow-sm text-xs font-mono text-[#787168]">
              <span className="font-semibold text-[#2C2825]">{activeIndex + 1}</span>
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

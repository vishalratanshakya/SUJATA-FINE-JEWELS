"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export function Hero() {
  const storeBanners = useStore((state) => state.heroBanners);
  const setHeroBanners = useStore((state) => state.setHeroBanners);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/hero-banners`);
        if (!res.ok) return;
        const data = await res.json();
        if (data.success && data.data) {
          setHeroBanners(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch hero banners:", err);
      }
    };
    fetchBanners();
  }, [setHeroBanners]);

  const MAIN_BANNERS = storeBanners.filter((b) => b.active && (b.displayType === 'MAIN_BANNER' || !b.displayType)).slice(0, 3);
  const HERO_CARDS = storeBanners.filter((b) => b.active && b.displayType === 'HERO_CARD').slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 3000;
  const PROGRESS_INTERVAL = 30;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === MAIN_BANNERS.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? MAIN_BANNERS.length - 1 : prev - 1));
    setProgress(0);
  };

  useEffect(() => {
    if (MAIN_BANNERS.length === 0) return;

    timerRef.current = setTimeout(() => {
      nextSlide();
    }, SLIDE_DURATION - (progress * SLIDE_DURATION) / 100);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + (PROGRESS_INTERVAL / SLIDE_DURATION) * 100;
        return next > 100 ? 100 : next;
      });
    }, PROGRESS_INTERVAL);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, [currentIndex, progress, MAIN_BANNERS.length]);

  if (MAIN_BANNERS.length === 0 && HERO_CARDS.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col md:flex-row min-h-[100dvh] md:h-screen">
      {/* ── LEFT SIDE: MAIN HERO BANNER CAROUSEL ── */}
      <div className={`relative w-full ${HERO_CARDS.length > 0 ? 'md:w-1/2' : 'md:w-full'} h-[60vh] md:h-full bg-charcoal overflow-hidden`}>
        {MAIN_BANNERS.length > 0 ? (
          <>
            <AnimatePresence initial={false}>
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {MAIN_BANNERS[currentIndex].image && (
                  <Image
                    src={MAIN_BANNERS[currentIndex].image}
                    alt={MAIN_BANNERS[currentIndex].heading}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    priority
                  />
                )}
                {/* Subtle gradient overlay to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/40 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/50 md:to-transparent" />
              </motion.div>
            </AnimatePresence>

            <div className="relative flex-1 flex items-center md:absolute md:inset-0 z-10 md:bg-transparent">
              <div className="px-4 md:px-12 w-full py-10 pb-20 md:py-12 md:pt-20">
                <div className="max-w-xl text-ivory">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`text-${currentIndex}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.6, staggerChildren: 0.2 }}
                      className="flex flex-col items-start"
                    >
                      {MAIN_BANNERS[currentIndex].eyebrow && (
                        <motion.span 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                          className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 text-champagne"
                        >
                          {MAIN_BANNERS[currentIndex].eyebrow}
                        </motion.span>
                      )}
                      
                      <motion.h1 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="font-serif text-4xl md:text-5xl lg:text-5xl leading-[1.15] mb-6 font-light"
                        dangerouslySetInnerHTML={{
                          __html: MAIN_BANNERS[currentIndex].heading.replace(
                            /Your Forever Moments|Heritage|Remembered|Lasts Forever|Most Precious Moments/,
                            (match) => `<span class="italic text-champagne/90">${match}</span>`
                          )
                        }}
                      />
                      
                      {MAIN_BANNERS[currentIndex].description && (
                        <motion.p 
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                          className="text-sm md:text-base mb-10 max-w-sm font-light text-ivory/80 leading-relaxed line-clamp-3"
                        >
                          {MAIN_BANNERS[currentIndex].description}
                        </motion.p>
                      )}
                      
                      {MAIN_BANNERS[currentIndex].cta && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                          <Link 
                            href={MAIN_BANNERS[currentIndex].ctaUrl || "#"}
                            className="inline-flex items-center space-x-4 border border-champagne/50 hover:border-champagne hover:bg-champagne/10 px-8 py-3.5 transition-all duration-300 text-xs tracking-widest uppercase text-champagne"
                          >
                            <span>{MAIN_BANNERS[currentIndex].cta}</span>
                            <span className="w-8 h-[1px] bg-champagne inline-block" />
                          </Link>
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            {MAIN_BANNERS.length > 1 && (
              <>
                <div className="absolute bottom-8 left-4 md:left-12 flex items-center space-x-8 z-20">
                  <div className="flex items-center space-x-2 text-ivory/80 font-serif text-lg">
                    <span>0{currentIndex + 1}</span>
                    <span className="text-ivory/40 text-sm">/</span>
                    <span className="text-ivory/40 text-sm">0{MAIN_BANNERS.length}</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="hidden md:block w-32 h-[1px] bg-white/20 relative">
                    <motion.div 
                      className="absolute top-0 left-0 h-full bg-champagne"
                      style={{ width: `${progress}%` }}
                      transition={{ ease: "linear" }}
                    />
                  </div>
                </div>

                <div className="absolute bottom-6 right-4 md:right-12 flex space-x-3 z-20">
                  <button 
                    onClick={prevSlide}
                    className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
                    aria-label="Previous Slide"
                  >
                    <ChevronLeft size={18} strokeWidth={1} />
                  </button>
                  <button 
                    onClick={nextSlide}
                    className="w-10 h-10 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
                    aria-label="Next Slide"
                  >
                    <ChevronRight size={18} strokeWidth={1} />
                  </button>
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-ivory/50">
            No Main Banners Active
          </div>
        )}
      </div>

      {/* ── RIGHT SIDE: 4 HERO CARDS GRID ── */}
      {HERO_CARDS.length > 0 && (
        <div className="w-full md:w-1/2 h-[50vh] md:h-full bg-gray-100">
          <div className={`w-full h-full grid ${HERO_CARDS.length === 1 ? 'grid-cols-1 grid-rows-1' : HERO_CARDS.length === 2 ? 'grid-cols-1 md:grid-cols-2 grid-rows-2 md:grid-rows-1' : HERO_CARDS.length === 3 ? 'grid-cols-2 grid-rows-2' : 'grid-cols-2 grid-rows-2'} gap-[1px] bg-white`}>
            {HERO_CARDS.map((card, idx) => {
              // For 3 items, make the first one take full width on top
              const isFullWidth = HERO_CARDS.length === 3 && idx === 0;
              return (
                <Link
                  key={card.id}
                  href={card.ctaUrl || "#"}
                  className={`relative block group overflow-hidden bg-gray-100 ${isFullWidth ? 'col-span-2 row-span-1' : 'col-span-1 row-span-1'}`}
                >
                  {card.image && (
                    <Image 
                      src={card.image} 
                      alt={card.heading} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-105" 
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-white font-serif text-xl lg:text-2xl mb-4 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      {card.heading}
                    </h3>
                    {card.cta && (
                      <span className="text-champagne text-[10px] md:text-xs uppercase tracking-widest border border-champagne/50 hover:bg-champagne/10 px-5 py-2.5 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {card.cta}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

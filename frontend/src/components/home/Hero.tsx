"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useStore } from "@/store/useStore";

export function Hero() {
  const storeBanners = useStore((state) => state.heroBanners);
  const HERO_BANNERS = storeBanners.filter((b) => b.active);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const SLIDE_DURATION = 3000;
  const PROGRESS_INTERVAL = 30;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === HERO_BANNERS.length - 1 ? 0 : prev + 1));
    setProgress(0);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? HERO_BANNERS.length - 1 : prev - 1));
    setProgress(0);
  };

  useEffect(() => {

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
  }, [currentIndex]);

  return (
    <div 
      className="relative w-full min-h-[100dvh] md:h-screen flex flex-col md:block overflow-hidden bg-charcoal"
    >
      <div className="relative w-full h-[45vh] md:absolute md:inset-0 md:h-full">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_BANNERS[currentIndex].image}
              alt={HERO_BANNERS[currentIndex].heading}
              fill
              className="object-cover"
              priority
            />
            {/* Subtle gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-black/20 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40 md:to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex-1 flex items-center md:absolute md:inset-0 z-10 md:bg-transparent">
        <div className="max-w-[1920px] mx-auto px-4 md:px-12 w-full py-10 pb-28 md:py-12 md:pt-20">
          <div className="max-w-2xl text-ivory">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, staggerChildren: 0.2 }}
                className="flex flex-col items-start"
              >
                <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                  className="text-[10px] md:text-xs tracking-[0.3em] uppercase mb-4 text-champagne"
                >
                  {HERO_BANNERS[currentIndex].eyebrow}
                </motion.span>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                  className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 font-light"
                  dangerouslySetInnerHTML={{
                    __html: HERO_BANNERS[currentIndex].heading.replace(
                      /Your Forever Moments|Heritage|Remembered|Lasts Forever|Most Precious Moments/,
                      (match) => `<span class="italic text-champagne/90">${match}</span>`
                    )
                  }}
                />
                
                <motion.p 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-sm md:text-base mb-10 max-w-md font-light text-ivory/80 leading-relaxed"
                >
                  {HERO_BANNERS[currentIndex].description}
                </motion.p>
                
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                  <Link 
                    href={HERO_BANNERS[currentIndex].ctaUrl}
                    className="inline-flex items-center space-x-4 border border-champagne/50 hover:border-champagne hover:bg-champagne/10 px-8 py-4 transition-all duration-300 text-xs tracking-widest uppercase text-champagne"
                  >
                    <span>{HERO_BANNERS[currentIndex].cta}</span>
                    <span className="w-8 h-[1px] bg-champagne inline-block" />
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-12 left-4 md:left-12 flex items-center space-x-12 z-20">
        <div className="flex items-center space-x-2 text-ivory/80 font-serif text-lg">
          <span>0{currentIndex + 1}</span>
          <span className="text-ivory/40 text-sm">/</span>
          <span className="text-ivory/40 text-sm">0{HERO_BANNERS.length}</span>
        </div>
        
        {/* Progress Bar */}
        <div className="hidden md:block w-48 h-[1px] bg-white/20 relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-champagne"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>
      </div>

      <div className="absolute bottom-10 right-4 md:right-12 flex space-x-4 z-20">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
          aria-label="Previous Slide"
        >
          <ChevronLeft size={20} strokeWidth={1} />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full border border-ivory/30 flex items-center justify-center text-ivory hover:bg-ivory hover:text-charcoal transition-colors"
          aria-label="Next Slide"
        >
          <ChevronRight size={20} strokeWidth={1} />
        </button>
      </div>
    </div>
  );
}

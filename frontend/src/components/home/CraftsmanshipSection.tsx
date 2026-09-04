"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function CraftsmanshipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;

    if (!section || !image || !text) return;

    // Image reveal and parallax
    gsap.fromTo(
      image,
      { clipPath: "inset(10% 10% 10% 10%)", scale: 1.1 },
      {
        clipPath: "inset(0% 0% 0% 0%)",
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
        }
      }
    );

    // Text reveal
    gsap.fromTo(
      text.children,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-ivory overflow-hidden">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row items-stretch min-h-[500px]">
          
          {/* Image */}
          <div className="w-full lg:w-3/5 relative h-[300px] md:min-h-[400px] lg:min-h-[600px] overflow-hidden" ref={imageRef}>
            <Image
              src="/images/products/rings/ring_placeholder.jpg"
              alt="Jewellery Artisan Crafting"
              fill
              className="object-cover"
            />
          </div>

          {/* Text Container */}
          <div className="w-full lg:w-2/5 bg-white p-8 md:p-12 lg:p-20 flex flex-col justify-center relative shadow-sm z-10 lg:-ml-12 lg:my-12">
            <div ref={textRef} className="max-w-md mx-auto">
              <span className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-charcoal/50 mb-4 block">
                THE ART OF
              </span>
              <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">
                CRAFTSMANSHIP
              </h2>
              <p className="text-sm text-charcoal/70 leading-relaxed mb-10">
                Each piece is thoughtfully designed and meticulously
                handcrafted by master artisans — a blend of heritage,
                passion and precision.
              </p>
              
              <Link 
                href="/about"
                className="inline-flex items-center space-x-4 border border-charcoal hover:bg-charcoal hover:text-ivory px-8 py-3 transition-all duration-300 text-xs tracking-widest uppercase text-charcoal"
              >
                <span>Discover Our Story</span>
                <span className="w-6 h-[1px] bg-current inline-block transition-colors" />
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

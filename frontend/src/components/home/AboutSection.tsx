"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-pearl relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div className="relative aspect-[4/5] md:aspect-[3/4] w-full max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1599643478514-4a0013f9f43c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="About Sujata Fine Jewels"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/10 mix-blend-overlay"></div>
          </div>
          
          <div className="flex flex-col space-y-6 max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <h2 className="text-xs font-bold tracking-[0.2em] uppercase text-charcoal/60">
              Our Heritage
            </h2>
            <h3 className="font-serif text-3xl md:text-5xl text-charcoal leading-tight">
              A Legacy of <br />
              <span className="italic font-light">Timeless Elegance</span>
            </h3>
            <p className="text-charcoal/80 text-sm md:text-base leading-relaxed">
              At Sujata Fine Jewels, we believe every piece of jewelry tells a story. For generations, our master artisans have dedicated themselves to crafting extraordinary pieces that capture life's most precious moments. Combining traditional techniques with contemporary vision, our creations are more than ornaments—they are timeless heirlooms destined to be passed down through generations.
            </p>
            <div className="pt-4 flex justify-center lg:justify-start">
              <Link 
                href="/about" 
                className="group flex items-center space-x-2 bg-charcoal text-white px-8 py-3 rounded-full hover:bg-black transition-colors"
              >
                <span className="text-sm tracking-widest uppercase font-medium">Discover More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

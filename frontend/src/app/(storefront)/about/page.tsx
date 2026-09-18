"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function AboutStoryPage() {
  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStory() {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${backendUrl}/api/about`);
        if (res.ok) {
          const data = await res.json();
          setContent(data.data);
        }
      } catch (err) {
        console.error("Failed to load about story", err);
      } finally {
        setLoading(false);
      }
    }
    fetchStory();
  }, []);

  if (loading || !content) {
    return <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20 flex items-center justify-center">Loading our story...</div>;
  }

  return (
    <div className="bg-[#FAF8F5] min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] sm:h-[85vh]">
        <Image
          src={content.heroImage}
          alt="Sujata Fine Jewels Story"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center z-10">
          <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-4 text-[#EAE4D9]">
            {content.eyebrow}
          </p>
          <h1 className="font-serif text-5xl sm:text-7xl font-medium tracking-wide drop-shadow-lg">
            {content.mainHeading}
          </h1>
        </div>
      </section>

      {/* Main Philosophy */}
      <section className="max-w-4xl mx-auto px-6 py-24 sm:py-32 text-center space-y-8">
        <Sparkles size={32} className="mx-auto text-[#B38E5D] mb-4" />
        <p className="font-serif text-2xl sm:text-4xl text-[#2C2825] leading-relaxed italic opacity-90">
          "{content.storyContent}"
        </p>
        <p className="text-sm font-bold uppercase tracking-widest text-[#B38E5D] pt-4">
          — {content.founderName}
        </p>
      </section>

      {/* Philosophy & Craftsmanship Dual Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24 sm:pb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image src={content.editorialImage1} alt="Craftsmanship" fill className="object-cover" />
        </div>
        <div className="space-y-12 md:pl-10">
          <div className="space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2825]">{content.philosophyHeading}</h3>
            <p className="text-sm text-[#6B6357] leading-loose">
              {content.philosophyContent}
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="font-serif text-3xl sm:text-4xl text-[#2C2825]">{content.craftsmanshipHeading}</h3>
            <p className="text-sm text-[#6B6357] leading-loose">
              {content.craftsmanshipContent}
            </p>
          </div>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="bg-[#2C2825] text-[#FAF8F5] py-24 sm:py-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 md:pr-10">
            <h3 className="font-serif text-4xl sm:text-5xl text-white">Our Heritage</h3>
            <p className="text-sm text-[#E2DDD3] leading-loose">
              {content.founderStory}
            </p>
            <p className="text-sm text-[#E2DDD3] leading-loose">
              Every detail matters to us, from the ethical sourcing of natural gemstones to the final polish of 18K solid gold. The SUJATA Fine Jewels insignia is a promise of unparalleled authenticity, heritage, and trust.
            </p>
          </div>
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-2xl">
            <Image src={content.editorialImage2} alt="Heritage" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Materials & Quality */}
      <section className="max-w-7xl mx-auto px-6 py-24 sm:py-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="order-2 md:order-1 space-y-8 md:pr-10">
          <h3 className="font-serif text-4xl sm:text-5xl text-[#2C2825]">{content.materialsHeading}</h3>
          <p className="text-sm text-[#6B6357] leading-loose">
            {content.materialsContent}
          </p>
          <div className="pt-6">
            <Link
              href="/shop"
              className="inline-flex items-center space-x-3 text-xs font-bold uppercase tracking-widest text-[#B38E5D] hover:text-[#2C2825] transition-colors border-b border-[#B38E5D] pb-1"
            >
              <span>Explore Our Collections</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        <div className="order-1 md:order-2 relative aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image src={content.editorialImage3} alt="Materials" fill className="object-cover" />
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-[#B38E5D] py-24 text-center px-6">
        <h2 className="font-serif text-4xl sm:text-5xl text-white mb-8">Ready to Discover?</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="px-8 py-4 bg-[#2C2825] hover:bg-black text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl"
          >
            SHOP ALL
          </Link>
          <Link
            href="/best-sellers"
            className="px-8 py-4 bg-white/10 hover:bg-white text-white hover:text-[#2C2825] border border-white text-xs font-bold uppercase tracking-widest rounded-xl transition-all shadow-xl"
          >
            BEST SELLERS
          </Link>
        </div>
      </section>

    </div>
  );
}

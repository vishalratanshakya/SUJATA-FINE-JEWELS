"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BLOG_POSTS = [
  {
    id: "post-1",
    title: "The 2024 Guide to Engagement Ring Trends",
    excerpt: "Discover the most sought-after styles for the upcoming year, from vintage-inspired halos to modern minimal solitaires.",
    date: "Oct 12, 2024",
    image: "/images/products/rings/ring_placeholder.jpg"
  },
  {
    id: "post-2",
    title: "How to Care for Your Diamond Jewelry",
    excerpt: "Expert tips on maintaining the brilliance and sparkle of your precious diamonds for generations to come.",
    date: "Sep 28, 2024",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  },
  {
    id: "post-3",
    title: "Understanding Gold Purity: 14K vs 18K vs 24K",
    excerpt: "A comprehensive guide to help you choose the right gold purity for your lifestyle and preferences.",
    date: "Sep 15, 2024",
    image: "/images/products/bracelets/bracelet_placeholder.jpg"
  }
];

export function BlogSection() {
  return (
    <section className="py-24 bg-pearl">
      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-4 tracking-wide">
              FROM THE JOURNAL
            </h2>
            <div className="flex justify-center md:justify-start">
              <div className="w-16 h-[1px] bg-champagne flex items-center justify-center md:justify-start">
                <div className="w-2 h-2 bg-champagne rotate-45" />
              </div>
            </div>
          </div>
          <Link href="/journal" className="text-xs tracking-widest uppercase text-charcoal/60 hover:text-champagne transition-colors flex items-center space-x-2">
            <span>READ ALL ARTICLES</span>
            <span className="w-6 h-[1px] bg-current inline-block" />
          </Link>
        </div>

        <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory hide-scrollbar pb-6 -mx-4 px-4 md:mx-0 md:px-0">
          {BLOG_POSTS.map((post) => (
            <Link href={`/journal/${post.id}`} key={post.id} className="group flex flex-col w-[85vw] md:w-auto flex-shrink-0 snap-center">
              <div className="relative aspect-[4/3] w-full overflow-hidden mb-6 rounded bg-ivory">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <span className="text-xs text-charcoal/50 uppercase tracking-widest mb-3">{post.date}</span>
                <h3 className="font-serif text-xl text-charcoal mb-3 group-hover:text-champagne transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal/70 mb-6 flex-grow line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-2 text-xs font-medium text-charcoal uppercase tracking-widest group-hover:text-champagne transition-colors mt-auto">
                  <span>Read More</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}

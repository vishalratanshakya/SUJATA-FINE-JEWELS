"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Diamond, Heart, Gem } from "lucide-react";

export default function AboutStoryPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <h1 className="font-serif text-4xl sm:text-5xl text-[#2C2825]">
          About SUJATA FINE JEWELS
        </h1>
        <p className="font-serif text-2xl sm:text-3xl text-[#B38E5D] italic">
          Timeless Brilliance, Crafted for You.
        </p>
        <div className="w-16 h-px bg-[#B38E5D] mx-auto mt-6 mb-12"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="relative w-full h-[40vh] sm:h-[60vh] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/images/products/necklaces/necklace_placeholder.jpg"
            alt="Sujata Fine Jewels"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 py-16 text-center space-y-6">
        <p className="text-[#6B6357] leading-loose text-lg">
          At <span className="font-semibold text-[#2C2825]">SUJATA FINE JEWELS</span>, we believe jewellery is more than an accessory — it is a reflection of moments, memories, and individuality.
        </p>
        <p className="text-[#6B6357] leading-loose text-lg">
          Our collection brings together elegant designs, refined craftsmanship, and carefully selected materials to create jewellery that feels timeless yet distinctly yours. From everyday essentials to statement pieces and bridal favourites, every design is created to celebrate the beauty of life's special occasions.
        </p>
        <p className="text-[#6B6357] leading-loose text-lg">
          We are passionate about combining classic elegance with contemporary design, offering pieces that can be cherished today and passed down for generations.
        </p>
      </section>

      <section className="bg-white py-24 border-y border-[#EAE4D9]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square md:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/products/rings/ring_placeholder.jpg"
                alt="Our Philosophy"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center md:text-left space-y-6">
              <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2825]">Our Philosophy</h2>
              <p className="font-serif text-xl sm:text-2xl text-[#B38E5D] italic">
                Crafted with Purpose. Designed to Last.
              </p>
              <div className="w-16 h-px bg-[#B38E5D] mx-auto md:mx-0 my-6"></div>
              <p className="text-[#6B6357] leading-loose text-lg">
                Every piece at SUJATA FINE JEWELS is selected with attention to detail, quality, and timeless appeal. We believe luxury should feel personal — which is why our collections are designed for real moments, from quiet celebrations to unforgettable milestones.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2C2825]">Our Promise</h2>
          <div className="w-16 h-px bg-[#B38E5D] mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex space-x-6 items-start">
            <div className="p-4 bg-[#FAF8F5] rounded-full text-[#B38E5D]">
              <Diamond size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#2C2825] mb-2">Exceptional Craftsmanship</h3>
              <p className="text-[#6B6357] leading-relaxed">
                Thoughtfully designed jewellery with attention to every detail.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-6 items-start">
            <div className="p-4 bg-[#FAF8F5] rounded-full text-[#B38E5D]">
              <Sparkles size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#2C2825] mb-2">Timeless Designs</h3>
              <p className="text-[#6B6357] leading-relaxed">
                Pieces created to remain beautiful beyond changing trends.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-6 items-start">
            <div className="p-4 bg-[#FAF8F5] rounded-full text-[#B38E5D]">
              <Gem size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#2C2825] mb-2">Quality & Authenticity</h3>
              <p className="text-[#6B6357] leading-relaxed">
                A commitment to genuine materials and trusted quality.
              </p>
            </div>
          </div>
          
          <div className="flex space-x-6 items-start">
            <div className="p-4 bg-[#FAF8F5] rounded-full text-[#B38E5D]">
              <Heart size={32} />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#2C2825] mb-2">Personal Experience</h3>
              <p className="text-[#6B6357] leading-relaxed">
                Jewellery shopping should feel elegant, simple, and personal.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2C2825] text-white py-24 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-6">
          <h2 className="font-serif text-3xl sm:text-4xl text-champagne mb-4">Our Vision</h2>
          <p className="text-gray-300 leading-loose text-lg italic">
            "To create a jewellery destination where timeless design meets modern luxury — helping every customer find a piece that becomes part of their story."
          </p>
        </div>
      </section>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useStore } from "@/store/useStore";
import { ProductCard } from "@/components/product/ProductCard";
import { use } from "react";
import { useEffect, useState } from "react";

export default function CollectionPage(props: { params: Promise<{ slug: string }> }) {
  const params = use(props.params);
  const slug = params.slug || "";
  
  const occasions = useStore((s) => s.occasions);
  const collections = useStore((s) => s.collections);
  const products = useStore((s) => s.products);
  
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const occasion = occasions.find((c) => c.id === slug || (c as any).slug === slug);
  const collection = collections.find((c) => c.id === slug || (c as any).slug === slug);

  // Safe display properties
  const titleText = occasion?.name || collection?.name || (slug ? slug.replace(/-/g, " ") : "Featured") + " Collection";
  const heroDescription = occasion?.description || collection?.description || `Explore our exclusive pieces from the ${slug.replace(/-/g, " ")} collection.`;
  const heroImage = occasion?.image || collection?.image || "/images/products/necklaces/necklace_placeholder.jpg";

  // Match products by occasion, category, collection name, or fallback to all products
  const matchedProducts = products.filter((p) => {
    if (slug === "featured" || slug === "all" || slug === "featured-collection") return true;
    if (p.occasions?.includes(slug)) return true;
    if (p.category?.toLowerCase() === slug.toLowerCase()) return true;
    if ((p as any).collectionName?.toLowerCase().includes(slug.toLowerCase())) return true;
    return false;
  });

  const displayProducts = matchedProducts.length > 0 ? matchedProducts : products;

  return (
    <div className="bg-ivory pt-24 pb-20 min-h-screen">
      {/* Hero */}
      <div className="relative w-full h-[35vh] md:h-[50vh] mb-12">
        <Image 
          src={heroImage} 
          alt={titleText}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-serif text-3xl md:text-5xl text-white mb-3 capitalize">{titleText}</h1>
          <p className="text-white/90 max-w-xl mx-auto text-xs md:text-sm leading-relaxed">
            {heroDescription}
          </p>
        </div>
      </div>

      <div className="max-w-[1920px] mx-auto px-4 md:px-8">
        {displayProducts.length === 0 ? (
          <div className="text-center py-16 text-charcoal/60 font-sans text-base">
            No products found for this collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProducts.map((product, i) => (
              <ProductCard key={`${product.id}-${i}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

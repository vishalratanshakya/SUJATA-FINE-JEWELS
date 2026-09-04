"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

export function ProductCard({ product }: { product: Product }) {
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  
  const [mounted, setMounted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (!isInWishlist) {
      toast.success(`${product.name} added to wishlist!`);
      setIsBouncing(true);
      setTimeout(() => setIsBouncing(false), 1000);
    } else {
      toast.error(`${product.name} removed from wishlist.`);
    }
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.price);

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(product.originalPrice) : null;

  return (
    <Link href={`/product/${product.slug}`} className="group relative flex flex-col bg-white rounded-md p-4 md:p-6 transition-shadow duration-300 hover:shadow-xl hover:shadow-charcoal/5 h-full">
      <div className="relative aspect-square w-full mb-6 overflow-hidden bg-ivory rounded flex items-center justify-center">
        <button 
          onClick={handleToggleWishlist}
          className={`absolute top-4 right-4 z-20 transition-all duration-300 ${isBouncing ? 'scale-125' : ''} ${mounted && isInWishlist ? 'text-[#E11D48]' : 'text-charcoal/40 hover:text-[#E11D48]'}`}
          aria-label="Add to wishlist"
        >
          <Heart size={20} strokeWidth={1.5} className={mounted && isInWishlist ? "fill-[#E11D48]" : ""} fill={mounted && isInWishlist ? "#E11D48" : "none"} />
        </button>

        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-0"
        />
        {product.images[1] && (
          <Image
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
          />
        )}
      </div>

      <div className="text-center flex flex-col items-center flex-1">
        <h3 className="font-serif text-lg text-charcoal mb-1 group-hover:text-champagne transition-colors">
          {product.name}
        </h3>
        <p className="text-[10px] md:text-xs text-charcoal/50 tracking-wider uppercase mb-3">
          {product.metal}, {product.stone}
        </p>
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-[15px] font-medium text-charcoal">{formattedPrice}</span>
          {product.discountPercentage && (
            <span className="text-xs font-semibold text-blue-600">
              -{product.discountPercentage}%
            </span>
          )}
          {formattedOriginalPrice && (
            <span className="text-xs text-charcoal/40 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>
        
        <div className="flex space-x-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className={`w-3 h-3 ${i < (product.rating ?? 0) ? 'text-champagne' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </Link>
  );
}

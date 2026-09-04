"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { toast } from "react-hot-toast";

interface WishlistProductCardProps {
  product: Product;
}

export function WishlistProductCard({ product }: WishlistProductCardProps) {
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const addToCart = useStore((state) => state.addToCart);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Badge logic based on mock data or category
  const getBadge = () => {
    if (product.price > 30000) return { text: 'Best Seller', bg: 'bg-[#F9F4E8]', textClass: 'text-[#8C6B4A]' };
    if (product.price < 25000) return { text: 'Trending', bg: 'bg-purple-50', textClass: 'text-purple-700' };
    return { text: 'New Arrival', bg: 'bg-red-50', textClass: 'text-red-700' };
  };
  const badge = getBadge();

  return (
    <div className="flex flex-col bg-white border border-charcoal/5 rounded-xl overflow-hidden shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] h-full group p-4">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#F9F8F6] flex items-center justify-center overflow-hidden rounded-lg mb-4">
        <Link href={`/product/${product.slug}`} className="relative w-full h-full block">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-0"
          />
          {product.images[1] && (
            <Image
              src={product.images[1]}
              alt={`${product.name} alternate view`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-300 [@media(hover:hover)]:group-hover:opacity-100"
            />
          )}
        </Link>
        <button
          onClick={() => {
            toggleWishlist(product);
            toast.error(`${product.name} removed from wishlist.`);
          }}
          className="absolute top-3 right-3 z-10 p-1 hover:scale-110 transition-transform"
          aria-label="Remove from wishlist"
        >
          <Heart size={20} fill="#ef4444" color="#ef4444" strokeWidth={1} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow">
        <div className="mb-2">
          <span className={`text-[10px] font-medium tracking-wider px-2 py-0.5 rounded-sm ${badge.bg} ${badge.textClass}`}>
            {badge.text}
          </span>
        </div>
        
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-serif text-[17px] text-charcoal mb-1 leading-tight hover:text-champagne transition-colors truncate">
            {product.name}
          </h3>
        </Link>
        
        <p className="font-medium text-charcoal mb-2">{formatPrice(product.price)}</p>
        
        <div className="flex items-center space-x-1 mb-5 text-[#EAB308]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star 
              key={star} 
              size={12} 
              fill={star <= Math.floor(product.rating || 5) ? "#EAB308" : "transparent"} 
              color={star <= Math.floor(product.rating || 5) ? "#EAB308" : "#d1d5db"}
            />
          ))}
          <span className="text-[11px] text-charcoal/40 ml-1">
            ({Math.floor(Math.random() * 100) + 50})
          </span>
        </div>

        <div className="mt-auto">
          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.name} to cart`}
            className="w-full flex items-center justify-center space-x-2 bg-[#B38D45] hover:bg-[#9A7635] text-white py-2.5 rounded transition-colors text-sm font-medium"
          >
            <ShoppingBag size={14} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}

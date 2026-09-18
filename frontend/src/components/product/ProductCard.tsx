"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore, Product } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/providers/AuthProvider";

export function ProductCard({ product }: { product: Product }) {
  const toggleWishlist = useStore((state) => state.toggleWishlist);
  const isInWishlist = useStore((state) => state.isInWishlist(product.id));
  const addToCart = useStore((state) => state.addToCart);

  const [mounted, setMounted] = useState(false);
  const [isBouncing, setIsBouncing] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { isAuthenticated } = useAuth();
  
  const handleToggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/wishlist/${product.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        toggleWishlist(product);
        if (!isInWishlist) {
          toast.success(`${product.name} added to wishlist!`);
          setIsBouncing(true);
          setTimeout(() => setIsBouncing(false), 1000);
        } else {
          toast.error(`${product.name} removed from wishlist.`);
        }
      }
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      window.location.href = "/login";
      return;
    }

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/cart/add`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          productId: product.id, 
          quantity: 1, 
          price: product.price 
        })
      });
      if (res.ok) {
        addToCart(product, 1);
        toast.success("Added to Bag!", { icon: "🛍️" });
      }
    } catch (err) {
      toast.error("Failed to add to bag");
    }
  };

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <div className="group relative flex flex-col bg-[#FDFBF7] rounded-lg overflow-hidden border border-[#EAE4D9] hover:border-[#B38E5D] transition-all duration-300 shadow-sm hover:shadow-md h-full">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF8F5]">
        
        {/* Badges: Top Left */}
        <div className="absolute top-2.5 left-2.5 z-20 flex flex-col gap-1.5 pointer-events-none">
          {(product.isBestseller || product.isBestSeller) && (
            <span className="bg-[#9A7635] text-white text-[9px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-2xs">
              BEST SELLER
            </span>
          )}
          {product.isNewArrival && (
            <span className="bg-[#6B7C59] text-white text-[9px] font-semibold uppercase tracking-widest px-2.5 py-0.5 rounded-full shadow-2xs">
              NEW ARRIVAL
            </span>
          )}
        </div>

        {/* Wishlist Button: Top Right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full transition-all duration-300 ${
            isBouncing ? "scale-125" : ""
          } ${mounted && isInWishlist ? "text-rose-600" : "text-[#2C2825]/70 hover:text-rose-600"}`}
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={1.5} className={mounted && isInWishlist ? "fill-rose-600 text-rose-600" : ""} fill={mounted && isInWishlist ? "currentColor" : "none"} />
        </button>

        {/* Product Link Image */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.primaryImage || product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {(product.hoverImage || product.images[1]) && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.hoverImage || product.images[1]}
              alt={`${product.name} hover view`}
              className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100"
            />
          )}
        </Link>
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2 bg-[#FDFBF7]">
        <Link href={`/product/${product.slug}`} className="block space-y-0.5">
          <h3 className="font-serif text-sm sm:text-base text-[#2C2825] group-hover:text-[#B38E5D] transition-colors truncate">
            {product.name}
          </h3>
          <p className="text-[11px] text-[#8C8275] tracking-wide truncate">
            {product.metal} {product.stone ? `| ${product.stone}` : ""}
          </p>
        </Link>

        {/* Price & Add to Bag Trigger */}
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-semibold text-[#2C2825] font-sans">{formattedPrice}</span>

          <button
            onClick={handleAddToCart}
            aria-label="Add to bag"
            className="p-1.5 rounded-md border border-[#EAE4D9] text-[#2C2825] hover:bg-[#2C2825] hover:text-white hover:border-[#2C2825] transition-all duration-200 cursor-pointer"
          >
            <ShoppingBag size={15} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}


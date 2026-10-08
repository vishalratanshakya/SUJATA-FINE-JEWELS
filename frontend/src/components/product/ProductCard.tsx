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
          toast.success("Added to wishlist", {
            duration: 3000,
            style: {
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: "12px",
              minWidth: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #EAE4D9",
              background: "#FDFBF7",
              color: "#2C2825"
            },
            iconTheme: { primary: "#2C2825", secondary: "#FDFBF7" }
          });
          setIsBouncing(true);
          setTimeout(() => setIsBouncing(false), 1000);
        } else {
          toast("Removed from wishlist", {
            duration: 3000,
            style: {
              borderRadius: "9999px",
              padding: "8px 16px",
              fontSize: "12px",
              minWidth: "auto",
              boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
              border: "1px solid #EAE4D9",
              background: "#FDFBF7",
              color: "#2C2825"
            }
          });
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

  const formattedOriginalPrice = product.originalPrice ? new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.originalPrice) : null;

  return (
    <div className="group relative flex flex-col bg-[#FDFBF7] rounded-lg overflow-hidden border border-[#EAE4D9] hover:border-[#B38E5D] hover:-translate-y-[3px] transition-all duration-500 shadow-sm hover:shadow-md h-full">
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF8F5]">
        


        {product.discountPercentage ? (
          <div className="absolute top-3 left-3 z-20 bg-charcoal text-white text-[10px] font-semibold px-2 py-1 rounded tracking-wider uppercase shadow-sm">
            {product.discountPercentage}% OFF
          </div>
        ) : null}

        {/* Wishlist Button: Top Right */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full bg-white shadow-sm hover:shadow-md transition-all duration-300 ${
            isBouncing ? "scale-125" : ""
          } ${mounted && isInWishlist ? "text-rose-600" : "text-gray-600 hover:text-rose-600"}`}
          aria-label="Add to wishlist"
        >
          <Heart size={18} strokeWidth={1.5} className={mounted && isInWishlist ? "fill-rose-600 text-rose-600" : ""} fill={mounted && isInWishlist ? "currentColor" : "none"} />
        </button>

        {/* Product Link Image or Video */}
        <Link href={`/product/${product.slug}`} className="block w-full h-full relative">
          {(() => {
            const img1 = product.primaryImage;
            const img2 = product.images?.[0];
            
            const isValidUrl = (url: string | undefined) => url && (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) && !url.includes('_placeholder.jpg');
            const validImg1 = isValidUrl(img1);
            const validImg2 = isValidUrl(img2);
            
            if (!validImg1 && !validImg2 && product.videoUrl) {
              return (
                <video
                  src={product.videoUrl}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              );
            }

            return (
              <Image
                src={validImg1 ? (img1 as string) : (validImg2 ? (img2 as string) : "/images/products/rings/ring_placeholder.jpg")}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            );
          })()}
          
          {(product.hoverImage || product.images?.[1]) && (
            <Image
              src={(() => {
                const img1 = product.hoverImage;
                const img2 = product.images?.[1];
                const isValidUrl = (url: string | undefined) => url && (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) && !url.includes('_placeholder.jpg');
                if (isValidUrl(img1)) return img1 as string;
                if (isValidUrl(img2)) return img2 as string;
                return "/images/products/rings/ring_placeholder.jpg";
              })()}
              alt={`${product.name} hover view`}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover absolute inset-0 opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100"
            />
          )}
        </Link>
      </div>

      {/* Card Info Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 space-y-2 bg-[#FDFBF7]">
        <div className="flex justify-between items-center mb-1">
           <span className="text-xs text-[#B38E5D] truncate pr-2 font-medium">{product.category || 'Jewellery'}</span>
           <span className="flex items-center text-xs text-[#B38E5D] font-bold">
             <span className="text-amber-400 mr-1 text-[10px]">⭐</span> {product.rating || 4.9}
           </span>
        </div>
        
        <Link href={`/product/${product.slug}`} className="block space-y-0.5 mb-1">
          <h3 className="font-serif text-sm sm:text-base text-[#2C2825] group-hover:text-[#B38E5D] transition-colors truncate">
            {product.name}
          </h3>
        </Link>

        {/* Price & Add to Bag Trigger */}
        <div className="flex items-center justify-between pt-1 mt-auto">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-[#2C2825] font-sans">{formattedPrice}</span>
            {formattedOriginalPrice && (
              <span className="text-xs text-slate-400 line-through font-sans">{formattedOriginalPrice}</span>
            )}
          </div>

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


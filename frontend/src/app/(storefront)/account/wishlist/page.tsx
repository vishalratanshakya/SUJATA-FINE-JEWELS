"use client";

import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "react-hot-toast";

export default function WishlistPage() {
  const wishlist = useStore((s) => s.wishlist);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const addToCart = useStore((s) => s.addToCart);

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 space-y-1">
          <h1 className="font-serif text-3xl text-[#2C2825]">My Wishlist</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            Pieces you've saved for your next special moment.
          </p>
        </div>

        {/* Wishlist Grid or Empty State */}
        {wishlist.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE4D9] text-[#B38E5D] flex items-center justify-center mx-auto">
              <Heart size={28} />
            </div>
            <h3 className="font-serif text-2xl text-[#2C2825]">Your Wishlist is Empty</h3>
            <p className="text-xs text-[#8C8275] leading-relaxed">
              Your wishlist is waiting for something beautiful. Explore our handcrafted collections to save your favorites.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors shadow-xs"
            >
              <span>EXPLORE JEWELLERY</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="group bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE4D9] space-y-3 relative flex flex-col justify-between"
              >
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-6 right-6 z-10 text-rose-600 hover:scale-110 transition-transform"
                >
                  <Heart size={18} className="fill-rose-600" />
                </button>

                <Link href={`/product/${product.slug}`} className="block space-y-3">
                  <div className="aspect-square relative rounded-lg overflow-hidden bg-white border border-[#EAE4D9]">
                    <Image
                      src={product.images[0] || "/images/products/rings/ring_placeholder.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#2C2825] truncate">{product.name}</h4>
                    <p className="text-xs text-[#8C8275]">{product.metal || "18K Gold"}</p>
                    <p className="text-xs font-semibold text-[#B38E5D] mt-1">{formatPrice(product.price)}</p>
                  </div>
                </Link>

                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Added to bag!");
                  }}
                  className="w-full py-2 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center space-x-1.5"
                >
                  <ShoppingBag size={12} />
                  <span>ADD TO BAG</span>
                </button>
              </div>
            ))}
          </div>
        )}

      </div>
    </AccountLayoutWrapper>
  );
}

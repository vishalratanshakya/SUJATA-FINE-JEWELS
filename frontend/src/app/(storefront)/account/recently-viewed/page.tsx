"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Heart, ShoppingBag, Trash2, Eye } from "lucide-react";
import { toast } from "react-hot-toast";

export default function RecentlyViewedPage() {
  const recentlyViewed = useStore((s) => s.recentlyViewed);
  const removeFromRecentlyViewed = useStore((s) => s.removeFromRecentlyViewed);
  const clearRecentlyViewed = useStore((s) => s.clearRecentlyViewed);
  const toggleWishlist = useStore((s) => s.toggleWishlist);
  const isInWishlist = useStore((s) => s.isInWishlist);
  const addToCart = useStore((s) => s.addToCart);
  const cartItems = useStore((s) => s.cart);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const bagCount = isMounted ? cartItems.reduce((acc, item) => acc + item.quantity, 0) : 0;

  const formatPrice = (p: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(p);

  const handleDelete = (id: string, name: string) => {
    removeFromRecentlyViewed(id);
    toast.success(`Removed ${name} from Recently Viewed`);
  };

  const handleClearAll = () => {
    clearRecentlyViewed();
    toast.success("Cleared all Recently Viewed items");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl text-[#2C2825]">Recently Viewed</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase">
              Jewellery you've recently explored.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            {recentlyViewed.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center space-x-1.5 px-3 py-2.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <Trash2 size={15} />
                <span>Delete All</span>
              </button>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {recentlyViewed.length === 0 ? (
          <div className="py-16 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] text-[#8C8275] flex items-center justify-center mx-auto border border-[#EAE4D9]">
              <Eye size={28} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#2C2825]">No Recently Viewed Items</h3>
              <p className="text-xs text-[#8C8275]">Browse our exquisite collections to discover timeless jewellery.</p>
            </div>
            <Link
              href="/shop"
              className="inline-block mt-4 px-6 py-3 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            {recentlyViewed.map((product) => {
              const isFav = isInWishlist(product.id);
              return (
                <div
                  key={product.id}
                  className="group bg-[#FAF8F5] rounded-xl p-4 border border-[#EAE4D9] space-y-3 relative flex flex-col justify-between"
                >
                  {/* Action buttons: Wishlist & Delete */}
                  <div className="absolute top-6 right-6 z-10 flex items-center space-x-2">
                    <button
                      onClick={() => toggleWishlist(product)}
                      title="Add to Wishlist"
                      className={`p-1.5 rounded-full bg-white/80 backdrop-blur-xs transition-colors shadow-2xs ${
                        isFav ? "text-rose-600" : "text-[#8C8275] hover:text-rose-600"
                      }`}
                    >
                      <Heart size={16} fill={isFav ? "currentColor" : "none"} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, product.name)}
                      title="Delete from Recently Viewed"
                      className="p-1.5 rounded-full bg-white/80 backdrop-blur-xs text-[#8C8275] hover:text-rose-700 hover:bg-rose-50 transition-colors shadow-2xs cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <Link href={`/product/${product.slug}`} className="block space-y-3">
                    <div className="aspect-square relative rounded-lg overflow-hidden bg-white border border-[#EAE4D9]">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#2C2825] truncate">{product.name}</h4>
                      <p className="text-xs font-semibold text-[#B38E5D] mt-1">{formatPrice(product.price)}</p>
                    </div>
                  </Link>

                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success("Added to bag!");
                    }}
                    className="w-full py-2 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={12} />
                    <span>ADD TO BAG</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </AccountLayoutWrapper>
  );
}

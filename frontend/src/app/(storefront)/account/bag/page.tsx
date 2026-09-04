"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";

export default function AccountBagPage() {
  const [mounted, setMounted] = useState(false);
  const items = useStore((state) => state.cart);
  const removeItem = useStore((state) => state.removeFromCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const getCartTotal = useStore((state) => state.getCartTotal);
  const getCartCount = useStore((state) => state.getCartCount);

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);

  const subtotal = mounted ? getCartTotal() : 0;
  const totalItems = mounted ? getCartCount() : 0;

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="border-b border-[#F2EDE4] pb-6 flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="font-serif text-3xl text-[#2C2825]">Shopping Bag</h1>
            <p className="text-xs text-[#8C8275] tracking-wider uppercase">
              Items currently selected for purchase.
            </p>
          </div>
          {totalItems > 0 && (
            <span className="px-3.5 py-1.5 bg-[#F5EFE6] text-[#B38E5D] font-bold text-xs rounded-full border border-[#B38E5D]/20">
              {totalItems} {totalItems === 1 ? "Item" : "Items"}
            </span>
          )}
        </div>

        {/* Content */}
        {!mounted || items.length === 0 ? (
          <div className="py-16 text-center space-y-4 max-w-sm mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#EAE4D9] text-[#B38E5D] flex items-center justify-center mx-auto">
              <ShoppingBag size={28} />
            </div>
            <h3 className="font-serif text-2xl text-[#2C2825]">Your Shopping Bag is Empty</h3>
            <p className="text-xs text-[#8C8275] leading-relaxed">
              Explore our handcrafted luxury collections and add your favorite pieces to your bag.
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Bag Items List */}
            <div className="lg:col-span-8 space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="p-4 sm:p-5 rounded-xl border border-[#EAE4D9] bg-[#FAF8F5] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#2C2825] transition-colors relative group"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 relative rounded-lg overflow-hidden bg-white border border-[#EAE4D9] flex-shrink-0">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <Link
                        href={`/product/${item.product.slug}`}
                        className="font-serif text-base font-medium text-[#2C2825] hover:text-[#B38E5D] transition-colors block"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-[#8C8275]">
                        {item.product.metal} {item.product.stone ? `• ${item.product.stone}` : ""}
                      </p>
                      <p className="text-sm font-semibold text-[#B38E5D]">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls & Total */}
                  <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto space-x-6 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#EAE4D9]">
                    <div className="flex items-center border border-[#E2DDD3] bg-white rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        className="p-2 text-[#6B6357] hover:text-[#2C2825] hover:bg-gray-50 transition-colors"
                      >
                        <Minus size={13} />
                      </button>
                      <span className="px-3 text-xs font-semibold text-[#2C2825] min-w-[1.8rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-[#6B6357] hover:text-[#2C2825] hover:bg-gray-50 transition-colors"
                      >
                        <Plus size={13} />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xs text-[#8C8275]">Total</p>
                      <p className="text-sm font-bold text-[#2C2825]">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>

                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Remove item"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary Box */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-[#FAF8F5] p-6 rounded-2xl border border-[#EAE4D9] space-y-4">
                <h3 className="font-serif text-xl text-[#2C2825]">Order Summary</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#6B6357]">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold text-[#2C2825]">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6357]">
                    <span>Insured Shipping</span>
                    <span className="text-[#B38E5D] font-bold uppercase">FREE</span>
                  </div>
                  <div className="h-px bg-[#EAE4D9] my-2" />
                  <div className="flex justify-between text-sm text-[#2C2825] font-bold">
                    <span>Grand Total</span>
                    <span className="text-[#B38E5D]">{formatPrice(subtotal)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded-xl transition-colors flex items-center justify-center space-x-2 block text-center shadow-xs"
                >
                  <span>PROCEED TO CHECKOUT</span>
                  <ArrowRight size={14} />
                </Link>

                <p className="text-[10px] text-center text-[#8C8275] uppercase tracking-wider">
                  Fully Insured Delivery • 15 Days Exchange
                </p>
              </div>
            </div>

          </div>
        )}

      </div>
    </AccountLayoutWrapper>
  );
}

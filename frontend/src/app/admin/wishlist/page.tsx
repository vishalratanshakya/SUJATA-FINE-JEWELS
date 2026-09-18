"use client";

import { Heart, TrendingUp, Users, Package } from "lucide-react";
import Image from "next/image";
import { useStore } from "@/store/useStore";

export default function AdminWishlistPage() {
  const products = useStore((s) => s.products);

  const topSavedProducts = products.slice(0, 5).map((p, idx) => ({
    ...p,
    savesCount: 142 - idx * 24,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Wishlist & Demand Analytics</h1>
        <p className="text-sm text-gray-500 mt-1">Track high-demand pieces saved by clients for re-stock planning and target marketing</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
            <Heart size={20} className="fill-current" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Total Wishlist Saves</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">1,248</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-full">
            <Users size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Active Saving Clients</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">482</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Conversion Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">38.4%</p>
          </div>
        </div>
      </div>

      {/* Most Saved Products */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 space-y-4">
        <h2 className="text-base font-serif text-gray-900 border-b border-gray-100 pb-3">Top Wishlisted Products</h2>
        <div className="divide-y divide-gray-100">
          {topSavedProducts.map((product) => (
            <div key={product.id} className="py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 relative bg-gray-100 rounded border border-gray-100 overflow-hidden">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                  <p className="text-xs text-gray-400">{product.category} • ₹{product.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center space-x-1 bg-rose-50 text-rose-700 px-3 py-1 rounded-full text-xs font-bold">
                  <Heart size={12} className="fill-current" />
                  <span>{product.savesCount} Clients Saved</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

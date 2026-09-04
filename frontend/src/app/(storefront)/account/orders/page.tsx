"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "@/store/useStore";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Search, Filter } from "lucide-react";

export default function AccountOrdersPage() {
  const products = useStore((s) => s.products);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const orders = [
    {
      id: "#SJ10018",
      name: "Celestial Drop Pendant",
      date: "12 May, 2026",
      price: 42000,
      itemCount: "1 Item",
      status: "DELIVERED",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[1]?.images[0] || "/images/products/necklaces/necklace_placeholder.jpg",
    },
    {
      id: "#SJ10017",
      name: "Eternal Bloom Studs",
      date: "08 May, 2026",
      price: 68000,
      itemCount: "1 Item",
      status: "DELIVERED",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[2]?.images[0] || "/images/products/earrings/earrings_placeholder.jpg",
    },
    {
      id: "#SJ10016",
      name: "Luxe Solitaire Ring",
      date: "01 May, 2026",
      price: 78999,
      itemCount: "1 Item",
      status: "PROCESSING",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      image: products[0]?.images[0] || "/images/products/rings/ring_placeholder.jpg",
    },
    {
      id: "#SJ10015",
      name: "Diamond Tennis Bracelet",
      date: "25 Apr, 2026",
      price: 124999,
      itemCount: "1 Item",
      status: "DELIVERED",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      image: products[3]?.images[0] || "/images/products/bracelets/bracelet_placeholder.jpg",
    },
  ];

  const filteredOrders = orders.filter((o) => {
    const matchesFilter = filter === "ALL" || o.status === filter;
    const matchesSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
          <h1 className="font-serif text-3xl text-[#2C2825]">My Orders</h1>
          <p className="text-xs text-[#8C8275] tracking-wider uppercase">
            View and manage all your SUJATA Fine Jewels orders.
          </p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar w-full sm:w-auto">
            {["ALL", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                  filter === f
                    ? "bg-[#2C2825] text-white shadow-xs"
                    : "bg-[#FAF8F5] text-[#6B6357] hover:bg-[#F5EFE6] border border-[#EAE4D9]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8C8275]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search orders..."
              className="w-full bg-[#FAF8F5] border border-[#E2DDD3] pl-10 pr-4 py-2 text-xs rounded-xl focus:outline-none focus:border-[#2C2825]"
            />
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="py-12 text-center text-xs text-[#8C8275]">
            No orders found matching your criteria.
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-2xl border border-[#EAE4D9] bg-[#FAF8F5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#2C2825] transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-18 h-18 relative rounded-xl overflow-hidden bg-white border border-[#EAE4D9] flex-shrink-0">
                    <Image src={order.image} alt={order.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-medium text-[#2C2825]">{order.name}</h3>
                    <p className="text-xs text-[#8C8275]">
                      Order ID: <span className="font-mono">{order.id}</span> • {order.date}
                    </p>
                    <p className="text-xs font-semibold text-[#2C2825] mt-1">
                      {formatPrice(order.price)} <span className="text-[11px] font-normal text-[#8C8275]">({order.itemCount})</span>
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${order.statusColor}`}
                  >
                    {order.status}
                  </span>
                  <Link
                    href={`/account/orders/SJ10018`}
                    className="px-5 py-2 bg-[#2C2825] hover:bg-[#B38E5D] text-white text-[10px] font-bold uppercase tracking-widest rounded-xl transition-colors shadow-xs"
                  >
                    VIEW ORDER
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </AccountLayoutWrapper>
  );
}

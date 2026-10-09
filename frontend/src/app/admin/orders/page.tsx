"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, Eye, RefreshCw } from "lucide-react";
import { toast } from "react-hot-toast";

type AdminOrder = {
  _id: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  createdAt: string;
  paymentMethod: string;
  status: string;
  totalAmount: number;
  items: any[];
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [search, setSearch] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      const res = await fetch(`${backendUrl}/api/orders/admin/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data.data || []);
      } else {
        toast.error("Failed to fetch orders");
      }
    } catch {
      toast.error("Network error while fetching orders");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const filteredOrders = orders.filter((order) => {
    const matchesTab = activeTab === "all" || order.status.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch =
      (order.orderId || "").toLowerCase().includes(search.toLowerCase()) ||
      (order.customerName || "").toLowerCase().includes(search.toLowerCase()) ||
      (order.customerEmail || "").toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status?.toUpperCase()) {
      case "DELIVERED": return "bg-emerald-100 text-emerald-800";
      case "SHIPPED": return "bg-purple-100 text-purple-800";
      case "CONFIRMED":
      case "PROCESSING": return "bg-blue-100 text-blue-800";
      case "CANCELLED": return "bg-red-100 text-red-800";
      default: return "bg-amber-100 text-amber-800";
    }
  };

  const tabCounts: Record<string, number> = {
    all: orders.length,
    pending: orders.filter((o) => o.status?.toUpperCase() === "PENDING").length,
    confirmed: orders.filter((o) => o.status?.toUpperCase() === "CONFIRMED").length,
    shipped: orders.filter((o) => o.status?.toUpperCase() === "SHIPPED").length,
    delivered: orders.filter((o) => o.status?.toUpperCase() === "DELIVERED").length,
    cancelled: orders.filter((o) => o.status?.toUpperCase() === "CANCELLED").length,
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Order Fulfillment &amp; History</h1>
          <p className="text-sm text-gray-500 mt-1">
            Track customer orders, manage shipping status, and inspect transaction details
          </p>
        </div>
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-charcoal text-white text-xs font-semibold rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          <span>{loading ? "Refreshing..." : "Refresh"}</span>
        </button>
      </div>

      {/* Tabs & Search */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 space-y-4">
        <div className="flex flex-wrap gap-2 border-b border-gray-100 pb-3">
          {Object.entries(tabCounts).map(([tab, count]) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded text-xs font-medium uppercase tracking-wider transition-colors flex items-center space-x-2 ${
                activeTab === tab
                  ? "bg-charcoal text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{tab}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"}`}>
                {count}
              </span>
            </button>
          ))}
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by order #, customer name or email..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Order #</th>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Date</th>
                <th className="px-6 py-3.5">Payment</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5 text-right">Total</th>
                <th className="px-6 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    <div className="flex items-center justify-center space-x-2">
                      <RefreshCw size={16} className="animate-spin" />
                      <span>Loading orders...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                    {orders.length === 0 ? "No orders have been placed yet." : "No orders found matching the filter."}
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-gray-900">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{order.customerName}</p>
                      <p className="text-xs text-gray-400">{order.customerEmail}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        {order.paymentMethod || "COD"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ₹{(order.totalAmount || 0).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-800 hover:bg-charcoal hover:text-white rounded text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
                      >
                        <Eye size={14} />
                        <span>View Details</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

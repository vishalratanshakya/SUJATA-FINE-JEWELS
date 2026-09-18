"use client";

import { useState } from "react";
import { Star, CheckCircle, XCircle, Trash2, Filter } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const [reviews, setReviews] = useState([
    { id: "r1", customer: "Ananya Roy", rating: 5, comment: "The solitaire ring clarity exceeded all my expectations. Benchmark craftsmanship!", product: "Royal Diamond Solitaire Ring", status: "approved", date: "2026-08-20" },
    { id: "r2", customer: "Vikram Malhotra", rating: 5, comment: "Delivered in secure luxury packaging with IGI certificate. Highly recommended.", product: "Royal Heritage Choker", status: "approved", date: "2026-08-18" },
    { id: "r3", customer: "Priya Sharma", rating: 4, comment: "Beautiful rose gold finish, prompt customer support.", product: "Rose Gold Diamond Studs", status: "pending", date: "2026-08-28" },
  ]);

  const updateStatus = (id: string, newStatus: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, status: newStatus } : r));
    toast.success(`Review ${newStatus.toUpperCase()}`);
  };

  const filtered = reviews.filter(r => activeFilter === "all" || r.status === activeFilter);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Customer Ratings & Product Reviews</h1>
        <p className="text-sm text-gray-500 mt-1">Moderate customer testimonials, verify buyer status, and manage storefront showcase ratings</p>
      </div>

      {/* Tabs */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-2">
        {["all", "pending", "approved", "rejected"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveFilter(tab)}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
              activeFilter === tab ? "bg-charcoal text-white" : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5">Customer & Product</th>
              <th className="px-6 py-3.5">Rating</th>
              <th className="px-6 py-3.5">Testimonial Comment</th>
              <th className="px-6 py-3.5">Date</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Moderation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((rev) => (
              <tr key={rev.id}>
                <td className="px-6 py-4">
                  <p className="font-semibold text-gray-900">{rev.customer}</p>
                  <p className="text-xs text-gray-400">{rev.product}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-current" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-gray-600 max-w-xs leading-relaxed">{rev.comment}</td>
                <td className="px-6 py-4 text-xs text-gray-400">{rev.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    rev.status === "approved" ? "bg-emerald-100 text-emerald-800" :
                    rev.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {rev.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  {rev.status !== "approved" && (
                    <button onClick={() => updateStatus(rev.id, "approved")} className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-semibold">
                      Approve
                    </button>
                  )}
                  {rev.status !== "rejected" && (
                    <button onClick={() => updateStatus(rev.id, "rejected")} className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 rounded text-xs font-semibold">
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

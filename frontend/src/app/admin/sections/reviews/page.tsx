"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, MessageSquare, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);

  const [formState, setFormState] = useState({
    displayName: "",
    rating: 5,
    reviewText: "",
    mediaUrl: "",
    productId: "",
    isVerifiedPurchase: false,
    isApproved: true,
  });

  const fetchData = async () => {
    try {
      const [resRev, resProd] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`)
      ]);
      const revData = await resRev.json();
      const prodData = await resProd.json();
      
      if (revData.success) setReviews(revData.data);
      if (prodData.success) setProducts(prodData.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreate = () => {
    setFormState({
      displayName: "",
      rating: 5,
      reviewText: "",
      mediaUrl: "",
      productId: "",
      isVerifiedPurchase: true,
      isApproved: true,
    });
    setIsCreating(true);
    setEditingReview(null);
  };

  const handleOpenEdit = (review: any) => {
    setFormState({
      displayName: review.displayName,
      rating: review.rating,
      reviewText: review.reviewText,
      mediaUrl: review.mediaUrl || "",
      productId: review.productId || "",
      isVerifiedPurchase: review.isVerifiedPurchase || false,
      isApproved: review.isApproved || false,
    });
    setEditingReview(review);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.displayName.trim() || !formState.reviewText.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      const method = editingReview ? "PUT" : "POST";
      const url = editingReview 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews/${editingReview._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews`;

      const token = localStorage.getItem("token");
      
      const res = await fetch(url, {
        method,
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(formState)
      });
      
      const data = await res.json();
      if (data.success) {
        toast.success(`Review ${editingReview ? "updated" : "created"}!`);
        setIsCreating(false);
        setEditingReview(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to save review");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete review by "${name}"?`)) return;
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Review deleted.");
        fetchData();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const toggleApproval = async (review: any) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews/${review._id}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({ isApproved: !review.isApproved })
      });
      if (res.ok) {
        toast.success(`Review ${!review.isApproved ? "Approved" : "Unapproved"}`);
        fetchData();
      }
    } catch (err) {
      toast.error("Failed to update approval status");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <MessageSquare className="text-emerald-600" size={24} />
            <span>Customer Reviews</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage and approve customer testimonials</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* List of Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <MessageSquare size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Reviews found.</p>
          </div>
        ) : (
          reviews.map((review) => {
            const product = products.find(p => p.id === review.productId);
            return (
              <div key={review._id} className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col justify-between group space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{review.displayName}</h3>
                      <div className="flex items-center space-x-1 mt-1 text-amber-500">
                        {Array.from({length: 5}).map((_, i) => (
                          <svg key={i} className={`w-3 h-3 ${i < review.rating ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => toggleApproval(review)}
                      className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${review.isApproved ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
                    >
                      {review.isApproved ? "APPROVED" : "PENDING"}
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-4 italic">"{review.reviewText}"</p>
                  
                  {review.mediaUrl && (
                    <div className="relative w-16 h-16 rounded overflow-hidden">
                      <Image src={review.mediaUrl} alt="Review Media" fill className="object-cover" />
                    </div>
                  )}

                  {product && (
                    <div className="text-[10px] text-gray-400 bg-gray-50 p-2 rounded">
                      Linked to: {product.name}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    {review.isVerifiedPurchase && (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center">
                        <Check size={12} className="mr-1" /> Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleOpenEdit(review)} className="p-1.5 text-gray-400 hover:text-blue-600">
                      <Edit size={16} />
                    </button>
                    <button onClick={() => handleDelete(review._id, review.displayName)} className="p-1.5 text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingReview) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingReview(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
        >
          <div className="my-8 flex items-center justify-center min-h-screen">
            <form 
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSave} 
              className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-6 cursor-default"
            >
              <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
                {isCreating ? "Add Testimonial" : `Edit Review`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Customer Name *</label>
                    <input
                      type="text"
                      required
                      value={formState.displayName}
                      onChange={(e) => setFormState({ ...formState, displayName: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Rating (1-5) *</label>
                    <input
                      type="number"
                      min="1"
                      max="5"
                      required
                      value={formState.rating}
                      onChange={(e) => setFormState({ ...formState, rating: parseInt(e.target.value) })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Review Text *</label>
                    <textarea
                      required
                      rows={4}
                      value={formState.reviewText}
                      onChange={(e) => setFormState({ ...formState, reviewText: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-6 pt-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formState.isApproved}
                        onChange={(e) => setFormState({...formState, isApproved: e.target.checked})}
                        className="rounded border-gray-300 text-charcoal focus:ring-charcoal" 
                      />
                      <span className="font-medium text-gray-800">Approved</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formState.isVerifiedPurchase}
                        onChange={(e) => setFormState({...formState, isVerifiedPurchase: e.target.checked})}
                        className="rounded border-gray-300 text-charcoal focus:ring-charcoal" 
                      />
                      <span className="font-medium text-gray-800">Verified Purchase</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <ImageUpload
                      label="Customer Media (Optional)"
                      value={formState.mediaUrl}
                      onChange={(url) => setFormState({ ...formState, mediaUrl: url })}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Link to Product</label>
                    <select
                      value={formState.productId}
                      onChange={(e) => setFormState({ ...formState, productId: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    >
                      <option value="">-- None --</option>
                      {products.map(p => (
                        <option key={p.id} value={p.id}>{p.name} ({p.sku || p.id.slice(0,6)})</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingReview(null); }}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

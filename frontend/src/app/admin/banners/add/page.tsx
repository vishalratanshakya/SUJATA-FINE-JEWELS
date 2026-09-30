"use client";

import { useState } from "react";
import { useStore, HeroBanner } from "@/store/useStore";
import { toast } from "react-hot-toast";
import { Check, X, ArrowLeft } from "lucide-react";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddBannerPage() {
  const router = useRouter();
  const addHeroBanner = useStore((s) => s.addHeroBanner);
  const heroBanners = useStore((s) => s.heroBanners);
  
  const [newBannerForm, setNewBannerForm] = useState<Partial<HeroBanner>>({
    heading: "",
    description: "",
    eyebrow: "",
    image: "",
    cta: "Discover More",
    ctaUrl: "/shop",
    active: false,
    displayType: "MAIN_BANNER",
  });

  const submitNewBanner = async () => {
    if (!newBannerForm.heading?.trim()) { toast.error("Heading is required"); return; }
    if (!newBannerForm.image?.trim()) { toast.error("Image is required"); return; }
    
    try {
      const token = localStorage.getItem("token");
      const nextId = heroBanners.length > 0 ? Math.max(...heroBanners.map((b) => b.id)) + 1 : 1;
      const bannerData = { ...newBannerForm, id: nextId };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/hero-banners`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(bannerData),
      });
      
      const data = await res.json();
      if (data.success) {
        addHeroBanner(bannerData as HeroBanner);
        toast.success("New banner created!");
        router.push("/admin/banners");
      } else {
        toast.error(data.message || "Failed to create banner");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Page Title */}
      <div className="flex items-center space-x-4">
        <Link href="/admin/banners" className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-serif text-gray-800">Add New Banner</h1>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100 p-8">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Display Type <span className="text-red-500">*</span></label>
              <select
                value={newBannerForm.displayType || 'MAIN_BANNER'}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, displayType: e.target.value as 'MAIN_BANNER' | 'HERO_CARD' })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
              >
                <option value="MAIN_BANNER">Main Hero Banner (Left Carousel)</option>
                <option value="HERO_CARD">Hero Card (Right Grid)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Eyebrow Text</label>
              <input
                type="text"
                value={newBannerForm.eyebrow ?? ''}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, eyebrow: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
                placeholder="e.g. NEW COLLECTION"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Heading <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={newBannerForm.heading ?? ''}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, heading: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
                placeholder="e.g. Crafted for Your Forever Moments"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Description</label>
              <textarea
                rows={3}
                value={newBannerForm.description ?? ''}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, description: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
                placeholder="e.g. Exquisite jewellery, handcrafted with passion..."
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">CTA Button Text</label>
              <input
                type="text"
                value={newBannerForm.cta ?? ''}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, cta: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
                placeholder="e.g. Discover More"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">CTA URL</label>
              <input
                type="text"
                value={newBannerForm.ctaUrl ?? ''}
                onChange={(e) => setNewBannerForm({ ...newBannerForm, ctaUrl: e.target.value })}
                className="w-full border border-gray-200 rounded-lg p-3 text-sm font-mono focus:outline-none focus:border-charcoal focus:ring-1 focus:ring-charcoal bg-white transition-all"
                placeholder="e.g. /shop"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Banner Image (Desktop 16:9, Mobile 4:5) <span className="text-red-500">*</span></label>
              <ImageUpload
                value={newBannerForm.image ?? ''}
                onChange={(url) => setNewBannerForm({ ...newBannerForm, image: url })}
              />
            </div>
          </div>
          
          <div className="flex space-x-3 pt-6 border-t border-gray-100">
            <button onClick={submitNewBanner} className="flex items-center space-x-2 px-6 py-2.5 bg-charcoal text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors shadow-sm">
              <Check size={16} /><span>Save Banner</span>
            </button>
            <button onClick={() => router.push("/admin/banners")} className="flex items-center space-x-2 px-6 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors">
              <X size={16} /><span>Cancel</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

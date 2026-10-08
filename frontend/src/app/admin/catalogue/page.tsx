"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, X } from "lucide-react";
import { toast } from "react-hot-toast";
import { FileUpload } from "@/components/admin/FileUpload";

const AVAILABLE_SLUGS = [
  // Main
  { value: "catalogue", label: "Main Catalogue (Top Level)" },
  // Categories
  { value: "rings", label: "Rings (Category)" },
  { value: "necklaces", label: "Necklaces (Category)" },
  { value: "earrings", label: "Earrings (Category)" },
  { value: "bracelets", label: "Bracelets (Category)" },
  { value: "bangles", label: "Bangles (Category)" },
  { value: "pendants", label: "Pendants (Category)" },
  // Occasions
  { value: "wedding", label: "Wedding (Occasion)" },
  { value: "engagement", label: "Engagement (Occasion)" },
  { value: "everyday", label: "Everyday (Occasion)" },
  { value: "gifting", label: "Gifting (Occasion)" },
  { value: "statement", label: "Statement (Occasion)" },
];

export default function CataloguePagesManager() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    targetSlug: "",
    eyebrow: "THE FINEST. FOR FOREVER.",
    title: "",
    description: "",
    bannerImage: "",
    bannerVideo: "",
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const res = await fetch("/api/category-banners");
      const data = await res.json();
      if (data.success) {
        setBanners(data.banners);
      }
    } catch (err) {
      toast.error("Failed to fetch banners");
    } finally {
      setLoading(false);
    }
  };

  const deleteBanner = async (id: string) => {
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      const res = await fetch(`/api/category-banners/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        toast.success("Banner deleted successfully");
        fetchBanners();
      } else {
        toast.error(data.message || "Failed to delete banner");
      }
    } catch (err) {
      toast.error("Failed to delete banner");
    }
  };

  const openEditDrawer = (banner: any) => {
    setFormData({
      name: banner.name || "",
      targetSlug: banner.targetSlug || "",
      eyebrow: banner.eyebrow || "",
      title: banner.title || "",
      description: banner.description || "",
      bannerImage: banner.bannerImage || "",
      bannerVideo: banner.bannerVideo || "",
    });
    setIsDrawerOpen(true);
  };

  const openAddDrawer = () => {
    setFormData({ name: "", targetSlug: "", eyebrow: "THE FINEST. FOR FOREVER.", title: "", description: "", bannerImage: "", bannerVideo: "" });
    setIsDrawerOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.targetSlug) {
      toast.error("Please provide a name and select a category/occasion");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/category-banners", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      
      if (data.success) {
        toast.success("Page content saved successfully!");
        setIsDrawerOpen(false);
        setFormData({ name: "", targetSlug: "", eyebrow: "THE FINEST. FOR FOREVER.", title: "", description: "", bannerImage: "", bannerVideo: "" });
        fetchBanners();
      } else {
        toast.error(data.message || "Failed to add banner");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to add banner");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading banners...</div>;
  }

  return (
    <div className="p-8 max-w-[1600px] mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-charcoal">Catalogue Pages</h1>
          <p className="text-sm text-gray-500 mt-1">Manage text content and cover media for the Main Catalogue and specific Category/Occasion pages ({banners.length} Items)</p>
        </div>
        <button 
          onClick={openAddDrawer}
          className="bg-[#1C1C1C] text-white px-5 py-2.5 rounded text-sm flex items-center hover:bg-black transition-colors cursor-pointer"
        >
          <Plus size={16} className="mr-2" /> Add New Page Content
        </button>
      </div>

      <div className="bg-white rounded border border-gray-200 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#F8F9FA] text-gray-500 font-semibold text-[11px] uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Banner</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Target Slug</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {banners.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No banners found. Add one to get started!</td>
              </tr>
            ) : (
              banners.map((banner: any) => (
                <tr key={banner._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 border border-gray-200">
                      {banner.bannerVideo ? (
                        <video src={banner.bannerVideo} className="w-full h-full object-cover" muted />
                      ) : banner.bannerImage ? (
                        <img src={banner.bannerImage} alt={banner.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Media</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{banner.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded text-xs">{banner.targetSlug}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end space-x-3">
                      <button onClick={() => openEditDrawer(banner)} className="text-gray-400 hover:text-charcoal transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => deleteBanner(banner._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Slide-over Drawer */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => setIsDrawerOpen(false)} />
        
        <div className={`absolute top-0 right-0 bottom-0 w-[450px] bg-[#FAF8F5] shadow-2xl transition-transform duration-300 ease-in-out flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="flex items-center justify-between p-6 border-b border-[#EAE4D9] bg-white">
            <h2 className="text-xl font-serif text-[#2C2825]">{formData.name ? "Edit Page Content" : "Add Page Content"}</h2>
            <button type="button" onClick={() => setIsDrawerOpen(false)} className="text-[#8C8275] hover:text-[#2C2825] transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <form id="banner-form" onSubmit={handleSave} className="space-y-6">
              <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
                <h3 className="font-medium text-gray-800">Target Page</h3>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Internal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    placeholder="e.g., Rings Page Content"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Select Page</label>
                  <select
                    required
                    value={formData.targetSlug}
                    onChange={(e) => setFormData({ ...formData, targetSlug: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                  >
                    <option value="">Select an option...</option>
                    {AVAILABLE_SLUGS.map(slug => (
                      <option key={slug.value} value={slug.value}>{slug.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
                <h3 className="font-medium text-gray-800">Text Content (Optional)</h3>
                
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Eyebrow (Small text above title)</label>
                  <input
                    type="text"
                    value={formData.eyebrow}
                    onChange={(e) => setFormData({ ...formData, eyebrow: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    placeholder="e.g. THE FINEST. FOR FOREVER."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Main Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    placeholder="e.g. CATALOGUE"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal resize-none"
                    placeholder="Explore our complete collection..."
                  />
                </div>
              </div>
              
              <div className="bg-white p-6 rounded shadow-sm border border-gray-100 space-y-5">
                <h3 className="font-medium text-gray-800">Media</h3>
                
                <div className="space-y-6">
                  <div>
                    <FileUpload
                      label="Background Banner Image"
                      accept="image/*"
                      value={formData.bannerImage}
                      onChange={(url: string) => setFormData({ ...formData, bannerImage: url })}
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <FileUpload
                      label="Background Video (Optional)"
                      accept="video/*,.mp4,.webm"
                      value={formData.bannerVideo}
                      onChange={(url: string) => setFormData({ ...formData, bannerVideo: url })}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          
          <div className="p-6 border-t border-[#EAE4D9] bg-white flex gap-3">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="flex-1 py-3 border border-[#EAE4D9] text-xs font-bold uppercase tracking-widest text-[#2C2825] rounded bg-white shadow-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="banner-form"
              disabled={isSubmitting}
              className="flex-1 py-3 bg-[#B38E5D] text-white text-xs font-bold uppercase tracking-widest rounded shadow-sm hover:bg-[#997746] disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? "Saving..." : "Save Page Content"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

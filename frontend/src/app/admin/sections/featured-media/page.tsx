"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, Edit, Trash2, Eye, EyeOff, Film, Image as ImageIcon } from "lucide-react";
import { useStore, FeaturedMediaItem } from "@/store/useStore";
import { ImageUpload } from "@/components/admin/ImageUpload";

export default function FeaturedMediaAdminPage() {
  const items = useStore((s) => s.featuredMediaItems);
  const addFeaturedMedia = useStore((s) => s.addFeaturedMedia);
  const updateFeaturedMedia = useStore((s) => s.updateFeaturedMedia);
  const deleteFeaturedMedia = useStore((s) => s.deleteFeaturedMedia);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<Omit<FeaturedMediaItem, "id">>({
    title: "",
    image: "",
    videoUrl: "",
    link: "",
    active: true,
  });

  const resetForm = () => {
    setFormData({
      title: "",
      image: "",
      videoUrl: "",
      link: "",
      active: true,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item: FeaturedMediaItem) => {
    setFormData({
      title: item.title,
      image: item.image,
      videoUrl: item.videoUrl,
      link: item.link,
      active: item.active,
    });
    setEditingId(item.id);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (!formData.title || !formData.image) {
      alert("Title and Image are required.");
      return;
    }

    if (editingId) {
      updateFeaturedMedia(editingId, formData);
    } else {
      addFeaturedMedia(formData);
    }
    resetForm();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/admin/sections" className="p-2 text-gray-400 hover:text-gray-800 transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif text-gray-900">Featured Product Media</h1>
            <p className="text-sm text-gray-500 mt-1">Manage product showcase carousel items (Video + Image)</p>
          </div>
        </div>
        {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="bg-charcoal text-white px-4 py-2 text-xs font-medium rounded flex items-center space-x-2 hover:bg-gray-800 transition-colors"
          >
            <Plus size={16} />
            <span>Add Media Item</span>
          </button>
        )}
      </div>

      {isEditing ? (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 max-w-3xl space-y-6">
          <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
            {editingId ? "Edit Media Item" : "New Media Item"}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Product Title / Heading *</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="e.g., The Royal Solitaire Collection" 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Product Image (Fallback/Cover) *</label>
                <ImageUpload 
                  value={formData.image}
                  onChange={(url) => setFormData({...formData, image: url})}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">Video URL (Optional)</label>
                <div className="space-y-2">
                  <input 
                    type="text" 
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                    placeholder="https://... (.mp4 link)" 
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
                  />
                  <p className="text-[10px] text-gray-500">Provide a direct link to an MP4 video file. If provided, the video will play automatically.</p>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Product Link</label>
              <input 
                type="text" 
                value={formData.link}
                onChange={(e) => setFormData({...formData, link: e.target.value})}
                placeholder="/product/my-product" 
                className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal" 
              />
            </div>

            <label className="flex items-center space-x-3 cursor-pointer pt-2">
              <input 
                type="checkbox" 
                checked={formData.active}
                onChange={(e) => setFormData({...formData, active: e.target.checked})}
                className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4" 
              />
              <span className="text-sm font-medium text-gray-700">Set as Active (Visible on homepage)</span>
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-100">
            <button 
              onClick={resetForm}
              className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 text-xs font-medium bg-charcoal text-white rounded hover:bg-gray-800 transition-colors"
            >
              {editingId ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Media</th>
                <th className="px-6 py-3.5">Details</th>
                <th className="px-6 py-3.5 text-center">Status</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-400">
                    No featured media items added yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden relative border border-gray-200 shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        {item.videoUrl && (
                          <div className="flex items-center space-x-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
                            <Film size={12} />
                            <span>Video Attached</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 line-clamp-1">{item.title}</div>
                      <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{item.link || "No link"}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button 
                        onClick={() => updateFeaturedMedia(item.id, { active: !item.active })}
                        className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                          item.active 
                            ? "bg-green-100 text-green-700 hover:bg-green-200" 
                            : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        }`}
                      >
                        {item.active ? <><Eye size={12} /><span>Active</span></> : <><EyeOff size={12} /><span>Hidden</span></>}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors inline-flex rounded hover:bg-blue-50"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => deleteFeaturedMedia(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors inline-flex rounded hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

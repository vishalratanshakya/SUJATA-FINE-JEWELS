"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Check, Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default function AdminAboutPage() {
  const [content, setContent] = useState<any>({
    heroImage: "",
    eyebrow: "",
    mainHeading: "",
    storyContent: "",
    philosophyHeading: "",
    philosophyContent: "",
    craftsmanshipHeading: "",
    craftsmanshipContent: "",
    materialsHeading: "",
    materialsContent: "",
    editorialImage1: "",
    editorialImage2: "",
    editorialImage3: "",
    founderName: "",
    founderStory: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAboutStory();
  }, []);

  const fetchAboutStory = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${backendUrl}/api/about`);
      if (res.ok) {
        const data = await res.json();
        setContent(data.data || {});
      }
    } catch (err) {
      toast.error("Failed to load About Story");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContent((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token") || "";
      const res = await fetch(`${backendUrl}/api/about`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(content)
      });
      if (res.ok) {
        toast.success("About Story updated successfully!");
      } else {
        toast.error("Failed to update story");
      }
    } catch (err) {
      toast.error("Error saving story");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-gray-500">Loading editor...</div>;

  return (
    <div className="w-full space-y-10 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-serif text-gray-800">About Story Editor</h1>
          <p className="text-xs text-gray-500 mt-1">Manage the content and imagery for the luxury brand story page.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-charcoal text-white px-6 py-2.5 text-xs font-medium uppercase tracking-wider flex items-center space-x-2 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
        >
          <Check size={16} />
          <span>{saving ? "Saving..." : "Save Changes"}</span>
        </button>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100 p-6 space-y-8">
        
        {/* HERO SECTION */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-600" />
            Hero Section
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Eyebrow Text</label>
                <input type="text" name="eyebrow" value={content.eyebrow} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Main Heading</label>
                <input type="text" name="mainHeading" value={content.mainHeading} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Hero Image URL</label>
                <input type="text" name="heroImage" value={content.heroImage} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div className="relative h-48 bg-gray-100 rounded border overflow-hidden flex items-center justify-center">
              {content.heroImage ? (
                <Image src={content.heroImage} alt="Hero Preview" fill className="object-cover" />
              ) : (
                <ImageIcon className="text-gray-300" size={48} />
              )}
            </div>
          </div>
        </div>

        {/* CORE STORY */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">Core Story & Founder</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Main Story Quote</label>
                <textarea name="storyContent" value={content.storyContent} onChange={handleChange} rows={4} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Founder/Signoff Name</label>
                <input type="text" name="founderName" value={content.founderName} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Heritage / Origin Story</label>
                <textarea name="founderStory" value={content.founderStory} onChange={handleChange} rows={4} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* PILLARS */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">Brand Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Philosophy Heading</label>
                <input type="text" name="philosophyHeading" value={content.philosophyHeading} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Philosophy Content</label>
                <textarea name="philosophyContent" value={content.philosophyContent} onChange={handleChange} rows={4} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Craftsmanship Heading</label>
                <input type="text" name="craftsmanshipHeading" value={content.craftsmanshipHeading} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Craftsmanship Content</label>
                <textarea name="craftsmanshipContent" value={content.craftsmanshipContent} onChange={handleChange} rows={4} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Materials Heading</label>
                <input type="text" name="materialsHeading" value={content.materialsHeading} onChange={handleChange} className="w-full p-2 border rounded text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Materials Content</label>
                <textarea name="materialsContent" value={content.materialsContent} onChange={handleChange} rows={4} className="w-full p-2 border rounded text-sm" />
              </div>
            </div>
          </div>
        </div>

        {/* EDITORIAL IMAGES */}
        <div>
          <h2 className="text-lg font-medium text-gray-800 border-b pb-2 mb-4">Editorial Images</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image 1 (Craftsmanship)</label>
              <input type="text" name="editorialImage1" value={content.editorialImage1} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-2" />
              <div className="relative h-40 bg-gray-100 rounded border overflow-hidden">
                {content.editorialImage1 && <Image src={content.editorialImage1} alt="Preview" fill className="object-cover" />}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image 2 (Heritage)</label>
              <input type="text" name="editorialImage2" value={content.editorialImage2} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-2" />
              <div className="relative h-40 bg-gray-100 rounded border overflow-hidden">
                {content.editorialImage2 && <Image src={content.editorialImage2} alt="Preview" fill className="object-cover" />}
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image 3 (Materials)</label>
              <input type="text" name="editorialImage3" value={content.editorialImage3} onChange={handleChange} className="w-full p-2 border rounded text-sm mb-2" />
              <div className="relative h-40 bg-gray-100 rounded border overflow-hidden">
                {content.editorialImage3 && <Image src={content.editorialImage3} alt="Preview" fill className="object-cover" />}
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore } from "@/store/useStore";

import { ImageUpload } from "@/components/admin/ImageUpload";

export default function CreateCategoryPage() {
  const router = useRouter();
  const addCategory = useStore((s) => s.addCategory);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code) {
      toast.error("Please fill in category name and code");
      return;
    }

    addCategory({
      name,
      code: code.toUpperCase(),
      slug: name.toLowerCase().replace(/\s+/g, "-"),
      description,
      image: image || "/images/products/rings/ring_placeholder.jpg",
      itemCount: 0,
      active: true,
    });

    toast.success(`Category "${name}" created successfully!`);
    router.push("/admin/categories");
  };

  return (
    <div className="max-w-4xl space-y-8 select-none">
      <div>
        <Link href="/admin/categories" className="text-xs font-semibold text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
          <ArrowLeft size={16} />
          <span>Back to Categories</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Create New Category</h1>
        <p className="text-xs text-gray-500 mt-1">Define master jewellery classifications and storefront taxonomy</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!code) setCode(e.target.value.substring(0, 3).toUpperCase());
                }}
                placeholder="e.g. Mangalsutras"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category Code *</label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="e.g. MNG"
                maxLength={4}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-mono focus:outline-none focus:border-charcoal uppercase"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Description</label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of this category..."
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal"
            />
          </div>

          <ImageUpload
            label="Category Cover Image"
            value={image}
            onChange={(url) => setImage(url)}
          />
        </div>

        <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
          <Link href="/admin/categories" className="px-5 py-2.5 text-xs font-semibold text-gray-600 hover:text-gray-900">
            Cancel
          </Link>
          <button type="submit" className="bg-charcoal text-white text-xs font-semibold px-6 py-2.5 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 shadow-sm">
            <Save size={16} />
            <span>Save Category</span>
          </button>
        </div>
      </form>
    </div>
  );
}

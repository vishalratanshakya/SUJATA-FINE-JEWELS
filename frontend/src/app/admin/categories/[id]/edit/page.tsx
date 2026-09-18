"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore } from "@/store/useStore";

import { ImageUpload } from "@/components/admin/ImageUpload";

export default function EditCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const categoryId = resolvedParams.id;
  const router = useRouter();

  const categories = useStore((s) => s.categories);
  const updateCategory = useStore((s) => s.updateCategory);

  const category = categories.find((c) => c.id === categoryId);

  const [name, setName] = useState(category?.name || "");
  const [code, setCode] = useState(category?.code || "");
  const [description, setDescription] = useState(category?.description || "");
  const [image, setImage] = useState(category?.image || "");

  useEffect(() => {
    if (category) {
      setName(category.name);
      setCode(category.code);
      setDescription(category.description || "");
      setImage(category.image || "");
    }
  }, [category]);

  if (!category) {
    return (
      <div className="space-y-6">
        <Link href="/admin/categories" className="text-xs font-semibold text-gray-500 hover:text-charcoal inline-flex items-center space-x-2">
          <ArrowLeft size={16} />
          <span>Back to Categories</span>
        </Link>
        <div className="bg-white p-12 text-center rounded-xl border border-gray-100">
          <h2 className="text-xl font-serif font-bold text-gray-900">Category Not Found</h2>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCategory(category.id, {
      name,
      code: code.toUpperCase(),
      description,
      image,
    });

    toast.success(`Category "${name}" updated successfully!`);
    router.push("/admin/categories");
  };

  return (
    <div className="max-w-4xl space-y-8 select-none">
      <div>
        <Link href="/admin/categories" className="text-xs font-semibold text-gray-500 hover:text-charcoal inline-flex items-center space-x-2 mb-2">
          <ArrowLeft size={16} />
          <span>Back to Categories</span>
        </Link>
        <h1 className="text-2xl font-serif font-bold text-gray-900">Edit Category: {category.name}</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">Category Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <span>Save Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

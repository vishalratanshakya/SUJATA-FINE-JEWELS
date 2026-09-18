"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, Tag, Eye, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, CategoryItem } from "@/store/useStore";

export default function AdminCategoriesPage() {
  const categories = useStore((s) => s.categories);
  const updateCategory = useStore((s) => s.updateCategory);
  const deleteCategory = useStore((s) => s.deleteCategory);

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (cat: CategoryItem) => {
    updateCategory(cat.id, { active: !cat.active });
    toast.success(`Category "${cat.name}" status updated to ${!cat.active ? "ACTIVE" : "INACTIVE"}`);
  };

  const handleDelete = (id: string, name: string) => {
    deleteCategory(id);
    toast.success(`Category "${name}" deleted successfully`);
    setDeletingId(null);
  };

  return (
    <div className="space-y-8 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-gray-900">Jewellery Categories</h1>
          <p className="text-sm text-gray-500 mt-1">Manage master product categories, category codes, visibility and storefront taxonomy</p>
        </div>
        <Link
          href="/admin/categories/create"
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 self-start sm:self-auto shadow-sm"
        >
          <Plus size={16} />
          <span>Add New Category</span>
        </Link>
      </div>

      {/* Control bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search category by title or code..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50/80 text-xs uppercase text-gray-400 font-bold border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Category Code</th>
              <th className="px-6 py-3.5">Linked Products</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                  No jewellery categories found matching your search.
                </td>
              </tr>
            ) : (
              filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <div className="w-12 h-12 relative bg-gray-100 rounded-lg overflow-hidden border flex-shrink-0">
                      <Image
                        src={cat.image || "/images/products/rings/ring_placeholder.jpg"}
                        alt={cat.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-sm block">{cat.name}</span>
                      <span className="text-xs text-gray-400">{cat.slug}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs font-bold text-amber-900 uppercase">
                    {cat.code}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">
                    {cat.itemCount || 0} Products
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStatus(cat)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase transition-colors ${
                        cat.active
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {cat.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      href={`/admin/categories/${cat.id}/edit`}
                      className="p-2 text-gray-400 hover:text-charcoal transition-colors inline-flex rounded-lg hover:bg-gray-100"
                      title="Edit Category"
                    >
                      <Edit2 size={16} />
                    </Link>
                    <button
                      onClick={() => setDeletingId(cat.id)}
                      className="p-2 text-gray-400 hover:text-rose-600 transition-colors inline-flex rounded-lg hover:bg-rose-50"
                      title="Delete Category"
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

      {/* Delete Modal */}
      {deletingId && (
        <div
          onClick={() => setDeletingId(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl space-y-4 cursor-default"
          >
            <h3 className="text-lg font-serif font-bold text-gray-900">Delete Category</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete this category? Products mapped to this category will remain intact in master inventory.
            </p>
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  const target = categories.find((c) => c.id === deletingId);
                  if (target) handleDelete(target.id, target.name);
                }}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 text-white rounded-lg hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

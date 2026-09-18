"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Tag, Eye } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore } from "@/store/useStore";

export default function AdminCollectionsPage() {
  const collections = useStore((s) => s.collections);
  const deleteCollection = useStore((s) => s.deleteCollection);

  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = collections.filter((c) => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.tagline?.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: string, name: string) => {
    deleteCollection(id);
    toast.success(`Collection "${name}" deleted successfully`);
    setDeletingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Curated Collections</h1>
          <p className="text-sm text-gray-500 mt-1">Manage luxury jewellery themes, occasion showcases, and curated lines</p>
        </div>
        <Link 
          href="/admin/collections/create"
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Collection</span>
        </Link>
      </div>

      {/* Control bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collections..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((collection) => (
          <div key={collection.id} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-48 bg-gray-100 relative overflow-hidden">
                <Image 
                  src={collection.image || "/images/collections/bridal.jpg"} 
                  alt={collection.name} 
                  fill 
                  className="object-cover" 
                />
                <div className="absolute top-3 right-3 bg-charcoal/80 text-champagne text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded">
                  {collection.productsCount || 0} Products
                </div>
              </div>
              <div className="p-5 space-y-2">
                <h3 className="font-serif text-lg text-gray-900 font-medium">{collection.name}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{collection.tagline || collection.description}</p>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-gray-50 mt-4 flex items-center justify-between text-xs pt-4">
              <Link 
                href={`/admin/collections/${collection.id}/edit`}
                className="text-gray-600 hover:text-charcoal font-medium inline-flex items-center space-x-1"
              >
                <Edit size={14} />
                <span>Edit Details</span>
              </Link>

              <button 
                onClick={() => setDeletingId(collection.id)}
                className="text-rose-600 hover:text-rose-800 font-medium inline-flex items-center space-x-1"
              >
                <Trash2 size={14} />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div 
          onClick={() => setDeletingId(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl space-y-4 cursor-default"
          >
            <h3 className="text-lg font-serif text-gray-900">Delete Collection</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Are you sure you want to delete this collection? Products linked to this collection will not be deleted, but the collection badge will be removed.
            </p>
            <div className="flex justify-end space-x-3 pt-4">
              <button 
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  const target = collections.find(c => c.id === deletingId);
                  if (target) handleDelete(target.id, target.name);
                }}
                className="px-4 py-2 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
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

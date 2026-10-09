"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, FolderKanban, Gift } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { ImageUpload } from "@/components/admin/ImageUpload";

const OCCASIONS = ["Birthday", "Anniversary", "Wedding", "Festive"];

export default function AdminGiftingStudioPage() {
  const [collections, setCollections] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingCollection, setEditingCollection] = useState<any | null>(null);

  const [formState, setFormState] = useState({
    title: "",
    description: "",
    bannerImage: "",
    slug: "",
    occasion: "Birthday",
    displayOrder: 0,
    isActive: true,
    products: [] as string[],
  });

  const fetchData = async () => {
    try {
      const [resCol, resProd] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gifting-collections`),
        fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/products`)
      ]);
      const colData = await resCol.json();
      const prodData = await resProd.json();
      
      if (colData.success) setCollections(colData.data);
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
      title: "",
      description: "",
      bannerImage: "",
      slug: "",
      occasion: "Birthday",
      displayOrder: 0,
      isActive: true,
      products: [],
    });
    setIsCreating(true);
    setEditingCollection(null);
  };

  const handleOpenEdit = (col: any) => {
    setFormState({
      title: col.title,
      description: col.description || "",
      bannerImage: col.bannerImage,
      slug: col.slug,
      occasion: col.occasion || "Birthday",
      displayOrder: col.displayOrder || 0,
      isActive: col.isActive !== undefined ? col.isActive : true,
      products: col.products || [],
    });
    setEditingCollection(col);
    setIsCreating(false);
  };

  const handleProductToggle = (productId: string) => {
    setFormState((prev) => {
      const exists = prev.products.includes(productId);
      return {
        ...prev,
        products: exists ? prev.products.filter(id => id !== productId) : [...prev.products, productId]
      };
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.slug.trim() || !formState.bannerImage) {
      toast.error("Please fill all required fields (Title, Slug, Banner Image)");
      return;
    }

    try {
      const method = editingCollection ? "PUT" : "POST";
      const url = editingCollection 
        ? `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gifting-collections/${editingCollection._id}`
        : `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gifting-collections`;

      const token = localStorage.getItem("adminToken");
      
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
        toast.success(`Gifting Collection ${editingCollection ? "updated" : "created"}!`);
        setIsCreating(false);
        setEditingCollection(null);
        fetchData();
      } else {
        toast.error(data.error || "Failed to save collection");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gifting-collections/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Collection deleted.");
        fetchData();
      } else {
        toast.error(data.error || "Failed to delete");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Gift className="text-amber-600" size={24} />
            <span>Luxury Gifting Studio</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage luxury gifting collections displayed on the storefront</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Gifting Collection</span>
        </button>
      </div>

      {/* List of Collections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <Gift size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Gifting Collections created yet.</p>
          </div>
        ) : (
          collections.map((col) => (
            <div key={col._id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
              <div>
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <Image src={col.bannerImage} alt={col.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-between p-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded ${col.isActive ? "bg-emerald-500/80 text-white" : "bg-gray-500/80 text-white"} backdrop-blur-md`}>
                      {col.isActive ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-500/80 text-white backdrop-blur-md">
                      {col.occasion}
                    </span>
                  </div>
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-lg text-gray-900 font-medium">{col.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{col.description}</p>
                  <p className="text-[10px] text-gray-400 font-mono mt-1 pt-2 border-t border-gray-100">
                    {col.products?.length || 0} Products Linked
                  </p>
                </div>
              </div>

              <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end space-x-2">
                <button onClick={() => handleOpenEdit(col)} className="p-1.5 text-gray-400 hover:text-blue-600">
                  <Edit size={16} />
                </button>
                <button onClick={() => handleDelete(col._id, col.title)} className="p-1.5 text-gray-400 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingCollection) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingCollection(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer overflow-y-auto"
        >
          <div className="my-8 flex items-center justify-center min-h-screen">
            <form 
              onClick={(e) => e.stopPropagation()}
              onSubmit={handleSave} 
              className="bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl space-y-6 cursor-default"
            >
              <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
                {isCreating ? "Create Gifting Collection" : `Edit "${editingCollection?.title}"`}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
                <div className="space-y-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Title *</label>
                    <input
                      type="text"
                      required
                      value={formState.title}
                      onChange={(e) => setFormState({ ...formState, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-") })}
                      placeholder="e.g. Gifts for Her"
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">URL Slug *</label>
                    <input
                      type="text"
                      required
                      value={formState.slug}
                      onChange={(e) => setFormState({ ...formState, slug: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Occasion Group *</label>
                    <select
                      value={formState.occasion}
                      onChange={(e) => setFormState({ ...formState, occasion: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    >
                      {OCCASIONS.map(occ => (
                        <option key={occ} value={occ}>{occ}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={formState.description}
                      onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                      className="w-full border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formState.isActive}
                        onChange={(e) => setFormState({...formState, isActive: e.target.checked})}
                        className="rounded border-gray-300 text-charcoal focus:ring-charcoal" 
                      />
                      <span className="font-medium text-gray-800">Published (Visible)</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <ImageUpload
                      label="Banner Image *"
                      value={formState.bannerImage}
                      onChange={(url) => setFormState({ ...formState, bannerImage: url })}
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Select Products</label>
                    <div className="h-40 overflow-y-auto border border-gray-200 rounded p-2 space-y-1 bg-gray-50">
                      {products.map(p => (
                        <label key={p.id} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded">
                          <input 
                            type="checkbox"
                            checked={formState.products.includes(p.id)}
                            onChange={() => handleProductToggle(p.id)}
                            className="rounded border-gray-300"
                          />
                          <span className="truncate">{p.name} ({p.sku || p.id.slice(0,6)})</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-1">{formState.products.length} selected</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => { setIsCreating(false); setEditingCollection(null); }}
                  className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                  Save Collection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

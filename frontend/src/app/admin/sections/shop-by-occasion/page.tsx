"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, FolderKanban, Eye, EyeOff, Check } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, Occasion, Product } from "@/store/useStore";

export default function AdminShopByOccasionSectionPage() {
  const occasions = useStore((s) => s.occasions);
  const products = useStore((s) => s.products);
  const addOccasion = useStore((s) => s.addOccasion);
  const updateOccasion = useStore((s) => s.updateOccasion);
  const deleteOccasion = useStore((s) => s.deleteOccasion);

  const [isCreating, setIsCreating] = useState(false);
  const [editingOcc, setEditingOcc] = useState<Occasion | null>(null);

  const [formState, setFormState] = useState({
    name: "",
    description: "",
    image: "/images/products/necklaces/necklace_placeholder.jpg"
  });

  const handleOpenCreate = () => {
    setFormState({
      name: "",
      description: "",
      image: "/images/products/necklaces/necklace_placeholder.jpg"
    });
    setIsCreating(true);
    setEditingOcc(null);
  };

  const handleOpenEdit = (occ: Occasion) => {
    setFormState({
      name: occ.name,
      description: occ.description,
      image: occ.image
    });
    setEditingOcc(occ);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim()) {
      toast.error("Please enter occasion title");
      return;
    }

    if (isCreating) {
      addOccasion({
        id: formState.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        name: formState.name,
        description: formState.description,
        image: formState.image
      });
      toast.success(`Occasion "${formState.name}" created!`);
    } else if (editingOcc) {
      updateOccasion(editingOcc.id, {
        name: formState.name,
        description: formState.description,
        image: formState.image
      });
      toast.success(`Occasion "${formState.name}" updated!`);
    }
    setIsCreating(false);
    setEditingOcc(null);
  };

  const handleDelete = (id: string, name: string) => {
    deleteOccasion(id);
    toast.success(`Occasion "${name}" deleted.`);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <FolderKanban className="text-blue-600" size={24} />
            <span>Shop by Occasion Section Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage theme occasion cards displayed on the storefront homepage</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Occasion Card</span>
        </button>
      </div>

      {/* Grid of Occasions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {occasions.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center text-gray-400 space-y-3 rounded-lg border border-gray-100">
            <FolderKanban size={36} className="mx-auto text-gray-300" />
            <p className="text-sm font-medium text-gray-600">No Occasion Cards created yet.</p>
            <p className="text-xs text-gray-400">Click "+ Create Occasion Card" above to add your first occasion card.</p>
          </div>
        ) : (
          occasions.map((occ) => {
            const count = products.filter(p => p.occasions?.includes(occ.id)).length;
            return (
              <div key={occ.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="h-44 bg-gray-100 relative overflow-hidden">
                    <Image src={occ.image} alt={occ.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                      <span className="text-xs font-semibold text-champagne bg-black/40 backdrop-blur-md px-2.5 py-1 rounded">
                        {count} Products Assigned
                      </span>
                    </div>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="font-serif text-lg text-gray-900 font-medium">{occ.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{occ.description}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end space-x-2">
                  <button onClick={() => handleOpenEdit(occ)} className="p-1.5 text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(occ.id, occ.name)} className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingOcc) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingOcc(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create Occasion Card" : `Edit "${editingOcc?.name}"`}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Occasion Name</label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  placeholder="e.g. Festive Glamour"
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={formState.description}
                  onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                  placeholder="Brief narrative for storefront card..."
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={formState.image}
                  onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingOcc(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save Occasion Card
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Box, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, Experience3DItem } from "@/store/useStore";

export default function Admin3DExperiencePage() {
  const experiences = useStore((s) => s.experiences3D);
  const products = useStore((s) => s.products);
  const addExperience3D = useStore((s) => s.addExperience3D);
  const updateExperience3D = useStore((s) => s.updateExperience3D);
  const deleteExperience3D = useStore((s) => s.deleteExperience3D);

  const [isCreating, setIsCreating] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience3DItem | null>(null);

  const [formState, setFormState] = useState({
    title: "3D PERSPECTIVE JEWELLERY VIEWER",
    productName: products[0]?.name || "Solitaire Diamond Ring",
    gltfUrl: "/models/ring.gltf",
    defaultMetal: "gold" as 'gold' | 'rose' | 'white',
    active: true
  });

  const handleOpenCreate = () => {
    setFormState({
      title: "3D PERSPECTIVE JEWELLERY VIEWER",
      productName: products[0]?.name || "Solitaire Diamond Ring",
      gltfUrl: "/models/ring.gltf",
      defaultMetal: "gold",
      active: true
    });
    setIsCreating(true);
    setEditingExp(null);
  };

  const handleOpenEdit = (exp: Experience3DItem) => {
    setFormState({
      title: exp.title,
      productName: exp.productName || "",
      gltfUrl: exp.gltfUrl || "",
      defaultMetal: exp.defaultMetal || "gold",
      active: exp.active
    });
    setEditingExp(exp);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addExperience3D({ ...formState });
      toast.success("3D Experience showcase created!");
    } else if (editingExp) {
      updateExperience3D(editingExp.id, { ...formState });
      toast.success("3D Experience showcase updated!");
    }
    setIsCreating(false);
    setEditingExp(null);
  };

  const handleDelete = (id: string) => {
    deleteExperience3D(id);
    toast.success("3D Experience showcase deleted.");
  };

  const handleToggleActive = (exp: Experience3DItem) => {
    updateExperience3D(exp.id, { active: !exp.active });
    toast.success(exp.active ? "Showcase deactivated" : "Showcase activated on homepage");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Box className="text-amber-600" size={24} />
            <span>3D Jewellery Experience Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage interactive 360° GLTF model viewer cards and metal customization options</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create 3D Showcase</span>
        </button>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Created 3D Showcases ({experiences.length})</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {experiences.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-3">
              <Box size={36} className="mx-auto text-gray-300" />
              <p className="text-sm font-medium text-gray-600">No 3D Jewellery Experience items created yet.</p>
              <p className="text-xs text-gray-400">Click "+ Create 3D Showcase" above to publish your first 3D viewer card.</p>
            </div>
          ) : (
            experiences.map((exp) => (
              <div key={exp.id} className="p-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-amber-50 text-amber-800 rounded flex items-center justify-center font-bold text-xs flex-shrink-0">
                    3D
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">{exp.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Product: <span className="font-medium text-gray-800">{exp.productName}</span> • Default Metal: <span className="capitalize text-amber-800 font-semibold">{exp.defaultMetal}</span></p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleActive(exp)}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      exp.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {exp.active ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span>{exp.active ? "Active" : "Inactive"}</span>
                  </button>
                  <button onClick={() => handleOpenEdit(exp)} className="p-1.5 text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingExp) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingExp(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create 3D Showcase Card" : "Edit 3D Showcase Card"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={formState.productName}
                  onChange={(e) => setFormState({ ...formState, productName: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">3D Asset File URL (.gltf / .glb)</label>
                <input
                  type="text"
                  required
                  value={formState.gltfUrl}
                  onChange={(e) => setFormState({ ...formState, gltfUrl: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm font-mono focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Default Metal View</label>
                <select
                  value={formState.defaultMetal}
                  onChange={(e) => setFormState({ ...formState, defaultMetal: e.target.value as any })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal bg-white"
                >
                  <option value="gold">Yellow Gold (18K)</option>
                  <option value="rose">Rose Gold (18K)</option>
                  <option value="white">White Gold / Platinum</option>
                </select>
              </div>

              <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="font-medium text-gray-800">Active on Homepage</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingExp(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save 3D Showcase
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

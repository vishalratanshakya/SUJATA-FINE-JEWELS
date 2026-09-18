"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Layers, Eye, EyeOff } from "lucide-react";
import { toast } from "react-hot-toast";
import { useStore, ProductAccordionItem } from "@/store/useStore";

export default function AdminProductAccordionsPage() {
  const accordions = useStore((s) => s.productAccordions);
  const addProductAccordion = useStore((s) => s.addProductAccordion);
  const updateProductAccordion = useStore((s) => s.updateProductAccordion);
  const deleteProductAccordion = useStore((s) => s.deleteProductAccordion);

  const [isCreating, setIsCreating] = useState(false);
  const [editingAcc, setEditingAcc] = useState<ProductAccordionItem | null>(null);

  const [formState, setFormState] = useState({
    title: "",
    content: "",
    positionOrder: accordions.length + 1,
    active: true
  });

  const handleOpenCreate = () => {
    setFormState({
      title: "",
      content: "",
      positionOrder: accordions.length + 1,
      active: true
    });
    setIsCreating(true);
    setEditingAcc(null);
  };

  const handleOpenEdit = (acc: ProductAccordionItem) => {
    setFormState({
      title: acc.title,
      content: acc.content,
      positionOrder: acc.positionOrder,
      active: acc.active
    });
    setEditingAcc(acc);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.title.trim() || !formState.content.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    if (isCreating) {
      addProductAccordion({ ...formState });
      toast.success("Product accordion tab created!");
    } else if (editingAcc) {
      updateProductAccordion(editingAcc.id, { ...formState });
      toast.success("Product accordion tab updated!");
    }
    setIsCreating(false);
    setEditingAcc(null);
  };

  const handleDelete = (id: string) => {
    deleteProductAccordion(id);
    toast.success("Product accordion deleted.");
  };

  const handleToggleActive = (acc: ProductAccordionItem) => {
    updateProductAccordion(acc.id, { active: !acc.active });
    toast.success(acc.active ? "Accordion tab hidden" : "Accordion tab activated");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Layers className="text-amber-800" size={24} />
            <span>Product Page Accordions Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage product detail tabs (Diamond Specs, Shipping Policies, Hallmark & Care Instructions)</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Accordion Tab</span>
        </button>
      </div>

      {/* Main List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Created Accordions ({accordions.length})</h2>
        </div>

        <div className="divide-y divide-gray-100">
          {accordions.length === 0 ? (
            <div className="p-12 text-center text-gray-400 space-y-3">
              <Layers size={36} className="mx-auto text-gray-300" />
              <p className="text-sm font-medium text-gray-600">No Product Accordion tabs created yet.</p>
              <p className="text-xs text-gray-400">Click "+ Create Accordion Tab" above to publish your first tab.</p>
            </div>
          ) : (
            accordions.map((acc) => (
              <div key={acc.id} className="p-5 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 bg-amber-100 text-amber-900 rounded-full flex items-center justify-center font-mono text-[10px] font-bold">
                      {acc.positionOrder}
                    </span>
                    <h3 className="font-semibold text-gray-900 text-sm">{acc.title}</h3>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed pl-7 line-clamp-2">{acc.content}</p>
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleToggleActive(acc)}
                    className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                      acc.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {acc.active ? <Eye size={13} /> : <EyeOff size={13} />}
                    <span>{acc.active ? "Active" : "Inactive"}</span>
                  </button>
                  <button onClick={() => handleOpenEdit(acc)} className="p-1.5 text-gray-400 hover:text-blue-600">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(acc.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingAcc) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingAcc(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create Product Accordion Tab" : "Edit Accordion Tab"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Accordion Tab Title</label>
                <input
                  type="text"
                  required
                  value={formState.title}
                  onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                  placeholder="e.g. Diamond & Gemstone Quality"
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Accordion Content Text</label>
                <textarea
                  rows={4}
                  required
                  value={formState.content}
                  onChange={(e) => setFormState({ ...formState, content: e.target.value })}
                  placeholder="Detailed policy, care instructions, or specifications..."
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Display Position Order</label>
                <input
                  type="number"
                  value={formState.positionOrder}
                  onChange={(e) => setFormState({ ...formState, positionOrder: Number(e.target.value) })}
                  className="w-24 border border-gray-200 rounded p-2 text-sm focus:outline-none focus:border-charcoal font-mono"
                />
              </div>

              <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="font-medium text-gray-800">Show on Product Detail Pages</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingAcc(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save Accordion Tab
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

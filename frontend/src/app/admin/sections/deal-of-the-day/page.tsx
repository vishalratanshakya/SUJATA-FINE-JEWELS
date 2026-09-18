"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Flame, Eye, EyeOff, Clock, Check, X } from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { useStore, DealItem, Product } from "@/store/useStore";

export default function AdminDealOfTheDayPage() {
  const deals = useStore((s) => s.deals);
  const products = useStore((s) => s.products);
  const addDeal = useStore((s) => s.addDeal);
  const updateDeal = useStore((s) => s.updateDeal);
  const deleteDeal = useStore((s) => s.deleteDeal);

  const [isCreating, setIsCreating] = useState(false);
  const [editingDeal, setEditingDeal] = useState<DealItem | null>(null);

  const [formState, setFormState] = useState({
    productId: products[0]?.id || "",
    productName: products[0]?.name || "Featured Jewellery Piece",
    dealPrice: 85000,
    originalPrice: 120000,
    timerHHMMSS: "06:00:00",
    active: true
  });

  const handleProductSelect = (productId: string) => {
    const prod = products.find((p) => p.id === productId);
    if (prod) {
      setFormState({
        ...formState,
        productId: prod.id,
        productName: prod.name,
        dealPrice: prod.price,
        originalPrice: prod.originalPrice || prod.price * 1.25
      });
    }
  };

  const handleOpenCreate = () => {
    const firstProd = products[0];
    setFormState({
      productId: firstProd?.id || "",
      productName: firstProd?.name || "Featured Jewellery",
      dealPrice: firstProd ? firstProd.price * 0.8 : 85000,
      originalPrice: firstProd ? firstProd.price : 110000,
      timerHHMMSS: "08:00:00",
      active: true
    });
    setIsCreating(true);
    setEditingDeal(null);
  };

  const handleOpenEdit = (deal: DealItem) => {
    setFormState({
      productId: deal.productId || "",
      productName: deal.productName || "",
      dealPrice: deal.dealPrice,
      originalPrice: deal.originalPrice || 0,
      timerHHMMSS: deal.timerHHMMSS || "24:00:00",
      active: deal.active
    });
    setEditingDeal(deal);
    setIsCreating(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreating) {
      addDeal({ ...formState });
      toast.success("Deal of the Day item created!");
    } else if (editingDeal) {
      updateDeal(editingDeal.id, { ...formState });
      toast.success("Deal of the Day item updated!");
    }
    setIsCreating(false);
    setEditingDeal(null);
  };

  const handleDelete = (id: string) => {
    deleteDeal(id);
    toast.success("Deal item deleted.");
  };

  const handleToggleActive = (deal: DealItem) => {
    updateDeal(deal.id, { active: !deal.active });
    toast.success(deal.active ? "Deal deactivated" : "Deal activated on homepage");
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 flex items-center space-x-2">
            <Flame className="text-red-500" size={24} />
            <span>Deal of the Day Manager</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">Create and manage limited-time flash sale products and countdown timers</p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Create Deal Item</span>
        </button>
      </div>

      {/* Main List & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table / List (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wider">Created Deals ({deals.length})</h2>
          </div>

          <div className="divide-y divide-gray-100">
            {deals.length === 0 ? (
              <div className="p-12 text-center text-gray-400 space-y-3">
                <Flame size={36} className="mx-auto text-gray-300" />
                <p className="text-sm font-medium text-gray-600">No Deal of the Day items created yet.</p>
                <p className="text-xs text-gray-400">Click "+ Create Deal Item" above to add your first flash sale.</p>
              </div>
            ) : (
              deals.map((deal) => {
                const prod = products.find((p) => p.id === deal.productId);
                return (
                  <div key={deal.id} className="p-4 flex items-center justify-between hover:bg-gray-50/80 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-100 rounded relative overflow-hidden flex-shrink-0">
                        {prod ? (
                          <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />
                        ) : (
                          <Flame className="m-auto text-gray-300" size={24} />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{deal.productName}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500 mt-0.5">
                          <span className="font-bold text-red-600">₹{deal.dealPrice.toLocaleString('en-IN')}</span>
                          <span className="line-through text-gray-400">₹{(deal.originalPrice || 0).toLocaleString('en-IN')}</span>
                          <span className="font-mono text-gray-600">({deal.timerHHMMSS})</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleToggleActive(deal)}
                        className={`px-3 py-1 rounded text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                          deal.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {deal.active ? <Eye size={13} /> : <EyeOff size={13} />}
                        <span>{deal.active ? "Active" : "Inactive"}</span>
                      </button>
                      <button onClick={() => handleOpenEdit(deal)} className="p-1.5 text-gray-400 hover:text-blue-600">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(deal.id)} className="p-1.5 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Live Preview Sidebar (1 Col) */}
        <div>
          <div className="bg-gradient-to-b from-[#1a1816] to-[#0f0e0d] text-white p-6 rounded-lg shadow-sm border border-amber-500/20 space-y-4">
            <div className="flex items-center justify-between text-xs text-amber-300 uppercase tracking-widest font-semibold">
              <span className="flex items-center space-x-1">
                <Flame size={14} className="text-red-500" />
                <span>Live Homepage Preview</span>
              </span>
            </div>

            {deals.filter(d => d.active).length === 0 ? (
              <div className="p-8 text-center text-amber-100/40 text-xs italic border border-dashed border-white/10 rounded">
                Section hidden on homepage (No active deals).
              </div>
            ) : (
              (() => {
                const activeDeal = deals.find(d => d.active) || deals[0];
                const prod = products.find(p => p.id === activeDeal.productId);
                return (
                  <div className="space-y-4">
                    <div className="h-44 bg-gray-800 rounded relative overflow-hidden">
                      {prod && <Image src={prod.images[0]} alt={prod.name} fill className="object-cover" />}
                      <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                        FLASH DEAL
                      </span>
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-white">{activeDeal.productName}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-amber-400">₹{activeDeal.dealPrice.toLocaleString('en-IN')}</span>
                        <span className="text-xs text-gray-400 line-through">₹{(activeDeal.originalPrice || 0).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/10 rounded flex items-center justify-between text-xs font-mono text-amber-300">
                      <span className="flex items-center space-x-1"><Clock size={14} /> <span>Ends in:</span></span>
                      <span>{activeDeal.timerHHMMSS}</span>
                    </div>
                  </div>
                );
              })()
            )}
          </div>
        </div>

      </div>

      {/* Create / Edit Modal */}
      {(isCreating || editingDeal) && (
        <div 
          onClick={() => { setIsCreating(false); setEditingDeal(null); }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
        >
          <form 
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave} 
            className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl space-y-6 cursor-default"
          >
            <h2 className="text-lg font-serif text-gray-900 border-b border-gray-100 pb-3">
              {isCreating ? "Create Deal of the Day Item" : "Edit Deal Item"}
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-medium text-gray-700 mb-1">Select Product from Catalog</label>
                <select
                  value={formState.productId}
                  onChange={(e) => handleProductSelect(e.target.value)}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal bg-white"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} (₹{p.price.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Deal Discount Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formState.dealPrice}
                    onChange={(e) => setFormState({ ...formState, dealPrice: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formState.originalPrice}
                    onChange={(e) => setFormState({ ...formState, originalPrice: Number(e.target.value) })}
                    className="w-full border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-charcoal"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">Countdown Timer Value (HH:MM:SS)</label>
                <input
                  type="text"
                  required
                  value={formState.timerHHMMSS}
                  onChange={(e) => setFormState({ ...formState, timerHHMMSS: e.target.value })}
                  className="w-full border border-gray-200 rounded p-2.5 text-sm font-mono focus:outline-none focus:border-charcoal"
                />
              </div>

              <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={formState.active}
                  onChange={(e) => setFormState({ ...formState, active: e.target.checked })}
                  className="rounded border-gray-300 text-charcoal focus:ring-charcoal h-4 w-4"
                />
                <span className="font-medium text-gray-800">Publish & Show on Live Storefront Homepage</span>
              </label>
            </div>

            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => { setIsCreating(false); setEditingDeal(null); }}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button type="submit" className="px-5 py-2 bg-charcoal text-white text-xs font-medium rounded hover:bg-gray-800">
                Save Deal Item
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

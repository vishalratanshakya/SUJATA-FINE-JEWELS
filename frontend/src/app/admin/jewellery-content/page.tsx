"use client";

import { useState } from "react";
import { Plus, Search, Edit2, Trash2, CheckCircle2, XCircle, Eye } from "lucide-react";
import { toast } from "react-hot-toast";

export default function JewelleryContentPage() {
  const [activeTab, setActiveTab] = useState("categories");

  const [categories, setCategories] = useState([
    { id: "1", name: "Rings", code: "RNG", itemCount: 42, active: true },
    { id: "2", name: "Necklaces", code: "NCK", itemCount: 28, active: true },
    { id: "3", name: "Earrings", code: "ERG", itemCount: 35, active: true },
    { id: "4", name: "Bracelets", code: "BRC", itemCount: 19, active: true },
  ]);

  const [metals, setMetals] = useState([
    { id: "m1", name: "18K Yellow Gold", purity: "75.0% Gold", color: "#E5C158", active: true },
    { id: "m2", name: "18K Rose Gold", purity: "75.0% Gold + Copper", color: "#E8A388", active: true },
    { id: "m3", name: "18K White Gold", purity: "75.0% Gold + Rhodium", color: "#F0F0F0", active: true },
    { id: "m4", name: "950 Platinum", purity: "95.0% Platinum", color: "#D1D5DB", active: true },
  ]);

  const [diamondTypes, setDiamondTypes] = useState([
    { id: "d1", shape: "Round Brilliant", clarity: "VVS1", color: "EF", cut: "Ideal" },
    { id: "d2", shape: "Emerald Cut", clarity: "VS1", color: "FG", cut: "Excellent" },
    { id: "d3", shape: "Pear Shape", clarity: "VVS2", color: "EF", cut: "Ideal" },
  ]);

  const toggleStatus = (id: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, active: !c.active } : c));
    toast.success("Category status updated!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Jewellery Specifications & Master Taxonomy</h1>
        <p className="text-sm text-gray-500 mt-1">Manage luxury metal purity benchmarks, diamond grading specs, categories, and care guidelines</p>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white p-2 rounded-lg shadow-sm border border-gray-100 flex flex-wrap gap-2">
        {[
          { id: "categories", label: "Categories & Types" },
          { id: "metals", label: "Metals & Purity" },
          { id: "diamonds", label: "Diamond Information" },
          { id: "care", label: "Care Instructions" },
          { id: "shipping", label: "Shipping & Returns Policy" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === tab.id
                ? "bg-charcoal text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Categories View */}
      {activeTab === "categories" && (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="text-base font-serif text-gray-900">Active Product Categories</h2>
            <button className="px-3.5 py-2 bg-charcoal text-white text-xs rounded font-medium hover:bg-gray-800 transition-colors inline-flex items-center space-x-1.5">
              <Plus size={14} />
              <span>Add Category</span>
            </button>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase border-b border-gray-100">
              <tr>
                <th className="px-4 py-3">Category Name</th>
                <th className="px-4 py-3">Code</th>
                <th className="px-4 py-3">Items Linked</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {categories.map((cat) => (
                <tr key={cat.id}>
                  <td className="px-4 py-3.5 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-500 font-mono">{cat.code}</td>
                  <td className="px-4 py-3.5 text-xs text-gray-700">{cat.itemCount} Products</td>
                  <td className="px-4 py-3.5">
                    <button onClick={() => toggleStatus(cat.id)} className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${cat.active ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-600"}`}>
                      {cat.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="px-4 py-3.5 text-right space-x-2">
                    <button className="text-gray-400 hover:text-charcoal"><Edit2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Metals & Purity */}
      {activeTab === "metals" && (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="text-base font-serif text-gray-900">Precious Metal Options</h2>
            <button className="px-3.5 py-2 bg-charcoal text-white text-xs rounded font-medium hover:bg-gray-800 inline-flex items-center space-x-1.5">
              <Plus size={14} />
              <span>Add Precious Metal</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {metals.map((metal) => (
              <div key={metal.id} className="p-4 bg-gray-50 rounded border border-gray-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 rounded-full border border-gray-300 shadow-inner" style={{ backgroundColor: metal.color }} />
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{metal.name}</h3>
                    <p className="text-xs text-gray-500">{metal.purity}</p>
                  </div>
                </div>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded uppercase">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Diamond Info */}
      {activeTab === "diamonds" && (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-serif text-gray-900 border-b border-gray-100 pb-3">Certified Solitaire Specifications (4Cs Standard)</h2>
          <div className="divide-y divide-gray-100">
            {diamondTypes.map((d) => (
              <div key={d.id} className="py-3 flex justify-between items-center text-xs">
                <div>
                  <span className="font-bold text-gray-900 text-sm">{d.shape}</span>
                  <span className="ml-3 text-gray-500">Color: {d.color} • Clarity: {d.clarity} • Cut: {d.cut}</span>
                </div>
                <span className="text-gray-400 font-mono text-[10px]">GIA / IGI Verified</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Care & Shipping */}
      {(activeTab === "care" || activeTab === "shipping") && (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 space-y-4">
          <h2 className="text-base font-serif text-gray-900 border-b border-gray-100 pb-3 uppercase tracking-wider text-xs">
            {activeTab === "care" ? "Jewellery Care Guidelines" : "Shipping, Returns & Insured Transit Policy"}
          </h2>
          <textarea 
            rows={8}
            defaultValue={
              activeTab === "care" 
                ? "Store each piece in its original plush velvet box. Keep away from perfumes, hairsprays, and harsh cleaning chemicals." 
                : "All SUJATA FINE JEWELS parcels are shipped 100% fully insured via FedEx / BlueDart Express with signature required upon delivery."
            }
            className="w-full p-4 border border-gray-200 rounded text-xs leading-relaxed focus:outline-none focus:border-charcoal"
          />
          <button className="px-5 py-2.5 bg-charcoal text-white text-xs rounded hover:bg-gray-800 transition-colors">
            Save Policy Changes
          </button>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";
import { Boxes, AlertTriangle, CheckCircle, RefreshCw, Search } from "lucide-react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useStore } from "@/store/useStore";

export default function AdminInventoryPage() {
  const products = useStore((s) => s.products);
  const updateProduct = useStore((s) => s.updateProduct);

  const [activeTab, setActiveTab] = useState("all");
  const [stockInputs, setStockInputs] = useState<{ [key: string]: number }>({});

  const handleStockUpdate = (id: string, currentStock: number) => {
    const newStock = stockInputs[id] !== undefined ? stockInputs[id] : currentStock;
    updateProduct(id, { inStock: newStock > 0 });
    toast.success("Inventory count updated");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Inventory & Stock Controls</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time vault stock levels, low-stock warnings, and re-order triggers</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <Boxes size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Total Catalog Items</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{products.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-full">
            <CheckCircle size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">In Stock Vault</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{products.filter(p => p.inStock).length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm flex items-center space-x-4">
          <div className="p-3 bg-rose-50 text-rose-600 rounded-full">
            <AlertTriangle size={20} />
          </div>
          <div>
            <p className="text-xs font-medium uppercase text-gray-400">Out of Stock</p>
            <p className="text-2xl font-bold text-gray-900 mt-0.5">{products.filter(p => !p.inStock).length}</p>
          </div>
        </div>
      </div>

      {/* Stock Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5">Jewellery Piece</th>
              <th className="px-6 py-3.5">Metal & Category</th>
              <th className="px-6 py-3.5">Vault Status</th>
              <th className="px-6 py-3.5">Quick Stock Adjust</th>
              <th className="px-6 py-3.5 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-10 h-10 relative bg-gray-100 rounded border overflow-hidden flex-shrink-0">
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                  </div>
                  <span className="font-semibold text-gray-900">{product.name}</span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{product.metal} • {product.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                    product.inStock ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <input 
                    type="number"
                    defaultValue={product.inStock ? 5 : 0}
                    onChange={(e) => setStockInputs({ ...stockInputs, [product.id]: parseInt(e.target.value) || 0 })}
                    className="w-20 px-2 py-1 border border-gray-200 rounded text-xs text-center"
                  />
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => handleStockUpdate(product.id, product.inStock ? 5 : 0)}
                    className="px-3 py-1.5 bg-charcoal text-white rounded text-xs hover:bg-gray-800 transition-colors inline-flex items-center space-x-1"
                  >
                    <RefreshCw size={12} />
                    <span>Update</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

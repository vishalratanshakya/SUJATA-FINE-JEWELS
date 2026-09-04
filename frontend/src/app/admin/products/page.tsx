import Link from "next/link";
import { Plus, Search, Edit, Trash2 } from "lucide-react";
import { FEATURED_PRODUCTS } from "@/data/mockData";

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gray-800">Products</h1>
        <Link 
          href="/admin/products/new"
          className="bg-charcoal text-white px-4 py-2 text-sm flex items-center space-x-2 rounded hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          <span>Add Product</span>
        </Link>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
            />
          </div>
          <select className="border border-gray-200 rounded px-4 py-2 text-sm bg-white focus:outline-none focus:border-charcoal">
            <option>All Categories</option>
            <option>Rings</option>
            <option>Necklaces</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Product</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Price</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {FEATURED_PRODUCTS.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-xs text-gray-500 uppercase">{product.metal}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{product.category}</td>
                  <td className="px-6 py-4">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Active</span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link href={`/admin/products/${product.id}`} className="text-gray-400 hover:text-blue-600 transition-colors inline-flex" aria-label={`Edit ${product.name}`}><Edit size={16} /></Link>
                    <button className="text-gray-400 hover:text-red-600 transition-colors"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Eye } from "lucide-react";
import { toast } from "react-hot-toast";

type RealCustomer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
};

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<RealCustomer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/users`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        } else {
          toast.error(data.message || "Failed to fetch customers");
        }
      } catch (error) {
        toast.error("Error fetching customers");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.phone && c.phone.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Customer Directory</h1>
          <p className="text-sm text-gray-500 mt-1">Inspect customer lifetime value, active carts, wishlists, and delivery addresses</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer by name, email or phone..." 
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
          />
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
              <tr>
                <th className="px-6 py-3.5">Customer</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Total Orders</th>
                <th className="px-6 py-3.5 text-right">Lifetime Spend</th>
                <th className="px-6 py-3.5">Joined</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    Loading customers...
                  </td>
                </tr>
              ) : filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust._id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-gray-900">{cust.name}</p>
                      <p className="text-xs text-gray-400">{cust.email} {cust.phone ? `• ${cust.phone}` : ''}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200`}>
                        active
                      </span>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-800">{cust.totalOrders} Orders</td>
                    <td className="px-6 py-4 text-right font-bold text-gray-900">
                      ₹{cust.totalSpent?.toLocaleString('en-IN') || 0}
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(cust.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/admin/customers/${cust._id}`}
                        className="px-3 py-1.5 bg-gray-100 text-gray-800 hover:bg-charcoal hover:text-white rounded text-xs font-medium transition-colors inline-flex items-center space-x-1.5"
                      >
                        <Eye size={14} />
                        <span>View Profile</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


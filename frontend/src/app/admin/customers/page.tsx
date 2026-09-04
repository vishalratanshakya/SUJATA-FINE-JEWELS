import { Search, Mail, Edit } from "lucide-react";

export default function AdminCustomersPage() {
  const mockCustomers = [
    { id: "CUST-001", name: "Sarah Jenkins", email: "sarah.j@example.com", orders: 3, spent: 156000, joined: "2025-11-12" },
    { id: "CUST-002", name: "Michael Chen", email: "m.chen@example.com", orders: 1, spent: 125900, joined: "2026-08-31" },
    { id: "CUST-003", name: "Emma Thompson", email: "emma.t@example.com", orders: 5, spent: 450000, joined: "2024-03-15" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif text-gray-800">Customers</h1>
      </div>

      <div className="bg-white rounded shadow-sm border border-gray-100">
        
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded text-sm focus:outline-none focus:border-charcoal"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700">
              <tr>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Orders</th>
                <th className="px-6 py-3">Total Spent</th>
                <th className="px-6 py-3">Joined</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockCustomers.map((customer) => (
                <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{customer.name}</td>
                  <td className="px-6 py-4">{customer.email}</td>
                  <td className="px-6 py-4">{customer.orders}</td>
                  <td className="px-6 py-4">₹{customer.spent.toLocaleString()}</td>
                  <td className="px-6 py-4">{customer.joined}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-gray-400 hover:text-charcoal transition-colors"><Mail size={16} /></button>
                    <button className="text-gray-400 hover:text-charcoal transition-colors"><Edit size={16} /></button>
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

"use client";

import { useState } from "react";
import { UserCheck, Plus, Shield, Mail, Key } from "lucide-react";
import { toast } from "react-hot-toast";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([
    { id: "u1", name: "Sujata Admin", email: "admin@sujatafinejewels.com", role: "Super Admin", lastActive: "Just now" },
    { id: "u2", name: "Vault Manager", email: "vault@sujatafinejewels.com", role: "Inventory Lead", lastActive: "2 hours ago" },
    { id: "u3", name: "Content Editor", email: "editorial@sujatafinejewels.com", role: "Content Manager", lastActive: "1 day ago" },
  ]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-gray-900">Admin Staff & Role Permissions</h1>
          <p className="text-sm text-gray-500 mt-1">Manage administrative accounts, role access control, and audit security logs</p>
        </div>
        <button 
          onClick={() => toast.success("Invite link copied to clipboard")}
          className="bg-charcoal text-white text-xs font-medium px-4 py-2.5 rounded hover:bg-gray-800 transition-colors inline-flex items-center space-x-2 self-start sm:self-auto"
        >
          <Plus size={16} />
          <span>Add Admin User</span>
        </button>
      </div>

      {/* Admin List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 border-b border-gray-100">
            <tr>
              <th className="px-6 py-3.5">Admin User</th>
              <th className="px-6 py-3.5">Email Address</th>
              <th className="px-6 py-3.5">Access Role</th>
              <th className="px-6 py-3.5">Last Active</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 font-semibold text-gray-900 flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-charcoal text-champagne flex items-center justify-center font-bold text-xs">
                    {u.name.charAt(0)}
                  </div>
                  <span>{u.name}</span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-500">{u.email}</td>
                <td className="px-6 py-4">
                  <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-semibold">
                    {u.role}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-gray-400">{u.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-xs font-semibold text-gray-600 hover:text-charcoal">Edit Access</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

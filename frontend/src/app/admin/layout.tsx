"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Search, Bell, ShieldCheck, Menu } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === "/admin/login";

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isAdminLogin) {
    return <div className="min-h-screen bg-[#0F0E0D]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex font-sans">
      {/* Sidebar - Responsive Drawer */}
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen w-full min-w-0">
        {/* Top Header */}
        <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-200/80 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-40">
          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Open navigation sidebar"
            >
              <Menu size={22} />
            </button>

            <h2 className="font-serif text-lg sm:text-xl text-gray-900 font-semibold tracking-wide truncate">
              Admin Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-6">
            {/* Global Quick Search */}
            <div className="relative hidden md:block w-64 lg:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Global search orders, products..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50/80 border border-gray-200 rounded-full text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-charcoal focus:bg-white transition-all"
              />
            </div>

            {/* Notification Icon */}
            <button className="relative p-2 text-gray-500 hover:text-charcoal hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white"></span>
            </button>

            <div className="h-6 w-[1px] bg-gray-200 hidden sm:block"></div>

            {/* Profile Dropdown Badge */}
            <Link href="/admin/users" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 bg-charcoal text-champagne rounded-full flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-champagne/30 group-hover:ring-champagne transition-all">
                AD
              </div>
              <div className="hidden md:block text-left">
                <p className="text-xs font-semibold text-gray-900 leading-tight">Super Admin</p>
                <p className="text-[10px] text-gray-400 flex items-center mt-0.5">
                  <ShieldCheck size={10} className="mr-0.5 text-emerald-600" /> Authorized
                </p>
              </div>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">{children}</main>
      </div>
    </div>
  );
}


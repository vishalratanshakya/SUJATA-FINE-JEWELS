"use client";

import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminLogin = pathname === "/admin/login";

  if (isAdminLogin) {
    return <div className="min-h-screen bg-[#0F0E0D]">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - fixed */}
      <AdminSidebar />
      
      {/* Main Content Area - padded left to account for fixed sidebar */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <h2 className="font-serif text-xl text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-charcoal rounded-full flex items-center justify-center text-white text-xs">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
        
      </div>
    </div>
  );
}

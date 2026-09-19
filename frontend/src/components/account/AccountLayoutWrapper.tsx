"use client";

import React from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export function AccountLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <div className="bg-[#FAF8F5] pt-24 lg:pt-36 pb-20 min-h-screen text-[#2C2825]">
        <div className="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <AccountSidebar />
            <main className="flex-1 w-full min-w-0 space-y-6">{children}</main>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

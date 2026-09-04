"use client";

import React from "react";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export function AccountLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#FAF8F5] pt-28 pb-20 min-h-screen text-[#2C2825]">
      <div className="max-w-[1460px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <AccountSidebar />
          <main className="flex-1 w-full min-w-0 space-y-8">{children}</main>
        </div>
      </div>
    </div>
  );
}

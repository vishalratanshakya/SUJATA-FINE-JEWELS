


"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { AnnouncementBarBanner } from "@/components/layout";

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  if (isAuthPage) {
    return <main className="min-h-screen bg-[#F7F4EF]">{children}</main>;
  }

  const isAccountPage = pathname?.startsWith("/account");

  return (
    <>
      <AnnouncementBarBanner />
      <Navbar />
      <main className="flex-1 flex flex-col min-h-screen">
        {children}
      </main>
      {!isAccountPage && <Footer />}
    </>
  );
}

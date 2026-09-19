


"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";
import { AnnouncementBarBanner } from "@/components/layout";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

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

  useEffect(() => {
    if (isAuthPage) return;

    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const socket = io(backendUrl, { withCredentials: true });

    socket.on("new_product", (data) => {
      toast.success(data.message || "A new product was just added!", {
        duration: 5000,
        position: "top-center",
        icon: "✨",
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [isAuthPage]);

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

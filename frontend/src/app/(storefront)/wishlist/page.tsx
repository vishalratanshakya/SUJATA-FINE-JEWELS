"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/account/wishlist");
  }, [router]);

  return <div className="min-h-screen bg-ivory pt-32 pb-20 animate-pulse" />;
}


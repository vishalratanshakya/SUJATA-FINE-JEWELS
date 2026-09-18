"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function MobileNav() {
  return (
    <Link 
      href="/menu"
      aria-label="Open Menu" 
      className="lg:hidden hover:text-champagne transition-colors"
    >
      <Menu size={24} strokeWidth={1} />
    </Link>
  );
}

"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { useState } from "react";
import { useStore } from "@/store/useStore";

export function AnnouncementBarBanner() {
  const announcementBar = useStore((s) => s.announcementBar);
  const [dismissed, setDismissed] = useState(false);

  if (!announcementBar.active || dismissed) return null;

  return (
    <div
      className="relative w-full py-2 px-4 text-center text-sm flex items-center justify-center gap-3"
      style={{
        backgroundColor: announcementBar.bgColor,
        color: announcementBar.textColor,
      }}
    >
      <span>{announcementBar.message}</span>
      {announcementBar.linkText && announcementBar.linkUrl && (
        <Link
          href={announcementBar.linkUrl}
          className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
          style={{ color: announcementBar.textColor }}
        >
          {announcementBar.linkText}
        </Link>
      )}
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 transition-opacity"
        aria-label="Dismiss announcement"
      >
        <X size={14} />
      </button>
    </div>
  );
}

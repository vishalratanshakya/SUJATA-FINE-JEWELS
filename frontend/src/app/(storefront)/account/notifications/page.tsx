"use client";

import { useState } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Bell, Package, Tag, CheckCheck } from "lucide-react";
import { toast } from "react-hot-toast";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("ALL");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: "ORDERS",
      title: "Order Delivered",
      message: "Your Celestial Drop Pendant (#SJ10018) has been delivered successfully.",
      time: "2 hours ago",
      date: "12 May, 2026",
      read: false,
      link: "/account/orders/SJ10018",
    },
    {
      id: 2,
      category: "ORDERS",
      title: "Order Under Inspection",
      message: "Your Luxe Solitaire Ring (#SJ10016) is currently undergoing diamond clarity inspection.",
      time: "1 day ago",
      date: "01 May, 2026",
      read: false,
      link: "/account/orders/SJ10016",
    },
    {
      id: 3,
      category: "OFFERS",
      title: "Exclusive VIP Exchange Bonus",
      message: "Enjoy a 10% bonus valuation on old 18K Gold jewelry exchange this week.",
      time: "3 days ago",
      date: "20 Apr, 2026",
      read: true,
      link: "/shop",
    },
    {
      id: 4,
      category: "ACCOUNT",
      title: "Profile Information Updated",
      message: "Your phone number was updated from your account settings.",
      time: "1 week ago",
      date: "10 Apr, 2026",
      read: true,
      link: "/account/settings",
    },
  ]);

  const filtered = notifications.filter(
    (n) => filter === "ALL" || n.category === filter
  );

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <AccountLayoutWrapper>
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-xs space-y-6">
        
        {/* Header */}
        <div className="flex flex-row items-start sm:items-center justify-between gap-4 border-b border-[#F2EDE4] pb-6">
          <div className="flex-1">
            <h1 className="font-serif text-2xl sm:text-3xl text-[#2C2825]">Notifications</h1>
            <p className="text-[10px] sm:text-xs text-[#8C8275] tracking-wider uppercase mt-1">
              Stay updated on your orders, offers, and account activity.
            </p>
          </div>
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-colors flex-shrink-0 mt-1 sm:mt-0"
          >
            <CheckCheck size={14} />
            <span className="hidden sm:inline">MARK ALL AS READ</span>
            <span className="sm:hidden">MARK READ</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {["ALL", "ORDERS", "OFFERS", "ACCOUNT"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-[#2C2825] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#6B6357] hover:bg-[#F5EFE6] border border-[#EAE4D9]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3 pt-2">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 block ${
                !item.read
                  ? "bg-[#FDFBF7] border-[#B38E5D]/40 shadow-2xs"
                  : "bg-[#FAF8F5] border-[#EAE4D9] hover:border-[#2C2825]"
              }`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    !item.read ? "bg-[#B38E5D] text-white" : "bg-[#EAE4D9] text-[#6B6357]"
                  }`}
                >
                  <Bell size={18} />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-serif text-base font-medium text-[#2C2825]">{item.title}</h4>
                    {!item.read && (
                      <span className="w-2 h-2 rounded-full bg-[#B38E5D]" title="Unread" />
                    )}
                  </div>
                  <p className="text-xs text-[#6B6357] leading-relaxed">{item.message}</p>
                  <p className="text-[11px] text-[#8C8275]">{item.time} • {item.date}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

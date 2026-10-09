"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AccountLayoutWrapper } from "@/components/account/AccountLayoutWrapper";
import { Bell, CheckCheck, RefreshCw, BellOff } from "lucide-react";
import { toast } from "react-hot-toast";

export default function NotificationsPage() {
  const [filter, setFilter] = useState("ALL");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const token = localStorage.getItem("token");
        const res = await fetch(`${backendUrl}/api/notifications/my-notifications`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.data || []);
        }
      } catch (err) {
        console.error("Failed to fetch notifications", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  const filtered = notifications.filter(
    (n) => filter === "ALL" || (n.type || "ORDER").toUpperCase() === filter
  );

  const handleMarkAllRead = async () => {
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      await fetch(`${backendUrl}/api/notifications/read-all`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error("Failed to mark all as read");
    }
  };

  const handleNotificationClick = async (id: string, isRead: boolean) => {
    if (isRead) return;
    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const token = localStorage.getItem("token");
      await fetch(`${backendUrl}/api/notifications/${id}/read`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
    } catch (err) {
      console.error("Failed to mark as read", err);
    }
  };

  const getTimeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 24) return `${hours || 1} hours ago`;
    return `${Math.floor(hours / 24)} days ago`;
  };

  const getFormatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit", month: "short", year: "numeric"
    });
  };

  const getNotificationLink = (n: any) => {
    if (n.type === "ORDER") {
      // Extract order ID if possible, otherwise just link to orders
      const orderIdMatch = n.message.match(/ORD-\d+/);
      if (orderIdMatch) {
        // Wait, the notification only has orderId like ORD-123. The orders page needs MongoDB _id.
        // For simplicity, just link to the main orders page. The user can find it there.
        return "/account/orders";
      }
      return "/account/orders";
    }
    if (n.type === "ACCOUNT") return "/account/settings";
    return "/account";
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
            disabled={notifications.length === 0}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-[#E2DDD3] hover:border-[#2C2825] text-[#2C2825] text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-lg sm:rounded-xl transition-colors flex-shrink-0 mt-1 sm:mt-0 disabled:opacity-50"
          >
            <CheckCheck size={14} />
            <span className="hidden sm:inline">MARK ALL AS READ</span>
            <span className="sm:hidden">MARK READ</span>
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar">
          {["ALL", "ORDER", "OFFERS", "ACCOUNT"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors whitespace-nowrap ${
                filter === f
                  ? "bg-[#2C2825] text-white shadow-xs"
                  : "bg-[#FAF8F5] text-[#6B6357] hover:bg-[#F5EFE6] border border-[#EAE4D9]"
              }`}
            >
              {f === "ORDER" ? "ORDERS" : f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3 pt-2">
          {loading ? (
            <div className="py-12 flex justify-center text-[#8C8275]">
              <RefreshCw size={20} className="animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-[#8C8275] flex flex-col items-center">
              <BellOff size={32} className="mb-3 opacity-30" />
              <p className="text-sm">No notifications found.</p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <Link
                key={item._id || item.id || `notif-${index}`}
                href={getNotificationLink(item)}
                onClick={() => handleNotificationClick(item._id || item.id, item.isRead)}
                className={`p-5 rounded-2xl border transition-all flex items-start justify-between gap-4 ${
                  !item.isRead
                    ? "bg-[#FDFBF7] border-[#B38E5D]/40 shadow-2xs"
                    : "bg-[#FAF8F5] border-[#EAE4D9] hover:border-[#2C2825]"
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      !item.isRead ? "bg-[#B38E5D] text-white" : "bg-[#EAE4D9] text-[#6B6357]"
                    }`}
                  >
                    <Bell size={18} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-serif text-base font-medium text-[#2C2825]">{item.title}</h4>
                      {!item.isRead && (
                        <span className="w-2 h-2 rounded-full bg-[#B38E5D]" title="Unread" />
                      )}
                    </div>
                    <p className="text-xs text-[#6B6357] leading-relaxed">{item.message}</p>
                    <p className="text-[11px] text-[#8C8275]">{getTimeAgo(item.createdAt)} • {getFormatDate(item.createdAt)}</p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

      </div>
    </AccountLayoutWrapper>
  );
}

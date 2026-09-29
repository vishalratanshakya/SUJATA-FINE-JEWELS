"use client";

import Link from "next/link";
import { Flame, Box, FolderKanban, Sparkles, BookOpen, Camera, Layers, ArrowRight, Gift, Film, MessageSquare } from "lucide-react";
import { useStore } from "@/store/useStore";
import { useEffect, useState } from "react";

export default function AdminSectionsHubPage() {
  const deals = useStore((s) => s.deals);
  const experiences = useStore((s) => s.experiences3D);
  const occasions = useStore((s) => s.occasions);
  const aiItems = useStore((s) => s.aiStylistItems);
  const articles = useStore((s) => s.journalArticles);
  const posts = useStore((s) => s.featuredMediaItems);
  const accordions = useStore((s) => s.productAccordions);
  const [bridalCount, setBridalCount] = useState({ total: 0, active: 0 });
  const [giftingCount, setGiftingCount] = useState({ total: 0, active: 0 });
  const [craftCount, setCraftCount] = useState({ total: 0, active: 0 });
  const [reviewCount, setReviewCount] = useState({ total: 0, active: 0 });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/bridal-collections`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setBridalCount({
            total: data.data.length,
            active: data.data.filter((d: any) => d.isActive).length
          });
        }
      })
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/gifting-collections`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGiftingCount({
            total: data.data.length,
            active: data.data.filter((d: any) => d.isActive).length
          });
        }
      })
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/craft-stories`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setCraftCount({
            total: data.data.length,
            active: data.data.filter((d: any) => d.isActive).length
          });
        }
      })
      .catch(console.error);

    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/reviews`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setReviewCount({
            total: data.data.length,
            active: data.data.filter((d: any) => d.isApproved).length
          });
        }
      })
      .catch(console.error);
  }, []);

  const sections = [
    {
      title: "Bridal & Wedding",
      description: "Manage luxury bridal collections on storefront",
      href: "/admin/sections/bridal-collection",
      icon: Sparkles,
      color: "text-rose-600 bg-rose-50 border-rose-100",
      count: bridalCount.total,
      activeCount: bridalCount.active
    },
    {
      title: "Luxury Gifting Studio",
      description: "Curated gift collections by occasion",
      href: "/admin/sections/gifting-studio",
      icon: Gift,
      color: "text-amber-600 bg-amber-50 border-amber-100",
      count: giftingCount.total,
      activeCount: giftingCount.active
    },
    {
      title: "Behind the Craft",
      description: "Manage videos and stories of jewelry making",
      href: "/admin/sections/behind-the-craft",
      icon: Film,
      color: "text-indigo-600 bg-indigo-50 border-indigo-100",
      count: craftCount.total,
      activeCount: craftCount.active
    },
    {
      title: "Verified Reviews",
      description: "Manage customer testimonials and approvals",
      href: "/admin/sections/reviews",
      icon: MessageSquare,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      count: reviewCount.total,
      activeCount: reviewCount.active
    },
    {
      title: "Deal of the Day",
      description: "Flash sales, price cuts, and countdown timers",
      href: "/admin/sections/deal-of-the-day",
      icon: Flame,
      color: "text-red-500 bg-red-50 border-red-100",
      count: deals.length,
      activeCount: deals.filter(d => d.active).length
    },
    {
      title: "3D Jewellery Experience",
      description: "Interactive 360° GLTF viewers and metal selectors",
      href: "/admin/sections/experience-3d",
      icon: Box,
      color: "text-amber-700 bg-amber-50 border-amber-100",
      count: experiences.length,
      activeCount: experiences.filter(e => e.active).length
    },
    {
      title: "Shop by Occasion",
      description: "Curated theme collection cards (Bridal, Everyday)",
      href: "/admin/sections/shop-by-occasion",
      icon: FolderKanban,
      color: "text-blue-600 bg-blue-50 border-blue-100",
      count: occasions.length,
      activeCount: occasions.length
    },
    {
      title: "AI Stylist",
      description: "Recommendation prompts and quiz CTA banners",
      href: "/admin/sections/ai-stylist",
      icon: Sparkles,
      color: "text-purple-600 bg-purple-50 border-purple-100",
      count: aiItems.length,
      activeCount: aiItems.filter(a => a.active).length
    },
    {
      title: "From the Journal",
      description: "Editorial blog articles and care guides",
      href: "/admin/sections/journal",
      icon: BookOpen,
      color: "text-emerald-600 bg-emerald-50 border-emerald-100",
      count: articles.length,
      activeCount: articles.filter(a => a.active).length
    },

    {
      title: "Product Accordions",
      description: "Product page specification & policy tabs",
      href: "/admin/sections/accordions",
      icon: Layers,
      color: "text-gray-700 bg-gray-100 border-gray-200",
      count: accordions.length,
      activeCount: accordions.filter(a => a.active).length
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-serif text-gray-900">Homepage Sections Hub</h1>
        <p className="text-sm text-gray-500 mt-1">Select a dedicated section page below to manage items, active statuses, and live previews</p>
      </div>

      {/* Grid of 7 Dedicated Section Hub Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sections.map((sec) => {
          const Icon = sec.icon;
          return (
            <Link
              key={sec.title}
              href={sec.href}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:border-gray-300 hover:shadow-md transition-all flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${sec.color}`}>
                    <Icon size={24} />
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                    {sec.activeCount} Active / {sec.count} Total
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-lg text-gray-900 font-medium group-hover:text-amber-800 transition-colors">{sec.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{sec.description}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-medium text-amber-800 group-hover:underline">
                <span>Manage Section &rarr;</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

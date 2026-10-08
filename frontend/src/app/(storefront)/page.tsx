import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { SignatureProductCarousel } from "@/components/home/SignatureProductCarousel";
import { DealOfTheDay } from "@/components/home/DealOfTheDay";

import dynamic from "next/dynamic";

const Bestsellers = dynamic(() => import("@/components/home/Bestsellers").then(mod => mod.Bestsellers));
const FeaturedCollection = dynamic(() => import("@/components/home/FeaturedCollection").then(mod => mod.FeaturedCollection));
const ExploreCollection = dynamic(() => import("@/components/home/ExploreCollection").then(mod => mod.ExploreCollection));
const BridalCollectionSection = dynamic(() => import("@/components/home/BridalCollectionSection").then(mod => mod.BridalCollectionSection));
const TrendingInSocietySection = dynamic(() => import("@/components/home/TrendingInSocietySection").then(mod => mod.TrendingInSocietySection));
const CuratedHeritageSection = dynamic(() => import("@/components/home/CuratedHeritageSection").then(mod => mod.CuratedHeritageSection));
const GiftingStudioSection = dynamic(() => import("@/components/home/GiftingStudioSection").then(mod => mod.GiftingStudioSection));
const CustomerReviewsSection = dynamic(() => import("@/components/home/CustomerReviewsSection").then(mod => mod.CustomerReviewsSection));
const ShopByOccasionSection = dynamic(() => import("@/components/home/ShopByOccasion").then(mod => mod.ShopByOccasionSection));

export default async function Home() {
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  let initialBanners = [];
  try {
    const res = await fetch(`${backendUrl}/api/hero-banners`, { next: { revalidate: 60 } });
    if (res.ok) {
      const data = await res.json();
      initialBanners = data.data || [];
    }
  } catch (err) {
    console.error("Failed to fetch initial hero banners:", err);
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Hero initialBanners={initialBanners} />
      <ShopByCategory />
      <Bestsellers />
      <FeaturedCollection />
      <ExploreCollection />
      <ShopByOccasionSection />
      <BridalCollectionSection />
      <TrendingInSocietySection />
      <CuratedHeritageSection />
      <SignatureProductCarousel />
      <DealOfTheDay />
      <GiftingStudioSection />
      <CustomerReviewsSection />
    </div>
  );
}

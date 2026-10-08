import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { SignatureProductCarousel } from "@/components/home/SignatureProductCarousel";
import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { Bestsellers } from "@/components/home/Bestsellers";

import { ExploreCollection } from "@/components/home/ExploreCollection";
import { BridalCollectionSection } from "@/components/home/BridalCollectionSection";
import { TrendingInSocietySection } from "@/components/home/TrendingInSocietySection";
import { CuratedHeritageSection } from "@/components/home/CuratedHeritageSection";
import { GiftingStudioSection } from "@/components/home/GiftingStudioSection";
import { BehindTheCraftSection } from "@/components/home/BehindTheCraftSection";
import { CustomerReviewsSection } from "@/components/home/CustomerReviewsSection";
import { ShopByOccasionSection } from "@/components/home/ShopByOccasion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
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
      <BehindTheCraftSection />
      <CustomerReviewsSection />
    </div>
  );
}

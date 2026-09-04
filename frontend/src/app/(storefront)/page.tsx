import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { CraftsmanshipSection } from "@/components/home/CraftsmanshipSection";
import { SignatureProductCarousel } from "@/components/home/SignatureProductCarousel";
import { ThreeDJewelleryExperience } from "@/components/home/ThreeDJewelleryExperience";
import { AIStylistSection } from "@/components/home/AIStylistSection";
import { Bestsellers } from "@/components/home/Bestsellers";
import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { BlogSection } from "@/components/home/BlogSection";
import { Community } from "@/components/home/Community";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ShopByCategory />
      <Bestsellers />
      <FeaturedCollection />
      <CraftsmanshipSection />
      <SignatureProductCarousel />
      <ThreeDJewelleryExperience />
      <DealOfTheDay />
      <ShopByOccasion />
      <AIStylistSection />
      <BlogSection />
      <Community />
    </div>
  );
}

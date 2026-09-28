import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { FeaturedCollection } from "@/components/home/FeaturedCollection";
import { SignatureProductCarousel } from "@/components/home/SignatureProductCarousel";
import { DealOfTheDay } from "@/components/home/DealOfTheDay";
import { Bestsellers } from "@/components/home/Bestsellers";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ShopByCategory />
      <Bestsellers />
      <FeaturedCollection />
      <SignatureProductCarousel />
      <DealOfTheDay />
    </div>
  );
}

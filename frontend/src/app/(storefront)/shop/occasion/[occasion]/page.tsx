export const dynamic = 'force-dynamic';

import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";
import { connectToDatabase } from "@/lib/db";
import { CategoryBannerModel } from "@/models/CategoryBanner";

export default async function OccasionPage({ params }: { params: Promise<{ occasion: string }> }) {
  const resolvedParams = await params;
  const occasion = resolvedParams.occasion || "";
  
  const formattedOccasion = occasion ? occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ') : "Occasion";

  let banner = null;
  try {
    await connectToDatabase();
    banner = await CategoryBannerModel.findOne({ targetSlug: occasion.toLowerCase().trim() });
  } catch (error) {
    console.error("Failed to fetch occasion banner", error);
  }

  // Override with database banner if it exists
  const finalBannerImage = banner?.bannerImage || '/images/products/rings/ring_placeholder.jpg';
  const finalBannerVideo = banner?.bannerVideo || "";
  const finalTitle = banner?.title || `${formattedOccasion} Collection`;
  const finalDescription = banner?.description || `Discover our beautifully crafted pieces perfect for your ${formattedOccasion.toLowerCase()}.`;
  const finalEyebrow = banner?.eyebrow || "";

  return (
    <ProductListingTemplate
      title={finalTitle}
      eyebrow={finalEyebrow}
      description={finalDescription}
      bannerImage={finalBannerImage}
      bannerVideo={finalBannerVideo}
      filterType="all"
    />
  );
}

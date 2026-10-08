export const dynamic = 'force-dynamic';

import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";
import { connectToDatabase } from "@/lib/db";
import { CategoryBannerModel } from "@/models/CategoryBanner";

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const resolvedParams = await params;
  const category = resolvedParams.category || "";
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ') : "Catalogue";

  let banner = null;
  try {
    await connectToDatabase();
    banner = await CategoryBannerModel.findOne({ targetSlug: category.toLowerCase().trim() });
  } catch (error) {
    console.error("Failed to fetch category banner", error);
  }

  const categoryLower = category.toLowerCase().trim();
  
  // Default fallbacks
  let bannerImage = '/images/products/rings/ring_placeholder.jpg';
  if (categoryLower === 'necklaces') {
    bannerImage = '/images/products/necklaces/necklace_placeholder.jpg';
  } else if (categoryLower === 'earrings') {
    bannerImage = '/images/products/earrings/earrings_placeholder.jpg';
  } else if (categoryLower === 'bracelets') {
    bannerImage = '/images/products/bracelets/bracelet_placeholder.jpg';
  } else if (categoryLower === 'bangles') {
    bannerImage = '/images/products/bangles/bangle_placeholder.jpg';
  } else if (categoryLower === 'pendants') {
    bannerImage = '/images/products/pendants/pendant_placeholder.jpg';
  }

  // Override with database banner if it exists
  const finalBannerImage = banner?.bannerImage || bannerImage;
  const finalBannerVideo = banner?.bannerVideo || "";
  const finalTitle = banner?.title || formattedCategory;
  const finalDescription = banner?.description || `Discover our curated selection of ${formattedCategory.toLowerCase()}, crafted to elevate your everyday elegance.`;
  const finalEyebrow = banner?.eyebrow || "";

  return (
    <ProductListingTemplate
      title={finalTitle}
      eyebrow={finalEyebrow}
      description={finalDescription}
      bannerImage={finalBannerImage}
      bannerVideo={finalBannerVideo}
      categoryFilter={category}
      filterType="all"
    />
  );
}

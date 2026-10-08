export const dynamic = 'force-dynamic';
import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";
import { getProducts } from "@/lib/getProducts";
import { connectToDatabase } from "@/lib/db";
import { CategoryBannerModel } from "@/models/CategoryBanner";

export default async function CataloguePage() {
  const initialProducts = await getProducts();
  
  let settings = null;
  try {
    await connectToDatabase();
    settings = await CategoryBannerModel.findOne({ targetSlug: "catalogue" });
  } catch (error) {
    console.error("Failed to fetch catalogue settings", error);
  }

  const eyebrow = settings?.eyebrow || "THE FINEST. FOR FOREVER.";
  const title = settings?.title || "CATALOGUE";
  const description = settings?.description || "Explore our complete collection of exquisite, handcrafted fine jewellery. Timeless designs crafted for every moment.";
  const bannerImage = settings?.bannerImage || "/images/products/rings/ring_placeholder.jpg";
  const bannerVideo = settings?.bannerVideo || "";

  return (
    <ProductListingTemplate
      title={title}
      eyebrow={eyebrow}
      description={description}
      filterType="all"
      bannerImage={bannerImage}
      bannerVideo={bannerVideo}
      initialProducts={initialProducts}
    />
  );
}

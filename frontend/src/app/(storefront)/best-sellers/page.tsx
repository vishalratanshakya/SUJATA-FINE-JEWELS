"use client";

import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";

export default function BestSellersPage() {
  return (
    <ProductListingTemplate
      title="BEST SELLERS"
      eyebrow="MOST BELOVED"
      description="Discover the jewellery our customers love most. Iconically styled pieces that define SUJATA Fine Jewels."
      filterType="best_sellers"
      bannerImage="/images/products/earrings/earrings_placeholder.jpg"
      emptyTitle="OUR BEST SELLERS ARE COMING SOON"
      emptyDescription="Explore our collection while we curate the pieces our customers love most."
    />
  );
}

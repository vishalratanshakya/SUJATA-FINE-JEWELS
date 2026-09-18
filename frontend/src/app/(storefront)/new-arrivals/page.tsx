"use client";

import { ProductListingTemplate } from "@/components/shop/ProductListingTemplate";

export default function NewArrivalsPage() {
  return (
    <ProductListingTemplate
      title="NEW ARRIVALS"
      eyebrow="FRESH CREATIONS"
      description="Discover the latest additions to the SUJATA Fine Jewels collection. Handcrafted perfection, newly introduced for you."
      filterType="new_arrivals"
      bannerImage="/images/products/necklaces/necklace_placeholder.jpg"
      emptyTitle="NEW ARRIVALS COMING SOON"
      emptyDescription="Discover our latest creations soon. Explore our master collection in the meantime."
    />
  );
}

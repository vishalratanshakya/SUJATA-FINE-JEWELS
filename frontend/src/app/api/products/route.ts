import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";


export async function GET() {
  try {
    await connectToDatabase();
    let products = await ProductModel.find({}).sort({ createdAt: -1 });


    return NextResponse.json({ success: true, products });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const id = body.id || `prod-${Date.now()}`;
    let slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    
    // Ensure slug is unique
    const existing = await ProductModel.findOne({ slug, id: { $ne: id } });
    if (existing) {
      slug = `${slug}-${Date.now()}`;
    }

    const productPayload = {
      ...body,
      id,
      slug,
      name: body.name,
      category: body.category || "Rings",
      price: Number(body.price) || 0,
      originalPrice: Number(body.originalPrice) || Number(body.price) || 0,
      discountPercentage: Number(body.discountPercentage) || 0,
      rating: Number(body.rating) || 5,
      images: body.images && body.images.length > 0 ? body.images : (body.videoUrl ? [] : [body.primaryImage || "/images/products/rings/ring_placeholder.jpg"]),
      primaryImage: body.primaryImage,
      hoverImage: body.hoverImage,
      galleryImages: body.galleryImages,
      videoUrl: body.videoUrl,
      model3DUrl: body.model3DUrl,
      metal: body.metal || "18K Gold",
      stone: body.stone || "Diamond",
      isNewArrival: Boolean(body.isNewArrival),
      isBestseller: Boolean(body.isBestseller || body.isBestSeller),
      isFeatured: Boolean(body.isFeatured),
      isExploreCollection: Boolean(body.isExploreCollection),
      isSignatureCarousel: Boolean(body.isSignatureCarousel),
      isBridalWedding: Boolean(body.isBridalWedding),
      isTrendingSociety: Boolean(body.isTrendingSociety),
      isLuxuryGifting: Boolean(body.isLuxuryGifting),
      isBehindTheCraft: Boolean(body.isBehindTheCraft),
      isVerifiedReviews: Boolean(body.isVerifiedReviews),
      isDealOfTheDay: Boolean(body.isDealOfTheDay),
      isShopByOccasion: Boolean(body.isShopByOccasion),
      isCuratedHeritage: Boolean(body.isCuratedHeritage),
      stock: body.stock ?? 10,
      description: body.description || `${body.name} - Handcrafted fine jewellery creation by SUJATA Fine Jewels.`,
    };

    const product = await ProductModel.findOneAndUpdate(
      { id },
      { $set: productPayload },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`Successfully saved product "${product.name}" (${product.id}) to MongoDB Atlas!`);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/products error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

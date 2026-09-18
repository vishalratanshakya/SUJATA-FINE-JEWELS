import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { FEATURED_PRODUCTS } from "@/data/mockData";

export async function GET() {
  try {
    await connectToDatabase();
    let products = await ProductModel.find({}).sort({ createdAt: -1 });

    if (products.length === 0) {
      console.log("No products found in MongoDB Atlas. Auto-seeding initial products...");
      products = await ProductModel.insertMany(
        FEATURED_PRODUCTS.map((p) => ({
          ...p,
          description: `${p.name} - Handcrafted fine jewellery creation by SUJATA Fine Jewels.`,
        }))
      );
    }

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
    const slug = body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const productPayload = {
      id,
      slug,
      name: body.name,
      category: body.category || "Rings",
      price: Number(body.price) || 0,
      originalPrice: Number(body.originalPrice) || Number(body.price) || 0,
      images: body.images && body.images.length > 0 ? body.images : [body.primaryImage || "/images/products/rings/ring_placeholder.jpg"],
      primaryImage: body.primaryImage,
      hoverImage: body.hoverImage,
      metal: body.metal || "18K Gold",
      stone: body.stone || "Diamond",
      isNewArrival: Boolean(body.isNewArrival),
      isBestseller: Boolean(body.isBestseller || body.isBestSeller),
      stock: body.stock ?? 10,
      description: body.description || `${body.name} - Handcrafted fine jewellery creation by SUJATA Fine Jewels.`,
    };

    const product = await ProductModel.findOneAndUpdate(
      { $or: [{ id }, { slug }] },
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

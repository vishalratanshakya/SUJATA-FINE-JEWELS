import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";
import { cache } from "react";

export const getProducts = cache(async () => {
  try {
    await connectToDatabase();
    const productsDocs = await ProductModel.find({}).sort({ createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(productsDocs));
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
});

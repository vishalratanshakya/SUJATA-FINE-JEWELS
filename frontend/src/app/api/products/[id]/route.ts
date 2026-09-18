import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ProductModel } from "@/models/Product";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await props.params;
    const id = params.id;
    const body = await req.json();

    const updatedProduct = await ProductModel.findOneAndUpdate(
      { $or: [{ id }, { slug: id }] },
      { $set: body },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, product: updatedProduct });
  } catch (error: any) {
    console.error("Error updating product in MongoDB:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, props: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const params = await props.params;
    const id = params.id;

    await ProductModel.deleteOne({ $or: [{ id }, { slug: id }] });

    return NextResponse.json({ success: true, message: "Product deleted from database" });
  } catch (error: any) {
    console.error("Error deleting product from MongoDB:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

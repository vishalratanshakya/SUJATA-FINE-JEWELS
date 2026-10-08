import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CategoryBannerModel } from "@/models/CategoryBanner";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const banner = await CategoryBannerModel.findById(resolvedParams.id);
    if (!banner) {
      return NextResponse.json({ success: false, message: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, banner });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const data = await req.json();

    const banner = await CategoryBannerModel.findByIdAndUpdate(resolvedParams.id, data, { new: true, runValidators: true });
    if (!banner) {
      return NextResponse.json({ success: false, message: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, banner });
  } catch (error: any) {
    if (error.code === 11000) {
        return NextResponse.json({ success: false, message: "A banner for this category/occasion already exists" }, { status: 400 });
    }
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectToDatabase();
    const resolvedParams = await params;
    const banner = await CategoryBannerModel.findByIdAndDelete(resolvedParams.id);
    if (!banner) {
      return NextResponse.json({ success: false, message: "Banner not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, message: "Banner deleted" });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

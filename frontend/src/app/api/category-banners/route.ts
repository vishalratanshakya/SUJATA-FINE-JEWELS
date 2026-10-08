import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CategoryBannerModel } from "@/models/CategoryBanner";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const url = new URL(req.url);
    const targetSlug = url.searchParams.get("targetSlug");
    
    let query = {};
    if (targetSlug) {
      query = { targetSlug };
    }

    const banners = await CategoryBannerModel.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, banners });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const data = await req.json();

    if (!data.name || !data.targetSlug) {
      return NextResponse.json({ success: false, message: "Name and Target Slug are required" }, { status: 400 });
    }

    // Update or create
    const banner = await CategoryBannerModel.findOneAndUpdate(
      { targetSlug: data.targetSlug },
      { $set: data },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    return NextResponse.json({ success: true, banner }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

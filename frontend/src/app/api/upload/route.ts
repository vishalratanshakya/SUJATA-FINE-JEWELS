import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "daowawj5g",
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "342534421275915",
  api_secret: process.env.CLOUDINARY_API_SECRET || "MogaOblpPUwIA6xd7eJXXRUg3RY",
  secure: true,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const dataUrlStr = formData.get("dataUrl") as string | null;

    if (!file && !dataUrlStr) {
      return NextResponse.json({ success: false, error: "No file or data provided" }, { status: 400 });
    }

    let fileToUpload = dataUrlStr;

    if (file && !fileToUpload) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const mimeType = file.type || "image/jpeg";
      fileToUpload = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    if (!fileToUpload) {
      return NextResponse.json({ success: false, error: "Invalid file content" }, { status: 400 });
    }

    const uploadResponse = await cloudinary.uploader.upload(fileToUpload, {
      folder: "sujata_fine_jewels/products",
      resource_type: "auto",
    });

    return NextResponse.json({
      success: true,
      url: uploadResponse.secure_url,
      public_id: uploadResponse.public_id,
    });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to upload to Cloudinary" }, { status: 500 });
  }
}

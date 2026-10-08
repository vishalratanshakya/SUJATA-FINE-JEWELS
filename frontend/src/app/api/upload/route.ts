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

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const isVideo = file.type.startsWith('video/') || file.name?.match(/\.(mp4|webm|mov)$/i);
      const rType = isVideo ? "video" : "auto";
      
      return new Promise<Response>((resolve, reject) => {
        cloudinary.uploader.unsigned_upload_stream(
          "Sujata Fine Jewels",
          { folder: "Sujata Fine Jewels", resource_type: rType, chunk_size: 6000000 },
          (error, result) => {
            if (error) {
              resolve(NextResponse.json({ success: false, error: error.message }, { status: 500 }));
            } else {
              resolve(NextResponse.json({
                success: true,
                url: result?.secure_url,
                public_id: result?.public_id,
              }));
            }
          }
        ).end(buffer);
      });
    }

    // Fallback for dataUrlStr
    if (dataUrlStr) {
      const uploadResponse = await cloudinary.uploader.unsigned_upload(dataUrlStr, "Sujata Fine Jewels", {
        folder: "Sujata Fine Jewels",
        resource_type: "auto",
      });

      return NextResponse.json({
        success: true,
        url: uploadResponse.secure_url,
        public_id: uploadResponse.public_id,
      });
    }

    return NextResponse.json({ success: false, error: "Invalid file content" }, { status: 400 });
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message || "Failed to upload to Cloudinary" }, { status: 500 });
  }
}

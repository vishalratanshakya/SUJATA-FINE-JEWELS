import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CertificateModel } from "@/models/Certificate";

export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const certificates = await CertificateModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, certificates });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const cert = await CertificateModel.create({
      certId: body.certId || `SJ-CERT-000${Date.now().toString().slice(-3)}`,
      ...body,
    });

    return NextResponse.json({ success: true, certificate: cert }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

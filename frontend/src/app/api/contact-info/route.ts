import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ContactInfo } from '@/models/ContactInfo';

export async function GET() {
  try {
    await connectToDatabase();
    let info = await ContactInfo.findOne({});
    if (!info) {
      info = await ContactInfo.create({});
    }
    return NextResponse.json({ success: true, data: info }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    
    let info = await ContactInfo.findOne({});
    if (!info) {
      info = await ContactInfo.create(body);
    } else {
      info = await ContactInfo.findOneAndUpdate({}, body, { new: true });
    }
    
    return NextResponse.json({ success: true, data: info }, { status: 200 });
  } catch (error: any) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

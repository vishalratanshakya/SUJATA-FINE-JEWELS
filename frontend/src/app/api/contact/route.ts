import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { ContactSubmission } from '@/models/ContactSubmission';

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    
    const body = await req.json();
    const { name, email, phone, message } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    const newSubmission = await ContactSubmission.create({
      name,
      email,
      phone: phone || '',
      message
    });
    
    return NextResponse.json({ success: true, data: newSubmission }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating contact submission:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const messages = await ContactSubmission.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching contact messages:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

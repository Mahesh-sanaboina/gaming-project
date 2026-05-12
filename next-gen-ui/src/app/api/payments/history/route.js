import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

export async function GET(req) {
  try {
    await connectDB();
    
    // In a real app, filter by user ID from session
    // For now, return all payments to simulate the history
    const payments = await Payment.find().sort({ timestamp: -1 });

    return NextResponse.json(payments, { status: 200 });
  } catch (error) {
    console.error("Fetch Payments Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

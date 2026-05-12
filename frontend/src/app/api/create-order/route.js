import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

export async function POST(req) {
  try {
    const { userName, email, amount, currency = "INR", products } = await req.json();
    
    await connectDB();
    
    // Create payment record
    const transactionId = `txn_${Date.now()}`;
    const payment = await Payment.create({
      userName,
      email,
      transactionId,
      amount,
      currency,
      products: products || [],
      status: 'pending'
    });

    return NextResponse.json({
      id: payment._id,
      transactionId,
      amount: Math.round(amount * 100),
      currency,
      status: 'pending'
    }, { status: 200 });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

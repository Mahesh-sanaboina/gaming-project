import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

export async function POST(req) {
  try {
    const { 
      transactionId,
      userName,
      email,
      amount,
      products
    } = await req.json();

    await connectDB();

    // Update payment status to success
    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      { status: 'success' },
      { new: true }
    );

    if (!payment) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      message: "Payment Verified", 
      payment: {
        transactionId: payment.transactionId,
        userName: payment.userName,
        email: payment.email,
        amount: payment.amount,
        status: 'success',
        products: payment.products
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import crypto from 'crypto';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

export async function POST(req) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      userName,
      email,
      amount,
      products
    } = await req.json();

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      await connectDB();
      
      const newPayment = new Payment({
        userName: userName || "Elite Operator",
        email: email || "operator@aether-core.com",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        transactionId: razorpay_payment_id, // Use payment ID as transaction ID
        amount: amount,
        currency: 'INR',
        status: 'success',
        products: products || []
      });

      await newPayment.save();

      return NextResponse.json({ 
        message: "Payment Verified", 
        payment: newPayment 
      }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Invalid Signature" }, { status: 400 });
    }
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

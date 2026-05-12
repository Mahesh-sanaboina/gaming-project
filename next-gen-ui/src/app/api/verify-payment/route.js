import { NextResponse } from 'next/server';

// Dummy payment verification endpoint - Razorpay disabled
export async function POST(req) {
  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id,
      userName,
      email,
      amount,
      products
    } = await req.json();

    // Return mock success response
    return NextResponse.json({ 
      message: "Payment Verified", 
      payment: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        userName: userName || "Elite Operator",
        email: email || "operator@aether-core.com",
        amount: amount,
        status: 'success',
        products: products || []
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

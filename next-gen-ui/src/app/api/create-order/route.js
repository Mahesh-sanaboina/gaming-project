import { NextResponse } from 'next/server';

// Dummy order creation endpoint - Razorpay disabled
export async function POST(req) {
  try {
    const { amount, currency = "INR" } = await req.json();

    // Return mock order response
    const mockOrder = {
      id: `order_${Date.now()}`,
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
      status: 'created'
    };

    return NextResponse.json(mockOrder, { status: 200 });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

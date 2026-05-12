import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { userName, email, amount, currency = "INR", products } = await req.json();
    
    // Return mock order response for deployment
    const transactionId = `txn_${Date.now()}`;
    return NextResponse.json({
      id: transactionId,
      transactionId,
      amount: Math.round(amount * 100),
      currency,
      status: 'success'
    }, { status: 200 });
  } catch (error) {
    console.error("Order Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

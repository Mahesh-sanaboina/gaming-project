import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { 
      transactionId,
      userName,
      email,
      amount,
      products
    } = await req.json();

    // Return mock success response for deployment
    return NextResponse.json({ 
      message: "Payment Verified", 
      payment: {
        transactionId: transactionId || `txn_${Date.now()}`,
        userName: userName || "User",
        email: email || "user@example.com",
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

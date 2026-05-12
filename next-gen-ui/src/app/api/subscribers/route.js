import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now }
});

const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

export async function GET() {
  try {
    await connectDB();
    const subs = await Subscriber.find();
    return NextResponse.json(subs);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();
    if (!email) return NextResponse.json({ message: 'Email required' }, { status: 400 });
    
    const subscriber = await Subscriber.create({ email });
    return NextResponse.json(subscriber, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

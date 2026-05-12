import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  imageUrl: String
});

const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    await Product.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Product purged' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

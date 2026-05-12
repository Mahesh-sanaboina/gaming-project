import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
  userId: { type: String, required: false },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  transactionId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  products: [{
    name: { type: String },
    price: { type: Number }
  }],
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

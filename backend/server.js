const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/gamingdb';
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Models
const Product = require('./models/Product');
const Subscriber = require('./models/Subscriber');

// Seed basic data if empty
async function seedData() {
  const count = await Product.countDocuments();
  if (count === 0) {
    const products = [
      { name: 'Quantum Console', description: 'Next-gen performance in a sleek pearl-white design. Optimized for 4K 120Hz gaming.', category: 'console', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Aurora Rig', description: 'Premium water-cooled PC with elegant white aesthetics and raw high-end power.', category: 'pc', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Zenith Headset', description: 'Audiophile-grade wireless headset with pristine sound and cloud-soft comfort.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000' }
    ];
    await Product.insertMany(products);
    console.log('Seeded database with initial products.');
  }
}
mongoose.connection.once('open', seedData);

// API Routes
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });
    
    // Check if exists
    const existing = await Subscriber.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();
    res.status(201).json({ message: 'Subscribed successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

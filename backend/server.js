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
const TimelineEvent = require('./models/TimelineEvent');

// Seed basic data if empty
async function seedData() {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const products = [
      { name: 'Starter Pack', price: 9, description: 'Basic entry into the Nexus ecosystem. Essential neural assets included.', category: 'starter', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Basic Membership', price: 29, description: 'Standard access with weekly tactical drops and community badge.', category: 'membership', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Premium Pass', price: 49, description: 'Enhanced performance boosts and exclusive cosmetic skins.', category: 'membership', imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Pro Gamer Pass', price: 99, description: 'Zero-latency neural link and priority esports queue access.', category: 'membership', imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000' },
      { name: 'VIP Access Unit', price: 199, description: 'Full network dominance with all current and future asset drops.', category: 'vip', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000' },
      { name: 'Neural Boost (7D)', price: 19, description: '7-day neural performance enhancement protocol.', category: 'boost', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=1000' }
    ];
    await Product.insertMany(products);
    console.log('Seeded database with premium products.');
  }

  const timelineCount = await TimelineEvent.countDocuments();
  if (timelineCount === 0) {
    const events = [
      { order: 0, title: 'The Spark', date: 'Jan 2024', description: 'Initial concept of AETHER_CORE was born in a small neon-lit garage.', type: 'start', imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800' },
      { order: 1, title: 'Alpha Testing', date: 'March 2024', description: 'The first prototype successfully ran its first neural simulation.', type: 'milestone', imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800' },
      { order: 2, title: 'Global Partnership', date: 'June 2024', description: 'Joined forces with major esports leagues to optimize network latency.', type: 'milestone', imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800' },
      { order: 3, title: 'The Beta Phase', date: 'Sept 2024', description: 'Released Aether Rig to 500 lucky beta testers worldwide.', type: 'phase', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800' },
      { order: 4, title: 'Mainstream Launch', date: 'Dec 2024', description: 'Official global launch of the AETHER_CORE ecosystem.', type: 'launch', imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800' },
      { order: 5, title: 'The Result: AETHER_CORE v1.0', date: 'Present', description: 'Where we are today. A revolution in interactive neural entertainment.', type: 'result', imageUrl: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&q=80&w=800' }
    ];
    await TimelineEvent.insertMany(events);
    console.log('Seeded database with timeline events.');
  }
}
mongoose.connection.once('open', seedData);

// API Routes
app.get('/', (req, res) => {
  res.send('AETHER_CORE API is running successfully!');
});
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/timeline', async (req, res) => {
  try {
    const events = await TimelineEvent.find().sort({ order: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/timeline', async (req, res) => {
  try {
    const newEvent = new TimelineEvent(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
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

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

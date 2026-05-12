const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGO_URI = 'mongodb://127.0.0.1:27017/gamingdb';

const products = [
    { name: 'Quantum Console X', price: 499, description: 'Next-gen performance in a sleek pearl-white design. Optimized for 4K 120Hz gaming.', category: 'console', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Aurora Rig Ultra', price: 2499, description: 'Premium water-cooled PC with RTX 5090 and elegant white aesthetics.', category: 'pc', imageUrl: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Zenith Pro Headset', price: 299, description: 'Audiophile-grade wireless headset with pristine sound and cloud-soft comfort.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Cyber-Mechanical Keyboard', price: 189, description: 'Ultra-responsive optical switches with per-key RGB and titanium frame.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Nexus Gaming Monitor', price: 899, description: '32-inch 4K OLED display with 240Hz refresh rate and ultra-low response time.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Titan Gaming Chair', price: 549, description: 'Ergonomic carbon-fiber design with magnetic memory foam lumbar support.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1598550476439-6847785fce66?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Pro-G Mouse Pad', price: 49, description: 'Extra-large friction-balanced surface for ultimate precision and speed.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Spectre Streaming Mic', price: 249, description: 'Studio-quality cardioid condenser microphone with built-in pop filter.', category: 'accessory', imageUrl: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=1000' }
];

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB for seeding...');
        
        await Product.deleteMany({});
        console.log('Cleared existing products.');
        
        await Product.insertMany(products);
        console.log('Seeded database with ' + products.length + ' premium products.');
        
        mongoose.connection.close();
        console.log('Seeding complete.');
    } catch (err) {
        console.error('Seeding error:', err);
        process.exit(1);
    }
}

seed();

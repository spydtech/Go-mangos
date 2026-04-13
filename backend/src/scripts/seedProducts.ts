import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../src/models/Product';

dotenv.config();

const products = [
  {
    name: "Alphonso Mangoes",
    variety: "Alphonso",
    price: 899,
    originalPrice: 1199,
    description: "Known as the 'King of Mangoes', Alphonso mangoes are prized for their rich, creamy texture and sweet, aromatic flavor. Sourced directly from Ratnagiri, Maharashtra.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    stock: 50,
    rating: 4.9,
    reviewCount: 324,
    origin: "Ratnagiri, Maharashtra",
    weight: "1 Dozen (approx 3kg)",
    isAvailable: true
  },
  {
    name: "Kesar Mangoes",
    variety: "Kesar",
    price: 649,
    originalPrice: 849,
    description: "The Kesar mango, also called the Queen of Mangoes, has a unique saffron-like aroma and sweet taste. Perfect for desserts and smoothies.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400",
    stock: 35,
    rating: 4.7,
    reviewCount: 198,
    origin: "Junagadh, Gujarat",
    weight: "1 Dozen (approx 3kg)",
    isAvailable: true
  },
  {
    name: "Langra Mangoes",
    variety: "Langra",
    price: 499,
    description: "Famous for their distinct sweet-tangy flavor and fiberless pulp. A favorite in North India during peak summer season.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    stock: 40,
    rating: 4.5,
    reviewCount: 156,
    origin: "Varanasi, UP",
    weight: "1 Dozen (approx 3.5kg)",
    isAvailable: true
  },
  {
    name: "Dasheri Mangoes",
    variety: "Dasheri",
    price: 449,
    description: "Dasheri mangoes are known for their amazing aroma and sweet taste. They have a thin skin and fiberless pulp that melts in your mouth.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400",
    stock: 60,
    rating: 4.6,
    reviewCount: 142,
    origin: "Lucknow, UP",
    weight: "1 Dozen (approx 3kg)",
    isAvailable: true
  },
  {
    name: "Totapuri Mangoes",
    variety: "Totapuri",
    price: 349,
    description: "With their distinctive parrot-beak shape, Totapuri mangoes have a tangy-sweet flavor perfect for pickles, juices, and salads.",
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400",
    stock: 80,
    rating: 4.3,
    reviewCount: 98,
    origin: "Karnataka",
    weight: "1 Dozen (approx 4kg)",
    isAvailable: true
  },
  {
    name: "Hapus Mangoes (Premium)",
    variety: "Hapus",
    price: 1299,
    originalPrice: 1599,
    description: "Premium grade Hapus mangoes, hand-picked and naturally ripened. Each mango is carefully selected for perfect sweetness and texture.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=400",
    stock: 20,
    rating: 5.0,
    reviewCount: 87,
    origin: "Devgad, Maharashtra",
    weight: "1 Dozen (approx 3kg)",
    isAvailable: true
  }
];

async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('Connected to MongoDB');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');
    
    // Insert new products
    const inserted = await Product.insertMany(products);
    console.log(`✅ Seeded ${inserted.length} products successfully`);
    
    // List all products with their generated IDs
    const allProducts = await Product.find({});
    console.log('\n📦 Products in database:');
    allProducts.forEach(p => {
      console.log(`  - ID: ${p._id}`);
      console.log(`    Name: ${p.name}`);
      console.log(`    Price: ₹${p.price}`);
      console.log(`    Stock: ${p.stock}`);
      console.log('---');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
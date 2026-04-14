// import { Request, Response } from 'express';
// import Product from '../models/Product';

// // @desc    Get all products
// // @route   GET /api/products
// // @access  Public
// export const getProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { variety, origin, sort } = req.query;

//     let query: any = {};
//     if (variety) query.variety = variety;
//     if (origin) query.origin = origin;

//     let sortOption: any = { reviewCount: -1 }; // default: popular
//     if (sort === 'price-asc') sortOption = { price: 1 };
//     else if (sort === 'price-desc') sortOption = { price: -1 };
//     else if (sort === 'rating') sortOption = { rating: -1 };

//     const products = await Product.find(query).sort(sortOption);
//     res.json(products);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get single product by ID
// // @route   GET /api/products/:id
// // @access  Public
// export const getProductById = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const product = await Product.findById(req.params.id);
//     if (!product) {
//       res.status(404).json({ message: 'Product not found' });
//       return;
//     }
//     res.json(product);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Get all unique varieties and origins
// // @route   GET /api/products/categories
// // @access  Public
// export const getCategories = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const varieties = await Product.distinct('variety');
//     const origins = await Product.distinct('origin');
//     res.json({ varieties, origins });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // @desc    Seed default products (run once)
// // @route   POST /api/products/seed
// // @access  Public (lock this down in production)
// export const seedProducts = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const count = await Product.countDocuments();
//     if (count > 0) {
//       res.json({ message: `Products already seeded (${count} exist)` });
//       return;
//     }

//     const defaultProducts = [
//       {
//         name: 'Alphonso Mangoes',
//         variety: 'Alphonso',
//         price: 299,
//         originalPrice: 399,
//         description: "Known as the 'King of Mangoes', Alphonso mangoes are prized for their rich, creamy texture and sweet, aromatic flavor. Sourced directly from Ratnagiri, Maharashtra.",
//         image: '',
//         stock: 50,
//         rating: 4.9,
//         reviewCount: 324,
//         origin: 'Ratnagiri, Maharashtra',
//         weight: 'Sold per kg',
//       },
//       {
//         name: 'Kesar Mangoes',
//         variety: 'Kesar',
//         price: 216,
//         originalPrice: 283,
//         description: 'The Kesar mango, also called the Queen of Mangoes, has a unique saffron-like aroma and sweet taste. Perfect for desserts and smoothies.',
//         image: '',
//         stock: 35,
//         rating: 4.7,
//         reviewCount: 198,
//         origin: 'Junagadh, Gujarat',
//         weight: 'Sold per kg',
//       },
//       {
//         name: 'Langra Mangoes',
//         variety: 'Langra',
//         price: 143,
//         description: 'Famous for their distinct sweet-tangy flavor and fiberless pulp. A favorite in North India during peak summer season.',
//         image: '',
//         stock: 40,
//         rating: 4.5,
//         reviewCount: 156,
//         origin: 'Varanasi, UP',
//         weight: 'Sold per kg',
//       },
//       {
//         name: 'Dasheri Mangoes',
//         variety: 'Dasheri',
//         price: 150,
//         description: 'Dasheri mangoes are known for their amazing aroma and sweet taste. They have a thin skin and fiberless pulp that melts in your mouth.',
//         image: '',
//         stock: 60,
//         rating: 4.6,
//         reviewCount: 142,
//         origin: 'Lucknow, UP',
//         weight: 'Sold per kg',
//       },
//       {
//         name: 'Totapuri Mangoes',
//         variety: 'Totapuri',
//         price: 87,
//         description: 'With their distinctive parrot-beak shape, Totapuri mangoes have a tangy-sweet flavor perfect for pickles, juices, and salads.',
//         image: '',
//         stock: 80,
//         rating: 4.3,
//         reviewCount: 98,
//         origin: 'Karnataka',
//         weight: 'Sold per kg',
//       },
//       {
//         name: 'Hapus Mangoes (Premium)',
//         variety: 'Hapus',
//         price: 433,
//         originalPrice: 533,
//         description: 'Premium grade Hapus mangoes, hand-picked and naturally ripened. Each mango is carefully selected for perfect sweetness and texture.',
//         image: '',
//         stock: 20,
//         rating: 5.0,
//         reviewCount: 87,
//         origin: 'Devgad, Maharashtra',
//         weight: 'Sold per kg',
//       },
//     ];

//     const inserted = await Product.insertMany(defaultProducts);
//     res.status(201).json({ message: `${inserted.length} products seeded successfully` });
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// };
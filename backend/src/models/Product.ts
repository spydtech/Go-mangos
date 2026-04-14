// import mongoose from 'mongoose';

// export interface IProduct {
//   name: string;
//   variety: string;
//   price: number;
//   originalPrice?: number;
//   description: string;
//   image: string;
//   stock: number;
//   rating: number;
//   reviewCount: number;
//   origin: string;
//   weight: string;
// }

// const productSchema = new mongoose.Schema<IProduct>(
//   {
//     name: { type: String, required: true },
//     variety: { type: String, required: true },
//     price: { type: Number, required: true },
//     originalPrice: { type: Number },
//     description: { type: String, required: true },
//     image: { type: String, required: true },
//     stock: { type: Number, required: true, default: 0 },
//     rating: { type: Number, default: 0 },
//     reviewCount: { type: Number, default: 0 },
//     origin: { type: String, required: true },
//     weight: { type: String, required: true },
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model<IProduct>('Product', productSchema);
// export default Product;
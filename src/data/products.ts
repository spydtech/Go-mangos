// import mangoAlphonso from "@/assets/mango-alphonso.jpg";
// import mangoKesar from "@/assets/mango-kesar.jpg";
// import mangoLangra from "@/assets/mango-langra.jpg";
// import mangoDasheri from "@/assets/mango-dasheri.jpg";
// import mangoTotapuri from "@/assets/mango-totapuri.jpg";
// import mangoHapus from "@/assets/mango-hapus.jpg";

// export interface Product {
//   id: string;
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

// export const products: Product[] = [
//   {
//     id: "1",
//     name: "Alphonso Mangoes",
//     variety: "Alphonso",
//     price: 899,
//     originalPrice: 1199,
//     description: "Known as the 'King of Mangoes', Alphonso mangoes are prized for their rich, creamy texture and sweet, aromatic flavor. Sourced directly from Ratnagiri, Maharashtra.",
//     image: mangoAlphonso,
//     stock: 50,
//     rating: 4.9,
//     reviewCount: 324,
//     origin: "Ratnagiri, Maharashtra",
//     weight: "1 Dozen (approx 3kg)",
//   },
//   {
//     id: "2",
//     name: "Kesar Mangoes",
//     variety: "Kesar",
//     price: 649,
//     originalPrice: 849,
//     description: "The Kesar mango, also called the Queen of Mangoes, has a unique saffron-like aroma and sweet taste. Perfect for desserts and smoothies.",
//     image: mangoKesar,
//     stock: 35,
//     rating: 4.7,
//     reviewCount: 198,
//     origin: "Junagadh, Gujarat",
//     weight: "1 Dozen (approx 3kg)",
//   },
//   {
//     id: "3",
//     name: "Langra Mangoes",
//     variety: "Langra",
//     price: 499,
//     description: "Famous for their distinct sweet-tangy flavor and fiberless pulp. A favorite in North India during peak summer season.",
//     image: mangoLangra,
//     stock: 40,
//     rating: 4.5,
//     reviewCount: 156,
//     origin: "Varanasi, UP",
//     weight: "1 Dozen (approx 3.5kg)",
//   },
//   {
//     id: "4",
//     name: "Dasheri Mangoes",
//     variety: "Dasheri",
//     price: 449,
//     description: "Dasheri mangoes are known for their amazing aroma and sweet taste. They have a thin skin and fiberless pulp that melts in your mouth.",
//     image: mangoDasheri,
//     stock: 60,
//     rating: 4.6,
//     reviewCount: 142,
//     origin: "Lucknow, UP",
//     weight: "1 Dozen (approx 3kg)",
//   },
//   {
//     id: "5",
//     name: "Totapuri Mangoes",
//     variety: "Totapuri",
//     price: 349,
//     description: "With their distinctive parrot-beak shape, Totapuri mangoes have a tangy-sweet flavor perfect for pickles, juices, and salads.",
//     image: mangoTotapuri,
//     stock: 80,
//     rating: 4.3,
//     reviewCount: 98,
//     origin: "Karnataka",
//     weight: "1 Dozen (approx 4kg)",
//   },
//   {
//     id: "6",
//     name: "Hapus Mangoes (Premium)",
//     variety: "Hapus",
//     price: 1299,
//     originalPrice: 1599,
//     description: "Premium grade Hapus mangoes, hand-picked and naturally ripened. Each mango is carefully selected for perfect sweetness and texture.",
//     image: mangoHapus,
//     stock: 20,
//     rating: 5.0,
//     reviewCount: 87,
//     origin: "Devgad, Maharashtra",
//     weight: "1 Dozen (approx 3kg)",
//   },
// ];

// export const varieties = [...new Set(products.map((p) => p.variety))];
// export const origins = [...new Set(products.map((p) => p.origin))];





import mangoAlphonso from "@/assets/mango-alphonso.jpg";
import mangoKesar from "@/assets/mango-kesar.jpg";
import mangoLangra from "@/assets/mango-langra.jpg";
import mangoDasheri from "@/assets/mango-dasheri.jpg";
import mangoTotapuri from "@/assets/mango-totapuri.jpg";
import mangoHapus from "@/assets/mango-hapus.jpg";

export interface Product {
  id: string;
  name: string;
  variety: string;
  price: number;           // price per kg
  originalPrice?: number;  // original price per kg
  description: string;
  image: string;
  stock: number;
  rating: number;
  reviewCount: number;
  origin: string;
  weight: string;          // display label only (e.g. "1 Dozen (~3kg)")
}

export const products: Product[] = [
  {
    id: "1",
    name: "Alphonso Mangoes",
    variety: "Alphonso",
    price: 299,
    originalPrice: 399,
    description:
      "Known as the 'King of Mangoes', Alphonso mangoes are prized for their rich, creamy texture and sweet, aromatic flavor. Sourced directly from Ratnagiri, Maharashtra.",
    image: mangoAlphonso,
    stock: 50,
    rating: 4.9,
    reviewCount: 324,
    origin: "Ratnagiri, Maharashtra",
    weight: "Sold per kg",
  },
  {
    id: "2",
    name: "Kesar Mangoes",
    variety: "Kesar",
    price: 216,
    originalPrice: 283,
    description:
      "The Kesar mango, also called the Queen of Mangoes, has a unique saffron-like aroma and sweet taste. Perfect for desserts and smoothies.",
    image: mangoKesar,
    stock: 35,
    rating: 4.7,
    reviewCount: 198,
    origin: "Junagadh, Gujarat",
    weight: "Sold per kg",
  },
  {
    id: "3",
    name: "Langra Mangoes",
    variety: "Langra",
    price: 143,
    description:
      "Famous for their distinct sweet-tangy flavor and fiberless pulp. A favorite in North India during peak summer season.",
    image: mangoLangra,
    stock: 40,
    rating: 4.5,
    reviewCount: 156,
    origin: "Varanasi, UP",
    weight: "Sold per kg",
  },
  {
    id: "4",
    name: "Dasheri Mangoes",
    variety: "Dasheri",
    price: 150,
    description:
      "Dasheri mangoes are known for their amazing aroma and sweet taste. They have a thin skin and fiberless pulp that melts in your mouth.",
    image: mangoDasheri,
    stock: 60,
    rating: 4.6,
    reviewCount: 142,
    origin: "Lucknow, UP",
    weight: "Sold per kg",
  },
  {
    id: "5",
    name: "Totapuri Mangoes",
    variety: "Totapuri",
    price: 87,
    description:
      "With their distinctive parrot-beak shape, Totapuri mangoes have a tangy-sweet flavor perfect for pickles, juices, and salads.",
    image: mangoTotapuri,
    stock: 80,
    rating: 4.3,
    reviewCount: 98,
    origin: "Karnataka",
    weight: "Sold per kg",
  },
  {
    id: "6",
    name: "Hapus Mangoes (Premium)",
    variety: "Hapus",
    price: 433,
    originalPrice: 533,
    description:
      "Premium grade Hapus mangoes, hand-picked and naturally ripened. Each mango is carefully selected for perfect sweetness and texture.",
    image: mangoHapus,
    stock: 20,
    rating: 5.0,
    reviewCount: 87,
    origin: "Devgad, Maharashtra",
    weight: "Sold per kg",
  },
];

export const productNameToIdMap: { [key: string]: string } = {
  "Alphonso Mangoes": "1",
  "Kesar Mangoes": "2",
  "Langra Mangoes": "3",
  "Dasheri Mangoes": "4",
  "Totapuri Mangoes": "5",
  "Hapus Mangoes (Premium)": "6",
};

export const varieties = [...new Set(products.map((p) => p.variety))];
export const origins = [...new Set(products.map((p) => p.origin))];
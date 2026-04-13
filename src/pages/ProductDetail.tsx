// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import { Star, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";
// import { motion } from "framer-motion";
// import { products } from "@/data/products";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import ProductCard from "@/components/ProductCard";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === id);
//   const { addToCart } = useCart();
//   const [qty, setQty] = useState(1);

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-20 text-center">
//         <h2 className="font-display text-2xl font-bold">Product not found</h2>
//         <Button asChild variant="outline" className="mt-4">
//           <Link to="/products">Back to Shop</Link>
//         </Button>
//       </div>
//     );
//   }

//   const related = products.filter((p) => p.id !== product.id).slice(0, 3);

//   const handleAdd = () => {
//     addToCart(product, qty);
//     toast.success(`${qty}x ${product.name} added to cart!`);
//   };

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
//         <ArrowLeft size={16} /> Back to Shop
//       </Link>

//       <div className="grid gap-10 md:grid-cols-2">
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <img
//             src={product.image}
//             alt={product.name}
//             width={800}
//             height={800}
//             className="w-full rounded-2xl bg-muted object-cover shadow-card"
//           />
//         </motion.div>

//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
//           <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
//             {product.variety}
//           </span>
//           <h1 className="mb-2 font-display text-3xl font-bold text-foreground">{product.name}</h1>
//           <div className="mb-4 flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"} />
//               ))}
//             </div>
//             <span className="text-sm font-medium">{product.rating}</span>
//             <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
//           </div>

//           <div className="mb-4 flex items-baseline gap-3">
//             <span className="text-3xl font-bold text-foreground">₹{product.price}</span>
//             {product.originalPrice && (
//               <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
//             )}
//             {product.originalPrice && (
//               <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
//                 Save ₹{product.originalPrice - product.price}
//               </span>
//             )}
//           </div>

//           <p className="mb-6 leading-relaxed text-muted-foreground">{product.description}</p>

//           <div className="mb-4 flex flex-col gap-2 text-sm">
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Origin:</span>
//               <span className="text-muted-foreground">{product.origin}</span>
//             </div>
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Weight:</span>
//               <span className="text-muted-foreground">{product.weight}</span>
//             </div>
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Stock:</span>
//               <span className={product.stock > 10 ? "text-secondary" : "text-accent"}>{product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}</span>
//             </div>
//           </div>

//           <div className="mb-6 flex items-center gap-4">
//             <div className="flex items-center rounded-lg border border-border">
//               <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-muted"><Minus size={16} /></button>
//               <span className="w-10 text-center font-medium">{qty}</span>
//               <button onClick={() => setQty(Math.min(product.stock, qty + 1))} className="p-2 hover:bg-muted"><Plus size={16} /></button>
//             </div>
//             <Button onClick={handleAdd} size="lg" className="flex-1 bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//               <ShoppingCart size={18} className="mr-2" /> Add to Cart
//             </Button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Related */}
//       <section className="mt-16">
//         <h2 className="mb-6 font-display text-2xl font-bold text-foreground">You May Also Like</h2>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {related.map((p) => <ProductCard key={p.id} product={p} />)}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProductDetail;



// import { useParams, Link } from "react-router-dom";
// import { useState } from "react";
// import { Star, Minus, Plus, ShoppingCart, ArrowLeft, Package } from "lucide-react";
// import { motion } from "framer-motion";
// import { products } from "@/data/products";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";
// import ProductCard from "@/components/ProductCard";

// const ProductDetail = () => {
//   const { id } = useParams();
//   const product = products.find((p) => p.id === id);
//   const { addToCart, items } = useCart();
//   const [qty, setQty] = useState(1);

//   // Get current quantity in cart for this product
//   const existingItem = items.find(item => item.product.id === id);
//   const currentQuantity = existingItem?.quantity || 0;
//   const maxAvailable = 4 - currentQuantity;

//   if (!product) {
//     return (
//       <div className="container mx-auto px-4 py-20 text-center">
//         <h2 className="font-display text-2xl font-bold">Product not found</h2>
//         <Button asChild variant="outline" className="mt-4">
//           <Link to="/products">Back to Shop</Link>
//         </Button>
//       </div>
//     );
//   }

//   const related = products.filter((p) => p.id !== product.id).slice(0, 3);

//   const handleAdd = () => {
//     if (currentQuantity + qty > 4) {
//       toast.error(`Maximum 4kg allowed for ${product.name}! You already have ${currentQuantity}kg in cart.`);
//       return;
//     }
//     addToCart(product, qty);
//     setQty(1);
//   };

//   const incrementQty = () => {
//     if (qty < maxAvailable) {
//       setQty(qty + 1);
//     } else {
//       toast.error(`Cannot add more than ${maxAvailable}kg (Maximum 4kg total)`);
//     }
//   };

//   const decrementQty = () => {
//     if (qty > 1) {
//       setQty(qty - 1);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <Link to="/products" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
//         <ArrowLeft size={16} /> Back to Shop
//       </Link>

//       <div className="grid gap-10 md:grid-cols-2">
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//           <img
//             src={product.image}
//             alt={product.name}
//             width={800}
//             height={800}
//             className="w-full rounded-2xl bg-muted object-cover shadow-card"
//           />
//         </motion.div>

//         <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
//           <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
//             {product.variety}
//           </span>
//           <h1 className="mb-2 font-display text-3xl font-bold text-foreground">{product.name}</h1>
//           <div className="mb-4 flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               {Array.from({ length: 5 }).map((_, i) => (
//                 <Star key={i} size={16} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted"} />
//               ))}
//             </div>
//             <span className="text-sm font-medium">{product.rating}</span>
//             <span className="text-sm text-muted-foreground">({product.reviewCount} reviews)</span>
//           </div>

//           <div className="mb-4 flex items-baseline gap-3">
//             <span className="text-3xl font-bold text-foreground">₹{product.price}/kg</span>
//             {product.originalPrice && (
//               <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice}</span>
//             )}
//             {product.originalPrice && (
//               <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
//                 Save ₹{product.originalPrice - product.price}
//               </span>
//             )}
//           </div>

//           <p className="mb-6 leading-relaxed text-muted-foreground">{product.description}</p>

//           <div className="mb-4 flex flex-col gap-2 text-sm">
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Origin:</span>
//               <span className="text-muted-foreground">{product.origin}</span>
//             </div>
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Weight:</span>
//               <span className="text-muted-foreground">{product.weight}</span>
//             </div>
//             <div className="flex gap-2">
//               <span className="font-medium text-foreground">Stock:</span>
//               <span className={product.stock > 10 ? "text-secondary" : "text-accent"}>{product.stock > 10 ? "In Stock" : `Only ${product.stock} left`}</span>
//             </div>
//           </div>

//           {/* Quantity Limit Info */}
//           <div className="mb-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
//             <div className="flex items-center gap-2 text-sm text-yellow-800">
//               <Package size={16} />
//               <span>Quantity Limit: 1kg - 4kg per variety</span>
//             </div>
//             {currentQuantity > 0 && (
//               <p className="text-xs text-yellow-700 mt-1">
//                 You already have {currentQuantity}kg in cart. You can add {maxAvailable}kg more.
//               </p>
//             )}
//           </div>

//           <div className="mb-6 flex items-center gap-4">
//             <div className="flex items-center rounded-lg border border-border">
//               <button 
//                 onClick={decrementQty} 
//                 className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={qty <= 1}
//               >
//                 <Minus size={16} />
//               </button>
//               <span className="w-12 text-center font-medium">{qty} kg</span>
//               <button 
//                 onClick={incrementQty} 
//                 className="p-2 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={qty >= maxAvailable || maxAvailable <= 0}
//               >
//                 <Plus size={16} />
//               </button>
//             </div>
//             <Button 
//               onClick={handleAdd} 
//               size="lg" 
//               className="flex-1 bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep"
//               disabled={maxAvailable <= 0}
//             >
//               <ShoppingCart size={18} className="mr-2" /> 
//               {maxAvailable <= 0 ? "Maximum Quantity Reached" : "Add to Cart"}
//             </Button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Related */}
//       <section className="mt-16">
//         <h2 className="mb-6 font-display text-2xl font-bold text-foreground">You May Also Like</h2>
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {related.map((p) => <ProductCard key={p.id} product={p} />)}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProductDetail;



import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ArrowLeft,
  Package,
  Truck,
  Gift,
} from "lucide-react";
import { motion } from "framer-motion";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, items, totalQuantity } = useCart();
  const [qty, setQty] = useState(1);

  const existingItem = items.find((item) => item.product.id === id);
  const currentQuantity = existingItem?.quantity || 0;

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="font-display text-2xl font-bold">Product not found</h2>
        <Button asChild variant="outline" className="mt-4">
          <Link to="/products">Back to Shop</Link>
        </Button>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleAdd = () => {
    addToCart(product, qty);
    setQty(1);
  };

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const getDiscountMessage = () => {
    if (totalQuantity >= 20) return "10% DISCOUNT + FREE SHIPPING";
    if (totalQuantity >= 10) return "5% DISCOUNT + FREE SHIPPING";
    if (totalQuantity >= 5) return "FREE SHIPPING";
    return null;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft size={16} /> Back to Shop
      </Link>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <img
            src={product.image}
            alt={product.name}
            width={800}
            height={800}
            className="w-full rounded-2xl bg-muted object-cover shadow-card"
          />
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <span className="mb-2 inline-block rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            {product.variety}
          </span>
          <h1 className="mb-2 font-display text-3xl font-bold text-foreground">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="mb-4 flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-primary text-primary"
                      : "text-muted"
                  }
                />
              ))}
            </div>
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="mb-4 flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              ₹{product.price}/kg
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ₹{product.originalPrice}/kg
                </span>
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs font-bold text-accent-foreground">
                  {discountPercent}% OFF
                </span>
              </>
            )}
          </div>

          <p className="mb-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Meta */}
          <div className="mb-4 flex flex-col gap-2 text-sm">
            <div className="flex gap-2">
              <span className="font-medium text-foreground">Origin:</span>
              <span className="text-muted-foreground">{product.origin}</span>
            </div>
            <div className="flex gap-2">
              <span className="font-medium text-foreground">Stock:</span>
              <span
                className={
                  product.stock > 10 ? "text-secondary" : "text-accent"
                }
              >
                {product.stock > 10
                  ? "In Stock"
                  : `Only ${product.stock}kg left`}
              </span>
            </div>
          </div>

          {/* Current cart summary */}
          {totalQuantity > 0 && (
            <div className="mb-4 rounded-lg border border-purple-200 bg-purple-50 p-3">
              <div className="flex items-center gap-2 text-sm text-purple-800">
                <Package size={16} />
                <span>Your Cart Summary</span>
              </div>
              <p className="mt-1 text-xs text-purple-700">
                Total Weight: <strong>{totalQuantity}kg</strong>
              </p>
              {getDiscountMessage() ? (
                <p className="mt-1 text-xs font-semibold text-green-700">
                  ✨ {getDiscountMessage()} ✨
                </p>
              ) : (
                <p className="mt-1 text-xs text-purple-700">
                  Add {5 - totalQuantity}kg more for free shipping!
                </p>
              )}
              {currentQuantity > 0 && (
                <p className="mt-1 text-xs text-purple-600">
                  You have {currentQuantity}kg of {product.name} in cart.
                </p>
              )}
            </div>
          )}

          {/* Bulk benefits */}
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-2 text-sm text-green-800">
              <Truck size={16} />
              <span>Bulk Order Benefits</span>
            </div>
            <div className="mt-1 space-y-1 text-xs text-green-700">
              <p>✓ 5kg+ : Free Shipping</p>
              <p>✓ 10kg+ : Free Shipping + 5% Discount</p>
              <p>✓ 20kg+ : Free Shipping + 10% Discount</p>
            </div>
          </div>

          {/* Qty selector + Add to cart */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                className="p-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Minus size={16} />
              </button>
              <span className="w-16 text-center font-medium">{qty} kg</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="p-2 hover:bg-muted"
              >
                <Plus size={16} />
              </button>
            </div>
            <Button
              onClick={handleAdd}
              size="lg"
              className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg transition-all hover:shadow-xl"
            >
              <ShoppingCart size={18} className="mr-2" />
              Add {qty}kg to Cart
            </Button>
          </div>

          {/* Popular bulk order suggestions */}
          <div className="rounded-lg bg-orange-50 p-3">
            <p className="mb-1 text-xs font-semibold text-orange-800">
              🎁 Popular Bulk Orders:
            </p>
            <div className="space-y-1 text-xs text-orange-700">
              <p>• 5kg — Free Shipping (₹{product.price * 5})</p>
              <p>
                • 10kg — Free Shipping + Save ₹
                {Math.round(product.price * 10 * 0.05)} (5% off)
              </p>
              <p>
                • 20kg — Free Shipping + Save ₹
                {Math.round(product.price * 20 * 0.1)} (10% off)
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      <section className="mt-16">
        <h2 className="mb-6 font-display text-2xl font-bold text-foreground">
          You May Also Like
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
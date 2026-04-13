// import { Link } from "react-router-dom";
// import { Star, ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion";
// import type { Product } from "@/data/products";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// const ProductCard = ({ product }: { product: Product }) => {
//   const { addToCart } = useCart();

//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToCart(product);
//     toast.success(`${product.name} added to cart!`);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Link to={`/product/${product.id}`} className="group block">
//         <div className="overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-mango">
//           <div className="relative aspect-square overflow-hidden bg-muted">
//             <img
//               src={product.image}
//               alt={product.name}
//               loading="lazy"
//               width={400}
//               height={400}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             {product.originalPrice && (
//               <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
//                 {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
//               </span>
//             )}
//           </div>
//           <div className="p-4">
//             <div className="mb-1 flex items-center gap-1">
//               <Star size={14} className="fill-primary text-primary" />
//               <span className="text-sm font-medium text-foreground">{product.rating}</span>
//               <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
//             </div>
//             <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
//             <p className="mb-3 text-xs text-muted-foreground">{product.origin} · {product.weight}</p>
//             <div className="flex items-center justify-between">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-lg font-bold text-foreground">₹{product.price}</span>
//                 {product.originalPrice && (
//                   <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
//                 )}
//               </div>
//               <Button size="sm" onClick={handleAdd} className="bg-primary text-primary-foreground hover:bg-mango-deep">
//                 <ShoppingCart size={14} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default ProductCard;




// import { Link } from "react-router-dom";
// import { Star, ShoppingCart } from "lucide-react";
// import { motion } from "framer-motion";
// import type { Product } from "@/data/products";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { toast } from "sonner";

// const ProductCard = ({ product }: { product: Product }) => {
//   const { addToCart, items } = useCart();

//   const handleAdd = (e: React.MouseEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
    
//     // Check current quantity in cart for this product
//     const existingItem = items.find(item => item.product.id === product.id);
//     const currentQuantity = existingItem?.quantity || 0;
    
//     if (currentQuantity >= 4) {
//       toast.error(`Maximum 4kg allowed for ${product.name}!`);
//       return;
//     }
    
//     addToCart(product, 1);
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       whileHover={{ y: -4 }}
//       transition={{ duration: 0.3 }}
//     >
//       <Link to={`/product/${product.id}`} className="group block">
//         <div className="overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-mango">
//           <div className="relative aspect-square overflow-hidden bg-muted">
//             <img
//               src={product.image}
//               alt={product.name}
//               loading="lazy"
//               width={400}
//               height={400}
//               className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//             />
//             {product.originalPrice && (
//               <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
//                 {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
//               </span>
//             )}
//             {items.find(item => item.product.id === product.id)?.quantity === 4 && (
//               <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
//                 Max Qty
//               </span>
//             )}
//           </div>
//           <div className="p-4">
//             <div className="mb-1 flex items-center gap-1">
//               <Star size={14} className="fill-primary text-primary" />
//               <span className="text-sm font-medium text-foreground">{product.rating}</span>
//               <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
//             </div>
//             <h3 className="font-display text-lg font-semibold text-foreground">{product.name}</h3>
//             <p className="mb-3 text-xs text-muted-foreground">{product.origin} · {product.weight}</p>
//             <div className="flex items-center justify-between">
//               <div className="flex items-baseline gap-2">
//                 <span className="text-lg font-bold text-foreground">₹{product.price}</span>
//                 {product.originalPrice && (
//                   <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
//                 )}
//               </div>
//               <Button 
//                 size="sm" 
//                 onClick={handleAdd} 
//                 className="bg-primary text-primary-foreground hover:bg-mango-deep"
//                 disabled={items.find(item => item.product.id === product.id)?.quantity === 4}
//               >
//                 <ShoppingCart size={14} />
//               </Button>
//             </div>
//           </div>
//         </div>
//       </Link>
//     </motion.div>
//   );
// };

// export default ProductCard;


import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, items } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  const currentQuantity =
    items.find((item) => item.product.id === product.id)?.quantity || 0;

  const discountPercent = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group block">
        <div className="overflow-hidden rounded-xl bg-card shadow-card transition-shadow hover:shadow-mango">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              width={400}
              height={400}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {discountPercent > 0 && (
              <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-foreground">
                {discountPercent}% OFF
              </span>
            )}
            {currentQuantity > 0 && (
              <span className="absolute right-3 top-3 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
                {currentQuantity}kg in cart
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="mb-1 flex items-center gap-1">
              <Star size={14} className="fill-primary text-primary" />
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>

            <h3 className="font-display text-lg font-semibold text-foreground">
              {product.name}
            </h3>
            <p className="mb-3 text-xs text-muted-foreground">
              {product.origin}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-foreground">
                  ₹{product.price}/kg
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={handleAdd}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg transition-all"
              >
                <ShoppingCart size={14} />
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
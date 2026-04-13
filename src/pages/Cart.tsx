// import { Link } from "react-router-dom";
// import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";

// const Cart = () => {
//   const { items, updateQuantity, removeFromCart, totalPrice } = useCart();

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
//         <ShoppingBag size={64} className="mb-4 text-muted-foreground/30" />
//         <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
//         <p className="mb-6 text-muted-foreground">Add some delicious mangoes to get started!</p>
//         <Button asChild className="bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//           <Link to="/products">Browse Mangoes</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
//       <div className="grid gap-8 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <AnimatePresence>
//             {items.map(({ product, quantity }) => (
//               <motion.div
//                 key={product.id}
//                 layout
//                 exit={{ opacity: 0, x: -100 }}
//                 className="mb-4 flex gap-4 rounded-xl bg-card p-4 shadow-card"
//               >
//                 <img src={product.image} alt={product.name} className="h-24 w-24 rounded-lg object-cover" />
//                 <div className="flex flex-1 flex-col justify-between">
//                   <div>
//                     <Link to={`/product/${product.id}`} className="font-display font-semibold text-foreground hover:text-primary">
//                       {product.name}
//                     </Link>
//                     <p className="text-xs text-muted-foreground">{product.weight}</p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center rounded-lg border border-border">
//                       <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1.5 hover:bg-muted"><Minus size={14} /></button>
//                       <span className="w-8 text-center text-sm font-medium">{quantity}</span>
//                       <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1.5 hover:bg-muted"><Plus size={14} /></button>
//                     </div>
//                     <span className="font-bold text-foreground">₹{product.price * quantity}</span>
//                     <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive">
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </div>

//         <div className="h-fit rounded-xl bg-card p-6 shadow-card">
//           <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
//           <div className="mb-3 flex justify-between text-sm">
//             <span className="text-muted-foreground">Subtotal</span>
//             <span className="font-medium text-foreground">₹{totalPrice}</span>
//           </div>
//           <div className="mb-3 flex justify-between text-sm">
//             <span className="text-muted-foreground">Shipping</span>
//             <span className="font-medium text-secondary">{totalPrice >= 999 ? "FREE" : "₹99"}</span>
//           </div>
//           <div className="my-4 border-t border-border" />
//           <div className="mb-6 flex justify-between">
//             <span className="font-display font-semibold text-foreground">Total</span>
//             <span className="text-xl font-bold text-foreground">₹{totalPrice + (totalPrice >= 999 ? 0 : 99)}</span>
//           </div>
//           <Button asChild size="lg" className="w-full bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//             <Link to="/checkout">Proceed to Checkout <ArrowRight size={16} className="ml-2" /></Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;



// import { Link } from "react-router-dom";
// import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Package, Truck, Gift } from "lucide-react";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { motion, AnimatePresence } from "framer-motion";

// const Cart = () => {
//   const { items, updateQuantity, removeFromCart, totalPrice, totalQuantity } = useCart();

//   // Calculate total weight in kg (each item quantity = number of kgs)
//   const totalWeight = totalQuantity;
//   const shippingCost = totalWeight >= 5 ? 0 : 99;
//   const finalTotal = totalPrice + shippingCost;

//   if (items.length === 0) {
//     return (
//       <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
//         <ShoppingBag size={64} className="mb-4 text-muted-foreground/30" />
//         <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
//         <p className="mb-6 text-muted-foreground">Add some delicious mangoes to get started!</p>
//         <Button asChild className="bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//           <Link to="/products">Browse Mangoes</Link>
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
//       <div className="grid gap-8 lg:grid-cols-3">
//         <div className="lg:col-span-2">
//           <AnimatePresence>
//             {items.map(({ product, quantity }) => (
//               <motion.div
//                 key={product.id}
//                 layout
//                 exit={{ opacity: 0, x: -100 }}
//                 className="mb-4 flex gap-4 rounded-xl bg-card p-4 shadow-card"
//               >
//                 <img 
//                   src={product.image} 
//                   alt={product.name} 
//                   className="h-24 w-24 rounded-lg object-cover" 
//                 />
//                 <div className="flex flex-1 flex-col justify-between">
//                   <div>
//                     <Link 
//                       to={`/product/${product.id}`} 
//                       className="font-display font-semibold text-foreground hover:text-primary"
//                     >
//                       {product.name}
//                     </Link>
//                     <p className="text-xs text-muted-foreground">{product.weight}</p>
//                     <p className="text-xs text-muted-foreground mt-1">
//                       ₹{product.price}/kg
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center rounded-lg border border-border">
//                       <button 
//                         onClick={() => updateQuantity(product.id, quantity - 1)} 
//                         className="p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={quantity <= 1}
//                       >
//                         <Minus size={14} />
//                       </button>
//                       <span className="w-10 text-center text-sm font-medium">{quantity} kg</span>
//                       <button 
//                         onClick={() => updateQuantity(product.id, quantity + 1)} 
//                         className="p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
//                         disabled={quantity >= 4}
//                       >
//                         <Plus size={14} />
//                       </button>
//                     </div>
//                     <span className="font-bold text-foreground">₹{product.price * quantity}</span>
//                     <button 
//                       onClick={() => removeFromCart(product.id)} 
//                       className="text-muted-foreground hover:text-destructive transition-colors"
//                     >
//                       <Trash2 size={16} />
//                     </button>
//                   </div>
//                   {quantity >= 4 && (
//                     <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
//                       <Package size={12} />
//                       Maximum 4kg reached for this variety
//                     </p>
//                   )}
//                 </div>
//               </motion.div>
//             ))}
//           </AnimatePresence>
          
//           {/* Quantity Limit Notice */}
//           <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
//             <p className="text-sm text-yellow-800 flex items-center gap-2">
//               <Package size={16} />
//               <span>📦 Quantity Policy: Minimum 1kg and maximum 4kg per mango variety</span>
//             </p>
//           </div>
//         </div>

//         <div className="h-fit rounded-xl bg-card p-6 shadow-card">
//           <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
          
//           {/* Total Weight */}
//           <div className="mb-3 flex justify-between text-sm">
//             <span className="text-muted-foreground flex items-center gap-1">
//               <Package size={14} />
//               Total Weight
//             </span>
//             <span className="font-medium text-foreground">{totalWeight} kg</span>
//           </div>
          
//           {/* Subtotal */}
//           <div className="mb-3 flex justify-between text-sm">
//             <span className="text-muted-foreground">Subtotal</span>
//             <span className="font-medium text-foreground">₹{totalPrice}</span>
//           </div>
          
//           {/* Shipping */}
//           <div className="mb-3 flex justify-between text-sm">
//             <span className="text-muted-foreground flex items-center gap-1">
//               <Truck size={14} />
//               Shipping
//             </span>
//             <span className={`font-medium ${totalWeight >= 5 ? 'text-green-600' : 'text-muted-foreground'}`}>
//               {totalWeight >= 5 ? "FREE" : "₹99"}
//             </span>
//           </div>
          
//           {/* Free Shipping Progress */}
//           {totalWeight < 5 && (
//             <div className="mb-4 p-3 bg-orange-50 rounded-lg">
//               <p className="text-xs text-orange-700 mb-2 flex items-center gap-1">
//                 <Gift size={12} />
//                 Add {5 - totalWeight}kg more for FREE shipping!
//               </p>
//               <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
//                 <div 
//                   className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full h-2 transition-all duration-500"
//                   style={{ width: `${(totalWeight / 5) * 100}%` }}
//                 />
//               </div>
//               <p className="text-xs text-orange-600 mt-1">
//                 {totalWeight}/5kg towards free shipping
//               </p>
//             </div>
//           )}
          
//           {/* Free Shipping Achieved */}
//           {totalWeight >= 5 && (
//             <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
//               <p className="text-xs text-green-700 flex items-center gap-2">
//                 <Truck size={14} />
//                 <span className="font-semibold">✨ Free Shipping Applied! ✨</span>
//               </p>
//               <p className="text-xs text-green-600 mt-1">
//                 You've qualified for free delivery on this order
//               </p>
//             </div>
//           )}
          
//           <div className="my-4 border-t border-border" />
          
//           {/* Total */}
//           <div className="mb-6 flex justify-between items-center">
//             <span className="font-display font-semibold text-foreground">Total</span>
//             <div className="text-right">
//               <span className="text-xl font-bold text-foreground">₹{finalTotal}</span>
//               {shippingCost > 0 && (
//                 <p className="text-xs text-muted-foreground">(Including ₹99 shipping)</p>
//               )}
//             </div>
//           </div>
          
//           {/* Checkout Button */}
//           <Button 
//             asChild 
//             size="lg" 
//             className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
//           >
//             <Link to="/checkout">
//               Proceed to Checkout 
//               <ArrowRight size={16} className="ml-2" />
//             </Link>
//           </Button>
          
//           {/* Minimum Order Notice */}
//           <div className="mt-4 text-center">
//             <p className="text-xs text-muted-foreground">
//               Minimum order: 1kg • Maximum per variety: 4kg
//             </p>
//             <p className="text-xs text-muted-foreground mt-1">
//               Free shipping on orders of 5kg or more
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// test 2
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Package, Truck, Gift } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalQuantity } = useCart();

  // Calculate total weight in kg (each item quantity = number of kgs)
  const totalWeight = totalQuantity;
  const shippingCost = totalWeight >= 5 ? 0 : 99;
  
  // Apply bulk discount for large orders
  let discount = 0;
  let discountPercentage = 0;
  if (totalWeight >= 20) {
    discount = totalPrice * 0.10; // 10% discount for 20kg+
    discountPercentage = 10;
  } else if (totalWeight >= 10) {
    discount = totalPrice * 0.05; // 5% discount for 10kg+
    discountPercentage = 5;
  }
  
  const finalTotal = totalPrice - discount + shippingCost;

  if (items.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[50vh] flex-col items-center justify-center px-4 py-20 text-center">
        <ShoppingBag size={64} className="mb-4 text-muted-foreground/30" />
        <h2 className="mb-2 font-display text-2xl font-bold text-foreground">Your cart is empty</h2>
        <p className="mb-6 text-muted-foreground">Add some delicious mangoes to get started!</p>
        <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all">
          <Link to="/products">Browse Mangoes</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AnimatePresence>
            {items.map(({ product, quantity }) => (
              <motion.div
                key={product.id}
                layout
                exit={{ opacity: 0, x: -100 }}
                className="mb-4 flex gap-4 rounded-xl bg-card p-4 shadow-card"
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-24 w-24 rounded-lg object-cover" 
                />
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <Link 
                      to={`/product/${product.id}`} 
                      className="font-display font-semibold text-foreground hover:text-primary"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.weight}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{product.price}/kg
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center rounded-lg border border-border">
                      <button 
                        onClick={() => updateQuantity(product.id, quantity - 1)} 
                        className="p-1.5 hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center text-sm font-medium">{quantity} kg</span>
                      <button 
                        onClick={() => updateQuantity(product.id, quantity + 1)} 
                        className="p-1.5 hover:bg-muted"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="font-bold text-foreground">₹{product.price * quantity}</span>
                    <button 
                      onClick={() => removeFromCart(product.id)} 
                      className="text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* No Quantity Limit Notice */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <Package size={16} />
              <span>📦 No Quantity Limits! Order as much as you want!</span>
            </p>
            <p className="text-xs text-blue-700 mt-1">
              💡 Bulk orders get special discounts: 10kg+ = 5% off, 20kg+ = 10% off
            </p>
          </div>

          {/* Show total weight breakdown */}
          <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <h4 className="text-sm font-semibold text-green-800 mb-2">Order Breakdown:</h4>
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="text-xs text-green-700 flex justify-between mb-1">
                <span>{product.name}:</span>
                <span>{quantity}kg</span>
              </div>
            ))}
            <div className="border-t border-green-200 mt-2 pt-2 flex justify-between font-semibold text-green-800">
              <span>Total Weight:</span>
              <span className="text-lg font-bold">{totalWeight}kg</span>
            </div>
            {totalWeight < 5 && (
              <p className="text-xs text-green-600 mt-2">
                Need {5 - totalWeight}kg more for free shipping!
              </p>
            )}
            {totalWeight >= 5 && totalWeight < 10 && (
              <p className="text-xs text-green-600 mt-2">
                ✨ Free Shipping Applied! Add {10 - totalWeight}kg more for 5% discount!
              </p>
            )}
            {totalWeight >= 10 && totalWeight < 20 && (
              <p className="text-xs text-green-600 mt-2">
                ✨ 5% Discount + Free Shipping! Add {20 - totalWeight}kg more for 10% discount!
              </p>
            )}
            {totalWeight >= 20 && (
              <p className="text-xs text-green-600 mt-2 font-bold">
                ✨ 10% Discount + Free Shipping Applied! Maximum Savings! ✨
              </p>
            )}
          </div>
        </div>

        <div className="h-fit rounded-xl bg-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
          
          {/* Total Weight */}
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Package size={14} />
              Total Weight
            </span>
            <span className="font-bold text-xl text-foreground">{totalWeight} kg</span>
          </div>
          
          {/* Subtotal */}
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">₹{totalPrice}</span>
          </div>
          
          {/* Bulk Discount */}
          {discount > 0 && (
            <div className="mb-3 flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-1">
                <Gift size={14} />
                Bulk Discount ({discountPercentage}%)
              </span>
              <span className="font-medium text-green-600">-₹{Math.round(discount)}</span>
            </div>
          )}
          
          {/* Shipping */}
          <div className="mb-3 flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-1">
              <Truck size={14} />
              Shipping
            </span>
            <span className={`font-medium ${totalWeight >= 5 ? 'text-green-600 font-bold' : 'text-muted-foreground'}`}>
              {totalWeight >= 5 ? "FREE" : "₹99"}
            </span>
          </div>
          
          {/* Free Shipping Progress */}
          {totalWeight < 5 && (
            <div className="mb-4 p-3 bg-orange-50 rounded-lg">
              <p className="text-xs text-orange-700 mb-2 flex items-center gap-1">
                <Gift size={12} />
                Add {5 - totalWeight}kg more for FREE shipping!
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${(totalWeight / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-orange-600 mt-1">
                {totalWeight}/5kg towards free shipping
              </p>
            </div>
          )}
          
          {/* 5% Discount Progress */}
          {totalWeight >= 5 && totalWeight < 10 && (
            <div className="mb-4 p-3 bg-purple-50 rounded-lg">
              <p className="text-xs text-purple-700 mb-2 flex items-center gap-1">
                <Gift size={12} />
                Add {10 - totalWeight}kg more for 5% DISCOUNT!
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${((totalWeight - 5) / 5) * 100}%` }}
                />
              </div>
              <p className="text-xs text-purple-600 mt-1">
                {totalWeight - 5}/5kg towards 5% discount
              </p>
            </div>
          )}
          
          {/* 10% Discount Progress */}
          {totalWeight >= 10 && totalWeight < 20 && (
            <div className="mb-4 p-3 bg-pink-50 rounded-lg">
              <p className="text-xs text-pink-700 mb-2 flex items-center gap-1">
                <Gift size={12} />
                Add {20 - totalWeight}kg more for 10% DISCOUNT!
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-pink-600 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${((totalWeight - 10) / 10) * 100}%` }}
                />
              </div>
              <p className="text-xs text-pink-600 mt-1">
                {totalWeight - 10}/10kg towards 10% discount
              </p>
            </div>
          )}
          
          {/* Free Shipping Achieved */}
          {totalWeight >= 5 && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-xs text-green-700 flex items-center gap-2">
                <Truck size={14} />
                <span className="font-semibold">✨ Free Shipping Applied! ✨</span>
              </p>
            </div>
          )}
          
          <div className="my-4 border-t border-border" />
          
          {/* Total */}
          <div className="mb-6 flex justify-between items-center">
            <span className="font-display font-semibold text-foreground">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">₹{Math.round(finalTotal)}</span>
              {shippingCost > 0 && (
                <p className="text-xs text-muted-foreground mt-1">(Including ₹99 shipping)</p>
              )}
              {totalWeight >= 5 && (
                <p className="text-xs text-green-600 mt-1">✨ Free Shipping Included ✨</p>
              )}
              {discount > 0 && (
                <p className="text-xs text-green-600 mt-1">✨ {discountPercentage}% Bulk Discount Applied ✨</p>
              )}
            </div>
          </div>
          
          {/* Checkout Button */}
          <Button 
            asChild 
            size="lg" 
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Link to="/checkout">
              Proceed to Checkout 
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
          
          {/* Bulk Order Benefits */}
          <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
            <p className="text-xs font-semibold text-orange-800 mb-2">🎁 Bulk Order Benefits:</p>
            <div className="space-y-1 text-xs text-orange-700">
              <p>✓ 5kg+ : Free Shipping</p>
              <p>✓ 10kg+ : Free Shipping + 5% Discount</p>
              <p>✓ 20kg+ : Free Shipping + 10% Discount</p>
            </div>
            <p className="text-xs text-orange-600 mt-2 font-medium">
              💰 The more you buy, the more you save!
            </p>
          </div>
          
          {/* Minimum Order Notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-muted-foreground">
              Minimum order: 1kg per variety • No maximum limit!
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Free shipping on orders of 5kg or more
            </p>
            <p className="text-xs text-green-600 mt-2 font-medium">
              🥭 Order in bulk and enjoy amazing discounts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
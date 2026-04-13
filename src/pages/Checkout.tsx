// import { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { toast } from "sonner";
// import { ArrowLeft, CheckCircle } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// const Checkout = () => {
//   const { items, totalPrice, clearCart } = useCart();
//   const navigate = useNavigate();
//   const [placed, setPlaced] = useState(false);
//   const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });

//   const shipping = totalPrice >= 999 ? 0 : 99;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     setPlaced(true);
//     clearCart();
//   };

//   if (items.length === 0 && !placed) {
//     navigate("/cart");
//     return null;
//   }

//   return (
//     <div className="container mx-auto px-4 py-10">
//       <AnimatePresence mode="wait">
//         {placed ? (
//           <motion.div
//             key="success"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="flex min-h-[50vh] flex-col items-center justify-center text-center"
//           >
//             <CheckCircle size={72} className="mb-4 text-secondary" />
//             <h2 className="mb-2 font-display text-3xl font-bold text-foreground">Order Placed!</h2>
//             <p className="mb-6 text-muted-foreground">Thank you for your order. Your fresh mangoes are on the way! 🥭</p>
//             <Button asChild className="bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//               <Link to="/">Continue Shopping</Link>
//             </Button>
//           </motion.div>
//         ) : (
//           <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//             <Link to="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
//               <ArrowLeft size={16} /> Back to Cart
//             </Link>
//             <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Checkout</h1>

//             <div className="grid gap-8 lg:grid-cols-3">
//               <form onSubmit={handleSubmit} className="space-y-4 lg:col-span-2">
//                 <h3 className="font-display text-lg font-semibold text-foreground">Shipping Details</h3>
//                 <div className="grid gap-4 sm:grid-cols-2">
//                   <div><Label htmlFor="name">Full Name</Label><Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
//                   <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
//                   <div><Label htmlFor="phone">Phone</Label><Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
//                   <div><Label htmlFor="city">City</Label><Input id="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
//                 </div>
//                 <div><Label htmlFor="address">Address</Label><Input id="address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
//                 <div className="w-40"><Label htmlFor="pincode">PIN Code</Label><Input id="pincode" value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} /></div>
//                 <Button type="submit" size="lg" className="bg-primary text-primary-foreground shadow-mango hover:bg-mango-deep">
//                   Place Order
//                 </Button>
//               </form>

//               <div className="h-fit rounded-xl bg-card p-6 shadow-card">
//                 <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
//                 {items.map(({ product, quantity }) => (
//                   <div key={product.id} className="mb-2 flex justify-between text-sm">
//                     <span className="text-muted-foreground">{product.name} × {quantity}</span>
//                     <span className="font-medium text-foreground">₹{product.price * quantity}</span>
//                   </div>
//                 ))}
//                 <div className="my-3 border-t border-border" />
//                 <div className="mb-2 flex justify-between text-sm">
//                   <span className="text-muted-foreground">Shipping</span>
//                   <span className="font-medium text-secondary">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="font-display font-semibold">Total</span>
//                   <span className="text-xl font-bold text-foreground">₹{totalPrice + shipping}</span>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Checkout;





// src/pages/Checkout.tsx
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, CreditCard, Truck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { orderAPI, paymentAPI } from "@/services/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const Checkout = () => {
  const { items, totalPrice, totalQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [placed, setPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  //const [paymentMethod, setPaymentMethod] = useState<"COD" | "RAZORPAY">("RAZORPAY");
 const [paymentMethod, setPaymentMethod] = useState<"COD" | "RAZORPAY">("COD");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
  });

  // Calculate discounts
  let discount = 0;
  let discountPercentage = 0;
  if (totalQuantity >= 20) {
    discount = totalPrice * 0.10;
    discountPercentage = 10;
  } else if (totalQuantity >= 10) {
    discount = totalPrice * 0.05;
    discountPercentage = 5;
  }

  const shippingCost = totalQuantity >= 5 ? 0 : 99;
  const finalTotal = totalPrice - discount + shippingCost;

  useEffect(() => {
    if (user) {
      setForm(prev => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [user]);

  if (items.length === 0 && !placed) {
    navigate("/cart");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleRazorpayPayment = async (orderData: any) => {
    try {
      const razorpayKeyResponse = await paymentAPI.getRazorpayKey();
      const razorpayKey = razorpayKeyResponse.data.key;

      const orderResponse = await paymentAPI.createOrder(finalTotal);
      const razorpayOrder = orderResponse.data;

      const options = {
        key: razorpayKey,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Go-Mango",
        description: `Order #${orderData._id}`,
        order_id: razorpayOrder.id,
        handler: async (response: any) => {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            orderId: orderData._id,
          };

          try {
            const verifyResponse = await paymentAPI.verifyPayment(verificationData);
            if (verifyResponse.data.success) {
              toast.success("Payment successful! Order placed.");
              setOrderId(orderData._id);
              setPlaced(true);
              clearCart();
            }
          } catch (error: any) {
            toast.error(error.response?.data?.message || "Payment verification failed");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#16a34a",
        },
        modal: {
          ondismiss: () => {
            toast.error("Payment cancelled");
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error: any) {
      console.error("Razorpay error:", error);
      toast.error(error.response?.data?.message || "Failed to initialize payment");
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.name || !form.email || !form.phone || !form.address || !form.city || !form.pincode) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        shippingAddress: {
          street: form.address,
          city: form.city,
          state: form.state || "Maharashtra",
          pincode: form.pincode,
          country: form.country,
          phone: form.phone,
        },
        paymentMethod: paymentMethod === "COD" ? "COD" : "Razorpay",
        totalWeight: totalQuantity,
        subtotal: totalPrice,
        discount: discount,
        shippingCost: shippingCost,
        totalPrice: finalTotal,
      };

      const orderResponse = await orderAPI.createOrder(orderData);
      const createdOrder = orderResponse.data;

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        setOrderId(createdOrder._id);
        setPlaced(true);
        clearCart();
      } else {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          toast.error("Failed to load payment gateway. Please refresh and try again.");
          setLoading(false);
          return;
        }
        await handleRazorpayPayment(createdOrder);
      }
    } catch (error: any) {
      console.error("Order creation error:", error);
      toast.error(error.response?.data?.message || "Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (placed) {
    return (
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex min-h-[50vh] flex-col items-center justify-center text-center"
        >
          <CheckCircle size={72} className="mb-4 text-green-500" />
          <h2 className="mb-2 font-display text-3xl font-bold text-foreground">Order Placed Successfully!</h2>
          <p className="mb-2 text-muted-foreground">Order ID: #{orderId}</p>
          <p className="mb-6 text-muted-foreground">
            Thank you for your order. Your fresh mangoes are on the way! 🥭
          </p>
          <div className="flex gap-4">
            <Button asChild className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <Link to="/">Continue Shopping</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/orders">View Orders</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/cart" className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Back to Cart
      </Link>
      <h1 className="mb-8 font-display text-3xl font-bold text-foreground">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-2">
          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Shipping Details</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" value={form.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" name="email" type="email" value={form.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input id="phone" name="phone" value={form.phone} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="city">City *</Label>
                <Input id="city" name="city" value={form.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={form.state} onChange={handleInputChange} />
              </div>
              <div>
                <Label htmlFor="pincode">PIN Code *</Label>
                <Input id="pincode" name="pincode" value={form.pincode} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="mt-4">
              <Label htmlFor="address">Address *</Label>
              <Input id="address" name="address" value={form.address} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="rounded-xl bg-card p-6 shadow-card">
            <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Payment Method</h3>
            <div className="space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted/50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="RAZORPAY"
                  checked={paymentMethod === "RAZORPAY"}
                  onChange={() => setPaymentMethod("RAZORPAY")}
                  className="h-4 w-4 text-green-600"
                />
                <CreditCard size={20} />
                <div>
                  <p className="font-medium">Razorpay (Card/UPI/NetBanking)</p>
                  <p className="text-xs text-muted-foreground">Pay securely via credit/debit card, UPI, or netbanking</p>
                </div>
              </label>
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 hover:bg-muted/50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === "COD"}
                  onChange={() => setPaymentMethod("COD")}
                  className="h-4 w-4 text-green-600"
                />
                <Truck size={20} />
                <div>
                  <p className="font-medium">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive your order</p>
                </div>
              </label>
            </div>
          </div>

          <Button 
            type="submit" 
            size="lg" 
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg hover:shadow-xl transition-all"
          >
            {loading ? "Processing..." : `Place Order • ₹${Math.round(finalTotal)}`}
          </Button>
        </form>

        <div className="h-fit rounded-xl bg-card p-6 shadow-card">
          <h3 className="mb-4 font-display text-lg font-semibold text-foreground">Order Summary</h3>
          
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">{product.name} × {quantity}kg</span>
              <span className="font-medium text-foreground">₹{product.price * quantity}</span>
            </div>
          ))}
          
          <div className="my-3 border-t border-border" />
          
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Total Weight</span>
            <span className="font-medium text-foreground">{totalQuantity}kg</span>
          </div>
          
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium text-foreground">₹{totalPrice}</span>
          </div>
          
          {discount > 0 && (
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Discount ({discountPercentage}%)</span>
              <span className="font-medium text-green-600">-₹{Math.round(discount)}</span>
            </div>
          )}
          
          <div className="mb-2 flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className={`font-medium ${shippingCost === 0 ? 'text-green-600' : ''}`}>
              {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
            </span>
          </div>
          
          <div className="my-4 border-t border-border" />
          
          <div className="flex justify-between items-center">
            <span className="font-display font-semibold text-foreground">Total</span>
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">₹{Math.round(finalTotal)}</span>
              {paymentMethod === "COD" && (
                <p className="text-xs text-muted-foreground">Pay on delivery</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
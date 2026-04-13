// src/pages/OrderDetail.tsx
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { orderAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ArrowLeft, Package, Truck, CheckCircle, XCircle, MapPin, Calendar, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

interface OrderItem {
  product: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  _id: string;
  orderDate: string;
  totalPrice: number;
  subtotal: number;
  discount: number;
  shippingCost: number;
  totalWeight: number;
  status: string;
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  paymentMethod: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
    phone: string;
  };
  orderItems: OrderItem[];
}

const OrderDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (id) {
      fetchOrder();
    }
  }, [id, user]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getOrderById(id!);
      setOrder(response.data);
    } catch (error: any) {
      console.error("Failed to fetch order:", error);
      toast.error(error.response?.data?.message || "Failed to load order");
      navigate('/orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (!order) return null;
    
    if (order.isDelivered) {
      return { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "DELIVERED" };
    }
    if (order.status === 'cancelled') {
      return { color: "bg-red-100 text-red-800", icon: XCircle, text: "CANCELLED" };
    }
    if (order.isPaid) {
      return { color: "bg-blue-100 text-blue-800", icon: Truck, text: "PROCESSING" };
    }
    return { color: "bg-yellow-100 text-yellow-800", icon: Package, text: "PENDING" };
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading order details...</p>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  const statusInfo = getStatusBadge();
  const StatusIcon = statusInfo?.icon;

  return (
    <div className="container mx-auto px-4 py-10">
      <Link to="/orders" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft size={20} />
        Back to Orders
      </Link>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h1 className="text-2xl font-bold mb-2">Order #{order._id.slice(-8).toUpperCase()}</h1>
                <p className="text-gray-600 flex items-center gap-2">
                  <Calendar size={16} />
                  {new Date(order.orderDate).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              {statusInfo && (
                <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                  <StatusIcon size={16} />
                  {statusInfo.text}
                </span>
              )}
            </div>
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, idx) => (
                <div key={idx} className="flex gap-4 py-3 border-b last:border-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}kg</p>
                    <p className="text-sm text-gray-600">Price: ₹{item.price}/kg</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">₹{item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <MapPin size={20} />
              Shipping Address
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
              <p>PIN Code: {order.shippingAddress.pincode}</p>
              <p>Country: {order.shippingAddress.country}</p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </motion.div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-20"
          >
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Total Weight</span>
                <span className="font-medium">{order.totalWeight}kg</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount</span>
                  <span className="font-medium text-green-600">-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{order.shippingCost === 0 ? "FREE" : `₹${order.shippingCost}`}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-green-600">₹{order.totalPrice}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <CreditCard size={16} />
                <span>Payment Method: {order.paymentMethod}</span>
              </div>
              {order.isPaid && order.paidAt && (
                <p className="text-sm text-green-600">
                  Paid on: {new Date(order.paidAt).toLocaleDateString()}
                </p>
              )}
              {order.isDelivered && order.deliveredAt && (
                <p className="text-sm text-green-600 mt-1">
                  Delivered on: {new Date(order.deliveredAt).toLocaleDateString()}
                </p>
              )}
            </div>

            {order.status === 'pending' && !order.isPaid && (
              <Button 
                className="w-full mt-4 bg-red-600 hover:bg-red-700"
                onClick={async () => {
                  try {
                    await orderAPI.cancelOrder(order._id);
                    toast.success("Order cancelled successfully");
                    fetchOrder();
                  } catch (error: any) {
                    toast.error(error.response?.data?.message || "Failed to cancel order");
                  }
                }}
              >
                Cancel Order
              </Button>
            )}

            <Button asChild className="w-full mt-3 bg-gradient-to-r from-green-600 to-green-700">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
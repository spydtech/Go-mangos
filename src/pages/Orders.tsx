// src/pages/Orders.tsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { orderAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Package, Eye, Truck, CheckCircle, XCircle } from "lucide-react";
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
  status: string;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethod: string;
  orderItems: OrderItem[];
}

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getMyOrders();
      setOrders(response.data);
    } catch (error: any) {
      console.error("Failed to fetch orders:", error);
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string, isPaid: boolean, isDelivered: boolean) => {
    if (isDelivered) {
      return { color: "bg-green-100 text-green-800", icon: CheckCircle, text: "DELIVERED" };
    }
    if (status === 'cancelled') {
      return { color: "bg-red-100 text-red-800", icon: XCircle, text: "CANCELLED" };
    }
    if (isPaid) {
      return { color: "bg-blue-100 text-blue-800", icon: Truck, text: "PROCESSING" };
    }
    return { color: "bg-yellow-100 text-yellow-800", icon: Package, text: "PENDING" };
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">Please Login to View Orders</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to see your order history.</p>
        <Button asChild className="bg-gradient-to-r from-green-600 to-green-700">
          <Link to="/login">Login Now</Link>
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading your orders...</p>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <Package size={64} className="mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
        <p className="text-gray-600 mb-6">Start shopping to see your orders here!</p>
        <Button asChild className="bg-gradient-to-r from-green-600 to-green-700">
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order) => {
          const statusInfo = getStatusBadge(order.status, order.isPaid, order.isDelivered);
          const StatusIcon = statusInfo.icon;
          
          return (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order #{order._id.slice(-8).toUpperCase()}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.orderDate).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Payment: {order.paymentMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusInfo.color}`}>
                      <StatusIcon size={12} />
                      {statusInfo.text}
                    </span>
                    <p className="text-2xl font-bold mt-2 text-green-600">₹{order.totalPrice}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="space-y-2">
                    {order.orderItems.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span>{item.name} × {item.quantity}kg</span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                    {order.orderItems.length > 3 && (
                      <p className="text-sm text-gray-500">
                        +{order.orderItems.length - 3} more items
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <Button asChild variant="outline" size="sm">
                    <Link to={`/orders/${order._id}`}>
                      <Eye size={16} className="mr-2" />
                      View Details
                    </Link>
                  </Button>
                  {order.status === 'pending' && !order.isPaid && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                      onClick={async () => {
                        try {
                          await orderAPI.cancelOrder(order._id);
                          toast.success("Order cancelled successfully");
                          fetchOrders();
                        } catch (error: any) {
                          toast.error(error.response?.data?.message || "Failed to cancel order");
                        }
                      }}
                    >
                      <XCircle size={16} className="mr-2" />
                      Cancel Order
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
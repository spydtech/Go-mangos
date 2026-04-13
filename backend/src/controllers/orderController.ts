import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/authMiddleware';

// Helper function to calculate discount based on weight
const calculateDiscount = (totalWeight: number, subtotal: number) => {
  if (totalWeight >= 20) {
    return { percent: 10, amount: subtotal * 0.10 };
  } else if (totalWeight >= 10) {
    return { percent: 5, amount: subtotal * 0.05 };
  }
  return { percent: 0, amount: 0 };
};

// Helper function to calculate shipping cost
const calculateShipping = (totalWeight: number) => {
  return totalWeight >= 5 ? 0 : 99;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      shippingAddress,
      paymentMethod,
      totalWeight,
      subtotal,
      discount,
      shippingCost,
      totalPrice,
    } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user?._id });
    
    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    // Calculate discounts (use provided or calculate)
    let finalDiscount = discount;
    let discountPercent = 0;
    
    if (!finalDiscount) {
      const discountInfo = calculateDiscount(totalWeight, subtotal);
      finalDiscount = discountInfo.amount;
      discountPercent = discountInfo.percent;
    } else {
      discountPercent = totalWeight >= 20 ? 10 : (totalWeight >= 10 ? 5 : 0);
    }

    const finalShipping = shippingCost !== undefined ? shippingCost : calculateShipping(totalWeight);
    const finalTotal = totalPrice || (subtotal - finalDiscount + finalShipping);

    // Create order items from cart - Access fields directly from item
    const orderItems = cart.items.map((item) => ({
      productId: item.productId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image: item.image,
    }));

    // Normalize payment method to uppercase for enum
    const normalizedPaymentMethod = paymentMethod === 'Razorpay' ? 'RAZORPAY' : paymentMethod;

    // Create order
    const order = await Order.create({
      user: req.user?._id,
      orderItems,
      shippingAddress,
      paymentMethod: normalizedPaymentMethod,
      subtotal,
      discount: finalDiscount,
      discountPercent,
      shippingCost: finalShipping,
      totalPrice: finalTotal,
      totalWeight,
      isPaid: paymentMethod === 'COD' ? false : false,
      status: 'pending',
    });

    // Don't clear cart immediately - wait for payment confirmation
    // For COD, clear cart immediately
    if (paymentMethod === 'COD') {
      cart.items = [];
      cart.totalPrice = 0;
      cart.totalQuantity = 0;
      await cart.save();
    }

    const populatedOrder = await Order.findById(order._id).populate('user', 'name email phone');

    res.status(201).json({
      success: true,
      order: populatedOrder,
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email phone');

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Check if order belongs to user or user is admin
    if (order.user._id.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    res.json(order);
  } catch (error: any) {
    console.error('Get order error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user?._id })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    console.error('Get my orders error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
export const updateOrderToPaid = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.status = 'processing';
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    order.razorpayPaymentId = req.body.razorpayPaymentId;
    order.razorpaySignature = req.body.razorpaySignature;

    const updatedOrder = await order.save();

    // Clear cart after successful payment
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      cart.totalQuantity = 0;
      await cart.save();
    }

    res.json(updatedOrder);
  } catch (error: any) {
    console.error('Update order to paid error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private
export const cancelOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      res.status(404).json({ message: 'Order not found' });
      return;
    }

    // Check ownership
    if (order.user.toString() !== req.user?._id?.toString() && req.user?.role !== 'admin') {
      res.status(403).json({ message: 'Not authorized' });
      return;
    }

    // Check if order can be cancelled
    if (order.status !== 'pending') {
      res.status(400).json({ message: 'Order cannot be cancelled at this stage' });
      return;
    }

    order.status = 'cancelled';
    await order.save();

    res.json({ message: 'Order cancelled successfully', order });
  } catch (error: any) {
    console.error('Cancel order error:', error);
    res.status(500).json({ message: error.message });
  }
};
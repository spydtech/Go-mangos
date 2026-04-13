// import { Request, Response } from 'express';
// import { razorpay, verifyPaymentSignature } from '../config/razorpay.js';
// import crypto from 'crypto';
// import Order from '../models/Order.js';
// import { AuthRequest } from '../middleware/authMiddleware.js';

// // Get Razorpay API Key
// export const getRazorpayKey = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     res.json({ 
//       key: process.env.RAZORPAY_KEY_ID,
//       success: true 
//     });
//   } catch (error: any) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// // Create Razorpay Order
// export const createRazorpayOrder = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { amount, currency = 'INR' } = req.body;

//     if (!amount || amount <= 0) {
//       res.status(400).json({ 
//         success: false, 
//         message: 'Invalid amount' 
//       });
//       return;
//     }

//     const options = {
//       amount: Math.round(amount * 100),
//       currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         userId: req.user._id.toString(),
//         orderDate: new Date().toISOString(),
//       },
//     };

//     const order = await razorpay.orders.create(options);

//     res.json({
//       success: true,
//       id: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error('Razorpay order creation error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to create Razorpay order' 
//     });
//   }
// };

// // Verify Razorpay Payment
// export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       orderId,
//     } = req.body;

//     if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
//       res.status(400).json({ 
//         success: false, 
//         message: 'Missing required payment details' 
//       });
//       return;
//     }

//     const isAuthentic = verifyPaymentSignature(
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature
//     );

//     if (!isAuthentic) {
//       res.status(400).json({ 
//         success: false, 
//         message: 'Invalid payment signature' 
//       });
//       return;
//     }

//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       res.status(404).json({ 
//         success: false, 
//         message: 'Order not found' 
//       });
//       return;
//     }

//     order.isPaid = true;
//     order.paidAt = new Date();
//     order.razorpayOrderId = razorpay_order_id;
//     order.razorpayPaymentId = razorpay_payment_id;
//     order.paymentResult = {
//       id: razorpay_payment_id,
//       status: 'completed',
//       update_time: new Date().toISOString(),
//       email_address: req.user?.email || '',
//     };
    
//     if (order.status === 'pending') {
//       order.status = 'processing';
//     }
    
//     await order.save();

//     res.json({
//       success: true,
//       message: 'Payment verified successfully',
//       orderId: order._id,
//     });
//   } catch (error: any) {
//     console.error('Payment verification error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: error.message || 'Failed to verify payment' 
//     });
//   }
// };

// // Get payment status
// export const getPaymentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const { orderId } = req.params;
    
//     const order = await Order.findById(orderId);
    
//     if (!order) {
//       res.status(404).json({ 
//         success: false, 
//         message: 'Order not found' 
//       });
//       return;
//     }
    
//     if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
//       res.status(403).json({ 
//         success: false, 
//         message: 'Not authorized' 
//       });
//       return;
//     }
    
//     res.json({
//       success: true,
//       isPaid: order.isPaid,
//       paidAt: order.paidAt,
//       paymentMethod: order.paymentMethod,
//       razorpayPaymentId: order.razorpayPaymentId,
//     });
//   } catch (error: any) {
//     res.status(500).json({ 
//       success: false, 
//       message: error.message 
//     });
//   }
// };

// // Webhook for Razorpay
// export const razorpayWebhook = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const event = req.body;
    
//     switch (event.event) {
//       case 'payment.captured':
//         const paymentId = event.payload.payment.entity.id;
//         const orderId = event.payload.payment.entity.order_id;
        
//         const order = await Order.findOne({ razorpayOrderId: orderId });
//         if (order && !order.isPaid) {
//           order.isPaid = true;
//           order.paidAt = new Date();
//           order.razorpayPaymentId = paymentId;
//           await order.save();
//         }
//         break;
        
//       case 'payment.failed':
//         console.log('Payment failed:', event.payload.payment.entity);
//         break;
//     }
    
//     res.json({ received: true });
//   } catch (error: any) {
//     console.error('Webhook error:', error);
//     res.status(500).json({ message: error.message });
//   }
// };




import { Request, Response } from 'express';
import { razorpay, verifyPaymentSignature, createRazorpayOrderHelper } from '../config/razorpay.js';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { AuthRequest } from '../middleware/authMiddleware.js';

// Get Razorpay API Key
export const getRazorpayKey = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    
    if (!keyId) {
      res.status(500).json({ 
        success: false, 
        message: 'Razorpay is not configured. Please contact support.' 
      });
      return;
    }
    
    res.json({ 
      key: keyId,
      success: true 
    });
  } catch (error: any) {
    console.error('Get Razorpay key error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Create Razorpay Order
export const createRazorpayOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { amount, currency = 'INR' } = req.body;

    console.log('📦 Create Razorpay Order Request:', { amount, currency, userId: req.user?._id });

    if (!amount || amount <= 0) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid amount' 
      });
      return;
    }

    // Check if Razorpay is configured
    if (!razorpay) {
      console.error('Razorpay instance is not initialized');
      res.status(500).json({ 
        success: false, 
        message: 'Payment gateway is not configured. Please use COD for now.' 
      });
      return;
    }

    // Create order using helper
    const order = await createRazorpayOrderHelper(amount, currency, req.user?._id?.toString());

    res.json({
      success: true,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error('Razorpay order creation error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to create Razorpay order. Please try COD.' 
    });
  }
};

// Verify Razorpay Payment
export const verifyPayment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;

    console.log('🔐 Verifying payment:', { razorpay_order_id, razorpay_payment_id, orderId });

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      res.status(400).json({ 
        success: false, 
        message: 'Missing required payment details' 
      });
      return;
    }

    const isAuthentic = verifyPaymentSignature(
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature
    );

    if (!isAuthentic) {
      res.status(400).json({ 
        success: false, 
        message: 'Invalid payment signature' 
      });
      return;
    }

    const order = await Order.findById(orderId);
    
    if (!order) {
      res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
      return;
    }

    order.isPaid = true;
    order.paidAt = new Date();
    order.razorpayOrderId = razorpay_order_id;
    order.razorpayPaymentId = razorpay_payment_id;
    order.razorpaySignature = razorpay_signature;
    order.paymentResult = {
      id: razorpay_payment_id,
      status: 'completed',
      update_time: new Date().toISOString(),
      email_address: req.user?.email || '',
    };
    
    if (order.status === 'pending') {
      order.status = 'processing';
    }
    
    await order.save();

    // Clear cart after successful payment
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      cart.totalQuantity = 0;
      await cart.save();
      console.log('Cart cleared after successful payment');
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      orderId: order._id,
    });
  } catch (error: any) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to verify payment' 
    });
  }
};

// Get payment status
export const getPaymentStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { orderId } = req.params;
    
    const order = await Order.findById(orderId);
    
    if (!order) {
      res.status(404).json({ 
        success: false, 
        message: 'Order not found' 
      });
      return;
    }
    
    if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      res.status(403).json({ 
        success: false, 
        message: 'Not authorized' 
      });
      return;
    }
    
    res.json({
      success: true,
      isPaid: order.isPaid,
      paidAt: order.paidAt,
      paymentMethod: order.paymentMethod,
      razorpayPaymentId: order.razorpayPaymentId,
    });
  } catch (error: any) {
    console.error('Get payment status error:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// Webhook for Razorpay
export const razorpayWebhook = async (req: Request, res: Response): Promise<void> => {
  try {
    const event = req.body;
    console.log('Webhook received:', event.event);
    
    switch (event.event) {
      case 'payment.captured':
        const paymentId = event.payload.payment.entity.id;
        const orderId = event.payload.payment.entity.order_id;
        
        const order = await Order.findOne({ razorpayOrderId: orderId });
        if (order && !order.isPaid) {
          order.isPaid = true;
          order.paidAt = new Date();
          order.razorpayPaymentId = paymentId;
          await order.save();
          console.log(`✅ Payment captured for order: ${orderId}`);
        }
        break;
        
      case 'payment.failed':
        console.log('❌ Payment failed:', event.payload.payment.entity);
        break;
    }
    
    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook error:', error);
    res.status(500).json({ message: error.message });
  }
};
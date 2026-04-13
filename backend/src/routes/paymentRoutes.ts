import express from 'express';
import {
  getRazorpayKey,
  createRazorpayOrder,
  verifyPayment,
  getPaymentStatus,
  razorpayWebhook,
} from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes (for webhook)
router.post('/webhook', razorpayWebhook);

// Protected routes
router.get('/get-key', protect, getRazorpayKey);
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);
router.get('/status/:orderId', protect, getPaymentStatus);

export default router;
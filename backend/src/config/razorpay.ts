import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

console.log('\n🔧 Initializing Razorpay Configuration...');

// Get and clean keys (remove any whitespace)
const keyId = process.env.RAZORPAY_KEY_ID?.trim();
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

// Debug logging
console.log('📝 Key ID (first 10 chars):', keyId?.substring(0, 10));
console.log('🔑 Key Secret length:', keySecret?.length);
console.log('📌 Environment:', process.env.NODE_ENV);

// Validate keys
if (!keyId || !keySecret) {
  console.error('❌ ERROR: Missing Razorpay credentials in .env file');
  console.error('   Required: RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET');
  console.error('   Get test keys from: https://dashboard.razorpay.com/app/keys');
}

if (keyId && !keyId.startsWith('rzp_')) {
  console.error(`❌ ERROR: Invalid Key ID format!`);
  console.error(`   Should start with "rzp_test_" or "rzp_live_"`);
  console.error(`   Current value: ${keyId}`);
}

// Create Razorpay instance
let razorpayInstance: any = null;

if (keyId && keySecret && keyId.startsWith('rzp_')) {
  try {
    razorpayInstance = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
    
    const mode = keyId.includes('test') ? 'TEST' : 'LIVE';
    console.log(`✅ Razorpay instance created successfully in ${mode} mode`);
    console.log(`💳 Ready to process payments\n`);
  } catch (error: any) {
    console.error('❌ Failed to create Razorpay instance:', error.message);
  }
} else {
  console.error('❌ Razorpay configuration failed');
  console.error('   Please check your .env file and restart the server');
}

export const razorpay = razorpayInstance;

// Verify payment signature
export const verifyPaymentSignature = (
  orderId: string,
  paymentId: string,
  signature: string
): boolean => {
  try {
    if (!keySecret) {
      console.error('Cannot verify signature: Missing Razorpay key secret');
      return false;
    }
    
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(body.toString())
      .digest('hex');
    
    return expectedSignature === signature;
  } catch (error) {
    console.error('Signature verification error:', error);
    return false;
  }
};

// Create Razorpay order
export const createRazorpayOrderHelper = async (amount: number, currency: string = 'INR', userId?: string) => {
  if (!razorpay) {
    throw new Error('Razorpay is not configured. Please check your API keys.');
  }

  try {
    const options = {
      amount: Math.round(amount * 100),
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
      notes: {
        userId: userId || 'unknown',
        orderDate: new Date().toISOString(),
      },
    };

    console.log(`💰 Creating Razorpay order: ₹${amount} (${options.amount} paise)`);
    const order = await razorpay.orders.create(options);
    console.log(`✅ Razorpay order created: ${order.id}`);
    return order;
  } catch (error: any) {
    console.error('Razorpay order error:', {
      statusCode: error.statusCode,
      message: error.message,
      error: error.error
    });
    
    if (error.statusCode === 401) {
      throw new Error('Razorpay authentication failed. Please check your API keys.');
    }
    
    throw new Error(error.error?.description || error.message || 'Failed to create Razorpay order');
  }
};

export default razorpay;


// import Razorpay from 'razorpay';
// import dotenv from 'dotenv';
// import crypto from 'crypto';

// dotenv.config();

// // Validate environment variables
// if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
//   console.error('❌ Razorpay credentials missing in .env file');
//   console.error('Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET to your .env file');
//   process.exit(1);
// }

// // Validate key format
// const keyId = process.env.RAZORPAY_KEY_ID;
// if (!keyId.startsWith('rzp_')) {
//   console.error('❌ Invalid Razorpay Key ID format. Key ID should start with "rzp_"');
//   console.error(`Current key ID: ${keyId}`);
//   process.exit(1);
// }

// // Create Razorpay instance
// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// const mode = keyId.includes('_live_') ? 'LIVE' : 'TEST';
// console.log(`✅ Razorpay configured in ${mode} mode`);
// console.log(`📍 Razorpay Key ID: ${process.env.RAZORPAY_KEY_ID?.substring(0, 15)}...`);

// // Helper function to verify payment signature
// export const verifyPaymentSignature = (
//   orderId: string,
//   paymentId: string,
//   signature: string
// ): boolean => {
//   try {
//     const body = orderId + '|' + paymentId;
//     const expectedSignature = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
//       .update(body.toString())
//       .digest('hex');
    
//     return expectedSignature === signature;
//   } catch (error) {
//     console.error('Signature verification error:', error);
//     return false;
//   }
// };

// // Helper function to create Razorpay order
// export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
//   try {
//     const options = {
//       amount: Math.round(amount * 100), // Convert to paise
//       currency,
//       receipt: `receipt_${Date.now()}`,
//       payment_capture: 1,
//       notes: {
//         orderDate: new Date().toISOString(),
//         environment: process.env.NODE_ENV || 'development',
//       },
//     };

//     const order = await razorpay.orders.create(options);
//     return order;
//   } catch (error: any) {
//     console.error('Razorpay order creation error:', error);
//     throw new Error(error.error?.description || 'Failed to create Razorpay order');
//   }
// };

// export default razorpay;
import axios from 'axios';
import { toast } from 'sonner';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://82.29.161.78:5612:5002/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor — attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle specific cart errors
    if (error.response?.status === 400 && error.response?.data?.message?.includes('product ID')) {
      toast.error('Invalid product. Please refresh the page and try again.');
    } else if (error.response?.status === 401) {
      const isAuthEndpoint =
        error.config.url?.includes('/auth/login') ||
        error.config.url?.includes('/auth/register');

      if (!isAuthEndpoint) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        toast.error('Session expired. Please login again.');
      }
    } else if (error.response?.status === 500) {
      console.error('Server error:', error);
      toast.error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to convert numeric/simple IDs to MongoDB ObjectId format
const convertToObjectId = (id: string): string => {
  // If it's already a valid MongoDB ObjectId (24 hex chars), return as is
  if (/^[0-9a-fA-F]{24}$/.test(id)) {
    return id;
  }
  
  // If it's a numeric ID (like "1", "2", etc.), convert to a deterministic ObjectId
  if (/^\d+$/.test(id)) {
    const numericId = parseInt(id, 10);
    // Create a 24-character hex string from the numeric ID
    const hexString = numericId.toString(16).padStart(24, '0');
    console.log(`Converted numeric ID ${id} to ObjectId: ${hexString}`);
    return hexString;
  }
  
  // For any other string ID, log a warning but return as is
  console.warn(`Unknown ID format: ${id}, sending as is`);
  return id;
};

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const authAPI = {
  register: (userData: any) => api.post('/auth/register', userData),
  login: (credentials: any) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  updateProfile: (userData: any) => api.put('/auth/profile', userData),
};

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const cartAPI = {
  getCart: async () => {
    try {
      const response = await api.get('/cart');
      return response;
    } catch (error: any) {
      if (error.response?.status === 404) {
        return { data: { items: [], totalPrice: 0, totalQuantity: 0 } };
      }
      throw error;
    }
  },

  addToCart: async (productId: string, quantity: number, productData?: any) => {
    // Validate inputs
    if (!productId) throw new Error('Product ID is required');
    if (!quantity || quantity < 1) throw new Error('Valid quantity is required');
    if (!productData) throw new Error('Product data is required');

    console.log('📦 API addToCart:', { productId, quantity, productData });
    
    // Send both productId and productData to backend
    const response = await api.post('/cart', { 
      productId, 
      quantity, 
      productData: {
        name: productData.name,
        price: productData.price,
        image: productData.image,
        variety: productData.variety,
        origin: productData.origin,
      }
    });
    return response;
  },

  updateCartItem: async (productId: string, quantity: number) => {
    if (!productId) throw new Error('Product ID is required');
    if (quantity < 0) throw new Error('Quantity cannot be negative');

    console.log('📦 API updateCartItem:', { productId, quantity });
    const response = await api.put(`/cart/${productId}`, { quantity });
    return response;
  },

  removeFromCart: async (productId: string) => {
    if (!productId) throw new Error('Product ID is required');

    console.log('📦 API removeFromCart:', productId);
    const response = await api.delete(`/cart/${productId}`);
    return response;
  },

  clearCart: async () => {
    const response = await api.delete('/cart');
    return response;
  },
};

// ─── Orders ───────────────────────────────────────────────────────────────────
export const orderAPI = {
  createOrder: (orderData: any) => api.post('/orders', orderData),
  getMyOrders: () => api.get('/orders/myorders'),
  getOrderById: (id: string) => api.get(`/orders/${id}`),
  cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`),
  updateOrderToPaid: (id: string, paymentResult: any) => 
    api.put(`/orders/${id}/pay`, paymentResult),
};

// ─── Payments ─────────────────────────────────────────────────────────────────
export const paymentAPI = {
  getRazorpayKey: () => api.get('/payments/get-key'),
  createOrder: (amount: number) => api.post('/payments/create-order', { amount }),
  verifyPayment: (data: any) => api.post('/payments/verify', data),
};

export default api;

// // src/services/api.ts
// import axios from 'axios';
// import { toast } from 'sonner';

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// const api = axios.create({
//   baseURL: API_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor for error handling
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Don't redirect on login/register endpoints
//       const isAuthEndpoint = error.config.url?.includes('/auth/login') || 
//                             error.config.url?.includes('/auth/register');
      
//       if (!isAuthEndpoint) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//         toast.error('Session expired. Please login again.');
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// // Auth APIs
// export const authAPI = {
//   register: (userData: any) => api.post('/auth/register', userData),
//   login: (credentials: any) => api.post('/auth/login', credentials),
//   getProfile: () => api.get('/auth/profile'),
//   updateProfile: (userData: any) => api.put('/auth/profile', userData),
// };

// // Product APIs
// export const productAPI = {
//   getProducts: (params?: any) => api.get('/products', { params }),
//   getProductById: (id: string) => api.get(`/products/${id}`),
//   getCategories: () => api.get('/products/categories'),
// };

// // Cart APIs
// export const cartAPI = {
//   getCart: () => api.get('/cart'),
//   addToCart: (productId: string, quantity: number) => {
//     console.log('📦 API: addToCart called with:', { productId, quantity });
//     return api.post('/cart', { productId, quantity });
//   },
//   updateCartItem: (productId: string, quantity: number) => {
//     console.log('📦 API: updateCartItem called with:', { productId, quantity });
//     return api.put(`/cart/${productId}`, { quantity });
//   },
//   removeFromCart: (productId: string) => {
//     console.log('📦 API: removeFromCart called with:', productId);
//     return api.delete(`/cart/${productId}`);
//   },
//   clearCart: () => api.delete('/cart'),
// };

// // Order APIs
// export const orderAPI = {
//   createOrder: (orderData: any) => api.post('/orders', orderData),
//   getOrders: () => api.get('/orders'),
//   getOrderById: (id: string) => api.get(`/orders/${id}`),
//   updateOrderStatus: (id: string, status: string) => 
//     api.put(`/orders/${id}/status`, { status }),
//   cancelOrder: (id: string) => api.put(`/orders/${id}/cancel`),
// };

// // Payment APIs
// export const paymentAPI = {
//   getRazorpayKey: () => api.get('/payments/get-key'),
//   createOrder: (amount: number) => api.post('/payments/create-order', { amount }),
//   verifyPayment: (data: any) => api.post('/payments/verify', data),
// };

// export default api;
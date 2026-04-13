import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart';
import { IUser } from '../types';

interface AuthRequest extends Request {
  user?: IUser;
}

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      // Return empty cart if doesn't exist
      res.json({ items: [], totalPrice: 0, totalQuantity: 0 });
      return;
    }

    res.json({
      items: cart.items,
      totalPrice: cart.totalPrice,
      totalQuantity: cart.totalQuantity,
    });
  } catch (error: any) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private
export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity, productData } = req.body;

    if (!productId || !quantity || quantity < 1) {
      res.status(400).json({ message: 'Invalid product ID or quantity' });
      return;
    }

    if (!productData) {
      res.status(400).json({ message: 'Product data is required' });
      return;
    }

    let cart = await Cart.findOne({ user: req.user?._id });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        user: req.user?._id,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
    }

    // Check if item already exists
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item with product data
      cart.items.push({
        productId: productId,
        quantity: quantity,
        price: productData.price,
        name: productData.name,
        image: productData.image,
        variety: productData.variety || '',
        origin: productData.origin || '',
      });
    }

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();

    res.status(200).json({
      message: 'Item added to cart',
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
      },
    });
  } catch (error: any) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private
export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    if (!productId) {
      res.status(400).json({ message: 'Product ID is required' });
      return;
    }

    if (quantity < 0) {
      res.status(400).json({ message: 'Quantity cannot be negative' });
      return;
    }

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId === productId
    );

    if (itemIndex === -1) {
      res.status(404).json({ message: 'Item not found in cart' });
      return;
    }

    if (quantity === 0) {
      // Remove item
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();

    res.json({
      message: quantity === 0 ? 'Item removed from cart' : 'Cart updated',
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
      },
    });
  } catch (error: any) {
    console.error('Update cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user?._id });
    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    // Update totals
    cart.totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    await cart.save();

    res.json({
      message: 'Item removed from cart',
      cart: {
        items: cart.items,
        totalPrice: cart.totalPrice,
        totalQuantity: cart.totalQuantity,
      },
    });
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const cart = await Cart.findOne({ user: req.user?._id });
    if (cart) {
      cart.items = [];
      cart.totalPrice = 0;
      cart.totalQuantity = 0;
      await cart.save();
    }

    res.json({ message: 'Cart cleared successfully' });
  } catch (error: any) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: error.message });
  }
};
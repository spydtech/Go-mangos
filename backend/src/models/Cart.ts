import mongoose from 'mongoose';

export interface ICartItem {
  productId: string;  // Store as string (your frontend ID like "1", "2")
  quantity: number;
  price: number;
  name: string;
  image: string;
  variety?: string;
  origin?: string;
}

export interface ICart {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
  totalQuantity: number;
  updatedAt: Date;
}

const cartItemSchema = new mongoose.Schema<ICartItem>({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  variety: {
    type: String,
  },
  origin: {
    type: String,
  },
});

const cartSchema = new mongoose.Schema<ICart>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    items: [cartItemSchema],
    totalPrice: {
      type: Number,
      default: 0,
    },
    totalQuantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Update totals before saving
cartSchema.pre('save', function(next) {
  this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  next();
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;
// import React, { createContext, useContext, useState, useCallback } from "react";
// import type { Product } from "@/data/products";

// export interface CartItem {
//   product: Product;
//   quantity: number;
// }

// interface CartContextType {
//   items: CartItem[];
//   addToCart: (product: Product, qty?: number) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, qty: number) => void;
//   clearCart: () => void;
//   totalItems: number;
//   totalPrice: number;
// }

// const CartContext = createContext<CartContextType | undefined>(undefined);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [items, setItems] = useState<CartItem[]>([]);

//   const addToCart = useCallback((product: Product, qty = 1) => {
//     setItems((prev) => {
//       const existing = prev.find((i) => i.product.id === product.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.product.id === product.id ? { ...i, quantity: i.quantity + qty } : i
//         );
//       }
//       return [...prev, { product, quantity: qty }];
//     });
//   }, []);

//   const removeFromCart = useCallback((productId: string) => {
//     setItems((prev) => prev.filter((i) => i.product.id !== productId));
//   }, []);

//   const updateQuantity = useCallback((productId: string, qty: number) => {
//     if (qty <= 0) {
//       setItems((prev) => prev.filter((i) => i.product.id !== productId));
//     } else {
//       setItems((prev) =>
//         prev.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i))
//       );
//     }
//   }, []);

//   const clearCart = useCallback(() => setItems([]), []);

//   const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
//   const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

//   return (
//     <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const ctx = useContext(CartContext);
//   if (!ctx) throw new Error("useCart must be used within CartProvider");
//   return ctx;
// };

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/data/products";
import { cartAPI } from "@/services/api";
import { toast } from "sonner";

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  totalPrice: number;
  totalQuantity: number;
  totalItems: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Helper: is user logged in?
const isLoggedIn = () => !!localStorage.getItem("token");

// Helper: get discount info based on total weight
const getDiscountInfo = (totalWeight: number) => {
  if (totalWeight >= 20) return { percent: 10, message: "10% DISCOUNT + FREE SHIPPING" };
  if (totalWeight >= 10) return { percent: 5, message: "5% DISCOUNT + FREE SHIPPING" };
  if (totalWeight >= 5) return { percent: 0, message: "FREE SHIPPING" };
  return { percent: 0, message: "" };
};

const showCartToast = (productName: string, addedQty: number, totalWeight: number) => {
  const { message } = getDiscountInfo(totalWeight);
  if (message) {
    toast.success(`🎉 ${addedQty}kg ${productName} added! Total: ${totalWeight}kg — ${message}!`);
  } else {
    toast.success(
      `${addedQty}kg ${productName} added! Total: ${totalWeight}kg (Need ${5 - totalWeight}kg more for free shipping)`
    );
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart on mount
  useEffect(() => {
    if (isLoggedIn()) {
      fetchCartFromServer();
    } else {
      loadCartFromLocalStorage();
    }
  }, []);

  // Listen for login/logout events
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "token") {
        if (e.newValue) {
          mergeLocalCartToServer();
        } else {
          loadCartFromLocalStorage();
        }
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Persist to localStorage for guests
  useEffect(() => {
    if (!isLoggedIn()) {
      localStorage.setItem("cart", JSON.stringify(items));
    }
  }, [items]);

  const loadCartFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem("cart");
      if (saved) {
        const parsed = JSON.parse(saved);
        setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
    }
  };

  const fetchCartFromServer = async () => {
    setIsLoading(true);
    try {
      const res = await cartAPI.getCart();
      const serverItems = res.data.items || [];
      
      // Transform server items to match frontend Product structure
      const transformedItems = serverItems.map((item: any) => ({
        product: {
          id: item.productId,
          name: item.name,
          price: item.price,
          image: item.image,
          variety: item.variety,
          origin: item.origin,
        },
        quantity: item.quantity,
      }));
      
      setItems(transformedItems);
    } catch (error) {
      console.error("Failed to fetch cart from server:", error);
      loadCartFromLocalStorage();
    } finally {
      setIsLoading(false);
    }
  };

  const mergeLocalCartToServer = async () => {
    const localCart = localStorage.getItem("cart");
    if (!localCart) {
      fetchCartFromServer();
      return;
    }
    
    try {
      const localItems: CartItem[] = JSON.parse(localCart);
      if (localItems.length > 0) {
        setIsLoading(true);
        for (const item of localItems) {
          if (item.product && item.product.id) {
            await cartAPI.addToCart(item.product.id, item.quantity, item.product);
          }
        }
        localStorage.removeItem("cart");
        toast.success("Your cart has been synced!");
      }
      await fetchCartFromServer();
    } catch (error) {
      console.error("Failed to merge local cart:", error);
      fetchCartFromServer();
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (product: Product, quantity: number = 1) => {
    if (!product.id) {
      console.error('Invalid product ID:', product.id);
      toast.error('Invalid product selected. Please refresh the page and try again.');
      return;
    }

    // Optimistic update
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const newItems = existing
        ? prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          )
        : [...prev, { product, quantity }];
      
      const totalWeight = newItems.reduce((s, i) => s + i.quantity, 0);
      showCartToast(product.name, quantity, totalWeight);
      return newItems;
    });

    // Sync with server if logged in
    if (isLoggedIn()) {
      try {
        await cartAPI.addToCart(product.id, quantity, product);
      } catch (error: any) {
        console.error("Failed to add to server cart:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to save cart";
        toast.error(errorMessage);
        // Rollback optimistic update
        setItems((prev) => {
          const existing = prev.find((i) => i.product.id === product.id);
          if (!existing) return prev.filter((i) => i.product.id !== product.id);
          return prev.map((i) =>
            i.product.id === product.id
              ? { ...i, quantity: i.quantity - quantity }
              : i
          );
        });
      }
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity < 1) {
      toast.error("Minimum order is 1kg per variety!");
      return;
    }

    const prevItems = items;
    
    // Optimistic update
    setItems((prev) => {
      const updated = prev.map((i) =>
        i.product.id === productId ? { ...i, quantity } : i
      );
      const totalWeight = updated.reduce((s, i) => s + i.quantity, 0);
      const prevWeight = prev.reduce((s, i) => s + i.quantity, 0);

      if (totalWeight >= 20 && prevWeight < 20) {
        toast.success("🎉 20kg reached! 10% DISCOUNT + FREE SHIPPING unlocked!");
      } else if (totalWeight >= 10 && prevWeight < 10) {
        toast.success("🎉 10kg reached! 5% DISCOUNT + FREE SHIPPING unlocked!");
      } else if (totalWeight >= 5 && prevWeight < 5) {
        toast.success("🎉 FREE shipping unlocked!");
      } else if (totalWeight < 5 && prevWeight >= 5) {
        toast.info(`Total: ${totalWeight}kg. Add ${5 - totalWeight}kg more for free shipping!`);
      }
      return updated;
    });

    // Sync with server if logged in
    if (isLoggedIn()) {
      try {
        await cartAPI.updateCartItem(productId, quantity);
      } catch (error: any) {
        console.error("Failed to update cart on server:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to update cart";
        toast.error(errorMessage);
        setItems(prevItems);
      }
    }
  };

  const removeFromCart = async (productId: string) => {
    const prevItems = items;
    
    // Optimistic update
    setItems((prev) => {
      const newItems = prev.filter((i) => i.product.id !== productId);
      const totalWeight = newItems.reduce((s, i) => s + i.quantity, 0);
      const prevWeight = prev.reduce((s, i) => s + i.quantity, 0);

      if (totalWeight < 5 && prevWeight >= 5) {
        toast.info(`Free shipping removed. Add ${5 - totalWeight}kg more to get it back.`);
      }
      return newItems;
    });

    // Sync with server if logged in
    if (isLoggedIn()) {
      try {
        await cartAPI.removeFromCart(productId);
      } catch (error: any) {
        console.error("Failed to remove from server cart:", error);
        const errorMessage = error.response?.data?.message || error.message || "Failed to remove item";
        toast.error(errorMessage);
        setItems(prevItems);
      }
    }
  };

  const clearCart = async () => {
    const prevItems = items;
    setItems([]);
    toast.success("Cart cleared");

    if (isLoggedIn()) {
      try {
        await cartAPI.clearCart();
      } catch (error) {
        console.error("Failed to clear server cart:", error);
        setItems(prevItems);
        toast.error("Failed to clear cart");
      }
    }
  };

  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        totalQuantity,
        totalItems,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
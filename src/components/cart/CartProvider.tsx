import { useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, CartType } from "./CartContext";
import type { ReactNode } from "react";
import type { Product } from "../../hook/useProducts";

interface CartProviderProps {
  children: ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product, count: number) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, count: i.count + count } : i
        );
      }
      return [...prev, { ...product, count }];
    });
  };

  const updateCount = (id: number, newCount: number) => {
    setItems(prev =>
      prev.map(i => (i.id === id ? { ...i, count: newCount } : i))
    );
  };

  const totalCount = items.reduce((sum, i) => sum + i.count, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.count * i.price, 0);

  const cart: CartType = { items, totalCount, totalPrice, addToCart, updateCount };

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

import { createContext } from "react";
import type { Product } from "../../hook/useProducts";

export type CartItem = Product & { count: number };

export type CartType = {
  items: CartItem[];
  totalCount: number;
  totalPrice: number;
  addToCart: (product: Product, count: number) => void;
  updateCount: (id: number, newCount: number) => void;
};

export const CartContext = createContext<CartType | null>(null);



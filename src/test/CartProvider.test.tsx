// Мок window.matchMedia для Mantine
beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });
});


import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useContext } from "react";
import { CartProvider } from "../components/cart/CartProvider";
import { CartContext } from "../components/cart/CartContext";
import type { Product } from "../hook/useProducts";


function useCartTest() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("CartContext is null");
  return ctx;
}

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const tomato: Product = { id: 1, name: "Tomato", price: 2, image: "t.jpg" };
const cucumber: Product = { id: 2, name: "Cucumber", price: 3, image: "c.jpg" };

describe("CartProvider component", () => {
  it("добавляет товар в корзину", () => {
    const { result } = renderHook(() => useCartTest(), { wrapper });

    act(() => {
      result.current.addToCart(tomato, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].count).toBe(2);
    expect(result.current.totalCount).toBe(2);
    expect(result.current.totalPrice).toBe(4);
  });

  it("увеличивает количество существующего товара", () => {
    const { result } = renderHook(() => useCartTest(), { wrapper });

    act(() => {
      result.current.addToCart(tomato, 1);
      result.current.addToCart(tomato, 3);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].count).toBe(4);
    expect(result.current.totalCount).toBe(4);
    expect(result.current.totalPrice).toBe(8);
  });

  it("обновляет количество товара", () => {
    const { result } = renderHook(() => useCartTest(), { wrapper });

    act(() => {
      result.current.addToCart(cucumber, 5);
      result.current.updateCount(cucumber.id, 2);
    });

    expect(result.current.items[0].count).toBe(2);
    expect(result.current.totalCount).toBe(2);
    expect(result.current.totalPrice).toBe(6);
  });
});

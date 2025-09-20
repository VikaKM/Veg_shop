// Мок window.matchMedia для корректной работы MantineProvider в тестах
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

import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { useCart } from "../hook/useCart";
import { CartContext } from "../components/cart/CartContext";
import type { CartType } from "../components/cart/CartContext";
import type { ReactNode } from "react";


function CartProviderMock({ children }: { children: ReactNode }) {
  const mockCart: CartType = {
    items: [
      { id: 1, name: "Apple", price: 10, image: "apple.png", count: 2 }
    ],
    totalCount: 2,
    totalPrice: 20,
    addToCart: () => {},
    updateCount: () => {},
  };

  return <CartContext.Provider value={mockCart}>{children}</CartContext.Provider>;
}

describe("useCart hook", () => {
  it("возвращает контекст", () => {
    const { result } = renderHook(() => useCart(), { wrapper: CartProviderMock });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].count).toBe(2);
    expect(result.current.totalCount).toBe(2);
    expect(result.current.totalPrice).toBe(20);
  });

it("выбрасывает ошибку", () => {
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used inside CartProvider"
    );
  });
});

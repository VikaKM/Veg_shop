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

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { CartPopupContent } from "../components/popup/CartPopupContent";
import type { CartItem } from "../components/cart/CartContext"; 


const mockUpdateCount = vi.fn();

vi.mock("../hook/useCart", () => ({
  useCart: () => ({
    items: mockItems,
    updateCount: mockUpdateCount,
  }),
}));

const mockItems: CartItem[] = [
  { id: 1, name: "Apple - 1kg", price: 5, count: 2, image: "apple.png" },
  { id: 2, name: "Banana - 2kg", price: 3, count: 3, image: "banana.png" },
];

describe("CartPopupContent component", () => {
  const renderWithMantine = () =>
    render(
      <MantineProvider>
        <CartPopupContent />
      </MantineProvider>
    );

  it("рендерит список товаров и считает итог", () => {
    renderWithMantine();

    expect(screen.getByText("Apple")).toBeInTheDocument();
    expect(screen.getByText("Banana")).toBeInTheDocument();

   
    expect(screen.getByText("$ 19")).toBeInTheDocument();
  });

  it("увеличивает количество при клике на +", () => {
    renderWithMantine();

    const plusButtons = screen.getAllByRole("button", { name: /increase quantity/i });
    fireEvent.click(plusButtons[0]);

    expect(mockUpdateCount).toHaveBeenCalledWith(1, 3);
  });

  it("уменьшает количество при клике на -", () => {
    renderWithMantine();

    const minusButtons = screen.getAllByRole("button", { name: /decrease quantity/i });
    fireEvent.click(minusButtons[1]);

    expect(mockUpdateCount).toHaveBeenCalledWith(2, 2); 
  });
});

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

import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ProductCard } from "../components/productCard/ProductCard";
import { MantineProvider } from "@mantine/core";


const mockAddToCart = vi.fn();
const mockUpdateCount = vi.fn();
vi.mock("../hook/useCart", () => ({
  useCart: () => ({
    items: [],
    addToCart: mockAddToCart,
    updateCount: mockUpdateCount,
  }),
}));

const product = {
  id: 1,
  name: "Tomato - 1kg",
  price: 5,
  image: "tomato.png",
};

describe("ProductCard", () => {
      const renderHeader = () =>
        render(
          <MantineProvider>
            <ProductCard {...product} />
          </MantineProvider>
        );

  it("рендерит все элементы", () => {
    renderHeader();

    expect(screen.getByText("Tomato")).toBeInTheDocument();
    expect(screen.getByText("1kg")).toBeInTheDocument();
    expect(screen.getByText("$ 5")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue("1")).toBeInTheDocument(); 
  });

  it("увеличивает и уменьшает количество через кнопки", () => {
    renderHeader();

    const minusButton = screen.getByRole("button", { name: /decrease quantity/i });
    const plusButton = screen.getByRole("button", { name: /increase quantity/i });
    const input = screen.getByDisplayValue("1") as HTMLInputElement;

    fireEvent.click(plusButton);
    expect(input.value).toBe("2");
    expect(mockUpdateCount).toHaveBeenCalledWith(1, 2);

    fireEvent.click(minusButton);
    expect(input.value).toBe("1");
    expect(mockUpdateCount).toHaveBeenCalledWith(1, 1);

 
    fireEvent.click(minusButton);
    expect(input.value).toBe("1");
  });

  it("вызывает addToCart при клике на кнопку", () => {
    renderHeader();

    const button = screen.getByRole("button", { name: /add to cart/i });
    fireEvent.click(button);

    expect(mockAddToCart).toHaveBeenCalledWith(
      { id: 1, name: "Tomato - 1kg", price: 5, image: "tomato.png" },
      1
    );
  });
});

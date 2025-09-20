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

import { render, screen, fireEvent } from "@testing-library/react";
import CartButton from "../components/cartButton/CartButton";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { CartProvider } from "../components/cart/CartProvider";

vi.mock("../hook/useCart", () => ({
  useCart: vi.fn(),
}));

import { useCart } from "../hook/useCart";

describe("CartButton component", () => {
  const mockedUseCart = useCart as unknown as ReturnType<typeof vi.fn>;

  const renderWithProviders = (onClick?: () => void) =>
    render(
      <MantineProvider>
        <CartProvider>
          <CartButton onClick={onClick} />
        </CartProvider>
      </MantineProvider>
    );

  it("рендерит компонент с правильными данными", () => {
    mockedUseCart.mockReturnValue({ totalCount: 3, totalPrice: 25.5 });

    renderWithProviders();

    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
    expect(screen.getByText("$25.50")).toBeInTheDocument();
  });

  it("вызывает onClick при клике на кнопку", () => {
    mockedUseCart.mockReturnValue({ totalCount: 1, totalPrice: 10 });
    const handleClick = vi.fn();

    renderWithProviders(handleClick);
    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

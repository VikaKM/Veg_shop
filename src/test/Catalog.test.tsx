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

import { render, screen } from "@testing-library/react";
import { Catalog } from "../components/catalog/Catalog";
import type { Product } from "../hook/useProducts";
import { describe, it, expect, vi } from "vitest";
import { MantineProvider } from "@mantine/core";
import { CartProvider } from "../components/cart/CartProvider";

vi.mock("../hook/useProducts");
import { useProducts } from "../hook/useProducts";


const mockedUseProducts = useProducts as unknown as ReturnType<typeof vi.fn>;

describe("Catalog component", () => {
  const renderCatalog = () =>
    render(
      <MantineProvider>
        <CartProvider>
          <Catalog />
        </CartProvider>
      </MantineProvider>
    );

it("показывает Loader во время загрузки", () => {
  mockedUseProducts.mockReturnValue({ products: [], loading: true });
  renderCatalog();
  expect(screen.getByTestId("loader")).toBeInTheDocument(); 
});


  it("показывает сообщение о пустом каталоге", () => {
    mockedUseProducts.mockReturnValue({ products: [], loading: false });
    renderCatalog();
    expect(screen.getByText(/нет доступных овощей/i)).toBeInTheDocument();
  });

  it("рендерит список продуктов", () => {
    const mockProducts: Product[] = [
      { id: 1, name: "Tomato - 1kg", price: 5, image: "tomato.png" },
      { id: 2, name: "Cucumber - 1kg", price: 3, image: "cucumber.png" },
    ];
    mockedUseProducts.mockReturnValue({ products: mockProducts, loading: false });
    renderCatalog();

    expect(screen.getByText(/tomato/i)).toBeInTheDocument();
    expect(screen.getByText(/cucumber/i)).toBeInTheDocument();
  });
});

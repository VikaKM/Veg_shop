// Мок window.matchMedia для корректной работы MantineProvider в тестах
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
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
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/header/Header";
import { MantineProvider, AppShell } from "@mantine/core";

vi.mock("../hook/useCart", () => ({
  useCart: () => ({
    items: [],
    totalCount: 3,
    totalPrice: 42,
    updateCount: vi.fn(),
  }),
}));

describe("Header component", () => {
  const renderHeader = () =>
    render(
      <MantineProvider>
        <AppShell>
          <Header />
        </AppShell>
      </MantineProvider>
    );

  it("рендерит логотип и кнопку корзины", () => {
    renderHeader();

    expect(screen.getByText("Vegetable")).toBeInTheDocument();
    expect(screen.getByText("SHOP")).toBeInTheDocument();


    expect(screen.getByText("Cart")).toBeInTheDocument();
    expect(screen.getByText("$42.00")).toBeInTheDocument();
  });
});

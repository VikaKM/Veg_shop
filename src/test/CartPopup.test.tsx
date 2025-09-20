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
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { CartPopup } from "../components/popup/CartPopup";


vi.mock("../hook/useCart", () => ({
  useCart: () => ({
    items: [],
    totalCount: 3,
    totalPrice: 42,
    updateCount: vi.fn(),
  }),
}));

describe("CartPopup component", () => {
  const renderCartPopup = () =>
    render(
      <MantineProvider>
        <CartPopup />
      </MantineProvider>
    );

  it("открывает и закрывает Popover при клике на кнопку", async () => {
    renderCartPopup();

    const button = screen.getByRole("button", { name: /cart/i });

  
    expect(screen.queryByText(/Your cart is empty/i)).not.toBeInTheDocument();


    fireEvent.click(button);
    const emptyText = await screen.findByText(/Your cart is empty/i);
    expect(emptyText).toBeInTheDocument();


    fireEvent.click(button);
    await waitFor(() => {
      expect(screen.queryByText(/Your cart is empty/i)).not.toBeInTheDocument();
    });
  });
});

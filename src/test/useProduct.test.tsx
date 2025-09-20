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

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { useProducts } from "../hook/useProducts";
import type { Product } from "../hook/useProducts";
import { waitFor } from "@testing-library/react";

const mockData: Product[] = [
  { id: 1, name: "Carrot", price: 5, image: "carrot.png", category: "vegetables" },
  { id: 2, name: "Apple", price: 10, image: "apple.png", category: "fruits" },
  { id: 3, name: "Tomato", price: 7, image: "tomato.png", category: "vegetables" },
];

describe("useProducts hook", () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockData),
      } as Response)
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("должен вернуть только овощи и выставить loading в false", async () => {
    const { result } = renderHook(() => useProducts());


    expect(result.current.loading).toBe(true);
    expect(result.current.products).toHaveLength(0);


    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(2); 
    expect(result.current.products.map((p) => p.name)).toEqual(["Carrot", "Tomato"]);
  });

  it("должен корректно обработать ошибку fetch", async () => {
    (global.fetch as typeof fetch) = vi.fn(() => Promise.reject("Fetch error"));

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(0);
  });
});

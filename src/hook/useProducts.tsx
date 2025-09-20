import { useEffect, useState } from "react";

export type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  weight?: string;
};

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const vegetables = data.filter(
          (p: Product) => p.category === "vegetables"
        );
        setProducts(vegetables);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Ошибка загрузки продуктов:", err);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}

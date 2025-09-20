import { SimpleGrid, Loader, Center, Text } from "@mantine/core";
import { ProductCard } from "../productCard/ProductCard";
import { useProducts } from "../../hook/useProducts";

export function Catalog() {
  const { products, loading } = useProducts();

  if (loading) return <Center mt="xl"><Loader color="green" data-testid="loader"/></Center>;
  if (!products || products.length === 0) return <Center mt="xl"><Text>Нет доступных овощей</Text></Center>;

  return (
    <>
      <Text 
        mb="md" 
        style={{ 
          fontSize:22, 
          fontWeight:600, 
          textAlign:'left' 
        }}
      >
        Catalog
      </Text>

      <SimpleGrid 
        cols={{ 
          base:1,
          sm:2, 
          md:3, 
          lg:4 
        }} 
        spacing="lg"
      >
        {products.map(p => <ProductCard key={p.id} {...p} />)}
      </SimpleGrid>
    </>
  );
}

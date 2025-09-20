import { Card, Image, Text, Button, Group, ActionIcon, NumberInput } from "@mantine/core";
import { useState, useEffect } from "react";
import { useCart } from "../../hook/useCart";
import { IconShoppingCart, IconMinus, IconPlus } from "@tabler/icons-react";
import type { Product } from "../../hook/useProducts";
import './ProductCard.scss';

export function ProductCard({ id, name, price, image }: Product) {
  const { addToCart, items, updateCount } = useCart();

  const [title, weight] = name.split(" - ");

  const cartItem = items.find(i => i.id === id);
  const initialCount = cartItem?.count ?? 1;

  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(cartItem?.count ?? 1);
  }, [cartItem?.count]);

  const handleChange = (val: number | string | undefined) => {
    if (val === undefined) return;
    const newCount = typeof val === 'string' ? parseInt(val, 10) : val;
    const finalCount = Math.max(1, newCount);
    setCount(finalCount);
    updateCount(id, finalCount);
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={image} height={200} alt={name} fit="contain" />
      </Card.Section>

      <Group mt="md" align="center" justify="space-between">
        <Group gap={4} align="center">
          <Text style={{ fontSize: 14, fontWeight: 600 }}>{title}</Text>
          <Text style={{ fontSize: 14, color: '#6c757d', marginLeft: 4 }}>{weight}</Text>
        </Group>

        <Group gap={0} align="center" justify="center">
          <ActionIcon
            aria-label="Decrease quantity"
            variant="light"
            color="dark"
            size={20}
            onClick={() => handleChange(count - 1)}
          >
            <IconMinus size={10} radius="sm" />
          </ActionIcon>

          <NumberInput
            value={count}
            onChange={handleChange}
            min={1}
            hideControls
            w={30}
            variant="unstyled"
            styles={{ input: { textAlign: 'center', padding: 0 } }}
          />

          <ActionIcon
            aria-label="Increase quantity"
            variant="light"
            color="dark"
            size={20}
            onClick={() => handleChange(count + 1)}
          >
            <IconPlus size={10} radius="sm" />
          </ActionIcon>
        </Group>
      </Group>

      <Group mt="md" justify="space-between">
        <Text fw={700} size="lg">$ {price}</Text>
        <Button
          className="button"
          variant="light"
          color="green"
          rightSection={<IconShoppingCart size={16} />}
          onClick={() => addToCart({ id, name, price, image }, count)}
        >
          Add to cart
        </Button>
      </Group>
    </Card>
  );
}

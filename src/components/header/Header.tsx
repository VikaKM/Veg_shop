
import { AppShell, Group, Text, Badge, Popover } from "@mantine/core";
import { useState } from "react";
import CartButton from "../cartButton/CartButton";
import { CartPopupContent } from "../popup/CartPopupContent";
import "./Header.scss";

export default function Header() {
  const [opened, setOpened] = useState(false);

  return (
    <AppShell.Header h={60}>
      <Group className="header" justify="apart">
        {/* Логотип */}
        <Group gap={0} className="header__logo">
          <Text className="header__logo-text">
            Vegetable
          </Text>
          <Badge color="green" className="header__logo-badge">
            SHOP
          </Badge>
        </Group>

        <Popover
          withinPortal={false} 
          opened={opened}
          onClose={() => setOpened(false)}
          position="bottom-end"
          width={360}
          withArrow
          zIndex={1000}
          transitionProps={{ transition: "pop", duration: 200 }}
        >
          <Popover.Target>
            <div>
              <CartButton
                onClick={() => setOpened((o) => !o)}
              />
            </div>
          </Popover.Target>

          <Popover.Dropdown>
            <CartPopupContent />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </AppShell.Header>
  );
}

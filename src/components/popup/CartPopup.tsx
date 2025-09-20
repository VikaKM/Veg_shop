import { useState } from "react";
import { Button, Group, Box, Text, Popover } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useCart } from "../../hook/useCart";
import { CartPopupContent } from "./CartPopupContent";

export function CartPopup() {
  const { totalCount, totalPrice } = useCart();
  const [opened, setOpened] = useState(false);

  return (
    <Popover 
      opened={opened} 
      onClose={() => setOpened(false)} 
      position="bottom-start" 
      withArrow
    >
      <Popover.Target>
        <Button 
          onClick={() => setOpened(o => !o)} 
          style={{ 
            display:'flex', 
            alignItems:'center', 
            gap:8, 
            backgroundColor:'#54B46A', 
            color:'white', 
            padding:'8px 12px'
          }}
        >
          <Group gap={8} align="center">
            <Box 
              style={{ 
                backgroundColor:'white', 
                color:'black', 
                borderRadius:'50%',
                width:18, 
                height:18,
                display:'flex', 
                alignItems:'center', 
                justifyContent:'center', 
                fontSize:12 
              }}
            >
              {totalCount}
            </Box>

            <Text fw={700}>Cart</Text>
            <IconShoppingCart size={20}/>

            <Box 
              style={{ 
                backgroundColor:'white', 
                color:'black', 
                borderRadius:8, 
                padding:'4px 8px', 
                fontWeight:400, 
                fontSize:12 
              }}
            >
              ${totalPrice.toFixed(2)}
            </Box>

          </Group>
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <CartPopupContent />
      </Popover.Dropdown>
    </Popover>
  );
}

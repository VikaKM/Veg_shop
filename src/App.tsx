import './App.scss'
import { AppShell } from "@mantine/core";
import Header from './components/header/Header'
import { Catalog } from './components/catalog/Catalog';
import { CartProvider } from "./components/cart/CartProvider";

function App() {
  return (
    <CartProvider>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <Header />

        <AppShell.Main>
          <Catalog />
        </AppShell.Main>
      </AppShell>
    </CartProvider>
  )
}

export default App



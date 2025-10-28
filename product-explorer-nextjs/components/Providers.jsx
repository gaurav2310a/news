"use client";
import DarkModeProvider from "../context/DarkModeContext";
import FavoritesProvider from "../context/FavoritesContext";
import { CartProvider } from "../context/CartContext";

export default function Providers({ children }) {
  return (
    <DarkModeProvider>
      <FavoritesProvider>
        <CartProvider>{children}</CartProvider>
      </FavoritesProvider>
    </DarkModeProvider>
  );
}

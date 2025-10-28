"use client";
import { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { CartContext } from "../context/CartContext";
import Cart from "./Cart";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header() {
  const { dark, toggle } = useContext(DarkModeContext);
  const { getTotalItems, toggleCart } = useContext(CartContext);
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700 mb-8">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3" onClick={() => router.push("/")}>
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl font-bold">D</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Daily Cart
              </h1>

            </div>
          </div>
          <div>
            <SearchBar />
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="group relative px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                {dark ? (
                  <>
                    <span className="text-xl">🌙</span>
                    {/* <span className="hidden sm:inline">Dark</span> */}
                  </>
                ) : (
                  <>
                    <span className="text-xl">☀️</span>
                    {/* <span className="hidden sm:inline">Light</span> */}
                  </>
                )}
              </span>
            </button>

            {/* Cart Button */}
            <button
              onClick={toggleCart}
              aria-label="Open cart"
              className="relative px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="flex items-center gap-2 text-sm font-medium">
                <span className="text-xl">🛒</span>
                {/* <span className="hidden sm:inline">Cart</span> */}
              </span>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* <a
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              href="#favorites"
            >
              <span className="flex items-center gap-2">
                <span>❤️</span>
                <span className="hidden sm:inline">Favorites</span>
              </span>
            </a> */}
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <Cart />
    </header>
  );
}

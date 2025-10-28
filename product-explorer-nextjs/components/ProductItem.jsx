"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";

export default function ProductItem({ product }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);
  const isFav = favorites.some((p) => p.id === product.id);
  const router = useRouter();

  const handleViewClick = (e) => {
    e.preventDefault();
    router.push(`/product/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-2">
      <div className="relative overflow-hidden">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <button
          onClick={() => toggleFavorite(product)}
          className="absolute top-3 right-3 w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
          aria-label="Toggle favorite"
        >
          <span className="text-xl">{isFav ? "❤️" : "🤍"}</span>
        </button>
        {product.rating && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-400/90 backdrop-blur-sm rounded-full flex items-center gap-1 shadow-lg">
            <span className="text-sm">⭐</span>
            <span className="text-sm font-bold text-slate-900">{product.rating}</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-3">
        <div className="flex-1">
          <h3 className="font-bold text-base text-slate-900 dark:text-white line-clamp-2 mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
          {product.brand && (
            <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-medium">
              {product.brand}
            </p>
          )}
        </div>

        <div className="space-y-2 pt-3 border-t border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{product.price}
            </div>
          </div>
          <div className="flex gap-2">
            <button
              className="flex-1 px-3 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={handleAddToCart}
            >
              🛒 Add
            </button>
            <button
              className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
              onClick={handleViewClick}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProductsByCategory } from "../lib/api";
import ProductItem from "./ProductItem";

export default function CategoryPage({ categorySlug }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(categorySlug);
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [categorySlug]);

  // Format category name for display
  const formatCategoryName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Get category icon
  const getCategoryIcon = (categoryName) => {
    const icons = {
      beauty: "💄",
      fragrances: "🌸",
      furniture: "🛋️",
      groceries: "🛒",
      "home-decoration": "🏠",
      "kitchen-accessories": "🍳",
      laptops: "💻",
      "mens-shirts": "👔",
      "mens-shoes": "👞",
      "mens-watches": "⌚",
      "mobile-accessories": "📱",
      motorcycle: "🏍️",
      "skin-care": "✨",
      smartphones: "📱",
      "sports-accessories": "⚽",
      sunglasses: "🕶️",
      tablets: "📱",
      tops: "👕",
      vehicle: "🚗",
      "womens-bags": "👜",
      "womens-dresses": "👗",
      "womens-jewellery": "💍",
      "womens-shoes": "👠",
      "womens-watches": "⌚",
    };
    return icons[categoryName] || "🛍️";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6 font-semibold"
      >
        <span>←</span> Back to Home
      </button>

      {/* Category Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-6xl">{getCategoryIcon(categorySlug)}</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              {formatCategoryName(categorySlug)}
            </h1>
            {!loading && (
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                {products.length} {products.length === 1 ? "product" : "products"} available
              </p>
            )}
          </div>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Products Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            There are no products available in this category.
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>

          {/* Category Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">📦</div>
              <div className="text-3xl font-bold mb-1">{products.length}</div>
              <div className="text-blue-100">Total Products</div>
            </div> */}
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-3xl font-bold mb-1">
                {(
                  products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length
                ).toFixed(1)}
              </div>
              <div className="text-purple-100">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-3xl font-bold mb-1">
                ₹{Math.min(...products.map((p) => p.price))}
              </div>
              <div className="text-green-100">Starting From</div>
            </div>
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-3xl font-bold mb-1">
                ₹{Math.max(...products.map((p) => p.price))}
              </div>
              <div className="text-red-100">Ending To</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchProductsByCategory } from "../lib/api";
import ProductItem from "./ProductItem";

export default function CategorySection({ category, categoryName }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const data = await fetchProductsByCategory(category);
        // Limit to 4 products per category for homepage
        setProducts(data.products.slice(0, 4));
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [category]);

  if (loading) {
    return (
      <div className="mb-12">
        <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded-lg animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
          {categoryName}
        </h2>
        <button 
          onClick={() => router.push(`/category/${category}`)}
          className="text-blue-600 dark:text-blue-400 font-semibold hover:underline flex items-center gap-2 group"
        >
          View All
          <span className="group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

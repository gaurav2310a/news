"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchProducts } from "../lib/api";
import ProductItem from "./ProductItem";

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  useEffect(() => {
    async function loadSearchResults() {
      if (!query) {
        setProducts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await searchProducts(query);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Search failed:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }
    loadSearchResults();
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6 font-semibold"
      >
        <span>←</span> Back
      </button>

      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-5xl">🔍</div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
              Search Results
            </h1>
            {query && (
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                Searching for: <span className="font-semibold text-blue-600 dark:text-blue-400">"{query}"</span>
              </p>
            )}
            {!loading && products.length > 0 && (
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Found {products.length} {products.length === 1 ? "product" : "products"}
              </p>
            )}
          </div>
        </div>
        <div className="h-1 w-32 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl animate-pulse"
            ></div>
          ))}
        </div>
      )}

      {/* No Query */}
      {!loading && !query && (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Start Your Search
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Enter a search term to find products
          </p>
        </div>
      )}

      {/* No Results */}
      {!loading && query && products.length === 0 && (
        <div className="text-center py-16">
          <div className="text-8xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
            No Results Found
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We couldn't find any products matching "{query}"
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Browse All Products
          </button>
        </div>
      )}

      {/* Results Grid */}
      {!loading && products.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>

          {/* Search Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">📦</div>
              <div className="text-3xl font-bold mb-1">{products.length}</div>
              <div className="text-blue-100">Products Found</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">⭐</div>
              <div className="text-3xl font-bold mb-1">
                {products.length > 0
                  ? (
                      products.reduce((sum, p) => sum + (p.rating || 0), 0) /
                      products.length
                    ).toFixed(1)
                  : "0"}
              </div>
              <div className="text-purple-100">Average Rating</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
              <div className="text-3xl mb-2">💰</div>
              <div className="text-3xl font-bold mb-1">
                ₹{products.length > 0 ? Math.min(...products.map((p) => p.price)) : "0"}
              </div>
              <div className="text-green-100">Starting From</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

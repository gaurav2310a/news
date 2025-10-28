"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { fetchAllProducts } from "../lib/api";
import ProductItem from "./ProductItem";

export default function BannerPage({ bannerId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Banner data mapping
  const bannerData = {
    "mega-sale": {
      title: "Mega Sale",
      subtitle: "Up to 70% OFF on Everything",
      description: "Don't miss out on our biggest sale of the season! Get incredible discounts on electronics, fashion, home essentials, and more. Limited time offer!",
      gradient: "from-blue-600 to-purple-600",
      emoji: "⚡",
      categories: ["smartphones", "laptops", "tablets"],
      discount: 70,
    },
    "fashion-week": {
      title: "Fashion Week",
      subtitle: "Trending Styles at Best Prices",
      description: "Discover the latest fashion trends and elevate your wardrobe. From casual wear to formal attire, find everything you need to look your best.",
      gradient: "from-pink-500 to-rose-600",
      emoji: "👗",
      categories: ["mens-shirts", "womens-dresses", "womens-bags", "womens-shoes"],
      discount: 50,
    },
    "home-essentials": {
      title: "Home Essentials",
      subtitle: "Transform Your Living Space",
      description: "Create your dream home with our curated collection of furniture, decor, and kitchen accessories. Quality products at unbeatable prices.",
      gradient: "from-green-500 to-teal-600",
      emoji: "🏠",
      categories: ["furniture", "home-decoration", "kitchen-accessories"],
      discount: 40,
    },
    "beauty-bonanza": {
      title: "Beauty Bonanza",
      subtitle: "Premium Beauty Products",
      description: "Pamper yourself with our exclusive range of beauty and skincare products. Look and feel your best with top brands at amazing prices.",
      gradient: "from-orange-500 to-red-600",
      emoji: "💄",
      categories: ["beauty", "fragrances", "skin-care"],
      discount: 60,
    },
  };

  const banner = bannerData[bannerId] || bannerData["mega-sale"];

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        // Fetch products from all categories related to this banner
        const allProducts = await fetchAllProducts(50);
        
        // Filter products based on banner categories
        const filteredProducts = allProducts.products.filter(product => 
          banner.categories.some(cat => product.category.includes(cat.replace("-", "")))
        );
        
        setProducts(filteredProducts.slice(0, 12)); // Show 12 products
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, [bannerId]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6 font-semibold"
      >
        <span>←</span> Back to Home
      </button>

      {/* Banner Header */}
      <div className={`bg-gradient-to-r ${banner.gradient} rounded-3xl p-8 md:p-16 text-white shadow-2xl mb-12`}>
        <div className="text-center">
          <div className="text-8xl md:text-9xl mb-6 animate-bounce inline-block">
            {banner.emoji}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {banner.title}
          </h1>
          <p className="text-2xl md:text-3xl mb-6 opacity-90">
            {banner.subtitle}
          </p>
          <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-80">
            {banner.description}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full font-bold text-xl">
              Up to {banner.discount}% OFF
            </div>
            <div className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full font-bold text-xl">
              Limited Time Only
            </div>
            <div className="px-8 py-4 bg-white/20 backdrop-blur-sm rounded-full font-bold text-xl">
              Free Shipping
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
          Shop by Category
        </h2>
        <div className="flex flex-wrap gap-3">
          {banner.categories.map((category) => (
            <button
              key={category}
              onClick={() => router.push(`/category/${category}`)}
              className="px-6 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-full font-semibold text-slate-900 dark:text-white hover:border-blue-500 dark:hover:border-blue-400 hover:scale-105 transition-all duration-300 shadow-md hover:shadow-xl capitalize"
            >
              {category.split("-").join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Featured Deals
          </h2>
          {!loading && products.length > 0 && (
            <span className="text-slate-600 dark:text-slate-400">
              {products.length} products
            </span>
          )}
        </div>

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
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Products Available
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Check back soon for amazing deals!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="mt-12 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <div className="text-6xl mb-4">🎁</div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Extra Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl mb-2">🚚</div>
            <h4 className="text-xl font-bold text-white mb-2">Free Delivery</h4>
            <p className="text-white/80">On orders above ₹999</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl mb-2">💳</div>
            <h4 className="text-xl font-bold text-white mb-2">Easy Returns</h4>
            <p className="text-white/80">30-day return policy</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl mb-2">🔒</div>
            <h4 className="text-xl font-bold text-white mb-2">Secure Payment</h4>
            <p className="text-white/80">100% secure transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}

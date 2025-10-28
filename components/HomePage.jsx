"use client";
import { useState, useEffect } from "react";
import { fetchCategories } from "../lib/api";
import HeroSection from "./HeroSection";
import CategoryCard from "./CategoryCard";
import CategorySection from "./CategorySection";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const router = useRouter();
    
  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories:", error);
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const handleCategoryClick = (categorySlug) => {
    setSelectedCategory(categorySlug);
    // Scroll to the category section
    const element = document.getElementById(`category-${categorySlug}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Format category name for display
  const formatCategoryName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  // Featured categories to display products
  const featuredCategories = [
    "smartphones",
    "laptops",
    "mens-shirts",
    "womens-dresses",
    "beauty",
    "furniture",
  ];

  return (
    <div className="space-y-12">
      {/* Hero Banner */}
      <HeroSection />

      {/* Categories Grid */}
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Shop by Category
        </h2>
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="h-[140px] bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                onClick={handleCategoryClick}
              />
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t-2 border-slate-200 dark:border-slate-700"></div>

      {/* Featured Category Sections */}
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8 text-center">
          Featured Products
        </h2>
        {featuredCategories.map((category) => (
          <div key={category} id={`category-${category}`}>
            <CategorySection
              category={category}
              categoryName={formatCategoryName(category)}
            />
          </div>
        ))}
      </div>

      {/* Special Offers Banner */}
      <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 md:p-12 text-center shadow-2xl">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
          Special Offers
        </h2>
        <p className="text-xl md:text-2xl text-white/90 mb-6">
          Get up to 50% OFF on selected items
        </p>
        <button onClick={() => router.push("/banner/mega-sale")} className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:scale-110 transition-transform duration-300 shadow-xl">
          Explore Deals
        </button>
      </div>
    </div>
  );
}

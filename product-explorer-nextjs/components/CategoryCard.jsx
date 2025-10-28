"use client";
import { useRouter } from "next/navigation";

export default function CategoryCard({ category, onClick }) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick(category.slug);
    }
    router.push(`/category/${category.slug}`);
  };
  // Category icon mapping
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

  // Format category name for display
  const formatCategoryName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 hover:-translate-y-2 p-6 flex flex-col items-center justify-center gap-3 min-h-[140px]"
    >
      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
        {getCategoryIcon(category.slug)}
      </div>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white text-center group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {formatCategoryName(category.name)}
      </h3>
    </div>
  );
}

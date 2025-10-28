"use client";
import { useEffect, useState } from "react";
import { fetchCategories } from "../lib/api";

export default function CategoryFilter({ onSelect }) {
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    fetchCategories()
      .then((data) => {
        if (mounted) {
          setCats(data);
        }
      })
      .catch(() => {
        setCats([]);
      })
      .finally(() => setLoading(false));
    return () => (mounted = false);
  }, []);

  return (
    <div className="flex items-center gap-3 w-full">
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">
        <span className="mr-2">📁</span>
        Category:
      </label>
      <select
        onChange={(e) => onSelect(e.target.value)}
        className="flex-1 px-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 text-slate-900 dark:text-white cursor-pointer hover:border-blue-400 dark:hover:border-blue-500"
      >
        <option value="">All Categories</option>
        {loading ? (
          <option disabled>Loading categories...</option>
        ) : (
          cats.map((c) => {
            const categorySlug = typeof c === 'string' ? c : c.slug;
            const categoryName = typeof c === 'string' ? c : c.name;
            return (
              <option value={categorySlug} key={categorySlug}>
                {categoryName}
              </option>
            );
          })
        )}
      </select>
    </div>
  );
}

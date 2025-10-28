"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");
  const router = useRouter();

  function submit(e) {
    e?.preventDefault();
    const searchQuery = value.trim();
    
    if (searchQuery) {
      // If onSearch prop is provided, use it
      if (onSearch && typeof onSearch === 'function') {
        onSearch(searchQuery);
      } else {
        // Navigate to search results page
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  }

  return (
    <form onSubmit={submit} className="w-full flex gap-3">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-slate-400 text-xl">🔍</span>
        </div>
        <input
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/30 transition-all duration-200 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          placeholder="Search products (e.g., phone, laptop, watch...)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <button
        onClick={submit}
        type="submit"
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
      >
        Search
      </button>
    </form>
  );
}

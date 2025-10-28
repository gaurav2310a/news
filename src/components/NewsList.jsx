'use client';

import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { useNewsAPI } from '../hooks/useNewsAPI';
import { CATEGORIES } from '../lib/constants';
import NewsCard from './NewsCard';

const NewsList = () => {
  const { darkMode, selectedCategory, searchQuery } = useNews();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  
  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { articles, loading, error } = useNewsAPI(selectedCategory, debouncedQuery, 1);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className={`animate-spin mb-4 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} size={48} />
        <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Loading latest news...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className={`text-xl mb-4 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
          {error}
        </p>
        <button
          onClick={() => window.location.reload()}
          className={`px-6 py-3 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white font-semibold transition-colors`}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="text-center py-20">
        <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          No articles found. Try a different search or category.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          {searchQuery ? `Search Results for "${searchQuery}"` : `Latest ${CATEGORIES.find(c => c.id === selectedCategory)?.name}`}
        </h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {articles.length} articles
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </>
  );
};

export default NewsList;

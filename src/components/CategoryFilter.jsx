'use client';

import React from 'react';
import { useNews } from '../context/NewsContext';
import { CATEGORIES } from '../lib/constants';

const CategoryFilter = () => {
  const { darkMode, selectedCategory, setSelectedCategory, setSearchQuery } = useNews();

  return (
    <div className={`${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap font-medium transition-all ${
                selectedCategory === cat.id
                  ? darkMode 
                    ? 'bg-purple-600 text-white shadow-lg' 
                    : 'bg-purple-500 text-white shadow-lg'
                  : darkMode
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;

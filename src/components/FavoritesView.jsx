'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import NewsCard from './NewsCard';

const FavoritesView = () => {
  const { darkMode, favorites } = useNews();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          ❤️ Favorite Articles
        </h2>
        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          {favorites.length} articles
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-20">
          <Heart size={64} className={`mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
          <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            No favorite articles yet. Start adding some!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map(article => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesView;

'use client';

import React from 'react';
import { Heart } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { formatDate } from '../lib/utils';

const NewsCard = ({ article }) => {
  const { darkMode, toggleFavorite, isFavorite, setSelectedArticle, setCurrentView } = useNews();

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}
    >
      <div 
        className="relative h-48 overflow-hidden"
        onClick={() => {
          setSelectedArticle(article);
          setCurrentView('detail');
        }}
      >
        <img 
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${darkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white capitalize`}>
            {article.category}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(article);
          }}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
        >
          <Heart 
            size={18} 
            className={isFavorite(article) ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>
      </div>
      
      <div 
        className="p-5"
        onClick={() => {
          setSelectedArticle(article);
          setCurrentView('detail');
        }}
      >
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className={`font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
            {article.source}
          </span>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-400'}>•</span>
          <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
            {formatDate(article.publishedAt)}
          </span>
        </div>
        
        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${darkMode ? 'text-white' : 'text-gray-900'} group-hover:text-purple-600 transition-colors`}>
          {article.title}
        </h3>
        
        <p className={`text-sm line-clamp-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          {article.description}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;

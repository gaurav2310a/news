'use client';

import React from 'react';
import { ChevronLeft, Heart, User, Calendar, Share2 } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { shareArticle } from '../lib/utils';

const ArticleDetail = ({ article }) => {
  const { darkMode, toggleFavorite, isFavorite, setCurrentView } = useNews();

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => setCurrentView('home')}
          className={`flex items-center gap-2 mb-6 px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-900 hover:bg-gray-100'} transition-colors`}
        >
          <ChevronLeft size={20} />
          Back to News
        </button>

        <div className={`rounded-2xl overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-96 object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800';
            }}
          />
          
          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${darkMode ? 'bg-purple-600' : 'bg-purple-500'} text-white capitalize`}>
                {article.category}
              </span>
              <button
                onClick={() => toggleFavorite(article)}
                className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors`}
              >
                <Heart 
                  size={20} 
                  className={isFavorite(article) ? 'fill-red-500 text-red-500' : darkMode ? 'text-gray-300' : 'text-gray-600'}
                />
              </button>
            </div>

            <h1 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {article.title}
            </h1>

            <div className={`flex items-center gap-4 mb-6 pb-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2">
                <User size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {article.author}
                </span>
              </div>
              <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
              <div className="flex items-center gap-2">
                <Calendar size={18} className={darkMode ? 'text-gray-400' : 'text-gray-500'} />
                <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <span className={darkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
              <span className={`text-sm font-medium ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                {article.source}
              </span>
            </div>

            <div className={`text-lg leading-relaxed mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="mb-4 font-semibold text-xl">{article.description}</p>
              <p className="mb-6">{article.content}</p>
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-block px-6 py-3 rounded-lg ${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-500 hover:bg-purple-600'} text-white font-semibold transition-colors`}
              >
                Read Full Article →
              </a>
            </div>

            <div className={`flex flex-wrap items-center gap-3 pt-6 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Share:
              </span>
              <button
                onClick={() => shareArticle('twitter', article)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition-colors flex items-center gap-2`}
              >
                <Share2 size={16} />
                Twitter
              </button>
              <button
                onClick={() => shareArticle('facebook', article)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-700 hover:bg-blue-800' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors flex items-center gap-2`}
              >
                <Share2 size={16} />
                Facebook
              </button>
              <button
                onClick={() => shareArticle('linkedin', article)}
                className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-blue-800 hover:bg-blue-900' : 'bg-blue-700 hover:bg-blue-800'} text-white transition-colors flex items-center gap-2`}
              >
                <Share2 size={16} />
                LinkedIn
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;

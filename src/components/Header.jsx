'use client';

import React from 'react';
import { Search, Sun, Moon, Heart, TrendingUp } from 'lucide-react';
import { useNews } from '../context/NewsContext';

const Header = () => {
  const {
    darkMode,
    setDarkMode,
    favorites,
    currentView,
    setCurrentView,
    searchQuery,
    setSearchQuery
  } = useNews();

  return (
    <header className={`sticky top-0 z-50 backdrop-blur-lg ${darkMode ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200'} border-b shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-gradient-to-br from-purple-500 to-pink-500'} flex items-center justify-center transform rotate-12`}>
                <TrendingUp className="text-white" size={24} />
              </div>
            </div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              News<span className={darkMode ? 'text-purple-400' : 'text-purple-600'}>Portal</span>
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView(currentView === 'favorites' ? 'home' : 'favorites')}
              className={`p-2.5 rounded-xl ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} transition-colors relative`}
            >
              <Heart size={20} className={currentView === 'favorites' ? 'fill-red-500 text-red-500' : ''} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2.5 rounded-xl ${darkMode ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {currentView === 'home' && (
          <div className="mt-4">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                placeholder="Search news articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400 focus:ring-purple-500' : 'bg-gray-100 text-gray-900 placeholder-gray-500 focus:ring-purple-400'} focus:outline-none focus:ring-2 transition-all`}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

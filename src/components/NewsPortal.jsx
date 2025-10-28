'use client';

import React from 'react';
import { useNews } from '../context/NewsContext';
import Header from './Header';
import CategoryFilter from './CategoryFilter';
import NewsList from './NewsList';
import FavoritesView from './FavoritesView';
import ArticleDetail from './ArticleDetail';

const NewsPortal = () => {
  const { darkMode, currentView, selectedArticle } = useNews();

  if (currentView === 'detail' && selectedArticle) {
    return <ArticleDetail article={selectedArticle} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Header />
      
      {currentView === 'home' && <CategoryFilter />}
      
      <main>
        {currentView === 'favorites' ? (
          <FavoritesView />
        ) : (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <NewsList />
          </div>
        )}
      </main>

      <footer className={`mt-20 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t`}>
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
            © 2025 NewsPortal. Powered by NewsAPI | Built with Next.js & React
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewsPortal;

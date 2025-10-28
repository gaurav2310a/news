'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

const NewsContext = createContext();

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within NewsProvider');
  }
  return context;
};

export const NewsProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('home');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Load favorites from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('newsportal_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (article) => {
    const articleExists = favorites.some(fav => fav.url === article.url);
    let newFavorites;
    
    if (articleExists) {
      newFavorites = favorites.filter(fav => fav.url !== article.url);
    } else {
      newFavorites = [...favorites, article];
    }
    
    setFavorites(newFavorites);
    localStorage.setItem('newsportal_favorites', JSON.stringify(newFavorites));
  };

  const isFavorite = (article) => {
    return favorites.some(fav => fav.url === article.url);
  };

  const value = {
    darkMode,
    setDarkMode,
    favorites,
    toggleFavorite,
    isFavorite,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    selectedArticle,
    setSelectedArticle
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

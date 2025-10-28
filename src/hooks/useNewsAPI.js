'use client';

import { useState, useEffect } from 'react';
import { API_KEY, BASE_URL } from '../lib/constants';

export const useNewsAPI = (category, query, page = 1) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      
      try {
        let url = '';
        
        if (query.trim()) {
          // Search endpoint
          url = `${BASE_URL}/everything?q=${encodeURIComponent(query)}&language=en&sortBy=publishedAt&page=${page}&pageSize=20&apiKey=${API_KEY}`;
        } else {
          // Top headlines endpoint
          url = `${BASE_URL}/top-headlines?country=us&category=${category}&page=${page}&pageSize=20&apiKey=${API_KEY}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === 'ok') {
          // Filter out articles with [Removed] content
          const validArticles = data.articles.filter(article => 
            article.title !== '[Removed]' && 
            article.description !== '[Removed]' &&
            article.title &&
            article.urlToImage
          );
          
          // Add unique IDs and format articles
          const formattedArticles = validArticles.map((article, index) => ({
            id: `${Date.now()}-${index}`,
            title: article.title,
            description: article.description || 'No description available',
            content: article.content || article.description || 'Content not available',
            image: article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800',
            source: article.source.name,
            author: article.author || 'Unknown Author',
            category: category,
            publishedAt: article.publishedAt,
            url: article.url
          }));
          
          setArticles(formattedArticles);
        } else {
          setError(data.message || 'Failed to fetch news');
        }
      } catch (err) {
        setError('Failed to fetch news. Please try again.');
        console.error('Error fetching news:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category, query, page]);

  return { articles, loading, error };
};

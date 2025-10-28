'use client';

import React from 'react';
import { NewsProvider } from '../src/context/NewsContext';

export default function Providers({ children }) {
  return (
    <NewsProvider>
      {children}
    </NewsProvider>
  );
}

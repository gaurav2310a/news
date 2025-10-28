# 📰 NewsPortal

A modern, responsive news portal built with Next.js, React, and Tailwind CSS. Stay updated with the latest news from around the world with real-time updates powered by NewsAPI.

## ✨ Features

- **Real-time News**: Fetches latest news articles from NewsAPI
- **Category Filtering**: Browse news by categories (Technology, Business, Sports, Health, Entertainment, Science)
- **Search Functionality**: Search for specific news articles with debounced search
- **Favorites System**: Save your favorite articles with localStorage persistence
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Fully responsive UI that works on all devices
- **Article Details**: View full article details with sharing options
- **Social Sharing**: Share articles on Twitter, Facebook, and LinkedIn

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- NewsAPI key (get one free at [newsapi.org](https://newsapi.org))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd news
```

2. Install dependencies:
```bash
npm install
```

3. Update your API key in `src/lib/constants.js`:
```javascript
export const API_KEY = 'your-api-key-here';
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
news/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── layout.jsx         # Root layout
│   │   └── page.jsx           # Home page
│   ├── components/            # React components
│   │   ├── ArticleDetail.jsx # Article detail view
│   │   ├── CategoryFilter.jsx # Category filter bar
│   │   ├── FavoritesView.jsx # Favorites page
│   │   ├── Header.jsx        # App header
│   │   ├── NewsCard.jsx      # News article card
│   │   ├── NewsList.jsx      # News list container
│   │   └── NewsPortal.jsx    # Main portal component
│   ├── context/              # React context
│   │   └── NewsContext.jsx   # Global state management
│   ├── hooks/                # Custom hooks
│   │   └── useNewsAPI.js     # News fetching hook
│   └── lib/                  # Utilities
│       ├── constants.js      # App constants
│       └── utils.js          # Helper functions
├── components/               # Legacy components
│   └── Providers.jsx        # Context providers wrapper
└── public/                  # Static assets
```

## 🛠️ Technologies Used

- **Next.js 15** - React framework
- **React 19** - UI library
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **NewsAPI** - News data source
- **LocalStorage** - Favorites persistence

## 📱 Features in Detail

### Category Browsing
Browse news by 7 different categories with beautiful category cards and icons.

### Smart Search
Debounced search functionality that searches across all news articles.

### Favorites Management
Save articles to favorites with a single click. Favorites are persisted in localStorage.

### Dark Mode
Toggle between light and dark themes with smooth transitions.

### Article Sharing
Share articles directly to social media platforms (Twitter, Facebook, LinkedIn).

## 🔧 Configuration

Update the API key and base URL in `src/lib/constants.js`:

```javascript
export const API_KEY = 'your-api-key';
export const BASE_URL = 'https://newsapi.org/v2';
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ using Next.js and React

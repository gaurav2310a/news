# NewsPortal Architecture

## 📐 Folder Structure

```
news/
│
├── src/                                    # Source code
│   │
│   ├── app/                               # Next.js App Router (Server Components)
│   │   ├── layout.jsx                    # Root layout with metadata & providers
│   │   ├── page.jsx                      # Home page (renders NewsPortal)
│   │   └── globals.css                   # Global styles
│   │
│   ├── components/                        # Client Components
│   │   ├── NewsPortal.jsx               # 🏠 Main container (view router)
│   │   ├── Header.jsx                   # 🎯 Top nav, search, theme toggle
│   │   ├── CategoryFilter.jsx           # 📑 Category selection bar
│   │   ├── NewsList.jsx                 # 📰 News grid with loading states
│   │   ├── NewsCard.jsx                 # 📄 Individual article card
│   │   ├── ArticleDetail.jsx            # 📖 Full article view
│   │   └── FavoritesView.jsx            # ❤️ Saved articles page
│   │
│   ├── context/                           # State Management
│   │   └── NewsContext.jsx              # Global state (Context API)
│   │
│   ├── hooks/                             # Custom Hooks
│   │   └── useNewsAPI.js                # News fetching logic
│   │
│   └── lib/                               # Utilities & Config
│       ├── constants.js                  # API keys, categories
│       └── utils.js                      # Helper functions
│
├── components/                            # Root-level components
│   └── Providers.jsx                     # Context providers wrapper
│
├── public/                                # Static assets
│
├── package.json                           # Dependencies
├── tailwind.config.js                    # Tailwind configuration
├── next.config.ts                        # Next.js configuration
├── README.md                             # Project documentation
├── SETUP_GUIDE.md                        # Setup instructions
└── ARCHITECTURE.md                       # This file
```

## 🔄 Data Flow

```
User Interaction
      ↓
NewsContext (State Management)
      ↓
useNewsAPI Hook (API Calls)
      ↓
NewsAPI (External API)
      ↓
Components (UI Rendering)
```

## 🧩 Component Hierarchy

```
App (layout.jsx)
└── Providers (NewsContext)
    └── NewsPortal
        ├── Header
        │   ├── Logo
        │   ├── Search Bar
        │   ├── Favorites Button
        │   └── Theme Toggle
        │
        ├── CategoryFilter (only on home view)
        │   └── Category Buttons
        │
        └── Main Content (conditional)
            │
            ├── Home View
            │   └── NewsList
            │       └── NewsCard (multiple)
            │           ├── Image
            │           ├── Category Badge
            │           ├── Favorite Button
            │           └── Article Info
            │
            ├── Favorites View
            │   └── FavoritesView
            │       └── NewsCard (multiple)
            │
            └── Detail View
                └── ArticleDetail
                    ├── Back Button
                    ├── Full Image
                    ├── Article Content
                    └── Share Buttons
```

## 🎯 State Management

### NewsContext provides:

| State | Type | Description |
|-------|------|-------------|
| `darkMode` | boolean | Theme preference |
| `favorites` | array | Saved articles |
| `selectedCategory` | string | Current category filter |
| `searchQuery` | string | Search input value |
| `currentView` | string | 'home', 'favorites', or 'detail' |
| `selectedArticle` | object | Article in detail view |

### Actions:

| Function | Purpose |
|----------|---------|
| `setDarkMode()` | Toggle theme |
| `toggleFavorite()` | Add/remove from favorites |
| `isFavorite()` | Check if article is favorited |
| `setSelectedCategory()` | Change news category |
| `setSearchQuery()` | Update search |
| `setCurrentView()` | Navigate between views |
| `setSelectedArticle()` | Select article for detail view |

## 🔌 API Integration

### useNewsAPI Hook

**Parameters:**
- `category`: News category (general, technology, etc.)
- `query`: Search term
- `page`: Page number for pagination

**Returns:**
- `articles`: Array of formatted articles
- `loading`: Boolean loading state
- `error`: Error message if request fails

**Endpoints Used:**
1. **Top Headlines**: `/v2/top-headlines` (category-based)
2. **Everything**: `/v2/everything` (search-based)

## 🎨 Styling Strategy

### Tailwind CSS Classes

- **Dark Mode**: Uses `darkMode ? 'dark-classes' : 'light-classes'` pattern
- **Responsive**: Mobile-first with `md:` and `lg:` breakpoints
- **Animations**: Hover effects, transitions, transforms
- **Colors**: Purple accent (`purple-500`, `purple-600`)

### Key Design Patterns

1. **Glass-morphism**: Header with backdrop blur
2. **Card Design**: Rounded corners, shadows, hover effects
3. **Gradient Backgrounds**: Subtle gradients for depth
4. **Icon Integration**: Lucide React icons throughout

## 🔐 Security & Best Practices

### Current Implementation

✅ API key in constants (for demo)
✅ Client-side rendering for interactivity
✅ Error boundaries with try-catch
✅ Image fallbacks for broken URLs
✅ Input sanitization (encodeURIComponent)

### Production Recommendations

⚠️ Move API key to environment variables
⚠️ Implement rate limiting
⚠️ Add server-side API routes as proxy
⚠️ Implement proper error logging
⚠️ Add analytics tracking

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: 0-640px (1 column)
md: 640px+ (2 columns)
lg: 1024px+ (3 columns)
```

## 🚀 Performance Optimizations

1. **Debounced Search**: 500ms delay prevents excessive API calls
2. **Conditional Rendering**: Only renders current view
3. **Image Optimization**: Next.js automatic optimization (if using next/image)
4. **Lazy Loading**: Components load on demand
5. **LocalStorage**: Favorites cached locally

## 🧪 Testing Strategy (Recommended)

```
Unit Tests:
- Utils functions (formatDate, shareArticle)
- Context actions (toggleFavorite, isFavorite)

Integration Tests:
- useNewsAPI hook with mock API
- Component interactions

E2E Tests:
- Search flow
- Favorite/unfavorite flow
- Category switching
- Theme toggle
```

## 🔮 Future Enhancements

### Phase 1 (Quick Wins)
- [ ] Persist dark mode in localStorage
- [ ] Add loading skeletons
- [ ] Implement pagination
- [ ] Add "Back to Top" button

### Phase 2 (Features)
- [ ] Infinite scroll
- [ ] Advanced filters (date, source)
- [ ] Bookmark categories/tags
- [ ] Reading history
- [ ] Offline support (PWA)

### Phase 3 (Advanced)
- [ ] User authentication
- [ ] Personalized feed
- [ ] Push notifications
- [ ] Multi-language support
- [ ] RSS feed generation

## 📊 Dependencies

```json
{
  "next": "15.5.5",           // React framework
  "react": "19.1.0",          // UI library
  "react-dom": "19.1.0",      // React DOM
  "lucide-react": "^0.548.0", // Icons
  "tailwindcss": "^3.4.1"     // Styling
}
```

## 🎓 Learning Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Context API](https://react.dev/reference/react/useContext)
- [NewsAPI Docs](https://newsapi.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

---

Built with ❤️ using modern web technologies

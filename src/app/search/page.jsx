import { Suspense } from "react";
import Header from "../../../components/Header";
import SearchResults from "../../../components/SearchResults";

function SearchResultsWrapper() {
  return (
    <Suspense fallback={
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-80 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}

export default async function SearchPage() {
  return (
    <div>
      <Header />
      <main>
        <SearchResultsWrapper />
      </main>
      <footer className="mt-16 py-8 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Developed with ❤️ by <span className="font-semibold text-purple-600 dark:text-purple-400">Gaurav Aggarwal</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

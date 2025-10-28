// server component
import "./globals.css";
import Providers from "../../components/Providers";

export const metadata = {
  title: "Product Explorer - Discover Amazing Products",
  description: "Explore a curated collection of products with advanced search, filtering, and favorites. Built with Next.js and Tailwind CSS."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {/* Providers is a client component that injects contexts */}
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

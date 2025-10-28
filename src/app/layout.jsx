// server component
import "./globals.css";
import Providers from "../../components/Providers";

export const metadata = {
  title: "NewsPortal - Stay Updated with Latest News",
  description: "Discover the latest news from around the world. Browse by category, search articles, and save your favorites. Built with Next.js and powered by NewsAPI."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

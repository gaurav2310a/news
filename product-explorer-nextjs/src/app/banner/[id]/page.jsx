import Header from "../../../../components/Header";
import BannerPage from "../../../../components/BannerPage";

export default async function Banner({ params }) {
  const { id } = await params;

  return (
    <div>
      <Header />
      <main>
        <BannerPage bannerId={id} />
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

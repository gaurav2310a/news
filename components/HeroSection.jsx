"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const banners = [
    {
      id: 1,
      title: "Mega Sale",
      subtitle: "Up to 70% OFF on Everything",
      gradient: "from-blue-600 to-purple-600",
      emoji: "⚡",
      slug: "mega-sale",
    },
    {
      id: 2,
      title: "Fashion Week",
      subtitle: "Trending Styles at Best Prices",
      gradient: "from-pink-500 to-rose-600",
      emoji: "👗",
      slug: "fashion-week",
    },
    {
      id: 3,
      title: "Home Essentials",
      subtitle: "Transform Your Living Space",
      gradient: "from-green-500 to-teal-600",
      emoji: "🏠",
      slug: "home-essentials",
    },
    {
      id: 4,
      title: "Beauty Bonanza",
      subtitle: "Premium Beauty Products",
      gradient: "from-orange-500 to-red-600",
      emoji: "💄",
      slug: "beauty-bonanza",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl mb-8">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : index < currentSlide
              ? "opacity-0 -translate-x-full"
              : "opacity-0 translate-x-full"
          }`}
        >
          <div
            className={`w-full h-full bg-gradient-to-r ${banner.gradient} flex flex-col items-center justify-center text-white p-8`}
          >
            <div className="text-7xl md:text-9xl mb-4 animate-bounce">
              {banner.emoji}
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-3 text-center">
              {banner.title}
            </h2>
            <p className="text-xl md:text-2xl text-center opacity-90">
              {banner.subtitle}
            </p>
            <button 
              onClick={() => router.push(`/banner/${banner.slug}`)}
              className="mt-6 px-8 py-3 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-110 transition-transform duration-300 shadow-xl"
            >
              Shop Now
            </button>
          </div>
        </div>
      ))}

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white w-8"
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

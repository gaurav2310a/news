"use client";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { fetchProductById } from "../lib/api";
import { FavoritesContext } from "../context/FavoritesContext";
import { CartContext } from "../context/CartContext";

export default function ProductDetails({ productId }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart, toggleCart, isInCart, getItemQuantity } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toggleCart();
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    toggleCart();
  };

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="h-96 bg-slate-200 dark:bg-slate-700 rounded-2xl"></div>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Product not found</h2>
      </div>
    );
  }

  const isFav = favorites.some((p) => p.id === product.id);
  const images = product.images || [product.thumbnail];
  const discount = product.discountPercentage || 0;
  const originalPrice = (product.price / (1 - discount / 100)).toFixed(2);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mb-6 font-semibold"
      >
        <span>←</span> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
            <img
              src={images[selectedImage]}
              alt={product.title}
              className="w-full h-96 lg:h-[500px] object-cover"
            />
            {discount > 0 && (
              <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-full font-bold shadow-lg">
                {discount.toFixed(0)}% OFF
              </div>
            )}
            <button
              onClick={() => toggleFavorite(product)}
              className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <span className="text-2xl">{isFav ? "❤️" : "🤍"}</span>
            </button>
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? "border-blue-500 scale-105"
                      : "border-slate-200 dark:border-slate-700 hover:border-blue-300"
                  }`}
                >
                  <img src={img} alt={`${product.title} ${idx + 1}`} className="w-full h-20 object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Brand */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {product.brand && (
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm font-semibold">
                  {product.brand}
                </span>
              )}
              {product.category && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold capitalize">
                  {product.category}
                </span>
              )}
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              {product.title}
            </h1>
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-400 rounded-full">
                  <span>⭐</span>
                  <span className="font-bold text-slate-900">{product.rating}</span>
                </div>
                {product.reviews && (
                  <span className="text-slate-600 dark:text-slate-400">
                    ({product.reviews.length} reviews)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ₹{product.price}
            </div>
            {discount > 0 && (
              <>
                <div className="text-2xl text-slate-400 line-through">₹{originalPrice}</div>
                <div className="text-lg text-green-600 dark:text-green-400 font-semibold">
                  Save ₹{(originalPrice - product.price).toFixed(2)}
                </div>
              </>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-b border-slate-200 dark:border-slate-700 py-4">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-4">
            {product.stock !== undefined && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Stock</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">
                  {product.stock > 0 ? `${product.stock} units` : "Out of Stock"}
                </div>
              </div>
            )}
            {product.availabilityStatus && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Availability</div>
                <div className="text-lg font-bold text-green-600 dark:text-green-400">
                  {product.availabilityStatus}
                </div>
              </div>
            )}
            {product.sku && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">SKU</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{product.sku}</div>
              </div>
            )}
            {product.weight && (
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <div className="text-sm text-slate-600 dark:text-slate-400">Weight</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{product.weight}g</div>
              </div>
            )}
          </div>

          {/* Dimensions */}
          {product.dimensions && (
            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Dimensions</div>
              <div className="flex gap-4 text-slate-900 dark:text-white">
                <span>W: {product.dimensions.width}cm</span>
                <span>H: {product.dimensions.height}cm</span>
                <span>D: {product.dimensions.depth}cm</span>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="space-y-2">
            {product.warrantyInformation && (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span>🛡️</span>
                <span>{product.warrantyInformation}</span>
              </div>
            )}
            {product.shippingInformation && (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span>🚚</span>
                <span>{product.shippingInformation}</span>
              </div>
            )}
            {product.returnPolicy && (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span>↩️</span>
                <span>{product.returnPolicy}</span>
              </div>
            )}
            {product.minimumOrderQuantity && (
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <span>📦</span>
                <span>Minimum Order: {product.minimumOrderQuantity} units</span>
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-slate-700 dark:text-slate-300 font-semibold">Quantity:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-xl"
              >
                -
              </button>
              <span className="text-xl font-bold text-slate-900 dark:text-white w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-xl"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button 
              onClick={handleAddToCart}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🛒 {isInCart(product.id) ? `In Cart (${getItemQuantity(product.id)})` : 'Add to Cart'}
            </button>
            <button 
              onClick={handleBuyNow}
              className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              ⚡ Buy Now
            </button>
          </div>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
            Customer Reviews ({product.reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.reviewerName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {review.reviewerName}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(review.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-yellow-400 rounded-full">
                    <span>⭐</span>
                    <span className="font-bold text-slate-900 text-sm">{review.rating}</span>
                  </div>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Meta Information */}
      {product.meta && (
        <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
            {product.meta.barcode && (
              <div>
                <span className="font-semibold">Barcode:</span> {product.meta.barcode}
              </div>
            )}
            {product.meta.createdAt && (
              <div>
                <span className="font-semibold">Listed:</span>{" "}
                {new Date(product.meta.createdAt).toLocaleDateString()}
              </div>
            )}
            {product.meta.updatedAt && (
              <div>
                <span className="font-semibold">Last Updated:</span>{" "}
                {new Date(product.meta.updatedAt).toLocaleDateString()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

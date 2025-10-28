"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";
import { FavoritesContext } from "../context/FavoritesContext";

export default function Cart() {
  const {
    cart,
    isCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    toggleCart,
    addToCart,
  } = useContext(CartContext);
  const { favorites } = useContext(FavoritesContext);
  const router = useRouter();

  if (!isCartOpen) return null;

  const handleViewProduct = (productId) => {
    toggleCart();
    router.push(`/product/${productId}`);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity"
        onClick={toggleCart}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-screen w-full sm:w-[450px] bg-white dark:bg-slate-900 shadow-2xl z-[101] flex flex-col animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            🛒 Shopping Cart
            {cart.length > 0 && (
              <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded-full">
                {cart.length}
              </span>
            )}
          </h2>
          <button
            onClick={toggleCart}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close cart"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="text-8xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                Your cart is empty
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Add some products to get started!
              </p>
              <button
                onClick={toggleCart}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div
                      className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                      onClick={() => handleViewProduct(item.id)}
                    >
                      <img
                        src={item.thumbnail || item.images?.[0]}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="font-semibold text-slate-900 dark:text-white line-clamp-2 mb-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400"
                        onClick={() => handleViewProduct(item.id)}
                      >
                        {item.title}
                      </h3>
                      {item.brand && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                          {item.brand}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          ₹{item.price}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-600 text-sm font-semibold"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Quantity:
                    </span>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-lg flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="text-lg font-bold text-slate-900 dark:text-white w-8 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 font-bold text-lg flex items-center justify-center"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 dark:text-white">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clearCart}
                className="w-full py-2 text-red-500 hover:text-red-600 font-semibold text-sm hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="mt-6 pt-6 border-t-2 border-slate-300 dark:border-slate-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  ❤️ Your Favorites
                  <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                    {favorites.length}
                  </span>
                </h3>
              </div>
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {favorites.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg p-3 border border-pink-200 dark:border-pink-800"
                  >
                    <div className="flex gap-3">
                      {/* Product Image */}
                      <div
                        className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => handleViewProduct(item.id)}
                      >
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h4
                          className="font-semibold text-sm text-slate-900 dark:text-white line-clamp-1 cursor-pointer hover:text-pink-600 dark:hover:text-pink-400"
                          onClick={() => handleViewProduct(item.id)}
                        >
                          {item.title}
                        </h4>
                        {item.brand && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
                            {item.brand}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="text-base font-bold text-pink-600 dark:text-pink-400">
                            ₹{item.price}
                          </div>
                          <button
                            onClick={() => {
                              addToCart(item, 1);
                            }}
                            className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-md text-xs font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
                          >
                            🛒 Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {favorites.length > 5 && (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
                  Showing 5 of {favorites.length} favorites
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer - Total & Checkout */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-700 p-6 space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between text-lg">
              <span className="text-slate-600 dark:text-slate-400">Subtotal:</span>
              <span className="font-bold text-slate-900 dark:text-white">
                ₹{getTotalPrice().toFixed(2)}
              </span>
            </div>

            {/* Shipping Info */}
            <div className="text-sm text-slate-600 dark:text-slate-400 text-center">
              Shipping and taxes calculated at checkout
            </div>

            {/* Checkout Button */}
            <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              Proceed to Checkout
            </button>

            {/* Continue Shopping */}
            <button
              onClick={toggleCart}
              className="w-full py-3 border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </>
  );
}

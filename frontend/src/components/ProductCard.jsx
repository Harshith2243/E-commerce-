import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product, setSelectedProduct }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const inStock = (product.stock ?? 0) > 0;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative flex flex-col">

      {/* Category Badge */}
      {product.category && (
        <span className="absolute top-2 left-2 bg-black/80 text-yellow-400 text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full z-10">
          {product.category}
        </span>
      )}

      {/* Out of Stock Badge */}
      {!inStock && (
        <span className="absolute top-2 right-2 bg-red-600 text-white text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full z-10">
          Out of Stock
        </span>
      )}

      {/* Image */}
      <img
        onClick={() => setSelectedProduct(product)}
        src={product.image}
        alt={product.name}
        className={`h-36 sm:h-48 md:h-56 w-full object-cover cursor-pointer ${!inStock ? "opacity-50" : ""}`}
      />

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">

        {/* Name */}
        <h2 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 line-clamp-2 leading-tight">
          {product.name}
        </h2>

        {/* Brand */}
        {product.brand && (
          <p className="text-gray-400 text-xs mt-0.5">{product.brand}</p>
        )}

        {/* Rating */}
        {product.numReviews > 0 ? (
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-yellow-500 text-xs">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-gray-400 text-xs">({product.numReviews})</span>
          </div>
        ) : (
          <p className="text-gray-300 text-xs mt-1">No reviews yet</p>
        )}

        {/* Description - hidden on mobile to save space */}
        <p className="hidden sm:block text-gray-500 text-xs mt-2 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500 mt-2">
          ₹{product.price.toLocaleString()}
        </p>

        {/* Buttons */}
        <div className="mt-auto pt-3 flex flex-col gap-2">
          <button
            onClick={() => {
              addToWishlist(product);
              toast.success("Added to Wishlist");
            }}
            className="bg-red-500 text-white w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-red-600 transition"
          >
            ♡ Wishlist
          </button>

          <button
            disabled={!inStock}
            onClick={() => {
              addToCart(product);
              toast.success("Added to Cart");
            }}
            className={`w-full py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
              inStock
                ? "bg-black text-white hover:bg-yellow-400 hover:text-black"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
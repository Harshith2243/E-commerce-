import toast from "react-hot-toast";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({
  product,
  setSelectedProduct,
}) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  const inStock = (product.stock ?? 0) > 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden hover:scale-105 transition duration-300 relative">

      {product.category && (
        <span className="absolute top-3 left-3 bg-black/80 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full z-10">
          {product.category}
        </span>
      )}

      {!inStock && (
        <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-10">
          Out of Stock
        </span>
      )}

      <img
        onClick={() => setSelectedProduct(product)}
        src={product.image}
        alt={product.name}
        className={`h-72 w-full object-cover cursor-pointer ${!inStock ? "opacity-50" : ""}`}
      />

      <div className="p-5">
        <h2 className="text-2xl font-bold">
          {product.name}
        </h2>

        {product.brand && (
          <p className="text-gray-400 text-sm mt-1">{product.brand}</p>
        )}

        {product.numReviews > 0 ? (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-500">
              {"★".repeat(Math.round(product.rating))}
              {"☆".repeat(5 - Math.round(product.rating))}
            </span>
            <span className="text-gray-400 text-sm">({product.numReviews})</span>
          </div>
        ) : (
          <p className="text-gray-300 text-sm mt-2">No reviews yet</p>
        )}

        <p className="text-gray-500 mt-3 line-clamp-2">
          {product.description}
        </p>

        <p className="text-3xl font-bold text-yellow-500 mt-5">
          ₹{product.price}
        </p>

        <button
          onClick={() => {
            addToWishlist(product);
            toast.success("Added to Wishlist");
          }}
          className="bg-red-500 text-white w-full py-3 rounded-xl mt-4 hover:bg-red-600 transition"
        >
          Add To Wishlist
        </button>

        <button
          disabled={!inStock}
          onClick={() => {
            addToCart(product);
            toast.success("Added to Cart");
          }}
          className={`w-full py-4 rounded-xl mt-3 transition font-medium ${
            inStock
              ? "bg-black text-white hover:bg-yellow-400 hover:text-black"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          {inStock ? "Add To Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
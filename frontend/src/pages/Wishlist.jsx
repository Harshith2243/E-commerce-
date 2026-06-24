import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

export default function Wishlist({ setShowCart, setShowWishlist }) {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <button
          onClick={() => setShowWishlist && setShowWishlist(false)}
          className="text-gray-500 hover:text-gray-900 font-medium text-sm mb-5 sm:mb-6 flex items-center gap-1.5 transition-colors"
        >
          ← Back to store
        </button>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">
          My Wishlist
        </h1>
        <p className="text-gray-400 text-sm mb-6 sm:mb-8">
          {wishlist?.length || 0} item{wishlist?.length !== 1 ? "s" : ""} saved
        </p>

        {!wishlist || wishlist.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-8 sm:p-16 text-center">
            <div className="w-16 h-16 rounded-full bg-[#FF4500]/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl text-[#FF4500]">♥</span>
            </div>
            <p className="text-gray-900 font-bold mb-1">Your wishlist is empty</p>
            <p className="text-gray-400 text-sm mb-6">
              Save items you love and come back to them anytime
            </p>
            <button
              onClick={() => setShowWishlist && setShowWishlist(false)}
              className="bg-[#0D0D0D] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#FF4500] transition-colors"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {wishlist.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-52 sm:h-56 bg-gray-50 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-5">
                  <h2 className="font-bold text-gray-900 leading-snug text-sm sm:text-base">
                    {item.name}
                  </h2>

                  <p className="text-gray-400 text-sm mt-1.5 line-clamp-2">
                    {item.description}
                  </p>

                  <p className="text-xl sm:text-2xl text-[#0D0D0D] mt-3 font-bold">
                    ₹{item.price?.toLocaleString()}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      aria-label="Remove from wishlist"
                      className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:text-[#FF4500] hover:border-[#FF4500]/40 transition-colors flex-shrink-0"
                    >
                      ×
                    </button>
                    <button
                      onClick={() => {
                        addToCart(item);
                        toast.success("Added to cart");
                      }}
                      className="flex-1 bg-[#0D0D0D] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#FF4500] transition-colors"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
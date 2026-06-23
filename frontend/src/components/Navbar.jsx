import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ADMIN_EMAIL = "aripelliharshith123@gmail.com";

export default function Navbar({
  setShowLogin,
  setShowSignup,
  setShowCart,
  setShowWishlist,
  setShowProfile,
  setShowAdmin,
  setShowOrders,
}) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <nav className="bg-black text-white px-6 py-4 flex items-center justify-between sticky top-0 z-50 shadow-lg">
      <div
        className="text-2xl font-extrabold text-yellow-400 cursor-pointer tracking-wide"
        onClick={() => window.location.reload()}
      >
        FitKart
      </div>

      <div className="flex items-center gap-4 text-sm font-medium flex-wrap">

        <button
          onClick={() => window.location.reload()}
          className="hover:text-yellow-400 transition-colors"
        >
          Home
        </button>

        <button
          onClick={() => setShowWishlist && setShowWishlist(true)}
          className="hover:text-yellow-400 transition-colors"
        >
          Wishlist ({wishlistCount || 0})
        </button>

        <button
          onClick={() => setShowCart && setShowCart(true)}
          className="hover:text-yellow-400 transition-colors"
        >
          Cart ({cartCount || 0})
        </button>

        {user ? (
          <>
            <button
              onClick={() => setShowOrders && setShowOrders(true)}
              className="hover:text-yellow-400 transition-colors"
            >
              Orders
            </button>

            {user.email === ADMIN_EMAIL && (
              <button
                onClick={() => setShowAdmin && setShowAdmin(true)}
                className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
              >
                ⚡ Admin
              </button>
            )}

            <button
              onClick={handleLogout}
              className="hover:text-yellow-400 transition-colors"
            >
              Logout
            </button>

            <span className="text-yellow-400 font-semibold">
              Hi, {user.name?.split(" ")[0]}
            </span>

            <button
              onClick={() => setShowProfile && setShowProfile(true)}
              className="hover:text-yellow-400 transition-colors"
            >
              Profile
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowLogin && setShowLogin(true)}
              className="hover:text-yellow-400 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => setShowSignup && setShowSignup(true)}
              className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ADMIN_EMAIL = "aripelliharshith123@gmail.com";

export default function Navbar({
  goHome,
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

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <button
            onClick={() => {
              goHome();
              closeMenu();
            }}
            className="text-2xl sm:text-3xl font-extrabold text-yellow-400 tracking-wide"
          >
            FitKart
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-5 text-sm font-medium">
            <button
              onClick={goHome}
              className="hover:text-yellow-400 transition-colors"
            >
              Home
            </button>

            <button
              onClick={() => setShowWishlist(true)}
              className="hover:text-yellow-400 transition-colors"
            >
              Wishlist ({wishlistCount || 0})
            </button>

            <button
              onClick={() => setShowCart(true)}
              className="hover:text-yellow-400 transition-colors"
            >
              Cart ({cartCount || 0})
            </button>

            {user ? (
              <>
                <button
                  onClick={() => setShowOrders(true)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Orders
                </button>

                {user.email === ADMIN_EMAIL && (
                  <button
                    onClick={() => setShowAdmin(true)}
                    className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                  >
                    Admin
                  </button>
                )}

                <button
                  onClick={() => setShowProfile(true)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Profile
                </button>

                <span className="text-yellow-400 font-semibold">
                  Hi, {user.name?.split(" ")[0]}
                </span>

                <button
                  onClick={handleLogout}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setShowLogin(true)}
                  className="hover:text-yellow-400 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => setShowSignup(true)}
                  className="bg-yellow-400 text-black px-3 py-1 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-2xl text-yellow-400"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-gray-800">
            <div className="flex flex-col gap-3 pt-4 text-sm font-medium">
              <button
                onClick={() => {
                  goHome();
                  closeMenu();
                }}
                className="text-left hover:text-yellow-400 transition-colors"
              >
                Home
              </button>

              <button
                onClick={() => {
                  setShowWishlist(true);
                  closeMenu();
                }}
                className="text-left hover:text-yellow-400 transition-colors"
              >
                Wishlist ({wishlistCount || 0})
              </button>

              <button
                onClick={() => {
                  setShowCart(true);
                  closeMenu();
                }}
                className="text-left hover:text-yellow-400 transition-colors"
              >
                Cart ({cartCount || 0})
              </button>

              {user ? (
                <>
                  <button
                    onClick={() => {
                      setShowOrders(true);
                      closeMenu();
                    }}
                    className="text-left hover:text-yellow-400 transition-colors"
                  >
                    Orders
                  </button>

                  {user.email === ADMIN_EMAIL && (
                    <button
                      onClick={() => {
                        setShowAdmin(true);
                        closeMenu();
                      }}
                      className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-left"
                    >
                      Admin
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setShowProfile(true);
                      closeMenu();
                    }}
                    className="text-left hover:text-yellow-400 transition-colors"
                  >
                    Profile
                  </button>

                  <p className="text-yellow-400 font-semibold">
                    Hi, {user.name?.split(" ")[0]}
                  </p>

                  <button
                    onClick={handleLogout}
                    className="text-left hover:text-yellow-400 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      closeMenu();
                    }}
                    className="text-left hover:text-yellow-400 transition-colors"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => {
                      setShowSignup(true);
                      closeMenu();
                    }}
                    className="bg-yellow-400 text-black px-3 py-2 rounded-lg font-bold hover:bg-yellow-300 transition-colors text-left"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
import { useState } from "react";
import Navbar from "./components/Navbar"; // ✅ import Navbar here
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const renderPage = () => {
    if (showAdmin) return <Admin setShowAdmin={setShowAdmin} />;
    if (showSignup) return <Signup setShowSignup={setShowSignup} setShowLogin={setShowLogin} />;
    if (showLogin) return <Login setShowLogin={setShowLogin} setShowSignup={setShowSignup} />;
    if (showWishlist) return <Wishlist setShowCart={setShowCart} setShowWishlist={setShowWishlist} />;
    if (showCheckout) return <Checkout setShowCheckout={setShowCheckout} setShowOrders={setShowOrders} />;
    if (showProfile) return <Profile setShowProfile={setShowProfile} setShowOrders={setShowOrders} setShowAdmin={setShowAdmin} />;
    if (showOrders) return <Orders setShowOrders={setShowOrders} />;
    if (selectedProduct) return <ProductDetails product={selectedProduct} setSelectedProduct={setSelectedProduct} />;
    if (showCart) return <Cart setShowCart={setShowCart} setShowCheckout={setShowCheckout} />;
    return (
      <Home
        setShowCart={setShowCart}
        setShowWishlist={setShowWishlist}
        setSelectedProduct={setSelectedProduct}
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        setShowAdmin={setShowAdmin}
        setShowOrders={setShowOrders}
        setShowProfile={setShowProfile}
      />
    );
  };

  return (
    <>
      {/* ✅ Navbar always visible on every page */}
      <Navbar
        setShowLogin={setShowLogin}
        setShowSignup={setShowSignup}
        setShowCart={setShowCart}
        setShowWishlist={setShowWishlist}
        setShowProfile={setShowProfile}
        setShowAdmin={setShowAdmin}
        setShowOrders={setShowOrders}
      />
      {renderPage()}
    </>
  );
}
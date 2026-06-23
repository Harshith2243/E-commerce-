import { createContext, useContext, useState, useEffect, useRef } from "react";
import API from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const saveTimeout = useRef(null);
  const skipNextSave = useRef(true); // prevents save-on-mount before load finishes

  const getUser = () => JSON.parse(localStorage.getItem("user") || "null");

  // Load saved cart from DB on mount / login
  useEffect(() => {
    const user = getUser();
    if (!user?.email) {
      setLoaded(true);
      return;
    }
    (async () => {
      try {
        const { data } = await API.get(`/cart/${encodeURIComponent(user.email)}`);
        if (Array.isArray(data) && data.length > 0) {
          setCart(data.map((i) => ({ ...i, qty: i.qty || 1 })));
        }
      } catch {
        // no saved cart yet — fine
      } finally {
        // wait a tick so the setCart above commits before saving is armed
        setTimeout(() => {
          skipNextSave.current = false;
          setLoaded(true);
        }, 0);
      }
    })();
  }, []);

  // Debounced auto-save to DB whenever cart changes (only after load completes)
  useEffect(() => {
    if (!loaded) return;
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }

    const user = getUser();
    if (!user?.email) return;

    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      API.post("/cart", { user: user.email, items: cart }).catch(() => {});
    }, 600);

    return () => clearTimeout(saveTimeout.current);
  }, [cart, loaded]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item._id === product._id);
      if (existing) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item._id !== productId));
  };

  const increaseQty = (productId) => {
    setCart((prev) =>
      prev.map((item) =>
        item._id === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === productId ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const clearCart = () => {
    setCart([]);
    const user = getUser();
    if (user?.email) {
      API.delete(`/cart/${encodeURIComponent(user.email)}`).catch(() => {});
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      increaseQty,
      decreaseQty,
      clearCart,
      cartTotal,
      cartCount,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
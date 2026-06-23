import { useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Checkout({ setShowCheckout, setShowOrders }) {
  const { cart, clearCart } = useCart();

  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) =>
      acc + item.price * item.qty,
    0
  );

  const placeOrderHandler = async () => {
    if (!address.trim()) {
      toast.error("Please enter your address");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      await API.post("/orders", {
        user: user.email,
        products: cart,
        totalPrice,
        address,
      });

      toast.success("Order Placed Successfully");
      clearCart();
      setShowCheckout && setShowCheckout(false);
      setShowOrders && setShowOrders(true);

    } catch (error) {
      toast.error("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <button
        onClick={() => setShowCheckout && setShowCheckout(false)}
        className="bg-black text-white px-6 py-3 rounded-xl mb-6"
      >
        ← Back
      </button>

      <h1 className="text-5xl font-bold mb-10">
        Checkout
      </h1>

      <div className="bg-white p-8 rounded-3xl shadow-xl">

        <input
          type="text"
          placeholder="Full Address"
          value={address}
          onChange={(e) =>
            setAddress(e.target.value)
          }
          className="w-full border p-4 rounded-xl mb-5"
        />

        <h2 className="text-3xl font-bold">
          Total: ₹{totalPrice}
        </h2>

        <button
          onClick={placeOrderHandler}
          className="bg-black text-white px-8 py-4 rounded-xl mt-6"
        >
          Place Order
        </button>

      </div>

    </div>
  );
}
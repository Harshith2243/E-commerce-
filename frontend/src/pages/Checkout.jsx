import { useState } from "react";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import toast from "react-hot-toast";

export default function Checkout({ setShowCheckout, setShowOrders }) {
  const { cart, clearCart } = useCart();
  const [address, setAddress] = useState("");

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
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
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post("/orders", {
        user: user.email,
        products: cart,
        totalPrice,
        address,
      });

      toast.success("Order Placed Successfully");
      clearCart();
      setShowCheckout(false);
      setShowOrders(true);
    } catch (error) {
      toast.error("Order Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <button
          onClick={() => setShowCheckout(false)}
          className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl mb-5 sm:mb-6 hover:bg-gray-800 transition text-sm sm:text-base"
        >
          ← Back
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10">
          Checkout
        </h1>

        <div className="bg-white p-5 sm:p-8 rounded-3xl shadow-xl">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address
          </label>

          <textarea
            rows={4}
            placeholder="Enter your full address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 text-sm sm:text-base outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
          />

          <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 mb-4">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-900">
              Order Summary
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in cart
            </p>

            <div className="mt-4 space-y-2">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between gap-4 text-sm sm:text-base"
                >
                  <span className="text-gray-700">
                    {item.name} × {item.qty}
                  </span>
                  <span className="font-medium text-gray-900 whitespace-nowrap">
                    ₹{(item.price * item.qty).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 flex items-center justify-between">
              <span className="text-lg sm:text-2xl font-bold">Total</span>
              <span className="text-xl sm:text-3xl font-bold text-yellow-500">
                ₹{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>

          <button
            onClick={placeOrderHandler}
            className="bg-black text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl mt-2 w-full sm:w-auto text-sm sm:text-base font-bold hover:bg-yellow-400 hover:text-black transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
import { useCart } from "../context/CartContext";

export default function Cart({ setShowCart, setShowCheckout }) {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        <button
          onClick={() => setShowCart(false)}
          className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl mb-5 sm:mb-6 hover:bg-gray-800 transition text-sm sm:text-base"
        >
          ← Back to Store
        </button>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 sm:mb-10">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <h2 className="text-lg sm:text-2xl text-gray-400">Cart is Empty</h2>
        ) : (
          <div className="grid gap-5 sm:gap-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-5 rounded-2xl shadow flex flex-col sm:flex-row gap-4 sm:gap-6 relative"
              >
                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item._id)}
                  title="Remove from cart"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-red-500 text-2xl font-bold transition-colors"
                >
                  ×
                </button>

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full sm:w-32 h-52 sm:h-32 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-bold pr-8 sm:pr-0">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 text-sm sm:text-base mt-1">
                    {item.description}
                  </p>

                  <p className="text-yellow-500 text-xl sm:text-2xl font-bold mt-3">
                    ₹{item.price}
                  </p>

                  <p className="text-gray-400 text-sm mt-1">
                    Subtotal: ₹{(item.price * item.qty).toLocaleString()}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      -
                    </button>

                    <span className="text-lg sm:text-2xl font-bold w-8 sm:w-10 text-center">
                      {item.qty}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
                    >
                      +
                    </button>

                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-red-500 hover:text-red-600 font-medium text-sm underline sm:ml-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-black text-white p-5 sm:p-8 rounded-2xl mt-4 sm:mt-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Total: ₹{totalPrice.toLocaleString()}
              </h2>

              <button
                onClick={() => setShowCheckout(true)}
                className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded-xl mt-5 sm:mt-6 text-base sm:text-xl font-bold hover:bg-yellow-300 transition w-full sm:w-auto"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
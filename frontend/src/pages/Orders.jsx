import { useState, useEffect } from "react";

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-indigo-100 text-indigo-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  Pending: "🕐",
  Processing: "⚙️",
  Shipped: "🚚",
  Delivered: "✅",
  Cancelled: "❌",
};

export default function Orders({ setShowOrders }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user) return;
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/orders/user/${encodeURIComponent(user.email)}`
      );
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => setShowOrders(false);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center">
          <p className="text-gray-500 mb-4">Please login to view your orders</p>
          <button
            onClick={goHome}
            className="bg-black text-white px-6 py-3 rounded-xl font-bold"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={goHome}
          className="bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold mb-5 sm:mb-6 hover:bg-gray-800 transition text-sm sm:text-base"
        >
          ← Back to Home
        </button>

        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            My Orders
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} placed
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 sm:p-12 text-center shadow-xl">
            <div className="text-5xl mb-4">🛍️</div>
            <p className="text-gray-500 mb-4">No orders yet. Start shopping!</p>
            <button
              onClick={goHome}
              className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 hover:text-black transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-xl p-4 sm:p-5"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900 text-sm">
                        Order #{order._id?.slice(-8).toUpperCase()}
                      </span>

                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                          statusColors[order.status] || statusColors.Pending
                        }`}
                      >
                        {statusIcons[order.status]} {order.status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-400">
                      Placed on{" "}
                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })
                        : "—"}
                    </p>
                  </div>

                  <div className="sm:text-right">
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      ₹{order.totalPrice?.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">Total amount</p>
                  </div>
                </div>

                {/* Address */}
                {order.address && (
                  <div className="bg-gray-50 rounded-lg p-3 mb-4 flex items-start gap-2">
                    <span className="text-sm">📍</span>
                    <div>
                      <p className="text-xs font-medium text-gray-600">
                        Delivery address
                      </p>
                      <p className="text-sm text-gray-700 break-words">
                        {order.address}
                      </p>
                    </div>
                  </div>
                )}

                {/* Items */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">
                    {order.products?.length} item
                    {order.products?.length !== 1 ? "s" : ""}
                  </p>

                  <div className="space-y-2">
                    {order.products?.map((item, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <span className="bg-blue-50 text-blue-600 text-xs px-2 py-0.5 rounded font-medium">
                            ×{item.qty}
                          </span>
                          <span className="text-gray-700">{item.name}</span>
                        </div>

                        <span className="text-gray-900 font-medium sm:text-right">
                          ₹{(item.price * item.qty)?.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                {order.status !== "Cancelled" && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-0 overflow-x-auto">
                      {["Pending", "Processing", "Shipped", "Delivered"].map(
                        (s, i, arr) => {
                          const statOrder = [
                            "Pending",
                            "Processing",
                            "Shipped",
                            "Delivered",
                          ];
                          const currentIdx = statOrder.indexOf(order.status);
                          const isCompleted = i <= currentIdx;
                          const isLast = i === arr.length - 1;

                          return (
                            <div
                              key={s}
                              className="flex items-center flex-1 min-w-[90px] last:flex-none"
                            >
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                                    isCompleted
                                      ? "bg-blue-600 text-white"
                                      : "bg-gray-100 text-gray-400"
                                  }`}
                                >
                                  {isCompleted ? "✓" : i + 1}
                                </div>
                                <span className="text-[11px] text-gray-400 mt-1 text-center">
                                  {s}
                                </span>
                              </div>

                              {!isLast && (
                                <div
                                  className={`h-0.5 flex-1 mx-1 ${
                                    i < currentIdx
                                      ? "bg-blue-600"
                                      : "bg-gray-200"
                                  }`}
                                />
                              )}
                            </div>
                          );
                        }
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
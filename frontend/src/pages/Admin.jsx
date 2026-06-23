import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const ADMIN_EMAIL = "aripelliharshith123@gmail.com";
const API = "http://localhost:5000/api";

export default function Admin({ setShowAdmin }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [tab, setTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({
    name: "", price: "", description: "", category: "",
    image: "", stock: "", brand: "",
  });

  // Auth guard
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      toast.error("Admin access only");
      setShowAdmin && setShowAdmin(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/products`);
      const data = await res.json();
      setProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${API}/orders`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch {
      toast.error("Failed to load orders");
    }
  };

  const resetForm = () => {
    setForm({ name: "", price: "", description: "", category: "", image: "", stock: "", brand: "" });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
      image: product.image || "",
      stock: product.stock ?? "",
      brand: product.brand || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      const res = await fetch(`${API}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      if (res.ok) {
        toast.success("Product deleted");
        fetchProducts();
      } else {
        toast.error("Delete failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    const payload = { ...form, price: Number(form.price), stock: Number(form.stock) || 0 };
    const url = editingProduct
      ? `${API}/products/${editingProduct._id}`
      : `${API}/products`;
    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        toast.success(editingProduct ? "Product updated!" : "Product added!");
        resetForm();
        fetchProducts();
      } else {
        const err = await res.json();
        toast.error(err.message || "Failed to save product");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const res = await fetch(`${API}/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        toast.success("Status updated");
        fetchOrders();
      } else {
        toast.error("Update failed");
      }
    } catch {
      toast.error("Server error");
    }
  };

  const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

  if (!user || user.email !== ADMIN_EMAIL) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              ⚡ FitKart Admin
            </h1>
            <p className="text-sm text-gray-500">Manage your store</p>
          </div>
          <div className="flex gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400 self-center">
              {products.length} products · {orders.length} orders
            </span>
            <button
              onClick={() => setShowAdmin && setShowAdmin(false)}
              className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              ← Back to Store
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {["products", "orders"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-5 py-2 font-medium capitalize transition-all rounded-t-lg ${
                tab === t
                  ? "bg-white dark:bg-gray-800 text-blue-600 border border-b-white dark:border-gray-700 dark:border-b-gray-800 -mb-px"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t === "products" ? `📦 Products (${products.length})` : `🛒 Orders (${orders.length})`}
            </button>
          ))}
        </div>

        {/* ── PRODUCTS TAB ── */}
        {tab === "products" && (
          <div>
            {/* Add/Edit Form */}
            {showForm && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  {editingProduct ? "✏️ Edit Product" : "➕ Add New Product"}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Product Name *", key: "name", placeholder: "e.g. Whey Protein 1kg" },
                    { label: "Price (₹) *", key: "price", placeholder: "e.g. 1499", type: "number" },
                    { label: "Brand", key: "brand", placeholder: "e.g. MuscleBlaze" },
                    { label: "Category", key: "category", placeholder: "e.g. Protein, Creatine, Apparel" },
                    { label: "Stock", key: "stock", placeholder: "e.g. 100", type: "number" },
                    { label: "Image URL", key: "image", placeholder: "https://..." },
                  ].map(({ label, key, placeholder, type }) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {label}
                      </label>
                      <input
                        type={type || "text"}
                        placeholder={placeholder}
                        value={form[key]}
                        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                        className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Product description..."
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                  </div>
                  {/* Image preview */}
                  {form.image && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-500 mb-1">Image preview:</p>
                      <img
                        src={form.image}
                        alt="preview"
                        className="h-24 w-24 object-cover rounded-lg border"
                        onError={(e) => (e.target.style.display = "none")}
                      />
                    </div>
                  )}
                  <div className="md:col-span-2 flex gap-3">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      {editingProduct ? "Update Product" : "Add Product"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Add button */}
            {!showForm && (
              <button
                onClick={() => setShowForm(true)}
                className="mb-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors"
              >
                <span>+</span> Add Product
              </button>
            )}

            {/* Products table */}
            {loading ? (
              <div className="text-center py-12 text-gray-500">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No products yet. Add your first product!</div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                      <tr>
                        {["Image", "Name", "Brand", "Category", "Price", "Stock", "Actions"].map((h) => (
                          <th key={h} className="text-left px-4 py-3 text-gray-600 dark:text-gray-300 font-medium">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                      {products.map((p) => (
                        <tr key={p._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                          <td className="px-4 py-3">
                            {p.image ? (
                              <img
                                src={p.image}
                                alt={p.name}
                                className="h-12 w-12 object-cover rounded-lg"
                                onError={(e) => (e.target.src = "https://via.placeholder.com/48")}
                              />
                            ) : (
                              <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                                📦
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium text-gray-900 dark:text-white max-w-[180px] truncate">
                            {p.name}
                          </td>
                          <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{p.brand || "—"}</td>
                          <td className="px-4 py-3">
                            {p.category ? (
                              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full text-xs font-medium">
                                {p.category}
                              </span>
                            ) : "—"}
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900 dark:text-white">
                            ₹{p.price?.toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                              (p.stock ?? 0) > 10
                                ? "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                : (p.stock ?? 0) > 0
                                ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                : "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            }`}>
                              {p.stock ?? "N/A"} {(p.stock ?? 0) === 0 && p.stock !== undefined ? "(Out)" : ""}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(p)}
                                className="bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(p._id)}
                                className="bg-red-50 hover:bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── ORDERS TAB ── */}
        {tab === "orders" && (
          <div>
            <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              All Orders
            </h2>
            {orders.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No orders yet.</div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5"
                  >
                    <div className="flex flex-wrap gap-4 justify-between items-start mb-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          Order #{order._id?.slice(-8).toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-500 mt-0.5">
                          Customer: <span className="font-medium">{order.user}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                          📍 {order.address}
                        </p>
                        <p className="text-sm text-gray-400 mt-0.5">
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "short", year: "numeric",
                          }) : ""}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ₹{order.totalPrice?.toLocaleString()}
                        </p>
                        <select
                          value={order.status || "Pending"}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`mt-2 text-sm font-medium px-3 py-1.5 rounded-lg border outline-none cursor-pointer ${
                            order.status === "Delivered"
                              ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                              : order.status === "Shipped"
                              ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800"
                              : order.status === "Cancelled"
                              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800"
                              : "bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800"
                          }`}
                        >
                          {statuses.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* Products list */}
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-3 mt-3">
                      <p className="text-xs font-medium text-gray-500 mb-2 uppercase tracking-wide">
                        Items ({order.products?.length})
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {order.products?.map((item, i) => (
                          <span
                            key={i}
                            className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg text-sm"
                          >
                            {item.name} × {item.qty} — ₹{(item.price * item.qty)?.toLocaleString()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { useEffect, useState } from "react";

import API from "../services/api";

import ProductCard from "../components/ProductCard";
 
import HeroSection from "../components/HeroSection";

export default function Home({
  setShowCart,
  setSelectedProduct,
  setShowLogin,
  setShowSignup,
  setShowWishlist,
  setShowAdmin,
  setShowOrders,
  setShowProfile,
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await API.get("/products");

      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );


   

   return (
  <div className="bg-gray-100 min-h-screen">
    <HeroSection />
    <div id="featured-products" className="p-10">
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-6 py-4 rounded-2xl border text-xl shadow-lg focus:outline-none"
        />
      </div>
      <h2 className="text-4xl font-bold mb-10 text-center">
        Featured Products
      </h2>
      <div className="grid md:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            setSelectedProduct={setSelectedProduct}
          />
        ))}
      </div>
    </div>
  </div>
);
}
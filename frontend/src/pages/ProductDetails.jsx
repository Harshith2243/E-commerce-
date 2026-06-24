import { useState } from "react";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";
import API from "../services/api";

export default function ProductDetails({ product, setSelectedProduct }) {
  const { addToCart } = useCart();
  const [currentProduct, setCurrentProduct] = useState(product);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [submitting, setSubmitting] = useState(false);

  const inStock = (currentProduct.stock ?? 0) > 0;
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to leave a review");
      return;
    }
    if (!reviewForm.comment.trim()) {
      toast.error("Please write a comment");
      return;
    }

    setSubmitting(true);
    try {
      const { data } = await API.post(
        `/products/${currentProduct._id}/reviews`,
        {
          user: user.name,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }
      );
      setCurrentProduct(data.product);
      setReviewForm({ rating: 5, comment: "" });
      toast.success("Review submitted!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <button
          onClick={() => setSelectedProduct(null)}
          className="text-gray-500 hover:text-gray-900 font-medium text-sm mb-5 sm:mb-6 flex items-center gap-1.5 transition-colors"
        >
          ← Back to products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="rounded-2xl overflow-hidden bg-gray-50 h-[280px] sm:h-[380px] lg:h-[420px]">
            <img
              src={currentProduct.image}
              alt={currentProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            {currentProduct.category && (
              <span className="bg-[#0D0D0D] text-[#F5F0E8] text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-md w-fit">
                {currentProduct.category}
              </span>
            )}

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mt-4 leading-tight">
              {currentProduct.name}
            </h1>

            {currentProduct.brand && (
              <p className="text-gray-400 text-xs sm:text-sm font-medium mt-1 uppercase tracking-wide">
                {currentProduct.brand}
              </p>
            )}

            {currentProduct.numReviews > 0 ? (
              <div className="flex items-center gap-2 mt-4 flex-wrap">
                <span className="text-[#C9A876] text-base sm:text-lg">
                  {"★".repeat(Math.round(currentProduct.rating))}
                  {"☆".repeat(5 - Math.round(currentProduct.rating))}
                </span>
                <span className="text-gray-400 text-sm">
                  ({currentProduct.numReviews} review
                  {currentProduct.numReviews !== 1 ? "s" : ""})
                </span>
              </div>
            ) : (
              <p className="text-gray-400 text-sm mt-4">
                No reviews yet — be the first
              </p>
            )}

            <p className="text-gray-500 mt-5 leading-relaxed text-sm sm:text-base">
              {currentProduct.description}
            </p>

            <div className="flex items-baseline gap-3 mt-6">
              <span className="text-3xl sm:text-4xl text-[#0D0D0D] font-bold">
                ₹{currentProduct.price?.toLocaleString()}
              </span>
            </div>

            <p
              className={`mt-2 text-sm font-bold flex items-center gap-1.5 ${
                inStock ? "text-green-600" : "text-[#FF4500]"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  inStock ? "bg-green-600" : "bg-[#FF4500]"
                }`}
              />
              {inStock
                ? `In stock — ${currentProduct.stock} available`
                : "Out of stock"}
            </p>

            <button
              disabled={!inStock}
              onClick={() => addToCart(currentProduct)}
              className={`mt-7 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold tracking-wide transition-all w-full sm:w-auto ${
                inStock
                  ? "bg-[#0D0D0D] text-white hover:bg-[#FF4500]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              {inStock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-6 sm:mt-8 bg-white p-4 sm:p-6 lg:p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-5 sm:mb-6">
            Customer Reviews
          </h2>

          {currentProduct.reviews?.length > 0 ? (
            <div className="space-y-5 mb-8">
              {currentProduct.reviews.map((r, i) => (
                <div key={i} className="border-b border-gray-100 pb-5 last:border-0">
                  <div className="flex items-start sm:items-center justify-between gap-3">
                    <p className="font-bold text-gray-900 text-sm">{r.user}</p>
                    <span className="text-[#C9A876] text-sm whitespace-nowrap">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1.5 text-sm leading-relaxed">
                    {r.comment}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mb-8 text-sm">No reviews yet.</p>
          )}

          <form onSubmit={handleSubmitReview} className="bg-gray-50 p-4 sm:p-6 rounded-2xl">
            <h3 className="font-bold text-gray-900 mb-4">Write a review</h3>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="text-sm font-medium text-gray-600">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() =>
                    setReviewForm({ ...reviewForm, rating: star })
                  }
                  className={`text-2xl leading-none ${
                    star <= reviewForm.rating
                      ? "text-[#C9A876]"
                      : "text-gray-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            <textarea
              rows={4}
              placeholder="Share your experience with this product..."
              value={reviewForm.comment}
              onChange={(e) =>
                setReviewForm({ ...reviewForm, comment: e.target.value })
              }
              className="w-full border border-gray-200 rounded-xl p-4 mb-4 outline-none focus:ring-2 focus:ring-[#FF4500]/40 text-sm"
            />

            <button
              type="submit"
              disabled={submitting}
              className="bg-[#0D0D0D] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#FF4500] transition-colors disabled:opacity-50 w-full sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
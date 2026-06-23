import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    description: { type: String, default: "" },
    category:    { type: String, default: "", trim: true },
    brand:       { type: String, default: "", trim: true },
    image:       { type: String, default: "" },
    stock:       { type: Number, default: 0, min: 0 },
    rating:      { type: Number, default: 0 },
    numReviews:  { type: Number, default: 0 },
    reviews: [
      {
        user:      String,
        comment:   String,
        rating:    Number,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
    },
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        image: String,
        qty: Number,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
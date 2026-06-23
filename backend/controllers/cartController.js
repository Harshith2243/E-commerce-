import Cart from "../models/Cart.js";

// @desc   Get saved cart for a user
// @route  GET /api/cart/:email
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.email });
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Save / overwrite a user's cart
// @route  POST /api/cart
export const saveCart = async (req, res) => {
  try {
    const { user, items } = req.body;
    if (!user) {
      return res.status(400).json({ message: "User is required" });
    }

    const cart = await Cart.findOneAndUpdate(
      { user },
      { items },
      { new: true, upsert: true }
    );

    res.json({ message: "Cart saved", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   Clear a user's saved cart
// @route  DELETE /api/cart/:email
export const clearSavedCart = async (req, res) => {
  try {
    await Cart.findOneAndUpdate(
      { user: req.params.email },
      { items: [] }
    );
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
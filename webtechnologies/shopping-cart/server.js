const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Mongoose Schemas
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const cartSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model("Product", productSchema);
const Cart = mongoose.model("Cart", cartSchema);

// API Endpoints

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Error fetching products." });
  }
});

// Add a new product
app.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Error adding product." });
  }
});

// Update an existing product
app.put("/products/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // Return the updated document
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: "Error updating product." });
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const result = await Product.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error deleting product." });
  }
});

// Get all cart items
app.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    res.status(500).json({ error: "Error fetching cart items." });
  }
});

// Add a new item to the cart
app.post("/cart", async (req, res) => {
  try {
    const cartItem = new Cart(req.body);
    await cartItem.save();
    res.json(cartItem);
  } catch (err) {
    res.status(500).json({ error: "Error adding item to cart." });
  }
});

// Remove an item from the cart
app.delete("/cart/:id", async (req, res) => {
  try {
    const result = await Cart.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Cart item not found." });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error removing item from cart." });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

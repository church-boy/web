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
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true }
});

const borrowingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  borrower: { type: String, required: true }
});

const Book = mongoose.model("Book", bookSchema);
const Borrowing = mongoose.model("Borrowing", borrowingSchema);

// API Endpoints

// Get all books
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Error fetching books." });
  }
});

// Add a new book
app.post("/books", async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Error adding book." });
  }
});

// Update an existing book
app.put("/books/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ error: "Error updating book." });
  }
});

// Delete a book
app.delete("/books/:id", async (req, res) => {
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Book not found." });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error deleting book." });
  }
});

// Get all borrowings
app.get("/borrowings", async (req, res) => {
  try {
    const borrowings = await Borrowing.find();
    res.json(borrowings);
  } catch (err) {
    res.status(500).json({ error: "Error fetching borrowed books." });
  }
});

// Add a new borrowing
app.post("/borrowings", async (req, res) => {
  try {
    const borrowing = new Borrowing(req.body);
    await borrowing.save();
    res.json(borrowing);
  } catch (err) {
    res.status(500).json({ error: "Error adding borrowed book." });
  }
});

// Remove a borrowing (return a book)
app.delete("/borrowings/:id", async (req, res) => {
  try {
    const result = await Borrowing.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Borrowed book not found." });
    }
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error returning book." });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

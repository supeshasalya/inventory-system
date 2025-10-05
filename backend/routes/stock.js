// routes/stock.js
import express from "express";
import db from "../config/db.js";

const router = express.Router();

// ➕ Stock IN — add items to inventory
router.post("/in", (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity required" });
  }

  const query = "UPDATE products SET stock = stock + ? WHERE id = ?";
  db.query(query, [quantity, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stock added successfully", result });
  });
});

// ➖ Stock OUT — remove items from inventory
router.post("/out", (req, res) => {
  const { product_id, quantity } = req.body;

  if (!product_id || !quantity) {
    return res.status(400).json({ message: "Product ID and quantity required" });
  }

  const query = "UPDATE products SET stock = stock - ? WHERE id = ?";
  db.query(query, [quantity, product_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Stock removed successfully", result });
  });
});

// 📦 Fetch all products
router.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

export default router;

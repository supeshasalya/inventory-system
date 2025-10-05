// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js"; // ✅ Import the DB connection
import stockRoutes from "./routes/stock.js"; // ✅ Import routes

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Inventory System Backend Running 🚀");
});

// Use stock routes
app.use("/api/stock", stockRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

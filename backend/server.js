require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

console.log("MONGO_URI:", process.env.MONGO_URI);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/uploads", express.static("uploads"));

// Test route
app.get("/", (req, res) => {
  res.send("API Working ✅");
});

// PORT FIX ✅
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
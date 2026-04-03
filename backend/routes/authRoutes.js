const router = require("express").Router();

// ✅ Import controller
const {
  signup,
  login
} = require("../controllers/authController");

// 🔐 AUTH ROUTES

// 👉 Signup
router.post("/signup", signup);

// 👉 Login
router.post("/login", login);

module.exports = router;
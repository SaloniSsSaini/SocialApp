const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // 🔐 token get
    const token = req.headers.authorization?.split(" ")[1];

    // ❌ no token
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // ✅ verify token
    const decoded = jwt.verify(token, "secret");

    // 🔥 attach user
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token" });
  }
};
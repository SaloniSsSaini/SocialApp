const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    let token = req.headers.authorization;

    if (!token) {
      return res.status(401).json("No token provided");
    }

    // 🔥 HANDLE Bearer token
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    const decoded = jwt.verify(token, "secret");

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(400).json("Invalid token");
  }
};
const jwt = require("jsonwebtoken");

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error in authenticateJWT:", error);
    res.status(401).json({ error: "Invalid token." });
  }
};

// Middleware for admin authorization
const isAdmin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res
      .status(403)
      .json({ error: "Access denied. Admin privileges required." });
  }
  next();
};

module.exports = { authenticateJWT, isAdmin };

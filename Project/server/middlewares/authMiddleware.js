// src/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../modals/user.modal");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "No token provided", isError: true });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found", isError: true });
    }

    req.user = user;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token", isError: true });
  }
};

module.exports = authMiddleware;

const express = require("express");
const {
  registeruser,
  profileInformation,
} = require("../controllers/users.controller");
const authMiddleware = require("../middlewares/authMiddleware");

const userRoutes = express.Router();

userRoutes.post("/signup", registeruser);

userRoutes.get("/profile", authMiddleware, profileInformation);

module.exports = userRoutes;

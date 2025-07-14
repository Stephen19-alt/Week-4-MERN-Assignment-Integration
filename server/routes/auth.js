// This file defines the authentication routes for user registration and login.
const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);

module.exports = router;

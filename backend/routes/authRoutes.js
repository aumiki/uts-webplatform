const express = require("express");
const router = express.Router();
const { register, login, refresh, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", require("../middleware/authMiddleware"), require("../controllers/authController").getProfile);

module.exports = router;

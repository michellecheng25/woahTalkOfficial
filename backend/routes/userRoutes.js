const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUserInfo,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken, getCurrentUserInfo);

module.exports = router;

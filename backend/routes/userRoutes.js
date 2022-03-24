const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.route("/").get(getAllUsers).post(registerUser);
router.post("/login", loginUser);
router.get("/me", authenticateToken, getCurrentUserInfo);
router.get("/:username", getUser);
router
  .route("/:username")
  .put(authenticateToken, updateUser)
  .delete(authenticateToken, deleteUser);

module.exports = router;

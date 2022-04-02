const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  createMessage,
  getMessages,
} = require("../controllers/messageController");

const { authenticateToken } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authenticateToken, getMessages)
  .post(authenticateToken, createMessage);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversations,
  //getConversation,
} = require("../controllers/conversationController");
const { authenticateToken } = require("../middleware/authMiddleware");

//Re-route into message router
const messageRouter = require("./messageRoute");
router.use("/:conversationId/messages", messageRouter);

router
  .route("/")
  .get(authenticateToken, getConversations)
  .post(authenticateToken, createConversation);

//router.route("/:conversationId").get(authenticateToken, getConversation);

module.exports = router;

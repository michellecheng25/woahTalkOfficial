const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
  likePost,
} = require("../controllers/postController");
const { authenticateToken } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authenticateToken, getPosts)
  .post(authenticateToken, createPost);

router
  .route("/:id")
  .get(getPost)
  .put(authenticateToken, editPost)
  .delete(authenticateToken, deletePost);

router.post("/:id/like", authenticateToken, likePost);

module.exports = router;

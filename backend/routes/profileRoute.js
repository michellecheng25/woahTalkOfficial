const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  getUserPosts,
} = require("../controllers/profileController");

router.get("/:username", getUserInfo);
router.get("/:username/posts", getUserPosts);

module.exports = router;

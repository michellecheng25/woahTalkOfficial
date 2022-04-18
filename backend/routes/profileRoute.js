const express = require("express");
const router = express.Router();
const {
  getUserInfo,
  getUserPosts,
  getUserCourses,
} = require("../controllers/profileController");

router.get("/:username", getUserInfo);
router.get("/:username/posts", getUserPosts);
router.get("/:username/courses", getUserCourses);

module.exports = router;

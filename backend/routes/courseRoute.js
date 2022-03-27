const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
} = require("../controllers/courseController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.route("/").post(authenticateToken, createCourse);

router
  .route("/:courseId")
  .get(getCourse)
  .put(authenticateToken, editCourse)
  .delete(authenticateToken, deleteCourse);

module.exports = router;

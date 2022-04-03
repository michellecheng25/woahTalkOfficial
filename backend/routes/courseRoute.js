const express = require("express");
const router = express.Router();
const {
  getCourses,
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
  joinCourse,
} = require("../controllers/courseController");

const { authenticateToken } = require("../middleware/authMiddleware");

//Re-route into assignmennt router
const assignmentRouter = require("./assignmentRoute");
router.use("/:courseId/assignments", assignmentRouter);

router.route("/").get(getCourses).post(authenticateToken, createCourse);

router
  .route("/:courseId")
  .get(getCourse)
  .put(authenticateToken, editCourse)
  .delete(authenticateToken, deleteCourse);

router.post("/:courseId/join", authenticateToken, joinCourse);

module.exports = router;

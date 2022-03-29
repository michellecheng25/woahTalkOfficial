const express = require("express");
const router = express.Router();
const {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
  joinCourse,
} = require("../controllers/courseController");

const { authenticateToken } = require("../middleware/authMiddleware");

//Re-route into note router
const assignmentRouter = require("./assignmentRoute");
router.use("/:courseId/assignments", assignmentRouter);

router.route("/").post(authenticateToken, createCourse);

router
  .route("/:courseId")
  .get(getCourse)
  .put(authenticateToken, editCourse)
  .delete(authenticateToken, deleteCourse);

router.post("/:courseId/join", authenticateToken, joinCourse);

module.exports = router;

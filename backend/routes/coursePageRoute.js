const express = require("express");
const router = express.Router();
const {
  getCourseInfo,
  getCourseAnnouncements,
  getCourseMaterials,
  getCourseAssignments,
  getCourseAssignmentSubmission,
} = require("../controllers/coursePageController");
const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/:courseId", getCourseInfo);
router.get(
  "/:courseId/announcements",
  authenticateToken,
  getCourseAnnouncements
);
router.get(
  "/:courseId/course-materials",
  authenticateToken,
  getCourseMaterials
);
router.get("/:courseId/assignments", authenticateToken, getCourseAssignments);

router.get(
  "/:courseId/assignments/:assignmentId/submissions/",
  authenticateToken,
  getCourseAssignmentSubmission
);

module.exports = router;

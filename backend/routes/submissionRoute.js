const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getSubmissions,
  createSubmission,
  getSubmission,
  editSubmission,
  deleteSubmission,
  gradeSubmission,
} = require("../controllers/submissionController");
const { authenticateToken } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(authenticateToken, getSubmissions)
  .post(authenticateToken, createSubmission);

router
  .route("/:submissionId")
  .get(authenticateToken, getSubmission)
  .put(authenticateToken, editSubmission)
  .delete(authenticateToken, deleteSubmission);

router.route("/:submissionId/grade").put(authenticateToken, gradeSubmission);

module.exports = router;

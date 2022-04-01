const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAssignments,
  createAssignment,
  getAssignment,
  editAssignment,
  deleteAssignment,
} = require("../controllers/assignmentController");
const { authenticateToken } = require("../middleware/authMiddleware");

//Re-route into submission router
const submissionRouter = require("./submissionRoute");
router.use("/:assignmentId/submissions", submissionRouter);

router
  .route("/")
  .get(authenticateToken, getAssignments)
  .post(authenticateToken, createAssignment);

router
  .route("/:assignmentId")
  .get(authenticateToken, getAssignment)
  .put(authenticateToken, editAssignment)
  .delete(authenticateToken, deleteAssignment);
module.exports = router;

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

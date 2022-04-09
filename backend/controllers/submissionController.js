const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Assignment = require("../models/assignmentModel");
//fixed case sensitivity issue
const Submission = require("../models/submissionModel");
const { v4: uuidv4 } = require("uuid");

//@desc GET submissions of an assignment
//@route GET /api/courses/:courseId/assignment/:assignmentId/submissions
//@acess private
const getSubmissions = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    //only course creator can view submissions
    if (course.creatorId.equals(user._id)) {
      const submission = await Submission.find({
        assignmentId: assignment._id,
      }).populate("creatorId", { username: 1, name: 1, profilePicture: 1 });
      if (!submission) return res.status(404).json("submission not found");
      return res.status(200).json(submission);
    } else
      return res
        .status(403)
        .json("you cannot view submissions for this assignment");
  } catch (error) {
    return res.status(500).json("cannot view submissions");
  }
};

//@desc POST a submission of an assignment
//@route POST /api/courses/:courseId/assignment/:assignmentId/submissions
//@acess private
const createSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    //only course creator or participant can create submission
    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const newSubmission = new Submission({
        content: req.body.content,
        upload: req.body.upload,
        assignmentId: assignment._id,
        creatorId: req.user.id,
      });
      await newSubmission.save();
      res.status(201).json(newSubmission);
    } else
      return res
        .status(403)
        .json("you cannot create an submission for this assignment");
  } catch (error) {
    return res.status(500).json("cannot create a submission");
  }
};

//@desc GET submission of an assignment
//@route GET /api/courses/:courseId/assignment/:assignmentId/submissions/:submissionId
//@acess private
const getSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    //only course creator and original creator can view submissions
    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const submission = await Submission.findById(
        req.params.submissionId
      ).populate("creatorId", { username: 1, name: 1, profilePicture: 1 });
      if (!submission) return res.status(404).json("submission not found");
      return res.status(200).json(submission);
    } else
      return res
        .status(403)
        .json("you cannot view submissions for this assignment");
  } catch (error) {
    return res.status(500).json("cannot view submissions");
  }
};

//@desc Edit submission of an assignment
//@route PUT /api/courses/:courseId/assignment/:assignmentId/submissions/:submissionId
//@acess private
const editSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json("submission not found");

    //only course creator and original creator can view submissions
    if (submission.creatorId.equals(user._id)) {
      const updatedSubmission = await Submission.findByIdAndUpdate(
        req.params.submissionId,
        { $set: { content: req.body.content, upload: req.body.upload } },
        { new: true }
      );
      return res.status(201).json(updatedSubmission);
    } else return res.status(403).json("you cannot edit this submission");
  } catch (error) {
    return res.status(500).json("cannot view submissions");
  }
};

//@desc Delete submission of an assignment
//@route DELETE /api/courses/:courseId/assignment/:assignmentId/submissions/:submissionId
//@acess private
const deleteSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json("submission not found");

    //only course creator and original creator can view submissions
    if (submission.creatorId.equals(user._id)) {
      await submission.deleteOne();
      return res.status(201).json("deleted submission");
    } else return res.status(403).json("you cannot edit this submission");
  } catch (error) {
    return res.status(500).json("cannot view submissions");
  }
};

//@desc  Grade a submission
//@route PUT/api/courses/:courseId/assignment/:assignmentId/submissions/:submissionId/grade
//@acess private
const gradeSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("course not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("assignment not found");

    const submission = await Submission.findById(req.params.submissionId);
    if (!submission) return res.status(404).json("submission not found");

    //only course creator and original creator can view submissions
    if (course.creatorId.equals(user._id)) {
      const updatedSubmission = await Submission.findByIdAndUpdate(
        req.params.submissionId,
        { $set: { grade: req.body.grade, feedback: req.body.feedback } },
        { new: true }
      );
      return res.status(201).json(updatedSubmission);
    } else return res.status(403).json("you cannot edit this submission");
  } catch (error) {
    return res.status(500).json("cannot view submissions");
  }
};

module.exports = {
  getSubmissions,
  createSubmission,
  getSubmission,
  editSubmission,
  deleteSubmission,
  gradeSubmission,
};

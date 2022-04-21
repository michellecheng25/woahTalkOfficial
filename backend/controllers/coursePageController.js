const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Assignment = require("../models/assignmentModel");
const Submission = require("../models/submissionModel");

//@desc Get course info
//@route GET /api/coursepage/:courseId
//@access Public
const getCourseInfo = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json("could not find course");
  }
};

//@desc Get course announcements
//@route GET /api/coursepage/:courseId/announcements
//@access PRIVATE
const getCourseAnnouncements = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");

    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const announcements = await Assignment.find({
        courseId: course._id,
        folder: "Announcement",
      }).sort({ createdAt: -1 });
      return res.status(200).json(announcements);
    }
    return res.status(403).json("you cannot view this course's announcements");
  } catch (error) {
    return res.status(500).json("could not get course announcement");
  }
};

//@desc Get course materials
//@route GET /api/coursepage/:courseId/course-page
//@access PRIVATE
const getCourseMaterials = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");

    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const material = await Assignment.find({
        courseId: course._id,
        folder: "Course Material",
      });
      return res.status(200).json(material);
    }
    return res.status(403).json("you cannot view this course's materials");
  } catch (error) {
    return res.status(500).json("could not get course materials");
  }
};

//@desc Get course assignments
//@route GET /api/coursepage/:courseId/assignments
//@access PRIVATE
const getCourseAssignments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");

    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const assignment = await Assignment.find({
        courseId: course._id,
        folder: "Assignment",
      });
      return res.status(200).json(assignment);
    }
    return res.status(403).json("you cannot view this course's assignments");
  } catch (error) {
    return res.status(500).json("could not get course assignments");
  }
};

//@desc Get course assignments submission(s)
//@route GET /api/coursepage/:courseId/assignments/:assignmentId/submissions/
//@access PRIVATE
const getCourseAssignmentSubmission = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(404).json("can not find assignment");

    if (course.participants.includes(user._id)) {
      const submission = await Submission.find({
        assignmentId: assignment._id,
        creatorId: user._id,
      }).populate("creatorId", {
        username: 1,
        name: 1,
        profilePicture: 1,
      });

      return res.status(200).json(submission);
    } else if (course.creatorId.equals(user._id)) {
      const submission = await Submission.find({
        assignmentId: assignment._id,
      }).populate("creatorId", {
        username: 1,
        name: 1,
        profilePicture: 1,
      });

      return res.status(200).json(submission);
    }
    return res.status(403).json("you cannot view this submission");
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getCourseInfo,
  getCourseAnnouncements,
  getCourseMaterials,
  getCourseAssignments,
  getCourseAssignmentSubmission,
};

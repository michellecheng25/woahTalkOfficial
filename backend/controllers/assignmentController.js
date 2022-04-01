const Course = require("../models/courseModel");
const User = require("../models/userModel");
const Assignment = require("../models/assignmentModel");
const { v4: uuidv4 } = require("uuid");

//@desc GET an assignment from a course
//@route GET /api/courses/:courseId/assignment
//@acess private
const getAssignments = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(401).json("course not found");

    //only allow creators and participants to view assignments
    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      //get assignments
      const assignment = await Assignment.find({ courseId: course._id });
      if (!assignment) return res.status(401).json("assignment not found");
      return res.status(200).json(assignment);
    } else
      return res.status(404).json("you cannot view this course's assignments");
  } catch (error) {
    return res.status(500).json("could not view course assigments");
  }
};

//@desc Create an assignment for a course
//@route POST /api/courses/:courseId/assignment
//@acess private
const createAssignment = async (req, res) => {
  if (!req.body.title) return res.status(400).json("Please add a title ");

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(401).json("course not found");

    if (course.creatorId.equals(user._id)) {
      const newAssignment = new Assignment({
        ...req.body,
        courseId: course._id,
        creatorId: req.user.id,
        folder: req.body.folder,
      });
      const createdAssigment = await newAssignment.save();

      await course.updateOne({ $addToSet: { folders: req.body.folder } });
      res.status(201).json(createdAssigment);
    } else
      return res
        .status(404)
        .json("you cannot create an assignment for this course");
  } catch (error) {
    return res.status(500).json("could not create assignment");
  }
};

//@desc Gets an assignment for a course
//@route GET /api/courses/:courseId/assignment/:assignmentId
//@acess private
const getAssignment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json("user not found");

    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(401).json("course not found");

    if (
      course.creatorId.equals(user._id) ||
      course.participants.includes(user._id)
    ) {
      const assigment = await Assignment.findById(req.params.assignmentId);
      return res.status(200).json(assigment);
    } else res.status(404).json("you cannot view this assignment");
  } catch (error) {
    return res.status(500).json("could not find assigment");
  }
};

//@desc Edit an assignment for a course
//@route PUT /api/courses/:courseId/assignment/:assignmentId
//@acess private
const editAssignment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json("user not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(401).json("assigment not found");

    if (user._id.equals(assignment.creatorId)) {
      const updatedAssignment = await Assignment.findByIdAndUpdate(
        req.params.assignmentId,
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json(updatedAssignment);
    } else
      return res.status(403).json("you cannot edit someone else's assigment");
  } catch (error) {
    return res.status(500).json("Could not edit assigment");
  }
};

//@desc Delete an assignment for a course
//@route DELETE /api/courses/:courseId/assignment/:assignmentId
//@acess private
const deleteAssignment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(401).json("user not found");

    const assignment = await Assignment.findById(req.params.assignmentId);
    if (!assignment) return res.status(401).json("assigment not found");

    if (user._id.equals(assignment.creatorId)) {
      await assignment.deleteOne();
      return res.status(201).json("deleted assigment");
    } else
      return res.status(403).json("you cannot delete someone else's assigment");
  } catch (error) {
    return res.status(500).json("Could not delete assigment");
  }
};

module.exports = {
  getAssignments,
  createAssignment,
  getAssignment,
  editAssignment,
  deleteAssignment,
};

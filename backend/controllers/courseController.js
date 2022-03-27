const Course = require("../models/courseModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

/*
//@desc Get courses
//@route GET /api/courses/
//@acess Public
const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find({ language: req.query.language });
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json("Could not find courses");
  }
};
*/

//@desc POST create a course
//@route POST /api/courses/
//@acess private
const createCourse = async (req, res) => {
  const { courseName, language, level } = req.body;

  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json("Could not find user");

  if (!courseName || !language || !level)
    return res.status(400).json("Fill in all fields");

  try {
    const newCourse = new Course({
      courseName,
      creatorId: user._id,
      language: language.toLowerCase(),
      level: level.toLowerCase(),
      accessCode: uuidv4(),
    });

    const course = await newCourse.save();
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json("could not create course");
  }
};

//@desc Get specific language courses
//@route GET /api/courses/:courseId
//@acess Public
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json("could not find course");
  }
};

//@desc Edit specific language courses
//@route PUT /api/courses/:courseId
//@acess Private
const editCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.courseId);
    if (user._id.equals(course.creatorId)) {
      const updatedCourse = await Course.findByIdAndUpdate(
        req.params.courseId,
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json(updatedCourse);
    } else return res.status(403).json("you cannot edit someone else's course");
  } catch (error) {
    return res.status(500).json("could not edit course");
  }
};

//@desc Edit specific language courses
//@route DELETE /api/courses/:courseId
//@acess Private
const deleteCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const course = await Course.findById(req.params.courseId);
    if (user._id.equals(course.creatorId)) {
      await course.deleteOne();
      return res.status(201).json("deleted course");
    } else
      return res.status(403).json("you cannot delete someone else's course");
  } catch (error) {
    return res.status(500).json("Could not delete course");
  }
};

//join class

//leave class
module.exports = {
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
};

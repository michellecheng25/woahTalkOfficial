const Course = require("../models/courseModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

//@desc POST create a course
//@route POST /api/courses/
//@acess private
const createCourse = async (req, res) => {
  const { courseName, language, level, description } = req.body;

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
      description,
    });

    const course = await newCourse.save();
    await user.updateOne({ $addToSet: { courses: newCourse._id } });
    return res.status(201).json(course);
  } catch (error) {
    return res.status(500).json(error);
  }
};

//@desc Get a courses
//@route GET /api/courses/
//@acess Public
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    return res.status(200).json(courses);
  } catch (error) {
    return res.status(500).json("could not find courses");
  }
};

//@desc Get a courses
//@route GET /api/courses/:courseId
//@acess Public
const getCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");
    return res.status(200).json(course);
  } catch (error) {
    return res.status(500).json("could not find course");
  }
};

//@desc Edit a courses
//@route PUT /api/courses/:courseId
//@acess Private
const editCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");
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

//@desc Delete a  course
//@route DELETE /api/courses/:courseId
//@acess Private
const deleteCourse = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
    const course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");
    if (user._id.equals(course.creatorId)) {
      await course.deleteOne();
      return res.status(201).json("deleted course");
    } else
      return res.status(403).json("you cannot delete someone else's course");
  } catch (error) {
    return res.status(500).json("Could not delete course");
  }
};

//@desc Join or leave a specific courses
//@route POST /api/courses/:courseId/join
//@acess Private
const joinCourse = async (req, res) => {
  const { action } = req.body;

  let user;
  let course;
  try {
    user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
    course = await Course.findById(req.params.courseId);
    if (!course) return res.status(404).json("can not find course");
  } catch (error) {
    return res.status(404).json("Could not find user/course");
  }

  try {
    switch (action) {
      case "join":
        await user.updateOne({ $addToSet: { courses: course._id } });
        await course.updateOne({ $addToSet: { participants: user._id } });

        return res.status(200).json("joined course");

      case "leave":
        await user.updateOne({ $pull: { courses: course._id } });
        await course.updateOne({ $pull: { participants: user._id } });

        return res.status(200).json("leave course");
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json("Could not join/leave course");
  }
};

module.exports = {
  getCourses,
  createCourse,
  getCourse,
  editCourse,
  deleteCourse,
  joinCourse,
};

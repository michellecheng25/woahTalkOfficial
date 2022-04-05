const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Course = require("../models/courseModel");
const { authenticateToken } = require("../middleware/authMiddleware");

// /api/search/users/:searchtext
router.get("/users/:searchText", async (req, res) => {
  const searchText = req.params.searchText;

  if (searchText.trim().length < 1)
    return res.status(400).json("Enter something in the searchbar");

  try {
    const results = await User.find({
      name: { $regex: searchText, $options: "i" },
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

// /api/search/courses/:searchtext
router.get("/courses/:searchText", async (req, res) => {
  const searchText = req.params.searchText;

  if (searchText.trim().length < 1)
    return res.status(400).json("Enter something in the searchbar");

  try {
    const results = await Course.find({
      courseName: { $regex: searchText, $options: "i" },
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;

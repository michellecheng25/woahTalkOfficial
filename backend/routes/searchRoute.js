const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { authenticateToken } = require("../middleware/authMiddleware");

// /api/search/:searchtext
router.get("/:searchText", async (req, res) => {
  const searchText = req.params.searchText;

  if (searchText.trim().length < 1)
    return res.status(400).json("Enter somethinng in the searchbar");

  try {
    const results = await User.find({
      name: { $regex: searchText, $options: "i" },
    });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).send("Server error");
  }
});

module.exports = router;

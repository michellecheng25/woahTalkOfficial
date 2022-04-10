const express = require("express");
const router = express.Router();
const { authenticateToken } = require("../middleware/authMiddleware");
const { cloudinary } = require("../utils/cloudinary");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const fileStr = req.body.data;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "woahTalk",
    });

    console.log(uploadResponse.url);
    return res.status(201).json(uploadResponse.url);
  } catch (error) {
    res.status(500).json("could not upload image");
  }
});

module.exports = router;

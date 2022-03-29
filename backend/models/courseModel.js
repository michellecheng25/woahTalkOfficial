const mongoose = require("mongoose");

const courseSchema = mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    creatorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    language: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["novice", "intermediate", "advanced"],
    },
    folders: {
      type: Array,
      default: ["Announcement", "Course Materials", "Assignemnts"],
    },
    participants: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);

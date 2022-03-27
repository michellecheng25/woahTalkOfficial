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
    accessCode: {
      type: String,
      requiired: true,
      unique: true,
    },
    language: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      enum: ["novice", "intermediate", "advanced"],
    },
    teachersId: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    studentsId: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", courseSchema);

const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    username: {
      type: String,
      required: [true, "Please add a username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    foreignName: {
      type: String,
    },
    navtiveLanguage: {
      type: String,
    },
    foreignLanguage: {
      type: String,
    },
    nativeProficiency: {
      type: String,
      enum: ["novice", "intermediate", "advanced"],
    },
    foreignProficiency: {
      type: String,
      enum: ["novice", "intermediate", "advanced"],
    },
    profilePicture: {
      type: String,
      default: "",
      required: true,
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    following: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    role: {
      type: String,
    },
    courses: {
      type: Array,
      courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
    },
    location: {
      type: String,
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema(
  {
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Course",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    description: {
      type: String,
    },
    upload: {
      type: String,
    },
    totalPoints: {
      type: Number,
    },
    submissions: {
      type: Array,
      _id: { type: String, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
      content: { type: String },
      upload: { type: String },
      grade: { type: Number },
      feedback: { type: String },
      date: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assignment", assignmentSchema);

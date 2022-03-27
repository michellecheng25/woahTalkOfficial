const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    post: {
      type: String,
    },
    upload: {
      type: String,
    },
    likes: {
      type: Array,
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
    comments: {
      type: Array,
      _id: { type: String, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      comment: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);

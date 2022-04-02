const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    coversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);

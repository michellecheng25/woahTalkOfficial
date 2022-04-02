const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema(
  {
    members: {
      type: Array,
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);

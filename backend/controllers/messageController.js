const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const Message = require("../models/messageModel");
const { json } = require("express");

//@desc  Create a message
//@route POST /api/chat/:conversationId/messages
//@acess private
const createMessage = async (req, res) => {
  try {
    const newMessage = new Message({
      coversationId: req.params.conversationId,
      sender: req.user.id,
      text: req.body.text,
    });

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

//@desc  Get messages
//@route GET /api/chat/:conversationId/messages
//@acess private
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
      .sort({ createdAt: -1 })
      .populate("sender", { username: 1, name: 1, profilePicture: 1 });

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createMessage,
  getMessages,
};

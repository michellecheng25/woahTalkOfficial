const User = require("../models/userModel");
const Conversation = require("../models/conversationModel");

//@desc  Create a conversation
//@route POST /api/chat/
//@acess private
const createConversation = async (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json("Search a username");
  }

  const sender = await User.findById(req.user.id);
  if (!sender) return res.status(401).json("user not found");

  const reciever = await User.findOne({ username });
  if (!reciever) return res.status(401).json("user not found");

  const newConversation = new Conversation({
    members: [sender._id, reciever._id],
  });

  try {
    const createdConversation = await newConversation.save();
    res.status(201).json(createdConversation);
  } catch (error) {
    return res.status(500).json("Could not create conversation");
  }
};

//@desc GET  conversations
//@route GET /api/chat/
//@acess private
const getConversations = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "following");
    if (!user) return res.status(404).json("users could not be found");

    const conversations = await Conversation.find({
      userId: {
        $in: [user._id],
      },
    })
      .limit(10)
      .sort({ createdAt: -1 })
      //important! populating an array of objectids instead of an array of objects!
      .populate({
        path: "members",
        model: "User",
        select: { username: 1, name: 1, profilePicture: 1 },
      });

    res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json("could not get conversation");
  }
};

//@desc GET  conversations
//@route GET /api/chat/:conversationId
//@acess private
const getConversation = async (req, res) => {
  try {
    const user = await User.findById(req.user.id, "following");
    if (!user) return res.status(404).json("users could not be found");

    const conversation = await Conversation.findById(req.params.conversationId);

    res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createConversation,
  getConversations,
  getConversation,
};

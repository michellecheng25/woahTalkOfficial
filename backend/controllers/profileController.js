const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Get profile of a  user
//@route POST /api/profile/:username
//@access Public
const getUserInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username }).select(
      "-_id -isAdmin -createdAt -updatedAt -email"
    );

    res.status(200).json(user);
  } catch (error) {
    return res.status(401).json("Could not find user");
  }
};

//@desc Get all posts of a user
//@route POST /api/profile/:username/posts
//@access Public
const getUserPosts = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(401).json("User not found");

    const posts = await Post.find({ userId: user._id })
      .limit(10)
      .sort({ createdAt: -1 });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(401).json("Could not find user");
  }
};

module.exports = {
  getUserInfo,
  getUserPosts,
};

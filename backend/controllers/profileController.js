const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Get profile of a  user
//@route POST /api/profiles/:username
//@access Public
const getUserInfo = async (req, res) => {
  const username = req.params.username;

  try {
    const user = await User.findOne({ username }).select(
      "-password -isAdmin -createdAt -updatedAt -email"
    );

    if (!user) return res.status(404).json("User not found");
    res.status(200).json(user);
  } catch (error) {
    return res.status(404).json("Could not find user");
  }
};

//@desc Get all posts of a user
//@route POST /api/profiles/:username/posts
//@access Public
const getUserPosts = async (req, res) => {
  const username = req.params.username;

  const page = parseInt(req.query.page);
  const limit = 5;

  const startIndex = (page - 1) * limit;

  try {
    const user = await User.findOne({ username });

    if (!user) return res.status(404).json("User not found");

    const posts = await Post.find({ userId: user._id })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("userId", { username: 1, name: 1, profilePicture: 1 })
      .populate({
        path: "comments.userId",
        model: "User",
        select: { username: 1, name: 1, profilePicture: 1 },
      });

    res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json("Could not find user");
  }
};

module.exports = {
  getUserInfo,
  getUserPosts,
};

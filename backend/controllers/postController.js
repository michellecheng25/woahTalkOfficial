const Post = require("../models/postModel");
const User = require("../models/userModel");

//@desc Get user timeline posts
//@route GET /api/posts/
//@acess Private
const getPosts = async (req, res) => {
  res.status(200).json("get post");
};

//@desc Create a post
//@route POST /api/posts/
//@acess Private
const createPost = async (req, res) => {
  const { post, uploads } = req.body;
  if (!post && !uploads)
    return res.status(400).json("Please enter content/uploads");

  try {
    const user = await User.findById(req.user.id);
    const newPost = new Post(req.body);
    newPost.userId = req.user.id;
    const createdPost = await newPost.save();
    res.status(201).json(createdPost);
  } catch (error) {
    return res.status(500).json("Could not create post");
  }
};

//@desc Get a post
//@route GET /api/posts/:id
//@acess Private
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(201).json(post);
  } catch (error) {
    return res.status(500).json("Could not get Post");
  }
};

//@desc Edit a post
//@route PUT /api/posts/:id
//@acess Private
const editPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    if (user._id.equals(post.userId)) {
      await post.updateOne({ $set: req.body });
      return res.status(201).json("updated post");
    } else return res.status(403).json("you cannot edit someone else's post");
  } catch (error) {
    return res.status(500).json("Could not edit Post");
  }
};

//@desc Delete a post
//@route DELETE /api/posts/:id
//@acess Private
const deletePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const post = await Post.findById(req.params.id);
    if (user._id.equals(post.userId)) {
      await post.deleteOne();
      return res.status(201).json("deleted post");
    } else return res.status(403).json("you cannot delete someone else's post");
  } catch (error) {
    return res.status(500).json("Could not delete Post");
  }
};

//@desc Like or unlike a post
//@route POST /api/posts/:id/like
//@acess Private
const likePost = async (req, res) => {
  res.status(200).json("like a post");
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
  likePost,
};

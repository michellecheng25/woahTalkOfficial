const Post = require("../models/postModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");

//@desc Get user timeline posts
//@route GET /api/posts/
//@acess Private
const getPosts = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = 5;

  const startIndex = (page - 1) * limit;

  try {
    const user = await User.findById(req.user.id, "following");

    if (!user) return res.status(404).json("users could not be found");

    posts = await Post.find({
      userId: {
        $in: [user._id, ...user.following],
      },
    })
      .skip(startIndex)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("userId", { username: 1, name: 1, profilePicture: 1 })
      .populate({
        path: "comments.userId",
        model: "User",
        select: { username: 1, name: 1, profilePicture: 1 },
      });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json("no posts retrieved.");
  }
};

//@desc Create a post
//@route POST /api/posts/
//@acess Private
const createPost = async (req, res) => {
  const { post, upload } = req.body;
  if (!post && !upload)
    return res.status(400).json("Please enter content/uploads");

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
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
    const post = await Post.findById(req.params.id)
      .populate("userId", {
        username: 1,
        name: 1,
        profilePicture: 1,
      })
      .populate({
        path: "comments.userId",
        model: "User",
        select: { username: 1, name: 1, profilePicture: 1 },
      });
    if (!post) return res.status(404).json("no post found");
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
    if (!user) return res.status(404).json("user not found");
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("no post found");
    if (user._id.equals(post.userId)) {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      return res.status(201).json(updatedPost);
    } else return res.status(403).json("you cannot edit someone else's post");
  } catch (error) {
    return res.status(500).json("Could not edit post");
  }
};

//@desc Delete a post
//@route DELETE /api/posts/:id
//@acess Private
const deletePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("no post found");
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
  const { action } = req.body;

  let user;
  let post;
  try {
    user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");
    post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("no post found");
  } catch (error) {
    return res.status(500).json("Could not retrive post/data");
  }

  try {
    switch (action) {
      case "like":
        await post.updateOne({ $push: { likes: user._id } });
        return res.status(200).json("liked post");

      case "unlike":
        await post.updateOne({ $pull: { likes: user._id } });
        return res.status(200).json("unliked post");
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json("Could not like/unlike post");
  }
};

//@desc Create a comment
//@route POST /api/posts/:id/comment
//@acess Private
const createComment = async (req, res) => {
  const comment = req.body.comment;

  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("post not found");

    if (comment.trim().length > 0) {
      const newComment = {
        _id: uuidv4(),
        comment,
        userId: req.user.id,
        date: Date.now(),
      };
      await post.comments.unshift(newComment);
      await post.save();
      return res.status(200).json("saved comment");
    } else return res.status(400).json("create a comment");
  } catch (error) {
    return res.status(500).json("Could not comment post");
  }
};

//@desc Delete a comment
//@route POST /api/posts/:id/comment/:commentId
//@acess Private
const deleteComment = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json("user not found");

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json("post not found");

    const comment = post.comments.find(
      (comment) => comment._id === req.params.commentId
    );
    if (!comment) return res.status(404).json("comment not found");

    if (user._id.equals(comment.userId)) {
      await post.updateOne({ $pull: { comments: { _id: comment._id } } });
      return res.status(201).json("deleted comment");
    } else return res.status(403).json("you can only delete your own comments");
  } catch (error) {
    return res.status(500).json("Could not delete comment");
  }
};

module.exports = {
  getPosts,
  createPost,
  getPost,
  editPost,
  deletePost,
  likePost,
  createComment,
  deleteComment,
};

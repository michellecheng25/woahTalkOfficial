const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a new user
//@route POST /api/users
//@access Public
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  //validation
  if (!name || !username || !email || !password) {
    return res.status(400).json("Fill in all fields");
  }

  try {
    // check if user already exist
    // Validate if user exist in our database
    const usernameExists = await User.findOne({
      username: username.toLowerCase(),
    });

    if (usernameExists) {
      return res.status(409).json("User Already Exist. Please Login");
    }

    //generage hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new User({
      name,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      profilePicture: req.body.profilePicURl || "https://picsum.photos/200/300",
    });

    const user = await newUser.save();
    res.status(201).json({
      _id: user._id,
      username: user.username,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json("Could not register user");
  }
};

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Fill in all fields");
  }

  try {
    const user = await User.findOne({ username: username.toLowerCase() });

    //check user and password match
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json("Invalid credentials");
    }
  } catch (error) {
    return res.status(500).json("Could not login");
  }
};

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc Get Current user
//@route GET /api/users/me
//@access Private
const getCurrentUserInfo = async (req, res) => {
  res.status(200).json(req.user);
};

//@desc get all users
//@route GET /api/users/
//@access Public
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(
      users.map((user) => {
        return {
          _id: user._id,
          username: user.username,
          name: user.name,
        };
      })
    );
  } catch (error) {
    return res.status(500).json("Could not get Users");
  }
};

//@desc get a user
//@route GET /api/users/:id
//@access Public
const getUser = async (req, res) => {
  const username = req.params.username;
  try {
    const user = await User.findOne({ username });
    res.status(200).json({
      _id: user._id,
      username: user.username,
      name: user.name,
    });
  } catch (error) {
    return res.status(401).json("Could not find user");
  }
};

//@desc update current user
//@route PUT /api/users/:id
//@access PRIVATE
const updateUser = async (req, res) => {
  //if update password
  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (error) {
      return res.status(500).json("Could not update password");
    }
  }

  try {
    //Get the user id in the JWT token
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json("User not found");

    if (user.username === req.params.username) {
      const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json(updatedUser);
    } else {
      res.status(403).json("You can only edit your own user info");
    }
  } catch (error) {
    return res.status(500).json("Could not update user info");
  }
};

//@desc delete current user
//@route DELETE /api/users/:id
//@access PRIVATE
const deleteUser = async (req, res) => {
  try {
    //Get the user id in the JWT token
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json("User not found");

    if (user.username === req.params.username) {
      await user.deleteOne();
      res.status(200).json("deleted user");
    } else {
      res.status(403).json("you can only delete your own user");
    }
  } catch (error) {
    return res.status(500).json("Could not delete user");
  }
};

//@desc follow and unfollow a user
//@route PUT /api/users/:username/follow
//@access PRIVATE
const followUser = async (req, res) => {
  const { action } = req.body;

  const username = req.params.username;
  let user;
  let currentUser;

  try {
    user = await User.findOne({ username });
    currentUser = await User.findById(req.user.id);
  } catch (error) {
    return res.status(404).json("Could not find user(s)");
  }

  if (user._id.equals(currentUser._id))
    return res.status(403).json("cannot follow/unfollow yourself");

  try {
    switch (action) {
      case "follow":
        await user.updateOne({ $push: { followers: currentUser._id } });
        await currentUser.updateOne({ $push: { following: user._id } });

        return res.status(200).json("following user");

      case "unfollow":
        await user.updateOne({ $pull: { followers: currentUser._id } });
        await currentUser.updateOne({ $pull: { following: user._id } });

        return res.status(200).json("unfollowed user");
      default:
        break;
    }
  } catch (error) {
    return res.status(500).json("Could not follow user");
  }
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  followUser,
};

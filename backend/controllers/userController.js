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

  // check if user already exist
  // Validate if user exist in our database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(409).json("User Already Exist. Please Login");
  }

  /*
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json("Email Already Exist. Please Login");
  }
  */

  //generage hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //create new user
  const newUser = new User({
    name,
    username,
    email,
    password: hashedPassword,
  });

  const user = await newUser.save();
  res.status(201).json({
    _id: user._id,
    username: user.username,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
};

//@desc Login user
//@route POST /api/users/login
//@access Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json("Fill in all fields");
  }

  const user = await User.findOne({ username });

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
    return res.status(401).json("Users cannot be found");
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
    return res.status(401).json("User not found");
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
      return res.status(500).json("could not hash password");
    }
  }

  try {
    //Get the user id in the JWT token
    const user = await User.findById(req.user.id);

    if (!user) return res.status(401).json("User not found");

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json("Could not update");
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

    await User.findByIdAndDelete(req.user.id);
    res.status(200).json("deleted user");
  } catch (error) {
    return res.status(500).json("Could not delete");
  }
};

//@desc follow a user
//@route PUT /api/users/:id/follow
//@access PRIVATE

//@unfollow a user
//@route PUT /api/users/:id/unfollow
//@access PRIVATE

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
};

const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

//@desc Register a new user
//@route /api/users
//@access Public
const registerUser = async (req, res) => {
  const { name, username, email, password } = req.body;

  //validation
  if (!name || !username || !email || !password) {
    res.status(400).json("Fill in all fields");
  }

  // check if user already exist
  // Validate if user exist in our database
  const usernameExists = await User.findOne({ username });
  if (usernameExists) {
    return res.status(409).json("User Already Exist. Please Login");
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(409).json("Email Already Exist. Please Login");
  }

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
//@route /api/users/login
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
//@route /api/users/me
//@access Private
const getCurrentUserInfo = async (req, res) => {
  res.status(200).json(req.user);
};

//@desc update current user

//@desc delete current user

//@desc get a user

//@desc get all users

//@desc follow a user

//@unfollow a user

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserInfo,
};

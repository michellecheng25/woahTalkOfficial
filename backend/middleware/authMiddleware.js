const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

//protect routes
const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.status(401).json("A token is required to authenticate");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    res.status(401).json("Invalid Token");
  }
};

module.exports = { authenticateToken };

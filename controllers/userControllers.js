const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModels");

// @desc Register a user
// @route POST /api/user/register
// @access public
const registerUser = asyncHandler(async (req, res) => {
  let { name, mobile, password } = req.body;
  if (!name || !mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  const user = await User.findOne({ mobile });
  if (user) {
    res.status(400);
    throw new Error("User already exist !");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    mobile,
    password: hashedPassword,
  });
  if (newUser)
    res.status(201).json({ _id: newUser.id, mobile: newUser.mobile });
  else {
    res.status(400);
    throw new Error("User data not valid!");
  }
});

// @desc Login user
// @route GET /api/user/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
  let { mobile, password } = req.body;
  if (!mobile || !password) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const user = await User.findOne({ mobile });
  if (!user) {
    res.status(400);
    throw new Error("User not exist !");
  }
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          mobile: user.mobile,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "15m",
      }
    );
    res.status(200).json(accessToken);
  } else {
    res.status(401);
    throw new Error("mobile or password is not match !");
  }
});

// @desc Get current user info
// @route GET /api/user/current
// @access private
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};

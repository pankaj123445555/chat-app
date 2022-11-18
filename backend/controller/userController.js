const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const generateToken = require("../config/jsonwebtoken");
const res = require("express/lib/response");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  // just print it
  console.log(req.body);
  if (!name || !email || !password) {
    
    res.status(400);
    throw new Error("please Enter all the Field");
  }
  const userExist = await User.findOne({ email: email });

  if (userExist) {
    res.status(400);

    throw new Error("user already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
    pic,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("user not found");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body)
  
  const user = await User.findOne({ email });
  // console.log(user);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);

    throw new Error("invalid email and password");
  }
});

const allUser = asyncHandler(async (req, res) => {
  console.log(req.query)
  const str = req.query.search;
  const strs = str.substring(1);
   
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: strs, $options: "i" } },
          { email: { $regex: strs, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });

  res.send(users);
});
module.exports = { registerUser, authUser, allUser };

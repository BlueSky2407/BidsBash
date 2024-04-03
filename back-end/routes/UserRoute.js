const router = require("express").Router();
const User = require("../models/UserModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth.js");

//signup route
router.post("/signup", async (req, res) => {
  // check if the user already exists
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      throw new Error("User already exists"); // this error generated will go to the catch block and the the message will be displayed.
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    //register new user
    const newUser = new User(req.body);
    await newUser.save();
    res.send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
});

//login route
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      throw new Error("User not found");
    }

    //compare
    const passwordValidity = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordValidity) {
      throw new Error("Invalid password");
    }

    //jwt - encrypt userid - send token to fe
    const token = jwt.sign({ userId: user._id }, process.env.jwt_token);

    res.send({
      success: true,
      message: "User loggin in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
});

// get current user
router.get("/get-current-user", auth, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    res.send({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("./validation");
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
  res.send("Welcome to login");
});
router.post("/register", async (req, res) => {
  //validating
  const { error } = registerValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //checking if email already exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.send("Email already exist, Sign In");

  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  //create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: savedUser._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//login

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.send(error.details[0].message);

  //check email
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.send("Email is not found, Sign Up instead");

  //check password
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.send("Invalid Password");

  //create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).json({ token: token, user: user });
});

module.exports = router;

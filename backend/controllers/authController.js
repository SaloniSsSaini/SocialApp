const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const hashed = await bcrypt.hash(req.body.password, 10);

  const user = new User({
    ...req.body,
    password: hashed
  });

  await user.save();
  res.json(user);
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(404).send("User not found");

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).send("Wrong password");

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "7d" });

  res.json({ token, user });
};
const mongoose = require("mongoose");
const User = require("../models/User");

const addUser = async (req, res) => {
  const user = req.body;
  if (!user.googleID || !user.username || !user.role) {
    return res
      .status(400)
      .json({ success: false, message: "Provide all fields" });
  }

  const newUser = new User(user);

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "New User Added Successfully" });
  } catch (error) {
    console.error(`Error Creating User: ${error.message}`);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "User Not Found" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//check if user is logged in
const authCheck = (req, res, next) => {
  if (!req.user) {
    //if user is not logged in
    res.redirect("/login");
  } else {
    // logged in
    next();
  }
};

// already logged in user to be directed to homepage
const logIn = async (req, res) => {
  res.send("you are logged in, redirected to home page");
};
const getFreelancerInfo = async (req, res) => {
  try {
    const freelancerId = req.params.freelancerId; // Assume freelancerId is passed in the request

    const freelancer = await User.findById(freelancerId);

    if (!freelancer) {
      return res.status(404).json({ message: "Freelancer not found" });
    }

    res.status(200).json(freelancer); // Return freelancer info
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addUser, updateUser, authCheck, logIn, getFreelancerInfo };

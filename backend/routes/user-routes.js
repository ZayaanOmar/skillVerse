// !! NB !! - This file might not even be necessary with the 3rd party implementation
const express = require("express");
const User = require("../models/User");
const mongoose = require("mongoose");
const router = express.Router();

//Example route for adding user to database
router.post("/", async (req, res) => {
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
});

router.put("/:id", async (req, res) => {
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
});

module.exports = router;

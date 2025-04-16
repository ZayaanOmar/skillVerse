// !! NB !! - This file might not even be necessary with the 3rd party implementation
const express = require("express");
const {
  addUser,
  updateUser,
  logIn,
  authCheck,
} = require("../controllers/user_controller");
const router = express.Router();

// redirect to homepage
router.get("/homepage", authCheck, logIn);

router.post("/", addUser);

router.put("/:id", updateUser);

const User = require("../models/User");
const ChangeRequest = require("../models/RoleChange");

// Set user role after signup
router.post("/set-role", authCheck, async (req, res) => {
  const { role } = req.body;

  if (!["client", "freelancer"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { role },
      { new: true }
    );
    res.status(200).json({ message: "Role set successfully", user });
  } catch (err) {
    console.error("Error setting role:", err);
    res.status(500).json({ message: "Server error" });
  }
});

//dealing with role change request
router.post("/request-role-change", async (req, res) => {
  const { requestedRole, message } = req.body;
  const user = req.user;
  const googleID = user.googleID; // pulled from authenticated session

  console.log("Incoming request to /request-role-change");
  console.log("Request body:", req.body);

  try {
    const user = await User.findOne({ googleID });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role == requestedRole) return res.status(400).json({error: `You are already a ${user.role}`});

    const existingRequest = await ChangeRequest.findOne({ googleID, status: "pending" });
    if (existingRequest){
      console.log("Pending request already exists");
      res.status(400).json({ error: "Pending request already exists" });
      return;
    }

    const newRequest = new ChangeRequest({
      googleID,
      currentRole: user.role,
      requestedRole,
      message,
      status: "pending"
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted", request: newRequest });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

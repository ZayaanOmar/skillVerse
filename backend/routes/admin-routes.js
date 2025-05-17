const express = require("express");
const router = express.Router();
const User = require("../models/User");
const ServiceRequest = require("../models/ServiceRequest");
const RoleChange = require("../models/RoleChange");

// count everything (users, service requests, role change requests)
router.get("/stats", async (req, res) => {
  try {
    const numUsers = await User.countDocuments({
      role: { $ne: "admin" },
    });
    const numServiceReqs = await ServiceRequest.countDocuments();
    const numRoleChangeReqs = await RoleChange.countDocuments({
      status: "pending",
    });

    res.status(200).json({ numUsers, numServiceReqs, numRoleChangeReqs });
  } catch (error) {
    console.error("Error fetching info:", error);
    res.status(500).json({ message: "Error fetching info" });
  }
});

module.exports = router;

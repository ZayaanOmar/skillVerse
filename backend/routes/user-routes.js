const express = require("express");
const {
  addUser,
  updateUser,
  logIn,
  authCheck,
} = require("../controllers/user_controller");
const router = express.Router();
const User = require("../models/User");
const ChangeRequest = require("../models/RoleChange");

// redirect to homepage
router.get("/homepage", authCheck, logIn);

router.post("/", addUser);

router.put("/:id", updateUser);

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
  console.log("Incoming request to /request-role-change");
  console.log("Request body:", req.body);
  console.log("User: ", req.user);
  const { requestedRole, message } = req.body;
  const user = req.user;
  const googleID = user.googleID; // pulled from authenticated session

  try {
    const user = await User.findOne({ googleID });
    if (!user) return res.status(404).json({ error: "User not found" });

    if (user.role == requestedRole)
      return res.status(400).json({ error: `You are already a ${user.role}` });

    const existingRequest = await ChangeRequest.findOne({
      googleID,
      status: "pending",
    });
    if (existingRequest) {
      console.log("Pending request already exists");
      res.status(400).json({ error: "Pending request already exists" });
      return;
    }

    const newRequest = new ChangeRequest({
      user: user._id, //taken from logged-in user
      currentRole: user.role,
      requestedRole,
      message,
      status: "pending",
    });

    await newRequest.save();
    res.status(201).json({ message: "Request submitted", request: newRequest });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

//fetches all pending requests to post on TicketSupport page
router.get("/alltickets", async (req, res) => {
  try {
    const requests = await ChangeRequest.find({ status: "pending" })
      .populate("user", "username")
      .exec();
    console.log("Fetched requests:", requests); // debug point

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching available service requests" });
  }
});

// new endpoint to process decisions, role update when approved
router.post("/process-request", async (req, res) => {
  const { ticketId, decision } = req.body;
  console.log(`Ticket ID: ${ticketId} ||| Decision: ${decision}`);
  try {
    const request = await ChangeRequest.findById(ticketId).populate("user");
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }

    if (request.status !== "pending") {
      return res.status(400).json({ error: "Request already processed" });
    }

    if (decision === "approve") {
      //update the user's role
      console.log("User ID: ", request.user._id);
      request.status = "approved";
      await User.findByIdAndUpdate(request.user._id, {
        role: request.requestedRole,
      });
    } else {
      request.status = "rejected";
    }

    request.updatedAt = new Date();
    await request.save();

    res.status(200).json({
      message: `Request ${decision}d successfully`,
      updatedRequest: request,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

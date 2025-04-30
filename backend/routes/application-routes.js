const express = require("express");
const Application = require("../models/Application");
const router = express.Router();

// fetches all the freelancers that have applied to a specific job
router.get("/jobs/:jobId", async (req, res) => {
  const { jobId } = req.params;
  try {
    const applications = await Application.find({ jobId })
      .populate("freelancerId", "username") //fetches a specific freelancer's username from User collection
      .exec();

    res.status(200).json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching applications" });
  }
});

module.exports = router;

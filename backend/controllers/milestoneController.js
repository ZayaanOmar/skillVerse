const Milestone = require("../models/Milestone");
const ServiceRequest = require("../models/ServiceRequest");

const createMilestones = async (req, res) => {
  const { jobId } = req.params;
  const { milestones } = req.body;

  try {
    const job = await ServiceRequest.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    const createdMilestones = await Milestone.insertMany(
      milestones.map(milestone => ({
        jobId,
        description: milestone.description,
        dueDate: new Date(milestone.dueDate),
        status: "Pending"
      }))
    );

    res.status(201).json({
      message: "Milestones created successfully",
      milestones: createdMilestones
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: "Error creating milestones",
      error: error.message
    });
  }
};

module.exports = { createMilestones };
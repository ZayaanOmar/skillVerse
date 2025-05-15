const express = require("express");
const Application = require("../models/Application");
const ServiceRequest = require("../models/ServiceRequest");
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

// accept a freelancer's application
router.post("/jobs/accept/:applicationId", async (req, res) => {
  const { applicationId } = req.params;

  try {
    //find the application by its ID
    const application = await Application.findById(applicationId);

    if (!application) {
      return res.status(404).json({ message: "Application Not Found" });
    }

    if (application.status === "Accepted") {
      return res.status(400).json({ message: "Application Already Accepted" });
    }

    //update application status to Accepted in applications collection
    application.status = "Accepted";
    await application.save();

    //update service request in servicerequests collection
    const serviceRequest = await ServiceRequest.findById(application.jobId);
    if (!serviceRequest) {
      return res.status(404).json({ message: "Service Request Not Found" });
    }

    serviceRequest.freelancerId = application.freelancerId; //assign the freelancer to the job
    serviceRequest.status = "In Progress"; //update the status of the job to In Progress
    serviceRequest.price = application.price; //set the price for the job
    serviceRequest.paymentsPending = application.price; //set the payments pending to the price of the job
    await serviceRequest.save();

    return res.status(200).json({ message: "Application Accepted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error Accepting Application" });
  }
});

module.exports = router;

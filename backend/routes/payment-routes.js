const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const ServiceRequest = require("../models/ServiceRequest");

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:3000";

router.post("/create-checkout-session", async (req, res) => {
  const { email, jobId } = req.body;

  const serviceRequest = await ServiceRequest.findById(jobId);

  // calculate progress completed since last payment
  const { progressActual, progressPaid } = serviceRequest;
  const progressDelta = progressActual - progressPaid;

  if (progressDelta <= 0) {
    return res.status(400).json({ message: "No payment due" });
  }

  // calculate amount due based on progress delta
  const amountDue = (progressDelta / 100) * serviceRequest.price;
  console.log("Amount due:", amountDue);

  if (!email || !amountDue) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  // Update the service request with the new payment details
  serviceRequest.paymentsPending = serviceRequest.paymentsPending - amountDue;
  serviceRequest.progressPaid = progressPaid + progressDelta;
  serviceRequest.paymentsMade = serviceRequest.paymentsMade + amountDue;
  await serviceRequest.save();

  try {
    //console.log("PAYSTACK_KEY:", process.env.PAYSTACK_SECRET_KEY ? "***loaded***" : "MISSING!");
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amountDue * 100, // Paystack requires the amount in kobo
        callback_url: `${FRONTEND_URL}/client/home`, // after payment, Paystack redirects here
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Paystack response:", paystackResponse.data);
    if (paystackResponse.data.status === true) {
      res.json({ checkoutUrl: paystackResponse.data.data.authorization_url });
    } else {
      res
        .status(500)
        .json({ error: "Error initializing Paystack transaction" });
    }
  } catch (error) {
    console.error("Error with Paystack API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();

const FRONTEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.FRONTEND_URL
    : "http://localhost:3000";

router.post("/create-checkout-session", async (req, res) => {
  const { email, amount } = req.body;

  if (!email || !amount) {
    return res.status(400).json({ error: "Email and amount are required" });
  }

  try {
    //console.log("PAYSTACK_KEY:", process.env.PAYSTACK_SECRET_KEY ? "***loaded***" : "MISSING!");
    const paystackResponse = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: email,
        amount: amount * 100,
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

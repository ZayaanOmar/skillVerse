const request = require("supertest");
const express = require("express");
const paymentRoutes = require("../routes/payment-routes");

const axios = require("axios");
jest.mock("axios"); // mock axios

const app = express();
app.use(express.json()); // allow parsing JSON
app.use("/payments", paymentRoutes); // mount the router

describe("Payment Routes", () => {
  it("should return 400 when missing parameters", async () => {
    const response = await request(app)
      .post("/payments/create-checkout-session")
      .send({ amount: 1000 }); // missing email

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Email and amount are required" });
  });

  it("should return 200 and a checkout url on success", async () => {
    // mock a successful response from Paystack
    axios.post.mockResolvedValue({
      data: {
        status: true,
        data: {
          authorization_url: "https://paystack.com/success",
        },
      },
    });

    const response = await request(app)
      .post("/payments/create-checkout-session")
      .send({ email: "test@example.com", amount: 1000 });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "checkoutUrl",
      "https://paystack.com/success"
    );
  });

  it("should return 500 if Paystack fails", async () => {
    // mock a failed response from Paystack
    axios.post.mockResolvedValue({
      data: {
        status: false,
      },
    });

    const response = await request(app)
      .post("/payments/create-checkout-session")
      .send({ email: "test@example.com", amount: 1000 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Error initializing Paystack transaction",
    });
  });

  it("should return 500 if axios throws an error", async () => {
    // mock axios throwing an error
    axios.post.mockRejectedValue(new Error("Network Error"));

    const response = await request(app)
      .post("/payments/create-checkout-session")
      .send({ email: "test@example.com", amount: 1000 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Internal Server Error" });
  });
});

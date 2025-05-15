const ServiceRequest = require("../models/ServiceRequest");

const handlePaystackWebhook = async (req, res) => {
  const crypto = require("crypto");
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  console.log("Webhook called");

  if (hash != req.headers["x-paystack-signature"]) {
    return res.status(401).json({ message: "Invalid signature" });
  }

  const event = req.body;

  if (event.event === "charge.success") {
    const { metadata, amount } = event.data;
    const { serviceRequestId } = metadata;
    const progressDelta = Number(metadata.progressDelta);
    const amountDue = Number(metadata.amountDue);

    console.log("Metadata:", metadata);
    console.log("Amount:", amount);

    console.log("Service request ID:", serviceRequestId);
    console.log("progress delta:", progressDelta);
    console.log("amount due:", amountDue);

    try {
      const serviceRequest = await ServiceRequest.findById(serviceRequestId);
      if (!serviceRequest) {
        return res.status(404).json({ message: "Service request not found" });
      }

      serviceRequest.paymentsPending =
        serviceRequest.paymentsPending - amountDue;
      serviceRequest.progressPaid = serviceRequest.progressPaid + progressDelta;
      serviceRequest.paymentsMade = serviceRequest.paymentsMade + amountDue;

      await serviceRequest.save();

      return res
        .status(200)
        .json({ message: "Payment successful - database updated" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error updating service request" });
    }
  }
  return res.status(200).json({ message: "Webhook received" });
};

module.exports = {
  handlePaystackWebhook,
};

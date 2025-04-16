// In controllers/serviceRequestController.js
const ServiceRequest = require('../models/ServiceRequest');

const createServiceRequest = (req, res) => {
  const { clientId, serviceType } = req.body;

  // Create a new service request
  const newServiceRequest = new ServiceRequest({
    clientId,
    serviceType,
    status: 'pending',
  });

  // Save the service request to the database
  newServiceRequest.save()
    .then((savedRequest) => {
      res.status(201).json({
        message: 'Service request created successfully',
        request: savedRequest,
      });
    })
    .catch((error) => {
      res.status(500).json({ message: 'Error creating service request', error });
    });
};

module.exports = { createServiceRequest };

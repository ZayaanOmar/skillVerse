const express = require('express');
const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/User');

const router = express.Router();
//http://localhost:5000/api/service-requests/create (postman check)
// Create a new service request (from client obs POST)
router.post('/create', async (req, res) => {
    const { clientId, serviceType } = req.body;
  
    try {//checks if client is actually existing 
      console.log("Received clientId:", clientId);

      const client = await User.findOne({ _id: clientId, role: 'client' });
      const allUsers = await User.find({});
      //console.log("All users in DB:", allUsers);
      
      //console.log("Sample user from DB:", user);
      //console.log("Client from findById:", client);
      if (!client) {
        return res.status(400).json({ message: 'Client not found' });//client DNE in database
      }
      //this creates a new service request
      const newServiceRequest = new ServiceRequest({
        clientId,
        serviceType,
      });
  
      await newServiceRequest.save();
      res.status(201).json({ message: 'Service request created successfully', newServiceRequest });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: `Error creating service request: ${error.message}` });
    }
  });
//http://localhost:5000/api/service-requests/client/67fed78eecbde86bd27b85bc test with
// Get all service requests for a client (for the client side)
router.get('/client/:clientId', async (req, res) => {
  const { clientId } = req.params;
  //console.log("Client ID received:", clientId); 
  try {
    const serviceRequests = await ServiceRequest.find({ clientId })
      .populate('freelancerId', 'username') // Populate freelancer info
      .exec();

    res.status(200).json(serviceRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching service requests' });
  }
});
//http://localhost:5000/api/service-requests/freelancer/67fcfe8d7cd7664ebc13af74
// Get all service requests for a freelancer (for the freelancer side)
router.get('/freelancer/:freelancerId', async (req, res) => {
  const { freelancerId } = req.params;

  try {
    const serviceRequests = await ServiceRequest.find({ freelancerId: freelancerId, status: 'pending' })
      .populate('clientId', 'username') // Populate client info
      .exec();

    res.status(200).json(serviceRequests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching service requests' });
  }
});

// Accept a service request (freelancer accepting the request)
router.patch('/accept/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { freelancerId } = req.body;

  try {
    const serviceRequest = await ServiceRequest.findById(requestId);

    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Make sure the request is still pending
    if (serviceRequest.status !== 'pending') {
      return res.status(400).json({ message: 'This request cannot be accepted' });
    }

    // Assign the freelancer to the request
    serviceRequest.freelancerId = freelancerId;
    serviceRequest.status = 'accepted';
    serviceRequest.updatedAt = Date.now(); // Update the timestamp

    await serviceRequest.save();

    res.status(200).json({ message: 'Service request accepted', serviceRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error accepting service request' });
  }
});
// Get all unassigned, pending service requests (for any freelancer to view)
router.get('/all', async (req, res) => {
    try {
      const requests = await ServiceRequest.find({ freelancerId: null, status: 'pending' })
        .populate('clientId', 'username')
        .exec();
  
      res.status(200).json(requests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching available service requests' });
    }
  });
  

// Mark the service request as completed (for the freelancer side)
router.patch('/complete/:requestId', async (req, res) => {
  const { requestId } = req.params;

  try {
    const serviceRequest = await ServiceRequest.findById(requestId);

    if (!serviceRequest) {
      return res.status(404).json({ message: 'Service request not found' });
    }

    // Check if it's accepted
    if (serviceRequest.status !== 'accepted') {
      return res.status(400).json({ message: 'This request is not yet accepted' });
    }

    // Mark it as completed
    serviceRequest.status = 'completed';
    serviceRequest.updatedAt = Date.now(); // Update the timestamp

    await serviceRequest.save();

    res.status(200).json({ message: 'Service request completed', serviceRequest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error completing service request' });
  }
});

module.exports = router;

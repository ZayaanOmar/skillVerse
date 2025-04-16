const mongoose = require('mongoose');

const serviceRequestSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //Reference to the User model (the client making the request)
      required: true,
    },
    serviceType: {
      type: String,//this is for any of the buttons that were created
      required: true,
    },
    freelancerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', //Reference to the User model (the freelancer who accepts the request)
      default: null, //Initially set to null because no freelancer is assigned yet
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed'],
      default: 'pending', //Default status is 'pending' until a freelancer accepts it
    },
    createdAt: {
      type: Date,
      default: Date.now, //Automatically sets the date when the service request is created
    },
    updatedAt: {
      type: Date,
      default: Date.now, //Automatically sets the date when the service request is updated
    },
  },
  {
    timestamps: true, //timestamps create the createdAt stuff
  }
);

module.exports = mongoose.model('ServiceRequest', serviceRequestSchema);

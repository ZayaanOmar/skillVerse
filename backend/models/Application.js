const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: 
  { type: mongoose.Schema.Types.ObjectId, 
    ref: 'ServiceRequest', 
    required: true },
  freelancerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true },
  coverLetter: { 
    type: String, 
    required: false },
    price: { 
      type: Number, 
      required: true 
    },
  status: { type: String, 
    default: 'pending', 
    enum: ['pending', 'accepted', 'rejected'] },
  createdAt: { 
    type: Date, default: Date.now },
});

module.exports = mongoose.model('Application', applicationSchema);

const express = require('express');
const router = express.Router();
const { createMilestones } = require('../controllers/milestoneController');

// create milestones route
router.post("/:jobId", createMilestones);
module.exports = router;

const request = require('supertest');
const express = require('express');
const router = require('../routes/service-request-routes');
const ServiceRequest = require('../models/ServiceRequest');
const User = require('../models/User');
const Application = require('../models/Application');

jest.mock('../models/ServiceRequest');
jest.mock('../models/User');
jest.mock('../models/Application');

const app = express();
app.use(express.json());
app.use('/api/service-requests', router);

describe('Service Request Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /create', () => {
    it('should create a new service request for valid client', async () => {
      const mockClient = { _id: 'client123', role: 'client' };
      const mockRequest = { save: jest.fn(), clientId: 'client123', serviceType: 'web' };

      User.findOne.mockResolvedValue(mockClient);
      ServiceRequest.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({}),
      }));
      

      const res = await request(app)
        .post('/api/service-requests/create')
        .send({ clientId: 'client123', serviceType: 'web' });

      expect(res.statusCode).toBe(201);
      expect(res.body.message).toBe('Service request created successfully');
      expect(mockRequest.save).toHaveBeenCalled();
    });

    it('should return 400 if client is not found', async () => {
      User.findOne.mockResolvedValue(null);

      const res = await request(app)
        .post('/api/service-requests/create')
        .send({ clientId: 'invalidId', serviceType: 'design' });

      expect(res.statusCode).toBe(400);
      expect(res.body.message).toBe('Client not found');
    });

    });
    describe('GET /all', () => {
        it('should return all pending, unassigned service requests', async () => {
          // Mock data for service requests
          const mockServiceRequests = [
            { _id: 'req123', serviceType: 'web', freelancerId: null, status: 'pending', clientId: 'client123' },
            { _id: 'req124', serviceType: 'app', freelancerId: null, status: 'pending', clientId: 'client124' }
          ];
      
          ServiceRequest.find.mockReturnValue({
            populate: jest.fn().mockReturnThis(),
            exec: jest.fn().mockResolvedValue(mockServiceRequests),
          });
          
      
          const res = await request(app).get('/api/service-requests/all');
          
          // Check the status code and response
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toBe(2); // Ensure two requests are returned
          expect(res.body[0].serviceType).toBe('web');
          expect(res.body[1].serviceType).toBe('app');
        });
      
        it('should return 500 if there is a server error', async () => {
          ServiceRequest.find.mockRejectedValue(new Error('Database error'));
      
          const res = await request(app).get('/api/service-requests/all');

          expect(res.statusCode).toBe(500);
          expect(res.body.message).toBe('Error fetching available service requests');
        });
      
        it('should return an empty array if no requests are found', async () => {

          ServiceRequest.find.mockResolvedValue([]);
      
          const res = await request(app).get('/api/service-requests/all');
          
          expect(res.statusCode).toBe(200);
          expect(res.body.length).toBe(0);
        });
      });
      
      describe('POST /applications', () => {
        it('should successfully submit an application for a valid freelancer and job', async () => {
          const mockFreelancer = { _id: 'freelancer123', role: 'freelancer' };
          const mockJob = { _id: 'job123', freelancerId: null }; // job has no freelancer assigned
          const mockApplication = { jobId: 'job123', freelancerId: 'freelancer123', coverLetter: 'My cover letter' };
      
          // Mock User and ServiceRequest models
          User.findOne.mockResolvedValue(mockFreelancer);
          ServiceRequest.findById.mockResolvedValue(mockJob);
          Application.findOne.mockResolvedValue(null); // No existing application
          Application.mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(mockApplication)
          }));
          
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'job123',
              freelancerId: 'freelancer123',
              coverLetter: 'My cover letter',
            });
      
          // Ensure successful response
          expect(res.statusCode).toBe(201);
          expect(res.body.message).toBe('Application submitted successfully');
          expect(res.body.newApplication.jobId).toBe('job123');
          expect(res.body.newApplication.freelancerId).toBe('freelancer123');
          expect(res.body.newApplication.coverLetter).toBe('My cover letter');
        });
      
        it('should return 400 if freelancer is not found', async () => {
          User.findOne.mockResolvedValue(null); // No freelancer found
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'job123',
              freelancerId: 'invalidFreelancerId',
              coverLetter: 'My cover letter',
            });
      
          // Ensure error response
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe('Freelancer not found');
        });
      
        it('should return 400 if service request is not found', async () => {
          const mockFreelancer = { _id: 'freelancer123', role: 'freelancer' };
          User.findOne.mockResolvedValue(mockFreelancer);
          ServiceRequest.findById.mockResolvedValue(null); // No job found
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'invalidJobId',
              freelancerId: 'freelancer123',
              coverLetter: 'My cover letter',
            });
      
          // Ensure error response
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe('Service request not found');
        });
      
        it('should return 400 if service request is already taken', async () => {
          const mockFreelancer = { _id: 'freelancer123', role: 'freelancer' };
          const mockJob = { _id: 'job123', freelancerId: 'freelancer456' }; // Job already assigned to another freelancer
      
          User.findOne.mockResolvedValue(mockFreelancer);
          ServiceRequest.findById.mockResolvedValue(mockJob);
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'job123',
              freelancerId: 'freelancer123',
              coverLetter: 'My cover letter',
            });
      
          // Ensure error response
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe('This service request is already taken');
        });
      
        it('should return 400 if freelancer has already applied for the job', async () => {
          const mockFreelancer = { _id: 'freelancer123', role: 'freelancer' };
          const mockJob = { _id: 'job123', freelancerId: null };
          const mockExistingApplication = { jobId: 'job123', freelancerId: 'freelancer123', coverLetter: 'Existing application' };
      
          User.findOne.mockResolvedValue(mockFreelancer);
          ServiceRequest.findById.mockResolvedValue(mockJob);
          Application.findOne.mockResolvedValue(mockExistingApplication); // Existing application found
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'job123',
              freelancerId: 'freelancer123',
              coverLetter: 'My cover letter',
            });
      
          // Ensure error response
          expect(res.statusCode).toBe(400);
          expect(res.body.message).toBe('You have already applied for this job');
        });
      
        it('should return 500 if there is a server error', async () => {
          // Simulate a server error in database query
          User.findOne.mockRejectedValue(new Error('Database error'));
      
          const res = await request(app)
            .post('/api/service-requests/applications')
            .send({
              jobId: 'job123',
              freelancerId: 'freelancer123',
              coverLetter: 'My cover letter',
            });
      
          // Ensure error response
          expect(res.statusCode).toBe(500);
          expect(res.body.message).toBe('Error applying for service request');
        });
      });
      
});

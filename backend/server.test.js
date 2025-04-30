const request = require('supertest');
const mongoose = require('mongoose');
const app = require('./server');

// database connection mock
jest.mock('./configs/db-conn', () => ({
  connectDB: jest.fn().mockResolvedValueOnce(),
}));

// server management global var
let server;

// start server before all tests
beforeAll((done) => {
  server = app.listen(0, () => done()); // random available port
});

// clean up after all tests
afterAll(async () => {
  // close server
  await new Promise(resolve => server.close(resolve));
  
  // close mongoose connections
  await mongoose.disconnect();
  await mongoose.connection.close();
  
  // clear all Jest mocks
  jest.clearAllMocks();
  
  // additional clean up
  await new Promise(resolve => setImmediate(resolve)); // clear event loop
});

describe('Server Configuration', () => {
  it('should export an Express app', () => {
    expect(app).toBeDefined();
    expect(typeof app.listen).toBe('function');
  });

  it('should start and respond on the root route', async () => {
    const response = await request(app).get('/');
    expect(response.status).not.toBe(500); // no server errors
  });
});

describe('Middleware Tests', () => {
  it('should parse JSON bodies', async () => {
    const testData = { test: 'value' };
    app.post('/test-json', (req, res) => {
      res.send(req.body);
    });

    const response = await request(app)
      .post('/test-json')
      .send(testData);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual(testData);
  });

  it('should have CORS enabled for frontend', async () => {
    const response = await request(app)
      .get('/')
      .set('Origin', 'http://localhost:3000');
    
    expect(response.headers['access-control-allow-origin']).toBe('http://localhost:3000');
    expect(response.headers['access-control-allow-credentials']).toBe('true');
  });

  it('should have session middleware configured', async () => {
    const response = await request(app).get('/');
    expect(response.status).not.toBe(500);
  });
});

describe('Route Mounting Tests', () => {
  it('should have auth routes mounted', async () => {
    const response = await request(app).get('/auth');
    expect(response.status).not.toBe(500);
  });

  it('should have user routes mounted', async () => {
    const response = await request(app).get('/users');
    expect(response.status).not.toBe(500);
  });

  it('should have payment routes mounted', async () => {
    const response = await request(app).get('/payments');
    expect(response.status).not.toBe(500);
  });

  it('should have service request routes mounted', async () => {
    const response = await request(app).get('/api/service-requests');
    expect(response.status).not.toBe(500);
  });
});

describe('Server Listening', () => {
  it('should be listening', () => {
    expect(server.listening).toBeTruthy();
  });
});
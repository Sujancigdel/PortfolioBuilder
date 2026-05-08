const request = require('supertest');
const express = require('express');
const cors = require('cors');
const authRoutes = require('../routes/authRoutes');
const profileRoutes = require('../routes/profileRoutes');
const { Pool } = require('pg');

// Mock Database
jest.mock('../db', () => ({
  query: jest.fn(),
}));
const pool = require('../db');

// Setup App
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Mock Data
const mockUser = { id: 'user-123', email: 'test@example.com', password_hash: 'hashedpassword' };
const mockToken = 'mocked.jwt.token';

// Mock Auth Middleware
jest.mock('../middleware/authMiddleware', () => (req, res, next) => {
  req.user = { userId: 'user-123' };
  next();
});

// Mock Bcrypt/JWT (Implicitly tested or mocked if unit testing controllers in isolation, 
// here we are integration testing routes but mocking DB)

describe('Auth Routes', () => {
    // Note: Since we need to mock DB responses dynamically, this is simplified.
    // Real integration tests would use a test DB.
    
    it('should return 400 for signup if email missing', async () => {
        const res = await request(app).post('/api/auth/signup').send({ password: '123' });
        expect(res.statusCode).toEqual(400);
    });
});

describe('Profile Routes', () => {
    it('should get profile for authenticated user', async () => {
        pool.query.mockResolvedValueOnce({ rows: [{ id: 'profile-1', user_id: 'user-123', full_name: 'Test' }] }); // profile
        pool.query.mockResolvedValueOnce({ rows: [] }); // skills
        pool.query.mockResolvedValueOnce({ rows: [] }); // edu
        pool.query.mockResolvedValueOnce({ rows: [] }); // proj

        const res = await request(app).get('/api/profile');
        expect(res.statusCode).toEqual(200);
        expect(res.body.full_name).toEqual('Test');
    });
});

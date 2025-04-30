import request from 'supertest';
import app from '../app'; 
import { jest } from '@jest/globals';
import { sequelize, Student } from '../models';

describe('GET /api/students', () => {
  beforeAll(async () => {
    // Sync the test database and add seed data
    await sequelize.sync({ force: true });
    await Student.bulkCreate([
      {
        name: 'John Doe',
        email: 'johndoe@example.com',
        student_id: '123456789',
      },
      {
        name: 'Jane Doe',
        email: 'janedoe@example.com',
        student_id: '987654321',
      },
      {
        name: 'Alice Smith',
        email: 'alices@example.com',
        student_id: '456789123',
      },
    ]);
  });

  afterAll(async () => {
    // Clean up the test database
    await sequelize.close();
  });

  it('should return all students when no query parameters are provided', async () => {
    const response = await request(app).get('/api/students');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3); // Ensure all students are returned
  });

  it('should return students matching the name query parameter', async () => {
    const response = await request(app).get('/api/students?name=John');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // Ensure only matching students are returned
    expect(response.body[0].name).toBe('John Doe');
  });

  it('should return students matching the email query parameter', async () => {
    const response = await request(app).get('/api/students?email=janedoe@example.com');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // Ensure only matching students are returned
    expect(response.body[0].email).toBe('janedoe@example.com');
  });

  it('should return students matching both name and email query parameters', async () => {
    const response = await request(app).get('/api/students?name=Alice&email=alices@example.com');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1); // Ensure only matching students are returned
    expect(response.body[0].name).toBe('Alice Smith');
    expect(response.body[0].email).toBe('alices@example.com');
  });
});
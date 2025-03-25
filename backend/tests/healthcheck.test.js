import request from 'supertest';
import app from '../app.js';
import { jest } from '@jest/globals';

describe('healthcheck endpoint', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api/healthcheck');
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('ok');
  });
});

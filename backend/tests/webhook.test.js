import request from 'supertest';
import app from '../app'; // Adjust this to point to your app
import {
  WEBHOOK_VALIDATION,
  WEBHOOK_RECORDING_COMPLETED,
} from '../service/events.js';
import crypto from 'crypto';
import { jest } from '@jest/globals';

describe('webhook endpoint', () => {
  const zoomSecretToken = 'token';
  const plainTokenField = 'plainTokenField';

  beforeAll(() => {
    process.env.ZOOM_WEBHOOK_SECRET_TOKEN = zoomSecretToken;
  });

  describe('validate webhook endpoint', () => {
    it('returns plainText and encryptedText', async () => {
      const response = await request(app)
        .post('/api/webhook')
        .send({
          event: WEBHOOK_VALIDATION,
          payload: {
            plainToken: plainTokenField,
          },
        });

      expect(response.statusCode).toBe(200);

      const { plainToken, encryptedToken } = response.body;
      const expectedToken = crypto
        .createHmac('sha256', zoomSecretToken)
        .update(plainTokenField)
        .digest('hex');

      expect(plainToken).toEqual('plainTokenField');
      expect(encryptedToken).toEqual(expectedToken);
    });
  });

  describe('recording completed webhook', () => {
    it('logs recording completed event and returns 200 OK', async () => {
      const consoleSpy = jest.spyOn(console, 'log'); // Spy on console.log

      // Send the correct event for "recording_completed"
      const response = await request(app)
        .post('/api/webhook')
        .send({
          event: WEBHOOK_RECORDING_COMPLETED, // Ensure this matches your event name
          payload: {
            object: {
              topic: 'Unnamed Meeting',
            },
          },
        });

      expect(response.statusCode).toBe(200);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Recording "Unnamed Meeting" has completed.'
      );

      consoleSpy.mockRestore(); // Clean up the spy
    });
  });
});

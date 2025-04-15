import request from 'supertest';
import app from '../app'; // Make sure the path is correct
import { WEBHOOK_RECORDING_COMPLETED } from '../service/events.js';
import { jest } from '@jest/globals';

describe('recording completed webhook', () => {
  it('logs recording completed event and returns 200 OK', async () => {
    const consoleSpy = jest.spyOn(console, 'log'); // Spy on console.log

    // Send the correct event for "recording_completed"
    const response = await request(app)
      .post('/api/webhook')
      .send({
        event: WEBHOOK_RECORDING_COMPLETED,
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

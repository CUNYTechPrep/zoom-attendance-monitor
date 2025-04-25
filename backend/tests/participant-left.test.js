// tests/participant-left.test.js
import request from 'supertest';
import app from '../app.js';
import { jest } from '@jest/globals';
import { WEBHOOK_PARTICIPANT_LEFT } from '../service/events.js';

describe('meeting.participant_left webhook', () => {
  it('logs participant left event and responds with 200', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const response = await request(app)
      .post('/api/webhook')
      .send({
        event: WEBHOOK_PARTICIPANT_LEFT,
        payload: {
          object: {
            topic: 'Team Sync',
            participant: {
              user_id: 'abc123', 
              user_name: 'John Doe',
              leave_time: '2025-04-10T10:15:00Z'
            },
          },
        },
      });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      'abc123 - John Doe left Team Sync at 2025-04-10T10:15:00Z'
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Participant has left the meeting.');

    consoleLogSpy.mockRestore();
  });
});

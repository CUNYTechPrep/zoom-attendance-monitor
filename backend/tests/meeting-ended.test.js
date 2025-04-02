import request from 'supertest';
import app from '../app';
import { jest } from '@jest/globals';
import { WEBHOOK_MEETING_ENDED } from '../service/events.js';

describe('meeting ended webhook', () => {
  const meetingName = 'Test Meeting';
  const timeEnded = '2023-10-01T12:00:00Z';

  it('logs meeting ended event', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const response = await request(app)
      .post('/api/webhook')
      .send({
        event: WEBHOOK_MEETING_ENDED,
        payload: {
          object: {
            topic: meetingName,
            end_time: timeEnded,
          },
        },
      });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Meeting ${meetingName} ended at ${timeEnded}`
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual('Meeting has ended.');

    consoleLogSpy.mockRestore();
  });
});

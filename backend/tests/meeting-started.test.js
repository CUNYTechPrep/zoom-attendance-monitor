import request from 'supertest';
import app from '../app';
import { jest } from '@jest/globals';
import { WEBHOOK_MEETING_STARTED } from '../service/events.js';

describe('meeting started webhook', () => {
  const meetingName = 'Test Meeting';
  const timeStarted = '2023-10-01T12:00:00Z';

  it('logs meeting started event', async () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const response = await request(app)
      .post('/api/webhook')
      .send({
        event: WEBHOOK_MEETING_STARTED,
        payload: {
          object: {
            topic: meetingName,
            start_time: timeStarted,
          },
        },
      });

    expect(consoleLogSpy).toHaveBeenCalledWith(
      `Meeting ${meetingName} started at ${timeStarted}`
    );
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toEqual('Meeting has started.');

    consoleLogSpy.mockRestore();
  });
});

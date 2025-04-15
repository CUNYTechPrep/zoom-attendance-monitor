import request from 'supertest';
import app from '../app';
import { WEBHOOK_PARTICIPANT_JOINED } from '../service/events.js';
import { WEBHOOK_PARTICIPANT_JOINED_BH } from '../service/events.js';

const participantJoined = {
  object: {
    participant: {
      participant_uuid: '1234567890',
      user_name: 'Jill Chill',
      email: 'jchill@example.com',
      phone_number: '8615250064084',
      join_time: '2025-04-15',
    },
  },
};
const participantJoinedBeforeHost = {
  object: {
    participant: {
      participant_uuid: '1234567890',
      user_name: 'Jill Chill',
      email: 'jchill@example.com',
      phone_number: '8615250064084',
      join_time: '2025-04-15',
    },
  },
};

async function handleRequest(userData, eventToTrigger, expectedReturnValue) {
  const response = await request(app)
    .post('/api/webhook')
    .send({
      event: eventToTrigger,
      payload: {
        ...userData,
      },
    });

  expect(response.statusCode).toBe(200);
  const parsedRes = JSON.parse(response.text)
  expect(parsedRes).toEqual(expectedReturnValue);
}

describe('participant joined', () => {
  test('trigger and compare backend response', () =>
    handleRequest(participantJoined, WEBHOOK_PARTICIPANT_JOINED, {
      participant_id: '1234567890',
      participant_name: 'Jill Chill',
      join_time: '2025-04-15',
    }));
  test('trigger and compare backend response', () =>
    handleRequest(participantJoinedBeforeHost, WEBHOOK_PARTICIPANT_JOINED_BH, {
      participant_id: '1234567890',
      participant_name: 'Jill Chill',
      join_time: '2025-04-15',
    }));
});

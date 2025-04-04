import request from 'supertest';
import app from '../app';
import { WEBHOOK_VALIDATION } from '../service/events.js';
import crypto from 'crypto';

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
});

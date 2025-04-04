import { createHmac } from 'crypto';

export const hashZoomPlainToken = (zoomPlainToken, zoomWebhookSecret) => {
  const hmac = createHmac('sha256', zoomWebhookSecret);
  return hmac.update(zoomPlainToken).digest('hex');
};

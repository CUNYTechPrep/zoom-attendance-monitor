import { Router } from 'express';
import { validateEndpoint } from '../service/webhook.js';
import { WEBHOOK_VALIDATION } from '../service/events.js';

const router = Router();

router.post('/', (req, res) => {
  const { event } = req.body;

  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.ZOOM_WEBHOOK_SECRET_TOKEN);
    console.log('headers:', req.headers);
    console.log('body:', req.body);
  }

  switch (event) {
    case WEBHOOK_VALIDATION:
      return validateEndpoint();
    default:
      console.log(`no match found for event ${event}`);
      return res.status(200).end();
  }
});

export default router;

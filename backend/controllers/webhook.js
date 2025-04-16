import { Router } from 'express';
import { hashZoomPlainToken } from '../service/webhook.js';
import {
  WEBHOOK_VALIDATION,
  WEBHOOK_MEETING_ENDED,
  WEBHOOK_MEETING_STARTED,
  WEBHOOK_RECORDING_COMPLETED,
} from '../service/events.js';

const router = Router();

router.post('/', (req, res) => {
  const { event } = req.body;

  if (process.env.NODE_ENV === 'development') {
    console.log('headers:', req.headers);
    console.log('body:', JSON.stringify(req.body, null, 2));
  }

  switch (event) {
    case WEBHOOK_VALIDATION: {
      const plainToken = req.body.payload.plainToken;

      const encryptedToken = hashZoomPlainToken(
        plainToken,
        process.env.ZOOM_WEBHOOK_SECRET_TOKEN
      );

      return res.status(200).json({ plainToken, encryptedToken });
    }

    case WEBHOOK_MEETING_ENDED: {
      const meetingName = req.body.payload.object.topic;
      const timeEnded = req.body.payload.object.end_time;

      console.log(`Meeting ${meetingName} ended at ${timeEnded}`);
      return res.status(200).json({ message: 'Meeting has ended.' });
    }

    case WEBHOOK_MEETING_STARTED: {
      const meetingName = req.body.payload.object.topic;
      const timeStarted = req.body.payload.object.start_time;

      console.log(`Meeting ${meetingName} started at ${timeStarted}`);
      return res.status(201).json({ message: 'Meeting has started.' });
    }

    case WEBHOOK_RECORDING_COMPLETED: {
      const recordingName = req.body.payload.object.topic || 'Unnamed Meeting';
      console.log(`Recording "${recordingName}" has completed.`); // Log the completion message
      return res.status(200).json({ message: 'Recording completed.' });
    }

    default:
      console.log(`no match found for event ${event}`);
      return res.status(200).end();
  }
});

export default router;

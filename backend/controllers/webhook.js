import { Router } from 'express';
import { hashZoomPlainToken } from '../service/webhook.js';
import {
  WEBHOOK_VALIDATION,
  WEBHOOK_MEETING_ENDED,
  WEBHOOK_MEETING_STARTED,
  WEBHOOK_PARTICIPANT_LEFT,
} from '../service/events.js';

const router = Router();

router.post('/', (req, res) => {
  const { event } = req.body;

  if (process.env.NODE_ENV === 'development') {
    console.log(process.env.ZOOM_WEBHOOK_SECRET_TOKEN);
    console.log('headers:', req.headers);
    console.log('body:', req.body);
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
    case WEBHOOK_PARTICIPANT_LEFT: {
      const participantId = req.body.payload.object.participant.user_id;
      const participantName = req.body.payload.object.participant.user_name;
      const participantLeftTime =
        req.body.payload.object.participant.leave_time;
      const meetingName = req.body.payload.object.topic;

      console.log(
        `${participantId} - ${participantName} left ${meetingName} at ${participantLeftTime}`
      );
      return res
        .status(200)
        .json({ message: 'Participant has left the meeting.' });
    }
    default:
      console.log(`no match found for event ${event}`);
      return res.status(200).end();
  }
});

export default router;

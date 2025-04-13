import { Router } from 'express';
import { hashZoomPlainToken } from '../service/webhook.js';
import {
  WEBHOOK_VALIDATION,
  WEBHOOK_MEETING_ENDED,
  WEBHOOK_MEETING_STARTED,
  WEBHOOK_PARTICIPANT_JOINED,
  WEBHOOK_PARTICIPANT_JOINED_BH
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
    case WEBHOOK_PARTICIPANT_JOINED:{
         console.log('participant joined', req.body.payload.object.participant);
        const participant_info = JSON.stringify({
          account_id: req.body.payload.account_id,
          user_name: req.body.payload.object.participant.user_name,
          phone_number: req.body.payload.object.participant.phone_number
            ? req.body.payload.object.participant.phone_number
            : '',
        });
        return res.status(200).json(participant_info);
    }
    case WEBHOOK_PARTICIPANT_JOINED_BH:{
      const participant_info = JSON.stringify({
        account_id: req.body.payload.account_id,
        user_name: req.body.payload.object.participant.user_name,
      });
   console.log('participant joined before host', req.body);
   return res.status(200).json(participant_info);
  }

    default:
      console.log(`no match found for event ${event}`);
      return res.status(200).end();
  }
});

export default router;
